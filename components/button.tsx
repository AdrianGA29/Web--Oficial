import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-gradient-to-r from-[#245fb8] to-[#278ec3] text-white shadow-[0_12px_34px_rgba(47,114,196,0.27)] hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(47,114,196,0.34)]",
  dark: "bg-ink text-white hover:-translate-y-0.5 hover:bg-navy hover:shadow-xl",
  light: "border border-primary/15 bg-white/85 text-primary backdrop-blur hover:-translate-y-0.5 hover:border-blue/35 hover:bg-white",
  outline: "border border-white/22 bg-white/[0.06] text-white backdrop-blur hover:-translate-y-0.5 hover:border-sky/55 hover:bg-white/[0.1]",
};

export function buttonClass(variant: keyof typeof variants = "primary", className?: string) {
  return cn(
    "focus-ring inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[0.72rem] px-5 text-[0.92rem] font-semibold transition-[transform,background-color,border-color,box-shadow] duration-200",
    variants[variant],
    className,
  );
}
