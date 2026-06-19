import React from 'react';
import { motion } from 'motion/react';
import { Shield, BadgeCheck, Star, CheckCircle2, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../data/veterinaryData';

const COLONIAS_FILA_1 = [
  'San Rafael',
  'Analco',
  'Mexicaltzingo',
  'Americana',
  'Lafayette',
  'Moderna',
  'Centro',
];

const COLONIAS_FILA_2 = [
  'Oblatos',
  'Tlaquepaque',
  'Zapopan Centro',
  'Colli Urbano',
  'Huentitán',
  'Miravalle',
  'Ladrón de Guevara',
];

const TRUST_BADGES = [
  {
    icon: Shield,
    label: 'Cobertura verificada',
    subtitle: 'Cada visita confirmada',
  },
  {
    icon: BadgeCheck,
    label: 'Técnica certificada',
    subtitle: 'Atención profesional',
  },
  {
    icon: Star,
    label: '4.9 estrellas',
    subtitle: 'Familias atendidas',
  },
  {
    icon: CheckCircle2,
    label: 'Antecedentes revisados',
    subtitle: 'Confianza y seguridad',
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 22 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  }),
};

function ColoniaPill({ name }: { name: string }) {
  return (
    <motion.span
      variants={pillVariants}
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      className="inline-flex items-center rounded-full border border-[#18312B]/10 bg-white px-5 py-2.5 text-sm font-semibold text-[#18312B]/80 hover:border-[#2FBF8F]/40 hover:bg-[#2FBF8F]/5 hover:text-[#18312B] transition-colors cursor-default"
      aria-label={`Atendemos en ${name}`}
    >
      {name}
    </motion.span>
  );
}

export default function ColoniasSection() {
  return (
    <section
      className="relative py-16 px-6 sm:px-8 bg-[#FAFAFA]"
      id="colonias"
      aria-labelledby="h-colonias"
    >
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="text-[#2FBF8F] font-bold text-xs uppercase tracking-widest mb-3 block">
            Estamos en tu colonia
          </span>
          <h2
            id="h-colonias"
            className="font-heading-custom text-[clamp(1.85rem,4vw,3.2rem)] leading-[0.95] text-[#18312B] font-black tracking-tighter mb-4"
          >
            Atendemos en tu colonia
          </h2>
          <p className="text-[#60756E] text-base sm:text-lg leading-relaxed">
            Si vives en estas zonas de CDMX, una visita para tu mascota está a solo un mensaje de distancia. Tu mascota recibe atención profesional con un trato cercano y responsable.
          </p>
        </motion.div>

        {/* Pills de colonias */}
        <motion.div
          className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {COLONIAS_FILA_1.map((name) => (
            <ColoniaPill key={name} name={name} />
          ))}
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {COLONIAS_FILA_2.map((name) => (
            <ColoniaPill key={name} name={name} />
          ))}
        </motion.div>

        {/* CTA secundario opcional */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
        >
          <p className="text-sm text-[#60756E]">
            ¿No ves tu colonia?{' '}
            <a
              href={getWhatsAppUrl('Hola Amikoo, me gustaría confirmar si atienden en mi colonia.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#2FBF8F] hover:text-[#159A74] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2FBF8F] rounded"
            >
              Escríbenos por WhatsApp
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 border-t border-[#18312B]/8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {TRUST_BADGES.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                custom={i}
                variants={badgeVariants}
                className="flex items-center gap-3 p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2FBF8F]/12 text-[#2FBF8F] shrink-0">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#18312B]">
                    {badge.label}
                  </span>
                  <span className="text-xs text-[#60756E] leading-snug">
                    {badge.subtitle}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
