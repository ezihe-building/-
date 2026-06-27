import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Terminal } from 'lucide-react';
import { SectionBackground } from '../components/SectionBackground';
import { SukunaSlideshow } from '../components/SukunaSlideshow';

type CommandCategory = {
  name: string;
  icon: string;
  commands: { name: string; args?: string; desc: string }[];
};

const COMMANDS_DATA: CommandCategory[] = [
  {
    name: "Fun",
    icon: "🎭",
    commands: [
      { name: "#8ball", args: "[question]", desc: "Ask the magic 8ball a question" },
      { name: "#ship", args: "[name1] [name2]", desc: "Calculate relationship compatibility" },
      { name: "#rate", args: "[anything]", desc: "Rate something out of 10" },
      { name: "#compliment", desc: "Get a random compliment" },
      { name: "#quote", desc: "Get an inspirational quote" },
      { name: "#bubble", args: "[text]", desc: "Convert text to bubble letters" },
      { name: "#smallcaps", args: "[text]", desc: "Convert text to small caps" },
      { name: "#mock", args: "[text]", desc: "mOcK tHiS tExT" },
      { name: "#ascii", args: "[text]", desc: "Convert text to large ascii art" },
      { name: "#wouldyou", desc: "Play would you rather" },
      { name: "#roast", desc: "Get brutally roasted" },
      { name: "#flirt", desc: "Get a cheesy pickup line" },
    ]
  },
  {
    name: "Games",
    icon: "🎮",
    commands: [
      { name: "#guess", args: "start / [num]", desc: "Play number guessing game" },
      { name: "#dice", desc: "Roll a 6-sided die" },
      { name: "#slots", desc: "Play the slot machine" },
    ]
  },
  {
    name: "Tools",
    icon: "🛠",
    commands: [
      { name: "#ping", desc: "Check bot response time" },
      { name: "#base64encode", args: "[text]", desc: "Encode string to base64" },
      { name: "#base64decode", args: "[text]", desc: "Decode base64 to string" },
      { name: "#hash", args: "[text]", desc: "Generate MD5 hash of text" },
      { name: "#binary", args: "[text]", desc: "Convert text to binary" },
      { name: "#unbinary", args: "[binary]", desc: "Convert binary to text" },
      { name: "#wordcount", args: "[text]", desc: "Count words and characters" },
      { name: "#jid", desc: "Get current chat JID" },
      { name: "#uptime", desc: "Check how long bot has been running" },
    ]
  },
  {
    name: "Owner",
    icon: "⚙",
    commands: [
      { name: "#anticall", args: "on | off", desc: "Toggle anti-call protection" },
      { name: "#antidelete", args: "on | off", desc: "Toggle anti-delete logging" },
      { name: "#antibadword", args: "on | off | add [word]", desc: "Manage profanity filter" },
      { name: "#autoread", args: "on | off", desc: "Toggle auto-read status" },
      { name: "#react-ch", args: "[emoji]", desc: "Auto react to messages" },
      { name: "#self", desc: "Set bot to self mode (owner only)" },
      { name: "#public", desc: "Set bot to public mode" },
    ]
  },
  {
    name: "Finance",
    icon: "💰",
    commands: [
      { name: "#buycoffee", desc: "Buy the dev a coffee" },
      { name: "#pay", args: "[user] [amount]", desc: "Transfer virtual currency" },
      { name: "#wallet", desc: "Check your balance" },
      { name: "#usdt", desc: "Check current crypto rates" },
    ]
  },
  {
    name: "System",
    icon: "🔧",
    commands: [
      { name: "#genpass", desc: "Generate strong password" },
      { name: "#unlock", desc: "Unlock premium features" },
      { name: "#mypremium", desc: "Check premium status" },
      { name: "#update", desc: "Pull latest updates from repo" },
      { name: "#contact", desc: "Get owner contact card" },
      { name: "#getpp", desc: "Get user profile picture" },
      { name: "#setpp", args: "[reply image]", desc: "Set bot profile picture" },
      { name: "#link", desc: "Get group invite link" },
      { name: "#dbview", desc: "View database stats" },
    ]
  },
  {
    name: "Menus",
    icon: "📋",
    commands: [
      { name: "#animemenu", desc: "Show anime commands" },
      { name: "#gfxmenu", desc: "Show graphics commands" },
      { name: "#stickermenu", desc: "Show sticker tools" },
      { name: "#banmenu", desc: "Show moderation tools" },
      { name: "#ownermenu", desc: "Show owner only commands" },
      { name: "#gamemenu", desc: "Show all games" },
      { name: "#groupmenu", desc: "Show group management" },
    ]
  }
];

export function Commands() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedCats, setExpandedCats] = useState<string[]>(COMMANDS_DATA.map(c => c.name));

  const toggleCategory = (catName: string) => {
    setExpandedCats(prev =>
      prev.includes(catName)
        ? prev.filter(c => c !== catName)
        : [...prev, catName]
    );
  };

  const filteredData = COMMANDS_DATA.map(category => {
    const filteredCommands = category.commands.filter(cmd =>
      cmd.name.toLowerCase().includes(search.toLowerCase()) ||
      cmd.desc.toLowerCase().includes(search.toLowerCase())
    );
    return { ...category, commands: filteredCommands };
  }).filter(category => category.commands.length > 0);

  const categoriesToDisplay = activeCategory === "All"
    ? filteredData
    : filteredData.filter(c => c.name === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SectionBackground className="py-8" withSukunaBackground>
        <div className="container mx-auto px-4 max-w-5xl">

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-4 text-glow">COMMAND LIBRARY</h1>
            <p className="text-white/60">The complete list of incantations for the Reaper Empire Bot.</p>
          </div>

          <div className="mb-12">
            <SukunaSlideshow interval={30000} variant="gallery" />
          </div>

          {/* Search Bar */}
          <div className="relative mb-8 max-w-2xl mx-auto glass rounded-lg">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search commands (e.g., 'ban', 'sticker')..."
              className="w-full bg-transparent border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category Pills */}
          <div className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide hide-scrollbar">
            <button
              onClick={() => setActiveCategory("All")}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-bold text-sm transition-all border ${
                activeCategory === "All"
                  ? "bg-primary text-white border-primary glow-red"
                  : "glass text-white/70 border-white/10 hover:border-white/30"
              }`}
            >
              🌐 All
            </button>
            {COMMANDS_DATA.map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-bold text-sm transition-all border flex items-center gap-2 ${
                  activeCategory === cat.name
                    ? "bg-primary text-white border-primary glow-red"
                    : "glass text-white/70 border-white/10 hover:border-white/30"
                }`}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>

          {/* Commands List */}
          <div className="space-y-6">
            {categoriesToDisplay.length === 0 ? (
              <div className="text-center py-12 text-white/60">
                <Terminal size={48} className="mx-auto mb-4 opacity-20" />
                <p>No commands found matching "{search}"</p>
              </div>
            ) : (
              categoriesToDisplay.map((category) => (
                <div key={category.name} className="glass-card rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <h2 className="text-xl font-cinzel font-bold text-white">{category.name}</h2>
                      <span className="text-xs bg-background/80 px-2 py-1 rounded-md text-white/60 font-mono">
                        {category.commands.length}
                      </span>
                    </div>
                    <ChevronDown
                      className={`transition-transform duration-300 ${expandedCats.includes(category.name) ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedCats.includes(category.name) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                          {category.commands.map((cmd) => (
                            <div key={cmd.name} className="glass-light rounded p-4 border border-white/5 hover:border-primary/50 transition-colors group">
                              <div className="flex items-baseline gap-2 mb-2">
                                <span className="font-mono text-primary font-bold text-lg group-hover:text-glow transition-all">{cmd.name}</span>
                                {cmd.args && <span className="font-mono text-white/50 text-sm">{cmd.args}</span>}
                              </div>
                              <p className="text-sm text-white/60">{cmd.desc}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </div>

        </div>
      </SectionBackground>
    </div>
  );
}
