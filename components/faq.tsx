"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/site";

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-4xl border-t border-primary/12">
      {faqs.map((faq, index) => {
        const expanded = open === index;
        return (
          <div key={faq.question} className="border-b border-primary/12">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpen(expanded ? null : index)}
                className="focus-ring flex w-full items-center justify-between gap-6 rounded-lg py-6 text-left text-[clamp(1.05rem,2vw,1.3rem)] font-semibold text-primary transition-colors hover:text-blue"
              >
                <span className="link-underline">{faq.question}</span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-primary/15 bg-white">
                  <Plus className={`size-4 transition-transform ${expanded ? "rotate-45" : ""}`} aria-hidden="true" />
                </span>
              </button>
            </h3>
            <div id={`faq-panel-${index}`} className={`grid transition-[grid-template-rows,opacity] duration-200 ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden"><p className="max-w-3xl pb-7 pr-14 text-base leading-7 text-muted">{faq.answer}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
