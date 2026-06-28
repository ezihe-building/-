import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { FaTelegram } from 'react-icons/fa';
import { SectionBackground } from '../components/SectionBackground';
import { SukunaSlideshow } from '../components/SukunaSlideshow';

type ConnectionState = 'idle' | 'loading' | 'success' | 'error';

export function TestBot() {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [status, setStatus] = useState<ConnectionState>('idle');
  const [pairingCode, setPairingCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setStatus('loading');
    setPairingCode(null);

    // Simulate API call
    // TODO: POST /api/pair { phoneNumber: countryCode + phone } → returns { pairingCode }
    setTimeout(() => {
      // For demo purposes, we show that it requires a real backend
      setStatus('error');
    }, 3000);
  };

  const copyToClipboard = () => {
    if (pairingCode) {
      navigator.clipboard.writeText(pairingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center">
      <SectionBackground withGlow glowPosition="center" withSukunaBackground className="w-full flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* Pairing Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-primary glow-red"></div>

              <div className="text-center mb-8">
                <h1 className="text-3xl font-cinzel font-bold text-white tracking-widest text-glow mb-2">⚡ PAIR YOUR BOT</h1>
                <p className="text-white/60 text-sm">Connect your WhatsApp number to activate The Reaper Empire Bot</p>
              </div>

              <form onSubmit={handleConnect} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider">WhatsApp Number</label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      disabled={status === 'loading'}
                      className="bg-background/80 border border-white/10 rounded-md px-3 py-3 text-white focus:outline-none focus:border-primary w-24 font-mono"
                    >
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+234">+234 (NG)</option>
                      <option value="+91">+91 (IN)</option>
                      <option value="+27">+27 (ZA)</option>
                      <option value="+62">+62 (ID)</option>
                      <option value="+55">+55 (BR)</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Enter your number..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      disabled={status === 'loading'}
                      className="flex-1 bg-background/80 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary font-mono placeholder:text-white/30 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || !phone}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-md uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:glow-red relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === 'loading' ? (
                      <><Loader2 className="animate-spin" size={20} /> CONNECTING...</>
                    ) : (
                      "CONNECT"
                    )}
                  </span>
                  {status === 'idle' && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>}
                </button>

                <div className="flex items-center justify-center gap-2 text-sm font-mono mt-4">
                  {status === 'idle' && <><span className="w-2 h-2 rounded-full bg-gray-500"></span> <span className="text-gray-400">Ready</span></>}
                  {status === 'loading' && <><span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span> <span className="text-yellow-500">Connecting to Empire Servers...</span></>}
                  {status === 'success' && <><span className="w-2 h-2 rounded-full bg-green-500"></span> <span className="text-green-500">Connected</span></>}
                  {status === 'error' && <><span className="w-2 h-2 rounded-full bg-destructive"></span> <span className="text-destructive">Failed: Backend not connected</span></>}
                </div>
              </form>

              <div className="mt-8 p-6 bg-background/60 rounded-lg border border-white/5 relative">
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4 text-center">YOUR PAIRING CODE</h3>

                <div className="flex justify-center items-center h-16 glass rounded-md mb-2">
                  {pairingCode ? (
                    <span className="text-3xl font-mono font-bold tracking-[0.2em] text-primary text-glow">{pairingCode}</span>
                  ) : (
                    <span className="text-white/40 font-mono text-sm">Waiting for pairing code...</span>
                  )}
                </div>

                {pairingCode && (
                  <button
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-center gap-2 text-sm text-white/60 hover:text-white transition-colors mt-4"
                  >
                    {copied ? <CheckCircle2 className="text-green-500" size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied to clipboard' : 'Copy Code'}
                  </button>
                )}
              </div>

              <div className="mt-8 space-y-4 text-sm text-white/60">
                <p className="font-bold text-white mb-2">Instructions:</p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Click Connect and wait for generation</li>
                  <li>Copy the 8-digit code shown above</li>
                  <li>Open WhatsApp on your phone</li>
                  <li>Go to Linked Devices {'>'} Link with phone number</li>
                  <li>Enter the code to activate</li>
                </ol>
                <div className="bg-destructive/10 border border-destructive/30 text-destructive p-3 rounded text-xs mt-4 flex items-start gap-2">
                  <span className="text-lg">⚠</span>
                  <p>Only enter your real WhatsApp number. Do not close this page while pairing is in progress.</p>
                </div>
              </div>

              {/* Telegram Pairing CTA */}
              <div className="mt-8 p-6 rounded-lg border border-primary/30 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#229ED9] flex items-center justify-center text-white shadow-lg">
                    <FaTelegram size={24} />
                  </div>
                  <div>
                    <p className="text-white font-bold mb-1">Prefer to pair on Telegram?</p>
                    <p className="text-white/60 text-xs mb-4">Click below to message the developer and get your pairing code instantly.</p>
                  </div>
                  <a
                    href="https://t.me/THE_REAPERDEV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#229ED9] hover:bg-[#1d8bc2] text-white font-bold py-3 rounded-md uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <FaTelegram size={18} />
                    Pair on Telegram
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Sukuna Slideshow */}
            <div className="hidden lg:block">
              <SukunaSlideshow interval={60000} variant="gallery" />
            </div>

          </div>
        </div>
      </SectionBackground>
    </div>
  );
}
