import React from 'react';
import {
  HeartPulse,
  PawPrint,
  Stethoscope,
  Syringe,
  ShieldCheck,
  CalendarCheck,
  MessageCircle,
  ArrowRightCircle,
  Menu,
  X,
  MapPin,
  Clock,
  BadgeCheck,
  Dog,
  Cat,
  Sparkles,
  Phone,
  Instagram,
  Facebook,
  Mail,
  Star,
  ChevronRight,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  Check,
  AlertTriangle
} from 'lucide-react';

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
  key?: any;
}

export default function LucideIcon({ name, className = '', size }: LucideIconProps) {
  const props = { className, ...(size ? { size } : {}) };

  switch (name) {
    case 'HeartPulse':
      return <HeartPulse {...props} />;
    case 'PawPrint':
      return <PawPrint {...props} />;
    case 'Stethoscope':
      return <Stethoscope {...props} />;
    case 'Syringe':
      return <Syringe {...props} />;
    case 'ShieldCheck':
      return <ShieldCheck {...props} />;
    case 'CalendarCheck':
      return <CalendarCheck {...props} />;
    case 'MessageCircle':
      return <MessageCircle {...props} />;
    case 'ArrowRightCircle':
      return <ArrowRightCircle {...props} />;
    case 'Menu':
      return <Menu {...props} />;
    case 'X':
      return <X {...props} />;
    case 'MapPin':
      return <MapPin {...props} />;
    case 'Clock':
      return <Clock {...props} />;
    case 'BadgeCheck':
      return <BadgeCheck {...props} />;
    case 'Dog':
      return <Dog {...props} />;
    case 'Cat':
      return <Cat {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    case 'Phone':
      return <Phone {...props} />;
    case 'Instagram':
      return <Instagram {...props} />;
    case 'Facebook':
      return <Facebook {...props} />;
    case 'Mail':
      return <Mail {...props} />;
    case 'Star':
      return <Star {...props} />;
    case 'ChevronRight':
      return <ChevronRight {...props} />;
    case 'ShieldAlert':
      return <ShieldAlert {...props} />;
    case 'Calendar':
      return <Calendar {...props} />;
    case 'CheckCircle2':
      return <CheckCircle2 {...props} />;
    case 'Check':
      return <Check {...props} />;
    case 'AlertTriangle':
      return <AlertTriangle {...props} />;
    default:
      return <PawPrint {...props} />;
  }
}
