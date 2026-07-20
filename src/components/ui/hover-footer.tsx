import { useId, useRef, useState, type MouseEvent } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";

type TextHoverEffectProps = {
  text: string;
  className?: string;
};

export function TextHoverEffect({ text, className }: TextHoverEffectProps) {
  const id = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const gradientId = `${id}-text-gradient`;
  const maskGradientId = `${id}-reveal-gradient`;
  const maskId = `${id}-text-mask`;

  const handlePointerMove = (event: MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMaskPosition({
      cx: `${((event.clientX - rect.left) / rect.width) * 100}%`,
      cy: `${((event.clientY - rect.top) / rect.height) * 100}%`,
    });
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 1200 220"
      xmlns="http://www.w3.org/2000/svg"
      textRendering="geometricPrecision"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handlePointerMove}
      className={cn("select-none", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#67b9e4" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#2f72c4" />
        </linearGradient>
        <radialGradient
          id={maskGradientId}
          gradientUnits="objectBoundingBox"
          r="24%"
          cx={maskPosition.cx}
          cy={maskPosition.cy}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id={maskId}>
          <rect width="100%" height="100%" fill={`url(#${maskGradientId})`} />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        textLength="980"
        lengthAdjust="spacing"
        className="fill-transparent stroke-white/20 font-[Arial] text-[12.5rem] font-bold"
        strokeWidth="1"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{ opacity: hovered ? 0.65 : 0 }}
      >
        {text}
      </text>

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        textLength="980"
        lengthAdjust="spacing"
        className="fill-transparent stroke-brand-accent font-[Arial] text-[12.5rem] font-bold"
        strokeWidth="1"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={
          shouldReduceMotion
            ? false
            : { strokeDashoffset: 1000, strokeDasharray: 1000, opacity: 0 }
        }
        animate={
          shouldReduceMotion || isInView
            ? { strokeDashoffset: 0, strokeDasharray: 1000, opacity: 1 }
            : { strokeDashoffset: 1000, strokeDasharray: 1000, opacity: 0 }
        }
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 2.4, ease: "easeOut" }}
      >
        {text}
      </motion.text>

      {hovered && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          textLength="980"
          lengthAdjust="spacing"
          className="fill-transparent font-[Arial] text-[12.5rem] font-bold"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.25"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          mask={`url(#${maskId})`}
        >
          {text}
        </text>
      )}
    </svg>
  );
}

export function FooterBackgroundGradient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(90% 75% at 50% 100%, rgba(47, 114, 196, 0.26) 0%, rgba(8, 26, 51, 0) 72%)",
      }}
      aria-hidden="true"
    />
  );
}
