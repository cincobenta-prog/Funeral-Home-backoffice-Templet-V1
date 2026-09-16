import { 
  Compass, 
  Layers, 
  Camera, 
  Radio, 
  Flame,
  ArrowRight
} from "lucide-react";

interface ServicesSectionProps {
  onOpenBooking: () => void;
}

const SERVICES = [
  {
    icon: Compass,
    title: "Global Wholesale Strategy",
    subtitle: "Commercial Architecture & Market Entry",
    description:
      "We orchestrate selective wholesale distribution into the world's most prestigious tier-1 luxury boutiques and department stores (SSENSE, Dover Street Market, Selfridges, GR8). We avoid discount-driven oversaturation.",
    deliverables: [
      "Showroom sales campaigns in Paris, Milan & NYC",
      "Tiered regional account segmentation",
      "Credit risk & order book management",
      "Margin protection and pricing harmonization",
    ],
  },
  {
    icon: Layers,
    title: "Product Lifecycle Management",
    subtitle: "Narrative & Long-term Longevity",
    description:
      "Unlike high-volume showrooms that discard brands when season trends shift, we nurture the brand ecosystem across incubation, acceleration, and heritage maturity.",
    deliverables: [
      "Merchandising and assortment planning",
      "Fabrication and production timeline consulting",
      "SKU optimization and sell-through analytics",
      "Market feedback loop integration",
    ],
  },
  {
    icon: Camera,
    title: "Film & Photo Production",
    subtitle: "Editorial Storytelling & Digital Collateral",
    description:
      "Full-service creative production to craft arresting visuals that articulate your brand universe. From runway lookbooks to immersive campaign films.",
    deliverables: [
      "Campaign concept and creative direction",
      "Talent casting, styling & location scouting",
      "High-definition video & still photography",
      "Bespoke lookbook publication & PR kits",
    ],
  },
  {
    icon: Radio,
    title: "Cultural Activations & Events",
    subtitle: "Music Sessions, Pop-ups & Showrooms",
    description:
      "We believe culture drives commerce. We curate intimate live jam sessions, Paris Fashion Week pop-up spaces, private buyer dinners, and collaborative product drops.",
    deliverables: [
      "Temporary pop-up retail design & build",
      "Live music & audio-visual jam curation",
      "VIP buyer & press cocktail receptions",
      "Community grassroots activations",
    ],
  },
];

export function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-950/40 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-rose-500 font-mono text-xs uppercase tracking-widest">
            <Flame className="size-3.5" />
            <span>CORE PILLARS & STRATEGY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Comprehensive Brand Management & Infrastructure
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            With over two decades of international expertise, Point bridges the gap between high-level creative vision and rigorous commercial execution.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group glass-panel rounded-3xl p-8 sm:p-10 border border-zinc-800/80 hover:border-rose-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(225,29,72,0.15)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/15 transition-colors" />

                <div className="space-y-6 relative">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/60 text-rose-500 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="size-6" />
                    </div>
                    <span className="font-mono text-xs text-zinc-600">0{index + 1}</span>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-rose-400">
                      {service.subtitle}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white mt-1">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-4 border-t border-zinc-800/80 space-y-2">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block">
                      Scope of Execution:
                    </span>
                    <ul className="space-y-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-zinc-300">
                          <span className="text-rose-500 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={onOpenBooking}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 group-hover:text-rose-300 hover:underline transition-colors"
                  >
                    <span>Inquire about this capability</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
