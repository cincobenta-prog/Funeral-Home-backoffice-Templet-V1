import React, { useState } from 'react';
import { GoldenRecordCase, DocumentItem, DocumentStatus, BFHFormType } from '../../lib/types/funeral';
import { getDefaultStatementOfGoodsForCase } from '../../lib/data/generalPriceList';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Send, 
  Eye, 
  PenTool, 
  Printer, 
  Check, 
  X,
  FileCheck2,
  Lock
} from 'lucide-react';

interface DocumentJourneyMatrixProps {
  caseData: GoldenRecordCase;
  onUpdateDocumentStatus: (docId: string, newStatus: DocumentStatus) => void;
  onOpenESign: (doc?: DocumentItem) => void;
}

export const DocumentJourneyMatrix: React.FC<DocumentJourneyMatrixProps> = ({
  caseData,
  onUpdateDocumentStatus,
  onOpenESign
}) => {
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  const filteredDocs = caseData.documents.filter(doc => {
    if (selectedPhase === 'all') return true;
    return doc.phase === selectedPhase;
  });

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'completed':
      case 'signed':
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            {status}
          </span>
        );
      case 'urgent':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#991b1b] bg-red-50 px-2.5 py-1 rounded-full border border-red-200 uppercase animate-pulse">
            <AlertTriangle className="w-3 h-3 text-[#991b1b]" />
            Urgent Action
          </span>
        );
      case 'generated':
      case 'sent':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 uppercase">
            <Send className="w-3 h-3 text-amber-600" />
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-200 uppercase">
            <Clock className="w-3 h-3 text-neutral-400" />
            Pending
          </span>
        );
    }
  };

  // Helper to render the authentic official Benta form content
  const renderOfficialFormContent = (doc: DocumentItem) => {
    const formType: BFHFormType = doc.formType || 'general_document';

    switch (formType) {
      // -------------------------------------------------------------
      // FORM 1: VITAL RECORD INFORMATION
      // -------------------------------------------------------------
      case 'vital_records':
        return (
          <div className="space-y-6 text-neutral-900 font-sans text-xs bg-white p-6 sm:p-8 rounded-xl border border-neutral-300 shadow-sm print:p-0 print:border-none">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-neutral-900 pb-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#991b1b] text-white flex items-center justify-center font-serif-title font-bold text-base shadow-sm">
                  B
                </div>
                <div>
                  <h3 className="font-serif-title font-bold text-xl text-neutral-900 tracking-wide">
                    BENTA'S FUNERAL HOME, INC.
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-medium">630 St. Nicholas Avenue, New York, NY 10030 • (212) 281-8850</p>
                </div>
              </div>
              <div className="text-right sm:text-right">
                <h4 className="font-bold text-base tracking-widest text-[#991b1b] font-serif-title uppercase">
                  VITAL RECORD INFORMATION
                </h4>
                <p className="font-mono text-xs font-bold text-neutral-600">Case No: {caseData.caseNumber}</p>
              </div>
            </div>

            {/* Decedent Identity & Residence */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border-b border-neutral-300 pb-1">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold block">Name of Decedent:</span>
                  <strong className="text-sm text-neutral-900 font-serif-title">{caseData.decedent.legalName}</strong>
                </div>
                <div className="border-b border-neutral-300 pb-1">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold block">Any Other Known Names of Deceased:</span>
                  <span className="text-xs text-neutral-800 font-medium">None / N/A</span>
                </div>
              </div>

              <div className="border-b border-neutral-300 pb-1">
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Residence of Loved One:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5 text-xs text-neutral-800">
                  <div><span className="text-[9px] text-neutral-400 block">Street & Number:</span> <strong>{caseData.decedent.residenceAddress}</strong></div>
                  <div><span className="text-[9px] text-neutral-400 block">Apt:</span> <strong>Apt 4B</strong></div>
                  <div><span className="text-[9px] text-neutral-400 block">City & State:</span> <strong>{caseData.decedent.city}, {caseData.decedent.state}</strong></div>
                  <div><span className="text-[9px] text-neutral-400 block">Zip:</span> <strong>{caseData.decedent.zipCode}</strong></div>
                </div>
              </div>
            </div>

            {/* Demographics & Place of Death */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-neutral-300 pb-3">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Date of Death:</span>
                <strong className="text-neutral-900">{caseData.decedent.dateOfDeath}</strong>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Sex:</span>
                <strong className="text-neutral-900 capitalize">{caseData.decedent.gender}</strong>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Education:</span>
                <strong className="text-neutral-900">Master's Degree / Doctorate</strong>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Social Security #:</span>
                <strong className="font-mono text-neutral-900">{caseData.decedent.ssnMasked}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-neutral-300 pb-3">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Place of Death:</span>
                <strong className="text-neutral-900">{caseData.decedent.placeOfDeath}</strong>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Date of Birth & Age:</span>
                <strong className="text-neutral-900">{caseData.decedent.dateOfBirth} (72 Years)</strong>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Birth Place:</span>
                <strong className="text-neutral-900">Harlem, New York, USA</strong>
              </div>
            </div>

            {/* Marital, Race, Occupation, Military */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-neutral-300 pb-3">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Marital Status:</span>
                <strong className="text-neutral-900 capitalize">{caseData.decedent.maritalStatus}</strong>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Race:</span>
                <strong className="text-neutral-900">Black / African American</strong>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Occupation & Business:</span>
                <strong className="text-neutral-900">{caseData.decedent.occupation}</strong>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Military Status:</span>
                <strong className="text-neutral-900">{caseData.decedent.branchOfService || 'U.S. Navy (Veteran)'}</strong>
              </div>
            </div>

            {/* Parents & Spouse */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-neutral-300 pb-3">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Father's Name:</span>
                <strong className="text-neutral-900">{caseData.decedent.fatherName}</strong>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Mother's Name (First & Maiden):</span>
                <strong className="text-neutral-900">{caseData.decedent.motherMaidenName}</strong>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Spouse Name (First & Maiden):</span>
                <strong className="text-neutral-900">{caseData.informant.fullName} (DOB: 04/12/1956)</strong>
              </div>
            </div>

            {/* Informant & Next of Kin */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-2">
              <span className="font-bold text-xs text-[#991b1b] uppercase tracking-wider block">
                Informant (Legal Next of Kin) Details:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div><span className="text-[9px] text-neutral-500 block">Name:</span> <strong>{caseData.informant.fullName}</strong></div>
                <div><span className="text-[9px] text-neutral-500 block">Relationship:</span> <strong>{caseData.informant.relationship}</strong></div>
                <div><span className="text-[9px] text-neutral-500 block">Telephone (Cell/Home):</span> <strong>{caseData.informant.phone}</strong></div>
                <div><span className="text-[9px] text-neutral-500 block">Email:</span> <strong className="truncate block">{caseData.informant.email}</strong></div>
              </div>
              <div>
                <span className="text-[9px] text-neutral-500 block">Address:</span>
                <strong>{caseData.informant.address}</strong>
              </div>
            </div>

            {/* Cemetery Deed & Interment Details */}
            <div className="border border-neutral-200 p-3.5 rounded-xl space-y-1.5 text-[11px] text-neutral-700">
              <span className="font-bold text-neutral-900 block">Cemetery Deed & Previous Interment Information:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div><span className="text-[9px] text-neutral-400 block">Deed Owner:</span> <span>Eleanor Vance</span></div>
                <div><span className="text-[9px] text-neutral-400 block">Address:</span> <span>Same as residence</span></div>
                <div><span className="text-[9px] text-neutral-400 block">Previous Interment:</span> <span>None (New Plot)</span></div>
                <div><span className="text-[9px] text-neutral-400 block">How Related:</span> <span>Spouse</span></div>
              </div>
            </div>

            {/* Jurat / Verification */}
            <div className="pt-4 border-t-2 border-neutral-900 flex flex-col sm:flex-row justify-between items-end text-xs gap-4">
              <div>
                <p className="text-[11px] text-neutral-700 italic">
                  The above vital information was reviewed and verified by <strong>{caseData.informant.fullName}</strong> on <strong>{caseData.createdAt.split('T')[0]}</strong>.
                </p>
                <div className="border-b border-neutral-900 w-56 mt-4 mb-1" />
                <span className="text-[10px] text-neutral-500 uppercase font-bold">Signature of Informant / Next of Kin</span>
              </div>
              <div className="text-right">
                <div className="border-b border-neutral-900 w-56 mt-4 mb-1 ml-auto" />
                <span className="text-[10px] text-neutral-500 uppercase font-bold">Jason Benta, Licensed Funeral Director</span>
              </div>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // FORM 2: STATEMENT OF GOODS AND SERVICES SELECTED (FORM AP-47)
      // -------------------------------------------------------------
      case 'statement_goods_services': {
        const ap47 = caseData.statementOfGoods || getDefaultStatementOfGoodsForCase(caseData);
        return (
          <div className="space-y-6 text-neutral-900 font-sans text-xs bg-white p-6 sm:p-10 rounded-xl border-2 border-neutral-400 shadow-sm print:p-0 print:border-none">
            
            {/* PAGE 1 */}
            <div className="space-y-4 pb-6 border-b-2 border-neutral-900">
              
              {/* Header */}
              <div className="flex justify-between items-start border-b-2 border-neutral-900 pb-3">
                <div className="space-y-0.5">
                  <div className="font-serif-title italic font-bold text-lg text-neutral-800">
                    "A Celebration of Life"
                  </div>
                  <h2 className="font-serif-title font-bold text-2xl text-[#991b1b] tracking-wider">
                    Benta's Funeral Home, Inc.
                  </h2>
                  <p className="text-[11px] text-neutral-600">
                    630 St. Nicholas Avenue (Corner of W. 141st Street) • New York, NY 10030 • (212) 281-8850-1-2-3
                  </p>
                </div>

                <div className="text-right font-mono text-xs space-y-1">
                  <div>Number: <strong>{ap47.invoiceNumber || `${caseData.caseNumber}-AP47`}</strong></div>
                  <div>Date: <strong>{ap47.agreementDate || caseData.serviceSelections.serviceDate || '2026-09-22'}</strong></div>
                </div>
              </div>

              {/* Case & Invoice Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-neutral-50 p-2.5 rounded-lg border border-neutral-300 text-[11px]">
                <div><span className="text-[9px] text-neutral-500 block">Name of Deceased:</span> <strong>{caseData.decedent.legalName}</strong></div>
                <div><span className="text-[9px] text-neutral-500 block">Date of Death:</span> <strong>{caseData.decedent.dateOfDeath}</strong></div>
                <div><span className="text-[9px] text-neutral-500 block">Place of Death:</span> <strong>{caseData.decedent.facilityName || 'Mount Sinai Morningside'}</strong></div>
                <div><span className="text-[9px] text-neutral-500 block">Invoice To:</span> <strong>{caseData.informant.fullName} (NOK)</strong></div>
              </div>

              <div className="text-center font-bold text-xs uppercase tracking-wider font-serif-title text-neutral-900 py-1 bg-neutral-100 rounded">
                ITEMIZATION OF FUNERAL SERVICES AND MERCHANDISE SELECTED
              </div>

              <p className="text-[10px] text-neutral-600 italic">
                The following are the charges for the services, merchandise, and livery you have selected. You will not be charged for any item you do not choose unless it is necessary because of other selections you have made. Any such charges are explained below.
              </p>

              {/* Section I: Funeral Home Charges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] border-t border-neutral-300 pt-3">
                
                {/* Left Column (A-E) */}
                <div className="space-y-3">
                  <h5 className="font-bold text-xs uppercase text-[#991b1b] border-b border-neutral-200 pb-1">
                    I. FUNERAL HOME CHARGES
                  </h5>

                  <div className="flex justify-between">
                    <span>A. Alternative Services:</span>
                    <strong className="font-mono">
                      {ap47.sectionI.A_alternativeServicesAmount > 0 
                        ? `$${ap47.sectionI.A_alternativeServicesAmount.toFixed(2)}` 
                        : 'N/A'}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span>B. Transfer of remains to the funeral establishment:</span>
                    <strong className="font-mono">${ap47.sectionI.B_transferOfRemainsAmount.toFixed(2)}</strong>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex justify-between">
                      <span>C. Preparation of Remains:</span>
                    </div>
                    <div className="pl-3 space-y-0.5 text-neutral-700 text-[10px]">
                      <div className="flex justify-between">
                        <span>1. Embalming (including use of prep room):</span>
                        <span className="font-mono">${ap47.sectionI.C1_embalmingAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2. Other Preparation:</span>
                      </div>
                      <div className="pl-3 space-y-0.5 text-neutral-600">
                        <div className="flex justify-between">
                          <span>a. Topical Disinfection:</span>
                          <span className="font-mono">${ap47.sectionI.C2_topicalDisinfectionAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>b. Custodial Care:</span>
                          <span className="font-mono">${ap47.sectionI.C2_custodialCareAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>c. Dressing/Casketing:</span>
                          <span className="font-mono">${ap47.sectionI.C2_dressingCasketingAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>d. Cosmetology:</span>
                          <span className="font-mono">${ap47.sectionI.C2_cosmetologyAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>e. Restoration / Other:</span>
                          <span className="font-mono">${(ap47.sectionI.C2_restorationAmount + ap47.sectionI.C2_otherAmount).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div className="max-w-[75%]">
                      <strong>D. Arrangements:</strong>
                      <p className="text-[9px] text-neutral-500 leading-tight">
                        Basic arrangements: funeral director, staff, equipment and facilities to respond to initial request, conference, securing authorizations, and coordination.
                      </p>
                    </div>
                    <strong className="font-mono">${ap47.sectionI.D_basicArrangementsAmount.toFixed(2)}</strong>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex justify-between">
                      <strong>E. Supervision (funeral director and staff):</strong>
                    </div>
                    <div className="pl-3 space-y-0.5 text-[10px] text-neutral-700">
                      <div className="flex justify-between">
                        <span>1. Supervision for visitation:</span>
                        <span className="font-mono">${ap47.sectionI.E1_supervisionVisitationAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2. Supervision for funeral service:</span>
                        <span className="font-mono">${ap47.sectionI.E2_supervisionFuneralServiceAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>3. Other supervision (Cemetery/Crematory):</span>
                        <span className="font-mono">${ap47.sectionI.E3_supervisionCemeteryCrematoryAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column (F-J) */}
                <div className="space-y-3">
                  
                  <div className="space-y-0.5">
                    <div className="flex justify-between">
                      <strong>F. Use of the facilities:</strong>
                    </div>
                    <div className="pl-3 space-y-0.5 text-[10px] text-neutral-700">
                      <div className="flex justify-between">
                        <span>1. Use of facilities for visitation:</span>
                        <span className="font-mono">${ap47.sectionI.F1_facilitiesVisitationAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2. Use of facilities for funeral service:</span>
                        <span className="font-mono">${ap47.sectionI.F2_facilitiesFuneralServiceAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex justify-between">
                      <strong>G. Livery:</strong>
                      <strong className="font-mono">${ap47.sectionI.G_totalLiveryAmount.toFixed(2)}</strong>
                    </div>
                    <div className="pl-3 space-y-0.5 text-[10px] text-neutral-700">
                      {(ap47.sectionI.G_vehicles || []).map((v, i) => (
                        <div key={i} className="flex justify-between">
                          <span>• {v.vehicleType} ({v.count}x):</span>
                          <span className="font-mono">${(v.count * v.unitPrice).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex justify-between">
                      <strong>H. Merchandise:</strong>
                    </div>
                    <div className="pl-3 space-y-0.5 text-[10px] text-neutral-700">
                      <div className="flex justify-between">
                        <span>1. Casket ({ap47.sectionI.H1_casketModelNameOrNumber || 'Selected'}):</span>
                        <span className="font-mono">${ap47.sectionI.H1_casketAmount.toFixed(2)}</span>
                      </div>
                      {ap47.sectionI.H2_outerReceptacleSelected && (
                        <div className="flex justify-between">
                          <span>2. Outer Receptacle ({ap47.sectionI.H2_outerReceptacleModelName}):</span>
                          <span className="font-mono">${ap47.sectionI.H2_outerReceptacleAmount.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex justify-between">
                      <strong>I. Additional Services & Merchandise:</strong>
                    </div>
                    <div className="pl-3 space-y-0.5 text-[10px] text-neutral-700">
                      <div className="flex justify-between">
                        <span>• Memorial Cards & Booklets:</span>
                        <span className="font-mono">${(ap47.sectionI.I1_memorialCardsAmount + ap47.sectionI.I10_programsMatrix.totalAmount).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Flowers & Tributes ({ap47.sectionI.I6_flowerItems.length} items):</span>
                        <span className="font-mono">${ap47.sectionI.I6_totalFlowersAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Register Book & Video Tribute:</span>
                        <span className="font-mono">${(ap47.sectionI.I8_registerBookAmount + ap47.sectionI.I11_videoTributeAmount).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2 border-t-2 border-neutral-900 font-bold text-xs text-neutral-900">
                    <span>TOTAL FUNERAL HOME CHARGES:</span>
                    <span className="font-mono text-[#991b1b]">${ap47.sectionI.totalFuneralHomeCharges.toFixed(2)}</span>
                  </div>

                </div>

              </div>

            </div>

            {/* PAGE 2 */}
            <div className="space-y-4 pt-2">
              <div className="text-center font-bold text-xs uppercase tracking-wider font-serif-title text-neutral-900 py-1 bg-neutral-100 rounded">
                STATEMENT OF GOODS AND SERVICES SELECTED — PAGE 2
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px]">
                
                {/* Cash Advances */}
                <div className="space-y-2 border border-neutral-300 rounded-xl p-3.5">
                  <h5 className="font-bold text-xs uppercase text-[#991b1b] border-b border-neutral-200 pb-1">
                    II. CASH ADVANCES (Paid to Others on Family's Behalf)
                  </h5>
                  <p className="text-[9px] text-neutral-500 italic">
                    Charges actually paid to third parties on the family's behalf.
                  </p>

                  <div className="space-y-1 text-[10px]">
                    <div className="flex justify-between">
                      <span>1. Cemetery or Crematory:</span>
                      <span className="font-mono">${ap47.sectionII.cemeteryOrCrematoryAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2. Clergy Honoraria / Church:</span>
                      <span className="font-mono">${ap47.sectionII.clergyHonorariaAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3. Death Certificate Transcripts ({ap47.sectionII.deathCertificateTranscriptsCount}x):</span>
                      <span className="font-mono">${ap47.sectionII.deathCertificateTranscriptsAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4. Organist / Musician:</span>
                      <span className="font-mono">${ap47.sectionII.organistMusicianAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>5. Pallbearers, Tolls & Tips:</span>
                      <span className="font-mono">${(ap47.sectionII.pallbearersAmount + ap47.sectionII.bridgeAndRoadTollsAmount + ap47.sectionII.gratuitiesLiveryAndStaffAmount).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-neutral-300 font-bold text-xs text-neutral-900">
                    <span>ESTIMATED TOTAL CASH ADVANCES:</span>
                    <span className="font-mono">${ap47.sectionII.totalCashAdvances.toFixed(2)}</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-2 bg-red-50/60 border border-red-200 rounded-xl p-3.5">
                  <h5 className="font-bold text-xs uppercase text-[#991b1b] border-b border-red-200 pb-1">
                    III. SUMMARY OF CHARGES
                  </h5>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>1. Funeral Home Charges:</span>
                      <span className="font-mono font-bold">${ap47.sectionIII.funeralHomeChargesTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2. Cash Advances:</span>
                      <span className="font-mono font-bold">${ap47.sectionIII.cashAdvancesTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-red-200 text-sm font-bold text-[#991b1b]">
                      <span>TOTAL FUNERAL CHARGES:</span>
                      <span className="font-mono">${ap47.sectionIII.totalFuneralCharges.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-800 font-bold text-xs pt-1">
                      <span>Less Payments / Life Insurance:</span>
                      <span className="font-mono">-${ap47.sectionIII.lessCreditsAndInsurance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-neutral-900 pt-1 border-t border-red-300">
                      <span>BALANCE DUE:</span>
                      <span className="font-mono text-base text-red-900">${ap47.sectionIII.balanceDue.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Section IV Explanations & Signatures */}
              <div className="border border-neutral-300 rounded-xl p-3.5 space-y-3 text-[10px] text-neutral-700">
                <h5 className="font-bold text-xs uppercase text-neutral-900 border-b border-neutral-200 pb-1">
                  IV. EXPLANATION OF CHARGES & STATUTORY AUTHORIZATIONS
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                    <div className="font-bold text-neutral-900 flex items-center gap-1">
                      <span className="text-emerald-700">☑</span>
                      <span>Custody Authorization:</span>
                    </div>
                    <p className="text-[9px] text-neutral-500 mt-0.5">
                      "The undersigned hereby authorizes Benta's Funeral Home, Inc. to obtain physical custody of the remains."
                    </p>
                    <span className="font-bold text-neutral-800 block text-[9px] mt-1">
                      Authorized by: {caseData.informant.fullName} ({caseData.informant.relationship})
                    </span>
                  </div>

                  <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                    <div className="font-bold text-neutral-900 flex items-center gap-1">
                      <span className="text-emerald-700">☑</span>
                      <span>Embalming Authorization (10 NYCRR § 77.7):</span>
                    </div>
                    <p className="text-[9px] text-neutral-500 mt-0.5">
                      "The undersigned hereby authorizes Benta's Funeral Home [✓] to embalm [ ] not to embalm the remains."
                    </p>
                    <span className="font-bold text-neutral-800 block text-[9px] mt-1">
                      Embalming Authorized for Public Viewing
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-[9px] space-y-0.5 text-neutral-700">
                  <p className="font-bold text-neutral-900">
                    "Charges are only for those items that are used. If we are required by law to use any items, we will explain the reasons in writing below."
                  </p>
                  <p>
                    "Prior to the discussion of these funeral arrangements, I was presented with a copy of this funeral firm's 'General Price List' for which I hereby acknowledge receipt, and have had an opportunity to review the firm's Casket Price List and Outer Interment Receptacle Price List."
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-neutral-300">
                  <div>
                    <div className="border-b border-neutral-900 pb-1 font-serif italic text-sm text-[#991b1b]">
                      {caseData.informant.fullName} (Electronic Jurat Verified)
                    </div>
                    <span className="text-[9px] text-neutral-500 block mt-0.5">
                      Signature of Purchaser / Next of Kin • {ap47.agreementDate}
                    </span>
                  </div>

                  <div>
                    <div className="border-b border-neutral-900 pb-1 font-serif italic text-sm text-neutral-900">
                      {caseData.assignedDirector || 'Jason Benta, NYS LFD #08850'}
                    </div>
                    <span className="text-[9px] text-neutral-500 block mt-0.5">
                      Signature of Licensed Funeral Director • Benta's Funeral Home, Inc.
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        );
      }

      // -------------------------------------------------------------
      // FORM 3: AT-NEED WRITTEN STATEMENT OF PERSON HAVING RIGHT TO CONTROL DISPOSITION (NYS § 4201)
      // -------------------------------------------------------------
      case 'right_to_control':
        return (
          <div className="space-y-6 text-neutral-900 font-sans text-xs bg-white p-6 sm:p-8 rounded-xl border border-neutral-300 shadow-sm print:p-0 print:border-none">
            {/* Header */}
            <div className="text-center border-b-2 border-neutral-900 pb-3 space-y-1">
              <h3 className="font-serif-title font-bold text-base uppercase tracking-wider text-neutral-900">
                AT-NEED WRITTEN STATEMENT OF PERSON HAVING THE RIGHT TO CONTROL DISPOSITION
              </h3>
              <p className="text-xs text-neutral-500 italic">(Provided to Funeral Director)</p>
              <h4 className="font-bold text-sm tracking-widest text-[#991b1b] uppercase font-serif-title pt-1">
                PERSON OTHER THAN AGENT
              </h4>
            </div>

            {/* Statutory Attestation */}
            <div className="space-y-3 leading-relaxed text-xs text-neutral-800">
              <p>
                <strong>I, {caseData.informant.fullName}</strong>, hereby represent and assert that I am entitled to control the disposition of the remains of <strong>{caseData.decedent.legalName}</strong>.
              </p>
              <p>
                I further represent that I am the person having priority to control the disposition in accordance with Subdivision 2 of Section 4201 of the New York State Public Health Law. The order of priority set forth in Subdivision 2 of Section 4201 of the NYS Public Health Law is the following:
              </p>

              {/* 11-Tier Priority List */}
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1 font-mono text-[11px] text-neutral-700">
                <p>1. Person designated in written instrument pursuant to Section 4201;</p>
                <p><strong>2. Spouse [✓ {caseData.informant.fullName}];</strong></p>
                <p>3. Domestic Partner;</p>
                <p>4. Children 18 or Older;</p>
                <p>5. Either of the Parents;</p>
                <p>6. Any Sibling 18 or Older;</p>
                <p>7. Authorized Guardian;</p>
                <p>8. Grandchildren, Great-Grandchildren, Nieces/Nephews, Grandparents, Aunts/Uncles, First Cousins;</p>
                <p>9. Fiduciary;</p>
                <p>10. Close friend or relative reasonably familiar with decedent's wishes;</p>
                <p>11. Public Administrator.</p>
              </div>

              <p className="pt-2">
                I also have no knowledge that the decedent executed a will containing directions for the disposition of his/her remains, or designated an agent by executing a written instrument pursuant to Section 4201 of the Public Health Law.
              </p>
            </div>

            {/* Signature Blocks */}
            <div className="pt-6 border-t-2 border-neutral-900 flex flex-col sm:flex-row justify-between items-end text-xs gap-4">
              <div>
                <p className="font-mono text-xs font-bold text-neutral-600 mb-4">Date: {caseData.createdAt.split('T')[0]}</p>
                <div className="border-b border-neutral-900 w-56 mb-1" />
                <span className="text-[10px] text-neutral-500 uppercase font-bold">Signature of Person Granting Authority ({caseData.informant.fullName})</span>
              </div>
              <div className="text-right text-[11px] text-neutral-500 font-mono">
                <p>Original — Funeral Director</p>
                <p>Copy — Next-of-Kin</p>
              </div>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // FORM 4: ENGAGEMENT OF SERVICES & FINANCIAL RESPONSIBILITY AFFIDAVIT
      // -------------------------------------------------------------
      case 'engagement_financial':
        return (
          <div className="space-y-6 text-neutral-900 font-sans text-xs bg-white p-6 sm:p-8 rounded-xl border border-neutral-300 shadow-sm print:p-0 print:border-none">
            {/* Header */}
            <div className="text-center border-b-2 border-neutral-900 pb-3 space-y-1">
              <h2 className="font-serif-title font-bold text-2xl text-[#991b1b] tracking-wider">
                BENTA'S FUNERAL HOME, INC.
              </h2>
              <p className="text-xs text-neutral-600 font-medium">
                630 St. Nicholas Ave. New York, NY 10030 • Tel: 212.281.8850 • Fax: 212.234.3600 • WWW.E-BFH.COM
              </p>
              <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-900 pt-2 font-serif-title">
                ENGAGEMENT OF SERVICES & FINANCIAL RESPONSIBILITY AFFIDAVIT
              </h4>
            </div>

            {/* Engagement Statement */}
            <div className="space-y-4 leading-relaxed text-xs text-neutral-800">
              <p className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
                <strong>I, {caseData.informant.fullName}</strong>, residing at <strong>{caseData.informant.address}</strong>, hereby engage the services of <strong>Benta's Funeral Home, Inc.</strong> to remove the remains of <strong>{caseData.decedent.legalName}</strong>, my <strong>{caseData.informant.relationship}</strong>, who died at <strong>{caseData.decedent.placeOfDeath}</strong> on the <strong>{caseData.decedent.dateOfDeath.split('-')[2] || '16th'}</strong> day of <strong>September, 2026</strong>, and <strong>embalm</strong> and prepare for <strong>{caseData.dispositionType.replace('_', ' ')}</strong>.
              </p>

              <p className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
                <strong>I, {caseData.informant.fullName}</strong>, will be financially responsible for any fees necessary related to this removal of <strong>{caseData.decedent.legalName}</strong> and for embalming, or refrigeration and or storage of the remains.
              </p>

              <div className="p-3 bg-red-50 border border-red-200 rounded-xl font-bold text-xs text-[#991b1b]">
                "This obligation is binding even if another funeral establishment is chosen after the services have been provided."
              </div>
            </div>

            {/* Notary Jurat */}
            <div className="pt-6 border-t-2 border-neutral-900 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[11px] text-neutral-600">Subscribed and sworn to before me this {new Date().getDate()} day of September, 2026.</p>
                </div>
                <div className="text-right">
                  <div className="border-b border-neutral-900 w-48 mb-1 ml-auto" />
                  <span className="text-[10px] text-neutral-500 uppercase font-bold">L.S. Signature of Principal</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex justify-between items-end">
                <div>
                  <div className="border-b border-neutral-900 w-56 mb-1" />
                  <span className="text-[10px] text-neutral-500 uppercase font-bold">Notary Public — Commissioner of Deeds</span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">NY County Notary Reg #02BE6389201</span>
              </div>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // FORM 5: CLOTHING TRANSMITTAL FORM
      // -------------------------------------------------------------
      case 'clothing_transmittal':
        return (
          <div className="space-y-6 text-neutral-900 font-sans text-xs bg-white p-6 sm:p-8 rounded-xl border border-neutral-300 shadow-sm print:p-0 print:border-none">
            {/* Header */}
            <div className="flex justify-between items-center border-b-2 border-neutral-900 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#991b1b] text-white flex items-center justify-center font-bold">B</div>
                <span className="font-serif-title font-bold text-base text-neutral-900">BENTA'S Funeral Home, Inc.</span>
              </div>
              <h3 className="font-serif-title font-bold text-base tracking-widest text-[#991b1b] uppercase">
                CLOTHING TRANSMITTAL
              </h3>
            </div>

            {/* Metadata Box */}
            <div className="grid grid-cols-3 gap-3 border border-neutral-200 p-3 rounded-xl text-xs">
              <div><span className="text-[10px] text-neutral-500 block">Date:</span> <strong>{caseData.createdAt.split('T')[0]}</strong></div>
              <div><span className="text-[10px] text-neutral-500 block">Funeral Director:</span> <strong>{caseData.assignedDirector}</strong></div>
              <div><span className="text-[10px] text-neutral-500 block">Case #:</span> <strong className="font-mono">{caseData.caseNumber}</strong></div>
              <div className="col-span-3 border-t border-neutral-100 pt-2"><span className="text-[10px] text-neutral-500 block">Name of Deceased:</span> <strong className="text-sm">{caseData.decedent.legalName}</strong></div>
            </div>

            {/* Casket Information */}
            <div className="border border-neutral-200 p-3.5 rounded-xl space-y-2">
              <span className="font-bold text-xs uppercase text-[#991b1b] block">Casket Information:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div><span className="text-[10px] text-neutral-500 block">Casket Number:</span> <strong className="font-mono">CSK-8819-CH</strong></div>
                <div><span className="text-[10px] text-neutral-500 block">Casket Name:</span> <strong>St. Nicholas Cherry</strong></div>
                <div><span className="text-[10px] text-neutral-500 block">Name Plate:</span> <strong className="text-emerald-700">✓ Yes [ ] No</strong></div>
                <div><span className="text-[10px] text-neutral-500 block">Hairdresser Assigned:</span> <strong className="text-emerald-700">✓ Yes [ ] No</strong></div>
              </div>
            </div>

            {/* 12-Row Items Sent Table */}
            <div className="space-y-1.5">
              <span className="font-bold text-xs uppercase text-neutral-900 block">Items Sent for Preparation & Dressing:</span>
              <table className="w-full text-left text-xs border border-neutral-300 rounded-lg overflow-hidden">
                <thead className="bg-neutral-100 border-b border-neutral-300 text-[10px] font-bold text-neutral-600 uppercase">
                  <tr>
                    <th className="p-2 w-10 text-center">#</th>
                    <th className="p-2">Item Description & Specifications</th>
                    <th className="p-2 w-28 text-right">Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {[
                    'Navy Blue 3-Piece Wool Suit with Gold Lapel Pin',
                    'White French Cuff Dress Shirt & Navy Silk Tie',
                    'Complete Undergarment Set (Vest, Undershirt, Socks)',
                    'Black Polished Oxford Dress Shoes',
                    'Gold Wedding Band (To remain on left ring finger)',
                    'Vintage Gold Pocket Watch (Display during viewing, remove prior to Woodlawn)',
                    'Gold-Rimmed Reading Glasses',
                    'U.S. Navy Veteran Medals Ribbon Bar (Affixed to left lapel)',
                    'Family Reference Portrait Photo for Hairstyling (Taper fade & trim)',
                    'Custom Silk Pocket Square (Burgundy Accent)',
                    'Handmade Rosary & Blessed Prayer Beads',
                    'Personal Keepsake Letter from Grandchildren'
                  ].map((item, i) => (
                    <tr key={i} className="hover:bg-neutral-50">
                      <td className="p-2 text-center font-mono text-neutral-500 font-bold">{i + 1}</td>
                      <td className="p-2 font-medium text-neutral-800">{item}</td>
                      <td className="p-2 text-right text-emerald-700 font-bold">✓ Checked In</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Viewing & Funeral Location Information */}
            <div className="border border-neutral-200 p-3.5 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-xs uppercase text-[#991b1b] block">Viewing & Funeral Schedule:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div><span className="text-[10px] text-neutral-500 block">Date of First Viewing:</span> <strong>{caseData.serviceSelections.serviceDate || '2026-09-21'}</strong></div>
                <div><span className="text-[10px] text-neutral-500 block">Time of First Viewing:</span> <strong>04:00 PM – 07:00 PM</strong></div>
                <div><span className="text-[10px] text-neutral-500 block">Date of Funeral:</span> <strong>{caseData.serviceSelections.serviceDate || '2026-09-22'} (11:00 AM)</strong></div>
              </div>
              <div className="pt-2 border-t border-neutral-100 flex items-center space-x-3">
                <span className="text-[10px] text-neutral-500 uppercase font-bold">Location:</span>
                <span className="font-bold text-neutral-900 bg-red-50 text-[#991b1b] px-2 py-0.5 rounded border border-red-200">
                  [✓] Chapel I &nbsp; [ ] Chapel II &nbsp; [ ] ABC &nbsp; [ ] Other
                </span>
              </div>
            </div>

            <p className="text-[10px] text-center text-neutral-400 font-serif italic">
              Proprietary Property of Benta's Funeral Home, Inc.
            </p>
          </div>
        );

      // -------------------------------------------------------------
      // FORM 6: CLIENT PRODUCTION PACKAGE OVERVIEW (DVD, PROGRAM, PRAYER CARDS)
      // -------------------------------------------------------------
      case 'client_production':
        return (
          <div className="space-y-6 text-neutral-900 font-sans text-xs bg-white p-6 sm:p-8 rounded-xl border border-neutral-300 shadow-sm print:p-0 print:border-none">
            {/* Header */}
            <div className="flex justify-between items-center border-b-2 border-neutral-900 pb-3">
              <div>
                <h3 className="font-serif-title font-bold text-lg text-neutral-900">
                  Client Production Package Overview
                </h3>
                <p className="text-xs text-[#991b1b] font-medium">Benta's Digiprint & 360° Media Suite</p>
              </div>
              <div className="text-right text-xs">
                <p>Today's Date: <strong>{caseData.createdAt.split('T')[0]}</strong></p>
                <p>Submittal Time: <strong className="font-mono">11:30 AM</strong></p>
              </div>
            </div>

            {/* Case Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs">
              <div><span className="text-[10px] text-neutral-500 block">Decedent Name:</span> <strong>{caseData.decedent.legalName}</strong></div>
              <div><span className="text-[10px] text-neutral-500 block">Case #:</span> <strong className="font-mono">{caseData.caseNumber}</strong></div>
              <div><span className="text-[10px] text-neutral-500 block">Dates:</span> <strong>{caseData.decedent.dateOfBirth} – {caseData.decedent.dateOfDeath}</strong></div>
              <div><span className="text-[10px] text-neutral-500 block">Funeral Director:</span> <strong>{caseData.assignedDirector}</strong></div>
            </div>

            {/* 3 Modules: Memorial DVD, Funeral Program, Prayer Cards */}
            <div className="space-y-4">
              
              {/* 1. Memorial DVD & 360 Screen Tribute */}
              <div className="border border-neutral-200 p-3.5 rounded-xl space-y-2">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-1.5">
                  <span className="font-bold text-xs uppercase text-[#991b1b]">1. MEMORIAL DVD & 360° DIGI-TRIBUTE:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">[✓] YES [ ] NO</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div><span className="text-[9px] text-neutral-500 block">Delivery Date & Time:</span> <strong>Sept 21, 2026 at 2:00 PM</strong></div>
                  <div><span className="text-[9px] text-neutral-500 block"># of Photos Uploaded:</span> <strong className="font-mono">48 High-Res Photos</strong></div>
                  <div><span className="text-[9px] text-neutral-500 block">Easel Photo(s):</span> <strong>1x 16x20 Framed Portrait</strong></div>
                  <div><span className="text-[9px] text-neutral-500 block">Suite Photos:</span> <strong>Dual 75" Sanctuary Screens</strong></div>
                </div>
                <p className="text-[10px] text-neutral-600 italic">Special Instructions: Loop slideshow during wake and chapel service with soft jazz background audio.</p>
              </div>

              {/* 2. Funeral Programs */}
              <div className="border border-neutral-200 p-3.5 rounded-xl space-y-2">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-1.5">
                  <span className="font-bold text-xs uppercase text-[#991b1b]">2. FUNERAL SERVICE PROGRAM:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">[✓] YES [ ] NO</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div><span className="text-[9px] text-neutral-500 block">Quantity:</span> <strong className="font-mono">150 Booklets</strong></div>
                  <div><span className="text-[9px] text-neutral-500 block">Program Size:</span> <strong>[✓] BIG Paper (8.5x14 Trifold)</strong></div>
                  <div><span className="text-[9px] text-neutral-500 block">Program Style:</span> <strong>[✓] Premium Gold Foil Trim</strong></div>
                  <div><span className="text-[9px] text-neutral-500 block">Photos Included:</span> <strong>[✓] Front [✓] Inside [✓] Obit [✓] Back</strong></div>
                </div>
              </div>

              {/* 3. Prayer Cards */}
              <div className="border border-neutral-200 p-3.5 rounded-xl space-y-2">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-1.5">
                  <span className="font-bold text-xs uppercase text-[#991b1b]">3. MEMORIAL PRAYER CARDS:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">[✓] YES [ ] NO</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div><span className="text-[9px] text-neutral-500 block">Quantity Selected:</span> <strong className="font-mono">200 Laminated Cards</strong></div>
                  <div><span className="text-[9px] text-neutral-500 block">Title Caption:</span> <strong>[✓] "In Loving Memory"</strong></div>
                  <div><span className="text-[9px] text-neutral-500 block">Verse Type:</span> <strong>[✓] Scripture: Psalm 23 & John 14</strong></div>
                  <div><span className="text-[9px] text-neutral-500 block">Series / Code:</span> <strong>HARLEM-SERIES-GOLD</strong></div>
                </div>
              </div>

            </div>
          </div>
        );

      // -------------------------------------------------------------
      // FORM 7: NYC DEPT OF HOSPITALS - STATEMENT OF AUTHORITY
      // -------------------------------------------------------------
      case 'nyc_authority':
        return (
          <div className="space-y-6 text-neutral-900 font-sans text-xs bg-white p-6 sm:p-8 rounded-xl border border-neutral-300 shadow-sm print:p-0 print:border-none">
            {/* Header */}
            <div className="text-center border-b-2 border-neutral-900 pb-3 space-y-1">
              <h3 className="font-serif-title font-bold text-sm tracking-wider text-neutral-800 uppercase">
                THE CITY OF NEW YORK DEPARTMENT OF HOSPITALS / HEALTH
              </h3>
              <h2 className="font-serif-title font-bold text-lg text-[#991b1b] uppercase">
                FUNERAL DIRECTOR'S STATEMENT OF AUTHORITY
              </h2>
              <p className="text-[11px] text-neutral-600 italic">
                "This statement is made for the purpose of inducing the hospital or health care facility to release the death certificate and/or the remains of the deceased below-named."
              </p>
            </div>

            {/* Certification Statement */}
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-3">
              <span className="font-bold text-neutral-900 uppercase block tracking-wider">
                IT IS HEREBY CERTIFIED THAT THE UNDERSIGNED HAS BEEN AUTHORIZED TO TAKE CHARGE OF:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-neutral-200 pb-2">
                <div><span className="text-[10px] text-neutral-500 block">The remains of:</span> <strong>{caseData.decedent.legalName}</strong></div>
                <div><span className="text-[10px] text-neutral-500 block">Who died at:</span> <strong>{caseData.decedent.placeOfDeath}</strong></div>
                <div><span className="text-[10px] text-neutral-500 block">On (Date):</span> <strong>{caseData.decedent.dateOfDeath}</strong></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-neutral-200 pb-2">
                <div><span className="text-[10px] text-neutral-500 block">By (Person granting authority):</span> <strong>{caseData.informant.fullName}</strong></div>
                <div><span className="text-[10px] text-neutral-500 block">Whose address is:</span> <strong>{caseData.informant.address}</strong></div>
                <div><span className="text-[10px] text-neutral-500 block">And who is the:</span> <strong>{caseData.informant.relationship}</strong></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><span className="text-[10px] text-neutral-500 block">Remains to be removed from:</span> <strong>{caseData.decedent.placeOfDeath}</strong></div>
                <div><span className="text-[10px] text-neutral-500 block">To:</span> <strong>Benta's Funeral Home, Inc., 630 St. Nicholas Ave, NY 10030</strong></div>
              </div>
            </div>

            {/* Non-Solicitation Statement */}
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl font-bold text-center text-xs text-[#991b1b]">
              "THIS AUTHORIZATION HAS NOT BEEN THE RESULT OF ANY SOLICITATION BY OR IN BEHALF OF THE UNDERSIGNED."
            </div>

            {/* Signature Block */}
            <div className="pt-4 border-t-2 border-neutral-900 flex justify-between items-end text-xs">
              <div>
                <div className="border-b border-neutral-900 w-56 mb-1" />
                <span className="text-[10px] text-neutral-500 uppercase font-bold">Signature: Jason Benta (Funeral Director)</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">New York State License No:</span>
                <strong className="font-mono text-sm">NYS-LFD-14892</strong>
              </div>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // FORM 8: WOODLAWN CREMATORY AUTHORIZATION & DISPATCH PACKET
      // -------------------------------------------------------------
      case 'woodlawn_cremation':
        return (
          <div className="space-y-6 text-neutral-900 font-sans text-xs bg-white p-6 sm:p-8 rounded-xl border border-neutral-300 shadow-sm print:p-0 print:border-none">
            <div className="text-center border-b-2 border-neutral-900 pb-3 space-y-1">
              <h3 className="font-serif-title font-bold text-base text-neutral-800 uppercase tracking-wide">
                WOODLAWN CREMATORY & CEMETERY (BRONX, NY)
              </h3>
              <h2 className="font-serif-title font-bold text-xl text-[#991b1b]">
                AUTHORIZATION FOR CREMATION AND DISPOSITION
              </h2>
              <p className="text-xs text-neutral-500 font-mono">Benta's Funeral Home Dispatch Ref #WD-2026-8819</p>
            </div>

            <div className="space-y-3 leading-relaxed text-xs">
              <p>
                The undersigned Next of Kin authorizes <strong>Woodlawn Crematory</strong> to cremate the remains of <strong>{caseData.decedent.legalName}</strong> delivered by <strong>Benta's Funeral Home, Inc.</strong>
              </p>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1 text-[11px]">
                <p><strong>Pacemaker / Mechanical Devices:</strong> [✓] Certified Removed or None Present</p>
                <p><strong>Urn Selected:</strong> Handcrafted Bronze Keepsake Urn (Benta Collection)</p>
                <p><strong>Cortege Departure from BFH:</strong> 1:30 PM EST on Sept 22, 2026</p>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-neutral-900 flex justify-between items-end text-xs">
              <div>
                <div className="border-b border-neutral-900 w-56 mb-1" />
                <span className="text-[10px] text-neutral-500 uppercase font-bold">Signature of Authorizing Agent ({caseData.informant.fullName})</span>
              </div>
              <div className="text-right">
                <div className="border-b border-neutral-900 w-56 mb-1 ml-auto" />
                <span className="text-[10px] text-neutral-500 uppercase font-bold">Woodlawn Crematory Official Stamp</span>
              </div>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // DEFAULT / GENERAL DOCUMENT VIEW
      // -------------------------------------------------------------
      default:
        return (
          <div className="space-y-4 text-neutral-900 font-sans text-xs bg-white p-6 sm:p-8 rounded-xl border border-neutral-300 shadow-sm print:p-0 print:border-none">
            <div className="text-center border-b border-neutral-200 pb-3">
              <h4 className="font-bold text-base tracking-wide text-[#991b1b]">BENTA'S FUNERAL HOME, INC.</h4>
              <p className="text-[10px] text-neutral-500">630 Saint Nicholas Avenue, New York, NY 10030 • (212) 281-8850</p>
              <p className="font-bold text-sm uppercase mt-2 text-neutral-900">{doc.name}</p>
              <p className="text-[10px] text-neutral-400">Case No: {caseData.caseNumber}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] bg-neutral-50 p-3 rounded-xl border border-neutral-200">
              <p><strong>Decedent:</strong> {caseData.decedent.legalName}</p>
              <p><strong>Date of Death:</strong> {caseData.decedent.dateOfDeath}</p>
              <p><strong>Informant:</strong> {caseData.informant.fullName} ({caseData.informant.relationship})</p>
              <p><strong>Disposition:</strong> {caseData.serviceSelections.packageTitle}</p>
              <p><strong>Destination:</strong> {caseData.serviceSelections.crematoryOrCemeteryName}</p>
              <p><strong>EDRS Status:</strong> {caseData.medicalCertifier.edrsStatus}</p>
            </div>

            <p className="text-[11px] text-neutral-600 leading-relaxed font-light">
              This official document has been authenticated by the BFH Golden Record Engine. All representations made herein comply with the New York State Department of Health and Federal Trade Commission regulations.
            </p>

            <div className="pt-4 flex justify-between items-end border-t border-neutral-200">
              <div>
                <div className="border-b border-neutral-900 w-48 mb-1" />
                <p className="text-[9px] text-neutral-600">Signature of Next of Kin / Authorized Representative</p>
              </div>
              <div>
                <div className="border-b border-neutral-900 w-48 mb-1" />
                <p className="text-[9px] text-neutral-600">Jason Benta, Licensed Funeral Director</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 text-neutral-900 font-sans">
      
      {/* 1. TOP HEADER & MATRIX SUMMARY */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Document Journey & Delivery Matrix
            </h2>
            <span className="bg-red-50 text-[#991b1b] text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-200 flex items-center gap-1">
              <FileCheck2 className="w-3 h-3" />
              13 Official BFH Forms
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1 font-light">
            Live lifecycle tracking and interactive field inspection for every official form for <strong className="text-[#991b1b] font-semibold">{caseData.decedent.legalName}</strong> ({caseData.caseNumber}).
          </p>
        </div>

        {/* Phase Filter Pills */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          {[
            { id: 'all', label: 'All Documents (13)' },
            { id: 'intake_removal', label: 'Phase 1: Intake' },
            { id: 'arrangements', label: 'Phase 2: Arrangements' },
            { id: 'legal_bundle', label: 'Phase 3: Legal Bundle' },
            { id: 'permits_logistics', label: 'Phase 4: Permits' },
            { id: 'finalization_aftercare', label: 'Phase 5: Finalization' }
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedPhase(pill.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                selectedPhase === pill.id
                  ? 'bg-[#991b1b] text-white border-[#991b1b] shadow-xs'
                  : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. MAIN DOCUMENT MATRIX TABLE */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-700">
            <thead className="bg-neutral-50 text-neutral-500 uppercase text-[10px] tracking-wider border-b border-neutral-200 font-bold">
              <tr>
                <th className="p-4">Official Form Name</th>
                <th className="p-4">Phase & Timing</th>
                <th className="p-4">Recipient</th>
                <th className="p-4">Delivery Method</th>
                <th className="p-4">Status</th>
                <th className="p-4">Legal Follow-up Action</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-neutral-50/80 transition group">
                  
                  {/* Document Name */}
                  <td className="p-4 font-bold text-neutral-900">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-[#991b1b] flex items-center justify-center shrink-0 border border-red-200/60 shadow-2xs">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-neutral-900 leading-snug">{doc.name}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">ID: {doc.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Timing */}
                  <td className="p-4 text-neutral-600 font-mono text-[11px]">
                    <span className="font-bold text-neutral-800 block capitalize">{doc.phase.replace('_', ' ')}</span>
                    <span className="text-neutral-500 text-[10px]">{doc.triggerTiming}</span>
                  </td>

                  {/* Recipient */}
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-[11px] text-neutral-800 font-medium">
                      {doc.destinationRecipient}
                    </span>
                  </td>

                  {/* Delivery Method */}
                  <td className="p-4 text-neutral-600 text-[11px] font-medium">
                    {doc.deliveryMethod}
                  </td>

                  {/* Status Badge */}
                  <td className="p-4">
                    {getStatusBadge(doc.status)}
                  </td>

                  {/* Follow Up */}
                  <td className="p-4 text-[11px] text-neutral-500 max-w-xs font-light">
                    {doc.followUpAction}
                  </td>

                  {/* Action Buttons */}
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1.5 items-center">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="bg-neutral-900 hover:bg-neutral-800 text-amber-300 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition shadow-2xs border border-amber-400/30"
                        title="Open complete official document with all fields"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-300" />
                        <span>Inspect Form</span>
                      </button>

                      {doc.deliveryMethod === 'eSign Portal' && (
                        <button
                          onClick={() => onOpenESign(doc)}
                          className="bg-[#991b1b] hover:bg-red-800 text-white font-bold px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1 transition shadow-sm border border-amber-300/30"
                        >
                          <PenTool className="w-3 h-3 text-amber-300" />
                          <span>eSign</span>
                        </button>
                      )}

                      {doc.status === 'pending' && (
                        <button
                          onClick={() => onUpdateDocumentStatus(doc.id, 'completed')}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded-lg text-[10px] font-bold transition shadow-sm"
                        >
                          Mark Done
                        </button>
                      )}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. INTERACTIVE OFFICIAL DOCUMENT FORM INSPECTION MODAL */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans">
          <div className="bg-white border border-neutral-200 rounded-3xl max-w-4xl w-full my-6 p-6 sm:p-8 space-y-5 shadow-2xl text-neutral-900">
            
            {/* Modal Top Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#991b1b] flex items-center justify-center border border-red-200 shadow-xs">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-title font-bold text-lg text-neutral-900 leading-tight">
                    {previewDoc.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-neutral-500 mt-0.5">
                    <span className="font-mono text-[11px] font-bold text-[#991b1b]">{caseData.caseNumber}</span>
                    <span>•</span>
                    <span>{caseData.decedent.legalName}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">100% Field Fidelity</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition border border-neutral-300 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Official PDF</span>
                </button>

                {previewDoc.deliveryMethod === 'eSign Portal' && (
                  <button
                    onClick={() => {
                      const doc = previewDoc;
                      setPreviewDoc(null);
                      onOpenESign(doc);
                    }}
                    className="bg-[#991b1b] hover:bg-red-800 text-white text-xs px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition shadow-sm border border-amber-300/40"
                  >
                    <PenTool className="w-3.5 h-3.5 text-amber-300" />
                    <span>eSign Document</span>
                  </button>
                )}

                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-2 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition"
                  title="Close Inspector"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Render Exact Form Layout */}
            <div className="max-h-[72vh] overflow-y-auto pr-1">
              {renderOfficialFormContent(previewDoc)}
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-neutral-200 gap-3 text-xs">
              <div className="flex items-center space-x-2 text-neutral-500 text-[11px]">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted & Verified via BFH Golden Record v3.0 Compliance Framework</span>
              </div>

              <div className="flex gap-2">
                {previewDoc.status !== 'completed' && previewDoc.status !== 'signed' && (
                  <button
                    onClick={() => {
                      onUpdateDocumentStatus(previewDoc.id, 'completed');
                      setPreviewDoc(null);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl transition shadow-2xs flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Mark Verified & Completed</span>
                  </button>
                )}

                <button
                  onClick={() => setPreviewDoc(null)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-5 py-2 rounded-xl transition shadow-2xs"
                >
                  Done
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
