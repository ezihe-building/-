import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import sukuna1 from '@assets/generated_images/sukuna1.jpg';
import sukuna2 from '@assets/generated_images/sukuna2.jpg';
import sukuna3 from '@assets/generated_images/sukuna3.jpg';
import sukuna4 from '@assets/generated_images/sukuna4.jpg';
import sukuna5 from '@assets/generated_images/sukuna5.jpg';

const SUKUNA_IMAGES = [sukuna1, sukuna2, sukuna3, sukuna4, sukuna5];

interface SukunaCornerProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
  interval?: number;
  className?: string;
}

export function SukunaCorner({
  position = 'bottom-right',
  size = 'md',
  interval = 8000,
  className = '',
}: SukunaCornerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SUKUNA_IMAGES.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  const sizeClasses = {
    sm: 'w-20 h-24 md:w-28 md:h-36',
    md: 'w-32 h-40 md:w-44 md:h-56',
    lg: 'w-40 h-52 md:w-56 md:h-72',
  };

  const positionClasses = {
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
  };

  const maskDirections = {
    'bottom-right': 'linear-gradient(to top left, black 40%, transparent 100%)',
    'bottom-left': 'linear-gradient(to top right, black 40%, transparent 100%)',
    'top-right': 'linear-gradient(to bottom left, black 40%, transparent 100%)',
    'top-left': 'linear-gradient(to bottom right, black 40%, transparent 100%)',
  };

  return (
    <div className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none z-0 overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={SUKUNA_IMAGES[index]}
          alt="Sukuna corner decoration"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'blur(0px) brightness(0.55) saturate(1.2)',
            maskImage: maskDirections[position],
            WebkitMaskImage: maskDirections[position],
          }}
          aria-hidden="true"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/40 pointer-events-none" />
    </div>
  );
}
