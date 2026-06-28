import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Play, Pause } from 'lucide-react';

import sukuna1 from '@assets/generated_images/sukuna1.jpg';
import sukuna2 from '@assets/generated_images/sukuna2.jpg';
import sukuna3 from '@assets/generated_images/sukuna3.jpg';
import sukuna4 from '@assets/generated_images/sukuna4.jpg';
import sukuna5 from '@assets/generated_images/sukuna5.jpg';
import sukuna6 from '@assets/generated_images/sukuna6.jpg';
import sukuna7 from '@assets/generated_images/sukuna7.jpg';
import sukuna8 from '@assets/generated_images/sukuna8.jpg';
import sukuna9 from '@assets/generated_images/sukuna9.jpg';
import sukuna10 from '@assets/generated_images/sukuna10.jpg';

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
  {
    image: sukuna6,
    quote: "The weak have no right to stand before me.",
    context: "Sukuna's presence alone demands submission.",
  },
  {
    image: sukuna7,
    quote: "This world belongs to the strong.",
    context: "Ruin follows wherever the King of Curses walks.",
  },
  {
    image: sukuna8,
    quote: "Your fear is the only truth you know.",
    context: "Sukuna feeds on the terror of his enemies.",
  },
  {
    image: sukuna9,
    quote: "Bow, or be broken.",
    context: "The cursed throne accepts no rivals.",
  },
  {
    image: sukuna10,
    quote: "One strike is all it takes.",
    context: "Sukuna's domain expansion leaves nothing behind.",
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
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % SUKUNA_SLIDES.length);
  }, []);

  useEffect(() => {
    if (reducedMotion || isPaused) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [interval, isPaused, nextSlide, reducedMotion]);

  const slide = SUKUNA_SLIDES[index];

  if (variant === 'background') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={index}
            src={slide.image}
            alt="Sukuna artwork"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
            transition={reducedMotion ? { duration: 0.2 } : { duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <div className="relative aspect-[16/9] w-full bg-card">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={index}
            src={slide.image}
            alt="Sukuna artwork"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -40 }}
            transition={reducedMotion ? { duration: 0.2 } : { duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="glass rounded-lg p-4 md:p-6 max-w-2xl mx-auto text-center">
            <Quote className="mx-auto mb-3 text-primary/60" size={24} />
            {reducedMotion ? (
              <>
                <p className="text-lg md:text-2xl font-cinzel font-bold text-white text-glow leading-relaxed">
                  "{slide.quote}"
                </p>
                <p className="mt-3 text-sm md:text-base text-muted-foreground">
                  {slide.context}
                </p>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {SUKUNA_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index ? 'bg-primary w-6' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to Sukuna slide ${i + 1}`}
            aria-current={i === index ? 'true' : undefined}
          />
        ))}
        <button
          onClick={() => setIsPaused((p) => !p)}
          className="ml-2 w-7 h-7 rounded-full glass flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
          aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
          title={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? <Play size={12} fill="currentColor" /> : <Pause size={12} fill="currentColor" />}
        </button>
      </div>
    </div>
  );
}
