"use client";

import { useEffect, useRef, useState } from "react";
import { GradientText } from "@/components/ui/gradient-text";
import { loadEditorialMotion, type MotionTimeline } from "@/lib/motion";

// One presentation per document load, not every time the visitor returns home.
let hasPlayedTextSequence = false;

function TitleLine({ words, accent = false }: { words: string[]; accent?: boolean }) {
  return (
    <span className="hero-text-line">
      {words.map((word, index) => (
        <span key={word} className="hero-text-word-slot">
          <span className="hero-text-word" data-hero-word>
            {accent ? <GradientText>{word}</GradientText> : word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

export function HeroTextSequence() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const hero = document.getElementById("inicio");
    if (!root || !hero) return;

    let disposed = false;
    let requested = false;
    let started = false;
    let sequence: MotionTimeline | undefined;
    let motionReady: (Awaited<ReturnType<typeof loadEditorialMotion>>
      & Pick<typeof import("animejs/easings"), "cubicBezier">) | undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;
    const words = root.querySelectorAll<HTMLElement>("[data-hero-word]");

    const finish = () => {
      if (disposed) return;
      started = true;
      sequence?.pause();
      root.dataset.phase = "complete";
      words.forEach((word) => {
        word.style.removeProperty("transform");
        word.style.removeProperty("opacity");
      });
      setComplete(true);
    };

    if (hasPlayedTextSequence || reducedMotion.matches) {
      finish();
      return;
    }

    root.dataset.phase = "waiting";

    const start = () => {
      requested = true;
      if (!motionReady || started || disposed) return;
      started = true;
      hasPlayedTextSequence = true;
      if (reducedMotion.matches) {
        finish();
        return;
      }

      root.dataset.phase = "playing";
      const { createTimeline, stagger, cubicBezier } = motionReady;
      const timing = (value: number) => Math.round(value * (mobile ? 0.84 : 1));
      const rise = mobile ? 25 : 105;
      const unit = mobile ? "px" : "%";
      const scenes = [
        root.querySelectorAll('[data-scene="friction"] [data-hero-word]'),
        root.querySelectorAll('[data-scene="control"] [data-hero-word]'),
        root.querySelectorAll('[data-scene="final"] [data-hero-word]'),
      ];
      sequence = createTimeline({
        autoplay: false,
        defaults: { ease: cubicBezier(0.16, 1, 0.3, 1) },
        onComplete: finish,
      });

      scenes.forEach((scene, index) => {
        sequence!.add(scene, {
          translateY: [`${rise}${unit}`, `0${unit}`],
          opacity: [0, 1],
          duration: timing(index === 2 ? 960 : 720),
          delay: stagger(timing(index === 2 ? 80 : 95)),
        }, timing([0, 1430, 2740][index]));

        if (index < 2) {
          sequence!.add(scene, {
            translateY: [`0${unit}`, `-${mobile ? 18 : 80}${unit}`],
            opacity: [1, 0],
            duration: timing(430),
            delay: stagger(timing(50)),
            ease: cubicBezier(0.55, 0, 0.8, 0.45),
          }, timing([1220, 2530][index]));
        }
      });
      sequence.play();
    };

    // Prepare the existing lightweight motion module while the portrait intro runs.
    void Promise.all([loadEditorialMotion(), import("animejs/easings")]).then(([motion, easings]) => {
      if (disposed) return;
      motionReady = { ...motion, cubicBezier: easings.cubicBezier };
      if (requested) start();
    }).catch(finish);

    window.addEventListener("temis:hero-glitch-complete", start, { once: true });
    if (hero.classList.contains("is-golden-revealing") || hero.classList.contains("is-golden-complete")) start();

    // Never leave the real heading hidden if an intro event or module fails.
    const safetyTimer = window.setTimeout(finish, 7000);
    const stopForReducedMotion = () => {
      if (reducedMotion.matches) finish();
    };
    reducedMotion.addEventListener("change", stopForReducedMotion);

    return () => {
      disposed = true;
      window.clearTimeout(safetyTimer);
      window.removeEventListener("temis:hero-glitch-complete", start);
      reducedMotion.removeEventListener("change", stopForReducedMotion);
      sequence?.revert();
      delete root.dataset.phase;
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-text-sequence">
      {!complete && (
        <div className="hero-text-intro" aria-hidden="true">
          <div className="hero-title-scene" data-scene="friction">
            <TitleLine words={["Menos"]} />
            <TitleLine words={["fricción."]} accent />
          </div>
          <div className="hero-title-scene" data-scene="control">
            <TitleLine words={["Más"]} />
            <TitleLine words={["control."]} accent />
          </div>
        </div>
      )}
      <h1 className="temis-hero-title hero-title-scene" data-scene="final" aria-label="Del caos al sistema.">
        <TitleLine words={["Del", "caos"]} />
        {" "}
        <TitleLine words={["al", "sistema."]} accent />
      </h1>
    </div>
  );
}
