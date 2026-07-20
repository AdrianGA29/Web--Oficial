import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "../../types";
import { cn } from "../../lib/utils";

type AccordionProps = {
  items: FaqItem[];
  openIndex: number | null;
  onToggle: (index: number) => void;
};

export function Accordion({ items, openIndex, onToggle }: AccordionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mx-auto mt-[clamp(2.5rem,5vw,4.5rem)] max-w-4xl border-y border-border-subtle text-left">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `faq-button-${index}`;
        const panelId = `faq-answer-${index}`;

        return (
          <div
            key={item.question} 
            className={cn(
              "border-b border-border-subtle transition-colors duration-200 last:border-b-0",
              isOpen ? "bg-white" : "hover:bg-white/60",
            )}
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onToggle(index)}
              className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left font-semibold text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-inset sm:px-6 sm:py-6"
            >
              <span className="text-balance text-[clamp(1.05rem,1.4vw,1.3rem)] leading-snug">{item.question}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="shrink-0"
              >
                <ChevronDown 
                  size={20} 
                  className={cn("transition-colors duration-200", isOpen ? "text-brand-secondary" : "text-text-muted")}
                  aria-hidden="true" 
                />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key={panelId}
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
                >
                  <div className="px-4 pb-6 text-pretty text-base leading-relaxed text-text-muted sm:px-6 sm:pr-16 sm:text-lg">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

