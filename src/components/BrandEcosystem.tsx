import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";

interface BrandItem {
  id: string;
  name: string;
  category: "Collaborative Projects" | "Technical Outerwear" | "Contemporary RTW" | "Footwear & Luxury";
  origin: string;
  description: string;
  image: string;
  logo: string;
  keyRetailers: string[];
  featuredIn: string[];
  lifecycleStage: string;
}

// ONLY using official images and brand assets from point-intl.com
const BRANDS: BrandItem[] = [
  {
    id: "awake-ny",
    name: "AWAKE NY",
    category: "Contemporary RTW",
    origin: "New York, USA",
    description: "Capturing the unique cultural spirit of New York City through eclectic graphics, tailored fleece, Jordan Brand collaborations, and community-driven street culture.",
    image: "/official/awake-jordan.png",
    logo: "/official/awake-logo.png",
    keyRetailers: ["Dover Street Market", "SSENSE", "Kith", "Slam Jam"],
    featuredIn: ["Hypebeast", "GQ", "Vogue", "Highsnobiety"],
    lifecycleStage: "Global Strategic Growth",
  },
  {
    id: "ten-c",
    name: "TEN C",
    category: "Technical Outerwear",
    origin: "Veneto, Italy",
    description: "The Emperor’s New Clothes. Timeless, non-branded garments crafted exclusively with proprietary OJJ fabric that molds to the wearer over decades.",
    image: "/official/tenc-campaign.jpg",
    logo: "/official/tenc-logo.png",
    keyRetailers: ["MR PORTER", "End Clothing", "Matches", "GR8 Tokyo"],
    featuredIn: ["WWD", "Monocle", "Highsnobiety"],
    lifecycleStage: "Heritage Preservation",
  },
  {
    id: "champion",
    name: "CHAMPION",
    category: "Contemporary RTW",
    origin: "Tokyo / Global",
    description: "Elevated capsule direction and architectural minimalism meeting authentic sportswear heritage in curated global concept stores.",
    image: "/official/champion-point.png",
    logo: "/official/champion-logo.png",
    keyRetailers: ["Point Showroom Exclusive", "Selected Global Boutiques"],
    featuredIn: ["Fashionsnap Tokyo", "Eye_C Mag", "Hypebeast"],
    lifecycleStage: "Capsule Repositioning",
  },
  {
    id: "emporio-armani",
    name: "EMPORIO ARMANI",
    category: "Footwear & Luxury",
    origin: "Milan, Italy",
    description: "Strategic partnerships and contemporary wholesale placement for special projects, tailored sportswear, and elevated footwear.",
    image: "/official/emporio-armani.png",
    logo: "/official/armani-logo.png",
    keyRetailers: ["Selfridges", "Harrods", "Saks Fifth Avenue", "Lane Crawford"],
    featuredIn: ["Vogue Runway", "WWD", "BoF", "Dazed"],
    lifecycleStage: "Luxury Wholesale Strategy",
  },
  {
    id: "hanes-heavyweight",
    name: "HANES HEAVYWEIGHT",
    category: "Collaborative Projects",
    origin: "USA / Global",
    description: "Campaign film and photo production showcasing heavy-gauge cotton basics reimagined for modern streetwear and contemporary tailoring silhouettes.",
    image: "/official/hanes-heavyweight.jpg",
    logo: "/official/supervsn-logo.png",
    keyRetailers: ["Concept Stores", "Point Pop-Up Spaces"],
    featuredIn: ["Highsnobiety", "Hypebeast", "WWD"],
    lifecycleStage: "Editorial Production",
  },
  {
    id: "deviation-slamjam",
    name: "DEVIATION",
    category: "Collaborative Projects",
    origin: "London / Milan",
    description: "Commissioned cultural projects and brand consulting merging cutting-edge sound curation, club culture, and limited-edition apparel drops.",
    image: "/official/deviation.png",
    logo: "/official/slamjam-logo.png",
    keyRetailers: ["Slam Jam Milan", "Point Showroom Events"],
    featuredIn: ["Dazed", "Crack Magazine", "Resident Advisor"],
    lifecycleStage: "Commissioned Cultural Project",
  },
];

const CATEGORIES = [
  "All Categories",
  "Contemporary RTW",
  "Technical Outerwear",
  "Footwear & Luxury",
  "Collaborative Projects",
];

export function BrandEcosystem() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [activeBrand, setActiveBrand] = useState<BrandItem | null>(null);

  const filteredBrands =
    selectedCategory === "All Categories"
      ? BRANDS
      : BRANDS.filter((b) => b.category === selectedCategory);

  return (
    <section id="ecosystem" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-8">
        <div>
          <div className="flex items-center gap-2 text-rose-500 font-mono text-xs uppercase tracking-widest mb-2">
            <Sparkles className="size-3.5" />
            <span>OFFICIAL ROSTER & BRAND PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            The Brand Ecosystem
          </h2>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-2xl">
            Authentic campaigns and strategic partnerships managed by POINT International, bridging creative direction and tier-1 global wholesale.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-white text-zinc-950 shadow-md font-semibold"
                  : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredBrands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => setActiveBrand(brand)}
            className="group glass-panel rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-rose-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(225,29,72,0.2)]"
          >
            {/* Image Banner */}
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950 flex items-center justify-center">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
              
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md text-[11px] font-mono text-zinc-300 border border-zinc-700/50">
                {brand.origin}
              </div>

              <div className="absolute top-3 right-3 p-2 rounded-full bg-zinc-950/70 text-white group-hover:bg-rose-600 transition-colors">
                <ArrowUpRight className="size-4" />
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 block mb-0.5">
                    {brand.category}
                  </span>
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-rose-400 transition-colors">
                    {brand.name}
                  </h3>
                </div>
                {brand.logo && (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-6 max-w-[80px] object-contain filter invert opacity-80"
                  />
                )}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-zinc-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                {brand.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-zinc-800/60 text-[11px]">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="font-mono text-zinc-500">Lifecycle Status:</span>
                  <span className="text-white font-medium">{brand.lifecycleStage}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="font-mono text-zinc-500">Key Stockists:</span>
                  <span className="text-zinc-300 truncate max-w-[180px]">
                    {brand.keyRetailers.slice(0, 2).join(", ")} +
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Brand Details Modal */}
      {activeBrand && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-panel max-w-2xl w-full rounded-3xl border border-zinc-700 p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveBrand(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-rose-600/20 border border-rose-500/40 text-rose-400 text-xs font-mono uppercase">
                    {activeBrand.category}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">{activeBrand.origin}</span>
                </div>
                {activeBrand.logo && (
                  <img
                    src={activeBrand.logo}
                    alt={activeBrand.name}
                    className="h-7 w-auto max-w-[100px] object-contain filter invert opacity-90"
                  />
                )}
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
                <img
                  src={activeBrand.image}
                  alt={activeBrand.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-3xl font-display font-bold text-white">{activeBrand.name}</h3>
                <p className="mt-3 text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {activeBrand.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div>
                  <h4 className="text-xs font-mono text-zinc-400 uppercase mb-2">Key Retail Stockists</h4>
                  <ul className="space-y-1 text-xs text-white">
                    {activeBrand.keyRetailers.map((ret) => (
                      <li key={ret} className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-3.5 text-rose-500" />
                        <span>{ret}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-mono text-zinc-400 uppercase mb-2">Press & Features</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeBrand.featuredIn.map((press) => (
                      <span
                        key={press}
                        className="px-2 py-1 rounded bg-zinc-800 text-[11px] text-zinc-300 font-mono"
                      >
                        {press}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setActiveBrand(null)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
