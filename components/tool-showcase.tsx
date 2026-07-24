"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Boxes, CircleDot, Code2 } from "lucide-react";
import { GlassCard } from "@/components/aicanvas/glass-card";
import { ExperiencePreview } from "@/components/experience-preview";

const spring = { type: "spring", stiffness: 150, damping: 22, mass: 0.8 } as const;

export function ToolShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeTool, setActiveTool] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ambientY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const railX = useTransform(scrollYProgress, [0, 1], ["-20%", "120%"]);

  const cardMotion = (index: number) => ({
    scale: activeTool === null ? 1 : activeTool === index ? 1.012 : 0.984,
    y: activeTool === index ? -5 : 0,
    opacity: activeTool === null || activeTool === index ? 1 : 0.86,
  });

  return (
    <div ref={sectionRef} className="relative mt-12">
      <motion.div
        aria-hidden="true"
        style={{ y: reducedMotion ? 0 : ambientY }}
        className="pointer-events-none absolute -left-24 top-12 size-72 rounded-full bg-blue/12 blur-[90px]"
      />
      <motion.div
        aria-hidden="true"
        animate={reducedMotion ? undefined : { y: [0, -14, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-10 bottom-4 size-64 rounded-full bg-sky/8 blur-[88px]"
      />

      <div className="relative mb-6 flex items-center gap-4 overflow-hidden rounded-full border border-white/10 bg-white/[0.035] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-md sm:px-5">
        <span className="flex shrink-0 items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white/62">
          <CircleDot size={13} className="text-sky" aria-hidden="true" />
          02 sistemas activos
        </span>
        <div className="relative h-px min-w-10 flex-1 overflow-hidden bg-white/10" aria-hidden="true">
          <motion.span
            style={{ x: reducedMotion ? "45%" : railX }}
            className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-sky to-transparent shadow-[0_0_12px_rgba(103,185,228,.75)]"
          />
        </div>
        <span className="hidden shrink-0 text-xs font-medium text-white/45 sm:block">Web + gestión operativa</span>
      </div>

      <div className="relative grid grid-cols-[minmax(0,1fr)] gap-5 xl:grid-cols-2">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 44, rotateX: 5 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="h-full min-w-0"
        >
          <motion.div
            animate={cardMotion(0)}
            transition={spring}
            onHoverStart={() => setActiveTool(0)}
            onHoverEnd={() => setActiveTool(null)}
            onFocusCapture={() => setActiveTool(0)}
            onBlurCapture={() => setActiveTool(null)}
            className="h-full min-w-0"
          >
            <GlassCard variant="feature" className="h-full">
              <div className="h-full p-[clamp(1rem,2.2vw,1.55rem)]">
                <ExperiencePreview
                  compact
                  demoHref="https://portfoliopersonal-nu.vercel.app/"
                  title="Una web que demuestra el nivel antes de explicarlo."
                  summary="Narrativa visual, interacción y desarrollo frontend trabajando como una sola experiencia."
                  tags={["Dirección visual", "Motion UI", "Frontend"]}
                />
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 54, rotateX: 5 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="h-full min-w-0"
        >
          <motion.div
            animate={cardMotion(1)}
            transition={spring}
            onHoverStart={() => setActiveTool(1)}
            onHoverEnd={() => setActiveTool(null)}
            onFocusCapture={() => setActiveTool(1)}
            onBlurCapture={() => setActiveTool(null)}
            className="h-full min-w-0"
          >
            <GlassCard variant="feature" className="h-full">
              <div className="h-full p-[clamp(1rem,2.2vw,1.55rem)]">
                <ExperiencePreview
                  compact
                  demoHref="https://azoragestion.vercel.app/"
                  visual="crm"
                  exampleLabel="Ejemplo 02 · Herramienta de gestión"
                  browserTitle="Demo CRM comercial"
                  iframeTitle="Demo interactiva de un CRM comercial"
                  actionLabel="Probar la herramienta"
                  title="Un CRM que convierte actividad dispersa en decisiones visibles."
                  summary="Dashboard, bandeja, oportunidades y seguimiento reunidos en una herramienta operativa."
                  tags={["CRM comercial", "Flujos operativos", "Seguimiento"]}
                />
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.2 }}
        className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-5 text-xs text-white/42"
      >
        <span className="flex items-center gap-2"><Code2 size={14} className="text-sky/70" aria-hidden="true" /> Experiencias digitales a medida</span>
        <span className="flex items-center gap-2"><Boxes size={14} className="text-sky/70" aria-hidden="true" /> Sistemas conectados al trabajo real</span>
      </motion.div>
    </div>
  );
}
