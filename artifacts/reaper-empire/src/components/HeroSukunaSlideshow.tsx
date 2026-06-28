import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import sukuna6 from '@assets/generated_images/sukuna6.jpg';
import sukuna7 from '@assets/generated_images/sukuna7.jpg';
import sukuna8 from '@assets/generated_images/sukuna8.jpg';
import sukuna9 from '@assets/generated_images/sukuna9.jpg';
import sukuna10 from '@assets/generated_images/sukuna10.jpg';

const HERO_SLIDES = [
  { image: sukuna6, alt: 'Sukuna dark portrait' },
  { image: sukuna7, alt: 'Sukuna stands over ruin' },
  { image: sukuna8, alt: 'Sukuna laughing' },
  { image: sukuna9, alt: 'Sukuna on cursed throne' },
  { image: sukuna10, alt: 'Sukuna slash attack' },
];

interface HeroSukunaSlideshowProps {
  interval?: number;
  className?: string;
}

export function HeroSukunaSlideshow({
  interval = 8000,
  className = '',
}: HeroSukunaSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-primary/20 shadow-2xl ${className}`}>
      <div className="relative aspect-square sm:aspect-[4/5] md:aspect-[3/4] w-full max-w-md mx-auto bg-card">
        <AnimatePresence mode="wait">
          <motion.img
            key={HERO_SLIDES[index].image}
            src={HERO_SLIDES[index].image}
            alt={HERO_SLIDES[index].alt}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />

        <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">King of Curses</span>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'bg-primary w-8' : 'bg-white/30 hover:bg-white/50 w-1.5'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
