// Data file for Amikoo Veterinaria landing page

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon reference
  category: string;
  popular?: boolean;
}

export interface ClientTestimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatarUrl: string;
  rating: number;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface MascotCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  imageUrl: string;
  specs: string[];
}

export const VET_DATA = {
  name: "Amikoo",
  fullName: "Amikoo Veterinaria",
  profession: "Clínica Veterinaria",
  tagline: "Atención veterinaria profesional, cercana y comprometida con el bienestar de tu mascota en Guadalajara.",
  phone: "523326411655",
  location: "Guadalajara, Jalisco",
  schedule: "Lunes a Sábado, 9:00 AM - 8:00 PM",
  address: "C. Adrián Puga 2990, San Rafael, 44810 Guadalajara, Jal.",
  mapsEmbedUrl: "https://www.google.com/maps?q=C.+Adri%C3%A1n+Puga+2990,+San+Rafael,+44810+Guadalajara,+Jal.&output=embed",
};

export const SERVICES: ServiceItem[] = [
  {
    id: "consulta-general",
    title: "Consulta General & Valoración",
    description: "Evaluación integral de constantes fisiológicas, peso, hidratación y estado general para mantener a tu mascota sana.",
    iconName: "Stethoscope",
    category: "Básico",
    popular: true
  },
  {
    id: "vacunas-prev",
    title: "Esquema de Vacunación",
    description: "Aplicación de vacunas esenciales y refuerzos según la edad y estilo de vida de tu perro o gato.",
    iconName: "Syringe",
    category: "Prevención"
  },
  {
    id: "desparasitacion",
    title: "Desparasitación Interna y Externa",
    description: "Tratamientos seguros y personalizados contra parásitos intestinales, pulgas y garrapatas.",
    iconName: "HeartPulse",
    category: "Prevención"
  },
  {
    id: "curaciones",
    title: "Curaciones Básicas & Vendajes",
    description: "Limpieza y desinfección de heridas superficiales, retiro de puntos, raspaduras y vendajes protectores.",
    iconName: "ShieldCheck",
    category: "Cuidados"
  },
  {
    id: "revision-piel",
    title: "Monitoreo de Piel & Pelaje",
    description: "Detección temprana de dermatitis, resequedad o problemas cutáneos, y recomendación de baños medicados.",
    iconName: "Sparkles",
    category: "Cuidados"
  },
  {
    id: "corte-unas",
    title: "Corte de Uñas Seguro",
    description: "Cuidado higiénico de las garras para evitar torceduras, dolor o entierro de uñas, especial para mascotas nerviosas.",
    iconName: "PawPrint",
    category: "Higiene"
  },
  {
    id: "limpieza-oidos",
    title: "Limpieza Higiénica de Oídos",
    description: "Remoción suave de cerumen y suciedad externa para prevenir otitis molestas o infecciones.",
    iconName: "CheckCircle2",
    category: "Higiene"
  },
  {
    id: "orientacion-nutricional",
    title: "Orientación Nutricional",
    description: "Consejos para elegir el alimento ideal según su etapa de vida, control de sobrepeso o alergias leves.",
    iconName: "CalendarCheck",
    category: "Bienestar"
  },
  {
    id: "post-tratamiento",
    title: "Seguimiento Post-Tratamiento",
    description: "Acompañamiento, administración de medicamentos recetados por su veterinario y reporte de evolución.",
    iconName: "Clock",
    category: "Bienestar",
    popular: true
  }
];

export const TESTIMONIALS: ClientTestimonial[] = [
  {
    id: "t1",
    name: "Pau Padilla",
    role: "Local Guide · 11 reseñas",
    text: "\u201CMuy atentos y tratan muy bien a cada paciente. Llev\u00E9 a mi perrita que es diab\u00E9tica casi de emergencia y me explicaron muy bien todo, le realizaron todos los estudios ah\u00ED mismo y no nos fuimos hasta que la estabilizaron. Tienen muy buen equipo y mucho conocimiento, sin dudarlo de los mejores.\u201D",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    id: "t2",
    name: "Alondra Birrueta",
    role: "Familia de perrito · Erliquia",
    text: "\u201CExcelente veterinario. Llev\u00E9 a mi perrito porque ten\u00EDa temperatura y result\u00F3 ser erliquia. Nunca se le medic\u00F3 hasta estar 100% seguro de que era. Agradezco su atenci\u00F3n, mi perro est\u00E1 sano. Muy acertado.\u201D",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    id: "t3",
    name: "Ana Leticia Nuñez",
    role: "Local Guide · 6 reseñas",
    text: "\u201CTotalmente confiable. Tratan muy bien a mi perrita y entre los doctores y yo la sacamos adelante de su enfermedad, ahora juega m\u00E1s. La responsabilidad no es solo de los doctores, es tambi\u00E9n de nosotros. Lleven a sus perritos a tiempo.\u201D",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    id: "t4",
    name: "Carlos R.T.",
    role: "Local Guide · 13 reseñas",
    text: "\u201CEl mejor veterinario que he conocido. S\u00FAper profesional, comprometido, y el amor que tiene por los animales es dif\u00EDcil de encontrar en un profesional de la rama.\u201D",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    id: "t5",
    name: "Citlalli Lorrey González",
    role: "Familia de perritos · Parvo",
    text: "\u201CRecomiendo much\u00EDsimo. Me ayudaron con mis perritos que dieron positivo a parvo. Afortunadamente cada d\u00EDa est\u00E1n mejorando de su salud. Son muy atentos y resolv\u00EDan todas mis dudas.\u201D",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    id: "t6",
    name: "Mayami Wings",
    role: "Local Guide · 6 reseñas",
    text: "\u201CExcelentes doctores y seres humanos. Tenemos a\u00F1os llevando a mis mascotas ah\u00ED, ya sea para ba\u00F1os, consultas, esterilizaciones, vacunas, etc. y siempre salen bien. Tambi\u00E9n llevamos callejeros rescatidos y siempre nos apoyan con los precios.\u201D",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    rating: 5
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Escríbenos por WhatsApp",
    description: "Cuéntanos qué le ocurre a tu consentido, su edad y tus necesidades específicas de atención, prevención o rehabilitación.",
    iconName: "MessageCircle"
  },
  {
    number: "02",
    title: "Revisamos el caso",
    description: "Te indicamos brevemente si podemos ayudarte o si el cuadro requiere estudios adicionales en la clínica.",
    iconName: "BadgeCheck"
  },
  {
    number: "03",
    title: "Agendamos la atención",
    description: "Definimos juntos el horario y el servicio adecuado para recibirlos en nuestra clínica con toda comodidad.",
    iconName: "CalendarCheck"
  },
  {
    number: "04",
    title: "Damos seguimiento",
    description: "Te orientamos detalladamente sobre los cuidados posteriores y quedamos al pendiente de cómo evoluciona en los siguientes días.",
    iconName: "HeartPulse"
  }
];

export const MASCOTS_SERVED: MascotCategory[] = [
  {
    id: "m-perros",
    title: "Perros",
    description: "Atención preventiva y cuidados básicos adaptados a todas las razas y tamaños. Desde cachorros inquietos hasta perritos de la tercera edad que requieren paciencia extra.",
    iconName: "Dog",
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600",
    specs: ["Vacunación y Refuerzos", "Control de Parásitos", "Corte de uñas & Higiene", "Manejo libre de estrés"]
  },
  {
    id: "m-gatos",
    title: "Gatos",
    description: "Revisión especializada de felinos respetando sus tiempos y espacios. Utilizo técnicas de manejo amigables para minimizar el estrés natural que les causa la manipulación.",
    iconName: "Cat",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600",
    specs: ["Triple Felina & Rabia", "Desparasitaciones suaves", "Corte higiénico de garras", "Manejo Felino Amigable (Feline Friendly)"]
  },
  {
    id: "m-pequenas",
    title: "Mascotas pequeñas bajo valoración",
    description: "Orientación general y asistencia básica para conejos, hamsters u otros pequeños mamíferos del hogar. Previa plática para evaluar el caso puntual.",
    iconName: "Sparkles",
    imageUrl: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=80&w=600",
    specs: ["Asesoría de hábitat/nutrición", "Medición de peso y dentición", "Canalización con especialistas", "Cuidados básicos en casa"]
  }
];

export const TRUST_CARDS = [
  {
    title: "Atención cercana",
    description: "Trato paciente y empático para que tú y tu mascota se sientan en un ambiente familiar y completamente libres de miedos.",
    icon: "HeartPulse",
    bgColor: "bg-white",
    iconColor: "text-[#16A34A]"
  },
  {
    title: "Orientación clara",
    description: "Explicaciones sencillas y transparentes sobre cada cuidado, prevención y tratamiento para que tomes las mejores decisiones.",
    icon: "Stethoscope",
    bgColor: "bg-white",
    iconColor: "text-[#16A34A]"
  },
  {
    title: "Seguimiento responsable",
    description: "No te dejo solo. Hago un acompañamiento cercano después de la consulta para revisar de la mano su evolución exitosa.",
    icon: "Clock",
    bgColor: "bg-[#18312B]",
    iconColor: "text-[#22C55E]"
  }
];

export const getWhatsAppUrl = (customMsg?: string) => {
  const defaultMsg = "Hola Amikoo, me gustar\u00EDa agendar una consulta o recibir orientaci\u00F3n para mi mascota.";
  const text = encodeURIComponent(customMsg || defaultMsg);
  return `https://wa.me/${VET_DATA.phone}?text=${text}`;
};
