import { ParticleBackground } from './ParticleBackground';
import { SukunaSlideshow } from './SukunaSlideshow';
import { SukunaCorner } from './SukunaCorner';

interface SectionBackgroundProps {
  children: React.ReactNode;
  className?: string;
  withParticles?: boolean;
  withGlow?: boolean;
  glowPosition?: 'center' | 'top' | 'bottom' | 'top-right' | 'bottom-left';
  withSukunaBackground?: boolean;
  withSukunaCorner?: boolean;
  sukunaCornerPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  sukunaCornerSize?: 'sm' | 'md' | 'lg';
}

export function SectionBackground({
  children,
  className = '',
  withParticles = false,
  withGlow = false,
  glowPosition = 'center',
  withSukunaBackground = false,
  withSukunaCorner = true,
  sukunaCornerPosition = 'bottom-right',
  sukunaCornerSize = 'md',
}: SectionBackgroundProps) {

  const getGlowClasses = () => {
    if (!withGlow) return '';

    const baseGlow = "absolute rounded-full blur-[120px] bg-primary/10 pointer-events-none animate-breathe z-0";

    switch (glowPosition) {
      case 'center':
        return `${baseGlow} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] max-w-full max-h-full`;
      case 'top':
        return `${baseGlow} top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]`;
      case 'bottom':
        return `${baseGlow} bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px]`;
      case 'top-right':
        return `${baseGlow} top-0 right-0 translate-x-1/4 -translate-y-1/4 w-[600px] h-[600px]`;
      case 'bottom-left':
        return `${baseGlow} bottom-0 left-0 -translate-x-1/4 translate-y-1/4 w-[600px] h-[600px]`;
      default:
        return '';
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Sukuna blurred background */}
      {withSukunaBackground && (
        <SukunaSlideshow variant="background" interval={60000} className="z-0" />
      )}

      {/* Base dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95 pointer-events-none z-0" />

      {/* Animated glow */}
      {withGlow && (
        <div className={getGlowClasses()} />
      )}

      {/* Optional particles */}
      {withParticles && <ParticleBackground />}

      {/* Sukuna corner image */}
      {withSukunaCorner && (
        <SukunaCorner
          position={sukunaCornerPosition}
          size={sukunaCornerSize}
          interval={12000}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
