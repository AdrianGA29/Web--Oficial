"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import adrian from "@/assets/images/Adrian.webp";
import patricia from "@/assets/images/Patricia.webp";
import alejandro from "@/assets/images/Alejandro.webp";
import { team } from "@/lib/site";

type TeamMember = (typeof team)[number];

const teamImages = { adrian, patricia, alejandro };

export function TeamCard({ member }: { member: TeamMember }) {
  const cardRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const updateSpotlight = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    pointerRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      card.style.setProperty("--team-x", `${pointerRef.current.x}px`);
      card.style.setProperty("--team-y", `${pointerRef.current.y}px`);
      frameRef.current = null;
    });
  };

  const tone = member.tone === "blue" ? "103 185 228" : "237 189 104";

  return (
    <article
      ref={cardRef}
      onPointerMove={updateSpotlight}
      className="team-card group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card"
      style={{
        "--team-x": "50%",
        "--team-y": "32%",
        "--team-tone": tone,
      } as CSSProperties}
    >
      <div className="relative aspect-[4/4.55] overflow-hidden bg-primary">
        <Image
          src={teamImages[member.image]}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" />
        <div className="team-card-photo-light" aria-hidden="true" />
        <p className={`absolute bottom-5 left-5 z-[2] rounded-full border px-3 py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.13em] backdrop-blur ${member.tone === "blue" ? "border-sky/30 bg-sky/12 text-sky" : "border-gold/30 bg-gold/12 text-gold"}`}>
          {member.pillar}
        </p>
      </div>
      <div className="relative z-[2] flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-primary">{member.name}</h3>
        <p className="mt-1 text-sm font-semibold text-blue">{member.role}</p>
        <p className="mt-4 text-sm leading-6 text-muted">{member.description}</p>
      </div>
    </article>
  );
}
