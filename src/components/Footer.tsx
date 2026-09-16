import React, { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Tier */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-black tracking-widest text-white">
                POINT
              </span>
              <span className="h-2 w-2 rounded-full bg-rose-500"></span>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Managing the product lifecycle and empowering visionary fashion brands to live within global retail ecosystems without oversaturation.
            </p>
            <div className="text-xs font-mono text-zinc-500">
              © {new Date().getFullYear()} POINT INTERNATIONAL. All rights reserved.
            </div>
          </div>

          {/* Showroom Locations */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white">
              Showroom Hubs
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <p className="text-white font-medium">Paris Showroom</p>
                <p className="text-zinc-500">Rue de Turenne, 3e Arrondissement</p>
              </div>
              <div className="pt-1">
                <p className="text-white font-medium">Milan Showroom</p>
                <p className="text-zinc-500">Via Tortona, Milan</p>
              </div>
              <div className="pt-1">
                <p className="text-white font-medium">New York Headquarters</p>
                <p className="text-zinc-500">SoHo / Canal District, NYC</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#manifesto" className="hover:text-white transition-colors">Manifesto</a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">3D Collections</a>
              </li>
              <li>
                <a href="#ecosystem" className="hover:text-white transition-colors">Brand Ecosystem</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services & Wholesale</a>
              </li>
              <li>
                <a href="#activations" className="hover:text-white transition-colors">Cultural Activations</a>
              </li>
              <li>
                <a href="#press" className="hover:text-white transition-colors">Press & Media</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Dispatch */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white">
              Showroom Dispatch
            </h4>
            <p className="text-xs text-zinc-400">
              Receive confidential lookbook previews and Fashion Week event invitations.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <Check className="size-4 text-rose-500" />
                <span>Subscribed to Point Dispatch</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    placeholder="buyer@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-l-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-r-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
          <div className="flex items-center gap-4">
            <a href="https://www.point-intl.com/" target="_blank" rel="noreferrer" className="hover:text-zinc-400 flex items-center gap-1">
              <span>point-intl.com</span>
              <ArrowUpRight className="size-3" />
            </a>
            <span>•</span>
            <span>Fashion Showroom & Brand Ecosystem</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-500">NYC • PAR • MIL • TYO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
