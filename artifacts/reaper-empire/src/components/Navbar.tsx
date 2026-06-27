import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, TerminalSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Commands', href: '/commands' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Pricing', href: '/pricing' },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2 group z-50">
            <span className="text-xl md:text-2xl font-cinzel font-bold text-primary text-glow transition-all duration-300 group-hover:brightness-125">
              ⚔ REAPER EMPIRE
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? 'text-primary' : 'text-white/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <TerminalSquare size={16} />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/test"
              className="bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2 rounded-md font-bold text-sm transition-all duration-300 hover:glow-red"
            >
              Test Bot
            </Link>
          </div>

          <button
            className="lg:hidden text-foreground p-2 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-[100dvh] glass z-40 flex flex-col pt-24 px-6 border-l border-white/5"
          >
            <div className="flex flex-col gap-6 text-lg">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium border-b border-white/5 pb-4 transition-colors ${
                    location === link.href ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex flex-col gap-4 mt-8">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 text-white/70 py-2"
                >
                  <TerminalSquare size={20} />
                  <span>Dashboard Preview</span>
                </Link>

                <Link
                  href="/test"
                  className="bg-primary text-white text-center py-3 rounded-md font-bold transition-all hover:bg-primary/90 glow-red"
                >
                  Test Out The Bot Today
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
