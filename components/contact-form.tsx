"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { track } from "@vercel/analytics";
import { frictionOptions } from "@/lib/site";
import { siteConfig } from "@/lib/config";

type Values = {
  name: string;
  company: string;
  email: string;
  phone: string;
  friction: string;
  message: string;
  privacy: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const initialValues: Values = { name: "", company: "", email: "", phone: "", friction: "", message: "", privacy: false };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s().-]{6,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Introduce tu nombre.";
  if (values.company.trim().length < 2) errors.company = "Introduce el nombre de tu empresa.";
  if (!emailPattern.test(values.email.trim())) errors.email = "Introduce un email válido.";
  if (values.phone.trim() && !phonePattern.test(values.phone.trim())) errors.phone = "Revisa el número o deja el campo vacío.";
  if (!values.friction) errors.friction = "Selecciona el área que más os frena.";
  if (values.message.trim() && values.message.trim().length < 20) errors.message = "Si añades un mensaje, cuéntanos algo más (mínimo 20 caracteres).";
  if (!values.privacy) errors.privacy = "Debes aceptar la política de privacidad.";
  return errors;
}

const fieldClass =
  "min-h-12 w-full rounded-[0.7rem] border border-white/15 bg-white/[0.055] px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-sky focus:bg-white/[0.08] focus:ring-4 focus:ring-sky/10";

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [validated, setValidated] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const update = <K extends keyof Values>(field: K, value: Values[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    setStatus("idle");
    if (validated) setErrors(validate(next));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setValidated(true);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }

    setStatus("submitting");
    const data = new FormData();
    data.append("name", values.name.trim());
    data.append("company", values.company.trim());
    data.append("email", values.email.trim());
    data.append("phone", values.phone.trim() || "No indicado");
    data.append("friction", values.friction);
    data.append("message", values.message.trim() || "Sin mensaje adicional");
    data.append("privacy_accepted", "Sí");
    data.append("_subject", `Nuevo contacto desde la web — ${values.company.trim()}`);
    data.append("_gotcha", honeypot);

    try {
      const response = await fetch(siteConfig.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: data });
      if (!response.ok) throw new Error("Submission rejected");
      track("Form submitted", { form: "home-contact" });
      setValues(initialValues);
      setValidated(false);
      setErrors({});
      setHoneypot("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const labelClass = "mb-2 block text-sm font-medium text-white/68";
  const errorClass = "mt-1.5 text-xs font-semibold text-red-300";

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">No rellenes este campo</label>
        <input id="website" name="_gotcha" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Nombre" required value={values.name} error={errors.name} onChange={(value) => update("name", value)} autoComplete="name" />
        <Field id="company" label="Empresa" required value={values.company} error={errors.company} onChange={(value) => update("company", value)} autoComplete="organization" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" type="email" label="Email" required value={values.email} error={errors.email} onChange={(value) => update("email", value)} autoComplete="email" />
        <Field id="phone" type="tel" label="Teléfono (opcional)" value={values.phone} error={errors.phone} onChange={(value) => update("phone", value)} autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="friction" className={labelClass}>¿Qué os está frenando? <span className="text-sky">*</span></label>
        <select id="friction" value={values.friction} onChange={(event) => update("friction", event.target.value)} aria-invalid={Boolean(errors.friction)} aria-describedby={errors.friction ? "friction-error" : undefined} className={`${fieldClass} appearance-none bg-ink`}>
          <option value="">Selecciona una opción</option>
          {frictionOptions.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        {errors.friction && <p id="friction-error" className={errorClass}>{errors.friction}</p>}
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>Contexto adicional (opcional)</label>
        <textarea id="message" rows={4} maxLength={2000} value={values.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} placeholder="Si quieres, cuéntanos qué ocurre hoy y qué te gustaría mejorar." className={`${fieldClass} resize-y`} />
        {errors.message && <p id="message-error" className={errorClass}>{errors.message}</p>}
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-white/66">
          <input id="privacy" type="checkbox" checked={values.privacy} onChange={(event) => update("privacy", event.target.checked)} aria-invalid={Boolean(errors.privacy)} aria-describedby={errors.privacy ? "privacy-error" : undefined} className="mt-1 size-4 shrink-0 accent-sky" />
          <span>He leído y acepto la <Link href="/privacidad" className="font-semibold text-white underline decoration-sky underline-offset-4">política de privacidad</Link>.</span>
        </label>
        {errors.privacy && <p id="privacy-error" className={errorClass}>{errors.privacy}</p>}
      </div>
      <button type="submit" disabled={status === "submitting"} className="focus-ring inline-flex min-h-13 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue to-[#278ec3] px-5 font-semibold text-white shadow-[0_14px_36px_rgba(47,114,196,0.28)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-65">
        {status === "submitting" ? <LoaderCircle className="animate-spin" size={18} aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
        {status === "submitting" ? "Enviando…" : "Enviar solicitud"}
      </button>
      <p className="text-center text-xs leading-5 text-white/65">Primera orientación clara y sin compromiso comercial.</p>
      <div aria-live="polite" aria-atomic="true">
          {status === "success" && <Status type="success">Solicitud recibida. Revisaremos el contexto antes de responderte.</Status>}
          {status === "error" && <Status type="error">No hemos podido enviarla. Inténtalo de nuevo en unos minutos.</Status>}
      </div>
    </form>
  );
}

function Field({ id, label, value, error, required, type = "text", autoComplete, onChange }: { id: string; label: string; value: string; error?: string; required?: boolean; type?: string; autoComplete?: string; onChange: (value: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/68">{label} {required && <span className="text-sky">*</span>}</label>
      <input id={id} name={id} type={type} value={value} required={required} maxLength={type === "email" ? 254 : 120} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.value)} className={fieldClass} />
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs font-semibold text-red-300">{error}</p>}
    </div>
  );
}

function Status({ type, children }: { type: "success" | "error"; children: React.ReactNode }) {
  const Icon = type === "success" ? CheckCircle2 : AlertCircle;
  return (
    <p className={`animate-menu-in flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${type === "success" ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100" : "border-red-300/25 bg-red-400/10 text-red-100"}`}>
      <Icon size={18} className="mt-0.5 shrink-0" aria-hidden="true" /> {children}
    </p>
  );
}
