import React from 'react';
import { GoldenRecordCase, CasePhase, UserRole } from '../../lib/types/funeral';
import { 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  FileText, 
  MapPin, 
  ShieldCheck,
  ScrollText,
  Printer
} from 'lucide-react';

interface CasePipelineViewProps {
  cases: GoldenRecordCase[];
  activeCase: GoldenRecordCase;
  onSelectCase: (caseItem: GoldenRecordCase) => void;
  onUpdateCasePhase: (caseId: string, newPhase: CasePhase) => void;
  onOpenGoldenRecord: () => void;
  onOpenContractModal?: (caseItem: GoldenRecordCase) => void;
  onOpenPrintAP47?: (caseItem: GoldenRecordCase) => void;
  currentRole: UserRole;
}

export const CasePipelineView: React.FC<CasePipelineViewProps> = ({
  cases,
  activeCase,
  onSelectCase,
  onUpdateCasePhase,
  onOpenGoldenRecord,
  onOpenContractModal,
  onOpenPrintAP47,
  currentRole
}) => {
  const phases: Array<{ id: CasePhase; title: string; subtitle: string; color: string }> = [
    { 
      id: 'intake_removal', 
      title: '1. Intake & Removal', 
      subtitle: 'Custody, Safe Arrival, Vitals Form',
      color: 'border-blue-300 bg-blue-50 text-blue-800'
    },
    { 
      id: 'arrangements', 
      title: '2. Arrangements', 
      subtitle: 'Consultation, GPL, Merchandise',
      color: 'border-purple-300 bg-purple-50 text-purple-800'
    },
    { 
      id: 'legal_bundle', 
      title: '3. Legal Bundle', 
      subtitle: 'eSign, Auths 1-3, Right to Control',
      color: 'border-red-300 bg-red-50 text-[#991b1b]'
    },
    { 
      id: 'permits_logistics', 
      title: '4. Permits & Logistics', 
      subtitle: 'EDRS, Woodlawn Dispatch, Organist',
      color: 'border-emerald-300 bg-emerald-50 text-emerald-800'
    },
    { 
      id: 'finalization_aftercare', 
      title: '5. Finalization & Care', 
      subtitle: 'Invoicing, Death Certs, Day-7 Care',
      color: 'border-amber-300 bg-amber-50 text-amber-800'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Top Controls & Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="font-serif-title text-xl font-bold text-neutral-900">
              Active Case Operations Pipeline
            </h2>
            <span className="bg-red-50 text-[#991b1b] text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-200">
              {cases.length} Active Cases
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5 font-light">
            Tracking lifecycle from First Call through 5-Phase Document Delivery and Post-Service Aftercare.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Golden Record Sync Active</span>
          </div>
        </div>
      </div>

      {/* 5-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {phases.map((col) => {
          const columnCases = cases.filter(c => c.currentPhase === col.id);

          return (
            <div 
              key={col.id} 
              className="bg-[#fcfcfd] rounded-2xl border border-neutral-200 flex flex-col min-h-[580px] shadow-sm"
            >
              {/* Column Header */}
              <div className={`p-3.5 border-b rounded-t-2xl ${col.color}`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-serif-title font-bold text-xs uppercase tracking-wide">
                    {col.title}
                  </h3>
                  <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded-full border border-current">
                    {columnCases.length}
                  </span>
                </div>
                <p className="text-[10px] opacity-85 mt-0.5 font-light">
                  {col.subtitle}
                </p>
              </div>

              {/* Case Cards List */}
              <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                {columnCases.length === 0 ? (
                  <div className="h-32 flex items-center justify-center text-center p-4 border border-dashed border-neutral-300 rounded-xl text-neutral-400 text-xs font-light">
                    No active cases in this phase
                  </div>
                ) : (
                  columnCases.map((c) => {
                    const isSelected = activeCase.id === c.id;

                    return (
                      <div
                        key={c.id}
                        onClick={() => onSelectCase(c)}
                        className={`p-4 rounded-xl border transition cursor-pointer text-xs space-y-2.5 relative shadow-sm ${
                          isSelected
                            ? 'bg-white border-[#991b1b] ring-2 ring-[#991b1b]/30 shadow-md'
                            : 'bg-white border-neutral-200 hover:border-red-200 hover:shadow-md'
                        }`}
                      >
                        {/* Case Header */}
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-[10px] font-bold text-[#991b1b] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                            {c.caseNumber}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-medium">
                            {c.dispositionType === 'full_cremation' 
                              ? 'Funeral & Cremation'
                              : c.dispositionType === 'cremation_memorial'
                              ? 'Crem & Memorial'
                              : c.dispositionType === 'direct_cremation'
                              ? 'Direct Crem'
                              : c.dispositionType === 'full_burial'
                              ? 'Traditional Burial'
                              : c.dispositionType === 'direct_burial'
                              ? 'Direct Burial'
                              : 'Pre-Need'}
                          </span>
                        </div>

                        {/* Decedent Name */}
                        <div>
                          <h4 className="font-serif-title font-bold text-sm text-neutral-900 leading-snug">
                            {c.decedent.legalName}
                          </h4>
                          <p className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5 font-light">
                            <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                            <span className="truncate">{c.decedent.facilityName || c.decedent.placeOfDeath}</span>
                          </p>
                        </div>

                        {/* Safe Arrival Badge */}
                        <div className="pt-1">
                          {c.safeArrivalStatus === 'safe_arrival_confirmed' ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              Safe at 630 St Nick
                            </span>
                          ) : c.safeArrivalStatus === 'in_transit' ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                              <Clock className="w-3 h-3 text-blue-600 animate-pulse" />
                              Transfer In Transit
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                              <Clock className="w-3 h-3 text-amber-600" />
                              Pending Removal
                            </span>
                          )}
                        </div>

                        {/* Informant / NOK Info */}
                        <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-600 flex justify-between items-center">
                          <span className="truncate">NOK: {c.informant.fullName}</span>
                          <span className="text-[10px] text-neutral-900 font-mono font-bold">${c.totalAmountDue.toLocaleString()}</span>
                        </div>

                        {/* Director Actions */}
                        <div className="pt-2 flex gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectCase(c);
                              onOpenGoldenRecord();
                            }}
                            className="flex-1 py-1.5 bg-neutral-100 hover:bg-red-50 text-neutral-800 hover:text-[#991b1b] rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition border border-neutral-200"
                            title="Open Golden Record Hub"
                          >
                            <FileText className="w-3 h-3" />
                            <span>Hub</span>
                          </button>

                          {onOpenContractModal && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectCase(c);
                                onOpenContractModal(c);
                              }}
                              className="py-1.5 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition shrink-0"
                              title="Open Arrangement Conference & Form AP-47 Contract Studio"
                            >
                              <ScrollText className="w-3.5 h-3.5 text-emerald-700" />
                              <span>AP-47</span>
                            </button>
                          )}

                          {onOpenPrintAP47 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectCase(c);
                                onOpenPrintAP47(c);
                              }}
                              className="py-1.5 px-2 bg-red-50 hover:bg-red-100 text-[#991b1b] border border-red-300 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition shrink-0"
                              title="Print Official Form AP-47 Statement (10 NYCRR § 77.8)"
                            >
                              <Printer className="w-3.5 h-3.5 text-[#991b1b]" />
                              <span>Print</span>
                            </button>
                          )}

                          {/* Quick phase advancement for Directors */}
                          {currentRole === 'director' && (
                            <button
                              title="Advance to next phase"
                              onClick={(e) => {
                                e.stopPropagation();
                                const currentIndex = phases.findIndex(p => p.id === c.currentPhase);
                                if (currentIndex < phases.length - 1) {
                                  onUpdateCasePhase(c.id, phases[currentIndex + 1].id);
                                }
                              }}
                              className="px-2.5 py-1.5 bg-[#991b1b] hover:bg-red-800 text-white rounded-lg transition shadow-sm"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
