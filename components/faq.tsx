"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/site";

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let target: number | null = null;
    if (event.key === "ArrowDown") target = (index + 1) % faqs.length;
    if (event.key === "ArrowUp") target = (index - 1 + faqs.length) % faqs.length;
    if (event.key === "Home") target = 0;
    if (event.key === "End") target = faqs.length - 1;
    if (target === null) return;
    event.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <div className="faq-accordion">
      {faqs.map((faq, index) => {
        const expanded = open === index;
        return (
          <article key={faq.question} className={`faq-item ${expanded ? "is-open" : ""}`}>
            <h3>
              <button
                ref={(node) => { buttons.current[index] = node; }}
                type="button"
                aria-expanded={expanded}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                onClick={() => setOpen(expanded ? null : index)}
                onKeyDown={(event) => moveFocus(event, index)}
              >
                <span className="faq-item-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="faq-item-copy">
                  <small>{faq.category}</small>
                  <span>{faq.question}</span>
                </span>
                <span className="faq-item-toggle">
                  <Plus aria-hidden="true" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              aria-hidden={!expanded}
              className="faq-item-panel"
            >
              <div>
                <p>{faq.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
