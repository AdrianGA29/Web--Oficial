"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { track } from "@vercel/analytics";
import Link from "next/link";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > Math.min(window.innerHeight * 0.75, 680));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 transition-all duration-300 sm:inset-x-auto sm:right-5 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
    >
      <Link
        href="/diagnostico"
        onClick={() => track("CTA diagnostic", { location: "sticky" })}
        className="focus-ring flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/15 bg-ink px-5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(6,15,31,0.3)] transition hover:-translate-y-0.5 hover:bg-navy sm:min-h-12"
      >
        Diagnóstico sin coste <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </div>
  );
}
