"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Expand, ExternalLink, X } from "lucide-react";
import { buttonClass } from "@/components/button";
import { ProductVisual } from "@/components/product-visual";

export function ExperiencePreview({
  demoHref,
  serviceHref,
  title,
  summary,
  tags,
}: {
  demoHref: string;
  serviceHref: string;
  title: string;
  summary: string;
  tags: string[];
}) {
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
      <article className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <button
          type="button"
          onClick={openPreview}
          aria-label="Abrir la web portfolio en una vista interactiva"
          className="focus-ring group relative block w-full rounded-[1.15rem] text-left"
        >
          <ProductVisual type="web" className="transition-[transform,box-shadow,border-color] duration-300 ease-out group-hover:-translate-y-1 group-hover:border-sky/30 group-hover:shadow-[0_34px_90px_rgba(3,10,22,0.48)]" />
          <span className="absolute inset-0 grid place-items-center rounded-[1.15rem] bg-ink/8 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-ink/88 px-4 py-2.5 text-sm font-semibold text-white shadow-xl">
              Ver experiencia <Expand size={16} />
            </span>
          </span>
        </button>

        <div>
          <p className="font-mono text-[0.67rem] font-bold uppercase tracking-[0.15em] text-sky">Ejemplo 01 · Web interactiva</p>
          <h3 className="mt-5 text-balance text-[clamp(2.15rem,4.2vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.05em]">{title}</h3>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/62">{summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => <span key={tag} className="rounded-full border border-white/12 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-white/62">{tag}</span>)}
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <button type="button" onClick={openPreview} className={buttonClass("primary")}>
              Ver la web aquí <Expand size={17} aria-hidden="true" />
            </button>
            <Link href={serviceHref} className="focus-ring inline-flex items-center gap-2 rounded-lg font-semibold text-sky transition-colors hover:text-white">
              <span className="link-underline">Cómo construimos webs</span> <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>

      <dialog
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
              <p id={titleId} className="truncate text-xs font-medium text-white/70">Portfolio · Adrián García</p>
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
                title="Portfolio interactivo de Adrián García"
                onLoad={() => setLoaded(true)}
                className="size-full border-0 bg-white"
                sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
                allow="fullscreen"
              />
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
