import { lazy, Suspense } from "react";
import { MotionConfig, motion } from "motion/react";
import { useNavigation } from "./hooks/useNavigation";
import { useSEO } from "./hooks/useSEO";
import { LandingView } from "./views/LandingView";
import { ScrollToTop } from "./components/ui/ScrollToTop";

const TermsView = lazy(() => import("./views/TermsView"));
const PrivacyView = lazy(() => import("./views/PrivacyView"));

function PremiumFallback() {
  return (
    <div className="grid min-h-dvh place-items-center bg-brand-light">
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing ring spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full border-[3px] border-[#4ea8de]/20 border-t-[#2b6cb0]"
        />
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wider"
        >
          Cargando
        </motion.span>
      </div>
    </div>
  );
}

export default function App() {
  const { view, navigateTo, handleSectionNavigation } = useNavigation();
  useSEO(view);

  return (
    <MotionConfig reducedMotion="user">
      <div id="company-app-root" className="relative w-full overflow-hidden bg-brand-light font-sans selection:bg-blue-100">
        {view === "landing" && (
          <LandingView onNavigate={navigateTo} onSectionClick={handleSectionNavigation} />
        )}

        <Suspense fallback={<PremiumFallback />}>
          {view === "terms" && <TermsView onNavigate={navigateTo} />}
          {view === "privacy" && <PrivacyView onNavigate={navigateTo} />}
        </Suspense>

        <ScrollToTop />
      </div>
    </MotionConfig>
  );
}
