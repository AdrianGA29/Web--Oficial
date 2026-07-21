import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, CircleDot } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProductVisual } from "@/components/product-visual";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { getService, services } from "@/lib/services";
import { siteConfig } from "@/lib/config";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.shortTitle, description: service.summary };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.shortTitle,
    description: service.summary,
    provider: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <PageHero eyebrow={`${service.index} · ${service.eyebrow}`} title={service.title} description={service.summary} back={{ href: "/servicios", label: "Todos los servicios" }} cta={{ href: "/#contacto", label: "Hablar sobre este proceso" }} />
      <section className="section-space bg-cloud">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal><ProductVisual type={service.visual} /></Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow">Resultado buscado</p>
            <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3.45rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-primary">{service.promise}</h2>
            <div className="mt-8 flex flex-wrap gap-2">{service.tags.map((tag) => <span key={tag} className="rounded-full border border-blue/14 bg-white px-3 py-1.5 text-xs font-semibold text-blue">{tag}</span>)}</div>
            {service.demoHref && <a href={service.demoHref} target="_blank" rel="noreferrer" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-lg font-semibold text-blue transition-colors hover:text-primary"><span className="link-underline">{service.demoLabel}</span> <ArrowUpRight size={17} aria-hidden="true" /></a>}
          </Reveal>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow="Punto de partida" title="Problemas que esta línea de trabajo ayuda a resolver" /></Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {service.problems.map((problem, index) => <Reveal key={problem.title} delay={index * 0.06}><article className="h-full rounded-card border border-line bg-cloud/70 p-7"><span className="font-mono text-[0.64rem] font-bold tracking-[0.14em] text-blue">0{index + 1}</span><h3 className="mt-6 text-xl font-semibold text-primary">{problem.title}</h3><p className="mt-3 leading-7 text-muted">{problem.text}</p></article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="dark-grid noise section-space relative text-white">
        <div className="container-shell relative z-10 grid gap-14 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal><SectionHeading dark eyebrow="Qué incluye" title="Una solución explicable, entregable y preparada para usarse" description="El alcance exacto se decide después del diagnóstico, pero nunca empezamos sin dejar claros estos tres bloques." /></Reveal>
          <div className="grid gap-4">
            {service.includes.map((item, index) => <Reveal key={item.title} delay={index * 0.06}><article className="grid gap-4 rounded-card border border-white/10 bg-white/[0.045] p-6 sm:grid-cols-[auto_1fr] sm:p-7"><span className="grid size-10 place-items-center rounded-full border border-sky/20 bg-sky/8 font-mono text-[0.62rem] font-bold text-sky">0{index + 1}</span><div><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-2 leading-7 text-white/50">{item.text}</p></div></article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell">
          <Reveal><SectionHeading align="center" eyebrow="Recorrido" title="Del problema al sistema, sin saltos de fe" /></Reveal>
          <div className="mx-auto mt-12 flex max-w-5xl flex-col gap-3 md:flex-row md:items-center">
            {service.steps.map((step, index) => <div key={step} className="flex flex-1 items-center gap-3"><div className="flex flex-1 items-center gap-3 rounded-xl border border-line bg-cloud p-4"><CircleDot size={15} className="text-blue" aria-hidden="true" /><span className="text-sm font-semibold text-primary">{step}</span></div>{index < service.steps.length - 1 && <ArrowRight className="hidden shrink-0 text-primary/20 md:block" size={17} aria-hidden="true" />}</div>)}
          </div>
          <p className="mx-auto mt-8 flex max-w-xl items-start justify-center gap-3 text-center text-sm leading-6 text-muted"><Check size={17} className="mt-0.5 shrink-0 text-blue" aria-hidden="true" />Cada etapa termina con una decisión visible antes de pasar a la siguiente.</p>
        </div>
      </section>
      <CtaBand title={`¿Tiene sentido aplicar ${service.shortTitle.toLowerCase()} en vuestro caso?`} description="Lo comprobamos primero. Si no existe una oportunidad clara, también te lo diremos." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
