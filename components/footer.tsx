"use client";

import Link from "next/link";
import { ArrowUp, ArrowUpRight, Heart } from "lucide-react";
import { Brand } from "@/components/brand";
import { siteConfig } from "@/lib/config";

const exploreLinks = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/#preguntas", label: "Preguntas" },
] as const;

const legalLinks = [
  { href: "/privacidad", label: "Privacidad" },
  { href: "/cookies", label: "Cookies" },
  { href: "/terminos", label: "Términos" },
] as const;

export function Footer() {
  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="editorial-footer">
      <div className="editorial-footer-accent" aria-hidden="true" />

      <div className="container-shell editorial-footer-inner">
        <div className="editorial-footer-top">
          <Brand className="editorial-footer-brand" />

          <h2>
            La tecnología debe encajar con la empresa.
            <strong> No al revés.</strong>
          </h2>

          <Link href="/#contacto" className="editorial-footer-cta">
            <span>Hablemos</span>
            <i aria-hidden="true"><ArrowUpRight size={17} /></i>
          </Link>
        </div>

        <div className="editorial-footer-body">
          <div className="editorial-footer-intro">
            <p>
              Diseñamos sistemas, automatizaciones y productos digitales que
              reducen fricción y mejoran la forma de trabajar.
            </p>
            <span>
              <i aria-hidden="true" />
              Primera hora de consultoría gratuita
            </span>
          </div>

          <FooterLinks title="Explora" links={exploreLinks} />
          <FooterLinks title="Legal" links={legalLinks} />
        </div>

        <div className="editorial-footer-bottom">
          <p>© {new Date().getFullYear()} {siteConfig.displayName}.</p>

          <p className="editorial-footer-credit">
            <span>Diseñada y desarrollada con</span>
            <Heart size={12} aria-hidden="true" />
            <span>por Adrián</span>
          </p>

          <button type="button" onClick={scrollToTop} aria-label="Volver al inicio">
            <span>Volver arriba</span>
            <i aria-hidden="true"><ArrowUp size={15} /></i>
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <nav className="editorial-footer-links" aria-label={title}>
      <p>{title}</p>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <span>{link.label}</span>
              <ArrowUpRight size={12} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
