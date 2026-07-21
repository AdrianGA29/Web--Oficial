import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { buttonClass } from "@/components/button";
import { KineticGrid } from "@/components/ui/kinetic-grid";

export function PageHero({
  eyebrow,
  title,
  description,
  back,
  cta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  back?: { href: string; label: string };
  cta?: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden text-white">
      <KineticGrid className="dark-grid noise kinetic-grid-surface px-0 pb-[clamp(5rem,9vw,8rem)] pt-[clamp(9rem,15vw,12rem)]">
        <div className="container-shell relative z-10">
          {back && (
            <Link href={back.href} className="focus-ring mb-8 inline-flex items-center gap-2 rounded-md text-sm font-semibold text-white/55 transition-colors hover:text-white">
              <ArrowLeft size={16} aria-hidden="true" /> <span className="link-underline">{back.label}</span>
            </Link>
          )}
          <div className="hero-enter">
            <p className="eyebrow text-sky">{eyebrow}</p>
            <h1 className="display-title mt-6 max-w-[14ch] text-white">{title}</h1>
            <p className="mt-7 max-w-2xl text-[clamp(1.05rem,1.8vw,1.3rem)] leading-8 text-white/62">{description}</p>
            {cta && (
              <Link href={cta.href} className={buttonClass("primary", "mt-9")}>
                {cta.label} <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
        <div className="absolute -bottom-28 right-[8%] size-80 rounded-full border border-sky/10" aria-hidden="true" />
        <div className="absolute -bottom-12 right-[14%] size-48 rounded-full border border-gold/10" aria-hidden="true" />
      </KineticGrid>
    </section>
  );
}
