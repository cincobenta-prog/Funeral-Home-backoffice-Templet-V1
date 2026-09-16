import React, { useState } from "react";
import { X, CheckCircle, Send, Sparkles } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [inquiryType, setInquiryType] = useState("Showroom Buyer Appointment");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    city: "Paris Showroom",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="glass-panel max-w-2xl w-full rounded-3xl border border-zinc-700 p-6 sm:p-8 relative shadow-2xl max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="size-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-6">
            <div className="inline-flex p-4 rounded-full bg-rose-600/20 text-rose-500 border border-rose-500/40 animate-bounce">
              <CheckCircle className="size-12" />
            </div>
            <h3 className="text-3xl font-display font-bold text-white">
              Appointment Request Received
            </h3>
            <p className="text-zinc-300 max-w-md mx-auto text-sm leading-relaxed">
              Thank you, <strong className="text-white">{formData.name}</strong>. Our commercial and showroom team will review your dossier and contact you at <span className="text-rose-400 font-mono">{formData.email}</span> within 24 hours.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-medium hover:bg-zinc-800 text-xs uppercase tracking-wider"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-rose-500 font-mono text-xs uppercase tracking-widest mb-1">
                <Sparkles className="size-3.5" />
                <span>COMMERCIAL & SHOWROOM ACCESS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Connect With POINT
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Schedule a private showroom viewing, submit a brand portfolio, or discuss strategic representation.
              </p>
            </div>

            {/* Inquiry Category Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400 block">
                Inquiry Focus
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Showroom Buyer Appointment",
                  "Brand Representation Dossier",
                  "Creative Production & Lookbook",
                  "Press & Editorial Access",
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setInquiryType(type)}
                    className={`px-3 py-2 rounded-xl text-left text-xs font-medium transition-all ${
                      inquiryType === type
                        ? "bg-rose-600 text-white shadow-md font-semibold border-rose-500"
                        : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">Your Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Elena Rostova"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">Corporate / Brand Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="elena@boutique.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">Store / Organization Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dover Street Market / Concept Lab"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">Preferred Hub Location</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-rose-500 transition-colors"
                  >
                    <option value="Paris Showroom">Paris Fashion Week Showroom</option>
                    <option value="Milan Showroom">Milan Showroom & Agency</option>
                    <option value="New York Hub">New York City Headquarters</option>
                    <option value="Tokyo Hub">Tokyo / Asia-Pacific Hub</option>
                    <option value="Digital Virtual Viewing">Digital / Virtual 3D Showroom</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">Detailed Inquiry / Target Brands</label>
                <textarea
                  rows={3}
                  placeholder="Mention target brand lines (Awake NY, Ten C, Roa), preferred dates, or specific collection needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-rose-500 transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">
                  Strictly Confidential • Point Intl.
                </span>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-[0_0_20px_rgba(225,29,72,0.4)]"
                >
                  <Send className="size-3.5" />
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
