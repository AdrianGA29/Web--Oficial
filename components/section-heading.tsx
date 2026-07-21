import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto flex flex-col items-center text-center", className)}>
      <p className="sr-only">{eyebrow}</p>
      <div className={cn("section-signature", dark && "section-signature-dark", align === "center" && "section-signature-center")} aria-hidden="true">
        <span />
        <i />
      </div>
      <h2 className={cn("section-title mt-5", align === "center" && "w-full text-center", dark && "text-white")}>{title}</h2>
      {description && (
        <p className={cn("mt-6 max-w-2xl text-[1.05rem] leading-8 text-muted", align === "center" && "text-center", dark && "text-white/58")}>{description}</p>
      )}
    </div>
  );
}
