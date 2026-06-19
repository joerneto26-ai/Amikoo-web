import { motion } from 'motion/react';
import { Star, ArrowUpRight } from 'lucide-react';
import { NumberTicker } from './NumberTicker';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Amikoo+Veterinaria+C.+Adri%C3%A1n+Puga+2990+San+Rafael+Guadalajara+Jal';

export default function GoogleReviewsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto mt-3 sm:mt-5 mb-16 sm:mb-20 lg:mb-24 max-w-5xl px-6 sm:px-0"
    >
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 lg:gap-10 rounded-3xl bg-white border border-[#DCFAE6] px-6 py-7 sm:py-9 lg:py-10 sm:px-10 lg:px-12 shadow-[0_18px_50px_rgba(34,197,94,0.18)] hover:shadow-[0_24px_60px_rgba(34,197,94,0.25)] hover:border-[#22C55E]/40 transition-all"
        aria-label="Ver 154 reseñas con calificación 4.8 en Google Maps"
      >
        {/* Google G Logo (4 colores brand oficiales) */}
        <svg
          viewBox="0 0 48 48"
          className="h-14 w-14 sm:h-16 sm:w-16 shrink-0"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
          />
          <path
            fill="#34A853"
            d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
          />
          <path
            fill="#FBBC05"
            d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
          />
          <path
            fill="#EA4335"
            d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
          />
        </svg>

        {/* Rating block: 5 stars + 4.8 */}
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5" aria-hidden="true">
            {[...Array(4)].map((_, i) => (
              <Star
                key={i}
                className="h-7 w-7 sm:h-8 sm:w-9 text-amber-500 fill-amber-500"
              />
            ))}
            <Star
              className="h-7 w-7 sm:h-8 sm:w-9 text-amber-500 fill-amber-500/80"
            />
          </div>
          <span className="font-heading-custom text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18312B] leading-none tabular-nums">
            4.8
          </span>
        </div>

        {/* Vertical divider (solo desktop/tablet) */}
        <div className="hidden sm:block h-12 w-px bg-[#DCFAE6]" />

        {/* Review count con NumberTicker */}
        <div className="flex items-baseline gap-2 flex-wrap justify-center">
          <span className="font-heading-custom text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#22C55E] leading-none">
            <NumberTicker value={154} delay={0.2} />
          </span>
          <span className="text-sm sm:text-base text-[#60756E] font-medium">
            reseñas verificadas en Google
          </span>
        </div>

        {/* CTA link */}
        <span className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#16A34A] group-hover:text-[#22C55E] group-hover:gap-2.5 transition-all">
          Ver en Google Maps
          <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </span>
      </a>
    </motion.div>
  );
}
