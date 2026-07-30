import type { ServiceVisual } from "@/lib/service-catalog";

function WebVisual() {
  return (
    <svg viewBox="0 0 420 270" role="img" aria-label="Sistema visual de una experiencia web responsive">
      <defs>
        <linearGradient id="web-accent" x1="0" x2="1">
          <stop offset="0" stopColor="#f5f5f5" stopOpacity=".82" />
          <stop offset="1" stopColor="#8f82ff" stopOpacity=".9" />
        </linearGradient>
      </defs>
      <rect className="sv-frame" x="34" y="38" width="284" height="184" rx="12" />
      <path className="sv-line" d="M34 70h284" />
      <circle className="sv-dot" cx="55" cy="54" r="3" />
      <circle className="sv-dot" cx="67" cy="54" r="3" />
      <circle className="sv-dot" cx="79" cy="54" r="3" />
      <rect className="sv-soft" x="56" y="95" width="112" height="9" rx="4.5" />
      <rect className="sv-accent" x="56" y="117" width="184" height="24" rx="5" />
      <rect className="sv-soft" x="56" y="155" width="151" height="6" rx="3" />
      <rect className="sv-soft" x="56" y="168" width="118" height="6" rx="3" />
      <rect className="sv-button" x="56" y="190" width="70" height="16" rx="8" />
      <rect className="sv-device" x="268" y="100" width="98" height="138" rx="14" />
      <path className="sv-line" d="M281 125h72M281 139h46M281 164h72M281 177h72M281 190h48" />
      <path className="sv-route" d="M185 82C236 81 241 119 270 129" />
      <circle className="sv-node" cx="185" cy="82" r="4" />
      <circle className="sv-node" cx="270" cy="129" r="4" />
      <path className="sv-scan" d="M48 88h255" />
    </svg>
  );
}

function AutomationVisual() {
  return (
    <svg viewBox="0 0 420 270" role="img" aria-label="Flujo automatizado que conecta tareas y sistemas">
      <defs>
        <linearGradient id="auto-route" x1="0" x2="1">
          <stop offset="0" stopColor="#f5f5f5" stopOpacity=".35" />
          <stop offset=".55" stopColor="#8f82ff" />
          <stop offset="1" stopColor="#f5f5f5" stopOpacity=".35" />
        </linearGradient>
      </defs>
      <rect className="sv-panel" x="26" y="42" width="368" height="186" rx="16" />
      <rect className="sv-module" x="48" y="78" width="86" height="50" rx="9" />
      <rect className="sv-module" x="168" y="52" width="86" height="50" rx="9" />
      <rect className="sv-module" x="168" y="142" width="86" height="50" rx="9" />
      <rect className="sv-module is-output" x="288" y="96" width="82" height="50" rx="9" />
      <path className="sv-route" d="M134 103h18c9 0 16-7 16-16V77M134 103h18c9 0 16 7 16 16v48M254 77h18c9 0 16 7 16 16v28M254 167h18c9 0 16-7 16-16v-30" />
      <circle className="sv-pulse" cx="151" cy="103" r="4" />
      <circle className="sv-pulse is-two" cx="274" cy="121" r="4" />
      <path className="sv-line" d="M65 95h51M65 107h34M185 69h51M185 81h32M185 159h51M185 171h38M305 113h48M305 125h33" />
      <path className="sv-status" d="M50 210h320" />
      <path className="sv-status-fill" d="M50 210h252" />
    </svg>
  );
}

function AppsVisual() {
  return (
    <svg viewBox="0 0 420 270" role="img" aria-label="Aplicación modular conectada con datos y equipos">
      <rect className="sv-panel" x="35" y="35" width="350" height="200" rx="18" />
      <path className="sv-line" d="M128 35v200M128 77h257" />
      <circle className="sv-dot" cx="57" cy="56" r="3" />
      <circle className="sv-dot" cx="69" cy="56" r="3" />
      <circle className="sv-dot" cx="81" cy="56" r="3" />
      <rect className="sv-soft" x="53" y="94" width="56" height="7" rx="3.5" />
      <rect className="sv-soft" x="53" y="119" width="42" height="7" rx="3.5" />
      <rect className="sv-soft" x="53" y="144" width="50" height="7" rx="3.5" />
      <rect className="sv-soft" x="53" y="169" width="36" height="7" rx="3.5" />
      <rect className="sv-module" x="150" y="98" width="94" height="54" rx="10" />
      <rect className="sv-module" x="263" y="98" width="98" height="54" rx="10" />
      <rect className="sv-module is-output" x="150" y="170" width="211" height="40" rx="10" />
      <path className="sv-line" d="M169 116h56M169 129h37M282 116h60M282 129h42M169 186h173M169 196h112" />
      <path className="sv-route" d="M244 125h19M311 152v18M197 152v18" />
      <circle className="sv-node" cx="253" cy="125" r="3" />
      <circle className="sv-node" cx="311" cy="161" r="3" />
      <circle className="sv-node" cx="197" cy="161" r="3" />
    </svg>
  );
}

function AiVisual() {
  return (
    <svg viewBox="0 0 420 270" role="img" aria-label="Sistema de inteligencia artificial con revisión humana">
      <circle className="sv-orbit" cx="210" cy="135" r="88" />
      <circle className="sv-orbit is-inner" cx="210" cy="135" r="55" />
      <path className="sv-route" d="M55 91h63c24 0 35 17 43 33M55 179h63c24 0 35-17 43-33M259 135h103" />
      <rect className="sv-module" x="38" y="68" width="76" height="46" rx="9" />
      <rect className="sv-module" x="38" y="156" width="76" height="46" rx="9" />
      <rect className="sv-module is-output" x="305" y="112" width="78" height="46" rx="9" />
      <circle className="sv-core" cx="210" cy="135" r="27" />
      <path className="sv-core-lines" d="M198 124l12-7 12 7v14l-12 8-12-8zM210 117v29M198 124l24 14M222 124l-24 14" />
      <path className="sv-line" d="M54 85h44M54 96h29M54 173h44M54 184h34M321 129h46M321 140h30" />
      <circle className="sv-pulse" cx="139" cy="106" r="4" />
      <circle className="sv-pulse is-two" cx="284" cy="135" r="4" />
      <path className="sv-review" d="M310 191l9 9 19-22" />
      <text className="sv-review-label" x="346" y="197">REVISIÓN</text>
    </svg>
  );
}

export function ServiceVisualGraphic({ type }: { type: ServiceVisual }) {
  if (type === "automation") return <AutomationVisual />;
  if (type === "apps") return <AppsVisual />;
  if (type === "ai") return <AiVisual />;
  return <WebVisual />;
}

