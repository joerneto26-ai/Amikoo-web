import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import LucideIcon from './LucideIcon';
import { VET_DATA, getWhatsAppUrl } from '../data/veterinaryData';

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Planes', href: '#planes' },
  { label: 'Testimonios', href: '#testimonios' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MorphingNavbar() {
  const [activeHref, setActiveHref] = useState('#inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, 120], [0, 1], { clamp: true });

  // Morph: top = gap 16px (compactas pero separadas) → scrolled = 0px (fusionadas)
  const wrapperGap = useTransform(progress, [0, 1], [16, 0]);
  const wrapperPadding = useTransform(progress, [0, 1], [8, 8]);
  const wrapperBgOpacity = useTransform(progress, [0, 1], [1, 0.85]);
  const wrapperShadow = useTransform(progress, (p) => {
    // Sombra sutil premium
    const blur = 6 + p * 6;           // 6 → 12
    const y = 1 + p * 2;              // 1 → 3
    const alpha = 0.04 + p * 0.04;    // 0.04 → 0.08
    return `0 ${y}px ${blur}px rgba(24, 49, 43, ${alpha})`;
  });
  const wrapperScale = useTransform(progress, [0, 1], [1, 0.99]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveHref(href);
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] px-4 sm:px-6"
        style={{ top: 12 }}
        role="banner"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <motion.div
          className="mx-auto flex w-full max-w-[1180px] items-center justify-between rounded-full border border-white/70 bg-white backdrop-blur-md"
          style={{
            gap: wrapperGap,
            padding: wrapperPadding,
            backgroundColor: `rgba(255, 255, 255, ${wrapperBgOpacity.get()})`,
            boxShadow: wrapperShadow,
            scale: wrapperScale,
          }}
        >
          {/* LEFT PILL — Logo */}
          <motion.a
            href="#inicio"
            onClick={(e) => handleScroll(e, '#inicio')}
            className="flex items-center gap-3 rounded-full"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            aria-label="Amikoo Veterinaria - Ir al inicio"
          >
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white shrink-0 overflow-hidden border border-[#2FBF8F]/20"
              whileHover={{ rotate: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <img src="/logo.png" alt="Amikoo Veterinaria" className="h-10 w-10 object-contain" />
            </motion.div>
            <div className="flex flex-col leading-tight pr-3">
              <span className="font-heading-custom text-base font-black tracking-tight text-[#18312B] whitespace-nowrap">
                {VET_DATA.name}
              </span>
              <span className="text-xs font-bold tracking-widest text-[#60756E] uppercase whitespace-nowrap">
                Clínica Veterinaria
              </span>
            </div>
          </motion.a>

          {/* CENTER PILL — Nav links */}
          <motion.nav
            className="hidden lg:flex items-center rounded-full"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="relative px-5 py-2.5 text-sm font-semibold text-[#18312B]/75 hover:text-[#18312B] transition-colors z-10"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ backgroundColor: 'rgba(47,191,143,0.14)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              );
            })}
          </motion.nav>

          {/* RIGHT PILL — WhatsApp CTA */}
          <motion.a
            href={getWhatsAppUrl('Hola Amikoo, me gustaría agendar una cita para mi mascota.')}
            target="_blank"
            referrerPolicy="no-referrer"
            className="hidden lg:flex items-center gap-2.5 rounded-full"
            whileHover={{ scale: 1.03, filter: 'brightness(1.04)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.span
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2FBF8F] text-white shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <LucideIcon name="MessageCircle" className="h-5 w-5" />
            </motion.span>
            <span className="text-sm font-bold text-[#18312B] whitespace-nowrap pr-3">
              WhatsApp
            </span>
          </motion.a>

          {/* MOBILE — Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full text-[#18312B] hover:bg-[#18312B]/5 transition-colors"
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileMenuOpen}
          >
            <LucideIcon name="Menu" className="h-5 w-5" />
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-[#18312B]/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-[70] h-[100dvh] w-[min(88vw,360px)] bg-white p-6 shadow-[-12px_0_48px_rgba(24,49,43,0.18)] flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%', transition: { duration: 0.3, ease: EASE } }}
              transition={{ duration: 0.45, ease: EASE }}
              role="dialog"
              aria-label="Menú de navegación"
            >
              <div className="flex items-center justify-between pb-6 border-b border-[#18312B]/10">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white overflow-hidden border border-[#2FBF8F]/20">
                    <img src="/logo.png" alt="Amikoo Veterinaria" className="h-8 w-8 object-contain" />
                  </div>
                  <span className="font-heading-custom text-sm font-black text-[#18312B]">
                    {VET_DATA.name}
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#18312B]/10 hover:bg-[#18312B]/5"
                  aria-label="Cerrar menú"
                >
                  <LucideIcon name="X" className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-1 py-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className={`text-lg font-semibold py-3 px-3 rounded-xl transition-colors ${
                      activeHref === link.href
                        ? 'text-[#2FBF8F] bg-[#2FBF8F]/10'
                        : 'text-[#18312B]/85 hover:text-[#2FBF8F] hover:bg-[#2FBF8F]/5'
                    }`}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, ease: EASE }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-[#18312B]/10">
                <a
                  href={getWhatsAppUrl('Hola Amikoo, me gustaría agendar una cita.')}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center justify-center gap-2.5 rounded-full bg-[#2FBF8F] py-3.5 text-center font-bold text-white shadow-md hover:bg-[#159A74] transition-colors"
                >
                  <LucideIcon name="MessageCircle" className="h-5 w-5" />
                  <span>Agendar por WhatsApp</span>
                </a>
                <p className="mt-3 text-center text-xs text-[#60756E] font-medium">
                  {VET_DATA.schedule}
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
