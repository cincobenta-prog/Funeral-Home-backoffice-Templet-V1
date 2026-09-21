import React, { useState, useEffect } from 'react';
import { GoldenRecordCase, StorefrontProductType } from '../../lib/types/funeral';
import { 
  Printer, 
  X, 
  Edit3, 
  Plus, 
  Trash2, 
  BookOpen, 
  Layout, 
  Eye, 
  Palette,
  Heart,
  ScrollText,
  ImageIcon,
  Sparkles,
  Bookmark,
  Disc,
  Mail,
  Check,
  RotateCw
} from 'lucide-react';

export type InHouseThemeType = 
  | 'harlem_heritage'
  | 'cathedral_stained'
  | 'royal_purple'
  | 'cherry_blossom'
  | 'ebony_luxe'
  | 'african_kente';

interface MemorialProgramBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: GoldenRecordCase;
  initialProduct?: StorefrontProductType;
  initialTheme?: InHouseThemeType;
  onSaveProgram?: (programData: any) => void;
}

export const MemorialProgramBuilderModal: React.FC<MemorialProgramBuilderModalProps> = ({
  isOpen,
  onClose,
  caseData,
  initialProduct = 'program',
  initialTheme = 'harlem_heritage',
  onSaveProgram: _onSaveProgram
}) => {
  const [activeProduct, setActiveProduct] = useState<StorefrontProductType>(initialProduct);
  const [theme, setTheme] = useState<InHouseThemeType>(initialTheme);
  const [activeSpread, setActiveSpread] = useState<'outer' | 'inner'>('outer'); // outer = Page 4 & 1, inner = Page 2 & 3
  const [activeTab, setActiveTab] = useState<'preview' | 'edit_cover' | 'edit_obituary' | 'edit_order' | 'edit_back'>('preview');

  useEffect(() => {
    if (initialProduct) setActiveProduct(initialProduct);
    if (initialTheme) setTheme(initialTheme);
  }, [initialProduct, initialTheme]);

  // Portrait Photo State
  const [portraitUrl, setPortraitUrl] = useState<string>(
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600'
  );

  // Cover State
  const [titleHeader, setTitleHeader] = useState('Celebrating the Life, Love & Legacy of');
  const [coverSubtitle, setCoverSubtitle] = useState('A Life Well Lived & Reverently Honored');
  const [serviceDateText, setServiceDateText] = useState(
    caseData.serviceSelections?.serviceDate 
      ? `${caseData.serviceSelections.serviceDate} • 11:00 AM` 
      : 'Tuesday, September 22, 2026 • 11:00 AM'
  );
  const [serviceVenueText, setServiceVenueText] = useState<string>(
    caseData.serviceSelections?.viewingParlor || "Benta's Funeral Home Chapel • 630 Saint Nicholas Ave, New York, NY"
  );
  const [officiantText, setOfficiantText] = useState(
    caseData.serviceSelections?.officiantName || 'Rev. Dr. Calvin Butts IV, Officiating'
  );

  // Obituary Narrative State
  const [obituaryTitle, setObituaryTitle] = useState('Reflections on a Sacred Journey');
  const [obituaryParagraphs, setObituaryParagraphs] = useState<string[]>([
    `${caseData.decedent.legalName}, beloved matriarch, devoted community leader, and faithful servant of God, peacefully transitioned to eternal rest on ${caseData.decedent.dateOfDeath || 'September 18, 2026'}, surrounded by the warmth and prayers of her loving family.`,
    `Born on ${caseData.decedent.dateOfBirth || 'June 14, 1948'} in New York City, ${caseData.decedent.legalName.split(' ')[0]} was educated in the New York City Public School system before dedicating over thirty-five years to educating, nurturing, and uplifting generations of families throughout Harlem.`,
    `A faithful and devout member of the historic Convent Avenue Baptist Church, she served joyfully on the Deaconess Board and Gospel Choir. Her kitchen was always open, her counsel was sought by all, and her unwavering faith was a beacon of light to our community.`,
    `She leaves to cherish her precious memory her devoted children, loving grandchildren, beloved siblings, extended family, church congregation, and a legacy of grace that will endure for generations.`
  ]);

  // Order of Service State
  const [orderOfService, setOrderOfService] = useState<Array<{ step: string; leadBy: string }>>([
    { step: 'Musical Prelude', leadBy: caseData.serviceSelections?.organistName || 'Dr. Julian Vance, Organist' },
    { step: 'Processional', leadBy: 'Clergy, Funeral Directors & The Family' },
    { step: 'Hymn of Comfort', leadBy: '"Amazing Grace" — Sanctuary Choir' },
    { step: 'Holy Scripture Reading (Old Testament)', leadBy: 'Psalm 23 • Sister Angela Davis' },
    { step: 'Holy Scripture Reading (New Testament)', leadBy: 'John 14:1-6 • Deacon Ronald Hayes' },
    { step: 'Prayer of Solace & Comfort', leadBy: 'Rev. Dr. Malcolm Turner' },
    { step: 'Musical Solo', leadBy: '"His Eye Is On The Sparrow" • Danielle St. Claire' },
    { step: 'Reading of Cards & Telegrams', leadBy: 'Church Clerk & Family Resolutions' },
    { step: 'Reflections (2 Minutes Please)', leadBy: 'Friends, Colleagues & Grandchildren' },
    { step: 'Reading of the Obituary', leadBy: 'Read Silently with Soft Choral Accompaniment' },
    { step: 'Choral Anthem', leadBy: '"Precious Lord, Take My Hand" — Sanctuary Choir' },
    { step: 'The Eulogy', leadBy: officiantText },
    { step: 'Benediction & Final Viewing', leadBy: "Benta's Funeral Home Directors" },
    { step: 'Recessional', leadBy: 'Clergy & Family Cortege' }
  ]);

  // Back Cover State
  const [pallbearers, setPallbearers] = useState<string[]>([
    'Brother Elijah Brooks',
    'Marcus Vance Jr.',
    'Kenneth Washington',
    'Gregory Hall',
    'Deacon Thomas Vance',
    'Andre Baptiste'
  ]);

  const [honoraryPallbearers, setHonoraryPallbearers] = useState<string[]>([
    'Trustees of Convent Ave Baptist Church',
    'Harlem Choral Institute Guild'
  ]);

  const [acknowledgmentsText, setAcknowledgmentsText] = useState(
    `The family of ${caseData.decedent.legalName} wishes to express our deepest and most sincere gratitude for every prayer, telephone call, floral arrangement, and thoughtful deed extended during our time of bereavement. May God richly bless and keep you always.`
  );

  const [finalRestingPlace, setFinalRestingPlace] = useState(
    caseData.serviceSelections?.crematoryOrCemeteryName || 'The Woodlawn Cemetery & Crematory • Bronx, New York'
  );

  const [repastText, setRepastText] = useState(
    'Following the committal service, family and friends are warmly invited to join the repast at the Benta Fellowship Suite (630 St. Nicholas Ave).'
  );

  // Prayer Card Specific State
  const [prayerCardVerse, setPrayerCardVerse] = useState(
    "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake. Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me."
  );

  // New Step Input
  const [newStepName, setNewStepName] = useState('');
  const [newStepLead, setNewStepLead] = useState('');

  if (!isOpen) return null;

  const handleAddOrderStep = () => {
    if (!newStepName.trim()) return;
    setOrderOfService([...orderOfService, { step: newStepName.trim(), leadBy: newStepLead.trim() || 'Leader' }]);
    setNewStepName('');
    setNewStepLead('');
  };

  const handleRemoveOrderStep = (idx: number) => {
    setOrderOfService(orderOfService.filter((_, i) => i !== idx));
  };

  const handlePrintProgram = () => {
    window.print();
  };

  // Comprehensive Theme Style Mapping
  const THEME_CONFIGS: Record<InHouseThemeType, {
    label: string;
    description: string;
    bg: string;
    accent: string;
    secondary: string;
    border: string;
    headerBg: string;
    textColor: string;
    badgeBg: string;
    motif: string;
  }> = {
    harlem_heritage: {
      label: 'Harlem Renaissance Heritage',
      description: 'Stately Burgundy & Imperial Gold Baroque Filigree',
      bg: '#fcfaf6',
      accent: '#991b1b',
      secondary: '#b45309',
      border: 'border-[#991b1b]',
      headerBg: 'bg-[#991b1b] text-white',
      textColor: 'text-neutral-900',
      badgeBg: 'bg-red-50 text-[#991b1b] border-red-200',
      motif: 'baroque'
    },
    cathedral_stained: {
      label: 'Cathedral Stained Glass',
      description: 'Deep Sapphire Navy with Sacred Rose Cross Glass',
      bg: '#f8fafc',
      accent: '#1e3a8a',
      secondary: '#0284c7',
      border: 'border-[#1e3a8a]',
      headerBg: 'bg-[#1e3a8a] text-white',
      textColor: 'text-neutral-900',
      badgeBg: 'bg-blue-50 text-[#1e3a8a] border-blue-200',
      motif: 'stained_glass'
    },
    royal_purple: {
      label: 'Royal Majestic Purple & Gold',
      description: 'Regal Imperial Purple with Gilded Beveled Frames',
      bg: '#faf5ff',
      accent: '#6b21a8',
      secondary: '#d97706',
      border: 'border-[#6b21a8]',
      headerBg: 'bg-[#6b21a8] text-white',
      textColor: 'text-neutral-900',
      badgeBg: 'bg-purple-50 text-[#6b21a8] border-purple-200',
      motif: 'royal'
    },
    cherry_blossom: {
      label: 'Cherry Blossom Serenity',
      description: 'Soft Rose-Ivory Botanical with Peace Doves',
      bg: '#fffafb',
      accent: '#9d174d',
      secondary: '#db2777',
      border: 'border-[#9d174d]',
      headerBg: 'bg-[#9d174d] text-white',
      textColor: 'text-neutral-900',
      badgeBg: 'bg-rose-50 text-[#9d174d] border-rose-200',
      motif: 'floral'
    },
    ebony_luxe: {
      label: 'Ebony & Gold Luxe',
      description: 'Polished Onyx & Metallic Gold Fine Typography',
      bg: '#fafaf9',
      accent: '#18181b',
      secondary: '#ca8a04',
      border: 'border-[#18181b]',
      headerBg: 'bg-[#18181b] text-amber-300',
      textColor: 'text-neutral-900',
      badgeBg: 'bg-neutral-100 text-neutral-900 border-neutral-300',
      motif: 'minimal'
    },
    african_kente: {
      label: 'African Wax & Kente Tribute',
      description: 'Traditional Geometric Emerald, Ruby & Gold Heritage',
      bg: '#fdfbf7',
      accent: '#b45309',
      secondary: '#15803d',
      border: 'border-[#b45309]',
      headerBg: 'bg-[#b45309] text-white',
      textColor: 'text-neutral-900',
      badgeBg: 'bg-amber-50 text-[#b45309] border-amber-200',
      motif: 'african'
    }
  };

  const currentTheme = THEME_CONFIGS[theme];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-[#f8f9fa] border border-neutral-300 rounded-3xl max-w-6xl w-full max-h-[96vh] flex flex-col shadow-2xl text-neutral-900 overflow-hidden">
        
        {/* ========================================================================= */}
        {/* TOP BAR: STUDIO HEADER & ACTIONS (Hidden on Print)                        */}
        {/* ========================================================================= */}
        <div className="p-4 bg-white border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
              style={{ backgroundColor: currentTheme.accent }}
            >
              <ScrollText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif-title font-bold text-lg text-neutral-900">
                  BFH In-House Design & Print Studio
                </h3>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  100% In-House • No 3rd Party Account Needed
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Official ceremonial print suite for <strong>{caseData.decedent.legalName}</strong> • Case #{caseData.caseNumber}
              </p>
            </div>
          </div>

          {/* Action Buttons: Print & Close */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrintProgram}
              className="bg-[#991b1b] hover:bg-red-800 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 transition shadow-sm border border-amber-300/40"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>Print / Save PDF (Duplex)</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-900 rounded-xl hover:bg-neutral-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SUB-NAV: PRODUCT CHOOSER & VISUAL THEME SELECTOR (Hidden on Print)        */}
        {/* ========================================================================= */}
        <div className="px-6 py-3 bg-neutral-100 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0 print:hidden">
          
          {/* Product Category Selector */}
          <div className="flex flex-wrap items-center gap-1.5 font-bold">
            <button
              onClick={() => setActiveProduct('program')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeProduct === 'program' ? 'bg-[#991b1b] text-white shadow-xs' : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>4-Page Program Booklet</span>
            </button>

            <button
              onClick={() => setActiveProduct('prayer')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeProduct === 'prayer' ? 'bg-[#991b1b] text-white shadow-xs' : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Prayer Cards (2.5" x 4.25")</span>
            </button>

            <button
              onClick={() => setActiveProduct('thanks')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeProduct === 'thanks' ? 'bg-[#991b1b] text-white shadow-xs' : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Thank-You Cards</span>
            </button>

            <button
              onClick={() => setActiveProduct('poster')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeProduct === 'poster' ? 'bg-[#991b1b] text-white shadow-xs' : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Memorial Poster (24" x 36")</span>
            </button>

            <button
              onClick={() => setActiveProduct('bookmark')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeProduct === 'bookmark' ? 'bg-[#991b1b] text-white shadow-xs' : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Bookmarks</span>
            </button>

            <button
              onClick={() => setActiveProduct('dvd')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeProduct === 'dvd' ? 'bg-[#991b1b] text-white shadow-xs' : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              <Disc className="w-3.5 h-3.5" />
              <span>DVD Wrap</span>
            </button>
          </div>

          {/* Visual Theme Selector Palette */}
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4 text-neutral-500" />
            <span className="text-neutral-600 font-bold text-xs">Design Aesthetic:</span>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as InHouseThemeType)}
              className="bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-[#991b1b] shadow-2xs"
            >
              <option value="harlem_heritage">🏛️ Harlem Renaissance Heritage (Crimson & Gold)</option>
              <option value="cathedral_stained">⛪ Cathedral Stained Glass (Sapphire Navy)</option>
              <option value="royal_purple">👑 Royal Majestic (Imperial Purple & Gold)</option>
              <option value="cherry_blossom">🌸 Cherry Blossom Serenity (Rose-Ivory)</option>
              <option value="ebony_luxe">🖤 Ebony & Gold Luxe (Onyx & Gold)</option>
              <option value="african_kente">🌍 African Wax & Kente Tribute (Geometric)</option>
            </select>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EDITING TABS (Hidden on Print)                                            */}
        {/* ========================================================================= */}
        <div className="px-6 py-2 bg-white border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2 text-xs font-bold shrink-0 print:hidden">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'preview' ? 'bg-[#991b1b] text-white shadow-2xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Visual Proof</span>
            </button>

            <button
              onClick={() => setActiveTab('edit_cover')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'edit_cover' ? 'bg-[#991b1b] text-white shadow-2xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Edit Cover & Photo</span>
            </button>

            <button
              onClick={() => setActiveTab('edit_obituary')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'edit_obituary' ? 'bg-[#991b1b] text-white shadow-2xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <ScrollText className="w-3.5 h-3.5" />
              <span>Edit Life & Obituary</span>
            </button>

            <button
              onClick={() => setActiveTab('edit_order')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'edit_order' ? 'bg-[#991b1b] text-white shadow-2xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Order of Service ({orderOfService.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('edit_back')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'edit_back' ? 'bg-[#991b1b] text-white shadow-2xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Pallbearers, Repast & Scripture</span>
            </button>
          </div>

          {activeProduct === 'program' && activeTab === 'preview' && (
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveSpread('outer')}
                className={`px-2.5 py-1 rounded-lg text-xs transition ${
                  activeSpread === 'outer' ? 'bg-white text-[#991b1b] shadow-2xs font-bold' : 'text-neutral-600'
                }`}
              >
                Outer Sheet (Pages 4 & 1)
              </button>
              <button
                onClick={() => setActiveSpread('inner')}
                className={`px-2.5 py-1 rounded-lg text-xs transition ${
                  activeSpread === 'inner' ? 'bg-white text-[#991b1b] shadow-2xs font-bold' : 'text-neutral-600'
                }`}
              >
                Inner Sheet (Pages 2 & 3)
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* MODAL BODY CONTENT                                                        */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* ======================================================================= */}
          {/* TAB 1: LIVE PRINT PREVIEW STAGE                                         */}
          {/* ======================================================================= */}
          {activeTab === 'preview' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              
              {/* PRINT INSTRUCTIONS BANNER (Hidden on print) */}
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-900 print:hidden shadow-2xs">
                <div className="flex items-center space-x-2.5">
                  <BookOpen className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    <strong>Design Theme Active:</strong> {currentTheme.label} • Ready for direct duplex printing on standard 8.5" x 11" US Letter cardstock.
                  </span>
                </div>
                {activeProduct === 'program' && (
                  <button
                    onClick={() => setActiveSpread(activeSpread === 'outer' ? 'inner' : 'outer')}
                    className="px-3 py-1 bg-white text-amber-900 font-bold border border-amber-300 rounded-lg text-xs shadow-2xs flex items-center gap-1"
                  >
                    <RotateCw className="w-3 h-3" />
                    Flip to {activeSpread === 'outer' ? 'Inner Sheet (Pages 2 & 3)' : 'Outer Sheet (Pages 4 & 1)'}
                  </button>
                )}
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* PRODUCT 1: 4-PAGE MEMORIAL PROGRAM BOOKLET                          */}
              {/* ------------------------------------------------------------------- */}
              {activeProduct === 'program' && (
                <div>
                  {/* SPREAD A: OUTER SHEET (PAGE 4 [LEFT] & PAGE 1 [RIGHT]) */}
                  {activeSpread === 'outer' && (
                    <div 
                      className="border-2 border-neutral-300 shadow-xl rounded-2xl p-6 sm:p-8 aspect-[11/8.5] max-w-4xl mx-auto grid grid-cols-2 gap-8 print:border-0 print:shadow-none print:p-0 print:m-0 print:aspect-auto print:max-w-none relative overflow-hidden"
                      style={{ backgroundColor: currentTheme.bg }}
                    >
                      {/* PAGE 4: BACK COVER (LEFT PANEL) */}
                      <div 
                        className="p-6 border-2 rounded-xl flex flex-col justify-between text-center space-y-3 relative"
                        style={{ borderColor: currentTheme.secondary, backgroundColor: 'rgba(255,255,255,0.7)' }}
                      >
                        {/* Pallbearers Roster */}
                        <div className="space-y-2">
                          <div>
                            <h4 
                              className="font-serif-title font-bold text-xs uppercase tracking-widest"
                              style={{ color: currentTheme.accent }}
                            >
                              Active Pallbearers
                            </h4>
                            <div className="h-0.5 w-10 mx-auto my-1" style={{ backgroundColor: currentTheme.secondary }} />
                            <div className="grid grid-cols-2 gap-1 text-[11px] text-neutral-800 font-medium pt-1">
                              {pallbearers.map((name, i) => (
                                <div key={i} className="truncate">• {name}</div>
                              ))}
                            </div>
                          </div>

                          {honoraryPallbearers.length > 0 && (
                            <div className="pt-1">
                              <h4 className="font-serif-title font-bold text-[10px] uppercase tracking-wider text-neutral-600">
                                Honorary Pallbearers
                              </h4>
                              <div className="text-[10px] text-neutral-700 font-light space-y-0.5">
                                {honoraryPallbearers.map((name, i) => (
                                  <div key={i}>{name}</div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Family Acknowledgments & Gratitude */}
                        <div className="space-y-1.5 p-3 bg-white/80 rounded-xl border border-black/10">
                          <h4 
                            className="font-serif-title font-bold text-xs uppercase tracking-wider"
                            style={{ color: currentTheme.accent }}
                          >
                            With Sincere Gratitude
                          </h4>
                          <p className="text-[10px] text-neutral-700 leading-relaxed italic font-serif">
                            "{acknowledgmentsText}"
                          </p>
                          <span className="text-[10px] font-bold text-neutral-900 block pt-0.5 font-serif">
                            — The Family of {caseData.decedent.legalName}
                          </span>
                        </div>

                        {/* Final Resting Place & Repast */}
                        <div className="space-y-1 text-[10px] text-neutral-600 pt-1 border-t border-black/10">
                          <div>
                            <strong className="text-neutral-900 uppercase font-semibold">Interment & Committal:</strong>
                            <div>{finalRestingPlace}</div>
                          </div>
                          <div>
                            <strong className="text-neutral-900 uppercase font-semibold">Fellowship & Repast:</strong>
                            <div>{repastText}</div>
                          </div>
                        </div>

                        {/* Stately BFH Director Imprint */}
                        <div className="pt-2 border-t border-black/10 flex flex-col items-center">
                          <div 
                            className="w-7 h-7 rounded-full text-white flex items-center justify-center font-serif-title font-bold text-xs shadow-xs mb-1"
                            style={{ backgroundColor: currentTheme.accent }}
                          >
                            BFH
                          </div>
                          <span className="font-serif-title font-bold text-[10px] tracking-wider uppercase text-neutral-900">
                            Benta's Funeral Home, Inc.
                          </span>
                          <span className="text-[8.5px] text-neutral-500">
                            630 Saint Nicholas Avenue • Harlem, New York 10030 • (212) 281-8850
                          </span>
                          <span 
                            className="text-[7.5px] font-bold tracking-widest pt-0.5"
                            style={{ color: currentTheme.secondary }}
                          >
                            FOUR GENERATIONS OF COMPASSION & DIGNITY • EST. 1928
                          </span>
                        </div>
                      </div>

                      {/* PAGE 1: FRONT COVER (RIGHT PANEL) */}
                      <div 
                        className="p-6 border-2 rounded-xl flex flex-col justify-between items-center text-center space-y-3 relative"
                        style={{ borderColor: currentTheme.secondary, backgroundColor: 'rgba(255,255,255,0.7)' }}
                      >
                        {/* Top Header */}
                        <div className="space-y-1">
                          <span 
                            className="text-[10px] font-bold uppercase tracking-widest block font-serif"
                            style={{ color: currentTheme.secondary }}
                          >
                            In Loving Celebration & Homegoing
                          </span>
                          <h2 
                            className="font-serif-title font-bold text-base leading-tight"
                            style={{ color: currentTheme.accent }}
                          >
                            {titleHeader}
                          </h2>
                          <p className="text-[10px] text-neutral-600 italic font-serif">
                            {coverSubtitle}
                          </p>
                          <div className="h-0.5 w-12 mx-auto my-1" style={{ backgroundColor: currentTheme.secondary }} />
                        </div>

                        {/* Decedent Portrait */}
                        <div className="relative my-1">
                          <div 
                            className="w-36 h-44 rounded-full overflow-hidden border-4 shadow-lg mx-auto bg-neutral-100 flex items-center justify-center"
                            style={{ borderColor: currentTheme.secondary }}
                          >
                            <img
                              src={portraitUrl}
                              alt={caseData.decedent.legalName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Decedent Name & Life Dates */}
                        <div className="space-y-1">
                          <h1 className="font-serif-title font-bold text-xl sm:text-2xl text-neutral-900 leading-tight">
                            {caseData.decedent.legalName}
                          </h1>
                          <div 
                            className="flex items-center justify-center space-x-3 text-xs font-semibold"
                            style={{ color: currentTheme.secondary }}
                          >
                            <span>Sunrise: {caseData.decedent.dateOfBirth || 'June 14, 1948'}</span>
                            <span>•</span>
                            <span>Sunset: {caseData.decedent.dateOfDeath || 'September 18, 2026'}</span>
                          </div>
                        </div>

                        {/* Service Venue & Schedule */}
                        <div className="space-y-1 p-2.5 bg-white/80 rounded-xl border border-black/10 text-xs w-full">
                          <div className="font-bold text-neutral-900">{serviceDateText}</div>
                          <div className="text-[11px] text-neutral-700">{serviceVenueText}</div>
                          <div 
                            className="text-[10px] font-semibold pt-0.5"
                            style={{ color: currentTheme.accent }}
                          >
                            {officiantText}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SPREAD B: INNER SHEET (PAGE 2 [LEFT: ORDER OF SERVICE] & PAGE 3 [RIGHT: OBITUARY]) */}
                  {activeSpread === 'inner' && (
                    <div 
                      className="border-2 border-neutral-300 shadow-xl rounded-2xl p-6 sm:p-8 aspect-[11/8.5] max-w-4xl mx-auto grid grid-cols-2 gap-8 print:border-0 print:shadow-none print:p-0 print:m-0 print:aspect-auto print:max-w-none"
                      style={{ backgroundColor: currentTheme.bg }}
                    >
                      {/* PAGE 2: ORDER OF SERVICE (LEFT PANEL) */}
                      <div 
                        className="p-6 border-2 rounded-xl flex flex-col justify-between space-y-3"
                        style={{ borderColor: currentTheme.secondary, backgroundColor: 'rgba(255,255,255,0.7)' }}
                      >
                        <div className="text-center space-y-1 pb-2 border-b border-black/10">
                          <h3 
                            className="font-serif-title font-bold text-base uppercase tracking-widest"
                            style={{ color: currentTheme.accent }}
                          >
                            Order of Service
                          </h3>
                          <p className="text-[10px] text-neutral-500 italic font-serif">
                            "Blessed are those who mourn, for they shall be comforted." — Matthew 5:4
                          </p>
                        </div>

                        {/* Order List */}
                        <div className="space-y-1.5 text-xs flex-1 justify-center flex flex-col">
                          {orderOfService.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-baseline border-b border-dotted border-black/15 pb-0.5 text-[11px]">
                              <span className="font-serif-title font-bold text-neutral-900">{item.step}</span>
                              <span className="text-[10px] text-neutral-600 truncate max-w-[180px] font-serif italic">{item.leadBy}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 text-center border-t border-black/10">
                          <span 
                            className="text-[10px] font-medium tracking-wide"
                            style={{ color: currentTheme.secondary }}
                          >
                            Please silence all mobile devices during the solemn worship celebration.
                          </span>
                        </div>
                      </div>

                      {/* PAGE 3: THE LIFE & LEGACY OBITUARY (RIGHT PANEL) */}
                      <div 
                        className="p-6 border-2 rounded-xl flex flex-col justify-between space-y-3"
                        style={{ borderColor: currentTheme.secondary, backgroundColor: 'rgba(255,255,255,0.7)' }}
                      >
                        <div className="text-center space-y-1 pb-2 border-b border-black/10">
                          <h3 
                            className="font-serif-title font-bold text-base uppercase tracking-widest"
                            style={{ color: currentTheme.accent }}
                          >
                            {obituaryTitle}
                          </h3>
                          <p 
                            className="text-[10px] font-bold font-serif"
                            style={{ color: currentTheme.secondary }}
                          >
                            {caseData.decedent.legalName}
                          </p>
                        </div>

                        {/* Formatted Obituary Narrative */}
                        <div className="text-[10.5px] text-neutral-700 leading-relaxed font-serif space-y-2 overflow-y-auto flex-1 pr-1">
                          {obituaryParagraphs.map((para, i) => (
                            <p key={i}>
                              {i === 0 && (
                                <span 
                                  className="text-lg font-serif-title font-bold float-left mr-1.5 leading-none"
                                  style={{ color: currentTheme.accent }}
                                >
                                  {para.charAt(0)}
                                </span>
                              )}
                              {i === 0 ? para.slice(1) : para}
                            </p>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-black/10 text-center italic font-serif text-[10px] text-neutral-500">
                          "I have fought the good fight, I have finished the race, I have kept the faith." — 2 Timothy 4:7
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ------------------------------------------------------------------- */}
              {/* PRODUCT 2: DEVOTIONAL PRAYER CARDS (2.5" x 4.25" Front & Back)     */}
              {/* ------------------------------------------------------------------- */}
              {activeProduct === 'prayer' && (
                <div className="max-w-xl mx-auto grid grid-cols-2 gap-6">
                  {/* Front Side */}
                  <div 
                    className="aspect-[2.5/4.25] p-5 rounded-2xl border-2 shadow-xl flex flex-col justify-between items-center text-center relative overflow-hidden"
                    style={{ backgroundColor: currentTheme.bg, borderColor: currentTheme.secondary }}
                  >
                    <div 
                      className="absolute inset-2 border rounded-xl pointer-events-none opacity-40"
                      style={{ borderColor: currentTheme.accent }}
                    />
                    <div className="z-10 space-y-0.5">
                      <span className="text-[9px] font-serif uppercase tracking-widest font-bold" style={{ color: currentTheme.accent }}>
                        In Loving Memory
                      </span>
                    </div>

                    <div className="w-24 h-28 rounded-full border-2 overflow-hidden shadow-md my-1" style={{ borderColor: currentTheme.secondary }}>
                      <img src={portraitUrl} alt={caseData.decedent.legalName} className="w-full h-full object-cover" />
                    </div>

                    <div className="z-10 space-y-0.5">
                      <h3 className="font-serif-title font-bold text-sm text-neutral-900 leading-tight">
                        {caseData.decedent.legalName}
                      </h3>
                      <p className="text-[9px] font-serif italic" style={{ color: currentTheme.secondary }}>
                        {caseData.decedent.dateOfBirth || '1948'} – {caseData.decedent.dateOfDeath || '2026'}
                      </p>
                    </div>

                    <div className="z-10 text-[8px] text-neutral-500 font-serif border-t border-black/10 pt-1 w-full">
                      Benta's Funeral Home • Harlem, NY
                    </div>
                  </div>

                  {/* Back Side: Scripture */}
                  <div 
                    className="aspect-[2.5/4.25] p-5 rounded-2xl border-2 shadow-xl flex flex-col justify-between items-center text-center relative overflow-hidden"
                    style={{ backgroundColor: currentTheme.bg, borderColor: currentTheme.secondary }}
                  >
                    <div 
                      className="absolute inset-2 border rounded-xl pointer-events-none opacity-40"
                      style={{ borderColor: currentTheme.accent }}
                    />
                    <div className="z-10">
                      <h4 className="font-serif-title font-bold text-xs uppercase tracking-wider" style={{ color: currentTheme.accent }}>
                        The 23rd Psalm
                      </h4>
                      <div className="h-0.5 w-8 mx-auto my-1" style={{ backgroundColor: currentTheme.secondary }} />
                    </div>

                    <p className="text-[9.5px] font-serif italic text-neutral-700 leading-relaxed my-auto z-10 px-1">
                      "{prayerCardVerse}"
                    </p>

                    <div className="z-10 text-[8px] font-bold text-neutral-800 font-serif border-t border-black/10 pt-1 w-full">
                      Forever in Our Hearts
                    </div>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------------- */}
              {/* PRODUCT 3: THANK-YOU ACKNOWLEDGMENT NOTE (4.25" x 5.5")            */}
              {/* ------------------------------------------------------------------- */}
              {activeProduct === 'thanks' && (
                <div 
                  className="max-w-lg mx-auto aspect-[5.5/4.25] p-8 rounded-2xl border-2 shadow-xl flex flex-col justify-between items-center text-center relative overflow-hidden"
                  style={{ backgroundColor: currentTheme.bg, borderColor: currentTheme.secondary }}
                >
                  <div 
                    className="absolute inset-3 border rounded-xl pointer-events-none opacity-40"
                    style={{ borderColor: currentTheme.accent }}
                  />

                  <div className="z-10">
                    <Sparkles className="w-5 h-5 mx-auto mb-1 text-amber-500" />
                    <h2 
                      className="font-serif-title font-bold text-lg italic"
                      style={{ color: currentTheme.accent }}
                    >
                      With Sincere Gratitude
                    </h2>
                    <div className="h-0.5 w-12 mx-auto my-1.5" style={{ backgroundColor: currentTheme.secondary }} />
                  </div>

                  <p className="text-xs font-serif leading-relaxed text-neutral-800 px-6 z-10">
                    {acknowledgmentsText}
                  </p>

                  <div className="z-10 space-y-0.5">
                    <span className="font-serif font-bold text-xs text-neutral-900 block">
                      The Family of {caseData.decedent.legalName}
                    </span>
                    <span className="text-[9px] text-neutral-500 font-serif">
                      Benta's Funeral Home • Harlem, New York
                    </span>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------------- */}
              {/* PRODUCT 4: SANCTUARY MEMORIAL POSTER (24" x 36")                   */}
              {/* ------------------------------------------------------------------- */}
              {activeProduct === 'poster' && (
                <div 
                  className="max-w-md mx-auto aspect-[24/36] p-8 rounded-3xl border-4 shadow-2xl flex flex-col justify-between items-center text-center relative overflow-hidden"
                  style={{ backgroundColor: currentTheme.bg, borderColor: currentTheme.secondary }}
                >
                  <div 
                    className="absolute inset-4 border-2 rounded-2xl pointer-events-none opacity-50"
                    style={{ borderColor: currentTheme.accent }}
                  />

                  <div className="z-10 space-y-1">
                    <span 
                      className="text-xs font-serif uppercase tracking-widest font-bold block"
                      style={{ color: currentTheme.secondary }}
                    >
                      Celebrating the Life & Legacy
                    </span>
                    <h2 
                      className="font-serif-title font-bold text-2xl"
                      style={{ color: currentTheme.accent }}
                    >
                      {caseData.decedent.legalName}
                    </h2>
                  </div>

                  <div 
                    className="w-52 h-64 rounded-2xl border-4 overflow-hidden shadow-2xl my-2"
                    style={{ borderColor: currentTheme.secondary }}
                  >
                    <img src={portraitUrl} alt={caseData.decedent.legalName} className="w-full h-full object-cover" />
                  </div>

                  <div className="z-10 space-y-2">
                    <div 
                      className="text-sm font-bold font-serif"
                      style={{ color: currentTheme.secondary }}
                    >
                      {caseData.decedent.dateOfBirth || 'June 14, 1948'} – {caseData.decedent.dateOfDeath || 'September 18, 2026'}
                    </div>
                    <p className="text-xs text-neutral-600 font-serif italic max-w-xs">
                      "I have fought the good fight, I have finished the race, I have kept the faith."
                    </p>
                  </div>

                  <div className="z-10 text-xs text-neutral-500 font-serif border-t border-black/10 pt-2 w-full">
                    Benta's Funeral Home • Harlem, New York
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------------- */}
              {/* PRODUCT 5: MEMORIAL BOOKMARK (2" x 7")                             */}
              {/* ------------------------------------------------------------------- */}
              {activeProduct === 'bookmark' && (
                <div 
                  className="max-w-xs mx-auto aspect-[2/7] p-5 rounded-2xl border-2 shadow-xl flex flex-col justify-between items-center text-center relative overflow-hidden"
                  style={{ backgroundColor: currentTheme.bg, borderColor: currentTheme.secondary }}
                >
                  <div className="w-3 h-3 rounded-full border border-black/30 bg-neutral-200 mb-1" />
                  
                  <div className="z-10">
                    <span className="text-[9px] font-serif uppercase tracking-widest font-bold" style={{ color: currentTheme.accent }}>
                      In Remembrance
                    </span>
                  </div>

                  <div className="w-20 h-24 rounded-full border-2 overflow-hidden shadow-md my-1" style={{ borderColor: currentTheme.secondary }}>
                    <img src={portraitUrl} alt={caseData.decedent.legalName} className="w-full h-full object-cover" />
                  </div>

                  <div className="z-10 space-y-0.5">
                    <h4 className="font-serif-title font-bold text-xs text-neutral-900 leading-tight">
                      {caseData.decedent.legalName}
                    </h4>
                    <p className="text-[8px] font-serif italic" style={{ color: currentTheme.secondary }}>
                      {caseData.decedent.dateOfBirth || '1948'} – {caseData.decedent.dateOfDeath || '2026'}
                    </p>
                  </div>

                  <p className="text-[8px] font-serif italic text-neutral-700 leading-snug px-1 z-10">
                    "Those we love don't go away, they walk beside us every day…"
                  </p>

                  <div className="z-10 text-[7px] text-neutral-500 font-serif border-t border-black/10 pt-1 w-full">
                    Benta's Funeral Home
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------------- */}
              {/* PRODUCT 6: DVD VIDEO TRIBUTE WRAP (11" x 8.5")                     */}
              {/* ------------------------------------------------------------------- */}
              {activeProduct === 'dvd' && (
                <div 
                  className="max-w-3xl mx-auto aspect-[11/8.5] p-6 rounded-2xl border-2 shadow-xl grid grid-cols-5 gap-3 relative overflow-hidden"
                  style={{ backgroundColor: currentTheme.bg, borderColor: currentTheme.secondary }}
                >
                  {/* Back Panel */}
                  <div className="col-span-2 p-3 bg-white/70 rounded-xl border border-black/10 flex flex-col justify-between text-left">
                    <div>
                      <h4 className="font-serif-title font-bold text-xs uppercase" style={{ color: currentTheme.accent }}>
                        Tribute Chapter Index
                      </h4>
                      <div className="space-y-1 text-[9px] text-neutral-700 font-serif mt-2">
                        <div>1. Early Life & Family Heritage</div>
                        <div>2. Church & Community Milestones</div>
                        <div>3. Career & Educational Impact</div>
                        <div>4. Cherished Moments with Children</div>
                        <div>5. Memorial Benediction & Reflections</div>
                      </div>
                    </div>
                    <div className="text-[8px] text-neutral-500 font-serif">
                      Total Runtime: 38 Minutes • High-Definition Keepsake
                    </div>
                  </div>

                  {/* Spine Crease */}
                  <div className="col-span-1 border-x border-dashed border-black/20 flex flex-col items-center justify-center">
                    <span className="text-[8px] font-mono font-bold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180" style={{ color: currentTheme.accent }}>
                      MEMORIAL VIDEO TRIBUTE • {caseData.decedent.legalName}
                    </span>
                  </div>

                  {/* Front Cover */}
                  <div className="col-span-2 p-3 bg-white/70 rounded-xl border border-black/10 flex flex-col justify-between items-center text-center">
                    <span className="text-[8px] font-serif uppercase tracking-widest font-bold" style={{ color: currentTheme.secondary }}>
                      A Life Remembered
                    </span>
                    <div className="w-20 h-24 rounded-lg border-2 overflow-hidden shadow-sm" style={{ borderColor: currentTheme.secondary }}>
                      <img src={portraitUrl} alt={caseData.decedent.legalName} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-serif-title font-bold text-xs text-neutral-900 leading-tight">
                      {caseData.decedent.legalName}
                    </h3>
                    <div className="text-[7.5px] text-neutral-500 font-serif">
                      Benta's Funeral Home • Harlem, NY
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 2: EDIT COVER & PHOTO                                               */}
          {/* ======================================================================= */}
          {activeTab === 'edit_cover' && (
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-xs">
              <h3 className="font-serif-title font-bold text-base text-neutral-900 border-b border-neutral-200 pb-2">
                Cover Titles, Service Venue & Portrait Photo
              </h3>

              {/* Photo Selector */}
              <div>
                <label className="block font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#991b1b]" />
                  <span>Decedent Portrait Photo URL:</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={portraitUrl}
                    onChange={(e) => setPortraitUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 font-mono text-xs outline-none focus:border-[#991b1b]"
                  />
                  <button
                    type="button"
                    onClick={() => setPortraitUrl('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600')}
                    className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl font-bold text-xs"
                  >
                    Sample Photo
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Cover Header Title:</label>
                <input
                  type="text"
                  value={titleHeader}
                  onChange={(e) => setTitleHeader(e.target.value)}
                  className="w-full bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 font-bold outline-none focus:border-[#991b1b]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Cover Subtitle / Motto:</label>
                <input
                  type="text"
                  value={coverSubtitle}
                  onChange={(e) => setCoverSubtitle(e.target.value)}
                  className="w-full bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 outline-none focus:border-[#991b1b]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Service Schedule Line:</label>
                <input
                  type="text"
                  value={serviceDateText}
                  onChange={(e) => setServiceDateText(e.target.value)}
                  className="w-full bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 outline-none focus:border-[#991b1b]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Service Venue & Address:</label>
                <input
                  type="text"
                  value={serviceVenueText}
                  onChange={(e) => setServiceVenueText(e.target.value)}
                  className="w-full bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 outline-none focus:border-[#991b1b]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Officiating Clergy:</label>
                <input
                  type="text"
                  value={officiantText}
                  onChange={(e) => setOfficiantText(e.target.value)}
                  className="w-full bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 outline-none focus:border-[#991b1b]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveTab('preview')}
                  className="px-5 py-2.5 bg-[#991b1b] text-white font-bold text-xs rounded-xl"
                >
                  Save & Return to Preview
                </button>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 3: EDIT OBITUARY & LIFE STORY                                       */}
          {/* ======================================================================= */}
          {activeTab === 'edit_obituary' && (
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-xs">
              <h3 className="font-serif-title font-bold text-base text-neutral-900 border-b border-neutral-200 pb-2">
                Life & Legacy Obituary Text
              </h3>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Obituary Title Heading:</label>
                <input
                  type="text"
                  value={obituaryTitle}
                  onChange={(e) => setObituaryTitle(e.target.value)}
                  className="w-full bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 font-bold outline-none focus:border-[#991b1b]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Obituary Narrative Paragraphs:</label>
                <div className="space-y-2">
                  {obituaryParagraphs.map((p, idx) => (
                    <div key={idx} className="flex gap-2">
                      <textarea
                        rows={3}
                        value={p}
                        onChange={(e) => {
                          const copy = [...obituaryParagraphs];
                          copy[idx] = e.target.value;
                          setObituaryParagraphs(copy);
                        }}
                        className="flex-1 bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 text-xs outline-none focus:border-[#991b1b]"
                      />
                      <button
                        onClick={() => setObituaryParagraphs(obituaryParagraphs.filter((_, i) => i !== idx))}
                        className="p-2 text-neutral-400 hover:text-red-600 self-start"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setObituaryParagraphs([...obituaryParagraphs, 'New paragraph...'])}
                  className="mt-2 text-xs text-[#991b1b] font-bold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Paragraph</span>
                </button>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveTab('preview')}
                  className="px-5 py-2.5 bg-[#991b1b] text-white font-bold text-xs rounded-xl"
                >
                  Save & Return to Preview
                </button>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 4: EDIT ORDER OF SERVICE                                            */}
          {/* ======================================================================= */}
          {activeTab === 'edit_order' && (
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
                <div className="flex items-center space-x-2">
                  <Edit3 className="w-5 h-5 text-[#991b1b]" />
                  <h3 className="font-serif-title font-bold text-base text-neutral-900">
                    Customize Liturgical Order of Service
                  </h3>
                </div>
                <span className="text-xs text-neutral-500">{orderOfService.length} Liturgical Steps</span>
              </div>

              {/* Steps List */}
              <div className="space-y-2">
                {orderOfService.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
                    <span className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-neutral-700 text-[11px] shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={item.step}
                      onChange={(e) => {
                        const copy = [...orderOfService];
                        copy[idx].step = e.target.value;
                        setOrderOfService(copy);
                      }}
                      className="flex-1 bg-white border border-neutral-300 rounded-lg p-2 font-bold text-neutral-900 outline-none focus:border-[#991b1b]"
                    />
                    <input
                      type="text"
                      value={item.leadBy}
                      onChange={(e) => {
                        const copy = [...orderOfService];
                        copy[idx].leadBy = e.target.value;
                        setOrderOfService(copy);
                      }}
                      className="flex-1 bg-white border border-neutral-300 rounded-lg p-2 text-neutral-700 outline-none focus:border-[#991b1b]"
                    />
                    <button
                      onClick={() => handleRemoveOrderStep(idx)}
                      className="p-2 text-neutral-400 hover:text-red-600 rounded-lg transition"
                      title="Remove Step"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Step Row */}
              <div className="pt-3 border-t border-neutral-200 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="New Liturgical Step (e.g. Special Choral Solo)"
                  value={newStepName}
                  onChange={(e) => setNewStepName(e.target.value)}
                  className="flex-1 bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 text-xs outline-none focus:border-[#991b1b]"
                />
                <input
                  type="text"
                  placeholder="Leader / Soloist (e.g. Sister Danielle St. Claire)"
                  value={newStepLead}
                  onChange={(e) => setNewStepLead(e.target.value)}
                  className="flex-1 bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 text-xs outline-none focus:border-[#991b1b]"
                />
                <button
                  onClick={handleAddOrderStep}
                  className="px-4 py-2.5 bg-[#991b1b] hover:bg-red-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Step</span>
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setActiveTab('preview')}
                  className="px-5 py-2.5 bg-neutral-900 text-white font-bold text-xs rounded-xl"
                >
                  Save & Return to Preview
                </button>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 5: EDIT PALLBEARERS, REPAST & SCRIPTURE                             */}
          {/* ======================================================================= */}
          {activeTab === 'edit_back' && (
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-xs">
              <h3 className="font-serif-title font-bold text-base text-neutral-900 border-b border-neutral-200 pb-2">
                Pallbearers, Repast, Family Gratitude & Prayer Card Scripture
              </h3>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Active Pallbearers (One per line):</label>
                <textarea
                  rows={3}
                  value={pallbearers.join('\n')}
                  onChange={(e) => setPallbearers(e.target.value.split('\n').filter(s => s.trim()))}
                  className="w-full bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 outline-none focus:border-[#991b1b]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Honorary Pallbearers (One per line):</label>
                <textarea
                  rows={2}
                  value={honoraryPallbearers.join('\n')}
                  onChange={(e) => setHonoraryPallbearers(e.target.value.split('\n').filter(s => s.trim()))}
                  className="w-full bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 outline-none focus:border-[#991b1b]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Family Message of Gratitude / Acknowledgments:</label>
                <textarea
                  rows={3}
                  value={acknowledgmentsText}
                  onChange={(e) => setAcknowledgmentsText(e.target.value)}
                  className="w-full bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 outline-none focus:border-[#991b1b]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Prayer Card Reverse Verse / Scripture:</label>
                <textarea
                  rows={3}
                  value={prayerCardVerse}
                  onChange={(e) => setPrayerCardVerse(e.target.value)}
                  className="w-full bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 outline-none focus:border-[#991b1b]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Final Resting Place / Cemetery:</label>
                <input
                  type="text"
                  value={finalRestingPlace}
                  onChange={(e) => setFinalRestingPlace(e.target.value)}
                  className="w-full bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 outline-none focus:border-[#991b1b]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Repast / Fellowship Suite:</label>
                <input
                  type="text"
                  value={repastText}
                  onChange={(e) => setRepastText(e.target.value)}
                  className="w-full bg-[#fbfbfd] border border-neutral-300 rounded-xl p-2.5 outline-none focus:border-[#991b1b]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveTab('preview')}
                  className="px-5 py-2.5 bg-[#991b1b] text-white font-bold text-xs rounded-xl"
                >
                  Save & Return to Preview
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
