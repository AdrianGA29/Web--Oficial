"use client";

import Image from "next/image";
import temisHero from "@/assets/images/temis-hero-v2.webp";

export function TemisHeroVisual() {
  return (
    <div className="temis-hero-figure absolute inset-y-0 right-0 z-[1]" aria-hidden="true">
      <div className="temis-hero-float absolute inset-0">
        <Image
          src={temisHero}
          alt=""
          fill
          quality={90}
          sizes="(max-width: 900px) 124vw, 64vw"
          className="temis-hero-edge temis-hero-edge-violet object-contain object-bottom"
        />
        <Image
          src={temisHero}
          alt=""
          fill
          quality={90}
          sizes="(max-width: 900px) 124vw, 64vw"
          className="temis-hero-edge temis-hero-edge-blue object-contain object-bottom"
        />
        <Image
          src={temisHero}
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={90}
          sizes="(max-width: 900px) 124vw, 64vw"
          className="temis-hero-portrait object-contain object-bottom"
        />
      </div>
      <span className="temis-hero-figure-blend absolute inset-0" />
    </div>
  );
}
