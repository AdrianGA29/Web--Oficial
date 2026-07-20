import { assets } from "../assets";
import { Footer } from "../components/Footer";
import { SectionDivider } from "../components/ui/SectionDivider";
import { ChallengesSection } from "../sections/ChallengesSection";
import { ContactSection } from "../sections/ContactSection";
import { FAQSection } from "../sections/FAQSection";
import { HeroSection } from "../sections/HeroSection";
import { MethodSection } from "../sections/MethodSection";
import { SolutionsSection } from "../sections/SolutionsSection";
import { TeamSection } from "../sections/TeamSection";
import { ToolsSection } from "../sections/ToolsSection";
import type { AppView } from "../types";

type LandingViewProps = {
  onNavigate: (view: AppView) => void;
  onSectionClick: (href: string) => void;
};

export function LandingView({ onNavigate, onSectionClick }: LandingViewProps) {
  return (
    <>
      <HeroSection
        backgroundDesktop={assets.heroDesktop}
        backgroundMobile={assets.heroMobile}
        onLogoClick={() => onNavigate("landing")}
        onSectionClick={onSectionClick}
      />
      <ChallengesSection />
      <SectionDivider />
      <ToolsSection />
      <SectionDivider />
      <MethodSection />
      <SectionDivider />
      <SolutionsSection />
      <SectionDivider />
      <TeamSection />
      <SectionDivider />
      <ContactSection onNavigate={onNavigate} />
      <SectionDivider />
      <FAQSection />
      <Footer onNavigate={onNavigate} onSectionClick={onSectionClick} />
    </>
  );
}
