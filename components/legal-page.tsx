import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { LegalSectionNav } from "@/components/legal-section-nav";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  points?: string[];
};

const legalDocuments = [
  {
    href: "/privacidad",
    label: "Privacidad",
    description: "Cómo tratamos la información que nos facilitas.",
    code: "01",
  },
  {
    href: "/cookies",
    label: "Cookies",
    description: "Qué tecnologías de medición utiliza este sitio.",
    code: "02",
  },
  {
    href: "/terminos",
    label: "Términos de uso",
    description: "Las condiciones generales para navegar y contactar.",
    code: "03",
  },
] as const;

function sectionId(index: number) {
  return `seccion-${String(index + 1).padStart(2, "0")}`;
}

export function LegalPage({
  eyebrow,
  title,
  description,
  documentCode,
  currentPath,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  documentCode: string;
  currentPath: "/privacidad" | "/cookies" | "/terminos";
  sections: LegalSection[];
}) {
  const navItems = sections.map((section, index) => ({
    id: sectionId(index),
    label: section.title,
    number: String(index + 1).padStart(2, "0"),
  }));

  return (
    <div className="legal-page">
      <header className="legal-hero">
        <div className="legal-hero-grid" aria-hidden="true" />
        <div className="legal-hero-orbit" aria-hidden="true" />

        <div className="container-shell legal-hero-inner">
          <div className="legal-hero-rail" aria-hidden="true">
            <span>ARCHIVO / LEGAL</span>
            <i />
            <span>{documentCode}</span>
          </div>

          <Link href="/" className="legal-back-link">
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Volver al inicio</span>
          </Link>

          <div className="legal-hero-copy">
            <p className="legal-eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>

          <div className="legal-hero-stamp" aria-hidden="true">
            <span>{documentCode}</span>
            <p>Información<br />del sitio</p>
          </div>
        </div>
      </header>

      <div className="legal-workspace">
        <div className="container-shell">
          <div className="legal-document">
            <LegalSectionNav items={navItems} />

            <div className="legal-document-layout">
              <LegalSectionNav items={navItems} desktop />

              <article className="legal-article">
                {sections.map((section, index) => (
                  <section
                    key={section.title}
                    id={sectionId(index)}
                    className="legal-section"
                    aria-labelledby={`${sectionId(index)}-title`}
                  >
                    <div className="legal-section-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="legal-section-content">
                      <h2 id={`${sectionId(index)}-title`}>{section.title}</h2>
                      <div className="legal-section-paragraphs">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      {section.points && (
                        <ul className="legal-points">
                          {section.points.map((point) => (
                            <li key={point}>
                              <span aria-hidden="true"><Check size={13} /></span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </section>
                ))}
              </article>
            </div>

            <nav className="legal-related" aria-label="Otros documentos legales">
              <div className="legal-related-heading">
                <p>Más información</p>
                <span>Documentos relacionados</span>
              </div>
              <div className="legal-related-grid">
                {legalDocuments.map((document) => {
                  const active = document.href === currentPath;

                  return (
                    <Link
                      key={document.href}
                      href={document.href}
                      aria-current={active ? "page" : undefined}
                      className={active ? "is-current" : undefined}
                    >
                      <span>{document.code}</span>
                      <strong>{document.label}</strong>
                      <p>{document.description}</p>
                      <i aria-hidden="true">
                        {active ? "Estás aquí" : <ArrowUpRight size={15} />}
                      </i>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
