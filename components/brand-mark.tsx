"use client";

import { useEffect, useRef } from "react";
import { loadEditorialMotion, type MotionTimeline } from "@/lib/motion";
import { cn } from "@/lib/utils";

let hasFormedHeaderMark = false;

// The supplied vector's geometry is preserved; only its export margins are cropped.
const cx = 297.64;
const cy = 420.94;
const radius = 244.96;
function ringPoint(x: number, y: number) {
  const angle = Math.atan2(y - cy, x - cx);
  return `${cx + radius * Math.cos(angle)} ${cy + radius * Math.sin(angle)}`;
}
const first = ringPoint(74.11, 320.07);
const second = ringPoint(495.15, 565.82);

export function BrandMark({ animated = false, className }: { animated?: boolean; className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animated) return;
    const svg = svgRef.current;
    if (!svg) return;
    const wordmark = svg.closest(".brand-link")?.querySelectorAll<HTMLElement>(".brand-wordmark-word");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let starting = false;
    let timeline: MotionTimeline | undefined;
    const finish = () => {
      if (disposed) return;
      timeline?.pause();
      svg.dataset.state = "complete";
      wordmark?.forEach(word => {
        word.style.removeProperty("opacity");
        word.style.removeProperty("transform");
      });
    };
    if (hasFormedHeaderMark || reducedMotion.matches) {
      finish();
      return;
    }

    const start = async () => {
      if (starting || disposed) return;
      starting = true;
      try {
        const [{ createTimeline, stagger }, { cubicBezier }] = await Promise.all([
          loadEditorialMotion(), import("animejs/easings"),
        ]);
        if (disposed) return;
        if (reducedMotion.matches) { finish(); return; }
        hasFormedHeaderMark = true;
        svg.dataset.state = "forming";
        timeline = createTimeline({
          defaults: { ease: cubicBezier(0.22, 1, 0.36, 1) },
          onComplete: finish,
        })
          .add(svg.querySelectorAll("[data-logo-node]"), {
            opacity: [0.55, 1], duration: 440, delay: stagger(90),
          }, 0)
          .add(svg.querySelectorAll("[data-logo-arc]"), {
            strokeDashoffset: [1, 0], duration: 1000, delay: stagger(80),
          }, 100)
          .add(svg.querySelectorAll("[data-logo-line]"), {
            strokeDashoffset: [1, 0], duration: 650, delay: stagger(65),
          }, 440);
        if (wordmark?.length) {
          timeline.add(wordmark, {
            translateY: ["110%", "0%"],
            opacity: [0, 1],
            duration: 740,
            delay: stagger(90),
          }, 650);
        }
      } catch { finish(); }
    };

    // The mobile header starts outside the hero: form the mark when it becomes visible.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return;
      observer.disconnect();
      void start();
    }, { threshold: 0.5 });
    observer.observe(svg);
    const motionChange = () => { if (reducedMotion.matches) finish(); };
    reducedMotion.addEventListener("change", motionChange);
    return () => {
      disposed = true;
      observer.disconnect();
      reducedMotion.removeEventListener("change", motionChange);
      timeline?.revert();
    };
  }, [animated]);

  return (
    <svg ref={svgRef} viewBox="42 165 512 512" width="64" height="64"
      aria-hidden="true" focusable="false"
      className={cn("brand-mark", className)} data-state={animated ? "pending" : "complete"}>
      <circle className="brand-mark-ring" cx={cx} cy={cy} r={radius}
        fill="none" stroke="currentColor" strokeWidth="10" />
      {animated && <g className="brand-mark-arcs" fill="none" stroke="currentColor" strokeWidth="10">
        <path data-logo-arc pathLength="1" d={`M ${first} A ${radius} ${radius} 0 1 1 ${second}`} />
        <path data-logo-arc pathLength="1" d={`M ${second} A ${radius} ${radius} 0 0 1 ${first}`} />
      </g>}
      <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path data-logo-line pathLength="1" d="M115.01 320.07H191.62L194.31 565.82" />
        <path data-logo-line pathLength="1" d="M191.62 320.07L352.24 565.82" />
        <path data-logo-line pathLength="1" d="M215.19 320.07H393.95" />
        <path data-logo-line pathLength="1" d="M192.92 438.55H397.94" />
        <path data-logo-line pathLength="1" d="M453.77 565.82H377.32" />
      </g>
      <g fill="currentColor" stroke="currentColor" strokeWidth="11">
        <circle data-logo-node cx="74.11" cy="320.07" r="10.02" />
        <circle data-logo-node cx="495.15" cy="565.82" r="10.02" />
      </g>
    </svg>
  );
}
