import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Sparkles, Layers } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
  onToggleZoomView: () => void;
}

export function Navbar({ onOpenBooking, onToggleZoomView }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Manifesto", href: "#manifesto" },
    { name: "Collections", href: "#collections" },
    { name: "Ecosystem", href: "#ecosystem" },
    { name: "Services", href: "#services" },
    { name: "Activations", href: "#activations" },
    { name: "Press", href: "#press" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Official point-intl logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src="/official/point-logo.png" 
            alt="POINT International" 
            className="h-6 sm:h-7 w-auto object-contain filter invert opacity-90 group-hover:opacity-100 transition-opacity" 
          />
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse-subtle group-hover:scale-150 transition-transform"></span>
          <span className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase hidden sm:inline-block font-mono border-l border-zinc-700 pl-2 ml-1">
            SHOWROOM • AGENCY
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-rose-500 hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
          
          {/* Alternate View Switcher */}
          <button
            onClick={onToggleZoomView}
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full bg-zinc-900/90 border border-rose-500/40 text-rose-400 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
          >
            <Layers className="size-3.5" />
            <span>3D Zoom View</span>
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-full bg-zinc-900 border border-rose-500/40 text-white hover:bg-rose-600 hover:border-rose-500 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(225,29,72,0.4)]"
          >
            <Sparkles className="size-3.5 text-rose-400" />
            <span>Book Showroom</span>
            <ArrowUpRight className="size-3.5 opacity-70" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-zinc-800 px-6 py-6 animate-fade-in flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-200 hover:text-rose-400 transition-colors py-1"
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onToggleZoomView();
            }}
            className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider px-4 py-2.5 rounded-xl bg-zinc-900 border border-rose-500/50 text-rose-400 hover:bg-rose-600 hover:text-white transition-all"
          >
            <Layers className="size-4" />
            <span>Switch to 3D Zoom View</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="mt-1 w-full flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold px-4 py-3 rounded-xl bg-rose-600 text-white shadow-lg"
          >
            <Sparkles className="size-4" />
            <span>Book Showroom Appointment</span>
          </button>
        </div>
      )}
    </header>
  );
}
