import { PageHero } from "@/components/page-hero";

export type LegalSection = { title: string; paragraphs: string[] };

export function LegalPage({ eyebrow, title, description, notice, sections }: { eyebrow: string; title: string; description: string; notice: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <article className="section-space bg-white">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.3fr_0.7fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-blue">Estado provisional</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">{notice}</p>
          </aside>
          <div className="grid gap-12">
            {sections.map((section, index) => (
              <section key={section.title} id={`seccion-${index + 1}`} className="scroll-mt-28 border-t border-line pt-8 first:border-t-0 first:pt-0">
                <p className="font-mono text-[0.62rem] font-bold tracking-[0.14em] text-blue">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-primary sm:text-3xl">{section.title}</h2>
                <div className="mt-5 grid gap-4 text-base leading-8 text-muted">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
