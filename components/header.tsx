"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/brand";
import { buttonClass } from "@/components/button";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const reducedHeader = pathname === "/diagnostico";
  const compact = scrolled || open || reducedHeader;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Navegación principal"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 text-primary backdrop-blur-xl transition-[height,max-width,background-color,border-color,box-shadow] duration-500 ease-out sm:px-5",
          compact
            ? "h-[3.75rem] border-white/70 bg-white/88 shadow-[0_12px_40px_rgba(6,15,31,0.11)]"
            : "h-[4.25rem] border-white/65 bg-white/84 shadow-[0_12px_40px_rgba(6,15,31,0.1)] lg:h-[4.65rem] lg:max-w-[108rem] lg:border-transparent lg:bg-transparent lg:shadow-none",
        )}
      >
        <Brand />
        {!reducedHeader && <div className={cn("hidden items-center gap-1 rounded-xl border p-1 transition-[background-color,border-color] lg:flex", compact ? "border-transparent bg-transparent" : "border-white/40 bg-white/24")}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-lg px-3.5 py-2 text-sm font-semibold text-primary/75 transition hover:bg-cloud hover:text-blue"
            >
              {item.label}
            </Link>
          ))}
        </div>}
        <div className="hidden lg:block">
          <Link href={reducedHeader ? "/" : "/diagnostico"} className={buttonClass("dark", "min-h-10 px-4 text-sm")}>
            {reducedHeader ? "Volver a la web" : "Solicitar diagnóstico"} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <button
          ref={toggleRef}
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className={`focus-ring size-11 place-items-center rounded-xl border border-primary/12 bg-cloud text-primary lg:hidden ${reducedHeader ? "hidden" : "grid"}`}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      {open && !reducedHeader && (
          <div
            id="mobile-menu"
            className="animate-menu-in mx-auto mt-2 max-w-[78rem] overflow-hidden rounded-2xl border border-white/70 bg-white p-3 shadow-[0_24px_60px_rgba(6,15,31,0.18)] lg:hidden"
          >
            <div className="grid">
              {navigation.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring flex items-center justify-between rounded-xl border-b border-line/70 px-4 py-4 text-lg font-semibold text-primary last:border-0 hover:bg-cloud"
                >
                  {item.label}
                  <span className="font-mono text-[0.68rem] tracking-[0.14em] text-muted">
                    0{index + 1}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="/diagnostico"
              onClick={() => setOpen(false)}
              className={buttonClass("primary", "mt-3 w-full")}
            >
              Solicitar diagnóstico <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
      )}
    </header>
  );
}
