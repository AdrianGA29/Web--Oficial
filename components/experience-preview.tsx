"use client";

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { createTimeline } from "animejs/timeline";
import { ArrowUpRight, Expand, ExternalLink, MousePointer2, X } from "lucide-react";
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
  reverse?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const cueRef = useRef<HTMLSpanElement>(null);
  const cueContentRef = useRef<HTMLSpanElement>(null);
  const cuePointerRef = useRef<HTMLSpanElement>(null);
  const cuePulseRef = useRef<HTMLElement>(null);
  const hintRevealRef = useRef<ReturnType<typeof createTimeline> | null>(null);
  const hintSequenceRef = useRef<ReturnType<typeof createTimeline> | null>(null);
  const hintDismissedRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const [active, setActive] = useState(false);
  const [closing, setClosing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const hostname = demoHref.replace(/^https?:\/\//, "").replace(/\/$/, "");

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

  useEffect(
    () => () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
      if (pointerFrameRef.current) window.cancelAnimationFrame(pointerFrameRef.current);
    },
    [],
  );

  useEffect(() => {
    const card = cardRef.current;
    const cue = cueRef.current;
    const content = cueContentRef.current;
    const pointer = cuePointerRef.current;
    const pulse = cuePulseRef.current;
    if (!card || !cue || !content || !pointer || !pulse) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (hintDismissedRef.current) return;

        if (!entry.isIntersecting) {
          hintRevealRef.current?.pause();
          hintSequenceRef.current?.pause();
          return;
        }

        if (hintSequenceRef.current) {
          hintRevealRef.current?.play();
          hintSequenceRef.current.play();
          return;
        }

        hintRevealRef.current = createTimeline({
          defaults: { ease: "out(5)" },
        })
          .add(cue, {
            opacity: [0, 1],
            duration: 520,
            delay: 700,
          })
          .add(
            content,
            {
              scale: [0.955, 1],
              translateY: [4, 0],
              duration: 620,
            },
            "-=500",
          );

        hintSequenceRef.current = createTimeline({
          loop: true,
          loopDelay: 1450,
          defaults: { ease: "out(5)" },
        })
          .add(
            pointer,
            {
              opacity: [0, 1],
              translateX: [42, 10],
              translateY: [38, 13],
              rotate: [7, 0],
              duration: 760,
              delay: 1150,
            },
          )
          .add(
            pointer,
            {
              scale: [1, 0.86, 1],
              translateX: [10, 8, 10],
              translateY: [13, 15, 13],
              duration: 320,
              ease: "inOut(4)",
            },
          )
          .add(
            pulse,
            {
              opacity: [0, 0.82, 0],
              scale: [0.28, 1.7],
              duration: 520,
              ease: "out(4)",
            },
            "-=285",
          )
          .add(
            content,
            {
              scale: [1, 0.97, 1],
              duration: 330,
              ease: "inOut(4)",
            },
            "-=500",
          )
          .add(pointer, {
            opacity: [1, 0],
            translateX: 18,
            translateY: 20,
            rotate: -3,
            duration: 380,
            delay: 520,
            ease: "in(3)",
          });
      },
      { threshold: 0.58 },
    );

    observer.observe(card);
    return () => {
      observer.disconnect();
      hintRevealRef.current?.revert();
      hintSequenceRef.current?.revert();
      hintRevealRef.current = null;
      hintSequenceRef.current = null;
    };
  }, []);

  const cancelHint = () => {
    hintDismissedRef.current = true;
    hintSequenceRef.current?.revert();
    hintRevealRef.current?.revert();
    hintRevealRef.current = null;
    hintSequenceRef.current = null;
  };

  const openPreview = () => {
    cancelHint();
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
    }, 320);
  };

  const updateTilt = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (event.clientX - left) / width;
    const y = (event.clientY - top) / height;

    if (pointerFrameRef.current) window.cancelAnimationFrame(pointerFrameRef.current);
    pointerFrameRef.current = window.requestAnimationFrame(() => {
      card.style.setProperty("--tool-rotate-x", `${(0.5 - y) * 5.5}deg`);
      card.style.setProperty("--tool-rotate-y", `${(x - 0.5) * 7}deg`);
      card.style.setProperty("--tool-glow-x", `${x * 100}%`);
      card.style.setProperty("--tool-glow-y", `${y * 100}%`);
    });
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tool-rotate-x", "0deg");
    card.style.setProperty("--tool-rotate-y", "0deg");
    card.style.setProperty("--tool-glow-x", "50%");
    card.style.setProperty("--tool-glow-y", "50%");
  };

  return (
    <>
      <article className={`tool-case-layout${reverse ? " tool-case-layout-reverse" : ""}`}>
        <button
          ref={cardRef}
          type="button"
          onClick={openPreview}
          onPointerMove={updateTilt}
          onPointerEnter={cancelHint}
          onPointerLeave={resetTilt}
          onFocus={cancelHint}
          aria-label={`Abrir ${browserTitle} en una vista interactiva`}
          className="focus-ring tool-case-window"
        >
          <span className="tool-case-window-stage">
            <ToolProductFrame type={visual} />
          </span>
          <span ref={cueRef} className="tool-case-open-cue" aria-hidden="true">
            <span ref={cueContentRef} className="tool-case-open-cue-content">
              <span>Explorar</span>
              <Expand size={15} />
            </span>
            <span ref={cuePointerRef} className="tool-case-cue-pointer">
              <MousePointer2 size={18} fill="currentColor" />
              <i ref={cuePulseRef} />
            </span>
          </span>
        </button>

        <div className="tool-case-copy">
          <div className="tool-case-copy-index" aria-hidden="true">
            <span>CASE / {exampleLabel.slice(0, 2)}</span>
            <i />
          </div>
          <p className="tool-case-kicker">PRODUCTO EN FUNCIONAMIENTO</p>
          <h3 className="tool-case-title">{title}</h3>
          <p className="tool-case-summary">{summary}</p>
          <ul className="tool-case-capabilities" aria-label="Capacidades del proyecto">
            {tags.map((tag, index) => (
              <li key={tag}>
                <span>0{index + 1}</span>
                {tag}
              </li>
            ))}
          </ul>
          <div className="tool-case-action">
            <button type="button" onClick={openPreview} className="tool-case-cta">
              {actionLabel}
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>
            <span aria-hidden="true">LIVE / {hostname}</span>
          </div>
        </div>
      </article>

      {active && (
        <dialog
          ref={dialogRef}
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          data-closing={closing || undefined}
          data-loaded={loaded || undefined}
          onCancel={(event) => {
            event.preventDefault();
            closePreview();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) closePreview();
          }}
          className="experience-dialog"
        >
          <div className="experience-dialog-shell">
            <header className="experience-dialog-header">
              <div className="experience-dialog-identity">
                <span className="experience-dialog-status" aria-hidden="true">
                  <i />
                  {loaded ? "LIVE PREVIEW" : "CONNECTING"}
                </span>
                <div>
                  <p id={titleId}>{browserTitle}</p>
                  <span>{hostname}</span>
                </div>
              </div>

              <div className="experience-dialog-actions">
                <a
                  href={demoHref}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring"
                  aria-label="Abrir el proyecto en una pestaña nueva"
                >
                  <span>Abrir aparte</span>
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={closePreview}
                  className="focus-ring"
                  aria-label="Cerrar vista interactiva"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </header>

            <div className="experience-dialog-body">
              <aside className="experience-dialog-aside">
                <span className="experience-dialog-aside-number" aria-hidden="true">
                  {exampleLabel.slice(0, 2)}
                </span>
                <p>{exampleLabel}</p>
                <h3>{title}</h3>
                <p id={descriptionId}>{summary}</p>
                <ul>
                  {tags.map((tag) => (
                    <li key={tag}>
                      <i aria-hidden="true" />
                      {tag}
                    </li>
                  ))}
                </ul>
                <div aria-hidden="true">
                  <span>INTERACTIVE BUILD</span>
                  <i />
                  <span>ONLINE</span>
                </div>
              </aside>

              <div className="experience-dialog-viewport">
                {!loaded && (
                  <div className="experience-dialog-loader" role="status">
                    <div aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                    <p>Conectando con la experiencia</p>
                    <span>{hostname}</span>
                  </div>
                )}
                <iframe
                  src={demoHref}
                  title={iframeTitle}
                  onLoad={() => setLoaded(true)}
                  className="experience-dialog-iframe"
                  sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
                  allow="fullscreen"
                />
                <span className="experience-dialog-viewport-corner is-top" aria-hidden="true" />
                <span className="experience-dialog-viewport-corner is-bottom" aria-hidden="true" />
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
