import React, { useState, useMemo } from 'react';
import {
  GoldenRecordCase,
  CasePhase,
  DocumentItem,
  UserRole
} from '../../lib/types/funeral';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar,
  FileText,
  Car,
  Video,
  Send,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  User,
  Building2,
  ChevronRight,
  BadgeAlert,
  Layers,
  Sparkles,
  ExternalLink,
  DollarSign,
  Award,
  Radio,
  Truck,
  ScrollText,
  CalendarCheck,
  UserCheck
} from 'lucide-react';

export interface DirectorActiveCasesDashboardProps {
  cases: GoldenRecordCase[];
  activeCase: GoldenRecordCase;
  onSelectCase: (caseItem: GoldenRecordCase) => void;
  onOpenGoldenRecord: (caseId?: string) => void;
  onOpenESignModal?: (doc?: DocumentItem | null) => void;
  onOpenLiveryModal?: () => void;
  onOpenWoodlawnModal?: () => void;
  onOpenPartnerModal?: () => void;
  onOpenWebcastModal?: (caseItem: GoldenRecordCase) => void;
  onOpenRemovalModal?: (caseItem: GoldenRecordCase) => void;
  onOpenContractModal?: (caseItem: GoldenRecordCase) => void;
  onOpenAppointmentModal?: (caseItem: GoldenRecordCase) => void;
  onOpenNewCase?: () => void;
  onOpenFamilyPortal?: (caseId?: string) => void;
  onUpdateCasePhase?: (caseId: string, phase: CasePhase) => void;
  onSendNotification?: (notif: any) => void;
  currentRole?: UserRole;
}

export type UrgencyLevel = 'critical' | 'warning' | 'ontrack' | 'administrative';

export interface CaseDueAlert {
  id: string;
  caseId: string;
  caseNumber: string;
  decedentName: string;
  category: 'edrs_72h' | 'program_print' | 'legal_esign' | 'livery_lock' | 'webcast_tech' | 'hra_60d' | 'insurance_claim' | 'consulate_permit';
  categoryLabel: string;
  urgency: UrgencyLevel;
  title: string;
  description: string;
  dueTimeLabel: string;
  actionLabel: string;
  actionType: 'call_dr' | 'open_esign' | 'open_livery' | 'open_webcast' | 'open_print' | 'open_golden_record';
}

export const DirectorActiveCasesDashboard: React.FC<DirectorActiveCasesDashboardProps> = ({
  cases,
  activeCase,
  onSelectCase,
  onOpenGoldenRecord,
  onOpenESignModal,
  onOpenLiveryModal,
  onOpenWoodlawnModal: _onOpenWoodlawnModal,
  onOpenPartnerModal: _onOpenPartnerModal,
  onOpenWebcastModal,
  onOpenRemovalModal,
  onOpenContractModal,
  onOpenAppointmentModal,
  onOpenNewCase,
  onOpenFamilyPortal,
  onUpdateCasePhase: _onUpdateCasePhase,
  onSendNotification
}) => {
  // Filters & View Modes
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUrgencyFilter, setSelectedUrgencyFilter] = useState<'all' | 'critical' | 'warning' | 'ontrack'>('all');
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<'all' | CasePhase>('all');
  const [selectedDirectorFilter, setSelectedDirectorFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');
  const [sortBy, setSortBy] = useState<'urgency' | 'service_date' | 'case_number' | 'name'>('urgency');
  
  // Toast & Interaction state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Phase Definitions for visual stepper
  const PHASES: Array<{ id: CasePhase; label: string; step: number; shortLabel: string }> = [
    { id: 'intake_removal', label: 'Intake & Safe Arrival', step: 1, shortLabel: 'Intake' },
    { id: 'arrangements', label: 'Arrangement Conference', step: 2, shortLabel: 'Arrangements' },
    { id: 'legal_bundle', label: 'Legal Bundle & eSign', step: 3, shortLabel: 'Legal eSign' },
    { id: 'permits_logistics', label: 'EDRS Permits & Logistics', step: 4, shortLabel: 'Permits/Logistics' },
    { id: 'finalization_aftercare', label: 'Finalization & Aftercare', step: 5, shortLabel: 'Finalization' }
  ];

  // Helper to get Phase step number (1-5)
  const getPhaseStep = (phase: CasePhase): number => {
    const found = PHASES.find(p => p.id === phase);
    return found ? found.step : 1;
  };

  // Compute all deadline alerts dynamically across cases
  const caseAlertsMap = useMemo(() => {
    const alerts: Record<string, CaseDueAlert[]> = {};

    cases.forEach(c => {
      const caseAlerts: CaseDueAlert[] = [];

      // 1. NYC EDRS 72-Hour Statutory Clock
      if (c.medicalCertifier.edrsStatus === 'pending') {
        if (c.id === 'case-003') {
          caseAlerts.push({
            id: `alert-edrs-${c.id}`,
            caseId: c.id,
            caseNumber: c.caseNumber,
            decedentName: c.decedent.legalName,
            category: 'edrs_72h',
            categoryLabel: 'NYC EDRS 72h Statutory Clock',
            urgency: 'critical',
            title: 'NYC EDRS Physician Certification Pending (< 18h Remaining!)',
            description: `Statutory 72-hour filing deadline expiring. Physician ${c.medicalCertifier.physicianName} at ${c.medicalCertifier.hospitalFacility} has not signed death certificate.`,
            dueTimeLabel: '18h 15m remaining',
            actionLabel: 'Call Certifier',
            actionType: 'call_dr'
          });
        } else if (c.id === 'case-005') {
          caseAlerts.push({
            id: `alert-edrs-${c.id}`,
            caseId: c.id,
            caseNumber: c.caseNumber,
            decedentName: c.decedent.legalName,
            category: 'edrs_72h',
            categoryLabel: 'NYC EDRS 72h Statutory Clock',
            urgency: 'warning',
            title: 'EDRS Medical Certification in Progress (34h remaining)',
            description: `Awaiting electronic cause of death signature from ${c.medicalCertifier.physicianName} (${c.medicalCertifier.hospitalFacility}).`,
            dueTimeLabel: '34 hours remaining',
            actionLabel: 'Call Hospital',
            actionType: 'call_dr'
          });
        }
      }

      // 2. Memorial Program & Obituary Print Cutoff (24h before service)
      if (c.id === 'case-001') {
        caseAlerts.push({
          id: `alert-print-${c.id}`,
          caseId: c.id,
          caseNumber: c.caseNumber,
          decedentName: c.decedent.legalName,
          category: 'program_print',
          categoryLabel: '24h Memorial Print Cut-off',
          urgency: 'critical',
          title: 'Memorial Programs & Prayer Cards Print Sign-off Cut-off',
          description: 'Print production window closes today at 3:00 PM for Sep 22 Chapel 1 Service. Family proof sign-off required for 150 8-page booklets.',
          dueTimeLabel: 'Today at 3:00 PM (< 4h)',
          actionLabel: 'Review Print Proof',
          actionType: 'open_print'
        });
      }

      // 3. Next-of-Kin Legal eSign Authorizations
      const urgentDoc = c.documents.find(d => d.status === 'urgent' || (d.isUrgent && d.status !== 'completed' && d.status !== 'signed' && d.status !== 'approved'));
      if (urgentDoc) {
        caseAlerts.push({
          id: `alert-esign-${c.id}`,
          caseId: c.id,
          caseNumber: c.caseNumber,
          decedentName: c.decedent.legalName,
          category: 'legal_esign',
          categoryLabel: 'Next-of-Kin Legal eSign',
          urgency: 'critical',
          title: `Required Signature: ${urgentDoc.name}`,
          description: `Awaiting Informant (${c.informant.fullName}) signature on mandatory NYS disposition affidavit before scheduling permits/dispatch.`,
          dueTimeLabel: 'Immediate Action Required',
          actionLabel: 'Open eSign Jurat',
          actionType: 'open_esign'
        });
      }

      // 4. 48-Hour Livery & Motorcade Lock
      if (c.id === 'case-002') {
        caseAlerts.push({
          id: `alert-livery-${c.id}`,
          caseId: c.id,
          caseNumber: c.caseNumber,
          decedentName: c.decedent.legalName,
          category: 'livery_lock',
          categoryLabel: '48h Livery & Route Lock',
          urgency: 'warning',
          title: 'Livery Hearse & Limousine Lock Notice (Sep 24 Abyssinian Service)',
          description: '48-Hour vehicle allocation notice required for Harlem Limousine cortege: 1 Cadillac Hearse, 2 7-Passenger Limousines.',
          dueTimeLabel: 'Due Sep 22 at 10:00 AM',
          actionLabel: 'Dispatch Livery SMS',
          actionType: 'open_livery'
        });
      }

      // 5. 4K Sanctuary Webcast Audio/Camera Check
      if (c.webcastSchedule?.isEnabled && c.id === 'case-004') {
        caseAlerts.push({
          id: `alert-webcast-${c.id}`,
          caseId: c.id,
          caseNumber: c.caseNumber,
          decedentName: c.decedent.legalName,
          category: 'webcast_tech',
          categoryLabel: '4K Broadcast Readiness',
          urgency: 'warning',
          title: 'Chapel 1 4K Broadcast PTZ & Audio Soundboard Check',
          description: `Live webcasting scheduled for Sep 21 Judicial Honors service (${c.webcastSchedule.estimatedViewers} expected remote viewers). Soundboard engineer check pending.`,
          dueTimeLabel: 'Sep 20 at 4:00 PM',
          actionLabel: 'Webcast Console',
          actionType: 'open_webcast'
        });
      }

      // 6. NYC HRA / VA Benefit Application Window
      if (c.id === 'case-006') {
        caseAlerts.push({
          id: `alert-hra-${c.id}`,
          caseId: c.id,
          caseNumber: c.caseNumber,
          decedentName: c.decedent.legalName,
          category: 'hra_60d',
          categoryLabel: 'NYC HRA & VA Claims',
          urgency: 'ontrack',
          title: 'NYC HRA $1,700 Burial Grant & VA $255 Benefit Submission',
          description: 'HRA Form M-860w filed. VA Form 21P-530 submitted with DD-214 to Federal VA Regional Office. Tracking confirmation.',
          dueTimeLabel: '56 days remaining in window',
          actionLabel: 'View Application',
          actionType: 'open_golden_record'
        });
      }

      alerts[c.id] = caseAlerts;
    });

    return alerts;
  }, [cases]);

  // Flattened list of all active alerts
  const allAlertsList = useMemo(() => {
    return Object.values(caseAlertsMap).flat();
  }, [caseAlertsMap]);

  // Filtered cases
  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.decedent.legalName.toLowerCase().includes(q);
        const matchesCaseNo = c.caseNumber.toLowerCase().includes(q);
        const matchesInformant = c.informant.fullName.toLowerCase().includes(q);
        const matchesFacility = (c.decedent.facilityName || '').toLowerCase().includes(q);
        const matchesOfficiant = (c.serviceSelections.officiantName || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCaseNo && !matchesInformant && !matchesFacility && !matchesOfficiant) {
          return false;
        }
      }

      // Phase filter
      if (selectedPhaseFilter !== 'all' && c.currentPhase !== selectedPhaseFilter) {
        return false;
      }

      // Director filter
      if (selectedDirectorFilter !== 'all') {
        if (!c.assignedDirector.toLowerCase().includes(selectedDirectorFilter.toLowerCase())) {
          return false;
        }
      }

      // Urgency filter
      if (selectedUrgencyFilter !== 'all') {
        const cAlerts = caseAlertsMap[c.id] || [];
        if (selectedUrgencyFilter === 'critical') {
          return cAlerts.some(a => a.urgency === 'critical');
        } else if (selectedUrgencyFilter === 'warning') {
          return cAlerts.some(a => a.urgency === 'warning');
        } else if (selectedUrgencyFilter === 'ontrack') {
          return cAlerts.every(a => a.urgency === 'ontrack') || cAlerts.length === 0;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'urgency') {
        const aCrit = (caseAlertsMap[a.id] || []).filter(x => x.urgency === 'critical').length;
        const bCrit = (caseAlertsMap[b.id] || []).filter(x => x.urgency === 'critical').length;
        if (aCrit !== bCrit) return bCrit - aCrit;
        const aWarn = (caseAlertsMap[a.id] || []).filter(x => x.urgency === 'warning').length;
        const bWarn = (caseAlertsMap[b.id] || []).filter(x => x.urgency === 'warning').length;
        return bWarn - aWarn;
      } else if (sortBy === 'service_date') {
        const dateA = a.serviceSelections.serviceDate || '9999-99-99';
        const dateB = b.serviceSelections.serviceDate || '9999-99-99';
        return dateA.localeCompare(dateB);
      } else if (sortBy === 'case_number') {
        return b.caseNumber.localeCompare(a.caseNumber);
      } else {
        return a.decedent.legalName.localeCompare(b.decedent.legalName);
      }
    });
  }, [cases, searchQuery, selectedPhaseFilter, selectedDirectorFilter, selectedUrgencyFilter, sortBy, caseAlertsMap]);

  // Overall counts for KPI ribbon
  const totalCases = cases.length;
  const criticalAlertsCount = allAlertsList.filter(a => a.urgency === 'critical').length;
  const warningAlertsCount = allAlertsList.filter(a => a.urgency === 'warning').length;
  const edrsPendingCount = cases.filter(c => c.medicalCertifier.edrsStatus === 'pending').length;
  const edrsCertifiedCount = cases.filter(c => c.medicalCertifier.edrsStatus === 'certified').length;
  const totalCaseloadValue = cases.reduce((acc, c) => acc + (c.totalAmountDue || 0), 0);
  const totalCollectedValue = cases.reduce((acc, c) => acc + (c.totalPaid || 0), 0);

  // Quick Action Handler for Alert Buttons
  const handleAlertAction = (alert: CaseDueAlert) => {
    const targetCase = cases.find(c => c.id === alert.caseId);
    if (!targetCase) return;

    onSelectCase(targetCase);

    if (alert.actionType === 'call_dr') {
      showToast(`📞 Contacting ${targetCase.medicalCertifier.physicianName} at ${targetCase.medicalCertifier.phone || '(212) 523-4000'} for NYC EDRS certification.`);
    } else if (alert.actionType === 'open_esign') {
      const urgentDoc = targetCase.documents.find(d => d.status === 'urgent' || d.isUrgent);
      if (onOpenESignModal) {
        onOpenESignModal(urgentDoc || null);
      } else {
        onOpenGoldenRecord(targetCase.id);
      }
    } else if (alert.actionType === 'open_livery') {
      if (onOpenLiveryModal) {
        onOpenLiveryModal();
      } else {
        onOpenGoldenRecord(targetCase.id);
      }
    } else if (alert.actionType === 'open_webcast') {
      if (onOpenWebcastModal) {
        onOpenWebcastModal(targetCase);
      } else {
        onOpenGoldenRecord(targetCase.id);
      }
    } else {
      onOpenGoldenRecord(targetCase.id);
    }
  };

  // Quick Send Family Portal SMS/Email Link
  const handleSendMagicLink = (c: GoldenRecordCase, e: React.MouseEvent) => {
    e.stopPropagation();
    const token = Math.random().toString(36).substring(2, 8).toUpperCase();
    showToast(`📱 SMS & Email Family Magic Access Link sent to ${c.informant.fullName} (${c.informant.phone}) for ${c.decedent.legalName}. [Token: BFH-${token}]`);
    if (onSendNotification) {
      onSendNotification({
        id: `notif-${Date.now()}`,
        title: 'Family Portal Access Link Dispatched',
        message: `Magic Link SMS & Email delivered to ${c.informant.fullName} for case ${c.caseNumber}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'portal_invite',
        read: false,
        caseId: c.id
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-neutral-900 pb-24 font-sans">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#141b2b] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-amber-400/40 flex items-center gap-3 animate-fade-in">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
          <p className="text-xs font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Director Command Header */}
      <header className="bg-gradient-to-r from-[#141b2b] via-[#1a233a] to-[#251010] text-white border-b border-amber-500/20 px-6 py-6 shadow-xl sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="bg-[#991b1b] text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border border-amber-400/30 flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                NYS Licensed Funeral Director Console
              </span>
              <span className="text-xs text-neutral-300 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Harlem Operations Command | 630 St. Nicholas Ave
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif-title font-bold tracking-tight text-white flex items-center gap-3">
              Director Active Caseload & Milestone Radar
            </h1>
            <p className="text-xs text-neutral-300 max-w-2xl font-light">
              Real-time operational command center tracking active cases, statutory 72-hour NYC EDRS deadlines, Next-of-Kin legal e-authorizations, 48-hour livery locks, and 4K sanctuary webcasting readiness.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
            {/* Director Selector Filter */}
            <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 backdrop-blur-sm">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] text-neutral-300 font-medium">Director:</span>
              <select
                value={selectedDirectorFilter}
                onChange={(e) => setSelectedDirectorFilter(e.target.value)}
                className="bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#141b2b] text-white">All Directors ({cases.length})</option>
                <option value="Jason Benta" className="bg-[#141b2b] text-white">Jason Benta, LFD #08850</option>
                <option value="Senior Director Davis" className="bg-[#141b2b] text-white">Senior Director Davis</option>
                <option value="Cheryl Robinson" className="bg-[#141b2b] text-white">Cheryl Robinson, LFD</option>
                <option value="Anthony Washington" className="bg-[#141b2b] text-white">Anthony Washington, LFD</option>
              </select>
            </div>

            {onOpenNewCase && (
              <button
                onClick={onOpenNewCase}
                className="bg-[#991b1b] hover:bg-red-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all duration-150 flex items-center gap-1.5 shadow-lg shadow-red-950/40 border border-amber-400/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Intake New Case
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        
        {/* KPI Summary Ribbon */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Active Cases */}
          <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Active Caseload</span>
              <Layers className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-900 font-serif-title">{totalCases}</div>
              <div className="text-[10px] text-neutral-500 mt-0.5 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                In-flight Harlem cases
              </div>
            </div>
          </div>

          {/* Critical Alerts */}
          <div 
            onClick={() => setSelectedUrgencyFilter(selectedUrgencyFilter === 'critical' ? 'all' : 'critical')}
            className={`rounded-xl p-4 border shadow-sm flex flex-col justify-between cursor-pointer transition ${
              criticalAlertsCount > 0 
                ? 'bg-red-50/80 border-red-300 hover:border-red-400 ring-2 ring-red-500/20' 
                : 'bg-white border-neutral-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[11px] font-bold uppercase tracking-wider ${criticalAlertsCount > 0 ? 'text-red-900' : 'text-neutral-500'}`}>
                Urgent Due Dates
              </span>
              <AlertTriangle className={`w-4 h-4 ${criticalAlertsCount > 0 ? 'text-red-600 animate-pulse' : 'text-neutral-400'}`} />
            </div>
            <div>
              <div className={`text-2xl font-bold font-serif-title ${criticalAlertsCount > 0 ? 'text-red-700' : 'text-neutral-900'}`}>
                {criticalAlertsCount}
              </div>
              <div className="text-[10px] text-red-600 font-medium mt-0.5">
                {criticalAlertsCount > 0 ? '🔴 < 24h Action required' : 'All deadlines on track'}
              </div>
            </div>
          </div>

          {/* EDRS Statutory 72h Clock */}
          <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">EDRS 72h Clock</span>
              <Building2 className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-900 font-serif-title">
                {edrsPendingCount} <span className="text-xs font-sans text-neutral-400 font-normal">pending</span>
              </div>
              <div className="text-[10px] text-neutral-500 mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {edrsCertifiedCount} permits certified
              </div>
            </div>
          </div>

          {/* Upcoming Services */}
          <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Services Next 72h</span>
              <Calendar className="w-4 h-4 text-[#991b1b]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-900 font-serif-title">3</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">
                Chapel 1 & Woodlawn
              </div>
            </div>
          </div>

          {/* Livery & Dispatch */}
          <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Livery 48h Locks</span>
              <Car className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-900 font-serif-title">4 / 5</div>
              <div className="text-[10px] text-amber-700 font-medium mt-0.5">
                1 route lock pending
              </div>
            </div>
          </div>

          {/* Caseload Financial Settlement */}
          <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Settlement Volume</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-900 font-serif-title">
                ${(totalCaseloadValue / 1000).toFixed(1)}k
              </div>
              <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
                ${(totalCollectedValue / 1000).toFixed(1)}k collected / verified
              </div>
            </div>
          </div>
        </section>

        {/* Smart Due Date & Deadline Alert Radar */}
        <section className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-[#2c1313] text-white px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-700">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-300 shadow-inner">
                <BadgeAlert className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h2 className="font-serif-title text-base font-bold text-white flex items-center gap-2">
                  Upcoming Due Dates & Statutory Deadline Radar
                  <span className="text-[10px] font-mono bg-red-600 text-white font-bold px-2 py-0.5 rounded-full uppercase">
                    {allAlertsList.length} Active Alerts
                  </span>
                </h2>
                <p className="text-[11px] text-neutral-300 font-light">
                  Automated surveillance engine monitoring physician EDRS certificates, memorial print cutoffs, eSign jurats, and cortege locks.
                </p>
              </div>
            </div>

            {/* Urgency Quick Tabs */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
              <button
                onClick={() => setSelectedUrgencyFilter('all')}
                className={`px-3 py-1 rounded font-medium transition text-[11px] ${
                  selectedUrgencyFilter === 'all'
                    ? 'bg-white text-neutral-900 font-bold shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                All ({allAlertsList.length})
              </button>
              <button
                onClick={() => setSelectedUrgencyFilter('critical')}
                className={`px-3 py-1 rounded font-medium transition text-[11px] flex items-center gap-1 ${
                  selectedUrgencyFilter === 'critical'
                    ? 'bg-red-600 text-white font-bold shadow-sm'
                    : 'text-red-300 hover:text-red-200'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                Critical ({criticalAlertsCount})
              </button>
              <button
                onClick={() => setSelectedUrgencyFilter('warning')}
                className={`px-3 py-1 rounded font-medium transition text-[11px] ${
                  selectedUrgencyFilter === 'warning'
                    ? 'bg-amber-600 text-white font-bold shadow-sm'
                    : 'text-amber-300 hover:text-amber-200'
                }`}
              >
                24-48h ({warningAlertsCount})
              </button>
            </div>
          </div>

          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-neutral-50/50">
            {allAlertsList
              .filter(a => selectedUrgencyFilter === 'all' || a.urgency === selectedUrgencyFilter)
              .map((alert) => {
                const isCrit = alert.urgency === 'critical';
                const isWarn = alert.urgency === 'warning';

                return (
                  <div
                    key={alert.id}
                    className={`rounded-xl p-4 border transition duration-200 flex flex-col justify-between shadow-sm relative overflow-hidden group ${
                      isCrit
                        ? 'bg-red-50/90 border-red-200 hover:border-red-400 hover:shadow-md'
                        : isWarn
                        ? 'bg-amber-50/90 border-amber-200 hover:border-amber-400 hover:shadow-md'
                        : 'bg-white border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {/* Left accent bar */}
                    <div
                      className={`absolute top-0 left-0 bottom-0 w-1 ${
                        isCrit ? 'bg-red-600' : isWarn ? 'bg-amber-500' : 'bg-blue-500'
                      }`}
                    />

                    <div className="space-y-2.5 pl-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            isCrit
                              ? 'bg-red-100 text-red-900 border-red-300'
                              : isWarn
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : 'bg-blue-100 text-blue-900 border-blue-200'
                          }`}
                        >
                          {alert.categoryLabel}
                        </span>

                        <span
                          className={`text-[11px] font-mono font-bold flex items-center gap-1 ${
                            isCrit ? 'text-red-700' : isWarn ? 'text-amber-800' : 'text-neutral-600'
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          {alert.dueTimeLabel}
                        </span>
                      </div>

                      <div>
                        <div className="text-[11px] font-bold text-neutral-500 flex items-center gap-1.5">
                          <span>{alert.caseNumber}</span>
                          <span>•</span>
                          <span className="text-neutral-900 font-semibold">{alert.decedentName}</span>
                        </div>
                        <h4 className="font-bold text-sm text-neutral-900 leading-snug mt-0.5">
                          {alert.title}
                        </h4>
                        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                          {alert.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-black/5 flex items-center justify-between pl-1.5">
                      <button
                        onClick={() => {
                          const target = cases.find(c => c.id === alert.caseId);
                          if (target) {
                            onSelectCase(target);
                            onOpenGoldenRecord(target.id);
                          }
                        }}
                        className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
                      >
                        View Golden Record
                        <ChevronRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => handleAlertAction(alert)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1 shadow-sm ${
                          isCrit
                            ? 'bg-[#991b1b] hover:bg-red-800 text-white'
                            : isWarn
                            ? 'bg-[#b45309] hover:bg-amber-800 text-white'
                            : 'bg-neutral-800 hover:bg-neutral-900 text-white'
                        }`}
                      >
                        {alert.actionLabel}
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* In-Person Family Arrangement Conference & Scheduling Studio Widget */}
        <section className="bg-white rounded-2xl border-2 border-amber-500/30 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#141b2b] via-[#1a233a] to-[#251010] text-white px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-500/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner">
                <CalendarCheck className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h2 className="font-serif-title text-base font-bold text-white flex items-center gap-2">
                  Family Arrangement Conferences & Director Timeslot Hub
                  <span className="text-[10px] font-mono bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full uppercase border border-amber-400/30">
                    630 St. Nicholas Ave Operations
                  </span>
                </h2>
                <p className="text-[11px] text-neutral-300 font-light">
                  Direct SMS/Email Timeslot Dispatch, 1-Tap Family Selection, and Automated 12-Space Facility Room Locking.
                </p>
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Conference Suites</span>
              <strong className="text-amber-300 font-serif-title">Suites A & B • Boardroom</strong>
            </div>
          </div>

          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-amber-50/20">
            {cases.map((c) => {
              const appt = c.arrangementAppointment;
              const isConfirmed = appt?.status === 'confirmed';
              const isProposed = appt?.status === 'proposed_options_sent';
              const isReschedule = appt?.status === 'rescheduled';

              return (
                <div
                  key={c.id}
                  className={`rounded-xl p-4 border transition duration-200 flex flex-col justify-between shadow-sm bg-white ${
                    isConfirmed 
                      ? 'border-emerald-300 ring-1 ring-emerald-500/20' 
                      : isProposed 
                      ? 'border-amber-300 ring-1 ring-amber-500/20'
                      : isReschedule
                      ? 'border-purple-300 ring-1 ring-purple-500/20'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-bold text-[#991b1b] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                        {c.caseNumber}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        isConfirmed 
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                          : isProposed 
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : isReschedule
                          ? 'bg-purple-100 text-purple-900 border-purple-300'
                          : 'bg-neutral-100 text-neutral-700 border-neutral-300'
                      }`}>
                        {isConfirmed ? '✅ Confirmed Meeting' : isProposed ? '📱 Slots Dispatched' : isReschedule ? '🔄 Reschedule Req' : '⏳ Needs Scheduling'}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 leading-snug">
                        {c.decedent.legalName}
                      </h4>
                      <p className="text-xs text-neutral-600 mt-0.5 flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span className="truncate">Informant: {c.informant.fullName} ({c.informant.relationship})</span>
                      </p>
                    </div>

                    <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-100 text-xs space-y-1">
                      <div className="flex items-center justify-between text-neutral-700">
                        <span className="text-neutral-500 text-[11px]">Assigned LFD:</span>
                        <strong className="text-neutral-900">{appt?.assignedDirectorName || c.assignedDirector.split('(')[0]}</strong>
                      </div>
                      <div className="flex items-center justify-between text-neutral-700">
                        <span className="text-neutral-500 text-[11px]">Venue / Room:</span>
                        <span className="text-neutral-900 font-medium truncate max-w-[160px]">{appt?.locationVenue || 'Arrangement Suite A'}</span>
                      </div>
                      <div className="flex items-center justify-between text-neutral-700">
                        <span className="text-neutral-500 text-[11px]">Scheduled Slot:</span>
                        <strong className={isConfirmed ? 'text-emerald-700' : 'text-[#991b1b]'}>
                          {isConfirmed && appt?.confirmedSlot 
                            ? `${appt.confirmedSlot.date} @ ${appt.confirmedSlot.time}`
                            : isProposed && appt?.proposedSlots && appt.proposedSlots.length > 0
                            ? `${appt.proposedSlots.length} Slots Proposed`
                            : 'Not Selected'}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        onSelectCase(c);
                        onOpenGoldenRecord(c.id);
                      }}
                      className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
                    >
                      <span>Golden Record</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => {
                        onSelectCase(c);
                        if (onOpenAppointmentModal) {
                          onOpenAppointmentModal(c);
                        } else {
                          onOpenGoldenRecord(c.id);
                        }
                      }}
                      className="bg-[#991b1b] hover:bg-red-800 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1 shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isConfirmed ? 'Manage Booking' : 'Dispatch Slots'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Master Caseload Controls & View Switcher */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by decedent name, case number, informant, facility, or officiant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#991b1b] focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Phase Filter Dropdown / Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
              <Filter className="w-3.5 h-3.5 text-neutral-400" />
              <span>Phase:</span>
            </div>
            <select
              value={selectedPhaseFilter}
              onChange={(e) => setSelectedPhaseFilter(e.target.value as any)}
              className="bg-neutral-50 border border-neutral-200 text-xs rounded-lg px-2.5 py-1.5 text-neutral-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#991b1b]"
            >
              <option value="all">All 5 Phases</option>
              {PHASES.map(p => (
                <option key={p.id} value={p.id}>{p.step}. {p.label}</option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-neutral-50 border border-neutral-200 text-xs rounded-lg px-2.5 py-1.5 text-neutral-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#991b1b]"
            >
              <option value="urgency">Sort: Urgent Deadlines First</option>
              <option value="service_date">Sort: Service Date (Earliest)</option>
              <option value="case_number">Sort: Case Number (Newest)</option>
              <option value="name">Sort: Decedent Name (A-Z)</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-neutral-100 p-0.5 rounded-lg border border-neutral-200">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  viewMode === 'cards'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title="Rich Case Cards Deck"
              >
                Cards View
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  viewMode === 'matrix'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title="High-Density Operational Table"
              >
                Table Matrix
              </button>
            </div>
          </div>
        </div>

        {/* VIEW MODE A: RICH CASE CARDS DECK */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredCases.map((c) => {
              const caseAlerts = caseAlertsMap[c.id] || [];
              const topAlert = caseAlerts[0];
              const stepNumber = getPhaseStep(c.currentPhase);
              const signedDocsCount = c.documents.filter(d => d.status === 'completed' || d.status === 'signed' || d.status === 'approved').length;
              const totalDocsCount = c.documents.length;
              const isCaseSelected = activeCase?.id === c.id;

              return (
                <div
                  key={c.id}
                  onClick={() => onSelectCase(c)}
                  className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between overflow-hidden relative group ${
                    isCaseSelected
                      ? 'border-[#991b1b] ring-2 ring-[#991b1b]/10'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  {/* Card Header */}
                  <div className="p-5 border-b border-neutral-100 bg-gradient-to-r from-neutral-50/70 via-white to-neutral-50/40">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-[#991b1b] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                            {c.caseNumber}
                          </span>

                          <span className="text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                            {c.dispositionType.replace('_', ' ').toUpperCase()}
                          </span>

                          {c.decedent.veteran && (
                            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded flex items-center gap-1">
                              <Award className="w-3 h-3 text-blue-600" />
                              Veteran Honors
                            </span>
                          )}

                          {/* Safe Arrival Badge */}
                          {c.safeArrivalStatus === 'safe_arrival_confirmed' ? (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                              Safe Arrival at 630 St Nicholas
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
                              Transport In-Transit
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-serif-title font-bold text-neutral-900 group-hover:text-[#991b1b] transition">
                          {c.decedent.legalName}
                        </h3>

                        <p className="text-xs text-neutral-500 flex items-center gap-2">
                          <span>Age {c.decedent.dateOfBirth ? (new Date().getFullYear() - new Date(c.decedent.dateOfBirth).getFullYear()) : 'N/A'}</span>
                          <span>•</span>
                          <span>Passed {c.decedent.dateOfDeath}</span>
                          <span>•</span>
                          <span>{c.decedent.facilityName || c.decedent.placeOfDeath}</span>
                        </p>
                      </div>

                      {/* Director Avatar / Tag */}
                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Assigned Director</span>
                        <span className="text-xs font-semibold text-neutral-800">{c.assignedDirector.split('(')[0]}</span>
                      </div>
                    </div>

                    {/* 5-Step Phase Stepper */}
                    <div className="mt-4 pt-3 border-t border-neutral-100">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-700 mb-1.5">
                        <span className="flex items-center gap-1 text-[#991b1b]">
                          <Layers className="w-3.5 h-3.5" />
                          Phase {stepNumber} of 5: {PHASES.find(p => p.id === c.currentPhase)?.label}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono">
                          {Math.round((stepNumber / 5) * 100)}% Complete
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-1.5">
                        {PHASES.map((p) => {
                          const isPast = p.step < stepNumber;
                          const isCurrent = p.step === stepNumber;
                          return (
                            <div key={p.id} className="space-y-1">
                              <div
                                className={`h-1.5 rounded-full transition-all ${
                                  isPast
                                    ? 'bg-emerald-600'
                                    : isCurrent
                                    ? 'bg-[#991b1b]'
                                    : 'bg-neutral-200'
                                }`}
                              />
                              <span
                                className={`block text-[9px] truncate text-center ${
                                  isCurrent
                                    ? 'font-bold text-[#991b1b]'
                                    : isPast
                                    ? 'font-medium text-emerald-800'
                                    : 'text-neutral-400'
                                }`}
                              >
                                {p.shortLabel}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Card Body: Operational Milestones Grid */}
                  <div className="p-5 space-y-3.5 bg-white">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {/* Scheduled Service */}
                      <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-0.5">
                          Scheduled Service
                        </span>
                        {c.serviceSelections.serviceDate ? (
                          <>
                            <div className="text-xs font-bold text-neutral-900 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#991b1b]" />
                              {c.serviceSelections.serviceDate}
                            </div>
                            <div className="text-[10px] text-neutral-600 truncate mt-0.5">
                              {c.serviceSelections.serviceVenueName || c.serviceSelections.viewingParlor}
                            </div>
                          </>
                        ) : (
                          <div className="text-xs text-neutral-400 italic">Unscheduled / At-Need</div>
                        )}
                      </div>

                      {/* EDRS Permit Status */}
                      <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-0.5">
                          NYC EDRS Permit
                        </span>
                        {c.medicalCertifier.edrsStatus === 'certified' ? (
                          <>
                            <div className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Certified Permit
                            </div>
                            <div className="text-[10px] font-mono text-neutral-500 truncate mt-0.5">
                              #{c.medicalCertifier.edrsPermitNumber || 'NYC-EDRS-OK'}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-xs font-bold text-red-700 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-red-600 animate-pulse" />
                              Pending Physician
                            </div>
                            <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                              {c.medicalCertifier.physicianName}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Legal eSign Compliance */}
                      <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-0.5">
                          Legal eSign Bundle
                        </span>
                        <div className="text-xs font-bold text-neutral-900 flex items-center gap-1">
                          <FileText className="w-3 h-3 text-blue-600" />
                          {signedDocsCount} / {totalDocsCount} Signed
                        </div>
                        <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                          Informant: {c.informant.fullName.split(' ')[0]}
                        </div>
                      </div>

                      {/* 4K Webcast */}
                      <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-0.5">
                          4K Live Webcast
                        </span>
                        {c.webcastSchedule?.isEnabled ? (
                          <>
                            <div className="text-xs font-bold text-red-700 flex items-center gap-1">
                              <Video className="w-3 h-3 text-red-600" />
                              {c.webcastSchedule.venueName?.split('(')[0] || 'Chapel 1'}
                            </div>
                            <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                              PIN: {c.webcastSchedule.securityPin} • {c.webcastSchedule.estimatedViewers || 100} Viewers
                            </div>
                          </>
                        ) : (
                          <div className="text-xs text-neutral-400 italic">No Broadcast</div>
                        )}
                      </div>

                      {/* Financial Settlement */}
                      <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-0.5">
                          Financial Settlement
                        </span>
                        <div className="text-xs font-bold text-neutral-900">
                          ${(c.totalPaid || 0).toLocaleString()} <span className="text-[10px] font-normal text-neutral-500">of ${(c.totalAmountDue || 0).toLocaleString()}</span>
                        </div>
                        <div className="text-[10px] text-emerald-700 font-medium truncate mt-0.5">
                          {c.totalPaid >= c.totalAmountDue ? 'Settled in Full' : c.splitBilling[0]?.providerName ? 'Insurance Verified' : 'Deposit Pending'}
                        </div>
                      </div>

                      {/* Informant Contact */}
                      <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-0.5">
                          Next of Kin Informant
                        </span>
                        <div className="text-xs font-bold text-neutral-900 truncate">
                          {c.informant.fullName}
                        </div>
                        <div className="text-[10px] text-neutral-500 font-mono truncate mt-0.5">
                          {c.informant.phone}
                        </div>
                      </div>
                    </div>

                    {/* Active Due Date Alert Banner inside card */}
                    {topAlert && (
                      <div
                        className={`rounded-xl p-3 border flex items-center justify-between gap-3 ${
                          topAlert.urgency === 'critical'
                            ? 'bg-red-50 border-red-200 text-red-900'
                            : topAlert.urgency === 'warning'
                            ? 'bg-amber-50 border-amber-200 text-amber-900'
                            : 'bg-blue-50 border-blue-200 text-blue-900'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <AlertTriangle
                            className={`w-4 h-4 shrink-0 ${
                              topAlert.urgency === 'critical' ? 'text-red-600 animate-pulse' : 'text-amber-600'
                            }`}
                          />
                          <div className="min-w-0">
                            <div className="text-[11px] font-bold truncate">
                              {topAlert.title}
                            </div>
                            <div className="text-[10px] text-neutral-600 truncate">
                              {topAlert.dueTimeLabel}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAlertAction(topAlert);
                          }}
                          className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-lg transition shadow-sm ${
                            topAlert.urgency === 'critical'
                              ? 'bg-red-700 hover:bg-red-800 text-white'
                              : 'bg-amber-700 hover:bg-amber-800 text-white'
                          }`}
                        >
                          {topAlert.actionLabel}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 1-Click Action Toolbar */}
                  <div className="px-5 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCase(c);
                          onOpenGoldenRecord(c.id);
                        }}
                        className="bg-[#991b1b] hover:bg-red-800 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1 shadow-sm"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Golden Record
                      </button>

                      {onOpenESignModal && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCase(c);
                            const urgentDoc = c.documents.find(d => d.status === 'urgent' || d.isUrgent);
                            onOpenESignModal(urgentDoc || null);
                          }}
                          className="bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-semibold text-xs px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 shadow-xs"
                          title="Review eSign Jurat"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          eSign Jurat
                        </button>
                      )}

                      {onOpenWebcastModal && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCase(c);
                            onOpenWebcastModal(c);
                          }}
                          className="bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-semibold text-xs px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 shadow-xs"
                          title="Schedule Webcast"
                        >
                          <Radio className="w-3.5 h-3.5 text-red-600" />
                          4K Webcast
                        </button>
                      )}

                      {onOpenRemovalModal && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCase(c);
                            onOpenRemovalModal(c);
                          }}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 font-semibold text-xs px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 shadow-xs"
                          title="Schedule / View First Call Removal & Custody Affidavit"
                        >
                          <Truck className="w-3.5 h-3.5 text-blue-700" />
                          Removal
                        </button>
                      )}

                      {onOpenAppointmentModal && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCase(c);
                            onOpenAppointmentModal(c);
                          }}
                          className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-xs px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 shadow-xs"
                          title="Schedule / Manage Family In-Person Arrangement Conference"
                        >
                          <CalendarCheck className="w-3.5 h-3.5 text-amber-700" />
                          Appt
                        </button>
                      )}

                      {onOpenContractModal && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCase(c);
                            onOpenContractModal(c);
                          }}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold text-xs px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 shadow-xs"
                          title="Open Arrangement Conference & AP-47 Contract Studio"
                        >
                          <ScrollText className="w-3.5 h-3.5 text-emerald-700" />
                          AP-47 Contract
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleSendMagicLink(c, e)}
                        className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-xs px-2.5 py-1.5 rounded-lg transition flex items-center gap-1"
                        title="Send SMS/Email Magic Link to Family"
                      >
                        <Send className="w-3 h-3 text-amber-700" />
                        Family Portal Link
                      </button>

                      {onOpenFamilyPortal && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCase(c);
                            onOpenFamilyPortal(c.id);
                          }}
                          className="text-neutral-500 hover:text-neutral-800 p-1.5 rounded-lg hover:bg-neutral-200 transition"
                          title="Preview Family Portal"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW MODE B: OPERATIONAL DUE DATE MATRIX (HIGH-DENSITY TABLE) */}
        {viewMode === 'matrix' && (
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900 text-white font-serif-title uppercase tracking-wider text-[11px] border-b border-neutral-800">
                  <tr>
                    <th className="px-4 py-3.5">Case # & Decedent</th>
                    <th className="px-4 py-3.5">Phase & Status</th>
                    <th className="px-4 py-3.5">NYC EDRS Permit (72h)</th>
                    <th className="px-4 py-3.5">eSign Compliance</th>
                    <th className="px-4 py-3.5">Scheduled Service</th>
                    <th className="px-4 py-3.5">Live 4K Webcast</th>
                    <th className="px-4 py-3.5">Due Date Alert</th>
                    <th className="px-4 py-3.5 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  {filteredCases.map((c) => {
                    const caseAlerts = caseAlertsMap[c.id] || [];
                    const topAlert = caseAlerts[0];
                    const stepNumber = getPhaseStep(c.currentPhase);
                    const signedDocsCount = c.documents.filter(d => d.status === 'completed' || d.status === 'signed' || d.status === 'approved').length;
                    const totalDocsCount = c.documents.length;

                    return (
                      <tr
                        key={c.id}
                        onClick={() => onSelectCase(c)}
                        className="hover:bg-neutral-50/80 transition cursor-pointer group"
                      >
                        {/* Case & Decedent */}
                        <td className="px-4 py-3.5">
                          <div className="font-mono text-[11px] font-bold text-[#991b1b]">{c.caseNumber}</div>
                          <div className="font-bold text-neutral-900 text-sm">{c.decedent.legalName}</div>
                          <div className="text-[10px] text-neutral-500">{c.dispositionType.replace('_', ' ').toUpperCase()} • {c.assignedDirector.split('(')[0]}</div>
                        </td>

                        {/* Phase & Safe Arrival */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1 font-semibold text-neutral-800">
                            <span className="w-2 h-2 rounded-full bg-[#991b1b]"></span>
                            Phase {stepNumber}: {PHASES.find(p => p.id === c.currentPhase)?.shortLabel}
                          </div>
                          <div className="text-[10px] text-neutral-500 mt-0.5">
                            {c.safeArrivalStatus === 'safe_arrival_confirmed' ? '✅ Safe Arrival at 630 St Nicholas' : '🚐 In-Transit'}
                          </div>
                        </td>

                        {/* EDRS Permit */}
                        <td className="px-4 py-3.5">
                          {c.medicalCertifier.edrsStatus === 'certified' ? (
                            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Certified Permit
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                              <Clock className="w-3 h-3 text-red-600 animate-pulse" />
                              Pending Dr. Cert
                            </div>
                          )}
                          <div className="text-[10px] text-neutral-500 truncate mt-0.5 max-w-[140px]">
                            {c.medicalCertifier.physicianName}
                          </div>
                        </td>

                        {/* eSign Compliance */}
                        <td className="px-4 py-3.5">
                          <div className="font-bold text-neutral-900 flex items-center gap-1">
                            <FileText className="w-3 h-3 text-blue-600" />
                            {signedDocsCount} / {totalDocsCount} Docs
                          </div>
                          <div className="w-20 bg-neutral-200 h-1.5 rounded-full overflow-hidden mt-1">
                            <div
                              className="bg-blue-600 h-full rounded-full"
                              style={{ width: `${(signedDocsCount / totalDocsCount) * 100}%` }}
                            />
                          </div>
                        </td>

                        {/* Scheduled Service */}
                        <td className="px-4 py-3.5">
                          {c.serviceSelections.serviceDate ? (
                            <>
                              <div className="font-bold text-neutral-900">{c.serviceSelections.serviceDate}</div>
                              <div className="text-[10px] text-neutral-500 truncate max-w-[150px]">
                                {c.serviceSelections.serviceVenueName || c.serviceSelections.viewingParlor}
                              </div>
                            </>
                          ) : (
                            <span className="text-neutral-400 italic">Unscheduled</span>
                          )}
                        </td>

                        {/* 4K Webcast */}
                        <td className="px-4 py-3.5">
                          {c.webcastSchedule?.isEnabled ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                              <Video className="w-3 h-3 text-red-600" />
                              {c.webcastSchedule.venueName?.split('(')[0]}
                            </span>
                          ) : (
                            <span className="text-neutral-400 text-[11px]">—</span>
                          )}
                        </td>

                        {/* Due Date Alert */}
                        <td className="px-4 py-3.5">
                          {topAlert ? (
                            <div className="max-w-[200px]">
                              <span
                                className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                                  topAlert.urgency === 'critical'
                                    ? 'bg-red-100 text-red-900 border border-red-300'
                                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                                }`}
                              >
                                {topAlert.dueTimeLabel}
                              </span>
                              <div className="text-[11px] font-semibold text-neutral-800 truncate mt-0.5">
                                {topAlert.title}
                              </div>
                            </div>
                          ) : (
                            <span className="text-emerald-700 text-[11px] font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              On Track
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectCase(c);
                                onOpenGoldenRecord(c.id);
                              }}
                              className="bg-[#991b1b] hover:bg-red-800 text-white font-bold text-xs px-2.5 py-1.5 rounded transition"
                              title="Open Golden Record"
                            >
                              Golden Record
                            </button>
                            {onOpenRemovalModal && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectCase(c);
                                  onOpenRemovalModal(c);
                                }}
                                className="bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-semibold px-2 py-1.5 rounded transition flex items-center gap-1"
                                title="Schedule / View Removal & Custody Affidavit"
                              >
                                <Truck className="w-3.5 h-3.5 text-blue-700" />
                                <span>Removal</span>
                              </button>
                            )}
                            {onOpenContractModal && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectCase(c);
                                  onOpenContractModal(c);
                                }}
                                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold px-2 py-1.5 rounded transition flex items-center gap-1"
                                title="Arrangement Conference & AP-47 Contract Studio"
                              >
                                <ScrollText className="w-3.5 h-3.5 text-emerald-700" />
                                <span>AP-47</span>
                              </button>
                            )}
                            <button
                              onClick={(e) => handleSendMagicLink(c, e)}
                              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 p-1.5 rounded transition"
                              title="Send Family Portal Link"
                            >
                              <Send className="w-3.5 h-3.5 text-neutral-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
