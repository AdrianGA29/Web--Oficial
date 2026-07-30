"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { AlertCircle, ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  privacy: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const initialValues: Values = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  privacy: false,
};
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s().-]{6,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Introduce tu nombre.";
  if (!emailPattern.test(values.email.trim())) errors.email = "Introduce un email válido.";
  if (values.phone.trim() && !phonePattern.test(values.phone.trim())) errors.phone = "Revisa el número o deja el campo vacío.";
  if (values.company.trim().length < 2) errors.company = "Introduce la empresa o el nombre del proyecto.";
  if (values.message.trim().length < 20) errors.message = "Cuéntanos un poco más (mínimo 20 caracteres).";
  if (!values.privacy) errors.privacy = "Debes aceptar la política de privacidad.";
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [validated, setValidated] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const update = <K extends keyof Values>(field: K, value: Values[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    setStatus("idle");
    setErrorMessage("");
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

    try {
      const response = await fetch(siteConfig.contactEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          company: values.company.trim(),
          message: values.message.trim(),
          privacy: values.privacy,
          website: honeypot,
          startedAt: startedAt.current,
          page: window.location.href,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean }
        | null;

      if (!response.ok || !result?.ok) {
        if (response.status === 429) {
          setErrorMessage("Has enviado varias solicitudes seguidas. Espera unos minutos antes de intentarlo de nuevo.");
        } else {
          setErrorMessage("No hemos podido enviar la solicitud.");
        }
        throw new Error("Submission rejected");
      }

      setValues(initialValues);
      setValidated(false);
      setErrors({});
      setHoneypot("");
      startedAt.current = Date.now();
      setErrorMessage("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="contact-form">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">No rellenes este campo</label>
        <input id="website" name="_gotcha" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
      </div>

      <div className="contact-form-grid">
        <Field id="name" label="Nombre" placeholder="Tu nombre" required value={values.name} error={errors.name} onChange={(value) => update("name", value)} autoComplete="name" />
        <Field id="email" type="email" label="Email" placeholder="nombre@empresa.com" required value={values.email} error={errors.email} onChange={(value) => update("email", value)} autoComplete="email" />
        <Field id="phone" type="tel" label="Teléfono" optional placeholder="+34 600 000 000" value={values.phone} error={errors.phone} onChange={(value) => update("phone", value)} autoComplete="tel" />
        <Field id="company" label="Empresa o proyecto" placeholder="Nombre de la empresa o proyecto" required value={values.company} error={errors.company} onChange={(value) => update("company", value)} autoComplete="organization" />
      </div>

      <div className={`contact-field is-message ${errors.message ? "has-error" : ""}`}>
        <div className="contact-field-label">
          <label htmlFor="message">Cuéntanos el contexto <span>*</span></label>
        </div>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={2000}
          required
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          placeholder="Qué queréis mejorar, qué ocurre ahora o qué proyecto tenéis en mente."
        />
        <div className="contact-field-meta">
          <span id="message-hint">No incluyas información confidencial.</span>
          <span>{values.message.length.toString().padStart(2, "0")} / 2000</span>
        </div>
        {errors.message && <p id="message-error" className="contact-field-error">{errors.message}</p>}
      </div>

      <div className="contact-consent">
        <label>
          <input id="privacy" type="checkbox" checked={values.privacy} onChange={(event) => update("privacy", event.target.checked)} aria-invalid={Boolean(errors.privacy)} aria-describedby={errors.privacy ? "privacy-error" : undefined} />
          <span className="contact-consent-box" aria-hidden="true"><CheckCircle2 size={13} /></span>
          <span>He leído y acepto la <Link href="/privacidad">política de privacidad</Link>.</span>
        </label>
        {errors.privacy && <p id="privacy-error" className="contact-field-error">{errors.privacy}</p>}
      </div>

      <button type="submit" disabled={status === "submitting"} className="contact-submit">
        <span>{status === "submitting" ? "Enviando solicitud…" : "Solicitar primera sesión"}</span>
        <span aria-hidden="true">
          {status === "submitting" ? <LoaderCircle className="animate-spin" size={18} /> : <ArrowUpRight size={18} />}
        </span>
      </button>

      <div aria-live="polite" aria-atomic="true">
        {status === "success" && <Status type="success">Solicitud recibida. Revisaremos el contexto antes de responderte.</Status>}
        {status === "error" && (
          <Status type="error">
            {errorMessage || "No hemos podido enviarla."} Puedes escribirnos directamente a{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </Status>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  error,
  required,
  optional,
  placeholder,
  type = "text",
  autoComplete,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={`contact-field ${error ? "has-error" : ""}`}>
      <div className="contact-field-label">
        <label htmlFor={id}>
          {label} {required && <span>*</span>}
          {optional && <small>Opcional</small>}
        </label>
      </div>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        maxLength={type === "email" ? 254 : 120}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <p id={`${id}-error`} className="contact-field-error">{error}</p>}
    </div>
  );
}

function Status({ type, children }: { type: "success" | "error"; children: React.ReactNode }) {
  const Icon = type === "success" ? CheckCircle2 : AlertCircle;
  return (
    <p className={`contact-form-status is-${type}`}>
      <Icon size={18} className="mt-0.5 shrink-0" aria-hidden="true" /> {children}
    </p>
  );
}
