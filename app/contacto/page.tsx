import type { Metadata } from "next";
import { Check, MessageSquareText, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cuéntanos qué proceso os está frenando y prepararemos una primera orientación clara.",
};

export default function ContactPage() {
  const hasDirectContact = Boolean(siteConfig.phone || siteConfig.whatsapp);
  return (
    <>
      <PageHero eyebrow="Contacto" title="Cuéntanos dónde se atasca el trabajo." description="No necesitas escribir una especificación. Con unas pocas señales podemos preparar una primera conversación útil." />
      <section className="dark-grid noise section-space relative text-white">
        <div className="container-shell relative z-10 grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-sky">Qué ocurre después</p>
            <h2 className="mt-5 max-w-lg text-balance text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.045em]">Leemos el contexto antes de responder.</h2>
            <p className="mt-6 max-w-lg leading-7 text-white/55">Así evitamos una llamada genérica y podemos centrar la conversación en el proceso, sus dependencias y el resultado que buscáis.</p>
            <ul className="mt-8 grid gap-4 border-t border-white/10 pt-7 text-sm text-white/62">{["Revisión inicial del caso", "Respuesta con el siguiente paso", "Sesión de diagnóstico si existe encaje"].map((item) => <li key={item} className="flex gap-3"><Check size={16} className="text-sky" aria-hidden="true" />{item}</li>)}</ul>
            {hasDirectContact && (
              <div className="mt-9 grid gap-3">
                {siteConfig.phone && <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="focus-ring flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.07]"><Phone size={17} className="text-sky" aria-hidden="true" /><span>{siteConfig.phone}</span></a>}
                {siteConfig.whatsapp && <a href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="focus-ring flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.07]"><MessageSquareText size={17} className="text-sky" aria-hidden="true" /><span>Escribir por WhatsApp</span></a>}
              </div>
            )}
          </Reveal>
          <Reveal delay={0.08} className="rounded-[1.4rem] border border-white/12 bg-white/[0.05] p-6 shadow-[0_30px_90px_rgba(3,10,22,.34)] sm:p-9">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">Solicitar una primera orientación</h2>
            <p className="mb-8 mt-2 text-sm leading-6 text-white/65">Los campos marcados con * son necesarios.</p>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
