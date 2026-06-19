import { motion } from 'motion/react';
import type { ComponentType } from 'react';

interface Props {
  href: string;
  icon: ComponentType<{ className?: string }>;
  handle: string;
  hoverBgClass: string;
  hoverIconClass: string;
  ariaLabel: string;
}

const SPAN_VARIANTS = {
  rest: { width: 0, opacity: 0, paddingRight: 0 },
  hover: { width: 'auto' as const, opacity: 1, paddingRight: 18 },
};

const TRANSITION = { type: 'spring' as const, bounce: 0, duration: 0.6, delay: 0.1 };

export function ExpandableSocialLink({
  href,
  icon: Icon,
  handle,
  hoverBgClass,
  hoverIconClass,
  ariaLabel,
}: Props) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial="rest"
      whileHover="hover"
      animate="rest"
      transition={{ type: 'spring', bounce: 0, duration: 0.4, delay: 0.05 }}
      className={`group inline-flex items-center gap-0 rounded-full overflow-hidden transition-colors duration-300 ${hoverBgClass}`}
      aria-label={ariaLabel}
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center">
        <Icon className={`h-7 w-7 text-white transition-colors duration-300 ${hoverIconClass}`} />
      </span>
      <motion.span
        variants={SPAN_VARIANTS}
        transition={TRANSITION}
        className="overflow-hidden whitespace-nowrap text-base font-bold text-white"
      >
        {handle}
      </motion.span>
    </motion.a>
  );
}
