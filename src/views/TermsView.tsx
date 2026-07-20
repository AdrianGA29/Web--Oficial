import { termsContent } from "../data/legal";
import type { AppView } from "../types";
import { LegalView } from "./LegalView";

export default function TermsView({ onNavigate }: { onNavigate: (view: AppView) => void }) {
  return (
    <LegalView
      content={termsContent}
      siblingView="privacy"
      siblingLabel="Privacidad"
      onNavigate={onNavigate}
    />
  );
}
