import React, { useState } from 'react';
import { 
  GoldenRecordCase, 
  StorefrontOrder, 
  PaperStockType, 
  FinishOptionType, 
  TurnaroundTier,
  PhotoPlacementItem
} from '../../lib/types/funeral';
import { 
  CANVA_STOREFRONT_TEMPLATES, 
  PAPER_STOCK_OPTIONS, 
  FINISH_OPTIONS, 
  cleanTemplateTitle, 
  calculateOrderPrice, 
  generatePlacementManifestSha256 
} from '../../lib/data/canvaStorefrontCatalog';
import { 
  Printer, 
  X, 
  Check 
} from 'lucide-react';

interface StorefrontOrderModalProps {
  caseItem: GoldenRecordCase;
  existingOrders: StorefrontOrder[];
  onSaveOrder: (newOrder: StorefrontOrder) => void;
  onClose: () => void;
  onOpenFullStorefront: () => void;
}

export const StorefrontOrderModal: React.FC<StorefrontOrderModalProps> = ({
  caseItem,
  existingOrders,
  onSaveOrder,
  onClose,
  onOpenFullStorefront
}) => {
  const caseOrders = existingOrders.filter(o => o.caseId === caseItem.id || o.caseNumber === caseItem.caseNumber);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(CANVA_STOREFRONT_TEMPLATES[0].id);
  const [quantity, setQuantity] = useState<number>(150);
  const [stock, setStock] = useState<PaperStockType>('100# Gloss Cover');
  const [finish, setFinish] = useState<FinishOptionType>('Bi-Fold Single Crease');
  const [turnaround, setTurnaround] = useState<TurnaroundTier>('Standard (48-72h)');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const selectedTemplate = CANVA_STOREFRONT_TEMPLATES.find(t => t.id === selectedTemplateId) || CANVA_STOREFRONT_TEMPLATES[0];

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-neutral-900 to-[#7f1d1d] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-900/80 rounded-lg text-amber-300">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base font-serif-title">
                  Memorial Stationery Studio • {caseItem.decedent.legalName}
                </h3>
                <span className="px-2 py-0.5 bg-amber-400 text-neutral-900 rounded font-mono font-bold text-[10px]">
                  {caseItem.caseNumber}
                </span>
              </div>
              <p className="text-xs text-neutral-300">
                Canva Governed Memorial Suite • Direct Invoice Synchronization & Preflight Dispatch
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Existing Case Orders Strip */}
          {caseOrders.length > 0 && (
            <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#b45309] uppercase tracking-wider flex items-center gap-1.5">
                  <Printer className="w-3.5 h-3.5" />
                  Active Stationery Orders for this Case ({caseOrders.length})
                </span>
                <button
                  onClick={() => { onClose(); onOpenFullStorefront(); }}
                  className="text-xs text-[#991b1b] font-bold hover:underline"
                >
                  View in Full Storefront Studio ➔
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {caseOrders.map(ord => (
                  <div key={ord.id} className="p-2.5 bg-white rounded-lg border border-amber-200 text-xs flex justify-between items-center">
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

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Template Selector Visual Carousel */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                  Select Governed Canva Template (67 Designs Available):
                </label>
                <button
                  type="button"
                  onClick={() => { onClose(); onOpenFullStorefront(); }}
                  className="text-xs text-[#991b1b] hover:underline font-semibold"
                >
                  Open Full 67-Design Catalog Browser ➔
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-56 overflow-y-auto p-1 no-scrollbar">
                {CANVA_STOREFRONT_TEMPLATES.map(t => {
                  const isSelected = t.id === selectedTemplateId;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTemplateId(t.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#991b1b] ring-2 ring-red-500/20 shadow-xs'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      }`}
                      style={{ backgroundColor: isSelected ? '#fff5f5' : t.bg || '#ffffff' }}
                    >
                      <div>
                        <div className="flex justify-between items-center text-[10px] font-bold mb-1">
                          <span style={{ color: t.accent || '#815b3e' }}>{t.family}</span>
                          <span className="text-neutral-500">{t.page_count}p</span>
                        </div>
                        <h4 className="font-bold text-xs text-neutral-900 line-clamp-2 leading-snug">
                          {cleanTemplateTitle(t.title)}
                        </h4>
                      </div>

                      <div className="pt-2 border-t border-black/5 mt-2 flex justify-between items-center text-[10px]">
                        <span className="font-mono font-bold text-neutral-800">${t.base_price}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#991b1b]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Print Quantity, Stock & Turnaround Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Print Run Quantity:
                </label>
                <input
                  type="number"
                  min={1}
                  max={2000}
                  step={selectedTemplate.product_type === 'poster' ? 1 : 25}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Paper Stock:
                </label>
                <select
                  value={stock}
                  onChange={(e) => setStock(e.target.value as PaperStockType)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-semibold outline-none focus:border-[#991b1b]"
                >
                  {PAPER_STOCK_OPTIONS.map(p => (
                    <option key={p.stock} value={p.stock}>
                      {p.stock} ({p.weightGsm})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Finishing / Binding:
                </label>
                <select
                  value={finish}
                  onChange={(e) => setFinish(e.target.value as FinishOptionType)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-semibold outline-none focus:border-[#991b1b]"
                >
                  {FINISH_OPTIONS.map(f => (
                    <option key={f.finish} value={f.finish}>
                      {f.finish}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Turnaround Tier Selector */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                Turnaround Level:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['Standard (48-72h)', 'Priority Rush (24h)', 'Same-Day Urgent (12h)'] as TurnaroundTier[]).map(tier => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setTurnaround(tier)}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                      turnaround === tier
                        ? 'bg-red-50 border-[#991b1b] ring-2 ring-red-500/20 text-[#991b1b] font-bold'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <span className="text-xs">{tier}</span>
                    {tier !== 'Standard (48-72h)' && (
                      <span className="text-[10px] text-red-600 font-mono">+$75</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Special Instructions & Delivery Notes:
              </label>
              <input
                type="text"
                placeholder="e.g. Gold foil embossed cover, staged in Chapel 1 by 8:30 AM"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
              />
            </div>

            {/* Live Pricing Summary Box */}
            <div className="p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl border border-red-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#991b1b] uppercase tracking-wider block">Quoted Stationery Total</span>
                <div className="text-xl font-bold font-mono text-[#991b1b]">
                  ${pricing.totalPrice.toFixed(2)}
                </div>
                <span className="text-[10px] text-neutral-600">
                  ${pricing.unitPrice.toFixed(2)} / unit • Added to NYS Form AP-47 Line Item
                </span>
              </div>

              <div className="text-right text-[11px] text-neutral-600">
                <span>Setup: <strong>${pricing.finishSurcharge.toFixed(2)}</strong></span>
                {pricing.rushSurcharge > 0 && (
                  <div className="text-red-700 font-bold">Rush: +${pricing.rushSurcharge.toFixed(2)}</div>
                )}
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="pt-2 border-t border-neutral-200 flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#991b1b] hover:bg-red-800 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Submit & Attach to Case</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
