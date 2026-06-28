import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionBackground } from '../components/SectionBackground';
import { Activity, Cpu, HardDrive, Terminal, Shield, Zap, ToggleRight, ToggleLeft, LayoutDashboard } from 'lucide-react';
import { SukunaSlideshow } from '../components/SukunaSlideshow';

const LOGS = [
  "[12:34:01] SYSTEM: Reaper Empire Session initialized.",
  "[12:34:02] NETWORK: Connecting to WhatsApp Web API...",
  "[12:34:05] SYSTEM: Authentication successful. JID active.",
  "[12:34:10] #ping → Pong! (42ms)",
  "[12:34:15] #8ball Will I win? → Yes, definitely!",
  "[12:35:02] OWNER: #antidelete on → Anti-delete enabled",
  "[12:35:44] #uptime → Bot uptime: 3 days, 4 hours",
  "[12:36:12] GROUP: Message deleted by user +1234567890",
  "[12:36:13] SYSTEM: Recovered deleted message in logs.",
  "[12:38:00] #sticker → Creating sticker from image...",
  "[12:38:02] SYSTEM: Sticker generation complete."
];

export function DashboardPreview() {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < LOGS.length) {
        setVisibleLogs(prev => [...prev, LOGS[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SectionBackground withSukunaBackground className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">

          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-white text-glow mb-2">COMMAND CENTER</h1>
              <p className="text-white/60">A preview of your bot management dashboard</p>
            </div>
            <div className="px-4 py-2 glass text-primary font-mono text-sm inline-flex items-center gap-2 self-start md:self-auto">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              CONNECTED: +1 (555) 019-8472
            </div>
          </div>

          <div className="mb-8">
            <SukunaSlideshow interval={30000} variant="gallery" />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Bot Status" value="ACTIVE" icon={<Activity size={20} className="text-green-500" />} valueColor="text-green-500" />
            <StatCard title="Active Sessions" value="1" icon={<LayoutDashboard size={20} className="text-primary" />} />
            <StatCard title="Commands Run" value="4,892" icon={<Terminal size={20} className="text-primary" />} />
            <StatCard title="Uptime" value="99.8%" icon={<Zap size={20} className="text-primary" />} />
          </div>

          {/* System Usage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold flex items-center gap-2"><HardDrive size={18} className="text-white/50" /> Memory Usage</h3>
                <span className="text-primary font-mono font-bold">42%</span>
              </div>
              <div className="w-full bg-background/80 rounded-full h-2 border border-white/5 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '42%' }} transition={{ duration: 1, ease: "easeOut" }} className="bg-primary h-full rounded-full glow-red"></motion.div>
              </div>
              <p className="text-xs text-white/50 mt-2 text-right">420MB / 1024MB</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold flex items-center gap-2"><Cpu size={18} className="text-white/50" /> CPU Usage</h3>
                <span className="text-primary font-mono font-bold">18%</span>
              </div>
              <div className="w-full bg-background/80 rounded-full h-2 border border-white/5 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '18%' }} transition={{ duration: 1, ease: "easeOut" }} className="bg-primary h-full rounded-full glow-red"></motion.div>
              </div>
              <p className="text-xs text-white/50 mt-2 text-right">18% of allocated core</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Plugins */}
            <div className="lg:col-span-1 glass-card overflow-hidden">
              <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-white font-bold flex items-center gap-2"><Shield size={18} className="text-primary" /> Active Plugins</h3>
              </div>
              <div className="divide-y divide-white/5">
                <PluginRow name="Anti-Delete" enabled={true} />
                <PluginRow name="Anti-Call" enabled={true} />
                <PluginRow name="Auto-Reply" enabled={false} />
                <PluginRow name="AI Features" enabled={true} />
                <PluginRow name="Downloader" enabled={true} />
              </div>
            </div>

            {/* Terminal */}
            <div className="lg:col-span-2 bg-black/80 border border-white/10 rounded-lg overflow-hidden flex flex-col h-[400px] backdrop-blur-sm">
              <div className="p-3 glass border-b border-white/10 flex items-center gap-2">
                <Terminal size={16} className="text-primary" />
                <span className="text-sm font-mono text-white/60">Live Command Log</span>
              </div>
              <div className="p-4 font-mono text-sm overflow-y-auto flex-1 flex flex-col justify-end">
                <div className="space-y-1">
                  {visibleLogs.filter(Boolean).map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={
                        log?.includes('SYSTEM:') ? 'text-blue-400' :
                        log?.includes('OWNER:') ? 'text-primary font-bold' :
                        log?.includes('GROUP:') ? 'text-yellow-400' :
                        log?.includes('NETWORK:') ? 'text-purple-400' :
                        'text-gray-300'
                      }
                    >
                      {log}
                    </motion.div>
                  ))}
                  {visibleLogs.length > 0 && (
                    <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="text-primary font-bold mt-2">_</motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-white/60 inline-block px-4 py-2 border border-white/5 rounded-full glass">
              This is a static preview. Full dashboard available after pairing your bot.
            </p>
          </div>

        </div>
      </SectionBackground>
    </div>
  );
}

function StatCard({ title, value, icon, valueColor = "text-white" }: { title: string, value: string, icon: React.ReactNode, valueColor?: string }) {
  return (
    <div className="glass-card p-6 hover:border-primary/30 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-white/50 text-sm font-bold uppercase tracking-wider">{title}</h3>
        <div className="p-2 bg-background/80 rounded-md border border-white/5">{icon}</div>
      </div>
      <div className={`text-3xl font-bold font-mono ${valueColor}`}>{value}</div>
    </div>
  );
}

function PluginRow({ name, enabled }: { name: string, enabled: boolean }) {
  return (
    <div className="p-4 flex justify-between items-center hover:bg-white/[0.02] transition-colors">
      <span className="text-sm font-medium text-white">{name}</span>
      {enabled ? (
        <ToggleRight size={24} className="text-primary" />
      ) : (
        <ToggleLeft size={24} className="text-white/40" />
      )}
    </div>
  );
}
