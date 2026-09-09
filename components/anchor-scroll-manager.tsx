"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function normalizedPath(pathname: string) {
  return pathname === "/" ? pathname : pathname.replace(/\/$/, "");
}

function findHashTarget(hash: string) {
  if (!hash.startsWith("#") || hash.length < 2) return null;

  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

function revealLayoutBefore(target: HTMLElement) {
  document.querySelectorAll<HTMLElement>("main > section").forEach((section) => {
    const targetFollowsSection = Boolean(
      section.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING,
    );

    if (section === target || targetFollowsSection) {
      section.classList.add("anchor-scroll-revealed");
    }
  });
}

function scrollToTarget(target: HTMLElement, smooth: boolean) {
  revealLayoutBefore(target);

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const scrollPadding = Number.parseFloat(
        window.getComputedStyle(document.documentElement).scrollPaddingTop,
      ) || 0;
      const targetTop = () =>
        window.scrollY + target.getBoundingClientRect().top - scrollPadding;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!smooth || reduceMotion) {
        const previousBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo({ top: targetTop(), behavior: "auto" });
        document.documentElement.style.scrollBehavior = previousBehavior;
        return;
      }

      let correctionTimer = 0;
      const correctFinalPosition = () => {
        window.clearTimeout(correctionTimer);
        window.removeEventListener("scrollend", correctFinalPosition);

        const remainingOffset = target.getBoundingClientRect().top - scrollPadding;
        if (Math.abs(remainingOffset) < 2) return;

        const previousBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollBy({ top: remainingOffset, behavior: "auto" });
        document.documentElement.style.scrollBehavior = previousBehavior;
      };

      window.addEventListener("scrollend", correctFinalPosition, { once: true });
      correctionTimer = window.setTimeout(correctFinalPosition, 3500);
      window.scrollTo({ top: targetTop(), behavior: "smooth" });
    });
  });
}

export function AnchorScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollFromLocation = (smooth: boolean) => {
      const target = findHashTarget(window.location.hash);
      if (target) scrollToTarget(target, smooth);
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const origin = event.target;
      if (!(origin instanceof Element)) return;

      const link = origin.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        normalizedPath(destination.pathname) !== normalizedPath(window.location.pathname)
      ) {
        return;
      }

      const target = findHashTarget(destination.hash);
      if (!target) return;

      event.preventDefault();
      window.history.pushState(null, "", destination.hash);
      scrollToTarget(target, true);
    };

    const handleHashChange = () => scrollFromLocation(true);

    document.addEventListener("click", handleClick, true);
    window.addEventListener("hashchange", handleHashChange);

    const initialFrame = window.requestAnimationFrame(() => scrollFromLocation(false));

    return () => {
      window.cancelAnimationFrame(initialFrame);
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  return null;
}
