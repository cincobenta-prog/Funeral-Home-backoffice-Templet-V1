import { useState } from "react";
import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { Sparkles, SlidersHorizontal } from "lucide-react";

// ONLY using official images from point-intl.com and user uploaded event images
const LOOKBOOK_SETS: Record<string, CoverflowSlide[]> = {
  campaigns: [
    {
      src: "/official/awake-jordan.png",
      alt: "AWAKE NY Official Campaign by Point",
      title: "AWAKE NY",
      subtitle: "Awake NY Air Jordan 6 Campaign",
      meta: [
        { label: "Partner", value: "Jordan Brand x Awake NY" },
        { label: "Agency Direction", value: "POINT International" },
        { label: "Markets", value: "NYC / Global Wholesale" },
      ],
    },
    {
      src: "/official/tenc-campaign.jpg",
      alt: "TEN C Official Campaign by Point",
      title: "TEN C",
      subtitle: "The Original Japanese Jersey (OJJ)",
      meta: [
        { label: "Heritage", value: "Veneto, Italy" },
        { label: "Craft", value: "Garment Dyed Technical Microfibre" },
        { label: "Representation", value: "POINT Showroom" },
      ],
    },
    {
      src: "/official/champion-point.png",
      alt: "CHAMPION Official Campaign by Point",
      title: "CHAMPION",
      subtitle: "Elevated Capsule & Brand Repositioning",
      meta: [
        { label: "Scope", value: "Global Commercial Placement" },
        { label: "Category", value: "Contemporary Heritage" },
        { label: "Representation", value: "POINT Agency" },
      ],
    },
    {
      src: "/official/emporio-armani.png",
      alt: "EMPORIO ARMANI Official Campaign by Point",
      title: "EMPORIO ARMANI",
      subtitle: "Collaborative Project & Wholesale Architecture",
      meta: [
        { label: "Origin", value: "Milan, Italy" },
        { label: "Category", value: "Luxury Capsule Strategy" },
        { label: "Showroom", value: "POINT International" },
      ],
    },
    {
      src: "/official/hanes-heavyweight.jpg",
      alt: "HANES HEAVYWEIGHT Lookbook by Point",
      title: "HANES HEAVYWEIGHT",
      subtitle: "Editorial Production & Campaign Stills",
      meta: [
        { label: "Production", value: "POINT Studios" },
        { label: "Concept", value: "Heavyweight Silhouette Study" },
        { label: "Placement", value: "Global Wholesale Edit" },
      ],
    },
    {
      src: "/official/deviation.png",
      alt: "DEVIATION Commissioned Project by Point",
      title: "DEVIATION",
      subtitle: "Commissioned Cultural Project & Curation",
      meta: [
        { label: "Type", value: "Commissioned Project" },
        { label: "Curators", value: "POINT International" },
        { label: "Focus", value: "Music, Culture & Apparel" },
      ],
    },
  ],
  activations: [
    {
      src: "/events/point-session-5.jpg",
      alt: "TAVI STORE Live Jam Session by Point",
      title: "TAVI STORE LIVE SESSION",
      subtitle: "Point Underground Showroom Activation",
      meta: [
        { label: "Location", value: "TAVI Store" },
        { label: "Vibe", value: "Live Synthesizers & Brass" },
        { label: "Production", value: "POINT Cultural Collective" },
      ],
    },
    {
      src: "/events/point-session-2.jpg",
      alt: "Analog Synthesis & Brass Exploration",
      title: "STAGE IN RED",
      subtitle: "Monochromatic Live Performance",
      meta: [
        { label: "Session", value: "Point Live Series" },
        { label: "Lighting", value: "Saturated Red Neon" },
        { label: "Community", value: "Independent Artists" },
      ],
    },
    {
      src: "/events/point-session-1.jpg",
      alt: "The Collective In Rhythm",
      title: "THE COLLECTIVE",
      subtitle: "Multi-Instrumentalist Jam",
      meta: [
        { label: "Performers", value: "Synthesizer & Guitars" },
        { label: "Atmosphere", value: "Raw Creative Energy" },
        { label: "Curator", value: "POINT International" },
      ],
    },
    {
      src: "/events/point-session-4.jpg",
      alt: "Percussion & Drum Dynamics",
      title: "PERCUSSION RESONANCE",
      subtitle: "Live Acoustic & Electronic Beats",
      meta: [
        { label: "Focus", value: "Drum Dynamics" },
        { label: "Event", value: "Showroom Opening Night" },
        { label: "Energy", value: "Pure Underground" },
      ],
    },
    {
      src: "/events/point-session-3.jpg",
      alt: "Backstage Community & Apparel",
      title: "COMMUNITY & APPAREL",
      subtitle: "Dialogue, Music & Streetwear",
      meta: [
        { label: "Space", value: "Backstage Gallery" },
        { label: "Network", value: "Designers & Musicians" },
        { label: "Ecosystem", value: "POINT Network" },
      ],
    },
    {
      src: "/official/contact-point.jpg",
      alt: "POINT Showroom Archive",
      title: "POINT SHOWROOM ARCHIVE",
      subtitle: "Product Lifecycle Management Space",
      meta: [
        { label: "Function", value: "Private Showroom" },
        { label: "Heritage", value: "20+ Years Agency History" },
        { label: "Hubs", value: "Paris / Milan / NYC" },
      ],
    },
  ],
};

export function CollectionsShowcase() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "activations">("campaigns");
  const [showCaption, setShowCaption] = useState(true);
  const [showNavigation, setShowNavigation] = useState(true);
  const [showPagination, setShowPagination] = useState(true);

  const currentSlides = LOOKBOOK_SETS[activeTab];

  return (
    <section id="collections" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 relative">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-rose-500 font-mono text-xs uppercase tracking-widest mb-2">
              <Sparkles className="size-3.5" />
              <span>INTERACTIVE 3D COVERFLOW</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Official Campaigns & Activations
            </h2>
            <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-2xl">
              Swipe or drag to navigate the dimensional 3D Coverflow carousel featuring official Point campaigns, brand collaborations, and live cultural sessions.
            </p>
          </div>

          {/* Collection Tabs & Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-1 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-1">
              <button
                onClick={() => setActiveTab("campaigns")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                  activeTab === "campaigns"
                    ? "bg-rose-600 text-white shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                BRAND CAMPAIGNS
              </button>
              <button
                onClick={() => setActiveTab("activations")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                  activeTab === "activations"
                    ? "bg-rose-600 text-white shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                LIVE SESSIONS
              </button>
            </div>

            {/* Quick Toggle Controls */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900/70 border border-zinc-800 rounded-xl px-3 py-1.5">
              <span className="text-zinc-500 font-mono flex items-center gap-1">
                <SlidersHorizontal className="size-3" /> Controls:
              </span>
              <button
                onClick={() => setShowCaption(!showCaption)}
                className={`px-2 py-1 rounded transition-colors ${
                  showCaption ? "text-rose-400 bg-rose-950/40" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Captions {showCaption ? "ON" : "OFF"}
              </button>
              <button
                onClick={() => setShowNavigation(!showNavigation)}
                className={`px-2 py-1 rounded transition-colors ${
                  showNavigation ? "text-rose-400 bg-rose-950/40" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Arrows {showNavigation ? "ON" : "OFF"}
              </button>
              <button
                onClick={() => setShowPagination(!showPagination)}
                className={`px-2 py-1 rounded transition-colors ${
                  showPagination ? "text-rose-400 bg-rose-950/40" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Dots {showPagination ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </div>

        {/* 3D Coverflow Component integration */}
        <div className="glass-panel rounded-3xl p-4 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden border border-zinc-800">
          <div className="absolute top-4 right-6 text-[11px] font-mono text-zinc-500 flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
            <span>DRAG OR USE ARROW KEYS</span>
          </div>

          <CoverflowCarousel
            slides={currentSlides}
            showCaption={showCaption}
            showNavigation={showNavigation}
            showPagination={showPagination}
            rotate={38}
            depth={0.7}
            perspective={2.8}
            cardWidth="clamp(200px, 28vw, 320px)"
            className="py-4"
          />
        </div>
      </div>
    </section>
  );
}
