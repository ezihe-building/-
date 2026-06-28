import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Zap, Shield, Bot, LayoutDashboard, ChevronDown } from 'lucide-react';
import { SectionBackground } from '../components/SectionBackground';
import { SukunaSlideshow } from '../components/SukunaSlideshow';

export function Home() {
  return (
    <div className="min-h-screen flex flex-col pt-16">

      {/* Hero Section */}
      <SectionBackground withParticles withGlow glowPosition="center" withSukunaBackground className="min-h-[90vh] flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto space-y-8 relative z-10"
        >
          <div className="glass inline-block mb-4 px-4 py-1.5 rounded-full">
            <span className="text-primary text-sm font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              System Online
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-cinzel font-black text-white leading-tight drop-shadow-2xl">
            <span className="block text-glow text-primary mb-2">𒋲ᬼ⃟𓁹</span>
            THE REAPER EMPIRE BOT
            <span className="block text-glow text-primary mt-2">𒋲ᬼ⃟𓁹</span>
          </h1>

          <p className="text-xl md:text-2xl font-light text-white/90 max-w-3xl mx-auto tracking-wide drop-shadow-lg">
            The Most Powerful WhatsApp Bot. <span className="text-white font-medium">Forged in Darkness.</span>
          </p>

          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            Automate your WhatsApp with 50+ commands, AI features, group management, anti-delete, and a full dashboard. Built for power users.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 pt-8">
            <Link
              href="/test"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded hover:bg-primary/90 transition-all glow-red text-lg uppercase tracking-wider"
            >
              Test Out The Bot Today
            </Link>

            <Link
              href="/features"
              className="glass-light w-full sm:w-auto px-8 py-4 text-white font-bold rounded transition-all hover:border-primary/50 uppercase tracking-wider"
            >
              Features
            </Link>

            <Link
              href="/commands"
              className="glass-light w-full sm:w-auto px-8 py-4 text-white/80 hover:text-white font-bold rounded transition-all hover:border-primary/50 uppercase tracking-wider"
            >
              Documentation
            </Link>

            <Link
              href="/dashboard"
              className="glass-light w-full sm:w-auto px-8 py-4 text-white/80 hover:text-white font-bold rounded transition-all hover:border-primary/50 uppercase tracking-wider"
            >
              Dashboard
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-primary"
        >
          <ChevronDown size={32} />
        </motion.div>
      </SectionBackground>

      {/* Stats Strip */}
      <SectionBackground withSukunaBackground className="relative z-20" withGlow glowPosition="top" sukunaCornerPosition="bottom-left" sukunaCornerSize="sm">
        <div className="bg-primary/95 border-y border-primary/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm md:text-base font-bold text-white uppercase tracking-widest text-center">
              <span className="flex items-center gap-2"><Zap size={18} /> 50+ Commands</span>
              <span className="hidden md:inline text-white/50">•</span>
              <span className="flex items-center gap-2"><LayoutDashboard size={18} /> Multi-Device</span>
              <span className="hidden md:inline text-white/50">•</span>
              <span className="flex items-center gap-2"><Bot size={18} /> AI Powered</span>
              <span className="hidden md:inline text-white/50">•</span>
              <span className="flex items-center gap-2"><Shield size={18} /> 24/7 Uptime</span>
            </div>
          </div>
        </div>
      </SectionBackground>

      {/* Sukuna Quote Slideshow */}
      <SectionBackground withSukunaBackground className="py-8" withGlow glowPosition="center" sukunaCornerPosition="bottom-right" sukunaCornerSize="lg">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <SukunaSlideshow interval={60000} variant="gallery" />
        </div>
      </SectionBackground>

      {/* Feature Highlights */}
      <SectionBackground withGlow glowPosition="bottom-left" className="py-24" withSukunaBackground sukunaCornerPosition="bottom-left" sukunaCornerSize="md">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-white mb-4">
              Unleash the <span className="text-primary text-glow">Arsenal</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A glimpse into the capabilities of the Reaper Empire Bot. Designed for maximum efficiency and absolute control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<Zap className="text-primary" size={32} />}
              title="Fast Pairing"
              description="Connect your WhatsApp instantly using our secure 8-digit code system. No QR codes needed."
            />
            <FeatureCard
              icon={<Bot className="text-primary" size={32} />}
              title="AI Intelligence"
              description="Built-in AI models for smart replies, image generation, and conversational assistance in groups."
            />
            <FeatureCard
              icon={<Shield className="text-primary" size={32} />}
              title="Group Management"
              description="Absolute authority over your groups. Auto-kick, ban, warnings, and anti-spam protection."
            />
          </div>

          <div className="text-center mt-12">
            <Link href="/features" className="inline-flex items-center gap-2 text-primary hover:text-white font-bold transition-colors uppercase tracking-wider">
              View All Features <ChevronDown className="-rotate-90" size={16} />
            </Link>
          </div>
        </div>
      </SectionBackground>

    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-card p-8 rounded-lg border-t-2 border-primary/50 hover:border-glow transition-all duration-300 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-full bg-background/80 border border-white/10 flex items-center justify-center mb-6 group-hover:glow-red transition-all backdrop-blur-sm">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 font-cinzel">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
