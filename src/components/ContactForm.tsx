import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { contactFormEndpoint } from "../config/contact";
import { buttonStyles } from "./ui/Button";

type ContactFormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  privacyAccepted: boolean;
};

type TextFieldName = Exclude<keyof ContactFormValues, "privacyAccepted">;
type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const initialValues: ContactFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  privacyAccepted: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s().-]{6,}$/;

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Introduce tu nombre.";
  } else if (values.name.trim().length > 80) {
    errors.name = "El nombre es demasiado largo.";
  }

  if (values.company.trim().length < 2) {
    errors.company = "Introduce el nombre de tu empresa.";
  } else if (values.company.trim().length > 120) {
    errors.company = "El nombre de la empresa es demasiado largo.";
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = "Introduce un email válido.";
  } else if (values.email.trim().length > 254) {
    errors.email = "El email es demasiado largo.";
  }

  if (values.phone.trim() && !phonePattern.test(values.phone.trim())) {
    errors.phone = "Introduce un teléfono válido o deja el campo vacío.";
  }

  if (values.message.trim().length < 20) {
    errors.message = "Cuéntanos un poco más sobre lo que necesitas.";
  } else if (values.message.trim().length > 2000) {
    errors.message = "El mensaje no puede superar los 2000 caracteres.";
  }

  if (!values.privacyAccepted) {
    errors.privacyAccepted = "Debes aceptar la política de privacidad.";
  }

  return errors;
}

type FieldProps = {
  id: TextFieldName;
  label: string;
  value: string;
  error?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  autoComplete?: string;
  onChange: (id: TextFieldName, value: string) => void;
};

function Field({
  id,
  label,
  value,
  error,
  type = "text",
  required,
  maxLength,
  autoComplete,
  onChange,
}: FieldProps) {
  return (
    <div className="group relative space-y-2 text-left">
      <label
        htmlFor={id}
        className={`block text-sm font-medium transition-colors duration-200 ${
          error ? "text-red-300" : "text-white/70 group-focus-within:text-brand-accent"
        }`}
      >
        {label}
        {required && <span aria-hidden="true" className="text-brand-accent"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(id, event.target.value)}
        className="min-h-12 w-full rounded-control border border-white/20 bg-white/[0.06] px-4 py-3 text-white outline-none transition-[background-color,border-color,box-shadow] duration-200 focus:border-brand-accent focus:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand-accent/40"
      />
      {error && (
        <p id={`${id}-error`} className="text-xs font-semibold text-red-300 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

type ContactFormProps = {
  onPrivacyClick: () => void;
};

export function ContactForm({ onPrivacyClick }: ContactFormProps) {
  const shouldReduceMotion = useReducedMotion();
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [hasValidated, setHasValidated] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  const updateValue = (id: TextFieldName, value: string) => {
    const nextValues = { ...values, [id]: value };
    setValues(nextValues);
    setStatus("idle");

    if (hasValidated) {
      setErrors(validate(nextValues));
    }
  };

  const updatePrivacy = (checked: boolean) => {
    const nextValues = { ...values, privacyAccepted: checked };
    setValues(nextValues);
    setStatus("idle");

    if (hasValidated) {
      setErrors(validate(nextValues));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setHasValidated(true);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const formData = new FormData();
      formData.append("name", values.name.trim());
      formData.append("company", values.company.trim());
      formData.append("email", values.email.trim());
      formData.append("phone", values.phone.trim() || "No indicado");
      formData.append("message", values.message.trim());
      formData.append("privacy_accepted", "Sí");
      formData.append("_subject", `Nueva solicitud de diagnóstico de ${values.name.trim()}`);
      formData.append("_gotcha", honeypot);

      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Formspree rejected the submission");
      }

      setValues(initialValues);
      setErrors({});
      setHasValidated(false);
      setHoneypot("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">No rellenes este campo</label>
        <input
          id="website"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="name" label="Nombre" value={values.name} error={errors.name} required maxLength={80} autoComplete="name" onChange={updateValue} />
        <Field id="company" label="Empresa" value={values.company} error={errors.company} required maxLength={120} autoComplete="organization" onChange={updateValue} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="email" label="Email" type="email" value={values.email} error={errors.email} required maxLength={254} autoComplete="email" onChange={updateValue} />
        <Field id="phone" label="Teléfono" type="tel" value={values.phone} error={errors.phone} maxLength={30} autoComplete="tel" onChange={updateValue} />
      </div>

      <div className="group relative space-y-2 text-left">
        <label
          htmlFor="message"
          className={`block text-sm font-medium transition-colors duration-200 ${
            errors.message ? "text-red-300" : "text-white/70 group-focus-within:text-brand-accent"
          }`}
        >
          ¿Qué proceso quieres optimizar o automatizar? <span aria-hidden="true" className="text-brand-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          required
          rows={4}
          maxLength={2000}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={(event) => updateValue("message", event.target.value)}
          className="w-full resize-y rounded-control border border-white/20 bg-white/[0.06] px-4 py-3 text-white outline-none transition-[background-color,border-color,box-shadow] duration-200 focus:border-brand-accent focus:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand-accent/40"
        />
        {errors.message && <p id="message-error" className="text-xs font-semibold text-red-300 mt-1">{errors.message}</p>}
      </div>

      <div className="text-left">
        <label className="flex items-start gap-3 text-sm text-white/80 cursor-pointer">
          <input
            id="privacyAccepted"
            type="checkbox"
            checked={values.privacyAccepted}
            aria-invalid={Boolean(errors.privacyAccepted)}
            aria-describedby={errors.privacyAccepted ? "privacy-error" : undefined}
            onChange={(event) => updatePrivacy(event.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-brand-accent"
          />
          <span>
            He leído y acepto la{" "}
            <button type="button" onClick={onPrivacyClick} className="cursor-pointer font-semibold text-white underline decoration-brand-accent underline-offset-4 transition-colors hover:text-brand-accent">
              política de privacidad
            </button>.
          </span>
        </label>
        {errors.privacyAccepted && <p id="privacy-error" className="mt-1 text-xs font-semibold text-red-300">{errors.privacyAccepted}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={buttonStyles({ variant: "inverse", size: "lg", className: "w-full disabled:cursor-wait" })}
      >
        {isSubmitting ? <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
        {isSubmitting ? "Enviando..." : "Enviar consulta"}
      </button>

      <p className="text-center text-sm leading-relaxed text-white/55">
        Te responderemos con una primera orientación clara y realista.
      </p>

      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
        {status === "success" && (
          <motion.p
            key="success"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
            className="flex items-start gap-2 rounded-control border border-emerald-300/30 bg-emerald-400/10 px-4 py-3 text-left text-sm font-medium text-emerald-100"
          >
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            Solicitud recibida. Nos pondremos en contacto contigo para preparar el diagnóstico.
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            key="error"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
            className="flex items-start gap-2 rounded-control border border-red-300/30 bg-red-400/10 px-4 py-3 text-left text-sm font-medium text-red-100"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            No hemos podido enviar la solicitud. Inténtalo de nuevo en unos minutos.
          </motion.p>
        )}
        </AnimatePresence>
      </div>
    </form>
  );
}
