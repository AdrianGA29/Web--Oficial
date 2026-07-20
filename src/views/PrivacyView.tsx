import { privacyContent } from "../data/legal";
import type { AppView } from "../types";
import { LegalView } from "./LegalView";

export default function PrivacyView({ onNavigate }: { onNavigate: (view: AppView) => void }) {
  return (
    <LegalView
      content={privacyContent}
      siblingView="terms"
      siblingLabel="Términos"
      onNavigate={onNavigate}
    />
  );
}
