import { Link } from 'wouter';
import { FaDiscord, FaGithub, FaTiktok, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import logo from '@assets/generated_images/reaper-logo-sm.png';

export function Footer() {
  return (
    <footer className="border-t border-primary/20 pt-16 pb-8 relative overflow-hidden glass">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/5 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="Reaper Empire Bot"
                className="h-12 w-12 object-contain drop-shadow-[0_0_10px_rgba(220,20,60,0.7)]"
              />
              <span className="text-2xl font-scary font-bold text-primary text-glow">
                REAPER EMPIRE BOT
              </span>
            </Link>
            <p className="text-white/60 max-w-sm">
              Forged in darkness. Built for power. The ultimate WhatsApp automation and group management experience for power users.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a href="#" aria-label="Discord" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-primary hover:glow-red transition-all">
                <FaDiscord size={18} />
              </a>
              <a href="#" aria-label="GitHub" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-primary hover:glow-red transition-all">
                <FaGithub size={18} />
              </a>
              <a href="#" aria-label="TikTok" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-primary hover:glow-red transition-all">
                <FaTiktok size={18} />
              </a>
              <a href="#" aria-label="WhatsApp" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-primary hover:glow-red transition-all">
                <FaWhatsapp size={18} />
              </a>
              <a href="https://t.me/THE_REAPERDEV" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-primary hover:glow-red transition-all">
                <FaTelegram size={18} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-foreground font-cinzel font-bold tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-white/60 hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/commands" className="text-white/60 hover:text-primary transition-colors">Commands List</Link></li>
              <li><Link href="/how-it-works" className="text-white/60 hover:text-primary transition-colors">How to Pair</Link></li>
              <li><Link href="/pricing" className="text-white/60 hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-foreground font-cinzel font-bold tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li>
                <div className="text-primary text-xs font-bold uppercase tracking-wider">Owner</div>
                <div className="text-white/90 font-mono text-sm">𒋲ᬼ⃟𓁹 THE REAPER EMPIRE BOT</div>
                <div className="text-white/60 font-mono text-sm">+234 814 831 0933</div>
              </li>
              <li>
                <div className="text-primary text-xs font-bold uppercase tracking-wider">Dev</div>
                <div className="text-white/90 font-mono text-sm">𒋲ᬼ⃟𓁹 𖤍𒋲ᬼ⃟𓁹S²十ƬƐƦƦꙮƦïṨT𒋲ᬼ⃟𓁹𖤍</div>
                <div className="text-white/60 font-mono text-sm">+234 903 565 9542</div>
              </li>
              <li className="pt-4">
                <Link href="/test" className="text-primary hover:text-white transition-colors text-sm font-bold border-b border-primary/30 pb-1">
                  Connect Your Bot Now
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            &copy; 2026 Reaper Empire Bot. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/60 hover:text-foreground transition-colors">Documentation</a>
            <a href="#" className="text-white/60 hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
