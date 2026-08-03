import { cn } from "@/lib/utils";
import temisHero from "@/assets/images/temis-hero-v2.webp";
import temisHeroMobile from "@/assets/images/temis-hero-v2-mobile.webp";

export function HeroPortraitImage({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source media="(max-width: 900px)" srcSet={temisHeroMobile.src} />
      <img
        src={temisHero.src}
        width={temisHero.width}
        height={temisHero.height}
        alt=""
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={cn("absolute inset-0 size-full", className)}
      />
    </picture>
  );
}
