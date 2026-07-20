import { useEffect, useState } from "react";
import type { AppView } from "../types";

const viewPath: Record<AppView, string> = {
  landing: "/",
  terms: "/terminos",
  privacy: "/privacidad",
};

function viewFromPath(pathname: string): AppView {
  if (pathname === viewPath.terms) return "terms";
  if (pathname === viewPath.privacy) return "privacy";
  return "landing";
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "auto" });
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useNavigation() {
  const [view, setView] = useState<AppView>(() => viewFromPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setView(viewFromPath(window.location.pathname));
      scrollTop();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (newView: AppView) => {
    setView(newView);
    scrollTop();
    window.history.pushState(null, "", viewPath[newView]);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  const handleSectionNavigation = (href: string) => {
    if (view !== "landing") {
      setView("landing");
      window.history.pushState(null, "", viewPath.landing);
      window.setTimeout(() => scrollToSection(href), 100);
      return;
    }

    scrollToSection(href);
  };

  return {
    view,
    navigateTo,
    handleSectionNavigation,
  };
}
