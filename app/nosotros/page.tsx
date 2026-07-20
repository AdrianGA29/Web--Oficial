import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import { Check, Scale, ShieldCheck, Wrench } from "lucide-react";
import adrian from "@/assets/images/Adrian.webp";
import patricia from "@/assets/images/Patricia.webp";
import alejandro from "@/assets/images/Alejandro.webp";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { team } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Un equipo que combina criterio técnico, legal y financiero para diseñar sistemas operativos viables.",
};

const images: Record<(typeof team)[number]["image"], StaticImageData> = { adrian, patricia, alejandro };
const icons = [Wrench, ShieldCheck, Scale];
const reviews = [
  ["Arquitectura e integraciones", "Seguridad y mantenibilidad", "Supervisión de automatizaciones"],
  ["Privacidad y tratamiento de datos", "Responsabilidades y límites", "Encaje normativo del proceso"],
  ["Coste e impacto esperado", "Viabilidad del alcance", "Sostenibilidad de la mejora"],
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Nosotros" title="Tres perspectivas para tomar una decisión completa." description="La transformación operativa no es solo código. Una mejora debe funcionar, respetar sus responsabilidades y tener sentido para el negocio." cta={{ href: "/diagnostico", label: "Contarnos vuestro caso" }} />
      <section className="section-space bg-white">
        <div className="container-shell grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal><SectionHeading eyebrow="Por qué existimos" title="Construir menos, pero construir lo que cambia el trabajo" /></Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-6 text-[1.05rem] leading-8 text-muted">
              <p>Muchas empresas no necesitan otra herramienta. Necesitan entender por qué la información se pierde, por qué una tarea depende siempre de la misma persona o por qué el seguimiento se rompe aunque haya software de sobra.</p>
              <p>Nuestro trabajo consiste en ordenar esa realidad y convertirla en un sistema que el equipo pueda usar. La tecnología aparece después, en la medida justa y con responsabilidades claras.</p>
              <p className="border-l-2 border-sky pl-6 font-semibold text-primary">La mejor solución no es la más sofisticada. Es la que reduce fricción sin crear una nueva dependencia.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space bg-cloud">
        <div className="container-shell">
          <Reveal><SectionHeading align="center" eyebrow="Equipo" title="Una persona responsable de cada criterio" description="La estructura es deliberadamente clara: cada proyecto se revisa desde la tecnología, el marco legal y la realidad financiera." /></Reveal>
          <div className="mt-16 grid gap-7">
            {team.map((member, index) => {
              const Icon = icons[index];
              return (
                <Reveal key={member.name} delay={index * 0.05}>
                  <article className="grid overflow-hidden rounded-[1.4rem] border border-line bg-white shadow-card md:grid-cols-[0.62fr_1.38fr]">
                    <div className={`relative min-h-[25rem] ${index % 2 ? "md:order-2" : ""}`}><Image src={images[member.image]} alt={`${member.name}, ${member.role}`} fill sizes="(min-width: 768px) 38vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" /></div>
                    <div className={`flex flex-col justify-center p-7 sm:p-10 lg:p-14 ${index % 2 ? "md:order-1" : ""}`}>
                      <span className={`grid size-11 place-items-center rounded-xl ${member.tone === "blue" ? "bg-blue/8 text-blue" : "bg-gold/12 text-[#9b6a12]"}`}><Icon size={21} aria-hidden="true" /></span>
                      <p className="mt-7 font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-blue">{member.pillar}</p>
                      <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-primary">{member.name}</h2>
                      <p className="mt-2 font-semibold text-muted">{member.role}</p>
                      <p className="mt-6 max-w-xl leading-7 text-muted">{member.description}</p>
                      <ul className="mt-7 grid gap-3 sm:grid-cols-3">{reviews[index].map((item) => <li key={item} className="flex items-start gap-2 text-sm leading-6 text-primary/72"><Check size={15} className="mt-1 shrink-0 text-blue" aria-hidden="true" />{item}</li>)}</ul>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand title="Una mejora operativa merece más de una sola perspectiva." />
    </>
  );
}
