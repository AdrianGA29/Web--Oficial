import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { commitmentStatements } from "@/components/commitment-marquee";
import { ContactForm } from "@/components/contact-form";
import { DifferentiationShowcase } from "@/components/differentiation-showcase";
import { FaqList } from "@/components/faq";
import { FrictionEditorial } from "@/components/friction-editorial";
import { HeroGoldenSequence } from "@/components/hero-golden-sequence";
import { HeroGlitchIntro } from "@/components/hero-glitch-intro";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServicesIndex } from "@/components/services-index";
import { TemisHeroVisual } from "@/components/temis-hero-visual";
import { TechnologyMarquee } from "@/components/technology-marquee";
import { ToolShowcase } from "@/components/tool-showcase";
import { TrackedLink } from "@/components/tracked-link";
import { GradientText } from "@/components/ui/gradient-text";
import { siteConfig } from "@/lib/config";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Transformación operativa para pymes` },
  description:
    "Convertimos procesos manuales y herramientas desconectadas en sistemas claros, medibles y preparados para crecer.",
};

function HeroCommitmentGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="temis-hero-marquee-group" aria-hidden={duplicate || undefined}>
      {Array.from({ length: 2 }, (_, cycle) =>
        commitmentStatements.map((statement) => (
          <li key={`${cycle}-${statement.accent}`} aria-hidden={cycle > 0 || undefined}>
            <p>
              <strong>{statement.accent}</strong>{" "}
              <span>{statement.rest}</span>
            </p>
            <span className="temis-hero-marquee-separator" aria-hidden="true">—</span>
          </li>
        )),
      )}
    </ul>
  );
}

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <section id="inicio" className="temis-hero is-glitch-pending is-geometry-pending relative flex min-h-[max(47rem,100svh)] flex-col overflow-hidden bg-[#070B1A] pt-24 text-white">
        <HeroGlitchIntro />
        <HeroGoldenSequence />

        <TemisHeroVisual />

        <div className="temis-hero-content container-shell relative z-10 flex flex-1 items-center py-12 sm:py-16">
          <div className="temis-hero-copy">
            <div className="hero-enter">
              <div className="temis-hero-eyebrow inline-flex items-center gap-2.5 font-mono text-[0.64rem] font-bold uppercase tracking-[0.16em] text-white/62">
                <span className="size-1.5 rounded-full bg-[#9b8cff] shadow-[0_0_0_5px_rgba(155,140,255,.12),0_0_18px_rgba(155,140,255,.62)]" />
                <span>Transformación operativa<span className="temis-hero-eyebrow-suffix"> para pymes</span></span>
              </div>
            </div>
            <div className="hero-enter">
              <h1 className="temis-hero-title mt-5 text-white">
                Del caos{" "}
                <span className="block"><GradientText>al sistema.</GradientText></span>
              </h1>
            </div>
            <div className="hero-enter">
              <p className="temis-hero-subtitle mt-5 max-w-[35rem] text-[clamp(1rem,1.2vw,1.12rem)] leading-8 text-white/62">
                Convertimos procesos manuales y herramientas desconectadas en una operativa clara, medible y preparada para crecer.
              </p>
            </div>
            <div className="hero-enter">
              <TrackedLink href="#contacto" eventName="CTA contact" eventLocation="hero" className="temis-matte-button temis-hero-cta mt-7">
                Empezar por un diagnóstico <ArrowUpRight size={17} aria-hidden="true" />
              </TrackedLink>
            </div>
          </div>
        </div>

        <div className="temis-hero-proof relative z-10">
          <div className="container-shell temis-hero-proof-inner">
            <p>
              <span>Una visión completa</span>
              de tu operativa
            </p>
            <div className="temis-hero-marquee">
              <div className="temis-hero-marquee-track">
                <HeroCommitmentGroup />
                <HeroCommitmentGroup duplicate />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FrictionEditorial />

      <ServicesIndex />

      <TechnologyMarquee />

      <ToolShowcase />

      <DifferentiationShowcase />

      <section id="contacto" className="dark-grid noise section-space relative overflow-hidden text-white">
        <div className="container-shell relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-sky">Hablemos de tu caso</p>
            <h2 className="section-title mt-5">Demos el primer paso hacia una operativa más clara.</h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/58">Revisamos dónde se atasca el trabajo, qué impacto tiene y si existe una primera mejora razonable. Sin venderte una solución cerrada antes de escucharte.</p>
            <div className="mt-9 grid gap-3 border-t border-white/10 pt-7 text-sm text-white/62">
              {["60 minutos para ordenar el problema", "Una prioridad explicada con criterio", "Sin compromiso ni permanencia"].map((item) => <p key={item} className="flex items-center gap-3"><Check size={16} className="text-sky" aria-hidden="true" />{item}</p>)}
            </div>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[1.35rem] border border-white/12 bg-white/[0.045] p-6 shadow-[0_28px_80px_rgba(3,10,22,.32)] backdrop-blur sm:p-8">
            <h3 className="text-2xl font-semibold tracking-[-0.03em]">Cuéntanos qué os está frenando</h3>
            <p className="mb-7 mt-2 text-sm leading-6 text-white/65">Con unas pocas señales podemos preparar mejor la primera conversación.</p>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section id="preguntas" className="section-space bg-white">
        <div className="container-shell">
          <Reveal><SectionHeading align="center" eyebrow="Preguntas frecuentes" title="Lo importante, antes de empezar" /></Reveal>
          <Reveal delay={0.08} className="mt-12"><FaqList /></Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
