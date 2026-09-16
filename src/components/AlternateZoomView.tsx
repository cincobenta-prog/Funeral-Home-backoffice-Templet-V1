import { useState } from "react";
import { ZoomSlider, type ZoomSliderItem, POINT_SLIDER_DATA } from "@/components/ui/zoom-slider";
import { ArrowLeft, Sparkles, Sliders, Eye, X, CheckCircle2 } from "lucide-react";

interface AlternateZoomViewProps {
  onBackToEditorial: () => void;
  onOpenBooking: () => void;
}

export function AlternateZoomView({ onBackToEditorial, onOpenBooking }: AlternateZoomViewProps) {
  const [selectedItem, setSelectedItem] = useState<ZoomSliderItem | null>(null);
  const [scaleOnHover, setScaleOnHover] = useState(true);
  const [textOnHover, setTextOnHover] = useState(true);
  const [zoomSize, setZoomSize] = useState(1);
  const [showControls, setShowControls] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans select-none">
      {/* Top Floating Glass Navigation */}
      <header className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToEditorial}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-700 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-all backdrop-blur-md shadow-lg"
          >
            <ArrowLeft className="size-3.5 text-rose-500" />
            <span>Standard View</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800 text-[11px] font-mono text-zinc-400 backdrop-blur-md">
            <span className="size-2 rounded-full bg-rose-500 animate-ping" />
            <span>IMMERSIVE ZOOM MODE</span>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowControls(!showControls)}
            className={`p-2 sm:px-3 sm:py-2 rounded-full border text-xs font-mono transition-all backdrop-blur-md flex items-center gap-1.5 ${
              showControls
                ? "bg-rose-600 border-rose-500 text-white"
                : "bg-zinc-950/80 border-zinc-700 text-zinc-300 hover:text-white"
            }`}
          >
            <Sliders className="size-3.5" />
            <span className="hidden sm:inline">Settings</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] backdrop-blur-md"
          >
            <Sparkles className="size-3.5" />
            <span className="hidden sm:inline">Book Showroom</span>
            <span className="sm:hidden">Book</span>
          </button>
        </div>
      </header>

      {/* Settings Flyout Drawer */}
      {showControls && (
        <div className="absolute top-20 right-4 sm:right-6 z-30 glass-panel rounded-2xl p-4 border border-zinc-700 shadow-2xl w-64 space-y-3 animate-fade-in text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-300 font-mono">
            <span>Slider Controls</span>
            <button onClick={() => setShowControls(false)} className="text-zinc-500 hover:text-white">✕</button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Text on Hover:</span>
            <button
              onClick={() => setTextOnHover(!textOnHover)}
              className={`px-2.5 py-1 rounded font-mono ${
                textOnHover ? "bg-rose-600 text-white" : "bg-zinc-800 text-zinc-500"
              }`}
            >
              {textOnHover ? "ON" : "OFF"}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Scale on Hover:</span>
            <button
              onClick={() => setScaleOnHover(!scaleOnHover)}
              className={`px-2.5 py-1 rounded font-mono ${
                scaleOnHover ? "bg-rose-600 text-white" : "bg-zinc-800 text-zinc-500"
              }`}
            >
              {scaleOnHover ? "ON" : "OFF"}
            </button>
          </div>

          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-zinc-400">
              <span>Card Scale:</span>
              <span className="font-mono text-white">{zoomSize}x</span>
            </div>
            <div className="flex gap-1.5">
              {[0.8, 1.0, 1.2].map((s) => (
                <button
                  key={s}
                  onClick={() => setZoomSize(s)}
                  className={`flex-1 py-1 rounded font-mono ${
                    zoomSize === s ? "bg-rose-600 text-white font-bold" : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Fullscreen Zoom Slider Component */}
      <ZoomSlider
        title="POINT INTL."
        subheading="Interactive 3D Zoom Archive • Scroll or Drag Anywhere"
        sliderData={POINT_SLIDER_DATA}
        scaleOnHover={scaleOnHover}
        textOnHover={textOnHover}
        size={zoomSize}
        easeScrollPercentage={100}
        onItemClick={(item) => setSelectedItem(item)}
      />

      {/* Bottom Status bar */}
      <footer className="absolute bottom-4 left-6 right-6 z-20 flex items-center justify-between text-[11px] font-mono text-zinc-500 pointer-events-none">
        <div className="hidden sm:flex items-center gap-3">
          <span>PARIS • MILAN • NYC • TOKYO</span>
          <span>•</span>
          <span>POINT SHOWROOM ARCHIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="size-3 text-rose-500" />
          <span>Click any card for dossier</span>
        </div>
      </footer>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-panel max-w-xl w-full rounded-3xl border border-zinc-700 p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white"
            >
              <X className="size-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-rose-600/20 border border-rose-500/40 text-rose-400 text-xs font-mono uppercase">
                  ITEM {selectedItem.number}
                </span>
                <span className="text-xs text-zinc-400 font-mono">POINT VAULT ARCHIVE</span>
              </div>

              <div className="aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {selectedItem.title}
                </h3>
                <p className="mt-2 text-zinc-300 text-sm leading-relaxed">
                  {selectedItem.desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="font-mono">Curated By:</span>
                  <span className="text-white font-medium">POINT International Agency</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="font-mono">Authenticity:</span>
                  <span className="text-rose-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="size-3.5" /> Official Roster Asset
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white"
                >
                  Close Dossier
                </button>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    onOpenBooking();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white shadow-lg"
                >
                  Inquire Showroom
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
