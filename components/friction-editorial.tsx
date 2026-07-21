"use client";

import type { PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";

const signals = [
  {
    category: "Seguimiento comercial",
    title: "Clientes que esperan una respuesta.",
    description: "Las conversaciones viven en varios canales y nadie comparte una vista completa.",
    impact: "Oportunidades que se enfrían",
  },
  {
    category: "Proceso de venta",
    title: "Presupuestos que nadie vuelve a abrir.",
    description: "Se preparan y se envían, pero el próximo paso desaparece con ellos.",
    impact: "Ventas sin seguimiento",
  },
  {
    category: "Información operativa",
    title: "Datos que solo aparecen al preguntar.",
    description: "El contexto se reparte entre carpetas, Excel, notas y mensajes.",
    impact: "Decisiones sin contexto",
  },
  {
    category: "Carga manual",
    title: "Tareas que regresan cada semana.",
    description: "Copiar datos, actualizar estados y rehacer documentos sigue consumiendo horas.",
    impact: "Tiempo invisible",
  },
  {
    category: "Visibilidad",
    title: "Proyectos cuyo estado depende de la memoria.",
    description: "Saber qué está ocurriendo exige interrumpir a la persona que lo lleva.",
    impact: "Control insuficiente",
  },
  {
    category: "Ecosistema digital",
    title: "Herramientas que no trabajan juntas.",
    description: "Hay software, pero el proceso continúa siendo manual entre una pantalla y otra.",
    impact: "Trabajo desconectado",
  },
] as const;

function handlePointerMove(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--friction-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--friction-y", `${event.clientY - bounds.top}px`);
}

export function FrictionEditorial() {
  return (
    <div className="friction-editorial-list">
      {signals.map((signal, index) => (
        <article key={signal.title} className="friction-editorial-row" onPointerMove={handlePointerMove}>
          <span className="friction-editorial-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div className="friction-editorial-copy">
            <p>{signal.category}</p>
            <h3><span>{signal.title}</span></h3>
            <p className="friction-editorial-description">{signal.description}</p>
          </div>
          <div className="friction-editorial-impact">
            <span>{signal.impact}</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </div>
        </article>
      ))}
    </div>
  );
}
