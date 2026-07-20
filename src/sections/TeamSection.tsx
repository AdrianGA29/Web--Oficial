import {
  useEffect,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import {
  BriefcaseBusiness,
  Code2,
  Sparkles,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import { AnimateOnScroll } from "../components/ui/AnimateOnScroll";
import { SectionHeading } from "../components/ui/SectionHeading";
import { teamMembers } from "../data/site";
import type { TeamMember } from "../types";

const AUTO_SCROLL_SPEED = 0.65;
const MAX_INERTIA = 20;

type DepartmentStyle = {
  color: string;
  glow: string;
  icon: LucideIcon;
  spotlight: string;
};

const departmentStyles: Record<TeamMember["department"], DepartmentStyle> = {
  Desarrollo: {
    color: "#67b9e4",
    glow: "rgba(103,185,228,0.42)",
    icon: Code2,
    spotlight: "rgba(103,185,228,0.62)",
  },
  "Dirección y Administración": {
    color: "#edbd68",
    glow: "rgba(237,189,104,0.38)",
    icon: BriefcaseBusiness,
    spotlight: "rgba(237,189,104,0.58)",
  },
};

function TeamCard({ member, hidden = false }: { member: TeamMember; hidden?: boolean }) {
  const cardRef = useRef<HTMLElement>(null);
  const department = departmentStyles[member.department];
  const DepartmentIcon = department.icon;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card || event.pointerType === "touch") return;

    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      aria-hidden={hidden || undefined}
      className="group relative h-[26rem] w-[18rem] shrink-0 select-none overflow-hidden rounded-card shadow-card sm:h-[30rem] sm:w-[21rem] lg:h-[34rem] lg:w-[24rem]"
      style={{
        "--spotlight-x": "50%",
        "--spotlight-y": "35%",
        "--department-color": department.color,
        "--department-glow": department.glow,
        "--department-spotlight": department.spotlight,
      } as CSSProperties}
    >
      <img
        src={member.image}
        alt={hidden ? "" : member.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="size-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(14,42,82,0.88) 0%, rgba(14,42,82,0.45) 32%, rgba(14,42,82,0.08) 55%, transparent 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(330px circle at var(--spotlight-x) var(--spotlight-y), rgba(255,255,255,0.82) 0%, var(--department-spotlight) 32%, transparent 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          boxShadow:
            "inset 0 0 0 1px var(--department-color), inset 0 0 38px var(--department-glow)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-card p-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--spotlight-x) var(--spotlight-y), #ffffff 0%, var(--department-color) 38%, transparent 72%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.65rem] font-semibold uppercase text-[#8dd4f0]">
          <span
            className="inline-flex items-center gap-1.5"
            style={{ color: department.color }}
          >
            <DepartmentIcon className="size-3" aria-hidden="true" />
            {member.department}
          </span>
          <span className="inline-flex items-center gap-1.5 text-white/65">
            <Sparkles className="size-3" aria-hidden="true" />
            Especialidad en IA
          </span>
        </div>

        <h3 className="text-[1.35rem] font-bold leading-tight text-white transition-transform duration-200 ease-out group-hover:-translate-y-0.5 sm:text-2xl">
          {member.name}
        </h3>

        <p className="mt-1 text-[0.85rem] font-medium leading-snug text-white/65 transition-[color,transform] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:text-white/80 sm:text-sm">
          {member.title}
        </p>

        <div
          className="mt-3 h-0.5 w-full origin-left scale-x-40 transition-transform duration-200 ease-out group-hover:scale-x-100"
          style={{ backgroundColor: department.color }}
        />
      </div>
    </article>
  );
}

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const interactionPausedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const inertiaRef = useRef(0);
  const currentSpeedRef = useRef(AUTO_SCROLL_SPEED);
  const initializedRef = useRef(false);
  const resumeTimeoutRef = useRef<number | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.08 });
  const shouldReduceMotion = useReducedMotion();

  const clearResumeTimeout = () => {
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const scheduleResume = (delay = 1200) => {
    clearResumeTimeout();
    resumeTimeoutRef.current = window.setTimeout(() => {
      interactionPausedRef.current = false;
    }, delay);
  };

  useEffect(() => {
    let animationId = 0;

    const animate = () => {
      const container = scrollRef.current;
      if (!container) {
        animationId = window.requestAnimationFrame(animate);
        return;
      }

      const copyWidth = container.scrollWidth / 3;
      if (!initializedRef.current && copyWidth > 0) {
        container.scrollLeft = copyWidth;
        initializedRef.current = true;
      }

      if (isInView && !shouldReduceMotion && !isDraggingRef.current) {
        if (Math.abs(inertiaRef.current) > 0.04) {
          container.scrollLeft -= inertiaRef.current;
          inertiaRef.current *= 0.95;
        } else {
          inertiaRef.current = 0;
          const targetSpeed = interactionPausedRef.current ? 0 : AUTO_SCROLL_SPEED;
          currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.08;
          container.scrollLeft += currentSpeedRef.current;
        }
      }

      if (copyWidth > 0) {
        if (container.scrollLeft >= copyWidth * 2) {
          container.scrollLeft -= copyWidth;
          startScrollLeftRef.current -= copyWidth;
        } else if (container.scrollLeft < copyWidth) {
          container.scrollLeft += copyWidth;
          startScrollLeftRef.current += copyWidth;
        }
      }

      animationId = window.requestAnimationFrame(animate);
    };

    animationId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationId);
  }, [isInView, shouldReduceMotion]);

  useEffect(() => () => clearResumeTimeout(), []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const container = scrollRef.current;
    if (!container) return;

    clearResumeTimeout();
    container.setPointerCapture(event.pointerId);
    isDraggingRef.current = true;
    interactionPausedRef.current = true;
    startXRef.current = event.clientX;
    startScrollLeftRef.current = container.scrollLeft;
    lastXRef.current = event.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    inertiaRef.current = 0;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container || !isDraggingRef.current) return;

    const now = performance.now();
    const elapsed = now - lastTimeRef.current;
    container.scrollLeft = startScrollLeftRef.current - (event.clientX - startXRef.current);

    if (elapsed > 0) {
      velocityRef.current = ((event.clientX - lastXRef.current) / elapsed) * 16.6;
    }
    lastXRef.current = event.clientX;
    lastTimeRef.current = now;
  };

  const finishDragging = (event: PointerEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container || !isDraggingRef.current) return;

    isDraggingRef.current = false;
    if (container.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }

    if (!shouldReduceMotion && Math.abs(velocityRef.current) > 0.5) {
      inertiaRef.current = Math.min(Math.max(velocityRef.current, -MAX_INERTIA), MAX_INERTIA);
    }
    scheduleResume(1800);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;

    event.preventDefault();
    interactionPausedRef.current = true;
    const firstCard = container.querySelector<HTMLElement>("article");
    const gap = Number.parseFloat(getComputedStyle(container).columnGap) || 0;
    const distance = (firstCard?.offsetWidth ?? 300) + gap;
    container.scrollBy({
      left: event.key === "ArrowRight" ? distance : -distance,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
    scheduleResume(1800);
  };

  const duplicatedMembers = [0, 1, 2].flatMap((copy) =>
    teamMembers.map((member) => ({ copy, member })),
  );

  return (
    <section
      ref={sectionRef}
      id="equipo"
      className="relative z-20 w-full overflow-hidden border-t border-border-subtle bg-surface-muted py-[clamp(4rem,7vw,7rem)]"
    >
      <div className="mx-auto max-w-7xl px-6 text-center">
        <AnimateOnScroll>
          <div className="mx-auto mb-5 flex size-11 items-center justify-center rounded-control bg-brand-secondary text-white shadow-sm">
            <UserRoundCheck size={23} aria-hidden="true" />
          </div>
        </AnimateOnScroll>

        <SectionHeading
          eyebrow="Equipo multidisciplinar"
          title="Cada solución se valida antes de implantarla"
        />

        <AnimateOnScroll delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-[clamp(1rem,1.25vw,1.2rem)] leading-relaxed text-[#3b5b8c]">
            Combinamos visión de negocio, diseño, desarrollo, sistemas, legal y administración para definir soluciones viables, claras y mantenibles.
          </p>
        </AnimateOnScroll>
      </div>

      <AnimateOnScroll delay={0.3} className="mt-[clamp(2.5rem,5vw,4.5rem)]">
        <div className="relative w-full">
          <div
            ref={scrollRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Carrusel del equipo"
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDragging}
            onPointerCancel={finishDragging}
            onPointerEnter={() => {
              clearResumeTimeout();
              interactionPausedRef.current = true;
            }}
            onPointerLeave={() => {
              if (!isDraggingRef.current) scheduleResume(500);
            }}
            onFocus={() => {
              clearResumeTimeout();
              interactionPausedRef.current = true;
            }}
            onBlur={() => scheduleResume(500)}
            onKeyDown={handleKeyDown}
            className="flex cursor-grab gap-5 overflow-x-auto py-6 [scrollbar-width:none] [touch-action:pan-y] active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-inset [&::-webkit-scrollbar]:hidden sm:gap-7 lg:gap-9"
          >
            {duplicatedMembers.map(({ copy, member }) => (
              <div key={`${member.name}-${copy}`} className="flex shrink-0">
                <TeamCard member={member} hidden={copy !== 1} />
              </div>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
