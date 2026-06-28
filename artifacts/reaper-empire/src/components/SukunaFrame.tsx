import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import sukuna1 from '@assets/generated_images/sukuna1.jpg';
import sukuna2 from '@assets/generated_images/sukuna2.jpg';
import sukuna3 from '@assets/generated_images/sukuna3.jpg';
import sukuna4 from '@assets/generated_images/sukuna4.jpg';
import sukuna5 from '@assets/generated_images/sukuna5.jpg';

const SUKUNA_IMAGES = [sukuna1, sukuna2, sukuna3, sukuna4, sukuna5];

export function SukunaFrame() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SUKUNA_IMAGES.length);
    }, 40000);
    return () => clearInterval(timer);
  }, []);

  const currentImage = SUKUNA_IMAGES[index];
  const nextImage = SUKUNA_IMAGES[(index + 1) % SUKUNA_IMAGES.length];

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden hidden md:block">
      {/* Left Sukuna silhouette panel */}
      <div className="absolute top-0 left-0 h-full w-[180px] lg:w-[240px] opacity-60 mix-blend-lighten">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage + '-left'}
            src={currentImage}
            alt="Sukuna left frame"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: 'blur(18px) brightness(0.25) saturate(1.3)',
              maskImage: 'linear-gradient(to right, black 30%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, black 30%, transparent 100%)',
            }}
          />
        </AnimatePresence>
      </div>

      {/* Right Sukuna silhouette panel */}
      <div className="absolute top-0 right-0 h-full w-[180px] lg:w-[240px] opacity-60 mix-blend-lighten">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage + '-right'}
            src={currentImage}
            alt="Sukuna right frame"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: 'blur(18px) brightness(0.25) saturate(1.3)',
              maskImage: 'linear-gradient(to left, black 30%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to left, black 30%, transparent 100%)',
            }}
          />
        </AnimatePresence>
      </div>

      {/* Rotating corner avatar (top-right) */}
      <div className="absolute top-20 right-6 lg:right-10 w-20 h-20 lg:w-28 lg:h-28 rounded-full border border-primary/30 overflow-hidden opacity-80 animate-pulse-glow z-[6]">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage + '-avatar'}
            src={nextImage}
            alt="Sukuna corner avatar"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.7) saturate(1.2)' }}
          />
        </AnimatePresence>
      </div>

      {/* Bottom-left corner mark */}
      <div className="absolute bottom-8 left-6 lg:left-10 text-5xl lg:text-7xl font-cinzel font-black text-primary/10 select-none z-[6]">
        𒋲
      </div>

      {/* Bottom-right corner mark */}
      <div className="absolute bottom-8 right-6 lg:right-10 text-5xl lg:text-7xl font-cinzel font-black text-primary/10 select-none z-[6]">
        𓁹
      </div>
    </div>
  );
}
