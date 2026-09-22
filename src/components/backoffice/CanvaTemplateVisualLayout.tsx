import React, { useState } from 'react';
import { StorefrontDesignTemplate } from '../../lib/types/funeral';
import { cleanTemplateTitle } from '../../lib/data/canvaStorefrontCatalog';
import { 
  Sparkles,
  Check
} from 'lucide-react';

interface CanvaTemplateVisualLayoutProps {
  template: StorefrontDesignTemplate;
  mode?: 'card' | 'modal' | 'flipper';
  pageIndex?: number;
  sampleName?: string;
  sampleDates?: string;
  className?: string;
  onSelect?: () => void;
  onCustomize?: () => void;
}

export function getTemplatePreviewImage(template: StorefrontDesignTemplate): string {
  if (template.thumbnailUrl) return template.thumbnailUrl;
  
  const fam = (template.family || '').toLowerCase();
  const title = (template.title || '').toLowerCase();
  const prod = template.product_type;

  // 1. Photograph / Cyril James Osbourne Collection
  if (fam.includes('photograph') || title.includes('photograph') || title.includes('photo')) {
    if (prod === 'prayer' || prod === 'thanks' || prod === 'bookmark') {
      return '/images/templates/photograph_card.jpg';
    }
    return '/images/templates/photograph_spread.jpg';
  }

  // 2. Seasons / Green Leaf & Dew Drop Collection
  if (fam.includes('season') || title.includes('season') || fam.includes('spring')) {
    return '/images/templates/seasons_spread.jpg';
  }

  // 3. Cherry Blossom / Clarise Hopkins Pink Floral Collection
  if (fam.includes('blossom') || title.includes('blossom') || fam.includes('rose') || fam.includes('serenity')) {
    if (prod === 'prayer' || prod === 'thanks' || prod === 'bookmark') {
      return '/images/templates/cherry_blossom_card.jpg';
    }
    return '/images/templates/cherry_blossom_spread.jpg';
  }

  // 4. Colleen / Keepsake / Royal Majestic Purple Collection
  if (fam.includes('colleen') || fam.includes('keepsake') || fam.includes('royal') || fam.includes('superstar') || title.includes('colleen')) {
    return '/images/templates/royal_purple.jpg';
  }

  // 5. Cathedral Stained Glass / Sacred Cross Collection
  if (fam.includes('cathedral') || fam.includes('stained') || fam.includes('cross') || title.includes('cathedral')) {
    return '/images/templates/cathedral_stained.jpg';
  }

  // 6. Words Series / Ebony & Gold Minimal Luxe Collection
  if (fam.includes('words') || fam.includes('ebony') || fam.includes('luxe') || fam.includes('minimal')) {
    return '/images/templates/ebony_gold.jpg';
  }

  // 7. African Kente Heritage Collection
  if (fam.includes('african') || fam.includes('kente') || fam.includes('sunset') || fam.includes('caribbean')) {
    return '/images/templates/african_kente.jpg';
  }

  // Product-specific fallbacks
  if (prod === 'prayer' || prod === 'bookmark') return '/images/templates/prayer_card.jpg';
  if (prod === 'thanks') return '/images/templates/cherry_blossom_card.jpg';
  if (prod === 'poster') return '/images/templates/memorial_easel.jpg';
  if (prod === 'program' || prod === 'dvd') return '/images/templates/harlem_heritage.jpg';

  return '/images/templates/harlem_heritage.jpg';
}

export const CanvaTemplateVisualLayout: React.FC<CanvaTemplateVisualLayoutProps> = ({
  template,
  mode = 'card',
  pageIndex: _pageIndex = 0,
  sampleName = 'Bishop Cornelius Washington',
  sampleDates = 'July 14, 1942 – September 18, 2026',
  className = '',
  onSelect,
  onCustomize
}) => {
  const cleanTitle = cleanTemplateTitle(template.title);
  const accent = template.accent || '#815b3e';
  const previewImg = getTemplatePreviewImage(template);
  const [imgLoaded, setImgLoaded] = useState(true);

  if (mode === 'modal') {
    return (
      <div className={`relative bg-neutral-900 text-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row ${className}`}>
        {/* Large High-Definition Cover Preview */}
        <div className="md:w-1/2 relative bg-neutral-950 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-neutral-800">
          <div className="relative max-w-sm w-full rounded-xl overflow-hidden shadow-2xl border border-neutral-700/60 group">
            <img 
              src={previewImg} 
              alt={cleanTitle}
              className="w-full h-auto object-cover transform transition duration-500 group-hover:scale-105"
              onError={() => setImgLoaded(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
              <span className="text-xs text-amber-300 font-serif font-bold">
                Authentic High-Resolution Press Layout
              </span>
            </div>
          </div>
        </div>

        {/* Template Detail & Actions */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-xs"
                style={{ backgroundColor: accent }}
              >
                {template.family}
              </span>
              <span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded text-xs font-mono font-bold border border-neutral-700">
                {template.page_count} {template.page_count === 1 ? 'Page' : 'Pages'}
              </span>
              <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded text-xs font-mono font-bold">
                {template.displayed_size}
              </span>
            </div>

            <h2 className="text-xl font-bold font-serif-title text-white mb-1">
              {cleanTitle}
            </h2>
            <p className="text-xs text-neutral-400 mb-4">
              {template.product_name} • Full bleed printing • 300 DPI CMYK ready
            </p>

            <div className="p-3 bg-neutral-800/80 rounded-xl border border-neutral-700/80 space-y-1.5 text-xs text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-400">Sample Dedication:</span>
                <span className="font-semibold text-white">{sampleName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Commemorative Dates:</span>
                <span className="font-semibold text-white">{sampleDates}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Base Unit Rate:</span>
                <span className="font-mono font-bold text-amber-400">
                  {template.product_type === 'poster' ? `$${template.base_price}.00 ea` : `$${(template.base_price / 100).toFixed(2)} / copy`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
            {onCustomize && (
              <button
                type="button"
                onClick={onCustomize}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Customize in In-House Studio</span>
              </button>
            )}

            {onSelect && (
              <button
                type="button"
                onClick={onSelect}
                className="flex-1 py-2.5 bg-[#991b1b] hover:bg-red-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <Check className="w-4 h-4" />
                <span>Select for Order</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Card View Mode (Default for Grid)
  return (
    <div 
      className={`relative w-full h-full overflow-hidden select-none bg-neutral-900 group ${className}`}
    >
      {/* Real Photorealistic Cover Preview Image */}
      {imgLoaded ? (
        <img 
          src={previewImg} 
          alt={cleanTitle}
          className="w-full h-full object-cover object-center transform transition duration-500 group-hover:scale-108"
          onError={() => setImgLoaded(false)}
        />
      ) : (
        <div 
          className="w-full h-full flex flex-col items-center justify-center p-3 text-center"
          style={{ backgroundColor: template.bg || '#f9f6f0' }}
        >
          <span className="text-[9px] font-serif uppercase tracking-widest font-bold" style={{ color: accent }}>
            In Loving Memory
          </span>
          <h4 className="text-xs font-serif font-bold text-neutral-900 mt-1 line-clamp-1">
            {cleanTitle}
          </h4>
        </div>
      )}

      {/* Subtle Bottom & Top Vignette Gradients for Text Legibility */}
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

      {/* Top Badges: Family Tag & Page Count */}
      <div className="absolute top-1.5 inset-x-1.5 flex items-center justify-between z-10">
        <span 
          className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-white shadow-xs backdrop-blur-xs"
          style={{ backgroundColor: accent }}
        >
          {template.family}
        </span>
        <span className="px-1.5 py-0.5 bg-black/70 backdrop-blur-xs text-white rounded text-[8px] font-mono font-bold shadow-xs border border-white/20">
          {template.page_count} {template.page_count === 1 ? 'Page' : 'Pages'}
        </span>
      </div>

      {/* Bottom Title & Size Overlay */}
      <div className="absolute bottom-1 inset-x-1.5 flex items-end justify-between z-10 text-white">
        <div className="max-w-[75%]">
          <span className="text-[9px] font-serif font-bold line-clamp-1 leading-tight text-white drop-shadow-md">
            {cleanTitle}
          </span>
        </div>
        <span className="text-[7.5px] font-mono text-neutral-300 bg-black/60 px-1 py-0.2 rounded border border-white/10 shadow-2xs">
          {template.displayed_size.split(' ')[0]}
        </span>
      </div>

      {/* Hover Preview Tooltip Accent */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-400/80 transition-colors pointer-events-none rounded-inherit" />
    </div>
  );
};
