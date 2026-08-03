import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { commitmentStatements } from "@/components/commitment-marquee";
import { ContactShowcase } from "@/components/contact-showcase";
import { DifferentiationShowcase } from "@/components/differentiation-showcase";
import { FaqShowcase } from "@/components/faq-showcase";
import { FrictionEditorial } from "@/components/friction-editorial";
import { HeroGoldenSequence } from "@/components/hero-golden-sequence";
import { HeroGlitchIntro } from "@/components/hero-glitch-intro";
import { ServicesIndex } from "@/components/services-index";
import { TemisHeroVisual } from "@/components/temis-hero-visual";
import { TechnologyMarquee } from "@/components/technology-marquee";
import { ToolShowcase } from "@/components/tool-showcase";
import { TrackedLink } from "@/components/tracked-link";
import { GradientText } from "@/components/ui/gradient-text";
import { siteConfig } from "@/lib/config";
import { jsonLd, organizationSchema, socialImage, websiteSchema } from "@/lib/seo";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Consultoría estratégica y tecnológica | ${siteConfig.name}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: { url: "/", images: [socialImage] },
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
  const siteSchema = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, websiteSchema],
  };

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

      <ContactShowcase />

      <FaqShowcase />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(siteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
    </>
  );
}
