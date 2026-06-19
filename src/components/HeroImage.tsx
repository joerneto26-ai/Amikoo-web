import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { motion } from 'motion/react';
import heroPng from '../assets/hero.png';

gsap.registerPlugin(useGSAP, MotionPathPlugin);

const COINS = 7;
const CONVEYOR_PATH = 'M 60,260 C 140,250 220,210 300,160 C 380,120 440,90 510,70';
const VITRINA_X = 480;
const VITRINA_Y = 65;

function PawCoinSvg() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <circle cx="20" cy="20" r="18" fill="rgba(255,255,255,0.18)" stroke="#2FBF8F" strokeWidth="1" />
      <circle cx="20" cy="20" r="12" fill="rgba(255,255,255,0.1)" />
      <path d="M20 26c-2 0-3.5-1.5-3.5-3.5v-1c0-1 1-1.5 2-1h3c1 0 2 .5 2 1v1c0 2-1.5 3.5-3.5 3.5z" fill="#2FBF8F" opacity="0.7" />
      <circle cx="13" cy="14" r="2.8" fill="#2FBF8F" opacity="0.7" />
      <circle cx="20" cy="11" r="2.8" fill="#2FBF8F" opacity="0.7" />
      <circle cx="27" cy="14" r="2.8" fill="#2FBF8F" opacity="0.7" />
      <circle cx="13.5" cy="19" r="2.4" fill="#2FBF8F" opacity="0.5" />
      <circle cx="26.5" cy="19" r="2.4" fill="#2FBF8F" opacity="0.5" />
    </svg>
  );
}

export default function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const coinRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline();

      tl.fromTo(imgRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
      );

      tl.fromTo(glowRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" },
        "-=0.6"
      );

      gsap.to(imgRef.current, {
        y: -8,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(glowRef.current, {
        opacity: 0.55,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      coinRefs.current.forEach((el, i) => {
        if (!el) return;

        const baseDelay = i * 0.85;
        const tlCoin = gsap.timeline({ repeat: -1, delay: baseDelay });

        tlCoin.fromTo(el,
          { x: 0, y: 0, rotation: 0, scale: 1, opacity: 0 },
          { duration: 0.25, opacity: 0.7, ease: "power2.out" },
          0
        );

        tlCoin.to(el, {
          motionPath: {
            path: CONVEYOR_PATH,
            align: CONVEYOR_PATH,
            alignOrigin: [0.5, 0.5],
          },
          rotation: 420,
          scale: 1,
          opacity: 0.7,
          duration: 3.8,
          ease: "none",
        }, 0.25);

        tlCoin.to(el, {
          scale: 0.25,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        }, 3.55);

        tlCoin.set(el, { scale: 1, opacity: 0, rotation: 0 }, 4.05);
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-y-0 right-0 w-full lg:w-[55%] 2xl:w-[50%] select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.85 }}
    >
      <div
        ref={glowRef}
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-[#2FBF8F]/12 blur-[80px] pointer-events-none opacity-0"
        aria-hidden="true"
      />

      <img
        ref={imgRef}
        src={heroPng}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center opacity-0"
        width={800}
        height={900}
        aria-hidden="true"
      />

      <div className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
        {Array.from({ length: COINS }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { coinRefs.current[i] = el; }}
            className="absolute opacity-0"
            style={{ width: 42, height: 42, left: 40, top: 250 }}
          >
            <PawCoinSvg />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
