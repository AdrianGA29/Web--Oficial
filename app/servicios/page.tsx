import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProductVisual } from "@/components/product-visual";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Automatización de procesos, presupuestación técnica y experiencias web interactivas para pymes.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Servicios" title="Una mejora útil empieza por el proceso, no por la herramienta." description="Tres líneas de trabajo con una misma lógica: comprender la operativa, decidir dónde existe impacto y construir solo lo que puede sostenerse." cta={{ href: "/diagnostico", label: "Explorar vuestro caso" }} />
      <section className="section-space bg-cloud">
        <div className="container-shell grid gap-8">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <article className="grid overflow-hidden rounded-[1.4rem] border border-line bg-white shadow-[0_18px_55px_rgba(6,15,31,.065)] lg:grid-cols-[0.95fr_1.05fr]">
                <div className={`p-4 sm:p-6 ${index % 2 ? "lg:order-2" : ""}`}>
                  <ProductVisual type={service.visual} className="h-full" />
                </div>
                <div className={`flex flex-col justify-center p-7 sm:p-10 lg:p-12 ${index % 2 ? "lg:order-1" : ""}`}>
                  <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.15em] text-blue">{service.index} · {service.eyebrow}</p>
                  <h2 className="mt-5 max-w-xl text-balance text-[clamp(2rem,3.6vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-primary">{service.title}</h2>
                  <p className="mt-6 max-w-xl text-base leading-7 text-muted">{service.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">{service.tags.map((tag) => <span key={tag} className="rounded-full border border-blue/12 bg-blue/[0.045] px-3 py-1.5 text-xs font-semibold text-blue">{tag}</span>)}</div>
                  <div className="mt-8 flex flex-wrap gap-5">
                    <Link href={`/servicios/${service.slug}`} className="focus-ring inline-flex items-center gap-2 rounded-lg font-semibold text-blue transition hover:text-primary">Ver servicio <ArrowRight size={17} aria-hidden="true" /></Link>
                    {service.demoHref && <a href={service.demoHref} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-lg font-semibold text-primary/80 transition hover:text-primary">Ver experiencia <ArrowUpRight size={16} aria-hidden="true" /></a>}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
