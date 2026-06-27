import { motion } from 'framer-motion';
import { SectionBackground } from '../components/SectionBackground';
import { SukunaSlideshow } from '../components/SukunaSlideshow';

const STEPS = [
  {
    num: "01",
    title: "Enter WhatsApp Number",
    description: "Input your active WhatsApp number with the correct country code on our secure pairing page."
  },
  {
    num: "02",
    title: "Connection Request",
    description: "The website sends an encrypted request to the Reaper Empire backend servers."
  },
  {
    num: "03",
    title: "Session Initialization",
    description: "The system creates a temporary, isolated bot session waiting for your authorization."
  },
  {
    num: "04",
    title: "Code Generation",
    description: "A unique, time-sensitive 8-digit pairing code is generated specifically for your device."
  },
  {
    num: "05",
    title: "Display Code",
    description: "The pairing code appears instantly on your screen in large, easy-to-read text."
  },
  {
    num: "06",
    title: "Copy the Code",
    description: "Copy the code provided. Do not close the website or refresh the page."
  },
  {
    num: "07",
    title: "Link in WhatsApp",
    description: "Open WhatsApp > Linked Devices > Link with phone number instead. Enter the 8-digit code."
  },
  {
    num: "08",
    title: "Empire Active",
    description: "Upon successful entry, the bot session activates immediately. You are now part of the Empire."
  }
];

export function HowItWorks() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <SectionBackground className="py-8" withSukunaBackground>
        <div className="container mx-auto px-4 max-w-4xl">

          <div className="text-center mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-4 text-glow"
            >
              HOW IT WORKS
            </motion.h1>
            <p className="text-white/60 text-lg">The path to absolute control.</p>
          </div>

          <div className="mb-12">
            <SukunaSlideshow interval={30000} variant="gallery" />
          </div>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-primary/20 -translate-x-1/2 rounded"></div>

            <div className="space-y-12">
              {STEPS.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Number Node */}
                    <div className="absolute left-0 md:left-1/2 w-14 h-14 glass border-2 border-primary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(220,20,60,0.5)] z-10 md:-translate-x-1/2 mt-0">
                      <span className="font-cinzel font-bold text-primary text-xl">{step.num}</span>
                    </div>

                    {/* Content Card */}
                    <div className={`ml-20 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                      <div className="glass-card p-6 rounded-lg hover:border-primary/50 transition-colors">
                        <h3 className="text-xl font-bold text-white mb-2 font-cinzel">{step.title}</h3>
                        <p className="text-white/60">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </SectionBackground>
    </div>
  );
}
