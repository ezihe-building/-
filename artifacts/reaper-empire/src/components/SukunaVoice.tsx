import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

import sukuna6 from '@assets/generated_images/sukuna6.jpg';

const PAGE_VOICES: Record<string, { quote: string; mood: string }> = {
  '/': {
    quote: "Welcome to the Reaper Empire. Bow, or be broken.",
    mood: "ominous and commanding",
  },
  '/features': {
    quote: "Fifty cursed commands at your fingertips. This is true power.",
    mood: "impressed and arrogant",
  },
  '/commands': {
    quote: "Memorize every word. A single mistake could cost you everything.",
    mood: "cold and threatening",
  },
  '/gallery': {
    quote: "Admire the art of destruction. It is the only beauty that matters.",
    mood: "amused and dark",
  },
  '/how-it-works': {
    quote: "Pairing is simple. Surrender your number, and the empire answers.",
    mood: "smooth and manipulative",
  },
  '/test': {
    quote: "Enter your digits, mortal. I shall forge the link myself.",
    mood: "commanding and eager",
  },
  '/dashboard': {
    quote: "The dashboard sees all. Nothing escapes the King of Curses.",
    mood: "dominant and watchful",
  },
  '/faq': {
    quote: "You have questions? I have answers. Whether you like them is irrelevant.",
    mood: "dismissive and bored",
  },
  '/pricing': {
    quote: "Power has a price. Fortunately, yours is affordable.",
    mood: "mocking and confident",
  },
};

export function SukunaVoice() {
  const [location] = useLocation();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Voices load asynchronously on most browsers; wait for them so we can pick the darkest one.
  useEffect(() => {
    if (!window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    const loadVoices = () => setVoicesReady(synth.getVoices().length > 0);
    loadVoices();
    synth.addEventListener('voiceschanged', loadVoices);
    return () => synth.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const voice = PAGE_VOICES[location] ?? PAGE_VOICES['/'];

  const pickDarkVoice = useCallback(() => {
    const voices = window.speechSynthesis?.getVoices() ?? [];
    if (voices.length === 0) return null;

    // Score voices: lower pitch/default voice language usually sounds deeper. Prefer explicit low/deep voice names.
    const deepVoiceNames = /(fred|zarvox|trinoids|bad news|evil genius|venom|daniel|albert|david|mark|tom|alex|microsoft david|microsoft mark|google uk english male|amazon russell|amazon joey|amazon matthew|wavenet|deep voice|low pitch)/i;
    const maleVoiceNames = /male|man|guy|boy/i;

    const scored = voices.map((v) => {
      let score = 0;
      if (deepVoiceNames.test(v.name)) score += 100;
      if (maleVoiceNames.test(v.name)) score += 10;
      if (v.lang.startsWith('en')) score += 5;
      return { voice: v, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored[0].voice;
  }, []);

  const speak = useCallback(() => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    // Build a slower, more menacing delivery.
    const utterance = new SpeechSynthesisUtterance(voice.quote);
    utterance.rate = 0.72;       // slow and deliberate
    utterance.pitch = 0.62;      // deep, demonic register
    utterance.volume = 1;        // full presence
    utterance.lang = 'en-US';    // keep consistent

    const preferredVoice = pickDarkVoice();
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [voice, pickDarkVoice]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {bubbleOpen && (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.9 }}
            transition={reducedMotion ? { duration: 0.1 } : undefined}
            className="max-w-xs sm:max-w-sm glass-card rounded-xl p-4 relative border-l-4 border-l-primary"
          >
            <button
              onClick={() => setBubbleOpen(false)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-primary/30 text-primary text-xs flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              aria-label="Close voice bubble"
            >
              ×
            </button>
            <p className="text-sm text-white/90 font-scary leading-relaxed">
              <span className="text-primary font-bold">Sukuna:</span> {voice.quote}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={isSpeaking ? stop : speak}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-primary/10 hover:bg-primary text-primary hover:text-white px-3 py-1.5 rounded transition-colors"
              >
                {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                {isSpeaking ? 'Stop' : 'Hear Me'}
              </button>
              {isSpeaking && (
                <div className="flex items-center gap-0.5">
                  <span className="w-1 h-3 bg-primary animate-pulse rounded-full" />
                  <span className="w-1 h-4 bg-primary animate-pulse rounded-full delay-75" />
                  <span className="w-1 h-2 bg-primary animate-pulse rounded-full delay-150" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          if (!bubbleOpen) setBubbleOpen(true);
          speak();
        }}
        className="group relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary shadow-[0_0_30px_rgba(220,20,60,0.5)] animate-pulse-glow hover:scale-110 transition-transform"
        aria-label="Sukuna voice"
      >
        <img
          src={sukuna6}
          alt="Sukuna voice"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
          <Volume2 size={10} className="text-white" />
        </div>
      </button>
    </div>
  );
}
