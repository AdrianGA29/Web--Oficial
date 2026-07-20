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
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow", dark && "text-sky", align === "center" && "justify-center")}>{eyebrow}</p>
      <h2 className={cn("section-title mt-5", align === "center" && "mx-auto", dark && "text-white")}>{title}</h2>
      {description && (
        <p className={cn("mt-6 max-w-2xl text-[1.05rem] leading-8 text-muted", align === "center" && "mx-auto", dark && "text-white/58")}>{description}</p>
      )}
    </div>
  );
}
