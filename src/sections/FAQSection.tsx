import { useState } from "react";
import { Accordion } from "../components/ui/Accordion";
import { SectionHeading } from "../components/ui/SectionHeading";
import { AnimateOnScroll } from "../components/ui/AnimateOnScroll";
import { faqs } from "../data/site";

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="preguntas" className="relative z-20 w-full border-t border-border-subtle bg-surface-muted py-[clamp(4rem,7vw,7rem)]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <SectionHeading
          eyebrow="FAQ"
          title="Preguntas frecuentes"
        />
        <AnimateOnScroll delay={0.15}>
          <Accordion items={faqs} openIndex={openFaq} onToggle={(index) => setOpenFaq(openFaq === index ? null : index)} />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
