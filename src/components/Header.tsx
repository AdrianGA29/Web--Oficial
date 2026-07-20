import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navLinks } from "../data/site";
import { cn } from "../lib/utils";
import { buttonStyles } from "./ui/Button";
import { MenuToggleIcon } from "./ui/menu-toggle-icon";
import { useScroll } from "./ui/use-scroll";

type HeaderProps = {
  onLogoClick: () => void;
  onSectionClick: (href: string) => void;
};

export function Header({ onLogoClick, onSectionClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScroll(12);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const hasLightSurface = isScrolled || isMenuOpen;

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    onSectionClick(href);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[env(safe-area-inset-top)] z-50 px-0 md:top-3 md:px-6">
      <div
        className={cn(
          "pointer-events-auto relative mx-auto w-full transition-[max-width] duration-500 ease-out",
          hasLightSurface ? "max-w-6xl" : "max-w-[110rem]",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 border border-border-subtle bg-white/90 opacity-0 shadow-header backdrop-blur-md transition-opacity duration-200 ease-out md:rounded-card",
            hasLightSurface && "opacity-100",
          )}
          aria-hidden="true"
        />

        <nav
          className={cn(
            "relative mx-auto flex h-16 w-full items-center justify-between px-5 sm:px-6 md:px-7",
            isScrolled ? "md:h-14" : "md:h-[4.5rem]",
            isScrolled ? "header-scrolled" : "header-transparent",
          )}
          aria-label="Navegación principal"
        >
          <button
            type="button"
            onClick={onLogoClick}
            className={cn(
              "relative h-10 w-36 rounded-control transition-[width,height,transform] duration-300 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent md:w-44",
              !isScrolled && "md:h-12",
            )}
            aria-label="Ir al inicio"
          >
            <span
              className={cn(
                "absolute inset-0 flex items-center text-left text-sm font-bold uppercase tracking-[0.16em] transition-colors duration-300 md:text-base",
                hasLightSurface ? "text-brand-primary" : "text-white",
              )}
            >
              Nueva Empresa
            </span>
          </button>

          <div
            className={cn(
              "hidden ml-auto items-center gap-1 rounded-control border p-1.5 transition-[background-color,border-color,box-shadow,transform] duration-200 md:flex",
              hasLightSurface
                ? "border-transparent bg-transparent shadow-none"
                : "border-white/20 bg-brand-ink/15 shadow-[0_10px_30px_rgba(8,26,51,0.16)]",
            )}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={cn(
                  "nav-link-underline rounded-control px-4 py-2.5 text-[0.95rem] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
                  hasLightSurface
                    ? "text-brand-primary hover:bg-brand-light hover:text-brand-secondary"
                    : "text-white hover:bg-white/15",
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className={buttonStyles({
              variant: "ghost",
              size: "icon",
              className: cn(
                "relative z-50 md:hidden",
                hasLightSurface ? "border-brand-primary/15 text-brand-primary" : "border-white/25 text-white",
              ),
            })}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-haspopup="true"
          >
            <MenuToggleIcon open={isMenuOpen} className="size-6" aria-hidden="true" />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto fixed inset-x-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top))] z-40 flex flex-col border-t border-border-subtle bg-white md:hidden"
          >
            <div className="flex h-full flex-col justify-between overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 sm:px-6">
              <div className="grid gap-1">
                {navLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="group flex items-center justify-between rounded-card border-b border-border-subtle px-3 py-4 text-xl font-semibold text-brand-primary transition-colors duration-200 hover:bg-brand-light hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                  >
                    <span>{link.name}</span>
                    <span className="text-sm font-medium text-text-muted tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </a>
                ))}
              </div>
              <p className="mt-8 border-t border-border-subtle pt-6 text-pretty text-sm font-medium leading-relaxed text-text-muted">
                Diagnóstico, sistemas y automatización para escalar procesos con criterio.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
