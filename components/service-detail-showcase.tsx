"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import { ExperiencePreview } from "@/components/experience-preview";
import type { DetailService, DetailServiceId } from "@/lib/service-details";

const governance = [
  {
    number: "01",
    title: "Finalidad y minimización",
    text: "Definir para qué se utilizarán los datos y limitar el tratamiento a la información necesaria.",
  },
  {
    number: "02",
    title: "Proveedor y destino",
    text: "Conocer quién procesa la información, en qué condiciones y si intervienen terceros.",
  },
  {
    number: "03",
    title: "Acceso y conservación",
    text: "Determinar quién puede consultar los datos y durante cuánto tiempo deben mantenerse.",
  },
  {
    number: "04",
    title: "Riesgo y revisión humana",
    text: "Valorar errores posibles, impacto sobre personas y decisiones que no deben automatizarse sin control.",
  },
] as const;

function AutomationHeroVisual() {
  return (
    <svg viewBox="0 0 760 590" role="img" aria-label="Proceso automatizado desde la entrada hasta el seguimiento">
      <text className="service-svg-kicker" x="62" y="70">FLUJO OPERATIVO / ACTIVO</text>
      <text className="service-svg-muted" x="698" y="70" textAnchor="end">TRAZABILIDAD 01—05</text>
      <path className="service-svg-guide" d="M62 88h636" />

      <g className="automation-source">
        <rect className="service-svg-panel" x="62" y="126" width="146" height="72" rx="12" />
        <circle className="service-svg-icon" cx="86" cy="151" r="7" />
        <path className="service-svg-line" d="M102 148h76M102 160h49" />
        <text className="service-svg-label" x="78" y="184">FORMULARIO</text>
        <rect className="service-svg-panel" x="62" y="224" width="146" height="72" rx="12" />
        <path className="service-svg-line" d="M80 247h18l8 7h84M80 266h89" />
        <text className="service-svg-label" x="78" y="282">CORREO</text>
        <rect className="service-svg-panel" x="62" y="322" width="146" height="72" rx="12" />
        <path className="service-svg-line" d="M80 344h110M80 359h76" />
        <text className="service-svg-label" x="78" y="380">API / SISTEMA</text>
      </g>

      <path className="service-svg-route automation-merge" d="M208 162h34v82h88M208 260h34v-16M208 358h34V244" />

      <g className="automation-pipeline">
        <rect className="service-svg-surface" x="302" y="116" width="396" height="330" rx="20" />
        <text className="service-svg-kicker" x="330" y="151">PROCESO CONECTADO</text>
        <text className="service-svg-muted" x="670" y="151" textAnchor="end">SUPERVISADO</text>
        <path className="service-svg-guide" d="M330 169h340" />
        <path className="service-svg-route" d="M354 244h262" />
        <g transform="translate(330 196)">
          <rect className="service-svg-step" width="88" height="94" rx="12" />
          <text className="service-svg-index" x="14" y="21">01</text>
          <path className="service-svg-strong" d="M15 43h57M15 55h39" />
          <text className="service-svg-label" x="14" y="78">VALIDAR</text>
        </g>
        <g transform="translate(456 196)">
          <rect className="service-svg-step is-accent" width="88" height="94" rx="12" />
          <text className="service-svg-index" x="14" y="21">02</text>
          <path className="service-svg-strong" d="M15 43h57M15 55h46" />
          <text className="service-svg-label" x="14" y="78">REGISTRAR</text>
        </g>
        <g transform="translate(582 196)">
          <rect className="service-svg-step" width="88" height="94" rx="12" />
          <text className="service-svg-index" x="14" y="21">03</text>
          <path className="service-svg-strong" d="M15 43h57M15 55h33" />
          <text className="service-svg-label" x="14" y="78">ASIGNAR</text>
        </g>
        <path className="service-svg-route" d="M626 290v34" />
        <rect className="service-svg-output" x="330" y="324" width="340" height="86" rx="12" />
        <circle className="service-svg-check" cx="360" cy="367" r="15" />
        <path className="service-svg-checkmark" d="M353 367l5 5 10-12" />
        <text className="service-svg-label" x="390" y="358">SIGUIENTE ACCIÓN CREADA</text>
        <text className="service-svg-muted" x="390" y="380">RESPONSABLE · FECHA · CONTEXTO</text>
      </g>

      <circle className="service-svg-traveller is-automation" cx="0" cy="0" r="5" />
      <path className="service-svg-guide" d="M62 486h636" />
      <text className="service-svg-muted" x="62" y="516">ENTRADA ÚNICA</text>
      <text className="service-svg-muted" x="380" y="516" textAnchor="middle">REGLAS VISIBLES</text>
      <text className="service-svg-muted" x="698" y="516" textAnchor="end">RESULTADO TRAZABLE</text>
    </svg>
  );
}

function AppsHeroVisual() {
  return (
    <svg viewBox="0 0 760 590" role="img" aria-label="Interfaz de una aplicación interna con actividad, estados y detalle">
      <text className="service-svg-kicker" x="70" y="55">HERRAMIENTA INTERNA / PANEL OPERATIVO</text>
      <text className="service-svg-muted" x="690" y="55" textAnchor="end">VISTA DE EQUIPO</text>
      <rect className="service-svg-surface apps-hero-shell" x="70" y="78" width="620" height="424" rx="20" />
      <path className="service-svg-guide" d="M70 132h620M210 132v370" />
      <circle className="service-svg-dot" cx="98" cy="105" r="3.5" />
      <circle className="service-svg-dot" cx="112" cy="105" r="3.5" />
      <circle className="service-svg-dot" cx="126" cy="105" r="3.5" />
      <text className="service-svg-label" x="154" y="109">TEMIS / OPERACIONES</text>

      <g className="apps-navigation">
        <rect className="service-svg-nav is-active" x="92" y="166" width="96" height="30" rx="7" />
        <circle className="service-svg-icon" cx="108" cy="181" r="4" />
        <text className="service-svg-label" x="120" y="185">ACTIVIDAD</text>
        <path className="service-svg-line" d="M96 229h69M96 266h51M96 303h75M96 340h58" />
        <text className="service-svg-muted" x="96" y="391">EQUIPO</text>
        <circle className="service-svg-avatar" cx="108" cy="421" r="11" />
        <circle className="service-svg-avatar" cx="136" cy="421" r="11" />
        <circle className="service-svg-avatar" cx="164" cy="421" r="11" />
      </g>

      <text className="service-svg-kicker" x="240" y="169">RESUMEN DE HOY</text>
      <g className="apps-metrics">
        <rect className="service-svg-panel" x="240" y="188" width="128" height="76" rx="11" />
        <text className="service-svg-value" x="258" y="226">08</text>
        <text className="service-svg-muted" x="258" y="247">EN CURSO</text>
        <rect className="service-svg-panel is-accent" x="384" y="188" width="128" height="76" rx="11" />
        <text className="service-svg-value" x="402" y="226">03</text>
        <text className="service-svg-muted" x="402" y="247">REQUIEREN ACCIÓN</text>
      </g>

      <g className="apps-activity">
        <rect className="service-svg-panel" x="240" y="286" width="270" height="180" rx="12" />
        <text className="service-svg-label" x="258" y="315">ACTIVIDAD RECIENTE</text>
        <path className="service-svg-guide" d="M258 330h234" />
        <circle className="service-svg-status is-done" cx="270" cy="355" r="5" />
        <path className="service-svg-line" d="M286 352h123M286 363h75" />
        <circle className="service-svg-status is-progress" cx="270" cy="399" r="5" />
        <path className="service-svg-line" d="M286 396h157M286 407h92" />
        <circle className="service-svg-status" cx="270" cy="443" r="5" />
        <path className="service-svg-line" d="M286 440h104M286 451h61" />
        <rect className="apps-row-focus" x="252" y="378" width="246" height="42" rx="8" />
      </g>

      <g className="apps-detail">
        <rect className="service-svg-output" x="530" y="188" width="132" height="278" rx="12" />
        <text className="service-svg-muted" x="548" y="216">DETALLE / 03</text>
        <circle className="service-svg-check" cx="556" cy="250" r="13" />
        <path className="service-svg-checkmark" d="M550 250l4 4 8-9" />
        <path className="service-svg-strong" d="M578 245h64M578 257h44" />
        <text className="service-svg-label" x="548" y="302">RESPONSABLE</text>
        <path className="service-svg-line" d="M548 318h90" />
        <text className="service-svg-label" x="548" y="356">SIGUIENTE PASO</text>
        <path className="service-svg-line" d="M548 372h96M548 386h68" />
        <rect className="service-svg-button" x="548" y="414" width="96" height="28" rx="8" />
        <text className="service-svg-button-text" x="596" y="432" textAnchor="middle">ACTUALIZAR</text>
      </g>
    </svg>
  );
}

function AiHeroVisual() {
  return (
    <svg viewBox="0 0 760 590" role="img" aria-label="Flujo de inteligencia artificial desde fuentes autorizadas hasta revisión humana">
      <text className="service-svg-kicker" x="55" y="62">CASO DE USO / ANÁLISIS DOCUMENTAL</text>
      <text className="service-svg-muted" x="705" y="62" textAnchor="end">CONTROL HUMANO ACTIVO</text>
      <path className="service-svg-guide" d="M55 82h650" />

      <g className="ai-sources">
        <text className="service-svg-label" x="56" y="122">01 / FUENTES</text>
        <rect className="service-svg-panel" x="56" y="146" width="150" height="84" rx="10" />
        <path className="service-svg-line" d="M76 170h86M76 184h110M76 198h68" />
        <text className="service-svg-muted" x="76" y="217">CONTRATO.PDF</text>
        <rect className="service-svg-panel" x="68" y="248" width="150" height="84" rx="10" />
        <path className="service-svg-line" d="M88 272h96M88 286h72M88 300h106" />
        <text className="service-svg-muted" x="88" y="319">PROCESO.DOCX</text>
        <rect className="service-svg-panel" x="80" y="350" width="150" height="84" rx="10" />
        <path className="service-svg-line" d="M100 374h104M100 388h84M100 402h62" />
        <text className="service-svg-muted" x="100" y="421">INFORME.PDF</text>
      </g>

      <path className="service-svg-route ai-route-in" d="M230 392h42c22 0 34-14 34-36V201c0-26 17-43 43-43h12" />

      <g className="ai-processing">
        <rect className="service-svg-surface" x="360" y="112" width="150" height="342" rx="18" />
        <text className="service-svg-label" x="380" y="142">02 / PROCESAR</text>
        <g transform="translate(380 168)">
          <rect className="service-svg-step" width="110" height="62" rx="10" />
          <text className="service-svg-index" x="14" y="20">A</text>
          <path className="service-svg-strong" d="M14 35h82M14 47h52" />
          <text className="service-svg-label" x="14" y="58">EXTRAER</text>
        </g>
        <path className="service-svg-route" d="M435 230v30" />
        <g transform="translate(380 260)">
          <rect className="service-svg-step is-accent" width="110" height="62" rx="10" />
          <text className="service-svg-index" x="14" y="20">B</text>
          <path className="service-svg-strong" d="M14 35h82M14 47h65" />
          <text className="service-svg-label" x="14" y="58">ORDENAR</text>
        </g>
        <path className="service-svg-route" d="M435 322v30" />
        <g transform="translate(380 352)">
          <rect className="service-svg-step" width="110" height="62" rx="10" />
          <text className="service-svg-index" x="14" y="20">C</text>
          <path className="service-svg-strong" d="M14 35h82M14 47h42" />
          <text className="service-svg-label" x="14" y="58">CITAR</text>
        </g>
      </g>

      <path className="service-svg-route ai-route-out" d="M490 383h35c15 0 27-12 27-27v-55" />

      <g className="ai-result">
        <text className="service-svg-label" x="552" y="122">03 / BORRADOR</text>
        <rect className="service-svg-output" x="552" y="146" width="153" height="208" rx="12" />
        <path className="service-svg-strong" d="M574 176h109M574 194h78" />
        <path className="service-svg-line" d="M574 228h108M574 244h92M574 260h105M574 276h68" />
        <rect className="service-svg-citation" x="574" y="300" width="50" height="24" rx="6" />
        <rect className="service-svg-citation" x="632" y="300" width="50" height="24" rx="6" />
        <text className="service-svg-muted" x="599" y="316" textAnchor="middle">F.12</text>
        <text className="service-svg-muted" x="657" y="316" textAnchor="middle">F.27</text>
        <rect className="service-svg-panel is-review" x="552" y="378" width="153" height="76" rx="12" />
        <circle className="service-svg-check" cx="578" cy="416" r="14" />
        <path className="service-svg-checkmark" d="M571 416l5 5 10-12" />
        <text className="service-svg-label" x="602" y="409">REVISIÓN</text>
        <text className="service-svg-muted" x="602" y="427">PERSONA RESPONSABLE</text>
      </g>

      <circle className="service-svg-traveller is-ai" cx="0" cy="0" r="5" />
      <path className="service-svg-guide" d="M55 492h650" />
      <text className="service-svg-muted" x="55" y="522">FUENTES IDENTIFICADAS</text>
      <text className="service-svg-muted" x="380" y="522">TRAZABILIDAD</text>
      <text className="service-svg-muted" x="705" y="522" textAnchor="end">DECISIÓN HUMANA</text>
    </svg>
  );
}

function DetailHeroVisual({ type }: { type: DetailServiceId }) {
  return (
    <div className={`service-detail-hero-visual is-${type}`} aria-hidden="true">
      <div className="service-detail-hero-grid" />
      {type === "automation" ? <AutomationHeroVisual /> : type === "apps" ? <AppsHeroVisual /> : <AiHeroVisual />}
    </div>
  );
}

function DetailSolutionGraphic({ type, index }: { type: DetailServiceId; index: number }) {
  if (type === "automation") {
    if (index === 0) {
      return (
        <svg viewBox="0 0 190 100" aria-hidden="true">
          <g className="solution-source-stack">
            <circle cx="18" cy="28" r="7" /><circle cx="18" cy="50" r="7" /><circle cx="18" cy="72" r="7" />
            <path d="M25 28h25M25 50h25M25 72h25" />
          </g>
          <path className="is-accent solution-flow-line" d="M50 28v8c0 8 7 14 15 14h15M50 72v-8c0-8 7-14 15-14" />
          <path d="M80 35l24 15-24 15z" />
          <rect x="116" y="24" width="58" height="52" rx="7" />
          <path d="M128 38h34M128 49h23M128 64h18" />
          <circle className="is-accent-fill solution-status-pulse" cx="160" cy="64" r="5" />
        </svg>
      );
    }
    if (index === 1) {
      return (
        <svg viewBox="0 0 190 100" aria-hidden="true">
          <g className="solution-variable-list">
            <rect x="8" y="19" width="58" height="62" rx="7" />
            <path d="M20 34h33M20 48h21M20 62h37" />
            <circle className="is-accent-fill" cx="55" cy="34" r="3" />
            <circle className="is-accent-fill" cx="43" cy="48" r="3" />
            <circle className="is-accent-fill" cx="59" cy="62" r="3" />
          </g>
          <path className="is-accent solution-flow-line" d="M66 50h30" />
          <path d="M88 44l8 6-8 6" />
          <g className="solution-document-build">
            <path d="M105 10h52l25 25v55h-77zM157 10v25h25" />
            <path d="M119 48h48M119 60h35M119 72h42" />
            <path className="is-light" d="M146 79l5 5 11-13" />
          </g>
        </svg>
      );
    }
    if (index === 2) {
      return (
        <svg viewBox="0 0 190 100" aria-hidden="true">
          <rect x="10" y="15" width="112" height="72" rx="8" />
          <path d="M10 35h112M35 10v13M96 10v13" />
          <path d="M27 49h14M54 49h14M81 49h14M27 68h14M54 68h14M81 68h14" />
          <rect className="is-accent-fill solution-deadline-pulse" x="52" y="60" width="18" height="16" rx="3" />
          <path className="is-accent" d="M122 63h19" />
          <path d="M151 39c13 0 23 10 23 23v8h6v8h-58v-8h6v-8c0-13 10-23 23-23zM143 87h16" />
          <circle className="is-accent-fill" cx="151" cy="34" r="4" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 190 100" aria-hidden="true">
        <g className="solution-database is-left">
          <ellipse cx="38" cy="25" rx="26" ry="10" />
          <path d="M12 25v48c0 6 12 10 26 10s26-4 26-10V25M12 49c0 6 12 10 26 10s26-4 26-10" />
        </g>
        <g className="solution-database is-right">
          <ellipse cx="152" cy="25" rx="26" ry="10" />
          <path d="M126 25v48c0 6 12 10 26 10s26-4 26-10V25M126 49c0 6 12 10 26 10s26-4 26-10" />
        </g>
        <path className="is-accent solution-sync-forward" d="M65 38h52l-9-8M117 38l-9 8" />
        <path className="is-accent solution-sync-back" d="M125 67H73l9-8M73 67l9 8" />
      </svg>
    );
  }
  if (type === "apps") {
    if (index === 0) {
      return (
        <svg viewBox="0 0 190 100" aria-hidden="true">
          <rect x="7" y="10" width="176" height="80" rx="8" />
          <path d="M7 29h176M66 29v61M124 29v61" />
          <path d="M18 20h28M76 20h28M134 20h28" />
          <rect x="18" y="40" width="37" height="17" rx="4" />
          <rect x="76" y="40" width="37" height="26" rx="4" />
          <rect className="is-accent-fill solution-kanban-card" x="134" y="40" width="37" height="36" rx="4" />
          <path d="M25 48h22M83 48h23M83 57h17M141 49h23M141 58h17M141 67h21" />
        </svg>
      );
    }
    if (index === 1) {
      return (
        <svg viewBox="0 0 190 100" aria-hidden="true">
          <rect x="8" y="12" width="112" height="76" rx="8" />
          <path d="M8 32h112M79 32v56M19 47h44M19 60h35M19 73h48" />
          <path className="is-accent" d="M89 47h20M89 60h20M89 73h20" />
          <rect x="132" y="20" width="49" height="60" rx="7" />
          <path d="M143 33h27M143 45h15" />
          <path className="is-accent solution-total-line" d="M143 64h27" />
          <circle className="is-accent-fill" cx="174" cy="64" r="3" />
        </svg>
      );
    }
    if (index === 2) {
      return (
        <svg viewBox="0 0 190 100" aria-hidden="true">
          <path d="M10 18h170M10 82h170M40 18v64M75 18v64M110 18v64M145 18v64" />
          <path d="M17 34h18M17 51h18M17 68h18" />
          <rect className="is-accent-fill solution-gantt-one" x="48" y="28" width="55" height="11" rx="5.5" />
          <rect className="is-accent-fill solution-gantt-two" x="83" y="46" width="70" height="11" rx="5.5" />
          <rect className="is-accent-fill solution-gantt-three" x="118" y="64" width="48" height="11" rx="5.5" />
          <circle cx="103" cy="33.5" r="4" /><circle cx="153" cy="51.5" r="4" /><circle cx="166" cy="69.5" r="4" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 190 100" aria-hidden="true">
        <rect x="7" y="9" width="176" height="82" rx="8" />
        <path d="M7 29h176M68 29v62" />
        <path d="M20 46h34M20 59h24M20 72h39" />
        <path d="M82 75h86" />
        <rect className="is-accent-fill solution-bar-one" x="88" y="55" width="14" height="20" rx="3" />
        <rect className="is-accent-fill solution-bar-two" x="112" y="41" width="14" height="34" rx="3" />
        <rect className="is-accent-fill solution-bar-three" x="136" y="29" width="14" height="46" rx="3" />
        <path className="is-light solution-chart-line" d="M82 60l25-15 23 6 34-29" />
        <circle className="is-accent-fill" cx="164" cy="22" r="4" />
      </svg>
    );
  }
  if (index === 0) {
    return (
      <svg viewBox="0 0 190 100" aria-hidden="true">
        <path d="M12 12h58l17 17v59H12zM70 12v17h17" />
        <path d="M25 43h48M25 56h36M25 69h45" />
        <rect className="is-accent solution-extract-selection" x="22" y="50" width="45" height="13" rx="3" />
        <path className="is-accent solution-flow-line" d="M88 50h22" />
        <rect x="112" y="19" width="66" height="69" rx="7" />
        <path d="M125 35h14M146 35h19M125 51h23M155 51h10M125 67h18M150 67h15" />
        <circle className="is-accent-fill" cx="119" cy="35" r="3" /><circle className="is-accent-fill" cx="119" cy="51" r="3" /><circle className="is-accent-fill" cx="119" cy="67" r="3" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 190 100" aria-hidden="true">
        <path d="M10 18h65v44H31L18 75V62h-8z" />
        <path d="M23 34h39M23 46h26" />
        <path className="is-accent solution-flow-line" d="M76 40h26" />
        <circle className="is-accent-fill" cx="111" cy="40" r="9" />
        <path d="M111 49v15M111 64H89M111 64h22" />
        <rect x="70" y="69" width="43" height="20" rx="5" />
        <rect x="121" y="69" width="59" height="20" rx="5" />
        <path className="is-light" d="M79 79h25M132 79h37" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 190 100" aria-hidden="true">
        <path d="M10 14h52l15 15v56H10zM62 14v15h15M25 43h37M25 55h29M25 67h34" />
        <path d="M83 14h45l13 13v42H83zM128 14v13h13M95 40h32M95 52h24" />
        <circle className="is-accent solution-search-ring" cx="115" cy="60" r="22" />
        <path className="is-accent" d="M131 76l15 15" />
        <path d="M149 27h31v58h-31M158 43h14M158 55h11M158 67h14" />
        <circle className="is-accent-fill" cx="155" cy="43" r="2.5" /><circle className="is-accent-fill" cx="155" cy="55" r="2.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 190 100" aria-hidden="true">
      <rect x="8" y="18" width="62" height="64" rx="8" />
      <circle cx="29" cy="39" r="9" />
      <path d="M20 62h39M20 71h27" />
      <path className="is-accent solution-flow-line" d="M70 50h24" />
      <rect x="96" y="12" width="47" height="76" rx="8" />
      <path d="M108 30h23M108 43h17M108 56h23M108 69h14" />
      <path className="is-accent" d="M143 50h13" />
      <circle className="is-accent-fill solution-approval-pulse" cx="169" cy="50" r="14" />
      <path className="is-light" d="M162 50l5 5 10-12" />
    </svg>
  );
}

function AutomationCapability({ service }: { service: DetailService }) {
  const stages = [
    ["01", "Entrada", "Formulario recibido"],
    ["02", "Validación", "Datos completos"],
    ["03", "Registro", "Oportunidad creada"],
    ["04", "Asignación", "Responsable avisado"],
    ["05", "Seguimiento", "Siguiente acción"],
  ] as const;

  return (
    <section className="service-capability is-automation">
      <div className="container-shell">
        <header className="service-capability-heading" data-web-reveal>
          <p>{service.capabilityKicker}</p>
          <div><h2>{service.capabilityTitle}</h2><span>{service.capabilityIntro}</span></div>
        </header>
        <div className="automation-flow-panel" data-web-reveal>
          <div className="automation-flow-top">
            <span>FLOW / CONSULTA COMERCIAL</span>
            <div>{service.capabilityTags.map((tag) => <i key={tag}>{tag}</i>)}</div>
          </div>
          <ol>
            {stages.map(([number, title, state], index) => (
              <li key={number}>
                <span>{number}</span>
                <div className="automation-flow-node"><i /><strong>{title}</strong><small>{state}</small></div>
                {index < stages.length - 1 && <div className="automation-flow-route"><i /></div>}
              </li>
            ))}
          </ol>
          <div className="automation-flow-footer">
            <span><i /> TRAZABILIDAD ACTIVA</span>
            <span>PERSONA / DECISIÓN · SISTEMA / RECORRIDO</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppsCapability({ service }: { service: DetailService }) {
  return (
    <section className="web-proof service-apps-proof">
      <div className="container-shell">
        <header className="web-proof-heading" data-web-reveal>
          <p>{service.capabilityKicker}</p>
          <div><h2>{service.capabilityTitle}</h2><span>{service.capabilityIntro}</span></div>
        </header>
        <div className="web-proof-stage" data-web-reveal>
          <ExperiencePreview
            demoHref="https://azoragestion.vercel.app/"
            title="Sistema de gestión comercial"
            summary="Una herramienta interna donde oportunidades, actividad y seguimiento comparten contexto y siguiente acción."
            tags={[...service.capabilityTags]}
            exampleLabel="02 · Gestión"
            visual="crm"
            browserTitle="Temis · Gestión comercial"
            iframeTitle="Demostración interactiva del sistema de gestión comercial"
            actionLabel="Probar herramienta"
            reverse
          />
        </div>
      </div>
    </section>
  );
}

function AiCapability({ service }: { service: DetailService }) {
  return (
    <section className="service-capability is-ai">
      <div className="container-shell">
        <header className="service-capability-heading" data-web-reveal>
          <p>{service.capabilityKicker}</p>
          <div><h2>{service.capabilityTitle}</h2><span>{service.capabilityIntro}</span></div>
        </header>
        <div className="ai-capability-panel" data-web-reveal>
          <div className="ai-capability-sources">
            {[["DOC / 12", "Contrato proveedor"], ["DOC / 27", "Procedimiento interno"], ["DOC / 41", "Informe operativo"]].map(([code, name]) => (
              <article key={code}><span>{code}</span><i /><strong>{name}</strong><small>FUENTE AUTORIZADA</small></article>
            ))}
          </div>
          <div className="ai-capability-core" aria-hidden="true">
            <span>EXTRAER</span><i /><span>SINTETIZAR</span><i /><span>CITAR</span>
          </div>
          <article className="ai-capability-review">
            <div><span>RESULTADO / BORRADOR</span><i>REVISIÓN PENDIENTE</i></div>
            <h3>Síntesis preparada con referencias a las fuentes utilizadas.</h3>
            <p>La persona comprueba el contenido, corrige el contexto y decide el siguiente paso.</p>
            <ul>{service.capabilityTags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            <footer><Check size={15} aria-hidden="true" /> VALIDACIÓN HUMANA / REQUERIDA</footer>
          </article>
        </div>
      </div>
    </section>
  );
}

function AiGovernance() {
  return (
    <section className="ai-governance">
      <div className="container-shell ai-governance-layout">
        <header data-web-reveal>
          <p>DATOS PERSONALES / RGPD</p>
          <h2>Antes de conectar una IA, hay que saber qué datos entran y qué ocurre con ellos.</h2>
          <span>
            Cuando un caso puede tratar datos personales o información confidencial, revisamos finalidad, información necesaria, accesos, conservación y condiciones de los proveedores.
          </span>
        </header>
        <div className="ai-governance-list">
          {governance.map((item) => (
            <article key={item.number} data-web-reveal>
              <span>{item.number}</span>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceDetailShowcase({ service }: { service: DetailService }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("is-reveal-ready");
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-web-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.13, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={`web-service-page service-detail-page is-${service.id}`}>
      <section className="service-detail-hero">
        <div className="container-shell service-detail-hero-inner">
          <div className="service-detail-hero-copy" data-web-reveal>
            <Link href="/servicios" className="services-back-link"><ArrowLeft size={15} aria-hidden="true" /> VOLVER A SERVICIOS</Link>
            <div className="web-service-meta">
              <span>{service.number} / {service.eyebrow}</span>
              <span>{service.meta}</span>
            </div>
            <h1>{service.hero}</h1>
            <p>{service.lead}</p>
            <div className="web-service-hero-actions">
              <Link href="/#contacto">{service.heroAction} <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <a href="#resultado">Ver qué cambia <ArrowDown size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <DetailHeroVisual type={service.id} />
        </div>
        <div className="web-service-hero-rail" aria-hidden="true">
          <span>{service.capabilityTags[0]}</span><i /><span>{service.capabilityTags[1]}</span><i /><span>{service.capabilityTags[2]}</span>
        </div>
      </section>

      <section id="resultado" className="web-outcomes">
        <div className="container-shell">
          <header className="web-outcomes-heading" data-web-reveal>
            <p>{service.valueKicker}</p>
            <h2>{service.valueTitle}</h2>
            <span>{service.valueIntro}</span>
          </header>
          <div className="web-outcomes-grid">
            {service.outcomes.map((outcome) => (
              <article key={outcome.number} data-web-reveal>
                <span>{outcome.number}</span>
                <div className="web-outcome-mark" aria-hidden="true"><i /><i /><i /></div>
                <h3>{outcome.title}</h3>
                <p>{outcome.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {service.id === "ai" && <AiGovernance />}

      <section className="web-comparison">
        <div className="container-shell web-comparison-layout">
          <header data-web-reveal>
            <p>{service.comparisonKicker}</p>
            <h2>{service.comparisonTitle}</h2>
            <span>{service.comparisonIntro}</span>
          </header>
          <div className="web-comparison-table">
            <div className="web-comparison-labels" aria-hidden="true">
              <span>{service.comparisonBefore}</span><span>{service.comparisonAfter}</span>
            </div>
            {service.comparison.map(([before, after], index) => (
              <div className="web-comparison-row" key={before} data-web-reveal>
                <span className="web-comparison-index">0{index + 1}</span>
                <p><X size={15} aria-hidden="true" />{before}</p>
                <i aria-hidden="true"><ArrowRight size={16} /></i>
                <p><Check size={15} aria-hidden="true" />{after}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="web-solutions">
        <div className="container-shell">
          <header className="web-solutions-heading" data-web-reveal>
            <p>{service.solutionsKicker}</p>
            <div><h2>{service.solutionsTitle}</h2><span>{service.solutionsIntro}</span></div>
          </header>
          <div className="web-solutions-grid">
            {service.solutions.map((solution, index) => (
              <article key={solution.number} data-web-reveal>
                <div className="web-solution-top"><span>{solution.number}</span><p>{solution.detail}</p></div>
                <div className="web-solution-graphic"><DetailSolutionGraphic type={service.id} index={index} /></div>
                <h3>{solution.title}</h3><p>{solution.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {service.id === "automation" ? <AutomationCapability service={service} /> : service.id === "apps" ? <AppsCapability service={service} /> : <AiCapability service={service} />}

      <section className="web-process">
        <div className="container-shell web-process-layout">
          <header data-web-reveal>
            <p>{service.processKicker}</p>
            <h2>{service.processTitle}</h2>
            <span>{service.processIntro}</span>
          </header>
          <ol className="web-process-list">
            {service.process.map(([number, title, text]) => (
              <li key={number} data-web-reveal><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="web-service-cta">
        <div className="container-shell web-service-cta-inner" data-web-reveal>
          <div><p>{service.ctaKicker}</p><h2>{service.ctaTitle}</h2></div>
          <div><p>{service.ctaText}</p><Link href="/#contacto">Revisar vuestro caso <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <nav className="service-detail-nav" aria-label="Navegación entre servicios">
        <div className="container-shell service-detail-nav-inner">
          <Link href={service.previous.href} className="is-previous">
            <ArrowLeft size={24} aria-hidden="true" />
            <div><small>{service.previous.meta}</small><strong>{service.previous.label}</strong></div>
          </Link>
          <Link href={service.next.href} className="is-next">
            <div><small>{service.next.meta}</small><strong>{service.next.label}</strong></div>
            <ArrowRight size={24} aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
