import { motion } from 'framer-motion';
import { SectionBackground } from '../components/SectionBackground';
import { SukunaSlideshow } from '../components/SukunaSlideshow';
import { Terminal, Smartphone, Settings, LayoutDashboard, Shield, Bot } from 'lucide-react';

const GALLERY_ITEMS = [
  { id: 1, title: "Owner Dashboard", category: "Dashboard", icon: <LayoutDashboard size={40} /> },
  { id: 2, title: "Device Pairing", category: "Pairing", icon: <Smartphone size={40} /> },
  { id: 3, title: "Main Menu", category: "Menu", icon: <Terminal size={40} /> },
  { id: 4, title: "Group Settings", category: "Settings", icon: <Settings size={40} /> },
  { id: 5, title: "Anti-Ban Protection", category: "Security", icon: <Shield size={40} /> },
  { id: 6, title: "AI Assistant", category: "Plugins", icon: <Bot size={40} /> },
];

export function Gallery() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <SectionBackground withParticles withSukunaBackground className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">

          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-4 text-glow"
            >
              GALLERY
            </motion.h1>
            <p className="text-muted-foreground text-lg">Screenshots from the Empire.</p>
          </div>

          <div className="mb-16">
            <SukunaSlideshow interval={30000} variant="gallery" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_ITEMS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="group relative aspect-[4/3] rounded-lg overflow-hidden glass-card hover:border-glow cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-card/80 to-background/80 flex items-center justify-center">
                  <div className="text-white/10 group-hover:text-primary/30 transition-colors duration-500 transform group-hover:scale-110">
                    {item.icon}
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                <div className="absolute top-4 right-4 px-3 py-1 glass text-primary text-xs font-bold uppercase tracking-wider rounded">
                  {item.category}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-cinzel font-bold text-white group-hover:text-primary transition-colors">{item.title}</h3>
                  <div className="h-0.5 w-0 bg-primary group-hover:w-12 transition-all duration-300 mt-2"></div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </SectionBackground>
    </div>
  );
}
