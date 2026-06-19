import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, MapPin, Clock, MessageCircle, AlertCircle } from 'lucide-react';
import { VET_DATA, getWhatsAppUrl } from '../data/veterinaryData';

type FieldName = 'name' | 'email' | 'species' | 'message';
type FormState = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const SPECIES_OPTIONS = ['Perro', 'Gato', 'Conejo', 'Hamster', 'Ave', 'Otro'];

const EASE = [0.22, 1, 0.36, 1] as const;

const COOLDOWN_MS = 60_000;
const COOLDOWN_KEY = 'cv_sess_t';
const MAX_NAME = 80;
const MAX_EMAIL = 120;
const MAX_MESSAGE = 500;

export default function ContactoSection() {
  const [values, setValues] = useState<FormState>({
    name: '',
    email: '',
    species: '',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [mapPressed, setMapPressed] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [honeypot, setHoneypot] = useState('');
  const submittingRef = useRef(false);
  const firstErrorRef = useRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>(null);

  // cv_sess_t
  useEffect(() => {
    const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
    const left = Math.max(0, COOLDOWN_MS - (Date.now() - last));
    if (left > 0) setCooldownLeft(left);
  }, []);

  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const t = setInterval(() => {
      setCooldownLeft((v) => {
        const nv = Math.max(0, v - 1000);
        if (nv === 0) clearInterval(t);
        return nv;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [cooldownLeft]);

  const handleMapPress = () => {
    setMapPressed(true);
    setTimeout(() => setMapPressed(false), 600);
  };

  const validateField = (name: FieldName, value: string): string | undefined => {
    if (name === 'name') {
      const trimmed = value.trim();
      if (trimmed.length < 2) return 'Ingresa tu nombre completo';
      // Exige al menos 2 letras reales (evita números/símbolos puros)
      const letters = (trimmed.match(/[a-zA-ZáéíóúñÑ]/g) || []).length;
      if (letters < 2) return 'Ingresa un nombre válido';
      if (trimmed.length > MAX_NAME) return `Máximo ${MAX_NAME} caracteres`;
    }
    if (name === 'email') {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(value.trim())) return 'Ingresa un correo válido';
      if (value.trim().length > MAX_EMAIL) return `Máximo ${MAX_EMAIL} caracteres`;
    }
    if (name === 'species' && !value) return 'Selecciona la especie de tu mascota';
    if (name === 'message' && value.length > MAX_MESSAGE) return `Máximo ${MAX_MESSAGE} caracteres`;
    return undefined;
  };

  const handleChange = (name: FieldName, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((e) => ({ ...e, [name]: err }));
    }
  };

  const handleBlur = (name: FieldName) => {
    setTouched((t) => ({ ...t, [name]: true }));
    const err = validateField(name, values[name]);
    setErrors((e) => ({ ...e, [name]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot.trim() !== '') return;

    if (submittingRef.current) return;

    if (cooldownLeft > 0) return;

    const newErrors: Errors = {};
    (['name', 'email', 'species', 'message'] as FieldName[]).forEach((f) => {
      const err = validateField(f, values[f]);
      if (err) newErrors[f] = err;
    });
    setErrors(newErrors);
    setTouched({ name: true, email: true, species: true, message: true });

    if (Object.keys(newErrors).length > 0) {
      const firstField = (['name', 'email', 'species'] as FieldName[]).find((f) => newErrors[f]);
      if (firstField) {
        const el = document.querySelector<HTMLElement>(`[name="${firstField}"]`);
        el?.focus();
      }
      return;
    }

    submittingRef.current = true;
    setStatus('loading');

    const cleanMsg = values.message
      .trim()
      .slice(0, MAX_MESSAGE)
      .replace(/\n{3,}/g, '\n\n');

    setTimeout(() => {
      setStatus('success');
      localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
      setCooldownLeft(COOLDOWN_MS);
      setTimeout(() => {
        const msg = `Hola Amikoo, soy ${values.name.trim()}. Quiero agendar cita para mi ${values.species.toLowerCase()}.${cleanMsg ? ` ${cleanMsg}` : ''} (${values.email.trim()})`;
        window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
        setStatus('idle');
        setValues({ name: '', email: '', species: '', message: '' });
        setTouched({});
        setErrors({});
        submittingRef.current = false;
      }, 1800);
    }, 1200);
  };

  return (
    <section
      className="relative py-16 px-6 sm:px-8 bg-white"
      id="contacto"
      aria-labelledby="h-contacto"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#2FBF8F] font-bold text-xs uppercase tracking-widest mb-3 block">
            Agenda tu visita
          </span>
          <h2
            id="h-contacto"
            className="font-heading-custom text-[clamp(1.85rem,4vw,3.2rem)] leading-[0.95] text-[#18312B] font-black tracking-tighter mb-4"
          >
            ¿Quieres cuidar mejor la salud de tu mascota?
          </h2>
          <p className="text-[#60756E] text-base sm:text-lg leading-relaxed">
            Completa el formulario y me pondré en contacto contigo por WhatsApp para coordinar el horario y servicio ideal.
          </p>
        </div>

        {/* Grid: Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">

          {/* LEFT: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative rounded-3xl border border-[#18312B]/8 bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(24,49,43,0.04)]"
          >
            <form onSubmit={handleSubmit} noValidate aria-label="Formulario para agendar cita veterinaria">
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
                <input
                  type="text"
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
              <div className="space-y-5">
                {/* Name */}
                <Field
                  label="Tu nombre"
                  required
                  error={touched.name ? errors.name : undefined}
                  input={
                    <input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder="Ej. María González"
                      autoComplete="name"
                      maxLength={MAX_NAME}
                      aria-required="true"
                      aria-invalid={!!(touched.name && errors.name)}
                      aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                      className={inputClass(!!(touched.name && errors.name))}
                      ref={firstErrorRef}
                    />
                  }
                />

                {/* Email */}
                <Field
                  label="Correo electrónico"
                  required
                  error={touched.email ? errors.email : undefined}
                  input={
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="tu@correo.com"
                      autoComplete="email"
                      maxLength={MAX_EMAIL}
                      aria-required="true"
                      aria-invalid={!!(touched.email && errors.email)}
                      aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                      className={inputClass(!!(touched.email && errors.email))}
                    />
                  }
                />

                {/* Species */}
                <Field
                  label="Especie de tu mascota"
                  required
                  error={touched.species ? errors.species : undefined}
                  input={
                    <select
                      name="species"
                      value={values.species}
                      onChange={(e) => handleChange('species', e.target.value)}
                      onBlur={() => handleBlur('species')}
                      aria-required="true"
                      aria-invalid={!!(touched.species && errors.species)}
                      aria-describedby={touched.species && errors.species ? 'species-error' : undefined}
                      className={inputClass(!!(touched.species && errors.species)) + ' cursor-pointer'}
                    >
                      <option value="" disabled>Selecciona una opción</option>
                      {SPECIES_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  }
                />

                {/* Message */}
                <Field
                  label="Mensaje"
                  hint="Opcional · Cuéntame qué le ocurre a tu mascota o qué servicio necesitas"
                  input={
                    <textarea
                      name="message"
                      value={values.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Describe brevemente la situación..."
                      rows={4}
                      maxLength={MAX_MESSAGE}
                      className={inputClass(false) + ' resize-y min-h-[100px]'}
                    />
                  }
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading' || cooldownLeft > 0}
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-[#2FBF8F] py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#2FBF8F]/25 hover:bg-[#159A74] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#2FBF8F]/60 disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {cooldownLeft > 0 && status === 'idle' && (
                    <>
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      Espera {Math.ceil(cooldownLeft / 1000)}s...
                    </>
                  )}
                  {status === 'idle' && cooldownLeft === 0 && (
                    <>
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Agendar cita
                    </>
                  )}
                  {status === 'loading' && (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Enviando...
                    </>
                  )}
                  {status === 'success' && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" aria-hidden="true" />
                      ¡Listo! Abriendo WhatsApp...
                    </motion.span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* RIGHT: Map + Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Map card */}
            <motion.div
              onPointerDown={handleMapPress}
              animate={
                mapPressed
                  ? {
                      scale: 0.985,
                      boxShadow: '0 0 0 4px rgba(47,191,143,0.35), 0 4px 24px rgba(47,191,143,0.15)',
                    }
                  : {
                      scale: 1,
                      boxShadow: '0 4px 24px rgba(24,49,43,0.04)',
                    }
              }
              transition={{ duration: 0.25, ease: EASE }}
              className="relative rounded-3xl overflow-hidden border border-[#18312B]/8 bg-white h-[360px] lg:h-[420px] cursor-pointer"
            >
              <iframe
                src={VET_DATA.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Ubicación de ${VET_DATA.name} - ${VET_DATA.address}`}
              />
            </motion.div>

            {/* Info list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <InfoItem
                icon={<MapPin className="h-4 w-4" />}
                label="Ubicación"
                value={VET_DATA.address}
                onPress={handleMapPress}
              />
              <InfoItem
                icon={<Clock className="h-4 w-4" />}
                label="Horario"
                value={VET_DATA.schedule}
                onPress={handleMapPress}
              />
              <InfoItem
                icon={<MessageCircle className="h-4 w-4" />}
                label="WhatsApp"
                value="Respuesta rápida"
                href={getWhatsAppUrl()}
                onPress={handleMapPress}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-2xl border bg-white px-4 py-3 text-sm text-[#18312B] placeholder:text-[#60756E]/50 transition-all duration-200 focus:outline-none focus:ring-4 ${
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15'
      : 'border-[#18312B]/10 focus:border-[#2FBF8F] focus:ring-[#2FBF8F]/15'
  }`;
}

function Field({
  label,
  hint,
  required,
  error,
  input,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  input: React.ReactNode;
}) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-[#18312B]">
        {label}
        {required && <span className="text-[#2FBF8F] ml-1" aria-hidden="true">*</span>}
      </label>
      <div className="peer">
        {/* Inject id into child input/select/textarea via clone-less approach */}
        <FieldChild id={id}>{input}</FieldChild>
      </div>
      {error ? (
        <span id={`${id}-error`} className="text-xs text-red-500 font-medium flex items-center gap-1" role="alert">
          <AlertCircle className="h-3 w-3" aria-hidden="true" />
          {error}
        </span>
      ) : hint ? (
        <span className="text-xs text-[#60756E]">{hint}</span>
      ) : null}
    </div>
  );
}

function FieldChild({ id, children }: { id: string; children: React.ReactNode }) {
  // Pass id through to the single child input/select/textarea
  if (React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ id?: string }>, { id });
  }
  return <>{children}</>;
}

function InfoItem({
  icon,
  label,
  value,
  href,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  onPress?: () => void;
}) {
  const content = (
    <div className="flex items-start gap-3 rounded-2xl border border-[#18312B]/8 bg-white p-4 hover:border-[#2FBF8F]/40 transition-colors h-full">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2FBF8F]/12 text-[#2FBF8F] shrink-0">
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#60756E]">{label}</span>
        <span className="text-xs sm:text-sm font-semibold text-[#18312B] leading-snug truncate">{value}</span>
      </div>
    </div>
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerDown={onPress}
        className="block h-full focus:outline-none focus:ring-2 focus:ring-[#2FBF8F] rounded-2xl"
      >
        {content}
      </a>
    );
  }
  return (
    <div onPointerDown={onPress} className="h-full cursor-pointer">
      {content}
    </div>
  );
}
