import { ArrowLeft } from "lucide-react";
import { buttonStyles } from "../components/ui/Button";
import type { AppView, LegalPageContent } from "../types";

type LegalViewProps = {
  content: LegalPageContent;
  siblingView: Exclude<AppView, "landing">;
  siblingLabel: string;
  onNavigate: (view: AppView) => void;
};

export function LegalView({ content, siblingView, siblingLabel, onNavigate }: LegalViewProps) {
  return (
    <div className="flex min-h-dvh w-full flex-col justify-between bg-brand-light font-sans text-brand-primary">
      <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-white/95 px-6 py-4 shadow-header">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate("landing")}
            className="rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            aria-label="Volver al inicio"
          >
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-brand-primary">
              Nueva Empresa
            </span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate("landing")}
            className={buttonStyles({ variant: "primary", size: "sm" })}
          >
            <ArrowLeft size={17} aria-hidden="true" /> Volver al Inicio
          </button>
        </div>
      </header>

      <section className="w-full bg-brand-primary px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase text-brand-accent">{content.eyebrow}</p>
          <h1 className="text-balance text-[clamp(2rem,3.5vw,3.5rem)] font-semibold">{content.title}</h1>
          <p className="mt-3 text-base text-white/75 sm:text-lg">{content.updatedAt}</p>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col gap-10 px-6 py-14 md:flex-row md:gap-12 lg:px-8 lg:py-16">
        <aside className="w-full flex-shrink-0 md:w-1/4">
          <div className="sticky top-28 space-y-4 rounded-card border border-border-subtle bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-brand-primary">
              Índice del Contenido
            </h2>
            <div className="h-0.5 w-8 bg-brand-secondary" />
            <ul className="flex flex-col space-y-3 text-[clamp(1rem,1.25vw,1.15rem)] font-semibold text-slate-500">
              {content.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#sec-${section.id}`}
                    className="block rounded-control leading-snug transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                  >
                    {section.id}. {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <article className="w-full space-y-8 rounded-card border border-border-subtle bg-white p-7 text-left shadow-sm sm:p-10 md:w-3/4 lg:p-12">
          <p className="text-pretty text-[clamp(1.05rem,1.35vw,1.3rem)] leading-relaxed text-text-muted">
            {content.intro}
          </p>

          <hr className="border-slate-100" />

          {content.sections.map((section) => (
            <section key={section.id} id={`sec-${section.id}`} className="scroll-mt-28 space-y-3">
              <h2 className="text-balance text-[clamp(1.3rem,1.8vw,1.75rem)] font-semibold text-brand-primary">
                {section.id}. {section.title}
              </h2>
              <p className="text-pretty text-[clamp(1rem,1.25vw,1.2rem)] leading-relaxed text-text-muted">
                {section.text}
              </p>
            </section>
          ))}

          <hr className="border-slate-100" />

          <div className="space-y-3 border-l-2 border-brand-accent bg-brand-light px-5 py-4 sm:px-6">
            <h2 className="text-[clamp(1.15rem,1.5vw,1.4rem)] font-semibold text-brand-primary">
              {content.contactTitle}
            </h2>
            <p className="text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
              {content.contactText}
            </p>
          </div>
        </article>
      </main>

      <footer className="w-full border-t border-slate-100 bg-white py-8 px-6 text-center text-[clamp(1.05rem,1.3vw,1.2rem)] text-[#3b5b8c]/75">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Nueva Empresa. Todos los derechos reservados. Diseñado con excelencia legal y digital.</p>
          <div className="flex space-x-6 text-[clamp(1.05rem,1.3vw,1.2rem)]">
            <button type="button" onClick={() => onNavigate("landing")} className="hover:text-[#2b6cb0] transition-colors cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ea8de]">
              Inicio
            </button>
            <button type="button" onClick={() => onNavigate(siblingView)} className="hover:text-[#2b6cb0] transition-colors cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ea8de]">
              {siblingLabel}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
