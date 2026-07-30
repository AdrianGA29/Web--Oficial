"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type LegalNavItem = {
  id: string;
  label: string;
  number: string;
};

export function LegalSectionNav({
  items,
  desktop = false,
}: {
  items: LegalNavItem[];
  desktop?: boolean;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    let frame = 0;

    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const threshold = window.innerHeight * 0.34;
        let current = sections[0];

        for (const section of sections) {
          if (section.getBoundingClientRect().top <= threshold) current = section;
          else break;
        }

        setActiveId(current.id);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [items]);

  const activeIndex = Math.max(0, items.findIndex((item) => item.id === activeId));

  return (
    <nav
      className={cn(desktop ? "legal-index legal-index-desktop" : "legal-index-mobile")}
      aria-label="Contenido de esta página"
    >
      {desktop && (
        <>
          <div className="legal-index-heading">
            <p>En esta página</p>
            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          </div>
          <div className="legal-index-progress" aria-hidden="true">
            <i style={{ height: `${((activeIndex + 1) / items.length) * 100}%` }} />
          </div>
        </>
      )}

      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={item.id === activeId ? "is-active" : undefined}
              aria-current={item.id === activeId ? "location" : undefined}
            >
              <span>{item.number}</span>
              <strong>{item.label}</strong>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
