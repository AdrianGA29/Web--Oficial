import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "secondary" | "inverse" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonStylesOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-brand-secondary bg-brand-secondary text-white shadow-sm hover:border-brand-primary hover:bg-brand-primary",
  secondary:
    "border-brand-primary/15 bg-white text-brand-primary shadow-sm hover:border-brand-secondary/30 hover:bg-brand-light",
  inverse:
    "border-white bg-white text-brand-primary shadow-sm hover:border-brand-light hover:bg-brand-light",
  ghost:
    "border-transparent bg-transparent text-current hover:border-current/15 hover:bg-current/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-11 px-5 py-2.5 text-base",
  lg: "min-h-12 px-6 py-3 text-base",
  icon: "size-11 p-0",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStylesOptions = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-control border font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 active:translate-y-px",
    variants[variant],
    sizes[size],
    className,
  );
}
