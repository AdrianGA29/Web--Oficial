import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Check,
  FileSearch,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import heroDesktop from "@/assets/images/hero-desktop.webp";
import heroMobile from "@/assets/images/hero-mobile.webp";
import { GlassCard } from "@/components/aicanvas/glass-card";
import { buttonClass } from "@/components/button";
import { ContactForm } from "@/components/contact-form";
import { CommitmentMarquee } from "@/components/commitment-marquee";
import { ExperiencePreview } from "@/components/experience-preview";
import { FaqList } from "@/components/faq";
import { FrictionEditorial } from "@/components/friction-editorial";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TeamCard } from "@/components/team-card";
import { TechnologyMarquee } from "@/components/technology-marquee";
import { TrackedLink } from "@/components/tracked-link";
import { KineticGrid } from "@/components/ui/kinetic-grid";
import { differentiators, faqs, methodSteps, team } from "@/lib/site";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Transformación operativa para pymes",
  description:
    "Convertimos procesos manuales y herramientas desconectadas en sistemas claros, medibles y preparados para crecer.",
};

const differentiatorIcons: Record<(typeof differentiators)[number]["icon"], LucideIcon> = {
  sparkles: Sparkles,
  blocks: Blocks,
  shield: ShieldCheck,
};

function HeroPicture() {
  const common = { alt: "", sizes: "100vw", quality: 84, loading: "eager" } as const;
  const { props: desktop } = getImageProps({ ...common, src: heroDesktop, fetchPriority: "high" });
  const { props: mobile } = getImageProps({ ...common, src: heroMobile, fetchPriority: "high" });
  return (
    <picture className="absolute inset-0" aria-hidden="true">
      <source media="(max-width: 767px)" srcSet={mobile.srcSet} />
      <img {...desktop} alt="" className="size-full object-cover object-center" />
    </picture>
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
      <section id="inicio" className="relative flex min-h-[max(47rem,100svh)] overflow-hidden bg-[#d9ecff] pt-28">
        <HeroPicture />
        <div className="container-shell relative z-10 flex flex-1 items-center py-14 sm:py-20">
          <div className="max-w-[46rem]">
            <div className="hero-enter">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/65 px-3.5 py-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.13em] text-primary shadow-sm backdrop-blur">
                <span className="size-1.5 rounded-full bg-blue shadow-[0_0_0_5px_rgba(47,114,196,.12)]" />
                Transformación operativa para pymes
              </div>
            </div>
            <div className="hero-enter">
              <h1 className="display-title mt-6 max-w-[12ch] text-ink drop-shadow-[0_2px_16px_rgba(255,255,255,.85)]">
                Del caos operativo a un <span className="gradient-text">sistema claro.</span>
              </h1>
            </div>
            <div className="hero-enter">
              <p className="mt-7 max-w-2xl text-[clamp(1.05rem,1.7vw,1.28rem)] font-medium leading-8 text-primary drop-shadow-[0_1px_10px_rgba(255,255,255,.95)]">
                Diagnosticamos procesos, conectamos herramientas y automatizamos con criterio técnico, legal y financiero. Primero entendemos tu empresa; después decidimos por dónde empezar.
              </p>
            </div>
            <div className="hero-enter">
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedLink href="#contacto" eventName="CTA contact" eventLocation="hero" className={buttonClass("primary", "min-h-14 px-6")}>
                  Cuéntanos tu caso <ArrowUpRight size={18} aria-hidden="true" />
                </TrackedLink>
                <Link href="#metodo" className={buttonClass("light", "min-h-14 px-6")}>
                  Ver cómo trabajamos <ArrowDown size={17} aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-4 text-sm font-medium text-primary/80">Primera sesión sin coste · Sin permanencia · Sin soluciones prefabricadas</p>
            </div>
          </div>
        </div>
      </section>

      <CommitmentMarquee />

      <section id="desafios" className="friction-editorial-section section-space">
        <div className="container-shell friction-editorial-layout">
          <Reveal className="friction-editorial-intro">
            <SectionHeading eyebrow="Señales de fricción" title="Hay cosas que una empresa no debería normalizar." description="No parecen grandes problemas por separado. Repetidos cada semana, terminan convirtiéndose en coste, lentitud y oportunidades perdidas." />
            <div className="friction-editorial-summary" aria-hidden="true">
              <div><strong>06</strong><span>señales<br />recurrentes</span></div>
              <div className="friction-editorial-dots">{Array.from({ length: 6 }, (_, index) => <i key={index} style={{ "--dot-delay": `${index * 0.16}s` } as CSSProperties} />)}</div>
              <p>Un mismo patrón: la operativa necesita un sistema.</p>
            </div>
          </Reveal>
          <Reveal y={14}><FrictionEditorial /></Reveal>
        </div>
      </section>

      <section id="soluciones" className="relative overflow-hidden text-white">
        <KineticGrid className="dark-grid noise kinetic-grid-surface section-space">
          <div className="container-shell relative z-10">
            <Reveal>
              <SectionHeading dark eyebrow="Muestra de capacidad" title="Mejor verlo funcionando." description="Una experiencia real dice más que otra lista de promesas. Esta web es una muestra de lo que podemos diseñar y construir para un cliente." />
            </Reveal>
            <Reveal className="mt-16">
              <GlassCard variant="feature">
                <div className="p-[clamp(1.2rem,3.5vw,2.75rem)]">
                  <ExperiencePreview
                    demoHref={services[2].demoHref!}
                    title="Una web que demuestra el nivel antes de explicarlo."
                    summary="Portfolio personal diseñado como una experiencia: narrativa visual, interacción y desarrollo frontend trabajando juntos. Puedes recorrerlo sin salir de esta página."
                    tags={["Dirección visual", "Motion UI", "Desarrollo frontend"]}
                  />
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </KineticGrid>
      </section>

      <section id="metodo" className="section-space bg-white">
        <div className="container-shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="Método" title="Primero entender. Después construir." description="Cinco pasos para avanzar sin inflar el alcance ni confundir movimiento con progreso." />
          </Reveal>
          <div className="relative">
            <div className="absolute bottom-8 left-[1.35rem] top-8 w-px bg-gradient-to-b from-blue via-sky/45 to-line" aria-hidden="true" />
            {methodSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.04} className="relative grid grid-cols-[2.7rem_1fr] gap-5 pb-9 last:pb-0">
                <span className="system-node relative z-10 grid size-11 place-items-center rounded-full border border-sky/30 bg-white font-mono text-[0.65rem] font-bold text-blue">{step.number}</span>
                <div className="rounded-card border border-line bg-cloud/65 p-6 sm:p-7">
                  <h3 className="text-xl font-semibold tracking-[-0.025em] text-primary sm:text-2xl">{step.title}</h3>
                  <p className="mt-3 text-[0.98rem] leading-7 text-muted">{step.description}</p>
                  <p className="mt-5 inline-flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-blue"><FileSearch size={14} aria-hidden="true" /> Entregable · {step.output}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TechnologyMarquee />

      <section id="diferenciacion" className="relative overflow-hidden text-white">
        <KineticGrid className="dark-grid noise kinetic-grid-surface section-space">
          <div className="container-shell relative z-10">
            <Reveal>
              <SectionHeading dark align="center" eyebrow="Criterio antes que ruido" title="La tecnología es el medio. El sistema es el resultado." />
            </Reveal>
            <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {differentiators.map((item, index) => {
              const Icon = differentiatorIcons[item.icon];
              return (
                <Reveal key={item.title} delay={index * 0.07}>
                  <GlassCard className="h-full">
                    <article className="h-full p-7">
                      <span className="grid size-11 place-items-center rounded-xl border border-sky/18 bg-sky/8 text-sky"><Icon size={21} aria-hidden="true" /></span>
                      <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                      <p className="mt-4 leading-7 text-white/52">{item.description}</p>
                    </article>
                  </GlassCard>
                </Reveal>
              );
            })}
            </div>
            <Reveal className="mt-6 grid overflow-hidden rounded-card border border-white/10 md:grid-cols-2">
              <div className="bg-white/[0.025] p-7 sm:p-9"><p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white/65">Enfoque habitual</p><ul className="mt-6 grid gap-4 text-white/65">{["Empezar por una herramienta", "Prometer una transformación completa", "Automatizar antes de ordenar"].map((item) => <li key={item} className="flex gap-3"><span className="text-white/55">—</span>{item}</li>)}</ul></div>
              <div className="border-t border-sky/15 bg-sky/[0.065] p-7 sm:p-9 md:border-l md:border-t-0"><p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-sky">Nuestro enfoque</p><ul className="mt-6 grid gap-4 text-white/78">{["Empezar por el proceso", "Cerrar un primer alcance útil", "Automatizar con supervisión y medida"].map((item) => <li key={item} className="flex gap-3"><Check size={17} className="mt-0.5 shrink-0 text-sky" aria-hidden="true" />{item}</li>)}</ul></div>
            </Reveal>
          </div>
        </KineticGrid>
      </section>

      <section id="equipo" className="team-showcase section-space">
        <div className="container-shell">
          <div className="team-showcase-heading grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <Reveal>
              <SectionHeading eyebrow="Tres perspectivas" title="Tres criterios. Una decisión bien tomada." description="Tecnología, marco legal y realidad financiera revisando el mismo problema antes de implantar una solución." />
            </Reveal>
            <Reveal delay={0.08} className="team-showcase-count backdrop-blur-md" aria-hidden="true">
              <strong>03</strong>
              <span>perspectivas<br />responsables</span>
            </Reveal>
          </div>
          <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.07} className="h-full">
                <TeamCard member={member} index={index} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center"><Link href="/nosotros" className="focus-ring inline-flex items-center gap-2 rounded-lg font-semibold text-blue transition-colors hover:text-primary"><span className="link-underline">Conocer el enfoque del equipo</span> <ArrowRight size={17} aria-hidden="true" /></Link></div>
        </div>
      </section>

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
