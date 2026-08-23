import { cn } from "@/lib/utils";
import temisHero from "@/assets/images/temis-hero-v2.webp";
import temisHeroMobile from "@/assets/images/temis-hero-v2-mobile.webp";
import temisHeroMobile480 from "@/assets/images/temis-hero-v2-mobile-480.webp";
import temisHeroMobile640 from "@/assets/images/temis-hero-v2-mobile-640.webp";
import temisHeroMobile768 from "@/assets/images/temis-hero-v2-mobile-768.webp";

export function HeroPortraitImage({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source
        media="(max-width: 900px)"
        sizes="100vw"
        srcSet={[
          `${temisHeroMobile480.src} 480w`,
          `${temisHeroMobile640.src} 640w`,
          `${temisHeroMobile768.src} 768w`,
          `${temisHeroMobile.src} 1000w`,
        ].join(", ")}
      />
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
