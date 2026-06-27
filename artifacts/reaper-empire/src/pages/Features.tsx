import { motion } from 'framer-motion';
import { SectionBackground } from '../components/SectionBackground';
import {
  Zap,
  Smartphone,
  Puzzle,
  EyeOff,
  PhoneOff,
  Bot,
  Download,
  ShieldAlert,
  MessageSquareReply,
  LayoutDashboard
} from 'lucide-react';

const FEATURES = [
  {
    icon: <Zap size={28} />,
    title: "Fast Pairing",
    description: "Lightning fast WhatsApp pairing with a unique code system. No scanning required."
  },
  {
    icon: <Smartphone size={28} />,
    title: "Multi Device",
    description: "Run the bot on multiple WhatsApp sessions simultaneously from one account."
  },
  {
    icon: <Puzzle size={28} />,
    title: "Plugin Support",
    description: "Extend functionality with custom plugins written in JavaScript."
  },
  {
    icon: <EyeOff size={28} />,
    title: "Anti Delete",
    description: "Recover and view deleted messages in groups and direct chats automatically."
  },
  {
    icon: <PhoneOff size={28} />,
    title: "Anti Call",
    description: "Automatically block unwanted incoming calls and send a custom warning message."
  },
  {
    icon: <Bot size={28} />,
    title: "AI Features",
    description: "Built-in AI for smart replies, image generation, translation, and summarizing."
  },
  {
    icon: <Download size={28} />,
    title: "Downloader",
    description: "Download media from YouTube, TikTok, Instagram, Twitter, and Spotify effortlessly."
  },
  {
    icon: <ShieldAlert size={28} />,
    title: "Group Management",
    description: "Full group admin controls: ban, kick, warn, promote, demote, and anti-link filters."
  },
  {
    icon: <MessageSquareReply size={28} />,
    title: "Auto Reply",
    description: "Set custom automatic replies for any keyword or trigger in your chats."
  },
  {
    icon: <LayoutDashboard size={28} />,
    title: "Dashboard",
    description: "Web-based management dashboard to control everything without typing commands."
  }
];

export function Features() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <SectionBackground withGlow glowPosition="top" withSukunaBackground className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-cinzel font-black text-white tracking-widest text-glow"
            >
              ARSENAL
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="h-1 w-24 bg-primary mx-auto mt-6 glow-red"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-white/70 max-w-2xl mx-auto text-lg"
            >
              Every tool required to maintain absolute control over your digital empire.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 rounded-lg border-t-2 border-primary/30 hover:border-primary transition-all duration-300 relative overflow-hidden group hover:border-glow"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded bg-background/80 border border-white/10 flex items-center justify-center mb-5 text-primary group-hover:text-white group-hover:bg-primary transition-all duration-300 backdrop-blur-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-cinzel tracking-wide">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed flex-grow">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionBackground>
    </div>
  );
}
