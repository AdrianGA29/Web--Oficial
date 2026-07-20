import { BarChart3, Check, ChevronRight, CircleDot, Clock3, FileText, Layers3, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductVisual({ type, className }: { type: "flow" | "budget" | "web"; className?: string }) {
  if (type === "budget") return <BudgetVisual className={className} />;
  if (type === "web") return <WebVisual className={className} />;
  return <FlowVisual className={className} />;
}

function Window({ children, label, className }: { children: React.ReactNode; label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("overflow-hidden rounded-[1.15rem] border border-white/12 bg-[#08172d] shadow-[0_28px_80px_rgba(3,10,22,0.38)]", className)}
    >
      <div className="flex h-11 items-center gap-2 border-b border-white/10 bg-white/[0.035] px-4">
        <span className="size-2 rounded-full bg-[#ff7a72]" />
        <span className="size-2 rounded-full bg-gold" />
        <span className="size-2 rounded-full bg-[#46c799]" />
        <div className="ml-3 h-5 w-32 rounded-md bg-white/[0.055]" />
        <div className="ml-auto size-5 rounded-md border border-white/10" />
      </div>
      {children}
    </div>
  );
}

function FlowVisual({ className }: { className?: string }) {
  const items = [
    { label: "Solicitud recibida", icon: CircleDot, color: "text-sky" },
    { label: "Datos validados", icon: Check, color: "text-emerald-300" },
    { label: "Responsable asignado", icon: Layers3, color: "text-gold" },
  ];
  return (
    <Window label="Diagrama conceptual de un proceso automatizado y supervisado" className={className}>
      <div className="grid min-h-[26rem] gap-4 p-5 sm:grid-cols-[0.72fr_1.28fr] sm:p-6">
        <div className="rounded-xl border border-white/8 bg-white/[0.035] p-4">
          <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/60">Flujo activo</p>
          <div className="mt-5 grid gap-3">
            {items.map(({ label, icon: Icon, color }, index) => (
              <div key={label} className="relative flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.035] p-3">
                <div className={cn("grid size-7 place-items-center rounded-md bg-white/5", color)}>
                  <Icon size={14} aria-hidden="true" />
                </div>
                <span className="text-xs font-medium text-white/75">{label}</span>
                {index < items.length - 1 && <span className="absolute -bottom-3.5 left-[1.55rem] h-3.5 w-px bg-sky/25" />}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-sky/20 bg-sky/8 p-3 text-[0.68rem] font-semibold text-sky">
            <Sparkles size={13} aria-hidden="true" /> Supervisión preparada
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-white/8 bg-[#0b1e39] p-5">
          <div className="absolute -right-20 -top-20 size-52 rounded-full bg-blue/15 blur-3xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs text-white/60">Tiempo de ciclo</p>
              <p className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-white">Control visible</p>
            </div>
            <Clock3 className="text-sky" size={20} aria-hidden="true" />
          </div>
          <div className="relative mt-9 grid grid-cols-7 items-end gap-2 border-b border-white/10 pb-4">
            {[42, 66, 52, 78, 61, 88, 72].map((height, index) => (
              <div key={height + index} className="relative h-32 rounded-t-md bg-white/[0.035]">
                <div className="absolute inset-x-0 bottom-0 rounded-t-md bg-gradient-to-t from-blue/55 to-sky/70" style={{ height: `${height}%` }} />
              </div>
            ))}
          </div>
          <div className="relative mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/8 p-3"><p className="text-[0.64rem] text-white/60">Estado</p><p className="mt-1 text-xs font-semibold text-white/80">Trazable</p></div>
            <div className="rounded-lg border border-white/8 p-3"><p className="text-[0.64rem] text-white/60">Decisión</p><p className="mt-1 text-xs font-semibold text-white/80">Supervisada</p></div>
          </div>
        </div>
      </div>
    </Window>
  );
}

function BudgetVisual({ className }: { className?: string }) {
  return (
    <Window label="Representación conceptual de una herramienta de presupuestación técnica" className={className}>
      <div className="min-h-[26rem] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><p className="text-xs text-white/60">Presupuesto técnico</p><p className="mt-1 text-lg font-semibold text-white">Nueva estimación</p></div>
          <span className="rounded-full border border-gold/25 bg-gold/8 px-3 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] text-gold">Borrador revisable</span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-3">
            {["Material y formato", "Operaciones y tiempos", "Acabados y tolerancias"].map((label, index) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-4">
                <span className="grid size-8 place-items-center rounded-lg bg-blue/15 font-mono text-[0.62rem] font-bold text-sky">0{index + 1}</span>
                <div className="min-w-0 flex-1"><p className="text-xs font-semibold text-white/78">{label}</p><div className="mt-2 h-1.5 rounded-full bg-white/7"><div className="h-full rounded-full bg-gradient-to-r from-blue to-sky" style={{ width: `${78 - index * 14}%` }} /></div></div>
                <ChevronRight size={15} className="text-white/25" aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-sky/18 bg-sky/[0.055] p-4">
            <div className="flex items-center justify-between"><p className="text-xs font-semibold text-white/75">Resumen de cálculo</p><FileText size={16} className="text-sky" aria-hidden="true" /></div>
            <dl className="mt-5 grid gap-3 text-[0.68rem]">
              <div className="flex justify-between border-b border-white/8 pb-3"><dt className="text-white/60">Material</dt><dd className="font-semibold text-white/72">Calculado</dd></div>
              <div className="flex justify-between border-b border-white/8 pb-3"><dt className="text-white/60">Operaciones</dt><dd className="font-semibold text-white/72">Revisadas</dd></div>
              <div className="flex justify-between border-b border-white/8 pb-3"><dt className="text-white/60">Margen</dt><dd className="font-semibold text-white/72">Visible</dd></div>
            </dl>
            <div className="mt-5 rounded-lg bg-white/[0.055] p-3"><p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/60">Resultado</p><p className="mt-1 text-xl font-semibold text-white">Listo para revisar</p></div>
          </div>
        </div>
      </div>
    </Window>
  );
}

function WebVisual({ className }: { className?: string }) {
  return (
    <Window label="Representación conceptual de una experiencia web interactiva" className={className}>
      <div className="relative min-h-[26rem] overflow-hidden p-6">
        <div className="absolute -right-16 top-4 size-60 rounded-full bg-blue/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 size-48 rounded-full bg-sky/10 blur-3xl" />
        <div className="relative grid gap-6 sm:grid-cols-[1.05fr_0.95fr]">
          <div className="pt-5">
            <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-sky">Experiencia conectada</span>
            <p className="mt-4 max-w-xs text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-white">Una web que también hace su parte.</p>
            <p className="mt-4 max-w-sm text-xs leading-5 text-white/60">Narrativa, interacción y automatización al servicio de una decisión concreta.</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-[0.68rem] font-bold text-primary">Explorar flujo <ChevronRight size={13} aria-hidden="true" /></div>
          </div>
          <div className="relative min-h-64">
            <div className="absolute inset-x-5 top-4 rounded-xl border border-white/12 bg-white/[0.055] p-4 backdrop-blur">
              <div className="flex items-center gap-2"><Sparkles size={15} className="text-gold" aria-hidden="true" /><span className="text-xs font-semibold text-white/78">Asistente contextual</span></div>
              <div className="mt-4 h-2 w-4/5 rounded-full bg-white/8" /><div className="mt-2 h-2 w-3/5 rounded-full bg-white/6" />
            </div>
            <div className="absolute inset-x-0 top-36 rounded-xl border border-sky/18 bg-[#0d2545]/95 p-4 shadow-xl">
              <div className="flex items-center justify-between"><span className="text-[0.68rem] font-semibold text-white/65">Recorrido de conversión</span><BarChart3 size={15} className="text-sky" aria-hidden="true" /></div>
              <div className="mt-5 flex items-end gap-2">{[44, 62, 56, 84, 74].map((height, i) => <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-blue/50 to-sky/75" style={{ height: `${height}px` }} />)}</div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
