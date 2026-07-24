"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type SequencePhase = "waiting" | "running" | "complete";

let hasPlayedGoldenSequence = false;

function createGoldenSpiral(width: number, height: number) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const decayPerRadian = (2 * Math.log(phi)) / Math.PI;
  const portrait = width / height < 0.8;
  const crossHalf = Math.min(
    width * (portrait ? 0.16 : 0.09),
    height * (portrait ? 0.09 : 0.14),
  );
  const centerX = width / 2 + crossHalf;
  const centerY = height / 2 + crossHalf;
  const startX = 0;
  const startY = height;
  const initialRadius = Math.hypot(startX - centerX, startY - centerY);
  const initialAngle = Math.atan2(startY - centerY, startX - centerX);
  const turns = 2.15;
  const points = 320;

  return Array.from({ length: points + 1 }, (_, index) => {
    const angle = initialAngle + (index / points) * turns * Math.PI * 2;
    const radius =
      initialRadius * Math.exp(-decayPerRadian * (angle - initialAngle));
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");
}

export function HeroGoldenSequence() {
  const [phase, setPhase] = useState<SequencePhase>(() =>
    hasPlayedGoldenSequence ? "complete" : "waiting",
  );
  const [viewport, setViewport] = useState({ width: 1600, height: 900 });
  const goldenCurve = useMemo(
    () => createGoldenSpiral(viewport.width, viewport.height),
    [viewport],
  );

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;

    const completeWithoutAnimation = () => {
      hero.classList.remove("is-geometry-pending");
      hero.classList.add("is-golden-complete");
      setPhase("complete");
    };

    if (
      hasPlayedGoldenSequence
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      hasPlayedGoldenSequence = true;
      completeWithoutAnimation();
      return;
    }

    const start = () => {
      if (hasPlayedGoldenSequence) return;

      hasPlayedGoldenSequence = true;
      const bounds = hero.getBoundingClientRect();
      setViewport({
        width: Math.max(1, Math.round(bounds.width)),
        height: Math.max(1, Math.round(bounds.height)),
      });
      hero.classList.add("is-golden-revealing");
      hero.classList.remove("is-geometry-pending");
      setPhase("running");
    };

    window.addEventListener("temis:hero-glitch-complete", start, { once: true });
    return () => window.removeEventListener("temis:hero-glitch-complete", start);
  }, []);

  const finish = () => {
    document.getElementById("inicio")?.classList.add("is-golden-complete");
    setPhase("complete");
  };

  return (
    <>
      <motion.div
        className="temis-hero-grid"
        aria-hidden="true"
        initial={false}
        animate={{ opacity: phase === "waiting" ? 0 : 0.105 }}
        transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="temis-grid-line is-vertical is-before" />
        <span className="temis-grid-line is-vertical is-after" />
        <span className="temis-grid-line is-horizontal is-before" />
        <span className="temis-grid-line is-horizontal is-after" />
      </motion.div>

      {phase === "running" ? (
        <svg
          className="temis-golden-curve"
          viewBox={`0 0 ${viewport.width} ${viewport.height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <mask
              id="temis-golden-window"
              maskUnits="userSpaceOnUse"
              maskContentUnits="userSpaceOnUse"
            >
              <rect width={viewport.width} height={viewport.height} fill="black" />
              <motion.path
                d={goldenCurve}
                className="temis-golden-mask-draw"
                pathLength={1}
                initial={{ strokeDashoffset: 1 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2.5, ease: [0.45, 0, 0.55, 1] }}
              />
              <motion.path
                d={goldenCurve}
                className="temis-golden-mask-erase is-soft"
                pathLength={1}
                initial={{ strokeDashoffset: 1 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  delay: 0.9,
                  duration: 1.6,
                  ease: [0.45, 0, 0.55, 1],
                }}
              />
              <motion.path
                d={goldenCurve}
                className="temis-golden-mask-erase is-medium"
                pathLength={1}
                initial={{ strokeDashoffset: 1 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  delay: 1.05,
                  duration: 1.45,
                  ease: [0.45, 0, 0.55, 1],
                }}
              />
              <motion.path
                d={goldenCurve}
                className="temis-golden-mask-erase is-solid"
                pathLength={1}
                initial={{ strokeDashoffset: 1 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  delay: 1.2,
                  duration: 1.3,
                  ease: [0.45, 0, 0.55, 1],
                }}
                onAnimationComplete={finish}
              />
            </mask>
          </defs>

          <g mask="url(#temis-golden-window)">
            <path className="temis-golden-curve-glow" d={goldenCurve} />
            <path className="temis-golden-curve-line" d={goldenCurve} />
          </g>
        </svg>
      ) : null}
    </>
  );
}
