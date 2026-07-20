import type { Metadata } from "next";
import { getImageProps } from "next/image";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Check,
  FileSearch,
  Files,
  MessagesSquare,
  ReceiptText,
  Repeat2,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import heroDesktop from "@/assets/images/hero-desktop.webp";
import heroMobile from "@/assets/images/hero-mobile.webp";
import adrian from "@/assets/images/Adrian.webp";
import patricia from "@/assets/images/Patricia.webp";
import alejandro from "@/assets/images/Alejandro.webp";
import { buttonClass } from "@/components/button";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/faq";
import { ProductVisual } from "@/components/product-visual";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { challenges, commitments, differentiators, faqs, methodSteps, team } from "@/lib/site";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Transformación operativa para pymes",
  description:
    "Convertimos procesos manuales y herramientas desconectadas en sistemas claros, medibles y preparados para crecer.",
};

const challengeIcons: Record<(typeof challenges)[number]["icon"], LucideIcon> = {
  messages: MessagesSquare,
  receipt: ReceiptText,
  files: Files,
  repeat: Repeat2,
  search: SearchCheck,
  workflow: Workflow,
};

const differentiatorIcons: Record<(typeof differentiators)[number]["icon"], LucideIcon> = {
  sparkles: Sparkles,
  blocks: Blocks,
  shield: ShieldCheck,
};

const teamImages: Record<(typeof team)[number]["image"], StaticImageData> = { adrian, patricia, alejandro };

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
                <TrackedLink href="/diagnostico" eventName="CTA diagnostic" eventLocation="hero" className={buttonClass("primary", "min-h-14 px-6")}>
                  Solicita tu diagnóstico <ArrowUpRight size={18} aria-hidden="true" />
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

      <section aria-label="Compromisos de trabajo" className="relative z-10 border-y border-white/10 bg-ink py-5 text-white">
        <div className="container-shell grid gap-4 sm:grid-cols-3">
          {commitments.map((commitment) => (
            <div key={commitment} className="flex items-center justify-center gap-3 text-center text-sm font-semibold text-white/78 sm:border-r sm:border-white/10 sm:last:border-0">
              <Check size={16} className="text-sky" aria-hidden="true" /> {commitment}
            </div>
          ))}
        </div>
      </section>

      <section id="desafios" className="section-space bg-cloud">
        <div className="container-shell">
          <Reveal>
            <SectionHeading eyebrow="Señales de fricción" title="¿Esto también pasa en tu empresa?" description="El desorden rara vez aparece de golpe. Se acumula en pequeñas tareas, decisiones sin contexto y herramientas que nunca llegaron a formar un sistema." />
          </Reveal>
          <div className="mt-14 grid gap-4 lg:grid-cols-12">
            {challenges.map((challenge, index) => {
              const Icon = challengeIcons[challenge.icon];
              return (
                <Reveal key={challenge.title} delay={index * 0.045} className={challenge.featured ? "lg:col-span-6" : "lg:col-span-3"}>
                  <article className={`card-lift group h-full rounded-card border border-line bg-white p-6 shadow-[0_12px_38px_rgba(6,15,31,.045)] ${challenge.featured ? "min-h-[21rem] sm:p-8" : "min-h-[18rem]"}`}>
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid size-11 place-items-center rounded-xl border border-blue/12 bg-blue/[0.065] text-blue transition group-hover:border-blue/25 group-hover:bg-blue/10"><Icon size={21} aria-hidden="true" /></span>
                      <span className="font-mono text-[0.62rem] font-bold tracking-[0.14em] text-primary/80">0{index + 1}</span>
                    </div>
                    <h3 className={`mt-7 text-balance font-semibold leading-tight tracking-[-0.025em] text-primary ${challenge.featured ? "text-[clamp(1.5rem,2.6vw,2rem)]" : "text-xl"}`}>{challenge.title}</h3>
                    <p className="mt-4 text-[0.95rem] leading-7 text-muted">{challenge.description}</p>
                    <p className="mt-6 border-t border-line pt-5 text-sm font-semibold leading-6 text-blue">{challenge.question}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="soluciones" className="dark-grid noise section-space relative overflow-hidden text-white">
        <div className="container-shell relative z-10">
          <Reveal>
            <SectionHeading dark eyebrow="Capacidad demostrable" title="Herramientas que hacen visible el cambio" description="No enseñamos tecnología por enseñar. Estas interfaces representan dos formas concretas de convertir conocimiento disperso en un flujo útil." />
          </Reveal>
          <div className="mt-16 grid gap-20">
            {[services[1], services[2]].map((service, index) => (
              <article key={service.slug} className="grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
                <Reveal className={index % 2 ? "lg:order-2" : ""}>
                  <ProductVisual type={service.visual} />
                </Reveal>
                <Reveal delay={0.08} className={index % 2 ? "lg:order-1" : ""}>
                  <p className="font-mono text-[0.67rem] font-bold uppercase tracking-[0.15em] text-sky">{service.index} · {service.eyebrow}</p>
                  <h3 className="mt-5 text-balance text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.04] tracking-[-0.045em]">{service.title}</h3>
                  <p className="mt-6 text-base leading-7 text-white/58">{service.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => <span key={tag} className="rounded-full border border-white/12 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-white/58">{tag}</span>)}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href={`/servicios/${service.slug}`} className="focus-ring inline-flex items-center gap-2 rounded-lg font-semibold text-sky transition-colors hover:text-white"><span className="link-underline">Ver el servicio</span> <ArrowRight size={17} aria-hidden="true" /></Link>
                    {service.demoHref && <a href={service.demoHref} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-lg font-semibold text-white/62 transition-colors hover:text-white"><span className="link-underline">Experiencia real</span> <ArrowUpRight size={16} aria-hidden="true" /></a>}
                  </div>
                </Reveal>
              </article>
            ))}
          </div>
          <Reveal className="mt-20 rounded-[1.4rem] border border-sky/18 bg-gradient-to-r from-blue/13 to-transparent p-7 sm:p-9">
            <div className="grid items-center gap-7 md:grid-cols-[auto_1fr_auto]">
              <span className="grid size-12 place-items-center rounded-xl border border-sky/20 bg-sky/8 text-sky"><Workflow size={23} aria-hidden="true" /></span>
              <div><p className="text-xl font-semibold">¿Tu caso no encaja en una herramienta existente?</p><p className="mt-2 text-sm leading-6 text-white/50">El servicio troncal consiste precisamente en entender el proceso y diseñar el sistema adecuado alrededor de él.</p></div>
              <Link href="/servicios/automatizacion-procesos" className={buttonClass("outline")}>Automatización a medida <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="metodo" className="section-space bg-white">
        <div className="container-shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="Método" title="Primero entender. Después construir." description="Cinco pasos para avanzar sin inflar el alcance ni confundir movimiento con progreso." />
            <Link href="/metodo" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-lg font-semibold text-blue transition-colors hover:text-primary"><span className="link-underline">Explorar el método completo</span> <ArrowRight size={17} aria-hidden="true" /></Link>
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

      <section id="diferenciacion" className="dark-grid noise section-space relative overflow-hidden text-white">
        <div className="container-shell relative z-10">
          <Reveal>
            <SectionHeading dark align="center" eyebrow="Criterio antes que ruido" title="La tecnología es el medio. El sistema es el resultado." />
          </Reveal>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {differentiators.map((item, index) => {
              const Icon = differentiatorIcons[item.icon];
              return (
                <Reveal key={item.title} delay={index * 0.07}>
                  <article className="card-lift h-full rounded-card border border-white/10 bg-white/[0.045] p-7 backdrop-blur">
                    <span className="grid size-11 place-items-center rounded-xl border border-sky/18 bg-sky/8 text-sky"><Icon size={21} aria-hidden="true" /></span>
                    <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                    <p className="mt-4 leading-7 text-white/52">{item.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-6 grid overflow-hidden rounded-card border border-white/10 md:grid-cols-2">
            <div className="bg-white/[0.025] p-7 sm:p-9"><p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white/65">Enfoque habitual</p><ul className="mt-6 grid gap-4 text-white/65">{["Empezar por una herramienta", "Prometer una transformación completa", "Automatizar antes de ordenar"].map((item) => <li key={item} className="flex gap-3"><span className="text-white/55">—</span>{item}</li>)}</ul></div>
            <div className="border-t border-sky/15 bg-sky/[0.065] p-7 sm:p-9 md:border-l md:border-t-0"><p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-sky">Nuestro enfoque</p><ul className="mt-6 grid gap-4 text-white/78">{["Empezar por el proceso", "Cerrar un primer alcance útil", "Automatizar con supervisión y medida"].map((item) => <li key={item} className="flex gap-3"><Check size={17} className="mt-0.5 shrink-0 text-sky" aria-hidden="true" />{item}</li>)}</ul></div>
          </Reveal>
        </div>
      </section>

      <section id="equipo" className="section-space bg-cloud">
        <div className="container-shell">
          <Reveal>
            <SectionHeading align="center" eyebrow="Tres perspectivas" title="Cada solución se valida antes de implantarla" description="Una decisión técnica puede funcionar y aun así no ser legalmente segura o financieramente sensata. Por eso miramos las tres cosas." />
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.07} className="h-full">
                <article className="card-lift group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card">
                  <div className="relative aspect-[4/4.55] overflow-hidden bg-primary">
                    <Image src={teamImages[member.image]} alt={`${member.name}, ${member.role}`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" />
                    <p className={`absolute bottom-5 left-5 rounded-full border px-3 py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.13em] backdrop-blur ${member.tone === "blue" ? "border-sky/30 bg-sky/12 text-sky" : "border-gold/30 bg-gold/12 text-gold"}`}>{member.pillar}</p>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-primary">{member.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-blue">{member.role}</p>
                    <p className="mt-4 text-sm leading-6 text-muted">{member.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center"><Link href="/nosotros" className="focus-ring inline-flex items-center gap-2 rounded-lg font-semibold text-blue transition-colors hover:text-primary"><span className="link-underline">Conocer el enfoque del equipo</span> <ArrowRight size={17} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section id="contacto" className="dark-grid noise section-space relative overflow-hidden text-white">
        <div className="container-shell relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-sky">Primera sesión sin coste</p>
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
