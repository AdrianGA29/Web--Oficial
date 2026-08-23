"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlassNavbar } from "@/components/aicanvas/glass-navbar";
import { Brand } from "@/components/brand";
import { buttonClass } from "@/components/button";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroPassed, setHeroPassed] = useState(pathname !== "/");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const compact = scrolled || open;
  const legalOpening = ["/privacidad", "/cookies", "/terminos"].includes(pathname);
  const overDarkHero = (pathname === "/" || legalOpening) && !compact;
  const hideOverMobileHero = pathname === "/" && !heroPassed && !open;

  useEffect(() => {
    let frame = 0;
    let previous = window.scrollY > 16;
    let previousHeroPassed = pathname !== "/";
    const commit = () => {
      frame = 0;
      const next = window.scrollY > 16;
      if (next !== previous) {
        previous = next;
        setScrolled(next);
      }

      const hero = pathname === "/" ? document.getElementById("inicio") : null;
      const nextHeroPassed = !hero || hero.getBoundingClientRect().bottom <= 1;
      if (nextHeroPassed !== previousHeroPassed) {
        previousHeroPassed = nextHeroPassed;
        setHeroPassed(nextHeroPassed);
      }
    };
    const update = () => {
      if (!frame) frame = window.requestAnimationFrame(commit);
    };
    setScrolled(previous);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5",
        hideOverMobileHero && "mobile-hero-header-hidden",
      )}
    >
      <div className={cn("mobile-nav-cluster", open && "is-open")}>
        <GlassNavbar
          compact={compact}
          aria-label="Navegación principal"
          className={cn(
            compact ? "h-[3.75rem]" : "h-[4.25rem] lg:h-[4.5rem]",
            overDarkHero && "hero-navbar-open",
          )}
        >
          <Brand className={cn("transition-[transform,color] duration-500", !compact && "lg:scale-[1.08] lg:origin-left", overDarkHero && "text-white")} />
          <div className={cn("hidden items-center transition-[gap] duration-500 lg:flex", compact ? "gap-1" : "gap-2")}>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring rounded-md font-semibold transition-[padding,color,font-size] duration-300",
                  overDarkHero ? "text-white/72 hover:text-white" : "text-primary/80 hover:text-blue",
                  compact
                    ? "px-3.5 py-2 text-sm"
                    : "px-5 py-3 text-base",
                )}
              >
                <span className="link-underline">{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="hidden lg:block">
            <Link
              href="/#contacto"
              className={buttonClass("dark", cn(
                compact ? "min-h-10 px-4 text-sm" : "min-h-12 px-5 text-base",
                overDarkHero && "temis-matte-button border border-white/10 shadow-none",
              ))}
            >
              Cuéntanos tu caso <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className={cn(
              "mobile-nav-toggle focus-ring grid size-11 place-items-center rounded-xl border lg:hidden",
              overDarkHero ? "temis-matte-button border-white/10 text-white" : "border-primary/12 bg-cloud text-primary",
            )}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </GlassNavbar>

        {open && (
          <div
            id="mobile-menu"
            className="mobile-menu-surface animate-menu-in lg:hidden"
          >
            <div className="grid">
              {navigation.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring flex items-center justify-between border-b border-line/70 px-4 py-4 text-lg font-semibold text-primary last:border-0 hover:text-blue"
                >
                  <span className="link-underline">{item.label}</span>
                  <span className="font-mono text-[0.68rem] tracking-[0.14em] text-muted">
                    0{index + 1}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="/#contacto"
              onClick={() => setOpen(false)}
              className={buttonClass("dark", "temis-matte-button mt-3 w-full")}
            >
              Cuéntanos tu caso <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
