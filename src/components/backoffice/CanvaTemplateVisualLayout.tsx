import React from 'react';
import { StorefrontDesignTemplate } from '../../lib/types/funeral';
import { cleanTemplateTitle } from '../../lib/data/canvaStorefrontCatalog';
import { 
  Heart, 
  Mail, 
  ImageIcon, 
  Bookmark, 
  Disc, 
  Bell, 
  Sparkles
} from 'lucide-react';

interface CanvaTemplateVisualLayoutProps {
  template: StorefrontDesignTemplate;
  mode?: 'card' | 'modal' | 'flipper';
  pageIndex?: number;
  sampleName?: string;
  sampleDates?: string;
  className?: string;
}

export const CanvaTemplateVisualLayout: React.FC<CanvaTemplateVisualLayoutProps> = ({
  template,
  mode: _mode = 'card',
  pageIndex: _pageIndex = 0,
  sampleName = 'Bishop Cornelius Washington',
  sampleDates = 'July 14, 1942 – September 18, 2026',
  className = ''
}) => {
  const cleanTitle = cleanTemplateTitle(template.title);
  const accent = template.accent || '#815b3e';
  const bg = template.bg || '#f9f6f0';
  const familyLower = (template.family || '').toLowerCase();
  const productType = template.product_type;

  // Determine theme style modifiers based on family keywords
  const isFloral = familyLower.includes('blossom') || familyLower.includes('rose') || familyLower.includes('orchid') || familyLower.includes('serenity');
  const isStainedGlass = familyLower.includes('cathedral') || familyLower.includes('stained') || familyLower.includes('cross');
  const isAfrican = familyLower.includes('african') || familyLower.includes('kente') || familyLower.includes('sunset') || familyLower.includes('caribbean');
  const isSepia = familyLower.includes('sepia') || familyLower.includes('vintage') || familyLower.includes('woodgrain');

  return (
    <div 
      className={`relative overflow-hidden select-none flex flex-col justify-between ${className}`}
      style={{ 
        backgroundColor: bg,
        color: '#1a1a1a'
      }}
    >
      {/* Background Texture / Pattern Overlay */}
      {isStainedGlass && (
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 30%, ${accent} 15%, transparent 60%), linear-gradient(45deg, ${accent} 25%, transparent 25%), linear-gradient(-45deg, ${accent} 25%, transparent 25%)`,
            backgroundSize: '100% 100%, 24px 24px, 24px 24px'
          }}
        />
      )}

      {isFloral && (
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse at top right, ${accent} 10%, transparent 50%), radial-gradient(ellipse at bottom left, ${accent} 10%, transparent 50%)`
          }}
        />
      )}

      {isAfrican && (
        <div 
          className="absolute inset-x-0 top-0 h-2 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${accent}, ${accent} 8px, #d97706 8px, #d97706 16px, #15803d 16px, #15803d 24px)`
          }}
        />
      )}

      {/* Decorative Ornate Double Border */}
      <div 
        className="absolute inset-1.5 border rounded pointer-events-none"
        style={{ borderColor: accent, opacity: 0.45 }}
      />
      <div 
        className="absolute inset-2.5 border rounded-xs pointer-events-none"
        style={{ borderColor: accent, opacity: 0.25, borderStyle: isSepia ? 'dashed' : 'solid' }}
      />

      {/* Corner Filigrees / Accents */}
      <div 
        className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 pointer-events-none"
        style={{ borderColor: accent, opacity: 0.7 }}
      />
      <div 
        className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 pointer-events-none"
        style={{ borderColor: accent, opacity: 0.7 }}
      />
      <div 
        className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 pointer-events-none"
        style={{ borderColor: accent, opacity: 0.7 }}
      />
      <div 
        className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 pointer-events-none"
        style={{ borderColor: accent, opacity: 0.7 }}
      />

      {/* ------------------------------------------------------------- */}
      {/* LAYOUT 1: FUNERAL PROGRAMS (4, 8, 12 Page Booklets) */}
      {/* ------------------------------------------------------------- */}
      {productType === 'program' && (
        <>
          {/* Top Bar: Family Badge & Fold Line indicator */}
          <div className="flex items-center justify-between z-10 px-2 pt-1.5">
            <span 
              className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-white shadow-2xs"
              style={{ backgroundColor: accent }}
            >
              {template.family}
            </span>
            <span className="px-1.5 py-0.2 bg-white/90 text-neutral-800 rounded text-[8px] font-mono font-bold shadow-2xs border border-neutral-200">
              {template.page_count} {template.page_count === 1 ? 'Page' : 'Pages'}
            </span>
          </div>

          {/* Center Cover Art Layout */}
          <div className="text-center my-auto z-10 px-2 py-1 flex flex-col items-center">
            {/* Arched Memorial Header */}
            <span 
              className="text-[9px] font-serif uppercase tracking-widest font-bold block"
              style={{ color: accent }}
            >
              In Loving Memory
            </span>

            {/* Title / Family Motif */}
            <h4 
              className="text-xs font-serif font-bold leading-tight line-clamp-1 mt-0.5"
              style={{ color: '#262626' }}
            >
              {cleanTitle}
            </h4>

            {/* Framed Oval/Rectangular Portrait Placeholder Window */}
            <div 
              className="w-14 h-16 sm:w-16 sm:h-20 my-1 rounded-full border-2 border-amber-400/80 bg-white/80 shadow-xs flex flex-col items-center justify-center relative overflow-hidden group/frame"
              style={{ borderColor: accent }}
            >
              <div 
                className="absolute inset-0 opacity-10"
                style={{ backgroundColor: accent }}
              />
              <ImageIcon className="w-5 h-5 mb-0.5 text-neutral-400" />
              <span className="text-[7px] font-sans font-bold text-neutral-500 uppercase tracking-tighter">
                Portrait
              </span>
            </div>

            {/* Decedent Sample Name & Dates */}
            <div className="text-center w-full">
              <span 
                className="text-[10px] font-bold font-serif block leading-tight text-neutral-900 line-clamp-1"
              >
                {sampleName}
              </span>
              <span className="text-[8px] text-neutral-600 block mt-0.5 font-serif italic">
                {sampleDates}
              </span>
            </div>
          </div>

          {/* Bottom Bar: Spine Fold & Benta Crest */}
          <div className="flex items-center justify-between z-10 px-2 pb-1.5 pt-1 border-t border-black/5 text-[8px]">
            <span className="text-neutral-500 font-serif italic truncate max-w-[120px]">
              Benta's Funeral Home
            </span>
            <span 
              className="font-bold font-mono text-[8px] px-1 py-0.2 rounded bg-black/5"
              style={{ color: accent }}
            >
              {template.displayed_size}
            </span>
          </div>
        </>
      )}

      {/* ------------------------------------------------------------- */}
      {/* LAYOUT 2: PRAYER CARDS (2.5" x 4.25" Wallet Devotionals) */}
      {/* ------------------------------------------------------------- */}
      {productType === 'prayer' && (
        <>
          <div className="flex items-center justify-between z-10 px-2 pt-1.5">
            <span 
              className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: accent }}
            >
              Prayer Card
            </span>
            <Heart className="w-3 h-3" style={{ color: accent }} />
          </div>

          <div className="text-center my-auto z-10 px-3 py-1 flex flex-col items-center">
            <span className="text-[8px] font-serif uppercase tracking-widest font-bold" style={{ color: accent }}>
              The Lord's Prayer
            </span>

            {/* Oval Portrait */}
            <div 
              className="w-12 h-14 my-1.5 rounded-full border-2 bg-white shadow-xs flex flex-col items-center justify-center overflow-hidden"
              style={{ borderColor: accent }}
            >
              <ImageIcon className="w-4 h-4 text-neutral-400" />
            </div>

            <h4 className="text-[10px] font-bold font-serif leading-tight text-neutral-900 line-clamp-1">
              {sampleName}
            </h4>

            {/* Scripture snippet */}
            <p className="text-[7.5px] font-serif italic text-neutral-600 line-clamp-2 mt-1 leading-snug px-1">
              "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures…"
            </p>
          </div>

          <div className="flex items-center justify-between z-10 px-2 pb-1.5 text-[8px]">
            <span className="text-neutral-500 font-mono">2.5 × 4.25"</span>
            <span className="font-bold text-amber-800">Laminated 5mil</span>
          </div>
        </>
      )}

      {/* ------------------------------------------------------------- */}
      {/* LAYOUT 3: DVD TRIBUTE COVERS (11" x 8.5" Wrap Format) */}
      {/* ------------------------------------------------------------- */}
      {productType === 'dvd' && (
        <>
          <div className="flex items-center justify-between z-10 px-2 pt-1.5">
            <span 
              className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: accent }}
            >
              DVD Tribute Wrap
            </span>
            <Disc className="w-3 h-3 text-amber-600" />
          </div>

          {/* 3-Panel Wrap Aesthetic (Back, Spine, Front) */}
          <div className="my-auto z-10 grid grid-cols-5 gap-1 px-2 items-center h-24">
            {/* Back Panel (Photo montage / Song list) */}
            <div className="col-span-2 border border-black/10 bg-white/60 rounded p-1 text-[7px] space-y-0.5 flex flex-col justify-center">
              <span className="font-bold font-serif text-neutral-800 uppercase block">Reflections</span>
              <div className="w-full h-7 bg-neutral-200/80 rounded flex items-center justify-center">
                <ImageIcon className="w-3 h-3 text-neutral-400" />
              </div>
              <span className="text-[6.5px] text-neutral-500 truncate block">1. Going Up Yonder</span>
              <span className="text-[6.5px] text-neutral-500 truncate block">2. Total Praise</span>
            </div>

            {/* Center Spine Crease */}
            <div className="col-span-1 h-full border-x border-dashed border-black/20 flex flex-col items-center justify-center">
              <span className="text-[6px] font-mono font-bold text-neutral-600 uppercase [writing-mode:vertical-rl] rotate-180">
                MEMORIAL DVD
              </span>
            </div>

            {/* Front Cover Panel */}
            <div className="col-span-2 border border-black/10 bg-white/80 rounded p-1 text-center flex flex-col items-center justify-center">
              <span className="text-[7px] font-serif uppercase tracking-widest font-bold" style={{ color: accent }}>
                Celebration
              </span>
              <div className="w-7 h-9 my-0.5 rounded border border-amber-400 bg-neutral-100 flex items-center justify-center">
                <ImageIcon className="w-3 h-3 text-neutral-400" />
              </div>
              <span className="text-[7.5px] font-bold font-serif text-neutral-900 leading-none truncate w-full">
                {sampleName}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between z-10 px-2 pb-1.5 text-[8px]">
            <span className="text-neutral-500 font-mono">11 × 8.5 in Wrap</span>
            <span className="font-bold text-neutral-700">Per 25 Cases</span>
          </div>
        </>
      )}

      {/* ------------------------------------------------------------- */}
      {/* LAYOUT 4: MEMORIAL POSTERS (24" x 36" Chapel Easels) */}
      {/* ------------------------------------------------------------- */}
      {productType === 'poster' && (
        <>
          <div className="flex items-center justify-between z-10 px-2 pt-1.5">
            <span 
              className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: accent }}
            >
              Sanctuary Poster
            </span>
            <ImageIcon className="w-3 h-3 text-amber-600" />
          </div>

          <div className="text-center my-auto z-10 px-2 py-1 flex flex-col items-center">
            <span className="text-[8px] font-serif uppercase tracking-widest font-bold" style={{ color: accent }}>
              Celebrating the Life & Legacy
            </span>

            {/* Grand Hero Portrait Frame with Spotlight Border */}
            <div 
              className="w-16 h-20 my-1 rounded border-2 shadow-md bg-white flex flex-col items-center justify-center relative overflow-hidden"
              style={{ borderColor: accent }}
            >
              <div 
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(circle, ${accent} 20%, transparent 80%)`
                }}
              />
              <ImageIcon className="w-6 h-6 text-neutral-400 mb-0.5" />
              <span className="text-[7px] font-bold text-neutral-600 uppercase">
                Grand Portrait
              </span>
            </div>

            <h4 className="text-[10.5px] font-bold font-serif leading-tight text-neutral-900 line-clamp-1">
              {sampleName}
            </h4>
            <span className="text-[8px] font-serif italic text-neutral-600 mt-0.5">
              {sampleDates}
            </span>
          </div>

          <div className="flex items-center justify-between z-10 px-2 pb-1.5 text-[8px]">
            <span className="text-neutral-500 font-mono">24 × 36 in Mounted</span>
            <span className="font-bold text-amber-800">Easel Display</span>
          </div>
        </>
      )}

      {/* ------------------------------------------------------------- */}
      {/* LAYOUT 5: MEMORIAL BOOKMARKS (2" x 7" Laminated Ribbons) */}
      {/* ------------------------------------------------------------- */}
      {productType === 'bookmark' && (
        <>
          <div className="flex items-center justify-between z-10 px-2 pt-1.5">
            <span 
              className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: accent }}
            >
              Keepsake Bookmark
            </span>
            <Bookmark className="w-3 h-3" style={{ color: accent }} />
          </div>

          <div className="text-center my-auto z-10 px-4 py-1 flex flex-col items-center">
            {/* Tassel Punch Hole */}
            <div className="w-2.5 h-2.5 rounded-full border border-black/30 bg-neutral-200 mb-1" />

            <span className="text-[8px] font-serif uppercase tracking-widest font-bold" style={{ color: accent }}>
              In Remembrance
            </span>

            {/* Portrait Frame */}
            <div 
              className="w-10 h-12 my-1 rounded-full border-2 bg-white flex items-center justify-center"
              style={{ borderColor: accent }}
            >
              <ImageIcon className="w-4 h-4 text-neutral-400" />
            </div>

            <h4 className="text-[9px] font-bold font-serif text-neutral-900 line-clamp-1">
              {sampleName}
            </h4>
            <p className="text-[7px] font-serif italic text-neutral-600 line-clamp-2 mt-0.5">
              "Those we love don't go away, they walk beside us every day…"
            </p>
          </div>

          <div className="flex items-center justify-between z-10 px-2 pb-1.5 text-[8px]">
            <span className="text-neutral-500 font-mono">2 × 7 in</span>
            <span className="font-bold text-neutral-700">Tassel Ready</span>
          </div>
        </>
      )}

      {/* ------------------------------------------------------------- */}
      {/* LAYOUT 6: THANK-YOU CARDS (4.25" x 5.5" Folded Notes) */}
      {/* ------------------------------------------------------------- */}
      {productType === 'thanks' && (
        <>
          <div className="flex items-center justify-between z-10 px-2 pt-1.5">
            <span 
              className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: accent }}
            >
              Acknowledgement
            </span>
            <Mail className="w-3 h-3" style={{ color: accent }} />
          </div>

          <div className="text-center my-auto z-10 px-4 py-1 flex flex-col items-center">
            <Sparkles className="w-4 h-4 mb-1 text-amber-500" />
            <h3 
              className="text-xs font-serif font-bold italic leading-tight"
              style={{ color: accent }}
            >
              With Sincere Gratitude
            </h3>

            <div className="w-12 h-0.5 my-1.5 bg-amber-400/60 rounded" />

            <p className="text-[8px] font-serif text-neutral-700 leading-snug line-clamp-3">
              The family of {sampleName} wishes to express our deepest appreciation for your kindness, prayers, and words of comfort during this time.
            </p>
          </div>

          <div className="flex items-center justify-between z-10 px-2 pb-1.5 text-[8px]">
            <span className="text-neutral-500 font-mono">4.25 × 5.5 in Folded</span>
            <span className="font-bold text-neutral-700">w/ Envelopes</span>
          </div>
        </>
      )}

      {/* ------------------------------------------------------------- */}
      {/* LAYOUT 7: MEMORIAL ANNOUNCEMENTS */}
      {/* ------------------------------------------------------------- */}
      {productType === 'announcement' && (
        <>
          <div className="flex items-center justify-between z-10 px-2 pt-1.5">
            <span 
              className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: accent }}
            >
              Announcement
            </span>
            <Bell className="w-3 h-3 text-amber-600" />
          </div>

          <div className="text-center my-auto z-10 px-3 py-1 flex flex-col items-center">
            <span className="text-[8px] font-serif uppercase tracking-widest font-bold" style={{ color: accent }}>
              Memorial Announcement
            </span>

            <h4 className="text-[10.5px] font-bold font-serif text-neutral-900 mt-1 line-clamp-1">
              {sampleName}
            </h4>

            <div className="bg-white/80 border border-black/10 rounded px-2 py-1 my-1 w-full text-[7.5px] space-y-0.5 text-neutral-700">
              <div className="flex justify-between">
                <span className="font-bold">Visitation:</span>
                <span>Friday, 4:00 PM – 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Sanctuary:</span>
                <span>Saturday, 10:00 AM</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between z-10 px-2 pb-1.5 text-[8px]">
            <span className="text-neutral-500 font-mono">5 × 7 in Flat</span>
            <span className="font-bold text-neutral-700">Expedited Print</span>
          </div>
        </>
      )}
    </div>
  );
};
