import { Quote, Sparkles } from "lucide-react";

const PRESS_ITEMS = [
  {
    outlet: "HYPEBEAST",
    quote: "Point is pioneering a thoughtful alternative to the relentless churn of traditional fashion showrooms.",
    badge: "Industry Feature",
  },
  {
    outlet: "WOMEN'S WEAR DAILY",
    quote: "Managing the nuanced product lifecycle and positioning progressive global brands without market dilution.",
    badge: "Wholesale Analysis",
  },
  {
    outlet: "HIGHSNOBIETY",
    quote: "Point bridges underground subcultural vitality with rigorous commercial tier-1 placement.",
    badge: "Culture & Commerce",
  },
  {
    outlet: "VOGUE BUSINESS",
    quote: "A masterclass in sustainable brand equity and long-term narrative integrity.",
    badge: "Agency Spotlight",
  },
  {
    outlet: "BUSINESS OF FASHION",
    quote: "An essential ecosystem partner for designers seeking genuine commercial longevity.",
    badge: "Market Report",
  },
];

export function PressTicker() {
  return (
    <section id="press" className="py-20 bg-zinc-950 border-t border-b border-zinc-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-2">
        <div className="inline-flex items-center gap-2 text-rose-500 font-mono text-xs uppercase tracking-widest">
          <Sparkles className="size-3.5" />
          <span>EDITORIAL & INDUSTRY RECOGNITION</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
          Voices From The Industry
        </h2>
      </div>

      {/* Infinite Scrolling Ticker */}
      <div className="relative flex overflow-x-hidden">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-6 shrink-0 py-2">
          {[...PRESS_ITEMS, ...PRESS_ITEMS].map((item, index) => (
            <div
              key={`${item.outlet}-${index}`}
              className="glass-panel w-[320px] sm:w-[420px] rounded-2xl p-6 border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-rose-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-black tracking-wider text-base sm:text-lg text-white">
                  {item.outlet}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 text-[10px] font-mono text-rose-400 border border-zinc-800">
                  {item.badge}
                </span>
              </div>

              <p className="text-zinc-300 text-xs sm:text-sm italic leading-relaxed">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-2 text-zinc-600">
                <Quote className="size-4 text-rose-600" />
                <span className="text-[11px] font-mono text-zinc-500">POINT International Review</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
