import { ArrowDown, Globe2, ShieldCheck, Layers } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section id="manifesto" className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-10 w-[350px] h-[350px] bg-red-800/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-8">
        {/* Subheader Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 font-mono tracking-widest uppercase animate-fade-in shadow-inner">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
          <span>GLOBAL SHOWROOM & BRAND INCUBATOR</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto">
          SOLVING FOR THE{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-300 to-white">
            MISSING SPACE
          </span>{" "}
          IN FASHION.
        </h1>

        {/* Official Manifesto */}
        <p className="text-base sm:text-lg lg:text-xl text-zinc-300/90 max-w-3xl mx-auto font-light leading-relaxed">
          Born from the passions of like-minded individuals, <strong className="text-white font-semibold">POINT</strong> believes in solving for the missing space in fashion, where traditional showrooms focus solely on volume in sales. We are here to manage the product lifecycle and allow a brand to live in the ecosystem without being thrust into an oversaturated market.
        </p>

        {/* Metrics / Pillars Pills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-zinc-400 font-medium">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800/80">
            <Globe2 className="size-4 text-rose-500" />
            <span>20+ Years Global Heritage</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800/80">
            <ShieldCheck className="size-4 text-rose-500" />
            <span>Curated Retail Ecosystems</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800/80">
            <Layers className="size-4 text-rose-500" />
            <span>Full Lifecycle Management</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#collections"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-zinc-950 font-semibold hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
          >
            Explore Brand Collections
          </a>
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-white font-semibold transition-all duration-300 hover:border-rose-500/50"
          >
            Schedule Showroom Meeting
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="mt-14 sm:mt-20 flex flex-col items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-widest animate-bounce">
        <span>Scroll to Explore</span>
        <ArrowDown className="size-4 text-rose-500" />
      </div>
    </section>
  );
}
