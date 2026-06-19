import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import NumberFlow from '@number-flow/react';
import confetti from 'canvas-confetti';
import { Check, Star, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../data/veterinaryData';

interface Plan {
  name: string;
  price: number;
  packagePrice: number;
  features: string[];
  description: string;
  isPopular: boolean;
  tag?: string;
}

const PLANS: Plan[] = [
  {
    name: 'BÁSICO',
    price: 180,
    packagePrice: 150,
    description: 'Para revisiones rápidas y seguimiento preventivo de rutina.',
    isPopular: false,
    features: [
      'Consulta general y valoración',
      'Medición de constantes vitales',
      'Orientación básica en casa',
      'Foto del estado de salud',
      'Contacto post-visita por WhatsApp',
    ],
  },
  {
    name: 'PREVENTIVO',
    price: 350,
    packagePrice: 290,
    description: 'El paquete más completo para mantener a tu mascota al día.',
    isPopular: true,
    tag: 'Popular',
    features: [
      'Todo lo del plan Básico',
      'Vacunación incluida (dosis única)',
      'Desparasitación interna y externa',
      'Informe detallado de salud',
      'Seguimiento por 3 días vía WhatsApp',
      'Descuento en próxima visita',
    ],
  },
  {
    name: 'BIENESTAR',
    price: 520,
    packagePrice: 430,
    description: 'Cuidado integral para quienes quieren lo mejor para su mascota.',
    isPopular: false,
    features: [
      'Todo lo del plan Preventivo',
      'Corte de uñas seguro',
      'Limpieza higiénica de oídos',
      'Orientación nutricional personalizada',
      'Seguimiento completo por 7 días',
    ],
  },
];

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

export default function ServiciosPricing() {
  const [isPerVisit, setIsPerVisit] = useState(true);
  const switchRef = useRef<HTMLButtonElement>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleToggle = () => {
    const next = !isPerVisit;
    setIsPerVisit(next);
    if (!next && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ['#22C55E', '#16A34A', '#DCFAE6', '#B7F0D2', '#18312B'],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 28,
        shapes: ['circle'],
      });
    }
  };

  return (
    <section className="relative py-24 px-6 sm:px-8 bg-white" id="planes" aria-labelledby="h-planes">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#22C55E] font-bold text-xs uppercase tracking-widest mb-4 block">
            Servicios Más Solicitados
          </span>
          <h2 id="h-planes" className="font-heading-custom text-[clamp(1.85rem,4vw,3.2rem)] leading-[1.02] text-[#18312B] font-extrabold tracking-tight mb-6">
            ¿Qué <span className="italic text-[#22C55E]">necesita</span> tu mascota hoy?
          </h2>
          <p className="text-[#60756E] text-base leading-relaxed">
            Elige el servicio que mejor se adapta. Todos incluyen atención a domicilio, trato amable y seguimiento por WhatsApp.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <span className={`text-sm font-semibold transition-colors ${isPerVisit ? 'text-[#18312B]' : 'text-[#60756E]'}`}>
            Por visita
          </span>
          <button
            ref={switchRef}
            onClick={handleToggle}
            role="switch"
            aria-checked={!isPerVisit}
            aria-label="Cambiar entre precio por visita o paquete x5"
            className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-[#22C55E]/40 ${
              !isPerVisit ? 'bg-[#22C55E]' : 'bg-[#18312B]/15'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-300 mt-0.5 ${
                !isPerVisit ? 'translate-x-7' : 'translate-x-0.5'
              }`}
            />
          </button>
          <span className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${!isPerVisit ? 'text-[#18312B]' : 'text-[#60756E]'}`}>
            Paquete x5
            <span className="text-[11px] font-bold bg-[#DCFAE6] text-[#16A34A] px-2 py-0.5 rounded-full">
              Ahorra 15%
            </span>
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ y: 40, opacity: 0 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -16 : 0,
                      opacity: 1,
                      scale: plan.isPopular ? 1.04 : 0.96,
                    }
                  : { y: 0, opacity: 1 }
              }
              viewport={{ once: true }}
              transition={{
                duration: 1.4,
                type: 'spring',
                stiffness: 90,
                damping: 25,
                delay: index * 0.1,
              }}
              className={`relative rounded-3xl border-2 p-7 flex flex-col ${
                plan.isPopular
                  ? 'border-[#22C55E] bg-white shadow-[0_20px_60px_rgba(34,197,94,0.18)]'
                  : 'border-[#DCFAE6] bg-[#F4FBF7]'
              }`}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute -top-px right-6 bg-[#22C55E] px-3 py-1 rounded-b-xl flex items-center gap-1 shadow-sm">
                  <Star className="h-3.5 w-3.5 text-white fill-white" aria-hidden="true" />
                  <span className="text-white text-[11px] font-bold tracking-wide">Popular</span>
                </div>
              )}

              {/* Plan name */}
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#60756E] mb-5">
                {plan.name}
              </p>

              {/* Price */}
              <div className="flex items-end gap-2 mb-1" data-visit={plan.price} data-pack={plan.packagePrice} data-period-visit="por consulta" data-period-pack="por consulta · paquete de 5">
                <span className="text-[#18312B] text-5xl font-extrabold tracking-tight font-heading-custom leading-none">
                  $<NumberFlow
                    value={isPerVisit ? plan.price : plan.packagePrice}
                    format={{ minimumFractionDigits: 0, maximumFractionDigits: 0 }}
                    transformTiming={{ duration: 500, easing: 'ease-out' }}
                    willChange
                  />
                </span>
                <span className="text-[#60756E] text-sm font-semibold mb-1">MXN</span>
              </div>
              <p className="text-xs text-[#60756E] mb-6">
                {isPerVisit ? 'por visita a domicilio' : 'por visita · paquete de 5'}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check
                      className={`h-4 w-4 mt-0.5 shrink-0 ${plan.isPopular ? 'text-[#22C55E]' : 'text-[#22C55E]/70'}`}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-[#18312B]/80 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="border-t border-[#DCFAE6] mb-6" />

              {/* CTA */}
              <a
                href={getWhatsAppUrl(`Hola Amikoo, me interesa el plan ${plan.name} (${isPerVisit ? 'por visita' : 'paquete x5'}) para mi mascota.`)}
                target="_blank"
                referrerPolicy="no-referrer"
                className={`inline-flex items-center justify-center gap-2 w-full rounded-full py-3.5 px-6 text-sm font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#22C55E]/40 ${
                  plan.isPopular
                    ? 'bg-[#22C55E] text-white shadow-[0_10px_30px_rgba(34,197,94,0.35)] hover:bg-[#16A34A] hover:shadow-[0_14px_36px_rgba(34,197,94,0.45)]'
                    : 'bg-[#DCFAE6] text-[#16A34A] border border-[#22C55E]/15 hover:bg-[#B7F0D2]'
                }`}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Agendar por WhatsApp
              </a>

              {/* Description */}
              <p className="mt-4 text-xs text-[#60756E] text-center leading-relaxed">
                {plan.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-[#60756E]/70 mt-10">
          Precios orientativos. Algunos servicios pueden variar según la ubicación y necesidades específicas de tu mascota.
        </p>

      </div>
    </section>
  );
}
