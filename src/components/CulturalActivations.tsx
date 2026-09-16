import { useState } from "react";
import { Music, Radio, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface EventImage {
  src: string;
  title: string;
  location: string;
  context: string;
  tag: string;
}

const ACTIVATION_PHOTOS: EventImage[] = [
  {
    src: "/events/point-session-5.jpg",
    title: "TAVI STORE • Live Jam & Showroom Launch",
    location: "Underground Creative Hub",
    context: "Live synthesizer, brass & guitar ensemble gathering the creative community and fashion tastemakers under monochromatic red lighting.",
    tag: "Live Performance",
  },
  {
    src: "/events/point-session-2.jpg",
    title: "Analog Synthesis & Brass Exploration",
    location: "Studio Stage",
    context: "Immersive soundscapes setting the mood for contemporary capsule collections.",
    tag: "Sound Curation",
  },
  {
    src: "/events/point-session-1.jpg",
    title: "The Collective In Rhythm",
    location: "Point Live Sessions",
    context: "Fusing street culture, multi-instrumentalists, and independent brand energy in real time.",
    tag: "Cultural Collective",
  },
  {
    src: "/events/point-session-4.jpg",
    title: "Percussion & Atmospheric Resonance",
    location: "Pop-Up Venue",
    context: "Live acoustic and electronic drum dynamics driving the tempo of the showroom opening night.",
    tag: "Art & Rhythm",
  },
  {
    src: "/events/point-session-3.jpg",
    title: "Community, Apparel & Dialogue",
    location: "Backstage & Gallery",
    context: "Bringing designers, musicians, and industry pioneers together into one unified creative ecosystem.",
    tag: "Community",
  },
];

export function CulturalActivations() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const activePhoto = selectedPhotoIndex !== null ? ACTIVATION_PHOTOS[selectedPhotoIndex] : null;

  const nextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % ACTIVATION_PHOTOS.length);
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(
      (selectedPhotoIndex - 1 + ACTIVATION_PHOTOS.length) % ACTIVATION_PHOTOS.length
    );
  };

  return (
    <section id="activations" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
        <div>
          <div className="flex items-center gap-2 text-rose-500 font-mono text-xs uppercase tracking-widest mb-2">
            <Radio className="size-3.5 animate-pulse" />
            <span>COMMUNITY & SOUND EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Cultural Activations & Live Sessions
          </h2>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-2xl">
            Fashion cannot exist in a vacuum. We ignite authentic community connections through live experimental music, underground pop-ups, and raw creative jam sessions.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-xl">
          <Music className="size-4 text-rose-500" />
          <span>Point Live Sessions • TAVI Store Series</span>
        </div>
      </div>

      {/* Grid of Event Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Main Featured Photo (Spans 2 columns on lg) */}
        <div
          onClick={() => setSelectedPhotoIndex(0)}
          className="lg:col-span-2 group relative aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-rose-500/60 transition-all duration-500 shadow-2xl"
        >
          <img
            src={ACTIVATION_PHOTOS[0].src}
            alt={ACTIVATION_PHOTOS[0].title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-rose-600/90 text-white text-xs font-mono tracking-wider uppercase backdrop-blur-md">
            {ACTIVATION_PHOTOS[0].tag}
          </div>

          <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white group-hover:bg-rose-600 transition-colors">
            <Maximize2 className="size-4" />
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs font-mono text-rose-400 uppercase tracking-widest block mb-1">
              {ACTIVATION_PHOTOS[0].location}
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              {ACTIVATION_PHOTOS[0].title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-zinc-300 max-w-xl line-clamp-2">
              {ACTIVATION_PHOTOS[0].context}
            </p>
          </div>
        </div>

        {/* Remaining Photos */}
        {ACTIVATION_PHOTOS.slice(1).map((photo, idx) => (
          <div
            key={photo.title}
            onClick={() => setSelectedPhotoIndex(idx + 1)}
            className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-rose-500/60 transition-all duration-500 shadow-xl"
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-zinc-950/80 text-white text-[11px] font-mono tracking-wider uppercase border border-zinc-700/50">
              {photo.tag}
            </div>

            <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white group-hover:bg-rose-600 transition-colors">
              <Maximize2 className="size-3.5" />
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest block">
                {photo.location}
              </span>
              <h4 className="text-sm sm:text-base font-display font-bold text-white truncate">
                {photo.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          {/* Top Bar */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-3 text-white">
              <span className="font-display font-bold text-lg">POINT CULTURAL ARCHIVE</span>
              <span className="text-zinc-500 font-mono text-xs">
                {selectedPhotoIndex + 1} / {ACTIVATION_PHOTOS.length}
              </span>
            </div>
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="p-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:bg-rose-600 transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Central Image with Navigation */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={prevPhoto}
              className="absolute left-2 sm:left-6 z-10 p-3 rounded-full bg-black/70 border border-zinc-700 text-white hover:bg-rose-600 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6" />
            </button>

            <img
              src={activePhoto.src}
              alt={activePhoto.title}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl border border-zinc-800"
            />

            <button
              onClick={nextPhoto}
              className="absolute right-2 sm:right-6 z-10 p-3 rounded-full bg-black/70 border border-zinc-700 text-white hover:bg-rose-600 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          {/* Caption info */}
          <div className="max-w-2xl mx-auto text-center space-y-1">
            <div className="inline-block px-3 py-1 rounded-full bg-rose-600/20 border border-rose-500/40 text-rose-400 text-xs font-mono uppercase mb-1">
              {activePhoto.tag} • {activePhoto.location}
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              {activePhoto.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              {activePhoto.context}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
