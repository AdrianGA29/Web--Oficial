"use client";

import { HeroPortraitImage } from "@/components/hero-portrait-image";

export function TemisHeroVisual() {
  return (
    <div className="temis-hero-figure absolute inset-y-0 right-0 z-[1]" aria-hidden="true">
      <div className="temis-hero-float absolute inset-0">
        <HeroPortraitImage
          className="temis-hero-edge temis-hero-edge-violet object-contain object-bottom"
        />
        <HeroPortraitImage
          className="temis-hero-edge temis-hero-edge-blue object-contain object-bottom"
        />
        <HeroPortraitImage
          priority
          className="temis-hero-portrait object-contain object-bottom"
        />
      </div>
      <span className="temis-hero-figure-blend absolute inset-0" />
    </div>
  );
}
