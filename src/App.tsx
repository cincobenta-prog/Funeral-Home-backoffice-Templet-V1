import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CollectionsShowcase } from "@/components/CollectionsShowcase";
import { BrandEcosystem } from "@/components/BrandEcosystem";
import { ServicesSection } from "@/components/ServicesSection";
import { CulturalActivations } from "@/components/CulturalActivations";
import { PressTicker } from "@/components/PressTicker";
import { ContactModal } from "@/components/ContactModal";
import { Footer } from "@/components/Footer";
import { AlternateZoomView } from "@/components/AlternateZoomView";

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"editorial" | "zoom">("editorial");

  if (viewMode === "zoom") {
    return (
      <div className="min-h-screen bg-black text-foreground font-sans">
        <AlternateZoomView
          onBackToEditorial={() => setViewMode("editorial")}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
        <ContactModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onToggleZoomView={() => setViewMode("zoom")}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />
        <CollectionsShowcase />
        <BrandEcosystem />
        <ServicesSection onOpenBooking={() => setIsBookingOpen(true)} />
        <CulturalActivations />
        <PressTicker />
      </main>

      {/* Footer */}
      <Footer />

      {/* Showroom Booking / Contact Modal */}
      <ContactModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}

export default App;
