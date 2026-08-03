"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HeroPortraitImage } from "@/components/hero-portrait-image";

let hasPlayedHeroGlitch = false;

const fragments = [
  { clip: "inset(0 0 86% 0)", x: [0, -22, 12, -5, 0], delay: 0.02, tone: "blue" },
  { clip: "inset(14% 0 72% 0)", x: [0, 30, -13, 7, 0], delay: 0.055, tone: "yellow" },
  { clip: "inset(28% 0 57% 0)", x: [0, -36, 18, -8, 0], delay: 0.015, tone: "neutral" },
  { clip: "inset(43% 0 42% 0)", x: [0, 25, -16, 5, 0], delay: 0.075, tone: "blue" },
  { clip: "inset(58% 0 27% 0)", x: [0, -28, 14, -5, 0], delay: 0.035, tone: "yellow" },
  { clip: "inset(73% 0 13% 0)", x: [0, 21, -11, 4, 0], delay: 0.09, tone: "neutral" },
  { clip: "inset(87% 0 0 0)", x: [0, -17, 9, -3, 0], delay: 0.06, tone: "blue" },
] as const;

export function HeroGlitchIntro() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (hasPlayedHeroGlitch) {
      hero?.classList.remove("is-glitch-pending");
      return;
    }

    let startTimer = 0;
    const play = () => {
      if (hasPlayedHeroGlitch) return;

      hasPlayedHeroGlitch = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        hero?.classList.remove("is-glitch-pending");
        return;
      }

      if (!hero) return;

      hero.dataset.glitchStartedAt = String(performance.now());
      hero.classList.remove("is-glitch-pending");
      hero.classList.add("is-glitching");
      setActive(true);
    };

    // The intro is decorative and must never wait for every image, iframe or
    // third-party resource to finish loading. Starting shortly after hydration
    // preserves the sequence without delaying the hero's primary content.
    startTimer = window.setTimeout(play, 80);

    return () => {
      window.clearTimeout(startTimer);
    };
  }, []);

  if (!active) return null;

  const finish = () => {
    const hero = document.getElementById("inicio");
    hero?.classList.remove("is-glitching");
    hero?.classList.remove("is-glitch-pending");
    if (hero) delete hero.dataset.glitchStartedAt;
    setActive(false);
    window.dispatchEvent(new Event("temis:hero-glitch-complete"));
  };

  return (
    <motion.div
      className="temis-hero-glitch"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.72, 1, 0] }}
      transition={{ duration: 1, times: [0, 0.035, 0.2, 0.47, 1], ease: "linear" }}
      onAnimationComplete={finish}
    >
      <div className="temis-hero-glitch-figure">
        {fragments.map((fragment, index) => (
          <motion.div
            key={fragment.clip}
            className={`temis-hero-glitch-fragment is-${fragment.tone}`}
            style={{ clipPath: fragment.clip }}
            initial={{ opacity: 0, x: 0 }}
            animate={{
              opacity: [0, 0.98, 0.72, 0.94, 0.82, 0],
              x: [fragment.x[1], fragment.x[2], fragment.x[1] * 0.5, fragment.x[3], 0, 0],
              scaleX: [1.012, 0.994, 1.018, 1.006, 1, 1],
            }}
            transition={{
              duration: 0.96,
              delay: fragment.delay,
              times: [0, 0.06, 0.25, 0.48, 0.78, 1],
              ease: "linear",
            }}
          >
            <HeroPortraitImage className="object-contain object-bottom" />
          </motion.div>
        ))}
      </div>

      <motion.span
        className="temis-hero-glitch-band band-one"
        animate={{ opacity: [0, 0.76, 0.12, 0.55, 0], x: ["-4%", "3%", "-2%", "1%", "0%"] }}
        transition={{ duration: 0.56, delay: 0.04, times: [0, 0.1, 0.34, 0.55, 1], ease: "linear" }}
      />
      <motion.span
        className="temis-hero-glitch-band band-two"
        animate={{ opacity: [0, 0.62, 0.08, 0.42, 0], x: ["3%", "-4%", "2%", "-1%", "0%"] }}
        transition={{ duration: 0.7, delay: 0.11, times: [0, 0.08, 0.25, 0.5, 1], ease: "linear" }}
      />
      <motion.span
        className="temis-hero-glitch-scan"
        animate={{ opacity: [0, 0.62, 0.16, 0], y: ["-12vh", "25vh", "72vh", "102vh"] }}
        transition={{ duration: 0.62, delay: 0.08, times: [0, 0.12, 0.68, 1], ease: "linear" }}
      />
    </motion.div>
  );
}
