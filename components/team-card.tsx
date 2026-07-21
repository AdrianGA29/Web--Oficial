"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import adrian from "@/assets/images/Adrian.webp";
import patricia from "@/assets/images/Patricia.webp";
import alejandro from "@/assets/images/Alejandro.webp";
import { GlassCard } from "@/components/aicanvas/glass-card";
import { team } from "@/lib/site";

type TeamMember = (typeof team)[number];

const teamImages = { adrian, patricia, alejandro };

export function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const tone = member.tone === "blue" ? "103 185 228" : "237 189 104";

  return (
    <div className="h-full" style={{ "--team-tone": tone } as CSSProperties}>
      <GlassCard variant="portrait" className="group h-full">
        <article className="team-card flex h-full flex-col">
          <div className="team-card-photo relative aspect-[4/4.5] overflow-hidden bg-primary">
            <Image
              src={teamImages[member.image]}
              alt={`${member.name}, ${member.role}`}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink/72 via-ink/12 to-transparent" />
            <div className="team-card-photo-light" aria-hidden="true" />
            <p className="team-card-pillar absolute bottom-5 left-5 z-[3] backdrop-blur-xl backdrop-saturate-150">
              <span aria-hidden="true" />
              {member.pillar}
            </p>
          </div>
          <div className="team-card-copy relative z-[2] flex flex-1 flex-col p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[1.65rem] font-semibold tracking-[-0.04em] text-primary">{member.name}</h3>
                <p className="mt-1.5 text-sm font-semibold text-blue">{member.role}</p>
              </div>
              <span className="team-card-number" aria-hidden="true">0{index + 1}</span>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted">{member.description}</p>
            <div className="team-card-line mt-auto pt-6" aria-hidden="true"><span /></div>
          </div>
        </article>
      </GlassCard>
    </div>
  );
}
