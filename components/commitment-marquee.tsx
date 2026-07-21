const statements = [
  { accent: "Alcance claro", rest: "antes de construir" },
  { accent: "IA supervisada", rest: "siempre por personas" },
  { accent: "Primero el proceso", rest: "después, la herramienta" },
  { accent: "Menos promesas", rest: "más sistemas que funcionan" },
  { accent: "Mejoras útiles", rest: "antes que proyectos infinitos" },
  { accent: "Construir menos", rest: "resolver mejor" },
] as const;

function StatementGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="commitment-marquee-group" aria-hidden={duplicate || undefined}>
      {Array.from({ length: 2 }, (_, cycle) =>
        statements.map((statement) => (
          <li key={`${cycle}-${statement.accent}`} aria-hidden={cycle > 0 || undefined}>
            <p><strong>{statement.accent}</strong> <span>{statement.rest}</span></p>
            <span className="commitment-marquee-separator" aria-hidden="true">—</span>
          </li>
        )),
      )}
    </ul>
  );
}

export function CommitmentMarquee() {
  return (
    <section className="commitment-marquee" aria-label="Principios de trabajo">
      <div className="commitment-marquee-track">
        <StatementGroup />
        <StatementGroup duplicate />
      </div>
    </section>
  );
}
