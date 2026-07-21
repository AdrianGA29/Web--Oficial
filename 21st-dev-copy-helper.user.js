// ==UserScript==
// @name         21st.dev Copy & Prompt Helper
// @namespace    local.21st-copy-helper
// @version      2.0.0
// @description  Reliably copy prompts, component code, demos, and all files from 21st.dev.
// @match        https://21st.dev/@*/components/*
// @match        https://21st.dev/*/components/*
// @match        https://21st.dev/community/components/*
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @connect      21st.dev
// @connect      cdn.21st.dev
// ==/UserScript==

(function () {
  "use strict";

  const PANEL_ID = "twentyfirst-copy-helper";
  const CAPTURE_TIMEOUT_MS = 15000;
  const state = {
    captureSequence: 0,
    captureWaiters: new Set(),
    clipboardInstalled: false,
    legacyFiles: null,
    legacyUrl: "",
    currentUrl: location.href,
  };

  installClipboardRepair();
  installNavigationWatcher();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  function init() {
    // Some Chromium builds expose navigator.clipboard slightly after document-start.
    installClipboardRepair();
    addPanel();

    if (typeof GM_registerMenuCommand === "function") {
      GM_registerMenuCommand("Copy 21st prompt", () => copyKind("prompt"));
      GM_registerMenuCommand("Copy component code", () => copyKind("component"));
      GM_registerMenuCommand("Copy usage/demo code", () => copyKind("usage"));
      GM_registerMenuCommand("Copy all 21st files", () => copyKind("all"));
      GM_registerMenuCommand("Download all 21st files", downloadAll);
    }
  }

  // 21st.dev ultimately uses navigator.clipboard.writeText(). Replacing only that
  // final step keeps the site's login/copy-limit checks and its prompt generation,
  // while GM_setClipboard avoids Chrome permission/focus failures.
  function installClipboardRepair() {
    if (state.clipboardInstalled) return;
    const pageWindow = typeof unsafeWindow === "object" ? unsafeWindow : window;
    const clipboard = pageWindow.navigator && pageWindow.navigator.clipboard;
    if (!clipboard || typeof clipboard.writeText !== "function") return;

    const originalWriteText = clipboard.writeText.bind(clipboard);
    const repairedWriteText = async (value) => {
      const text = String(value ?? "");

      try {
        writeClipboardDirect(text);
        notifyClipboardCapture(text);
        return;
      } catch (error) {
        console.warn("[21st copy helper] GM clipboard failed; using browser clipboard", error);
        await originalWriteText(text);
        notifyClipboardCapture(text);
      }
    };

    try {
      Object.defineProperty(clipboard, "writeText", {
        configurable: true,
        value: repairedWriteText,
      });
      state.clipboardInstalled = true;
    } catch (error) {
      console.warn("[21st copy helper] Could not repair the page clipboard", error);
    }
  }

  function notifyClipboardCapture(text) {
    state.captureSequence += 1;
    for (const waiter of [...state.captureWaiters]) {
      waiter.resolve(text);
    }
    state.captureWaiters.clear();

    if (document.getElementById(PANEL_ID)) {
      setStatus("Copied by 21st.dev");
    }
  }

  function installNavigationWatcher() {
    const checkUrl = () => {
      if (location.href === state.currentUrl) return;
      state.currentUrl = location.href;
      state.legacyFiles = null;
      state.legacyUrl = "";
      setStatus("");
    };

    addEventListener("popstate", checkUrl);
    setInterval(checkUrl, 500);
  }

  function addPanel() {
    if (document.getElementById(PANEL_ID)) return;

    const panel = document.createElement("div");
    panel.id = PANEL_ID;
    panel.innerHTML = `
      <div class="tfch-title">21st helper <span>v2</span></div>
      <button type="button" data-action="copy-prompt">Copy prompt</button>
      <button type="button" data-action="copy-component">Copy component</button>
      <button type="button" data-action="copy-usage">Copy usage/demo</button>
      <button type="button" data-action="copy-all">Copy all files</button>
      <button type="button" data-action="download">Download all (.txt)</button>
      <div class="tfch-status" aria-live="polite"></div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      #${PANEL_ID} {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 2147483647;
        width: 182px;
        padding: 10px;
        border: 1px solid rgba(120, 120, 120, 0.35);
        border-radius: 9px;
        background: color-mix(in srgb, Canvas 94%, transparent);
        color: CanvasText;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
        backdrop-filter: blur(10px);
        font: 12px/1.35 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      #${PANEL_ID} .tfch-title { margin: 0 0 8px; font-weight: 700; }
      #${PANEL_ID} .tfch-title span { opacity: 0.45; font-weight: 500; }
      #${PANEL_ID} button {
        display: block;
        width: 100%;
        margin: 6px 0 0;
        padding: 7px 8px;
        border: 1px solid rgba(120, 120, 120, 0.32);
        border-radius: 6px;
        background: ButtonFace;
        color: ButtonText;
        cursor: pointer;
        font: inherit;
        text-align: left;
      }
      #${PANEL_ID} button:hover { filter: brightness(0.96); }
      #${PANEL_ID} button:disabled { cursor: wait; opacity: 0.55; }
      #${PANEL_ID} .tfch-status {
        min-height: 16px;
        margin-top: 8px;
        color: color-mix(in srgb, CanvasText 68%, transparent);
        overflow-wrap: anywhere;
      }
    `;

    document.documentElement.append(style, panel);
    panel.addEventListener("click", async (event) => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;

      const action = button.dataset.action;
      setPanelDisabled(true);
      try {
        if (action === "copy-prompt") await copyKind("prompt");
        if (action === "copy-component") await copyKind("component");
        if (action === "copy-usage") await copyKind("usage");
        if (action === "copy-all") await copyKind("all");
        if (action === "download") await downloadAll();
      } finally {
        setPanelDisabled(false);
      }
    });
  }

  async function copyKind(kind) {
    try {
      setStatus("Waiting for 21st.dev...");
      const text = await captureNativeAction(kind);
      writeClipboardDirect(text);
      setStatus(`Copied ${displayKind(kind)}`);
      return text;
    } catch (nativeError) {
      if (kind === "prompt") {
        const message = friendlyNativeError(nativeError);
        setStatus(message);
        console.error("[21st copy helper]", nativeError);
        throw nativeError;
      }

      try {
        setStatus("Trying legacy source...");
        const text = await copyLegacyKind(kind);
        setStatus(`Copied ${displayKind(kind)}`);
        return text;
      } catch (legacyError) {
        const error = new Error(
          `${friendlyNativeError(nativeError)} Legacy source also unavailable: ${legacyError.message}`,
        );
        setStatus(error.message);
        console.error("[21st copy helper]", { nativeError, legacyError });
        throw error;
      }
    }
  }

  async function captureNativeAction(kind) {
    const startSequence = state.captureSequence;
    const captured = waitForClipboardCapture(startSequence);

    try {
      await triggerNativeAction(kind);
    } catch (error) {
      captured.cancel();
      throw error;
    }

    return captured.promise;
  }

  function waitForClipboardCapture(startSequence) {
    let waiter;
    let timeoutId;

    const promise = new Promise((resolve, reject) => {
      waiter = {
        resolve: (text) => {
          clearTimeout(timeoutId);
          state.captureWaiters.delete(waiter);
          resolve(text);
        },
      };
      state.captureWaiters.add(waiter);
      timeoutId = setTimeout(() => {
        state.captureWaiters.delete(waiter);
        reject(new Error("21st.dev did not send anything to the clipboard"));
      }, CAPTURE_TIMEOUT_MS);

      if (state.captureSequence !== startSequence) {
        waiter.resolve("");
      }
    });

    return {
      promise,
      cancel: () => {
        clearTimeout(timeoutId);
        state.captureWaiters.delete(waiter);
      },
    };
  }

  async function triggerNativeAction(kind) {
    const labels = {
      prompt: "Copy prompt",
      component: "Copy code",
      usage: "Copy demo",
      all: "Copy all files",
    };
    const desiredLabel = labels[kind];
    const mainButton = await waitForElement(() => findNativeMainCopyButton(), 5000);
    if (!mainButton) {
      throw new Error("Native 21st.dev copy controls were not found");
    }

    if (normalizeText(mainButton.textContent).startsWith(normalizeText(desiredLabel))) {
      mainButton.click();
      return;
    }

    const menuTrigger = findMenuTrigger(mainButton);
    if (!menuTrigger) {
      throw new Error(`Could not open the 21st.dev “${desiredLabel}” action`);
    }

    menuTrigger.click();
    const menuItem = await waitForElement(() => findMenuItem(desiredLabel), 3000);
    if (!menuItem) {
      throw new Error(`The 21st.dev “${desiredLabel}” menu item was not found`);
    }
    menuItem.click();
  }

  function findNativeMainCopyButton() {
    const selectors = [
      '[data-test="prompt"]',
      '[data-test="copy-prompt-button"]',
      '[data-test="copy-code-button"]',
      '[data-test="copy-code-with-demo-button"]',
    ];

    for (const selector of selectors) {
      const candidates = [...document.querySelectorAll(selector)];
      const visible = candidates.find((element) => !element.closest(`#${PANEL_ID}`) && isVisible(element));
      if (visible) return visible;
    }

    return [...document.querySelectorAll("button")].find((button) => {
      if (button.closest(`#${PANEL_ID}`) || !isVisible(button)) return false;
      return /^Copy (prompt|code|demo|all files)(\s|$)/i.test(normalizeText(button.textContent));
    });
  }

  function findMenuTrigger(mainButton) {
    const containers = [mainButton.parentElement, mainButton.parentElement?.parentElement].filter(Boolean);
    for (const container of containers) {
      const explicit = container.querySelector('button[aria-haspopup="menu"]');
      if (explicit && explicit !== mainButton && isVisible(explicit)) return explicit;

      const buttons = [...container.querySelectorAll("button")].filter(
        (button) => button !== mainButton && !button.closest(`#${PANEL_ID}`) && isVisible(button),
      );
      if (buttons.length === 1) return buttons[0];
    }
    return mainButton.nextElementSibling?.matches("button") ? mainButton.nextElementSibling : null;
  }

  function findMenuItem(label) {
    const desired = normalizeText(label);
    return [...document.querySelectorAll('[role="menuitem"], [role="option"]')].find(
      (item) => isVisible(item) && normalizeText(item.textContent).startsWith(desired),
    );
  }

  async function downloadAll() {
    try {
      const text = await copyKind("all");
      const name = `${componentSlugFromUrl()}-21st-files.txt`;
      downloadText(name, text);
      setStatus(`Downloaded ${name}`);
    } catch (error) {
      // copyKind already reports the useful error.
    }
  }

  async function copyLegacyKind(kind) {
    const files = await getLegacyFiles();
    const selected = files.filter((file) => kind === "all" || file.kind === kind);
    if (!selected.length) throw new Error(`No ${displayKind(kind)} code found`);

    const text = selected
      .map((file) => `// ${file.path || file.name}\n${file.content.trimEnd()}\n`)
      .join("\n");
    writeClipboardDirect(text);
    return text;
  }

  async function getLegacyFiles() {
    if (state.legacyFiles && state.legacyUrl === location.href) return state.legacyFiles;

    const pageUrl = location.href;
    const html = await requestText(pageUrl);
    const urls = extractPublicUrls(`${document.documentElement.innerHTML}\n${html}`);
    const registryUrl = urls.find((url) => publicUrlType(url) === "registry");
    const componentUrl = urls.find((url) => publicUrlType(url) === "component");
    const usageUrl = urls.find((url) => publicUrlType(url) === "usage");
    const files = [];

    if (registryUrl) {
      const registry = JSON.parse(await requestText(registryUrl));
      for (const file of registry.files || []) {
        if (!file.path || typeof file.content !== "string") continue;
        files.push({
          kind: /(^|\/)(demos?|examples?)(\/|$)|code\.demo\./i.test(file.path)
            ? "usage"
            : "component",
          name: basename(file.path),
          path: file.path,
          content: file.content,
        });
      }
    }

    if (componentUrl && !files.some((file) => file.kind === "component")) {
      files.push({
        kind: "component",
        name: "component.tsx",
        path: "component.tsx",
        content: await requestText(componentUrl),
      });
    }
    if (usageUrl && !files.some((file) => file.kind === "usage")) {
      files.push({
        kind: "usage",
        name: "usage.tsx",
        path: "usage.tsx",
        content: await requestText(usageUrl),
      });
    }
    if (!files.length) throw new Error("No public CDN code URLs found");

    state.legacyFiles = files;
    state.legacyUrl = pageUrl;
    return files;
  }

  function extractPublicUrls(text) {
    const normalized = text
      .replaceAll("\\/", "/")
      .replaceAll("\\u002F", "/")
      .replaceAll("\\u0026", "&")
      .replaceAll("&amp;", "&");

    return Array.from(
      new Set(
        [...normalized.matchAll(/https:\/\/cdn\.21st\.dev\/[^"'<>\\\s]+/g)]
          .map(([match]) => match.replace(/\\+$/, ""))
          .filter((url) => publicUrlType(url)),
      ),
    );
  }

  function publicUrlType(url) {
    let pathname;
    try {
      pathname = new URL(url).pathname;
    } catch {
      return "";
    }
    if (/\/registry\.[^/]+\.json$/i.test(pathname)) return "registry";
    if (/\/code\.demo\.[^/]+\.tsx$/i.test(pathname)) return "usage";
    if (/\/code\.(?!demo\.)[^/]+\.tsx$/i.test(pathname)) return "component";
    return "";
  }

  function requestText(url) {
    if (typeof GM_xmlhttpRequest === "function") {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: "GET",
          url,
          headers: { accept: "text/html,application/json,text/plain,*/*" },
          onload: (response) => {
            if (response.status >= 200 && response.status < 300) resolve(response.responseText);
            else reject(new Error(`HTTP ${response.status}: ${url}`));
          },
          onerror: () => reject(new Error(`Request failed: ${url}`)),
        });
      });
    }

    return fetch(url, { credentials: "include" }).then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
      return response.text();
    });
  }

  function writeClipboardDirect(text) {
    if (typeof GM_setClipboard === "function") {
      GM_setClipboard(text, "text");
      return;
    }
    throw new Error("Tampermonkey clipboard permission is unavailable");
  }

  function downloadText(name, content) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.style.display = "none";
    document.body.append(link);
    link.click();
    setTimeout(() => {
      URL.revokeObjectURL(link.href);
      link.remove();
    }, 1000);
  }

  function waitForElement(getElement, timeoutMs) {
    const immediate = getElement();
    if (immediate) return Promise.resolve(immediate);

    return new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        const element = getElement();
        if (!element) return;
        observer.disconnect();
        clearTimeout(timeoutId);
        resolve(element);
      });
      observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
      const timeoutId = setTimeout(() => {
        observer.disconnect();
        resolve(null);
      }, timeoutMs);
    });
  }

  function isVisible(element) {
    if (!(element instanceof Element)) return false;
    const style = getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden" && !element.hidden;
  }

  function normalizeText(value) {
    return String(value || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function displayKind(kind) {
    return { prompt: "prompt", component: "component", usage: "usage/demo", all: "all files" }[kind];
  }

  function friendlyNativeError(error) {
    const base = error instanceof Error ? error.message : "Copy failed";
    return `${base}. Check that you are signed in and have copies available.`;
  }

  function componentSlugFromUrl() {
    const parts = location.pathname.split("/").filter(Boolean);
    const componentsIndex = parts.indexOf("components");
    const raw = componentsIndex >= 0 ? parts[componentsIndex + 2] || parts[componentsIndex + 1] : "component";
    return decodeURIComponent(raw || "component").replace(/[^a-z0-9._-]+/gi, "-");
  }

  function basename(path) {
    return path.split("/").pop() || "component.tsx";
  }

  function setPanelDisabled(disabled) {
    document.querySelectorAll(`#${PANEL_ID} button`).forEach((button) => {
      button.disabled = disabled;
    });
  }

  function setStatus(message) {
    const status = document.querySelector(`#${PANEL_ID} .tfch-status`);
    if (status) status.textContent = message;
  }
})();
