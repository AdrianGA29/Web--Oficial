import type { Metadata } from "next";
import { Check, Clock3, Compass, FileSearch, ShieldCheck, X } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Diagnóstico operativo",
  description: "Una primera sesión sin coste para ordenar el problema operativo y decidir por dónde tiene sentido empezar.",
};

export default function DiagnosticPage() {
  return (
    <section className="dark-grid noise relative min-h-screen overflow-hidden pb-20 pt-32 text-white sm:pt-40">
      <div className="container-shell relative z-10 grid items-start gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
        <div className="hero-enter">
          <p className="eyebrow text-sky">Primera sesión · Sin coste</p>
          <h1 className="display-title mt-6 max-w-[11ch] text-white">Ordenemos el problema antes de hablar de soluciones.</h1>
          <p className="mt-7 max-w-xl text-[clamp(1.05rem,1.7vw,1.25rem)] leading-8 text-white/60">Durante 60 minutos revisamos el proceso que más fricción genera, su impacto y las dependencias que conviene tener en cuenta.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[{ icon: Clock3, label: "60 minutos" }, { icon: FileSearch, label: "Mapa inicial" }, { icon: Compass, label: "Próximo paso" }].map(({ icon: Icon, label }) => <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4"><Icon size={18} className="text-sky" aria-hidden="true" /><p className="mt-3 text-sm font-semibold text-white/72">{label}</p></div>)}
          </div>
          <div className="mt-9 border-t border-white/10 pt-8">
            <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white/65">Sales con</p>
            <ul className="mt-5 grid gap-3 text-sm text-white/62">
              {["Una definición más clara del problema", "Una prioridad explicada con criterio", "Honestidad sobre si podemos ayudar"].map((item) => <li key={item} className="flex items-center gap-3"><Check size={16} className="text-sky" aria-hidden="true" />{item}</li>)}
            </ul>
          </div>
        </div>
        <Reveal delay={0.08} className="rounded-[1.45rem] border border-white/12 bg-white/[0.055] p-6 shadow-[0_34px_100px_rgba(3,10,22,.42)] backdrop-blur sm:p-9">
          <div className="flex items-start gap-4 border-b border-white/10 pb-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-sky/20 bg-sky/8 text-sky"><ShieldCheck size={20} aria-hidden="true" /></span>
            <div><h2 className="text-2xl font-semibold tracking-[-0.03em]">Preparar el diagnóstico</h2><p className="mt-2 text-sm leading-6 text-white/60">Cinco campos para llegar a la conversación con contexto.</p></div>
          </div>
          <div className="mt-7"><ContactForm compact /></div>
        </Reveal>
      </div>
      <div className="container-shell relative z-10 mt-14 grid gap-4 border-t border-white/10 pt-10 md:grid-cols-2">
        <div className="rounded-card border border-emerald-300/12 bg-emerald-300/[0.035] p-6"><p className="flex items-center gap-2 font-semibold text-emerald-100"><Check size={17} aria-hidden="true" /> Encaja si…</p><p className="mt-3 text-sm leading-6 text-white/65">Existe una fricción operativa real y queréis entenderla antes de invertir en una solución.</p></div>
        <div className="rounded-card border border-red-300/12 bg-red-300/[0.025] p-6"><p className="flex items-center gap-2 font-semibold text-red-100"><X size={17} aria-hidden="true" /> No encaja si…</p><p className="mt-3 text-sm leading-6 text-white/65">Buscáis una promesa inmediata, una herramienta cerrada o automatizar sin revisar el proceso.</p></div>
      </div>
    </section>
  );
}
