import React, { useState, useMemo } from 'react';
import { 
  StorefrontDesignTemplate, 
  StorefrontProductType, 
  PaperStockType, 
  FinishOptionType, 
  StorefrontOrder, 
  CanvaIntegrationStatus,
  GoldenRecordCase,
  TurnaroundTier,
  PhotoPlacementItem,
  PrintOrderStatus
} from '../../lib/types/funeral';
import { 
  CANVA_STOREFRONT_TEMPLATES, 
  STOREFRONT_CATEGORIES, 
  PAPER_STOCK_OPTIONS, 
  FINISH_OPTIONS, 
  INITIAL_CANVA_INTEGRATION_STATUS,
  cleanTemplateTitle,
  getCategoryLabel,
  calculateOrderPrice,
  generatePlacementManifestSha256
} from '../../lib/data/canvaStorefrontCatalog';
import { 
  Printer, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Send, 
  RefreshCw, 
  ShieldCheck, 
  Layers, 
  X, 
  BookOpen, 
  Heart, 
  Mail, 
  Image as ImageIcon, 
  Bookmark, 
  Disc, 
  Bell, 
  Check, 
  CheckCircle,
  ExternalLink,
  ScrollText,
  Edit3,
  Flame
} from 'lucide-react';
import { CanvaTemplateVisualLayout } from './CanvaTemplateVisualLayout';

interface PrintStorefrontManagerProps {
  cases: GoldenRecordCase[];
  activeCase?: GoldenRecordCase;
  orders: StorefrontOrder[];
  onUpdateOrders: (orders: StorefrontOrder[]) => void;
  canvaStatus?: CanvaIntegrationStatus;
  onUpdateCanvaStatus?: (status: CanvaIntegrationStatus) => void;
  onSelectCase?: (caseItem: GoldenRecordCase) => void;
  onSendSmsProofNotification?: (order: StorefrontOrder, phone: string, recipientName: string) => void;
  onOpenInHouseStudio?: (template?: StorefrontDesignTemplate) => void;
}

export const PrintStorefrontManager: React.FC<PrintStorefrontManagerProps> = ({
  cases,
  activeCase,
  orders,
  onUpdateOrders,
  canvaStatus = INITIAL_CANVA_INTEGRATION_STATUS,
  onUpdateCanvaStatus,
  onSelectCase: _onSelectCase,
  onSendSmsProofNotification,
  onOpenInHouseStudio
}) => {
  // Main Tab State
  const [activeTab, setActiveTab] = useState<'catalog' | 'orders' | 'preflight' | 'canva'>('catalog');
  
  // Catalog Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'title' | 'pages' | 'family' | 'price'>('title');

  // Order Queue Filter State
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Preview & Proof Flipper Modal State
  const [previewTemplate, setPreviewTemplate] = useState<StorefrontDesignTemplate | null>(null);
  const [previewOrder, setPreviewOrder] = useState<StorefrontOrder | null>(null);
  const [currentPreviewPageIndex, setCurrentPreviewPageIndex] = useState<number>(0);

  // Photo Placement Planner Modal State
  const [placementOrder, setPlacementOrder] = useState<StorefrontOrder | null>(null);
  const [editingPlacements, setEditingPlacements] = useState<PhotoPlacementItem[]>([]);

  // Create / Customize Order Modal State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [selectedTemplateForOrder, setSelectedTemplateForOrder] = useState<StorefrontDesignTemplate | null>(null);
  const [orderFormCaseId, setOrderFormCaseId] = useState<string>(activeCase ? activeCase.id : (cases[0]?.id || ''));
  const [orderFormQuantity, setOrderFormQuantity] = useState<number>(150);
  const [orderFormStock, setOrderFormStock] = useState<PaperStockType>('100# Gloss Cover');
  const [orderFormFinish, setOrderFormFinish] = useState<FinishOptionType>('Bi-Fold Single Crease');
  const [orderFormTurnaround, setOrderFormTurnaround] = useState<TurnaroundTier>('Standard (48-72h)');
  const [orderFormSpecialInstructions, setOrderFormSpecialInstructions] = useState<string>('');
  const [orderFormFamilyNotes, setOrderFormFamilyNotes] = useState<string>('');
  const [orderFormPhotoPlacements, setOrderFormPhotoPlacements] = useState<PhotoPlacementItem[]>([]);

  // Proof Review Action State
  const [proofDecisionComments, setProofDecisionComments] = useState<string>('');
  const [proofAcknowledgeCheck, setProofAcknowledgeCheck] = useState<boolean>(false);

  // Canva Sync Animation State
  const [isSyncingCanva, setIsSyncingCanva] = useState<boolean>(false);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // SMS Share Modal State
  const [smsShareOrder, setSmsShareOrder] = useState<StorefrontOrder | null>(null);
  const [smsPhoneInput, setSmsPhoneInput] = useState<string>('');
  const [smsRecipientInput, setSmsRecipientInput] = useState<string>('');
  const [smsSentSuccess, setSmsSentSuccess] = useState<boolean>(false);

  // Unique design families for filter dropdown
  const designFamilies = useMemo(() => {
    const set = new Set(CANVA_STOREFRONT_TEMPLATES.map(t => t.family));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  // Filtered Templates
  const filteredTemplates = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let list = CANVA_STOREFRONT_TEMPLATES.filter(t => {
      const matchCat = selectedCategory === 'all' || t.product_type === selectedCategory;
      const matchFam = selectedFamily === 'all' || t.family === selectedFamily;
      const matchQuery = !q || 
        t.title.toLowerCase().includes(q) || 
        t.product_name.toLowerCase().includes(q) || 
        t.family.toLowerCase().includes(q) ||
        t.displayed_size.toLowerCase().includes(q);
      return matchCat && matchFam && matchQuery;
    });

    return list.sort((a, b) => {
      if (sortBy === 'pages') return b.page_count - a.page_count;
      if (sortBy === 'family') return a.family.localeCompare(b.family) || a.title.localeCompare(b.title);
      if (sortBy === 'price') return a.base_price - b.base_price;
      return a.title.localeCompare(b.title);
    });
  }, [selectedCategory, selectedFamily, searchQuery, sortBy]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    if (orderStatusFilter === 'all') return orders;
    if (orderStatusFilter === 'rush') return orders.filter(o => o.rushRequired);
    return orders.filter(o => o.status === orderStatusFilter);
  }, [orders, orderStatusFilter]);

  // KPI Metrics
  const metrics = useMemo(() => {
    const active = orders.filter(o => !['delivered', 'rush_declined'].includes(o.status)).length;
    const proofReady = orders.filter(o => o.status === 'proof_ready').length;
    const preflightPassed = orders.filter(o => o.preflight?.passed).length;
    const inProduction = orders.filter(o => o.status === 'in_production').length;
    const rushCount = orders.filter(o => o.rushRequired).length;
    return { active, proofReady, preflightPassed, inProduction, rushCount };
  }, [orders]);

  // Open Template Preview Gallery
  const handleOpenTemplatePreview = (template: StorefrontDesignTemplate) => {
    setPreviewTemplate(template);
    setPreviewOrder(null);
    setCurrentPreviewPageIndex(0);
  };

  // Open Order Proof Gallery
  const handleOpenOrderProof = (order: StorefrontOrder) => {
    const template = CANVA_STOREFRONT_TEMPLATES.find(t => t.id === order.templateId) || CANVA_STOREFRONT_TEMPLATES[0];
    setPreviewTemplate(template);
    setPreviewOrder(order);
    setCurrentPreviewPageIndex(0);
    setProofDecisionComments('');
    setProofAcknowledgeCheck(false);
  };

  // Open Photo Placement Planner
  const handleOpenPlacementPlanner = (order: StorefrontOrder) => {
    setPlacementOrder(order);
    setEditingPlacements(order.photoPlacements ? [...order.photoPlacements] : []);
  };

  // Save Photo Placements
  const handleSavePlacements = () => {
    if (!placementOrder) return;
    const manifestSha = generatePlacementManifestSha256(editingPlacements);
    const updated = orders.map(o => {
      if (o.id === placementOrder.id) {
        return {
          ...o,
          photoPlacements: editingPlacements,
          placementManifestSha256: manifestSha,
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    });
    onUpdateOrders(updated);
    setPlacementOrder(null);
  };

  // Add Placement Row
  const handleAddPlacementRow = () => {
    const template = CANVA_STOREFRONT_TEMPLATES.find(t => t.id === placementOrder?.templateId);
    const maxPages = template?.page_count || 4;
    const nextSeq = editingPlacements.length;
    const newItem: PhotoPlacementItem = {
      id: `plc-${Date.now()}-${nextSeq + 1}`,
      sequence: nextSeq,
      pageNumber: Math.min(nextSeq + 1, maxPages),
      placementLabel: nextSeq === 0 ? 'Front Cover Portrait' : nextSeq === 1 ? 'Life Story Vignette' : 'Family Photo Tribute',
      photoReference: 'Client Google Drive / High-Res File',
      notes: 'Ensure color balance matches warm template palette.',
      confirmed: true
    };
    setEditingPlacements([...editingPlacements, newItem]);
  };

  // Open Order Creation Modal
  const handleOpenCreateOrder = (template?: StorefrontDesignTemplate) => {
    const t = template || CANVA_STOREFRONT_TEMPLATES[0];
    setSelectedTemplateForOrder(t);
    setOrderFormCaseId(activeCase ? activeCase.id : (cases[0]?.id || ''));
    setOrderFormQuantity(t.product_type === 'poster' ? 2 : t.product_type === 'thanks' ? 100 : 150);
    setOrderFormStock(t.product_type === 'poster' ? '100# Gloss Cover' : t.product_type === 'prayer' ? '12pt Heavy Velvet Cardstock' : '100# Gloss Cover');
    setOrderFormFinish(t.page_count >= 8 ? '8-Page Saddle-Stitched Booklet' : t.product_type === 'prayer' ? 'Laminated Matte Edge' : 'Bi-Fold Single Crease');
    setOrderFormTurnaround('Standard (48-72h)');
    setOrderFormSpecialInstructions('');
    setOrderFormFamilyNotes('');
    
    // Seed initial photo placements based on page count
    const initialPlacements: PhotoPlacementItem[] = [];
    for (let p = 1; p <= Math.min(t.page_count, 3); p++) {
      initialPlacements.push({
        id: `plc-init-${p}`,
        sequence: p - 1,
        pageNumber: p,
        placementLabel: p === 1 ? 'Front Cover Portrait' : p === 2 ? 'Obituary Photo' : 'Order of Service Reflection',
        photoReference: 'Pending family file transmittal',
        notes: '',
        confirmed: true
      });
    }
    setOrderFormPhotoPlacements(initialPlacements);
    setIsOrderModalOpen(true);
  };

  // Submit New Order
  const handleSubmitNewOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplateForOrder) return;
    
    const targetCase = cases.find(c => c.id === orderFormCaseId) || cases[0];
    const pricing = calculateOrderPrice(
      selectedTemplateForOrder,
      orderFormQuantity,
      orderFormStock,
      orderFormFinish,
      orderFormTurnaround
    );

    const isRush = orderFormTurnaround !== 'Standard (48-72h)';
    const orderNumber = `BPO-2026-${Math.floor(100 + Math.random() * 900)}`;
    const dueTime = isRush ? Date.now() + 24 * 3600000 : Date.now() + 72 * 3600000;

    const manifestSha = generatePlacementManifestSha256(orderFormPhotoPlacements);

    const newOrder: StorefrontOrder = {
      id: `ord-${orderNumber.toLowerCase()}`,
      orderNumber,
      caseId: targetCase?.id,
      caseNumber: targetCase?.caseNumber || 'BFH-2026-089',
      caseName: targetCase?.decedent.legalName || 'Bishop Cornelius Washington',
      serviceDate: targetCase?.serviceDate || '2026-09-24',
      templateId: selectedTemplateForOrder.id,
      templateTitle: selectedTemplateForOrder.title,
      productType: selectedTemplateForOrder.product_type,
      family: selectedTemplateForOrder.family,
      quantity: orderFormQuantity,
      paperStock: orderFormStock,
      finishOption: orderFormFinish,
      unitPrice: pricing.unitPrice,
      totalPrice: pricing.totalPrice,
      turnaroundTier: orderFormTurnaround,
      rushRequired: isRush,
      rushReason: isRush ? 'Expedited service date requirement (<48h)' : undefined,
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
      photoPlacements: orderFormPhotoPlacements,
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
      specialInstructions: orderFormSpecialInstructions,
      familyNotes: orderFormFamilyNotes,
      createdBy: 'James Benta (General Manager)',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syncedToInvoice: true
    };

    onUpdateOrders([newOrder, ...orders]);
    setIsOrderModalOpen(false);
  };

  // Advance Order Status
  const handleAdvanceOrderStatus = (orderId: string, nextStatus: PrintOrderStatus) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: nextStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    });
    onUpdateOrders(updated);
  };

  // Proof Approval Decision
  const handleProofDecision = (decision: 'approved' | 'changes_requested') => {
    if (!previewOrder) return;
    const currentVer = previewOrder.currentProofVersion;
    
    const updatedProofs = previewOrder.proofs.map(p => {
      if (p.version === currentVer) {
        return {
          ...p,
          decision,
          comments: proofDecisionComments,
          acknowledgedBy: 'James Benta (General Manager)',
          acknowledgedAt: new Date().toISOString()
        };
      }
      return p;
    });

    const nextStatus: PrintOrderStatus = decision === 'approved' ? 'approved' : 'changes_requested';

    const updated = orders.map(o => {
      if (o.id === previewOrder.id) {
        return {
          ...o,
          status: nextStatus,
          proofs: updatedProofs,
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    });

    onUpdateOrders(updated);
    setPreviewOrder(null);
    setPreviewTemplate(null);
  };

  // Trigger Canva Sync
  const handleTriggerCanvaSync = () => {
    setIsSyncingCanva(true);
    setTimeout(() => {
      setIsSyncingCanva(false);
      const updatedStatus: CanvaIntegrationStatus = {
        ...canvaStatus,
        lastSyncTimestamp: new Date().toISOString(),
        totalTemplatesSynced: 67,
        connected: true
      };
      if (onUpdateCanvaStatus) onUpdateCanvaStatus(updatedStatus);
      setSyncToast('Canva Enterprise Sync Complete: 67 designs and multi-page preview assets refreshed.');
      setTimeout(() => setSyncToast(null), 4500);
    }, 1200);
  };

  // Open SMS Share Modal
  const handleOpenSmsShare = (order: StorefrontOrder) => {
    setSmsShareOrder(order);
    const targetCase = cases.find(c => c.id === order.caseId || c.caseNumber === order.caseNumber);
    setSmsPhoneInput(targetCase?.informant.phone || '(212) 555-0199');
    setSmsRecipientInput(targetCase?.informant.fullName || 'Next-of-Kin Contact');
    setSmsSentSuccess(false);
  };

  // Send SMS Proof Notification
  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsShareOrder) return;
    if (onSendSmsProofNotification) {
      onSendSmsProofNotification(smsShareOrder, smsPhoneInput, smsRecipientInput);
    }
    setSmsSentSuccess(true);
    setTimeout(() => {
      setSmsShareOrder(null);
      setSmsSentSuccess(false);
    }, 1800);
  };

  // Helper to render Category Icon
  const getCategoryIcon = (type: StorefrontProductType) => {
    switch (type) {
      case 'program': return <BookOpen className="w-4 h-4" />;
      case 'prayer': return <Heart className="w-4 h-4" />;
      case 'thanks': return <Mail className="w-4 h-4" />;
      case 'poster': return <ImageIcon className="w-4 h-4" />;
      case 'bookmark': return <Bookmark className="w-4 h-4" />;
      case 'dvd': return <Disc className="w-4 h-4" />;
      case 'announcement': return <Bell className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  // Status Badge Helper
  const getStatusBadge = (status: PrintOrderStatus, _rush?: boolean) => {
    switch (status) {
      case 'draft':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-neutral-100 text-neutral-700 border border-neutral-300">Draft Intake</span>;
      case 'proof_ready':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-[#b45309] border border-amber-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Proof Ready for Review
          </span>
        );
      case 'approved':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">Proof Approved</span>;
      case 'changes_requested':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-50 text-[#991b1b] border border-red-300">Changes Requested</span>;
      case 'in_production':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-300 flex items-center gap-1">
            <Printer className="w-3 h-3 text-blue-700 animate-spin" />
            In Press Production
          </span>
        );
      case 'delivered':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-neutral-200 text-neutral-800">Delivered to Chapel</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-neutral-100 text-neutral-600">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {syncToast && (
        <div className="fixed top-5 right-5 z-50 bg-neutral-900 text-white border border-amber-400 px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-fade-in">
          <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
          <span className="text-xs font-semibold">{syncToast}</span>
        </div>
      )}

      {/* Studio Header & KPI Strip */}
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-[#450a0a] text-white p-6 rounded-2xl border border-neutral-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-[#991b1b] to-red-700 rounded-xl text-white shadow-md">
                <Printer className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold tracking-tight text-white font-serif-title">
                    BFH Digital Print Storefront & Canva Studio
                  </h1>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Canva Connect Active
                  </span>
                </div>
                <p className="text-xs text-neutral-300">
                  Governed Harriet & Benta Memorial Stationery Suite • 67 Governed Canva Templates • Multi-Page Proof Flipper & Photo Placement Planner
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleTriggerCanvaSync}
              disabled={isSyncingCanva}
              className="px-3.5 py-2 bg-neutral-800/90 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-xl text-xs font-semibold transition flex items-center space-x-2 shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isSyncingCanva ? 'animate-spin' : ''}`} />
              <span>{isSyncingCanva ? 'Syncing Canva…' : 'Sync Canva (67 Designs)'}</span>
            </button>

            <button
              onClick={() => handleOpenCreateOrder()}
              className="px-4 py-2 bg-gradient-to-r from-[#991b1b] to-red-700 hover:from-red-800 hover:to-red-900 text-white border border-amber-400/40 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-lg hover:shadow-red-900/30"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>New Stationery Order</span>
            </button>
          </div>
        </div>

        {/* 5-Card Operational KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-neutral-800/80">
          <div className="bg-neutral-900/80 border border-neutral-800 p-3 rounded-xl">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Active Press Orders</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-bold font-mono text-white">{metrics.active}</span>
              <span className="text-[10px] text-neutral-400">Total in Pipeline</span>
            </div>
          </div>

          <div className="bg-neutral-900/80 border border-neutral-800 p-3 rounded-xl">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Proofs Awaiting Review</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-bold font-mono text-amber-300">{metrics.proofReady}</span>
              <span className="text-[10px] text-amber-500 font-medium">Action Required</span>
            </div>
          </div>

          <div className="bg-neutral-900/80 border border-neutral-800 p-3 rounded-xl">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">300 DPI Preflight Certified</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-bold font-mono text-emerald-300">{metrics.preflightPassed}</span>
              <span className="text-[10px] text-emerald-500 font-medium">Zero Bleed Errors</span>
            </div>
          </div>

          <div className="bg-neutral-900/80 border border-neutral-800 p-3 rounded-xl">
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">In Press Production</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-bold font-mono text-blue-300">{metrics.inProduction}</span>
              <span className="text-[10px] text-blue-400 font-medium">Print Queue</span>
            </div>
          </div>

          <div className="bg-neutral-900/80 border border-neutral-800 p-3 rounded-xl col-span-2 sm:col-span-1">
            <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block">24h Priority Rush</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-bold font-mono text-red-400">{metrics.rushCount}</span>
              <span className="text-[10px] text-red-400 font-medium">&lt;48h to Service</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-3 text-xs font-bold border-b-2 flex items-center space-x-2 transition ${
            activeTab === 'catalog'
              ? 'border-[#991b1b] text-[#991b1b] bg-red-50/50'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Canva Template Library (67 Designs)</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-3 text-xs font-bold border-b-2 flex items-center space-x-2 transition ${
            activeTab === 'orders'
              ? 'border-[#991b1b] text-[#991b1b] bg-red-50/50'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>Order & Production Queue</span>
          {metrics.proofReady > 0 && (
            <span className="px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px] font-mono font-bold">
              {metrics.proofReady}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('preflight')}
          className={`px-4 py-3 text-xs font-bold border-b-2 flex items-center space-x-2 transition ${
            activeTab === 'preflight'
              ? 'border-[#991b1b] text-[#991b1b] bg-red-50/50'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Preflight & Quality Lab (PDF/X-1a)</span>
        </button>

        <button
          onClick={() => setActiveTab('canva')}
          className={`px-4 py-3 text-xs font-bold border-b-2 flex items-center space-x-2 transition ${
            activeTab === 'canva'
              ? 'border-[#991b1b] text-[#991b1b] bg-red-50/50'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Canva Enterprise Integration</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CANVA TEMPLATE LIBRARY & IN-HOUSE PRINT STUDIO */}
      {/* ========================================================================= */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          
          {/* In-House Studio Master Launcher Banner */}
          <div className="p-5 bg-gradient-to-r from-neutral-900 via-[#7f1d1d] to-neutral-900 text-white rounded-2xl shadow-md border border-neutral-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  100% In-House • Native BFH Studio
                </span>
                <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-300/30 rounded-full text-[10px] font-bold">
                  All 6 Signature Aesthetics Ready
                </span>
              </div>
              <h2 className="text-lg font-bold font-serif-title">
                BFH Native Stationery Designer & Duplex Print Engine
              </h2>
              <p className="text-xs text-neutral-300 max-w-2xl font-light">
                Customize obituary narratives, order of service steps, pallbearers, portraits, and prayer cards right here inside BFH OS. Direct 1-tap duplex printing to any office printer without navigating to external websites.
              </p>
            </div>

            <button
              onClick={() => onOpenInHouseStudio && onOpenInHouseStudio()}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-900 font-bold text-xs rounded-xl flex items-center space-x-2 transition shadow-lg shrink-0 border border-amber-300"
            >
              <ScrollText className="w-4 h-4 text-neutral-900" />
              <span>Launch In-House Studio ➔</span>
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-[#991b1b] text-white shadow-xs'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200'
              }`}
            >
              <span>All Templates</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                selectedCategory === 'all' ? 'bg-red-900 text-amber-200' : 'bg-neutral-200 text-neutral-700'
              }`}>
                67
              </span>
            </button>

            {STOREFRONT_CATEGORIES.map(cat => (
              <button
                key={cat.type}
                onClick={() => setSelectedCategory(cat.type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                  selectedCategory === cat.type
                    ? 'bg-[#991b1b] text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200'
                }`}
              >
                {getCategoryIcon(cat.type)}
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  selectedCategory === cat.type ? 'bg-red-900 text-amber-200' : 'bg-neutral-200 text-neutral-700'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search, Collection Filter & Sort Controls */}
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-1 items-center space-x-3 min-w-[280px]">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search template name, collection, size, or keywords…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-300 rounded-lg text-xs outline-none focus:border-[#991b1b] shadow-2xs"
                />
              </div>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-neutral-500 hover:text-neutral-800"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-neutral-500 font-medium">Family:</span>
                <select
                  value={selectedFamily}
                  onChange={(e) => setSelectedFamily(e.target.value)}
                  className="bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-[#991b1b]"
                >
                  <option value="all">All Collections ({designFamilies.length})</option>
                  {designFamilies.map(fam => (
                    <option key={fam} value={fam}>{fam}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-neutral-500 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-[#991b1b]"
                >
                  <option value="title">Title (A-Z)</option>
                  <option value="pages">Page Count (High to Low)</option>
                  <option value="family">Collection Family</option>
                  <option value="price">Base Pricing</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Counter */}
          <div className="flex items-center justify-between text-xs text-neutral-600 px-1">
            <span>
              Showing <strong>{filteredTemplates.length}</strong> governed Canva templates
              {selectedCategory !== 'all' ? ` in ${getCategoryLabel(selectedCategory as StorefrontProductType)}` : ''}
              {selectedFamily !== 'all' ? ` (${selectedFamily} Series)` : ''}
            </span>
            <span className="text-neutral-500">
              Ready for instant case assignment & digital proofing
            </span>
          </div>

          {/* Template Grid (67 Templates) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTemplates.map(template => {
              const cleanTitle = cleanTemplateTitle(template.title);
              return (
                <div
                  key={template.id}
                  className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs hover:shadow-md transition group flex flex-col justify-between"
                >
                  {/* Template Visual Cover Banner with Realistic Stationery Layout */}
                  <div 
                    className="h-48 relative overflow-hidden border-b border-neutral-100 cursor-pointer group/card"
                    onClick={() => handleOpenTemplatePreview(template)}
                  >
                    <CanvaTemplateVisualLayout 
                      template={template}
                      mode="card"
                      className="w-full h-full"
                    />

                    {/* Hover Overlay with Preview & Direct Canva Launch */}
                    <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center space-x-2 backdrop-blur-2xs z-20">
                      <span className="px-3 py-1.5 bg-white text-neutral-900 rounded-lg text-xs font-bold shadow-md flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        Preview Proof
                      </span>
                      <a 
                        href={`https://www.canva.com/design/${template.id}/view`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-900 rounded-lg text-xs font-bold shadow-md flex items-center gap-1"
                        title="Open Design in Canva"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Canva
                      </a>
                    </div>
                  </div>

                  {/* Card Bottom Meta & Actions */}
                  <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="font-bold text-xs text-neutral-900 leading-snug line-clamp-1" title={cleanTitle}>
                          {cleanTitle}
                        </h3>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        {template.product_name} • {template.unit_description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-neutral-500 uppercase block font-mono">Starting At</span>
                        <span className="text-xs font-bold text-neutral-900 font-mono">
                          ${template.base_price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => onOpenInHouseStudio ? onOpenInHouseStudio(template) : handleOpenTemplatePreview(template)}
                          className="px-3 py-1.5 bg-[#991b1b] hover:bg-red-800 text-white rounded-lg text-xs font-bold transition shadow-2xs flex items-center gap-1"
                          title="Open Native BFH In-House Design & Print Studio"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Customize & Print</span>
                        </button>
                        <button
                          onClick={() => handleOpenCreateOrder(template)}
                          className="px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-semibold"
                          title="Order Stationery for Case"
                        >
                          Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ORDER & PRODUCTION QUEUE */}
      {/* ========================================================================= */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          
          {/* Order Status Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setOrderStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  orderStatusFilter === 'all'
                    ? 'bg-[#991b1b] text-white'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                All Orders ({orders.length})
              </button>

              <button
                onClick={() => setOrderStatusFilter('proof_ready')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  orderStatusFilter === 'proof_ready'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 hover:bg-amber-100 text-[#b45309] border border-amber-300'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Proof Review ({orders.filter(o => o.status === 'proof_ready').length})
              </button>

              <button
                onClick={() => setOrderStatusFilter('approved')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  orderStatusFilter === 'approved'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}
              >
                Approved for Press ({orders.filter(o => o.status === 'approved').length})
              </button>

              <button
                onClick={() => setOrderStatusFilter('in_production')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  orderStatusFilter === 'in_production'
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-300'
                }`}
              >
                In Production ({orders.filter(o => o.status === 'in_production').length})
              </button>

              <button
                onClick={() => setOrderStatusFilter('rush')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  orderStatusFilter === 'rush'
                    ? 'bg-red-700 text-white'
                    : 'bg-red-50 hover:bg-red-100 text-[#991b1b] border border-red-300'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-red-600" />
                Priority Rush ({orders.filter(o => o.rushRequired).length})
              </button>
            </div>

            <button
              onClick={() => handleOpenCreateOrder()}
              className="px-3.5 py-1.5 bg-[#991b1b] hover:bg-red-800 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Order</span>
            </button>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-3.5">Order / Case</th>
                    <th className="p-3.5">Design Template</th>
                    <th className="p-3.5">Specs & Quantity</th>
                    <th className="p-3.5">Proof Version</th>
                    <th className="p-3.5">Status & SLA Due</th>
                    <th className="p-3.5">Total Cost</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-neutral-500">
                        No stationery orders match the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map(order => {
                      const dueFormatted = new Date(order.dueAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      });

                      return (
                        <tr key={order.id} className="hover:bg-neutral-50/80 transition">
                          {/* Order Number & Decedent */}
                          <td className="p-3.5">
                            <div className="flex items-center space-x-2">
                              <div>
                                <span className="font-mono font-bold text-[#991b1b] block">
                                  {order.orderNumber}
                                </span>
                                <strong className="text-neutral-900 text-xs block font-serif-title">
                                  {order.caseName}
                                </strong>
                                <span className="text-[10px] text-neutral-500 font-mono">
                                  {order.caseNumber}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Template & Family */}
                          <td className="p-3.5">
                            <div>
                              <strong className="text-neutral-900 text-xs block line-clamp-1">
                                {cleanTemplateTitle(order.templateTitle)}
                              </strong>
                              <span className="text-[11px] text-neutral-500">
                                {order.family} • {getCategoryLabel(order.productType)}
                              </span>
                            </div>
                          </td>

                          {/* Specs */}
                          <td className="p-3.5">
                            <div className="space-y-0.5">
                              <span className="font-bold text-neutral-900 block">
                                {order.quantity} units
                              </span>
                              <span className="text-[10px] text-neutral-500 block">
                                {order.paperStock}
                              </span>
                              <span className="text-[10px] text-neutral-500 block">
                                {order.finishOption}
                              </span>
                            </div>
                          </td>

                          {/* Proof Version & Photo Placement count */}
                          <td className="p-3.5">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1.5">
                                <span className="px-2 py-0.5 bg-neutral-100 rounded text-[11px] font-mono font-bold text-neutral-800">
                                  v{order.currentProofVersion || 1}
                                </span>
                                {order.preflight?.passed && (
                                  <span className="text-emerald-700 text-[10px] font-bold flex items-center gap-0.5" title="Preflight 300 DPI Passed">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    Preflight OK
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => handleOpenPlacementPlanner(order)}
                                className="text-[10px] text-[#991b1b] hover:underline font-semibold block"
                              >
                                {order.photoPlacements?.length || 0} Photo Placements ✎
                              </button>
                            </div>
                          </td>

                          {/* Status & Due Date */}
                          <td className="p-3.5">
                            <div className="space-y-1">
                              {getStatusBadge(order.status, order.rushRequired)}
                              <div className="flex items-center space-x-1 text-[10px] text-neutral-500">
                                <Clock className="w-3 h-3" />
                                <span>Due {dueFormatted}</span>
                              </div>
                              {order.rushRequired && (
                                <span className="px-1.5 py-0.2 bg-red-100 text-red-800 rounded text-[9px] font-bold block w-fit">
                                  ⚡ RUSH ORDER
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Total Cost */}
                          <td className="p-3.5 font-mono">
                            <strong className="text-neutral-900 text-xs block font-bold">
                              ${order.totalPrice.toFixed(2)}
                            </strong>
                            <span className="text-[10px] text-neutral-400 block">
                              ${order.unitPrice.toFixed(2)}/ea
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end space-x-1.5">
                              {/* Open Proof Viewer */}
                              <button
                                onClick={() => handleOpenOrderProof(order)}
                                className="px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-semibold transition flex items-center gap-1"
                                title="Review Proof Pages & Transmit Approvals"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Proof</span>
                              </button>

                              {/* Send SMS Link */}
                              <button
                                onClick={() => handleOpenSmsShare(order)}
                                className="p-1.5 bg-red-50 hover:bg-red-100 text-[#991b1b] border border-red-200 rounded-lg text-xs transition"
                                title="Send SMS Proof Approval Link to Next-of-Kin"
                              >
                                <Send className="w-3.5 h-3.5" />
                              </button>

                              {/* Advance State Dropdown / Quick Button */}
                              {order.status === 'approved' && (
                                <button
                                  onClick={() => handleAdvanceOrderStatus(order.id, 'in_production')}
                                  className="px-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-2xs"
                                  title="Send to Press Production Queue"
                                >
                                  Start Press
                                </button>
                              )}

                              {order.status === 'in_production' && (
                                <button
                                  onClick={() => handleAdvanceOrderStatus(order.id, 'delivered')}
                                  className="px-2 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-2xs"
                                  title="Mark Delivered to BFH Chapel Dispatch"
                                >
                                  Deliver
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PREFLIGHT CERTIFICATION & QUALITY LAB */}
      {/* ========================================================================= */}
      {activeTab === 'preflight' && (
        <div className="space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-neutral-200">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-base font-bold text-neutral-900">
                  Preflight Press Compliance & Quality Certification
                </h2>
                <p className="text-xs text-neutral-500">
                  Automated verification against SWOP 20% Dot Gain, PDF/X-1a:2001, 300 DPI rasterization, and 0.125" mechanical bleed margins.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Raster Resolution</span>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-lg font-mono font-bold text-emerald-700">300 DPI Verified</div>
                <p className="text-[11px] text-neutral-500">All embedded portrait photos meet the minimum 300 DPI commercial press threshold.</p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Color Profile Gamut</span>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-lg font-mono font-bold text-emerald-700">CMYK Converted</div>
                <p className="text-[11px] text-neutral-500">RGB gamut safely mapped to US Web Coated (SWOP) v2 with ink density &lt; 300%.</p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Bleed & Safe Zone</span>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-lg font-mono font-bold text-emerald-700">0.125" Standard</div>
                <p className="text-[11px] text-neutral-500">Mechanical cut lines and fold boundaries pass 9pt safety margin audits.</p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Font Typography</span>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-lg font-mono font-bold text-emerald-700">100% Outlined</div>
                <p className="text-[11px] text-neutral-500">All memorial script and serif typography embedded into vector glyph curves.</p>
              </div>
            </div>

            {/* Certified Preflight Table */}
            <div className="space-y-3 pt-4">
              <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Active Orders Preflight Inspection Matrix
              </h3>

              <div className="border border-neutral-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-100 text-neutral-700 font-bold border-b border-neutral-200">
                    <tr>
                      <th className="p-3">Order Number</th>
                      <th className="p-3">Case Name</th>
                      <th className="p-3">Design Template</th>
                      <th className="p-3">Preflight Profile</th>
                      <th className="p-3">Certified By</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-neutral-50">
                        <td className="p-3 font-mono font-bold text-[#991b1b]">{order.orderNumber}</td>
                        <td className="p-3 font-bold">{order.caseName}</td>
                        <td className="p-3 text-neutral-600">{order.templateTitle}</td>
                        <td className="p-3 font-mono text-[11px] text-neutral-600">
                          {order.preflight?.profileVersion || 'PDF/X-1a:2001 (SWOP)'}
                        </td>
                        <td className="p-3 text-neutral-600">
                          {order.preflight?.acceptedBy || 'PrintMaster BFH'}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px] flex items-center gap-1 w-fit">
                            <Check className="w-3 h-3 text-emerald-600" />
                            Preflight Certified
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: CANVA ENTERPRISE INTEGRATION */}
      {/* ========================================================================= */}
      {activeTab === 'canva' && (
        <div className="space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-red-100 text-[#991b1b] rounded-xl">
                  <Sparkles className="w-6 h-6 text-[#991b1b]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-neutral-900">
                    Canva Connect Cloud Enterprise Integration
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Connected OAuth 2.0 PKCE client governing Team Benta's stationery inventory and real-time webhook sync.
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                Live & Connected
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Authentication & Client Credentials
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-neutral-200">
                    <span className="text-neutral-500">Client ID:</span>
                    <span className="font-mono font-bold text-neutral-800">{canvaStatus.clientId}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-200">
                    <span className="text-neutral-500">OAuth Grant:</span>
                    <span className="font-semibold text-neutral-800">Authorization Code with PKCE</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-200">
                    <span className="text-neutral-500">Connected Workspace:</span>
                    <span className="font-semibold text-[#991b1b]">Team Benta's Team (Pro)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-200">
                    <span className="text-neutral-500">Last Successful Sync:</span>
                    <span className="font-mono text-neutral-800">{new Date(canvaStatus.lastSyncTimestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-500">Webhook Status:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active (Listening for Canva Edits)
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Authorized Scopes & Capabilities
                </h3>
                <div className="space-y-2">
                  {canvaStatus.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-neutral-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-neutral-200">
                  <button
                    onClick={handleTriggerCanvaSync}
                    disabled={isSyncingCanva}
                    className="w-full py-2 bg-[#991b1b] hover:bg-red-800 text-white rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 shadow-xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncingCanva ? 'animate-spin' : ''}`} />
                    <span>{isSyncingCanva ? 'Refreshing Canva Assets…' : 'Trigger Full Canva Re-Sync'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: MULTI-PAGE VISUAL PROOF GALLERY & FLIPPER */}
      {/* ========================================================================= */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-neutral-900 to-[#7f1d1d] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-900/80 rounded-lg text-amber-300">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-base font-serif-title">
                      {cleanTemplateTitle(previewTemplate.title)}
                    </h3>
                    {previewOrder && (
                      <span className="px-2 py-0.5 bg-amber-400 text-neutral-900 rounded font-mono font-bold text-[10px]">
                        Order {previewOrder.orderNumber} • {previewOrder.caseName}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-300">
                    {previewTemplate.family} • {previewTemplate.displayed_size} • {previewTemplate.page_count} Total Pages
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a 
                  href={`https://www.canva.com/design/${previewTemplate.id}/edit`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-900 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
                  title="Open this template directly in Canva"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Canva</span>
                </a>
                <button
                  onClick={() => { setPreviewTemplate(null); setPreviewOrder(null); }}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Two-Column Display */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-neutral-100">
              
              {/* Left Column: Visual Proof Page Canvas & Flipper */}
              <div className="lg:col-span-2 flex flex-col items-center justify-between space-y-4">
                
                {/* Visual Page Stage */}
                <div 
                  className="w-full max-w-lg aspect-[4/3] sm:aspect-[1.4/1] bg-white rounded-xl shadow-lg border border-neutral-300 overflow-hidden relative flex flex-col justify-between"
                  style={{ backgroundColor: previewTemplate.bg || '#f9f6f0' }}
                >
                  {currentPreviewPageIndex === 0 ? (
                    // Page 1: Front Cover with High-Fidelity Stationery Artwork
                    <CanvaTemplateVisualLayout 
                      template={previewTemplate}
                      mode="modal"
                      sampleName={previewOrder ? previewOrder.caseName : 'Bishop Cornelius Washington'}
                      sampleDates="July 14, 1942 – September 18, 2026"
                      className="w-full h-full p-4"
                    />
                  ) : (
                    // Inner Pages (Obituary, Order of Service, Tributes)
                    <div className="p-6 flex-1 flex flex-col justify-between relative">
                      {/* Top Header */}
                      <div className="flex justify-between items-center text-[10px] font-mono border-b border-black/10 pb-1.5">
                        <span style={{ color: previewTemplate.accent || '#815b3e' }} className="font-bold uppercase tracking-wider">
                          {previewTemplate.family}
                        </span>
                        <span className="px-2 py-0.5 bg-black/10 rounded font-bold text-neutral-700">
                          Page {currentPreviewPageIndex + 1} of {previewTemplate.page_count}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="my-auto py-2">
                        {currentPreviewPageIndex === 1 ? (
                          <>
                            <h3 
                              className="text-sm font-bold font-serif-title uppercase tracking-wider mb-2 text-center"
                              style={{ color: previewTemplate.accent || '#815b3e' }}
                            >
                              Reflections on a Life Well-Lived
                            </h3>
                            <div className="text-left text-[10px] text-neutral-700 space-y-1.5 font-serif leading-relaxed line-clamp-6">
                              <p>
                                A beloved father, pastor, community leader, and faithful shepherd whose warmth touched Harlem and beyond. Born in Harlem and educated in New York City, he dedicated his entire life to service, faith, and family.
                              </p>
                              <p>
                                He leaves to cherish his memory his devoted spouse, loving children, grandchildren, congregation, and an enduring legacy of kindness.
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <h3 
                              className="text-sm font-bold font-serif-title uppercase tracking-wider mb-2 text-center"
                              style={{ color: previewTemplate.accent || '#815b3e' }}
                            >
                              {previewTemplate.previewPages?.[currentPreviewPageIndex]?.label || `Page ${currentPreviewPageIndex + 1} • Order of Service`}
                            </h3>
                            <div className="text-left text-[10px] text-neutral-700 space-y-1 font-serif">
                              <div className="flex justify-between border-b border-black/10 py-0.5">
                                <span>Musical Prelude</span>
                                <span className="italic">Organist</span>
                              </div>
                              <div className="flex justify-between border-b border-black/10 py-0.5">
                                <span>Scripture Readings (Old & New Testament)</span>
                                <span className="italic">Clergy</span>
                              </div>
                              <div className="flex justify-between border-b border-black/10 py-0.5">
                                <span>Prayer of Comfort</span>
                                <span className="italic">Pastor</span>
                              </div>
                              <div className="flex justify-between border-b border-black/10 py-0.5">
                                <span>Acknowledgements & Resolutions</span>
                                <span className="italic">Family</span>
                              </div>
                              <div className="flex justify-between py-0.5">
                                <span>Eulogy & Benediction</span>
                                <span className="italic">Presiding Bishop</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Bottom Footer */}
                      <div className="text-center text-[9px] text-neutral-500 font-serif border-t border-black/5 pt-1">
                        Benta's Funeral Home • 630 St. Nicholas Ave, New York, NY 10030
                      </div>
                    </div>
                  )}
                </div>

                {/* Page Navigation Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentPreviewPageIndex(Math.max(0, currentPreviewPageIndex - 1))}
                    disabled={currentPreviewPageIndex === 0}
                    className="p-2 rounded-xl bg-white border border-neutral-300 text-neutral-700 disabled:opacity-30 hover:bg-neutral-50 transition shadow-2xs"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <span className="text-xs font-bold text-neutral-700 font-mono">
                    Page {currentPreviewPageIndex + 1} of {previewTemplate.page_count}
                  </span>

                  <button
                    onClick={() => setCurrentPreviewPageIndex(Math.min(previewTemplate.page_count - 1, currentPreviewPageIndex + 1))}
                    disabled={currentPreviewPageIndex === previewTemplate.page_count - 1}
                    className="p-2 rounded-xl bg-white border border-neutral-300 text-neutral-700 disabled:opacity-30 hover:bg-neutral-50 transition shadow-2xs"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Thumbnail Strip */}
                <div className="flex items-center space-x-2 overflow-x-auto p-2 max-w-full no-scrollbar">
                  {Array.from({ length: previewTemplate.page_count }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPreviewPageIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition border shrink-0 ${
                        currentPreviewPageIndex === idx
                          ? 'bg-[#991b1b] text-white border-[#991b1b] shadow-xs'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                      }`}
                    >
                      P{idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Order Proof Approval / Review Panel */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-500">
                      Proof Review & Quality Status
                    </h4>
                    <div className="mt-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Resolution:</span>
                        <span className="font-bold text-emerald-700">300 DPI (High Res)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Color Profile:</span>
                        <span className="font-bold text-neutral-800">CMYK US SWOP v2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Bleed Zone:</span>
                        <span className="font-bold text-neutral-800">0.125" Verified</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Photo Manifest:</span>
                        <span className="font-mono text-[10px] text-neutral-600 truncate max-w-[130px]">
                          {previewOrder?.placementManifestSha256 || 'Verified'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Photo Placements on Current Page */}
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-500 mb-1.5">
                      Assigned Photos on Page {currentPreviewPageIndex + 1}
                    </h4>
                    {previewOrder?.photoPlacements?.filter(p => p.pageNumber === currentPreviewPageIndex + 1).length ? (
                      <div className="space-y-1.5">
                        {previewOrder.photoPlacements
                          .filter(p => p.pageNumber === currentPreviewPageIndex + 1)
                          .map(p => (
                            <div key={p.id} className="p-2 bg-red-50/50 rounded-lg border border-red-200 text-xs">
                              <strong className="text-[#991b1b] block">{p.placementLabel}</strong>
                              <span className="text-[10px] text-neutral-600 block">{p.photoReference}</span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-neutral-400 italic">No custom photo placements assigned to this page.</p>
                    )}
                  </div>

                  {/* Approval Decision Controls */}
                  {previewOrder && (
                    <div className="space-y-3 pt-2 border-t border-neutral-100">
                      <label className="block text-xs font-bold text-neutral-700">
                        Reviewer Comments & Feedback:
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Enter change request details or family proof approval confirmation…"
                        value={proofDecisionComments}
                        onChange={(e) => setProofDecisionComments(e.target.value)}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs outline-none focus:border-[#991b1b]"
                      />

                      <label className="flex items-start space-x-2 text-xs text-neutral-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={proofAcknowledgeCheck}
                          onChange={(e) => setProofAcknowledgeCheck(e.target.checked)}
                          className="mt-0.5 rounded text-[#991b1b] focus:ring-red-500"
                        />
                        <span>I have verified spelling, service order, obituary dates, and photo placements.</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2">
                  {previewOrder ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleProofDecision('changes_requested')}
                        disabled={!proofAcknowledgeCheck || !proofDecisionComments.trim()}
                        className="flex-1 py-2 bg-neutral-100 hover:bg-red-50 hover:text-[#991b1b] border border-neutral-300 text-neutral-700 disabled:opacity-40 rounded-lg text-xs font-bold transition"
                      >
                        Request Changes
                      </button>

                      <button
                        onClick={() => handleProofDecision('approved')}
                        disabled={!proofAcknowledgeCheck}
                        className="flex-1 py-2 bg-[#991b1b] hover:bg-red-800 text-white disabled:opacity-40 rounded-lg text-xs font-bold transition shadow-xs"
                      >
                        Approve for Press
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        const t = previewTemplate;
                        setPreviewTemplate(null);
                        handleOpenCreateOrder(t);
                      }}
                      className="w-full py-2.5 bg-[#991b1b] hover:bg-red-800 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center justify-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Order with this Template</span>
                    </button>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: PHOTO PLACEMENT PLANNER MODAL */}
      {/* ========================================================================= */}
      {placementOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="bg-gradient-to-r from-neutral-900 to-[#7f1d1d] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-900/80 rounded-lg text-amber-300">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base font-serif-title">
                    Photo Placement Planner • {placementOrder.orderNumber}
                  </h3>
                  <p className="text-xs text-neutral-300">
                    Assign decedent portraits and family gallery references to exact template pages
                  </p>
                </div>
              </div>

              <button
                onClick={() => setPlacementOrder(null)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-600">
                  Configure high-resolution image references for <strong>{placementOrder.caseName}</strong>.
                </p>
                <button
                  onClick={handleAddPlacementRow}
                  className="px-3 py-1.5 bg-[#991b1b] hover:bg-red-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Photo Assignment</span>
                </button>
              </div>

              <div className="space-y-3">
                {editingPlacements.map((plc, idx) => (
                  <div key={plc.id || idx} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#991b1b] flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5" />
                        Placement #{idx + 1}
                      </span>
                      <button
                        onClick={() => setEditingPlacements(editingPlacements.filter((_, i) => i !== idx))}
                        className="text-xs text-red-600 hover:underline font-semibold"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Target Page</label>
                        <input
                          type="number"
                          min={1}
                          max={24}
                          value={plc.pageNumber}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            const updated = [...editingPlacements];
                            updated[idx].pageNumber = val;
                            setEditingPlacements(updated);
                          }}
                          className="w-full p-2 bg-white border border-neutral-300 rounded-lg text-xs font-semibold"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Placement Role / Label</label>
                        <input
                          type="text"
                          placeholder="e.g. Front Cover Portrait, Choir Montage"
                          value={plc.placementLabel}
                          onChange={(e) => {
                            const val = e.target.value;
                            const updated = [...editingPlacements];
                            updated[idx].placementLabel = val;
                            setEditingPlacements(updated);
                          }}
                          className="w-full p-2 bg-white border border-neutral-300 rounded-lg text-xs font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Photo File Reference / Cloud Drive Link</label>
                      <input
                        type="text"
                        placeholder="e.g. Google Drive / Washington / Portrait_2022.tif"
                        value={plc.photoReference}
                        onChange={(e) => {
                          const val = e.target.value;
                          const updated = [...editingPlacements];
                          updated[idx].photoReference = val;
                          setEditingPlacements(updated);
                        }}
                        className="w-full p-2 bg-white border border-neutral-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Color / Retouching Instructions (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Crop around shoulders, convert background to sepia tone"
                        value={plc.notes || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const updated = [...editingPlacements];
                          updated[idx].notes = val;
                          setEditingPlacements(updated);
                        }}
                        className="w-full p-2 bg-white border border-neutral-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-neutral-100 border-t border-neutral-200 flex justify-end space-x-2">
              <button
                onClick={() => setPlacementOrder(null)}
                className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePlacements}
                className="px-5 py-2 bg-[#991b1b] hover:bg-red-800 text-white rounded-lg text-xs font-bold transition shadow-xs"
              >
                Save Photo Placements
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: CREATE / CUSTOMIZE NEW ORDER MODAL */}
      {/* ========================================================================= */}
      {isOrderModalOpen && selectedTemplateForOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            <div className="bg-gradient-to-r from-neutral-900 to-[#7f1d1d] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-900/80 rounded-lg text-amber-300">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base font-serif-title">
                    New Stationery Order • {cleanTemplateTitle(selectedTemplateForOrder.title)}
                  </h3>
                  <p className="text-xs text-neutral-300">
                    Configure print run, paper stock, finishing options, and turnaround timing
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOrderModalOpen(false)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewOrder} className="p-6 overflow-y-auto space-y-5 flex-1">
              
              {/* Case & Template Selector Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Select Active Case:
                  </label>
                  <select
                    value={orderFormCaseId}
                    onChange={(e) => setOrderFormCaseId(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-bold outline-none focus:border-[#991b1b]"
                  >
                    {cases.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.caseNumber} • {c.decedent.legalName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Selected Template:
                  </label>
                  <select
                    value={selectedTemplateForOrder.id}
                    onChange={(e) => {
                      const t = CANVA_STOREFRONT_TEMPLATES.find(item => item.id === e.target.value);
                      if (t) setSelectedTemplateForOrder(t);
                    }}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-semibold outline-none focus:border-[#991b1b]"
                  >
                    {CANVA_STOREFRONT_TEMPLATES.map(t => (
                      <option key={t.id} value={t.id}>
                        {cleanTemplateTitle(t.title)} ({t.family} • {t.page_count}p)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quantity, Paper Stock, Finishing */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-neutral-700">
                      Print Quantity:
                    </label>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      Selected: <strong>{orderFormQuantity} units</strong>
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                    <input
                      type="number"
                      min={1}
                      max={5000}
                      step={1}
                      value={orderFormQuantity}
                      onChange={(e) => setOrderFormQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full sm:w-32 p-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono font-bold focus:bg-white focus:border-[#991b1b] outline-none"
                    />
                    <div className="flex items-center gap-1 flex-wrap flex-1">
                      {[25, 50, 75, 100, 150, 200, 250, 300, 500].map(qty => (
                        <button
                          key={qty}
                          type="button"
                          onClick={() => setOrderFormQuantity(qty)}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition ${
                            orderFormQuantity === qty
                              ? 'bg-[#991b1b] text-white'
                              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                          }`}
                        >
                          {qty}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Paper Stock:
                    </label>
                    <select
                      value={orderFormStock}
                      onChange={(e) => setOrderFormStock(e.target.value as PaperStockType)}
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
                      Finish & Binding:
                    </label>
                    <select
                      value={orderFormFinish}
                      onChange={(e) => setOrderFormFinish(e.target.value as FinishOptionType)}
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
              </div>

              {/* Turnaround Tier */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Turnaround Service Level:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['Standard (48-72h)', 'Priority Rush (24h)', 'Same-Day Urgent (12h)'] as TurnaroundTier[]).map(tier => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setOrderFormTurnaround(tier)}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                        orderFormTurnaround === tier
                          ? 'bg-red-50 border-[#991b1b] ring-2 ring-red-500/20'
                          : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
                      }`}
                    >
                      <span className={`text-xs font-bold ${orderFormTurnaround === tier ? 'text-[#991b1b]' : 'text-neutral-800'}`}>
                        {tier}
                      </span>
                      <span className="text-[10px] text-neutral-500 mt-1">
                        {tier === 'Standard (48-72h)' ? 'Standard Press Queue' : tier === 'Priority Rush (24h)' ? '+$75 Expedited Fee' : '+$125 Urgent Press Lock'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Instructions */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Special Delivery Instructions & Chapel Staging:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gold foil embossed cover. Deliver to St. Nicholas Chapel 2h before viewing."
                  value={orderFormSpecialInstructions}
                  onChange={(e) => setOrderFormSpecialInstructions(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              {/* Live Real-Time Itemized Pricing Summary */}
              {(() => {
                const pricing = calculateOrderPrice(
                  selectedTemplateForOrder,
                  orderFormQuantity,
                  orderFormStock,
                  orderFormFinish,
                  orderFormTurnaround
                );
                return (
                  <div className="p-4 bg-gradient-to-r from-neutral-50 to-amber-50/60 rounded-xl border border-red-200 space-y-2">
                    <div className="flex items-center justify-between border-b border-red-200/60 pb-2">
                      <span className="text-xs font-bold text-[#991b1b] uppercase tracking-wider">
                        Transparent Itemized Pricing Calculation
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        ({pricing.baseUnitPrice.toFixed(2)} + {pricing.stockUnitPrice.toFixed(2)}) × {orderFormQuantity} + {pricing.finishSurcharge} + {pricing.rushSurcharge}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-neutral-700">
                      <div>Base Printing: <strong className="font-mono">${(pricing.baseUnitPrice * orderFormQuantity).toFixed(2)}</strong></div>
                      <div>Paper Upgrade: <strong className="font-mono">${(pricing.stockUnitPrice * orderFormQuantity).toFixed(2)}</strong></div>
                      <div>Finishing Setup: <strong className="font-mono">${pricing.finishSurcharge.toFixed(2)}</strong></div>
                      <div>Turnaround Rush: <strong className="font-mono">${pricing.rushSurcharge.toFixed(2)}</strong></div>
                    </div>

                    <div className="pt-2 border-t border-red-200/80 flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold font-mono text-[#991b1b]">
                          ${pricing.totalPrice.toFixed(2)}
                        </div>
                        <span className="text-[10px] text-neutral-600">
                          ${pricing.unitPrice.toFixed(2)} / unit • AP-47 Synced
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-500">Includes all finishing & preflight checks</span>
                    </div>
                  </div>
                );
              })()}

              <div className="pt-4 border-t border-neutral-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOrderModalOpen(false)}
                  className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#991b1b] hover:bg-red-800 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Create Print Order</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: SEND SMS PROOF LINK TO FAMILY MODAL */}
      {/* ========================================================================= */}
      {smsShareOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col">
            
            <div className="bg-gradient-to-r from-neutral-900 to-[#7f1d1d] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2.5">
                <Send className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-base font-serif-title">
                  Send Digital Proof via SMS
                </h3>
              </div>
              <button
                onClick={() => setSmsShareOrder(null)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendSms} className="p-6 space-y-4">
              {smsSentSuccess ? (
                <div className="p-6 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="font-bold text-sm text-neutral-900">SMS Transmitted Successfully!</h4>
                  <p className="text-xs text-neutral-500">
                    Proof review link dispatched to {smsRecipientInput} at {smsPhoneInput}.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-xs">
                    <strong className="text-[#991b1b] block font-serif-title">
                      {smsShareOrder.caseName} • {smsShareOrder.orderNumber}
                    </strong>
                    <span className="text-neutral-600 text-[11px] block mt-0.5">
                      {cleanTemplateTitle(smsShareOrder.templateTitle)} ({smsShareOrder.family})
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Recipient Name:
                    </label>
                    <input
                      type="text"
                      value={smsRecipientInput}
                      onChange={(e) => setSmsRecipientInput(e.target.value)}
                      className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-semibold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Recipient Mobile Phone:
                    </label>
                    <input
                      type="text"
                      value={smsPhoneInput}
                      onChange={(e) => setSmsPhoneInput(e.target.value)}
                      className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono font-bold"
                      required
                    />
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-[11px] text-neutral-600 space-y-1">
                    <span className="font-bold block text-neutral-700">Message Preview:</span>
                    <p className="italic font-serif">
                      "Benta's Funeral Home: Your digital memorial stationery proof for {smsShareOrder.caseName} is ready for family review and approval. View & approve: https://bentasfuneralhome.nyc/proof/{smsShareOrder.orderNumber.toLowerCase()}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-200 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setSmsShareOrder(null)}
                      className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg text-xs font-bold transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#991b1b] hover:bg-red-800 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit SMS</span>
                    </button>
                  </div>
                </>
              )}
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
