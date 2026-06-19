import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import img1 from '../assets/marquee/img1.jpeg';
import img2 from '../assets/marquee/img2.jpeg';
import img3 from '../assets/marquee/img3.jpeg';
import img4 from '../assets/marquee/img4.jpeg';
import img5 from '../assets/marquee/img5.jpeg';
import { getWhatsAppUrl } from '../data/veterinaryData';

const IMAGES = [img1, img2, img3, img4, img5];
const DUPLICATED = [...IMAGES, ...IMAGES, ...IMAGES];

const FADE_IN = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

const TITLE_CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const TITLE_WORDS: { text: string; italic?: boolean; accent?: boolean }[] = [
  { text: 'Cuidado' },
  { text: 'profesional', italic: true, accent: true },
  { text: 'y' },
  { text: 'cercano' },
  { text: 'para' },
  { text: 'tu' },
  { text: 'mascota', italic: true },
];

export default function AnimatedMarqueeHero() {
  return (
    <section
      className="relative w-full min-h-[100svh] overflow-hidden bg-white flex flex-col"
      aria-label="Inicio"
    >
      {/* Soft pastel radial glow + decorative gradient line */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% 28%, rgba(52,211,153,0.18) 0%, rgba(220,250,230,0.4) 35%, transparent 70%)',
        }}
      />

      {/* Decorative thin green curve top-left */}
      <svg
        className="absolute -left-12 top-32 w-48 h-96 opacity-50 pointer-events-none z-0"
        viewBox="0 0 200 400"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M -20 50 C 60 120, 100 200, 40 320 S 80 380, 60 420"
          stroke="#B7F0D2"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 0 80 C 80 150, 120 230, 60 350"
          stroke="#DCFAE6"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <svg
        className="absolute -right-12 top-40 w-44 h-80 opacity-40 pointer-events-none z-0 hidden md:block"
        viewBox="0 0 200 400"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M 220 60 C 140 140, 100 220, 160 340 S 120 400, 140 440"
          stroke="#B7F0D2"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* TEXT BLOCK (upper ~62% of section) */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6 pt-28 pb-10">
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto w-full">

          {/* Tagline pill — verde pastel con texto oscuro */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={FADE_IN}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-[#DCFAE6] border border-[#22C55E]/20 px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0F4D2E] shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
            </span>
            Técnica Veterinaria Independiente · CDMX
          </motion.div>

          {/* H1 word-by-word con italic para énfasis */}
          <motion.h1
            initial="hidden"
            animate="show"
            variants={TITLE_CONTAINER}
            className="font-heading-custom text-[clamp(2.6rem,7vw,5.2rem)] leading-[1.02] tracking-tight text-[#18312B] font-extrabold mb-7 max-w-3xl"
          >
            {TITLE_WORDS.map((word, i) => (
              <motion.span
                key={i}
                variants={FADE_IN}
                className={`inline-block mr-[0.22em] ${
                  word.accent
                    ? 'italic text-[#22C55E]'
                    : word.italic
                      ? 'italic text-[#18312B]'
                      : 'text-[#18312B]'
                }`}
              >
                {word.text}
              </motion.span>
            ))}
          </motion.h1>

          {/* Description — backdrop sólido + blur para que NO la tape el marquee */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={FADE_IN}
            transition={{ delay: 0.55 }}
            className="relative z-20 mb-9 max-w-xl"
          >
            <p className="text-[#18312B]/85 text-base sm:text-lg leading-relaxed font-medium bg-white/85 backdrop-blur-md rounded-2xl px-6 py-4 border border-[#22C55E]/10 shadow-sm">
              Atención cercana, responsable y sin estrés. Te ayudo con
              <span className="font-semibold text-[#16A34A]"> prevención</span>,
              vacunación y cuidados básicos directamente en la comodidad de tu
              hogar.
            </p>
          </motion.div>

          {/* CTAs (principal + secundario outline) */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={FADE_IN}
            transition={{ delay: 0.7 }}
            className="relative z-20 flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
          >
            <motion.a
              href={getWhatsAppUrl('Hola Amikoo, me gustaría agendar una cita para mi mascota.')}
              target="_blank"
              referrerPolicy="no-referrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#22C55E] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_10px_30px_rgba(34,197,94,0.35)] hover:bg-[#16A34A] hover:shadow-[0_14px_36px_rgba(34,197,94,0.45)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#22C55E]/40"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Agendar por WhatsApp
            </motion.a>

            <motion.a
              href="#servicios"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('servicios');
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: 'smooth' });
                }
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-[#18312B]/12 px-7 py-3.5 text-sm font-bold text-[#18312B] hover:bg-white hover:border-[#22C55E]/40 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#22C55E]/20"
            >
              <span>Ver servicios</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* MARQUEE BAND (bottom ~30%) */}
      <div
        className="relative w-full h-[28%] sm:h-[32%] pointer-events-none z-10"
        aria-hidden="true"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
        }}
      >
        {/* White fade overlay on top of marquee to soften overlap with text */}
        <div
          className="absolute inset-x-0 top-0 h-24 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
          }}
        />
        <motion.div
          className="flex gap-5 h-full items-end pb-2"
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{
            ease: 'linear',
            duration: 35,
            repeat: Infinity,
          }}
          style={{ width: 'max-content' }}
        >
          {DUPLICATED.map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0"
              style={{
                width: 'clamp(140px, 16vw, 220px)',
                height: 'clamp(180px, 20vw, 280px)',
                rotate: `${i % 2 === 0 ? '-3deg' : '4deg'}`,
              }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
