import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

import sukuna1 from '@assets/generated_images/sukuna1.jpg';
import sukuna2 from '@assets/generated_images/sukuna2.jpg';
import sukuna3 from '@assets/generated_images/sukuna3.jpg';
import sukuna4 from '@assets/generated_images/sukuna4.jpg';
import sukuna5 from '@assets/generated_images/sukuna5.jpg';

const SUKUNA_SLIDES = [
  {
    image: sukuna1,
    quote: "Stand proud. You're strong.",
    context: "Sukuna recognizes only those who survive.",
  },
  {
    image: sukuna2,
    quote: "I don't have any intention of being understood by the weak.",
    context: "The King of Curses bows to no one.",
  },
  {
    image: sukuna3,
    quote: "Know your place, fool.",
    context: "The throne of the cursed remains unchallenged.",
  },
  {
    image: sukuna4,
    quote: "I've never once gone all out.",
    context: "True power is never revealed in full.",
  },
  {
    image: sukuna5,
    quote: "Are you the strongest because you're Satoru Gojo? Or are you Satoru Gojo because you're the strongest?",
    context: "Sukuna speaks to the nature of supremacy.",
  },
];

interface SukunaSlideshowProps {
  interval?: number;
  variant?: 'gallery' | 'background';
  className?: string;
}

export function SukunaSlideshow({
  interval = 60000,
  variant = 'gallery',
  className = '',
}: SukunaSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SUKUNA_SLIDES.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  const slide = SUKUNA_SLIDES[index];

  if (variant === 'background') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.image}
            src={slide.image}
            alt="Sukuna artwork"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-transparent to-background/95" />
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <div className="relative aspect-[16/9] w-full bg-card">
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.image}
            src={slide.image}
            alt="Sukuna artwork"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="glass rounded-lg p-4 md:p-6 max-w-2xl mx-auto text-center">
            <Quote className="mx-auto mb-3 text-primary/60" size={24} />
            <motion.p
              key={slide.quote}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-lg md:text-2xl font-cinzel font-bold text-white text-glow leading-relaxed"
            >
              "{slide.quote}"
            </motion.p>
            <motion.p
              key={slide.context}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-3 text-sm md:text-base text-muted-foreground"
            >
              {slide.context}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SUKUNA_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index ? 'bg-primary w-6' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
