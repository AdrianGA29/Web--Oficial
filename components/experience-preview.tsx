"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Expand, ExternalLink, X } from "lucide-react";
import { buttonClass } from "@/components/button";
import { ProductVisual } from "@/components/product-visual";
import { ToolProductFrame } from "@/components/tool-product-frame";

export function ExperiencePreview({
  demoHref,
  title,
  summary,
  tags,
  exampleLabel = "Ejemplo 01 · Web interactiva",
  visual = "web",
  browserTitle = "Portfolio · Adrián García",
  iframeTitle = "Portfolio interactivo de Adrián García",
  actionLabel = "Ver la web aquí",
  embeddable = true,
  compact = false,
  presentation = "default",
  reverse = false,
}: {
  demoHref: string;
  title: string;
  summary: string;
  tags: string[];
  exampleLabel?: string;
  visual?: "web" | "crm";
  browserTitle?: string;
  iframeTitle?: string;
  actionLabel?: string;
  embeddable?: boolean;
  compact?: boolean;
  presentation?: "default" | "tool-case";
  reverse?: boolean;
}) {
  const toolCase = presentation === "tool-case";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [active, setActive] = useState(false);
  const [closing, setClosing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!active) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [active]);

  useEffect(() => () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
  }, []);

  const openPreview = () => {
    setLoaded(false);
    setClosing(false);
    setActive(true);
  };

  const closePreview = () => {
    if (closing) return;
    setClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setActive(false);
      setClosing(false);
      closeTimerRef.current = null;
    }, 240);
  };

  return (
    <>
      <article className={
        toolCase
          ? `tool-case-layout${reverse ? " tool-case-layout-reverse" : ""}`
          : compact
            ? "flex h-full min-w-0 flex-col gap-7"
            : "grid min-w-0 items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16"
      }>
        {embeddable ? <button
          type="button"
          onClick={openPreview}
          aria-label={`Abrir ${browserTitle} en una vista interactiva`}
          className={toolCase ? "focus-ring tool-case-window" : "focus-ring group relative block w-full rounded-[1.15rem] text-left"}
        >
          {toolCase ? (
            <>
              <ToolProductFrame type={visual} />
              <span className="tool-case-open-cue" aria-hidden="true">
                Abrir experiencia <Expand size={15} />
              </span>
            </>
          ) : (
            <>
              <ProductVisual type={visual} className="transition-[transform,box-shadow,border-color] duration-300 ease-out group-hover:-translate-y-1 group-hover:border-sky/30 group-hover:shadow-[0_34px_90px_rgba(3,10,22,0.48)]" />
              <span className="absolute inset-0 grid place-items-center rounded-[1.15rem] bg-ink/8 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-ink/88 px-4 py-2.5 text-sm font-semibold text-white shadow-xl">
                  Ver experiencia <Expand size={16} />
                </span>
              </span>
            </>
          )}
        </button> : <a
          href={demoHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`Abrir ${browserTitle} en una pestaña nueva`}
          className="focus-ring group relative block w-full rounded-[1.15rem] text-left"
        >
          <ProductVisual type={visual} className="transition-[transform,box-shadow,border-color] duration-300 ease-out group-hover:-translate-y-1 group-hover:border-sky/30 group-hover:shadow-[0_34px_90px_rgba(3,10,22,0.48)]" />
          <span className="absolute inset-0 grid place-items-center rounded-[1.15rem] bg-ink/8 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-ink/88 px-4 py-2.5 text-sm font-semibold text-white shadow-xl">
              Abrir demo <ExternalLink size={16} />
            </span>
          </span>
        </a>}

        <div className={toolCase ? "tool-case-copy" : compact ? "flex flex-1 flex-col px-1 pb-1" : undefined}>
          <p className={toolCase ? "tool-case-kicker" : "font-mono text-[0.67rem] font-bold uppercase tracking-[0.15em] text-sky"}>{exampleLabel}</p>
          <h3 className={toolCase ? "tool-case-title" : compact ? "mt-4 text-balance text-[clamp(1.55rem,2.5vw,2.15rem)] font-semibold leading-[1.08] tracking-[-0.045em]" : "mt-5 text-balance text-[clamp(2.15rem,4.2vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.05em]"}>{title}</h3>
          <p className={toolCase ? "tool-case-summary" : compact ? "mt-4 text-sm leading-6 text-white/58" : "mt-6 max-w-xl text-base leading-7 text-white/62"}>{summary}</p>
          {toolCase ? (
            <p className="tool-case-capabilities">{tags.join(" — ")}</p>
          ) : (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => <span key={tag} className="rounded-full border border-white/12 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-white/62">{tag}</span>)}
            </div>
          )}
          <div className={toolCase ? "tool-case-action" : compact ? "mt-auto flex flex-wrap items-center gap-5 pt-7" : "mt-9 flex flex-wrap items-center gap-5"}>
            {embeddable ? (
              <button type="button" onClick={openPreview} className={toolCase ? "tool-case-cta" : buttonClass("primary")}>
                {actionLabel} <Expand size={17} aria-hidden="true" />
              </button>
            ) : (
              <a href={demoHref} target="_blank" rel="noreferrer" className={buttonClass("primary")}>
                Probar la herramienta <ExternalLink size={17} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>

      {embeddable && <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        data-closing={closing || undefined}
        onCancel={(event) => {
          event.preventDefault();
          closePreview();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePreview();
        }}
        className="experience-dialog"
      >
        <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[inherit] bg-[#071326]">
          <div className="flex min-h-14 items-center gap-3 border-b border-white/10 bg-[#0b1b31] px-3 sm:px-4">
            <div className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#ff6b63]" />
              <span className="size-2.5 rounded-full bg-gold" />
              <span className="size-2.5 rounded-full bg-[#46c799]" />
            </div>
            <div className="min-w-0 flex-1 rounded-lg border border-white/8 bg-white/[0.045] px-3 py-2 text-center">
              <p id={titleId} className="truncate text-xs font-medium text-white/70">{browserTitle}</p>
            </div>
            <a href={demoHref} target="_blank" rel="noreferrer" className="focus-ring grid size-10 shrink-0 place-items-center rounded-lg text-white/65 transition hover:bg-white/8 hover:text-white" aria-label="Abrir la web en una pestaña nueva">
              <ExternalLink size={17} aria-hidden="true" />
            </a>
            <button type="button" onClick={closePreview} className="focus-ring grid size-10 shrink-0 place-items-center rounded-lg text-white/65 transition hover:bg-white/8 hover:text-white" aria-label="Cerrar vista interactiva">
              <X size={19} aria-hidden="true" />
            </button>
          </div>

          <div className="relative min-h-0 flex-1 bg-white">
            {active && !loaded && (
              <div className="absolute inset-0 z-10 grid place-items-center bg-[#071326] text-white">
                <div className="text-center">
                  <span className="mx-auto block size-8 animate-spin rounded-full border-2 border-sky/25 border-t-sky" />
                  <p className="mt-4 text-sm text-white/60">Preparando la experiencia…</p>
                </div>
              </div>
            )}
            {active && (
              <iframe
                src={demoHref}
                title={iframeTitle}
                onLoad={() => setLoaded(true)}
                className="size-full border-0 bg-white"
                sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
                allow="fullscreen"
              />
            )}
          </div>
        </div>
      </dialog>}
    </>
  );
}
