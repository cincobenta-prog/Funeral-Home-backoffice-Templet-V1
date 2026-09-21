import React, { useState, useMemo } from 'react';
import { 
  GoldenRecordCase, 
  StorefrontOrder, 
  PaperStockType, 
  FinishOptionType, 
  TurnaroundTier,
  PhotoPlacementItem,
  StorefrontDesignTemplate
} from '../../lib/types/funeral';
import { 
  CANVA_STOREFRONT_TEMPLATES, 
  STOREFRONT_CATEGORIES,
  PAPER_STOCK_OPTIONS, 
  FINISH_OPTIONS, 
  cleanTemplateTitle, 
  calculateOrderPrice, 
  generatePlacementManifestSha256 
} from '../../lib/data/canvaStorefrontCatalog';
import { 
  Printer, 
  X, 
  Check,
  ExternalLink,
  Search,
  Sparkles,
  Palette,
  Calculator
} from 'lucide-react';
import { CanvaTemplateVisualLayout } from './CanvaTemplateVisualLayout';

interface StorefrontOrderModalProps {
  caseItem: GoldenRecordCase;
  existingOrders: StorefrontOrder[];
  onSaveOrder: (newOrder: StorefrontOrder) => void;
  onClose: () => void;
  onOpenFullStorefront: () => void;
  onOpenInHouseStudio?: (template: StorefrontDesignTemplate) => void;
}

const QUANTITY_PRESETS = [25, 50, 75, 100, 150, 200, 250, 300, 500];

export const StorefrontOrderModal: React.FC<StorefrontOrderModalProps> = ({
  caseItem,
  existingOrders,
  onSaveOrder,
  onClose,
  onOpenFullStorefront,
  onOpenInHouseStudio
}) => {
  const caseOrders = existingOrders.filter(o => o.caseId === caseItem.id || o.caseNumber === caseItem.caseNumber);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(CANVA_STOREFRONT_TEMPLATES[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(150);
  const [stock, setStock] = useState<PaperStockType>('100# Gloss Cover');
  const [finish, setFinish] = useState<FinishOptionType>('Bi-Fold Single Crease');
  const [turnaround, setTurnaround] = useState<TurnaroundTier>('Standard (48-72h)');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const selectedTemplate = useMemo(() => {
    return CANVA_STOREFRONT_TEMPLATES.find(t => t.id === selectedTemplateId) || CANVA_STOREFRONT_TEMPLATES[0];
  }, [selectedTemplateId]);

  // Filter templates by category and search
  const filteredTemplates = useMemo(() => {
    return CANVA_STOREFRONT_TEMPLATES.filter(t => {
      const matchCat = selectedCategory === 'all' || t.product_type === selectedCategory;
      const matchSearch = !searchQuery.trim() || 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.product_name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const pricing = calculateOrderPrice(selectedTemplate, quantity, stock, finish, turnaround);
  const isRush = turnaround !== 'Standard (48-72h)';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNumber = `BPO-2026-${Math.floor(100 + Math.random() * 900)}`;
    const dueTime = isRush ? Date.now() + 24 * 3600000 : Date.now() + 72 * 3600000;

    const initialPlacements: PhotoPlacementItem[] = [
      {
        id: `plc-${Date.now()}-1`,
        sequence: 0,
        pageNumber: 1,
        placementLabel: 'Front Cover High-Res Portrait',
        photoReference: 'Pending family file transmittal',
        notes: 'Harmonize background tones to match template palette',
        confirmed: true
      }
    ];

    const manifestSha = generatePlacementManifestSha256(initialPlacements);

    const newOrder: StorefrontOrder = {
      id: `ord-${orderNumber.toLowerCase()}`,
      orderNumber,
      caseId: caseItem.id,
      caseNumber: caseItem.caseNumber,
      caseName: caseItem.decedent.legalName,
      serviceDate: caseItem.serviceDate || '2026-09-24',
      templateId: selectedTemplate.id,
      templateTitle: selectedTemplate.title,
      productType: selectedTemplate.product_type,
      family: selectedTemplate.family,
      quantity,
      paperStock: stock,
      finishOption: finish,
      unitPrice: pricing.unitPrice,
      totalPrice: pricing.totalPrice,
      turnaroundTier: turnaround,
      rushRequired: isRush,
      rushReason: isRush ? 'Service requirement (<48h)' : undefined,
      rushApprovedBy: isRush ? 'James Benta (General Manager)' : undefined,
      dueAt: new Date(dueTime).toISOString(),
      status: 'proof_ready',
      currentProofVersion: 1,
      proofs: [
        {
          version: 1,
          artifactSha256: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
          placementManifestSha256: manifestSha,
          artifactPath: `private/proofs/proof-${orderNumber.toLowerCase()}-v1.pdf`,
          pdfUrl: '#',
          decision: 'pending',
          createdAt: new Date().toISOString()
        }
      ],
      photoPlacements: initialPlacements,
      placementManifestSha256: manifestSha,
      preflight: {
        passed: true,
        dpiVerified: true,
        cmykColorGamut: true,
        bleedMarginOk: true,
        profileVersion: 'PDF/X-1a:2001',
        acceptedBy: 'PrintMaster Studio BFH',
        acceptedAt: new Date().toISOString()
      },
      destinationEmail: 'production@bentasprint.nyc',
      destinationVerified: true,
      specialInstructions: specialNotes,
      createdBy: 'James Benta (General Manager)',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syncedToInvoice: true
    };

    onSaveOrder(newOrder);
    onClose();
  };

  const handleLaunchInHouseBuilder = () => {
    if (onOpenInHouseStudio) {
      onOpenInHouseStudio(selectedTemplate);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-[#7f1d1d] text-white px-6 py-3.5 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-900/80 rounded-xl text-amber-300 shadow-inner">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base font-serif-title tracking-wide">
                  Memorial Stationery Studio • {caseItem.decedent.legalName}
                </h3>
                <span className="px-2 py-0.5 bg-amber-400 text-neutral-900 rounded font-mono font-bold text-[10px] shadow-2xs">
                  {caseItem.caseNumber}
                </span>
              </div>
              <p className="text-xs text-neutral-300">
                Direct Backoffice Governed Print Engine • Instant AP-47 Financial Synchronization
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Active Orders for this Case Strip */}
          {caseOrders.length > 0 && (
            <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#b45309] uppercase tracking-wider flex items-center gap-1.5">
                  <Printer className="w-3.5 h-3.5" />
                  Active Stationery Orders for this Case ({caseOrders.length})
                </span>
                <button
                  type="button"
                  onClick={() => { onClose(); onOpenFullStorefront(); }}
                  className="text-xs text-[#991b1b] font-bold hover:underline"
                >
                  View in Full Storefront Studio ➔
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {caseOrders.map(ord => (
                  <div key={ord.id} className="p-2.5 bg-white rounded-lg border border-amber-200/80 text-xs flex justify-between items-center shadow-2xs">
                    <div>
                      <strong className="text-neutral-900 font-mono block">{ord.orderNumber} • {cleanTemplateTitle(ord.templateTitle)}</strong>
                      <span className="text-[11px] text-neutral-500">{ord.quantity} units • {ord.paperStock}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-neutral-900 block">${ord.totalPrice.toFixed(2)}</span>
                      <span className="px-1.5 py-0.2 bg-neutral-100 rounded text-[10px] font-bold text-neutral-700">{ord.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Visual Template Selector Section */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-[#991b1b]" />
                    <span>Choose Template Design ({CANVA_STOREFRONT_TEMPLATES.length} Visual Layouts Available):</span>
                  </label>
                  <p className="text-[11px] text-neutral-500">
                    Browse authentic artwork layouts with framed portraits, gilded borders, and commemorative typography.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => { onClose(); onOpenFullStorefront(); }}
                  className="text-xs text-[#991b1b] hover:underline font-bold self-start sm:self-auto"
                >
                  Open Full Catalog Browser ➔
                </button>
              </div>

              {/* Category Filter Chips & Search Bar */}
              <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                      selectedCategory === 'all'
                        ? 'bg-neutral-900 text-white shadow-2xs'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    All ({CANVA_STOREFRONT_TEMPLATES.length})
                  </button>
                  {STOREFRONT_CATEGORIES.map(cat => (
                    <button
                      key={cat.type}
                      type="button"
                      onClick={() => setSelectedCategory(cat.type)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                        selectedCategory === cat.type
                          ? 'bg-[#991b1b] text-white shadow-2xs'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {cat.label} ({cat.count})
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-56 shrink-0">
                  <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search designs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:bg-white focus:border-[#991b1b] outline-none"
                  />
                </div>
              </div>

              {/* Visual Card Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-1.5 bg-neutral-50/60 rounded-xl border border-neutral-200">
                {filteredTemplates.map(t => {
                  const isSelected = t.id === selectedTemplateId;
                  const unitPriceStr = t.product_type === 'poster' 
                    ? `$${t.base_price}.00 ea` 
                    : `$${(t.base_price / 100).toFixed(2)}/ea`;

                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTemplateId(t.id)}
                      className={`group relative rounded-xl border cursor-pointer transition-all overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#991b1b] ring-2 ring-red-600/30 bg-white shadow-md'
                          : 'border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-xs'
                      }`}
                    >
                      {/* Visual Artwork Thumbnail Mockup */}
                      <div className="h-28 w-full relative overflow-hidden bg-neutral-100 border-b border-neutral-100">
                        <CanvaTemplateVisualLayout
                          template={t}
                          mode="card"
                          sampleName={caseItem.decedent?.legalName || 'Honored Decedent'}
                          sampleDates="1942 – 2026"
                          className="w-full h-full transform transition group-hover:scale-[1.02]"
                        />

                        {/* Selected Checkmark Badge */}
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 z-20 w-5 h-5 bg-[#991b1b] text-white rounded-full flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      {/* Card Meta Description */}
                      <div className="p-2.5 space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span 
                            className="font-bold truncate max-w-[90px]"
                            style={{ color: t.accent || '#815b3e' }}
                          >
                            {t.family}
                          </span>
                          <span className="text-neutral-500 font-mono">{t.page_count}p</span>
                        </div>

                        <h4 className="font-bold text-xs text-neutral-900 line-clamp-1 leading-snug">
                          {cleanTemplateTitle(t.title)}
                        </h4>

                        <div className="pt-1.5 border-t border-neutral-100 flex items-center justify-between text-[10px]">
                          <span className="text-neutral-500">Starting at</span>
                          <span className="font-mono font-bold text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded">
                            {unitPriceStr}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Template Live Preview & In-House Studio Hero Banner */}
              {selectedTemplate && (
                <div className="p-4 bg-gradient-to-r from-neutral-50 via-amber-50/40 to-neutral-50 rounded-xl border border-amber-200/80 flex flex-col sm:flex-row items-center gap-4 shadow-xs">
                  <div className="w-36 h-28 shrink-0 rounded-lg overflow-hidden border border-neutral-300 shadow-xs bg-white">
                    <CanvaTemplateVisualLayout 
                      template={selectedTemplate}
                      mode="card"
                      sampleName={caseItem.decedent?.legalName || 'Honored Decedent'}
                      sampleDates={caseItem.decedent?.dateOfBirth && caseItem.decedent?.dateOfDeath ? `${caseItem.decedent.dateOfBirth} – ${caseItem.decedent.dateOfDeath}` : undefined}
                      className="w-full h-full"
                    />
                  </div>
                  
                  <div className="flex-1 text-xs space-y-2 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="font-bold text-neutral-900 text-sm font-serif-title">
                            {cleanTemplateTitle(selectedTemplate.title)}
                          </strong>
                          <span className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded font-mono font-bold text-[10px]">
                            {selectedTemplate.family}
                          </span>
                        </div>
                        <p className="text-neutral-600 text-[11px] mt-0.5">
                          {selectedTemplate.product_name} • {selectedTemplate.displayed_size} • {selectedTemplate.page_count} Pages
                        </p>
                      </div>

                      {/* Dual Action Buttons: Native In-House Studio (Primary) + Canva (Secondary) */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleLaunchInHouseBuilder}
                          className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Customize in In-House Studio</span>
                        </button>

                        <a 
                          href={`https://www.canva.com/design/${selectedTemplate.id}/edit`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1.5 bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-700 rounded-lg font-semibold text-xs flex items-center gap-1 transition"
                          title="Open in external Canva account"
                        >
                          <ExternalLink className="w-3 h-3 text-neutral-500" />
                          <span>Canva</span>
                        </a>
                      </div>
                    </div>

                    <div className="p-2 bg-white/80 rounded-lg border border-neutral-200/80 text-[11px] text-neutral-600 flex items-center gap-2">
                      <span className="font-semibold text-neutral-800">✨ Self-Contained In-House Editing:</span>
                      <span>No Canva login required. Edit obituary paragraphs, liturgical order of service, hymn stanzas, and portrait photos directly in BFH Back Office.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Print Quantity, Stock & Turnaround Grid */}
            <div className="space-y-4 pt-2 border-t border-neutral-200">
              
              {/* Quantity Selection with Presets & Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
                    Print Run Quantity:
                  </label>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    Selected: <strong>{quantity} units</strong>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  {/* Free-form Integer Input with step=1 and min=1 */}
                  <div className="w-full sm:w-40 shrink-0">
                    <input
                      type="number"
                      min={1}
                      max={5000}
                      step={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full p-2 bg-neutral-50 border border-neutral-300 focus:border-[#991b1b] focus:bg-white rounded-lg text-xs font-mono font-bold outline-none"
                    />
                  </div>

                  {/* 1-Tap Quick Quantity Presets */}
                  <div className="flex items-center gap-1.5 flex-wrap flex-1">
                    <span className="text-[11px] font-semibold text-neutral-500 mr-1">Presets:</span>
                    {QUANTITY_PRESETS.map(preset => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setQuantity(preset)}
                        className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition ${
                          quantity === preset
                            ? 'bg-[#991b1b] text-white shadow-2xs'
                            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Paper Stock & Finishing Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Paper Stock Specification:
                  </label>
                  <select
                    value={stock}
                    onChange={(e) => setStock(e.target.value as PaperStockType)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-semibold outline-none focus:border-[#991b1b]"
                  >
                    {PAPER_STOCK_OPTIONS.map(p => (
                      <option key={p.stock} value={p.stock}>
                        {p.stock} ({p.weightGsm}) — {p.surchargePer100 >= 0 ? `+$${(p.surchargePer100/100).toFixed(2)}/unit` : `-$${(Math.abs(p.surchargePer100)/100).toFixed(2)}/unit`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Finishing / Binding Specification:
                  </label>
                  <select
                    value={finish}
                    onChange={(e) => setFinish(e.target.value as FinishOptionType)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-semibold outline-none focus:border-[#991b1b]"
                  >
                    {FINISH_OPTIONS.map(f => (
                      <option key={f.finish} value={f.finish}>
                        {f.finish} — {f.setupCost === 0 ? 'Included ($0.00)' : `+$${f.setupCost}.00 setup`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Turnaround Tier Selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Production Turnaround Schedule:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['Standard (48-72h)', 'Priority Rush (24h)', 'Same-Day Urgent (12h)'] as TurnaroundTier[]).map(tier => {
                    const isSelected = turnaround === tier;
                    const surcharge = tier === 'Priority Rush (24h)' ? 75 : tier === 'Same-Day Urgent (12h)' ? 125 : 0;
                    return (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setTurnaround(tier)}
                        className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-red-50 border-[#991b1b] ring-2 ring-red-500/20 text-[#991b1b] font-bold shadow-2xs'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        <span className="text-xs">{tier}</span>
                        {surcharge > 0 ? (
                          <span className="text-[10px] text-red-700 font-mono font-bold">
                            +${surcharge}.00
                          </span>
                        ) : (
                          <span className="text-[10px] text-neutral-500 font-mono">
                            Included
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Special Instructions & Chapel Staging Notes:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gold foil embossed cover, staged in Chapel 1 by 8:30 AM on service day"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:bg-white focus:border-[#991b1b] outline-none"
                />
              </div>

            </div>

            {/* Transparent Itemized Pricing Calculation Breakdown */}
            <div className="p-4 bg-gradient-to-br from-neutral-50 via-amber-50/50 to-red-50/40 rounded-xl border border-red-200 space-y-3">
              <div className="flex items-center justify-between border-b border-red-200/60 pb-2">
                <span className="text-xs font-bold text-[#991b1b] uppercase tracking-wider flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" />
                  <span>Itemized Pricing Calculation (Transparent Breakdown)</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-500">
                  Formula: (Base + Stock) × Qty + Finishing + Rush
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-700">
                  <span>Base Unit Printing ({quantity} × ${pricing.baseUnitPrice.toFixed(2)}):</span>
                  <span className="font-mono font-semibold">${(pricing.baseUnitPrice * quantity).toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-neutral-700">
                  <span>Paper Stock Upgrade ({quantity} × ${pricing.stockUnitPrice >= 0 ? '+' : ''}${pricing.stockUnitPrice.toFixed(2)}):</span>
                  <span className="font-mono font-semibold">${(pricing.stockUnitPrice * quantity).toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-neutral-700">
                  <span>Finishing / Binding Setup ({finish}):</span>
                  <span className="font-mono font-semibold">
                    {pricing.finishSurcharge === 0 ? '$0.00' : `+$${pricing.finishSurcharge.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-neutral-700">
                  <span>Turnaround Tier ({turnaround}):</span>
                  <span className="font-mono font-semibold">
                    {pricing.rushSurcharge === 0 ? '$0.00' : `+$${pricing.rushSurcharge.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-red-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xl font-bold font-mono text-[#991b1b]">
                    ${pricing.totalPrice.toFixed(2)} Total
                  </div>
                  <span className="text-[11px] text-neutral-600 font-medium">
                    Effective Rate: <strong className="font-mono">${pricing.unitPrice.toFixed(2)}</strong> / unit • Added to Case NYS Form AP-47 Itemizer
                  </span>
                </div>

                <div className="text-left sm:text-right text-[11px] text-neutral-500">
                  <span>Synchronized with BFH Backoffice Accounting</span>
                </div>
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-bold transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLaunchInHouseBuilder}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-lg text-xs font-bold transition shadow-xs flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open In-House Studio</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-[#991b1b] hover:bg-red-800 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center justify-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Submit Order & Attach to Case</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
