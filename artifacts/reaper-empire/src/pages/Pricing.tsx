import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Check } from 'lucide-react';
import { SectionBackground } from '../components/SectionBackground';
import { SukunaSlideshow } from '../components/SukunaSlideshow';

const TIERS = [
  {
    name: "FREE",
    price: "0",
    description: "For casual users dipping their toes into automation.",
    features: [
      "20 commands limit",
      "Basic features only",
      "No AI integrations",
      "Community support",
      "Standard uptime"
    ],
    buttonText: "Get Started",
    buttonClass: "border border-white/20 hover:border-white text-white bg-transparent",
    popular: false
  },
  {
    name: "PREMIUM",
    price: "5",
    description: "For power users who demand absolute control over their chats.",
    features: [
      "Unlimited commands",
      "All features unlocked",
      "AI features included",
      "Priority support",
      "99.9% Uptime guarantee"
    ],
    buttonText: "Go Premium",
    buttonClass: "bg-primary text-white hover:bg-primary/90 glow-red",
    popular: true
  },
  {
    name: "EMPIRE",
    price: "15",
    description: "For leaders managing multiple communities and systems.",
    features: [
      "Everything in Premium",
      "Multiple sessions (up to 3)",
      "Custom plugin support",
      "Direct owner support via WA",
      "Custom bot name & branding"
    ],
    buttonText: "Join the Empire",
    buttonClass: "border border-primary text-primary hover:bg-primary hover:text-white",
    popular: false
  }
];

export function Pricing() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <SectionBackground withGlow glowPosition="bottom" withSukunaBackground className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">

          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-4 text-glow tracking-widest"
            >
              CHOOSE YOUR POWER
            </motion.h1>
            <p className="text-white/60 text-lg">Select the tier that matches your ambition.</p>
          </div>

          <div className="mb-12">
            <SukunaSlideshow interval={30000} variant="gallery" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {TIERS.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative rounded-xl border ${
                  tier.popular ? 'border-primary shadow-[0_0_30px_rgba(220,20,60,0.15)] md:-translate-y-4' : 'border-white/10'
                } p-8 flex flex-col h-full glass-card`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-2xl font-cinzel font-bold text-white mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">${tier.price}</span>
                  <span className="text-white/60">/month</span>
                </div>
                <p className="text-white/60 text-sm mb-8 h-10">{tier.description}</p>

                <div className="space-y-4 mb-8 flex-grow">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check size={18} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/test"
                  className={`w-full py-3 rounded text-center font-bold uppercase tracking-wider transition-all duration-300 ${tier.buttonClass}`}
                >
                  {tier.buttonText}
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </SectionBackground>
    </div>
  );
}
