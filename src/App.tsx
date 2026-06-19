import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  VET_DATA,
  SERVICES,
  TESTIMONIALS,
  TRUST_CARDS,
  getWhatsAppUrl
} from './data/veterinaryData';
import LucideIcon from './components/LucideIcon';
import MorphingNavbar from './components/MorphingNavbar';
import AnimatedMarqueeHero from './components/AnimatedMarqueeHero';
import ServiciosPricing from './components/ServiciosPricing';
import ContactoSection from './components/ContactoSection';
import ColoniasSection from './components/ColoniasSection';
import GoogleReviewsWidget from './components/GoogleReviewsWidget';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  // Filter categories for the services tab
  const categories = ['Todos', 'Básico', 'Prevención', 'Cuidados', 'Higiene', 'Bienestar'];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const filteredServices = activeCategory === 'Todos'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  // Custom animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        type: "spring",
        stiffness: 120,
        damping: 18,
        mass: 0.8,
      },
    }),
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04
      }
    }
  };

  return (
    <div id="inicio" className="min-h-screen bg-white text-[#18312B] overflow-x-hidden font-body-custom selection:bg-[#22C55E]/20 selection:text-[#18312B]">

      {/* ------------------ MORPHING NAVBAR ------------------ */}
      <MorphingNavbar />

      <main id="main-content" role="main">

      {/* ------------------ 1. HERO: Animated Marquee ------------------ */}
      <AnimatedMarqueeHero />

      {/* ------------------ 2. SECCIÓN DE CONFIANZA ------------------ */}
      <section className="relative py-16 px-6 sm:px-8 bg-white" id="confianza" aria-labelledby="h-confianza">
        <div className="mx-auto max-w-7xl">

          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#22C55E] font-bold text-xs uppercase tracking-widest mb-4 block">
              Atención Sincera y Directa
            </span>
            <h2 id="h-confianza" className="font-heading-custom text-[clamp(1.85rem,4vw,3.2rem)] leading-[1.02] text-[#18312B] font-extrabold tracking-tight">
              Tu mascota merece <span className="italic text-[#22C55E]">atención con paciencia</span> y un cuidado real
            </h2>
            <p className="text-[#60756E] text-md sm:text-lg leading-relaxed mt-6">
              Sé que cuando una mascota se siente mal, también se preocupa toda la familia. Por eso mi atención se basa en revisar con calma, explicar de forma clara sin tecnicismos complejos y ayudarte a cuidar mejor su salud en casa.
            </p>
          </div>

          {/* Cards Grid with premium multi-theme bento styles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRUST_CARDS.map((card, idx) => {
              const isDark = idx === 2;
              const cardBg = isDark
                ? "bg-[#18312B] text-white border-transparent"
                : "bg-white border border-[#DCFAE6]";

              return (
                <motion.div
                  key={card.title}
                  className={`relative rounded-3xl p-8 shadow-xs hover:shadow-[0_18px_40px_rgba(34,197,94,0.12)] hover:border-[#22C55E]/30 transition-all flex flex-col justify-between group overflow-hidden ${cardBg}`}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  whileHover={{ y: -4 }}
                >
                  <div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-xs mb-6 ${
                      isDark ? 'bg-white/10 text-[#22C55E]' : 'bg-[#DCFAE6] text-[#16A34A]'
                    }`}>
                      <LucideIcon name={card.icon} className="h-5 w-5" />
                    </div>
                    <h3 className={`font-heading-custom text-xl font-bold mb-3 ${
                      isDark ? 'text-white' : 'text-[#18312B]'
                    }`}>
                      {card.title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-4 font-medium ${
                      isDark ? 'text-white/70' : 'text-[#60756E]'
                    }`}>
                      {card.description}
                    </p>
                  </div>

                  <div className={`mt-4 pt-4 border-t flex items-center text-xs font-bold gap-1 group cursor-pointer ${
                    isDark ? 'border-white/10 text-[#22C55E] hover:text-white' : 'border-[#DCFAE6] text-[#16A34A] hover:text-[#22C55E]'
                  }`}>
                    <span>Saber más sobre mi método</span>
                    <LucideIcon name="ChevronRight" className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ------------------ 3. PRICING - 3 SERVICIOS POPULARES ------------------ */}
      <ServiciosPricing />

      {/* ------------------ 4. SERVICIOS CATEGORIZADOS Y DINÁMICOS ------------------ */}
      <section className="relative py-16 px-6 sm:px-8 bg-[#F4FBF7]" id="servicios" aria-labelledby="h-servicios">
        <div className="mx-auto max-w-7xl">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#22C55E] font-bold text-xs uppercase tracking-widest mb-4 block">
              Especialidades Preventivas
            </span>
            <h2 id="h-servicios" className="font-heading-custom text-[clamp(1.85rem,4vw,3.2rem)] leading-[1.02] text-[#18312B] font-extrabold tracking-tight">
              Servicios <span className="italic text-[#22C55E]">veterinarios</span> a domicilio
            </h2>
            <p className="text-[#60756E] text-base leading-relaxed mt-6">
              Atención directa en tu hogar para evitar el estrés del traslado en tus mascotas. Ofrezco servicios de higiene, prevención y soporte básico con absoluta paciencia.
            </p>
          </div>

          {/* Categories Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 focus:outline-none ${
                  activeCategory === cat
                    ? 'bg-[#22C55E] text-white shadow-[0_8px_24px_rgba(34,197,94,0.3)]'
                    : 'bg-white border border-[#18312B]/10 text-[#60756E] hover:bg-white hover:text-[#18312B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid de Servicios con Framer Motion layout */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            role="region"
            aria-live="polite"
            aria-label={`Servicios de categoría: ${activeCategory}`}
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <motion.div
                  layout
                  key={service.id}
                  className="flex flex-col justify-between bg-white/80 rounded-3xl p-6 sm:p-7 border border-[#18312B]/5 shadow-xs hover:shadow-md transition-shadow h-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <div>
                    {/* Header: Icon & Category Tag */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DCFAE6] text-[#16A34A]">
                        <LucideIcon name={service.iconName} className="h-5 w-5" />
                      </div>
                      <span className="text-[12px] uppercase tracking-wider font-extrabold text-[#60756E]/80 bg-[#18312B]/5 px-2.5 py-1 rounded-md">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="font-heading-custom text-lg font-bold text-[#18312B] mb-2 flex items-center gap-2">
                      {service.title}
                      {service.popular && (
                        <span className="text-[12px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                          ★ Popular
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-[#60756E] leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <a
                    href={getWhatsAppUrl(`Hola Amikoo, me interesa el servicio de: ${service.title} para mi mascota.`)}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#16A34A] hover:text-[#22C55E] transition-colors mt-auto group"
                  >
                    <span>Preguntar por este servicio</span>
                    <LucideIcon name="MessageCircle" className="h-4 w-4 transform group-hover:scale-110 transition-transform" />
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>



      {/* ------------------ 7. TESTIMONIOS ------------------ */}
      <section className="relative py-24 bg-[#F4FBF7] overflow-hidden" id="testimonios" aria-labelledby="h-testimonios">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">

          <div className="text-center max-w-3xl mx-auto mb-6">
            <span className="text-[#22C55E] font-extrabold text-sm tracking-widest uppercase mb-3 block">
              Historias de Éxito
            </span>
            <h2 id="h-testimonios" className="font-heading-custom text-[clamp(1.85rem,4vw,3.2rem)] leading-[1.02] text-[#18312B] font-extrabold tracking-tight">
              Lo que dicen <span className="italic text-[#22C55E]">algunos dueños</span> de mascotas
            </h2>
            <p className="text-[#60756E] text-base leading-relaxed mt-3 max-w-2xl mx-auto">
              La mayor satisfacción es ver a los dueños tranquilos y a sus consentidos sanos y juguetones. Estos son testimonios reales de mi comunidad.
            </p>
          </div>

          {/* Widget de reseñas Google — ahora en zona del header */}
          <GoogleReviewsWidget />

          {/* Testimonios — Mobile/Tablet: carrusel snap. Desktop (lg+): grid 4 columnas */}
          <div
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="region"
            aria-label="Testimonios de clientes"
            tabIndex={0}
          >
            {TESTIMONIALS.slice(0, 4).map((testimonial, idx) => (
              <motion.article
                key={testimonial.id}
                className="flex-shrink-0 snap-start w-[min(85vw,340px)] sm:w-[320px] lg:w-auto lg:flex-shrink-1 h-[360px] sm:h-[380px] bg-[#18312B] rounded-3xl p-7 sm:p-8 flex flex-col text-white shadow-[0_18px_40px_rgba(24,49,43,0.25)] hover:shadow-[0_24px_50px_rgba(24,49,43,0.35)] transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.08, ease: 'easeOut' }}
              >
                <div
                  className="flex items-center gap-0.5 mb-4"
                  aria-label={`Calificación: ${testimonial.rating} de 5 estrellas`}
                >
                  {[1, 2, 3, 4, 5].map((i) => {
                    const fillPercent = Math.max(0, Math.min(1, testimonial.rating - (i - 1))) * 100;
                    return (
                      <span key={i} className="relative inline-block h-3.5 w-3.5 shrink-0" aria-hidden="true">
                        <LucideIcon name="Star" className="absolute inset-0 h-3.5 w-3.5 fill-amber-300/15 text-amber-300/30" />
                        {fillPercent > 0 && (
                          <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                            <LucideIcon name="Star" className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>

                <p
                  tabIndex={0}
                  role="region"
                  aria-label={`Testimonio de ${testimonial.name}, desplazable`}
                  className="text-[15px] sm:text-base leading-relaxed font-medium text-white/90 not-italic overflow-y-auto pr-2 max-h-[180px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/35"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}
                >
                  {testimonial.text}
                </p>

                <div className="flex items-center gap-3 mt-auto pt-6">
                  <img
                    src={testimonial.avatarUrl}
                    alt={testimonial.name}
                    className="h-11 w-11 rounded-full object-cover border-2 border-white/15"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-white leading-tight">
                      {testimonial.name}
                    </span>
                    <span className="text-xs text-white/60 leading-tight mt-0.5">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      {/* ------------------ 8. CONTACTO: FORMULARIO + MAPA ------------------ */}
      <ContactoSection />

      {/* ------------------ 8.5. COLONIAS QUE ATENDEMOS ------------------ */}
      <ColoniasSection />

      {/* ------------------ 9. FOOTER ------------------ */}
      <footer className="relative bg-[#18312B] text-white/90 pt-16 pb-[calc(env(safe-area-inset-bottom,0px)+3rem)] px-6 sm:px-8 border-t border-[#18312B]/10" role="contentinfo">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-12">

            {/* Column 1: Brand + Social buttons (expandibles en hover) */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white overflow-hidden">
                  <img src="/logo.png" alt="Amikoo Veterinaria" className="h-9 w-9 object-contain" />
                </div>
                <span className="font-heading-custom text-xl font-extrabold tracking-tight text-white">
                  AMIKOO
                </span>
              </div>

              {/* Sin redes sociales — bloque de confianza */}
              <div className="flex flex-col gap-3">
                <p className="text-xs text-white/70 leading-relaxed max-w-xs">
                  Atención profesional y cercana para tu mascota en Guadalajara. Agenda tu cita por WhatsApp y recibe orientación personalizada.
                </p>
              </div>
            </div>

            {/* Column 2: Contact Info & Area */}
            <div>
              <h4 className="font-heading-custom text-xs font-extrabold uppercase tracking-widest text-[#22C55E] mb-4">
                Datos de Contacto
              </h4>
              <ul className="space-y-3.5 text-xs text-white/70">
                <li className="flex items-start gap-2.5">
                  <LucideIcon name="Phone" className="h-4 w-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <a href={getWhatsAppUrl()} target="_blank" referrerPolicy="no-referrer" className="hover:text-white transition-colors">
                    +{VET_DATA.phone} (WhatsApp)
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <LucideIcon name="MapPin" className="h-4 w-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <span>{VET_DATA.location}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <LucideIcon name="Clock" className="h-4 w-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <span>{VET_DATA.schedule}</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick trust message */}
            <div>
              <h4 className="font-heading-custom text-xs font-extrabold uppercase tracking-widest text-[#22C55E] mb-4">
                Urgencias Clínicas
              </h4>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs leading-relaxed text-white/60 mb-2">
                  Recuerda que mi servicio es estrictamente de carácter básico y preventivo en domicilio.
                </p>
                <p className="text-xs font-bold text-amber-300">
                  <LucideIcon name="AlertTriangle" className="inline-block h-4 w-4 mr-1 text-amber-300" aria-hidden="true" /> Ante accidentes graves o emergencias, dirígete de inmediato a un hospital de urgencias 24/7.
                </p>
              </div>
            </div>

          </div>

          {/* Copyright Row */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <span>
              &copy; {new Date().getFullYear()} Amikoo Veterinaria. Todos los derechos reservados.
            </span>
            <span>
              Diseñado con amor y cuidado veterinario responsable <LucideIcon name="PawPrint" className="inline-block h-3 w-3 mx-0.5 text-white/40" aria-hidden="true" />
            </span>
          </div>

        </div>
      </footer>

      </main>

    </div>
  );
}
