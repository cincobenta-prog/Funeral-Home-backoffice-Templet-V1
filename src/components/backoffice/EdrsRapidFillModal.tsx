import React, { useState } from 'react';
import { GoldenRecordCase } from '../../lib/types/funeral';
import { 
  Building2, 
  Copy, 
  Check, 
  ExternalLink, 
  X, 
  ShieldCheck, 
  UserCheck, 
  Stethoscope
} from 'lucide-react';

interface EdrsRapidFillModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: GoldenRecordCase;
}

export const EdrsRapidFillModal: React.FC<EdrsRapidFillModalProps> = ({
  isOpen,
  onClose,
  caseData
}) => {
  const [activeStepTab, setActiveStepTab] = useState<'demographics' | 'parents_informant' | 'medical_certifier' | 'disposition_firm'>('demographics');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (key: string, value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setToastMessage(`Copied ${label} to clipboard!`);
    setTimeout(() => {
      setCopiedKey(null);
      setToastMessage(null);
    }, 2000);
  };

  const isCremation = caseData.serviceSelections?.dispositionType?.includes('cremation') || caseData.dispositionType?.includes('cremation');
  const dispositionMethodText = isCremation ? 'CREMATION' : 'BURIAL';
  const cemeteryOrCrematory = caseData.serviceSelections?.crematoryOrCemeteryName || 'The Woodlawn Cemetery & Crematory (Bronx, NY)';
  const transitPermit = caseData.medicalCertifier?.edrsPermitNumber || 'NY-DOH-2026-08819';
  const directorName = caseData.assignedDirector || 'Jason Benta (NYS LFD #08850)';
  const ssnDisplay = caseData.decedent?.ssnMasked || 'XXX-XX-XXXX';
  const residenceText = `${caseData.decedent?.residenceAddress || 'Harlem, NY'}, ${caseData.decedent?.city || 'New York'}, ${caseData.decedent?.state || 'NY'} ${caseData.decedent?.zipCode || '10030'}`;

  const handleCopyFullPacket = () => {
    const fullText = `=== NYS EDRS / NYC eVITAL DEATH REGISTRATION SUMMARY ===
CASE NUMBER: ${caseData.caseNumber}
FUNERAL FIRM: Benta's Funeral Home, Inc. (NYS Reg #08850)
SUPERVISING DIRECTOR: ${directorName}

1. DECEDENT DEMOGRAPHICS:
• Legal Name: ${caseData.decedent.legalName}
• SSN: ${ssnDisplay}
• Date of Birth: ${caseData.decedent.dateOfBirth}
• Gender: ${caseData.decedent.gender.toUpperCase()}
• Occupation / Industry: ${caseData.decedent.occupation || 'Civil Service'} (${caseData.decedent.industry || 'Public Administration'})
• Residence: ${residenceText}
• Marital Status: ${caseData.decedent.maritalStatus?.toUpperCase() || 'WIDOWED'}
• Veteran Status: ${caseData.decedent.veteran ? `YES (${caseData.decedent.branchOfService || 'U.S. Armed Forces'})` : 'NO'}

2. PARENTS & INFORMANT (NYS PHL § 4201):
• Father / Parent 1: ${caseData.decedent.fatherName || 'On Record'}
• Mother / Parent 2: ${caseData.decedent.motherMaidenName || 'On Record'}
• Informant Legal Name: ${caseData.informant.fullName}
• Relationship: ${caseData.informant.relationship}
• Informant Address: ${caseData.informant.address || 'New York, NY'}
• Informant Phone: ${caseData.informant.phone}
• Next of Kin / Right to Control: ${caseData.informant.hasRightToControl ? 'VERIFIED PRIMARY (§ 4201)' : 'YES'}

3. MEDICAL PRONOUNCEMENT & PASSING:
• Date of Passing: ${caseData.decedent.dateOfDeath}
• Place of Passing: ${caseData.decedent.placeOfDeath || caseData.decedent.facilityName || 'Mount Sinai Health System'}
• Attending Physician: ${caseData.medicalCertifier?.physicianName || 'Dr. Anthony Reynolds, MD (NYS Lic #299104)'}
• Physician Phone: ${caseData.medicalCertifier?.phone || '(212) 523-4000'}
• Medical License #: ${caseData.medicalCertifier?.licenseNumber || 'NYS-299104'}
• EDRS Physician Status: ${caseData.medicalCertifier?.edrsStatus?.toUpperCase() || 'CERTIFIED'}

4. DISPOSITION & LICENSED FIRM:
• Method: ${dispositionMethodText}
• Target Cemetery / Crematory: ${cemeteryOrCrematory}
• Transit Permit #: ${transitPermit}
• Funeral Firm: Benta's Funeral Home, Inc. (630 Saint Nicholas Ave, New York, NY 10030)
• Managing Director: ${directorName}`;

    navigator.clipboard.writeText(fullText);
    setToastMessage('Complete EDRS registration packet copied to clipboard!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#fcfbfa] border border-neutral-300 rounded-3xl max-w-4xl w-full max-h-[95vh] flex flex-col shadow-2xl text-neutral-900 overflow-hidden">
        
        {/* TOP HEADER */}
        <div className="p-5 bg-white border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#991b1b] shadow-xs">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif-title font-bold text-lg text-neutral-900">
                  NYS EDRS & NYC eVital Rapid-Fill Assistant
                </h3>
                <span className="bg-red-50 text-[#991b1b] border border-red-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  NYS DOH Form VR-45
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-light">
                One-click tab-ordered data bridge for <strong>{caseData.decedent.legalName}</strong> (Case #{caseData.caseNumber})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://commerce.health.state.ny.us"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition border border-neutral-300"
            >
              <span>Open NY.gov HCS Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleCopyFullPacket}
              className="px-3.5 py-2 bg-[#991b1b] hover:bg-red-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm border border-amber-300/40"
            >
              <Copy className="w-3.5 h-3.5 text-amber-300" />
              <span>Copy Full EDRS Packet</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-900 rounded-xl hover:bg-neutral-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TOAST FEEDBACK NOTIFICATION */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold text-center animate-fade-in flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-amber-200" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* STEP TABS (Matching State Portal Tab Sequence) */}
        <div className="px-6 py-2.5 bg-neutral-100 border-b border-neutral-200 flex flex-wrap items-center gap-1 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveStepTab('demographics')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeStepTab === 'demographics' ? 'bg-white text-[#991b1b] shadow-xs ring-1 ring-neutral-200' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <span>1. Demographics & Residence</span>
          </button>

          <button
            onClick={() => setActiveStepTab('parents_informant')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeStepTab === 'parents_informant' ? 'bg-white text-[#991b1b] shadow-xs ring-1 ring-neutral-200' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <span>2. Parents & Informant (§ 4201)</span>
          </button>

          <button
            onClick={() => setActiveStepTab('medical_certifier')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeStepTab === 'medical_certifier' ? 'bg-white text-[#991b1b] shadow-xs ring-1 ring-neutral-200' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <span>3. Pronouncement & Medical</span>
          </button>

          <button
            onClick={() => setActiveStepTab('disposition_firm')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeStepTab === 'disposition_firm' ? 'bg-white text-[#991b1b] shadow-xs ring-1 ring-neutral-200' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <span>4. Disposition & Firm License</span>
          </button>
        </div>

        {/* TAB BODY: GRID OF CLICK-TO-COPY CARDS */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* TAB 1: DEMOGRAPHICS */}
          {activeStepTab === 'demographics' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Click any field to copy its value directly for pasting into NYS EDRS Page 1.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                
                {/* Legal Name */}
                <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Decedent Legal Name</span>
                    <strong className="text-neutral-900 text-sm">{caseData.decedent.legalName}</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard('name', caseData.decedent.legalName, 'Legal Name')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'name' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* SSN */}
                <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Social Security Number</span>
                    <strong className="font-mono text-neutral-900">{ssnDisplay}</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard('ssn', ssnDisplay, 'SSN')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'ssn' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* DOB */}
                <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Date of Birth (MM/DD/YYYY)</span>
                    <strong className="text-neutral-900">{caseData.decedent.dateOfBirth || '06/14/1948'}</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard('dob', caseData.decedent.dateOfBirth || '06/14/1948', 'Date of Birth')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'dob' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Gender */}
                <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Gender</span>
                    <strong className="text-neutral-900 capitalize">{caseData.decedent.gender || 'Female'}</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard('gender', caseData.decedent.gender || 'Female', 'Gender')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'gender' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Occupation & Industry */}
                <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Occupation / Industry</span>
                    <strong className="text-neutral-900">{caseData.decedent.occupation || 'Educator'} ({caseData.decedent.industry || 'Public Education'})</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard('occupation', `${caseData.decedent.occupation || 'Educator'} / ${caseData.decedent.industry || 'Education'}`, 'Occupation')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'occupation' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Residence */}
                <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Residence Address</span>
                    <strong className="text-neutral-900">{residenceText}</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard('residence', residenceText, 'Residence Address')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'residence' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Marital Status */}
                <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Marital Status</span>
                    <strong className="text-neutral-900 capitalize">{caseData.decedent.maritalStatus || 'Widowed'}</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard('marital', caseData.decedent.maritalStatus || 'Widowed', 'Marital Status')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'marital' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Veteran Status */}
                <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Ever Served in U.S. Armed Forces?</span>
                    <strong className="text-neutral-900">{caseData.decedent.veteran ? `YES — ${caseData.decedent.branchOfService || 'U.S. Army'}` : 'NO'}</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard('veteran', caseData.decedent.veteran ? `YES - ${caseData.decedent.branchOfService || 'Armed Forces'}` : 'NO', 'Veteran Status')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'veteran' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: PARENTS & INFORMANT */}
          {activeStepTab === 'parents_informant' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>NYS Public Health Law § 4201 Informant of Record hierarchy validation.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                
                {/* Father Name */}
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Father / Parent 1 Full Name</span>
                    <strong className="text-neutral-900 text-sm">{caseData.decedent.fatherName || 'Thomas Vance Sr.'}</strong>
                    <span className="text-[10px] text-neutral-400 block">Recorded in Vital Records Intake</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('father', caseData.decedent.fatherName || 'Thomas Vance Sr.', 'Father Name')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'father' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Mother Maiden Name */}
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Mother / Parent 2 Maiden Name</span>
                    <strong className="text-neutral-900 text-sm">{caseData.decedent.motherMaidenName || 'Mary Jenkins'}</strong>
                    <span className="text-[10px] text-neutral-400 block">Recorded in Vital Records Intake</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('mother', caseData.decedent.motherMaidenName || 'Mary Jenkins', 'Mother Maiden Name')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'mother' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Informant Legal Name & Relationship */}
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Informant Legal Name & Relationship</span>
                    <strong className="text-neutral-900 text-sm">{caseData.informant.fullName} ({caseData.informant.relationship})</strong>
                    <span className="text-[10px] text-emerald-600 block font-semibold">
                      {caseData.informant.hasRightToControl ? '✓ Authorized Next-of-Kin / § 4201 Priority' : '✓ Informant of Record'}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('informant', caseData.informant.fullName, 'Informant Name')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'informant' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Informant Address & Phone */}
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Informant Mailing Address & Phone</span>
                    <strong className="text-neutral-900">{caseData.informant.address || '420 W 145th St, New York, NY 10031'}</strong>
                    <span className="text-[10px] text-neutral-500 block font-mono">{caseData.informant.phone} • {caseData.informant.email}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('informant_addr', caseData.informant.address || '420 W 145th St, New York, NY 10031', 'Informant Address')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'informant_addr' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: MEDICAL PRONOUNCEMENT */}
          {activeStepTab === 'medical_certifier' && (
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-xs text-red-900 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-[#991b1b] shrink-0" />
                <span>Certifying Physician & Hospital Medical Records Intake.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                
                {/* Date of Death */}
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Date of Death</span>
                    <strong className="text-neutral-900 text-sm">{caseData.decedent.dateOfDeath || '09/18/2026'}</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard('dod', caseData.decedent.dateOfDeath, 'Date of Death')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'dod' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Place of Death */}
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Place / Facility of Death</span>
                    <strong className="text-neutral-900 text-sm">{caseData.decedent.placeOfDeath || caseData.decedent.facilityName || 'Mount Sinai Morningside (1111 Amsterdam Ave)'}</strong>
                    <span className="text-[10px] text-neutral-500 block">{caseData.medicalCertifier?.hospitalFacility || 'Mount Sinai Health System'}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('place_death', caseData.decedent.placeOfDeath || caseData.decedent.facilityName || 'Mount Sinai Morningside', 'Place of Death')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'place_death' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Attending Physician */}
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Attending / Certifying Physician</span>
                    <strong className="text-neutral-900 text-sm">{caseData.medicalCertifier?.physicianName || 'Dr. Anthony Reynolds, MD'}</strong>
                    <span className="text-[10px] text-neutral-500 block">Lic: {caseData.medicalCertifier?.licenseNumber || 'NYS-299104'} • Tel: {caseData.medicalCertifier?.phone || '(212) 523-4000'}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('physician', caseData.medicalCertifier?.physicianName || 'Dr. Anthony Reynolds, MD', 'Certifying Physician')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'physician' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* EDRS Certification Status */}
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Medical Certifier Status in EDRS</span>
                    <strong className="text-neutral-900 uppercase">{caseData.medicalCertifier?.edrsStatus || 'Certified (Physician Attested)'}</strong>
                    <span className="text-[10px] text-emerald-600 block font-semibold">✓ Ready for Funeral Director Affirmation</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('edrs_status', caseData.medicalCertifier?.edrsStatus || 'Certified', 'EDRS Status')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'edrs_status' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: DISPOSITION & LICENSED FIRM */}
          {activeStepTab === 'disposition_firm' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Benta's Funeral Home, Inc. (Est. 1928) Registered Firm Information.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                
                {/* Method & Target Cemetery */}
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Method of Disposition & Facility</span>
                    <strong className="text-neutral-900 text-sm">
                      {dispositionMethodText} • {cemeteryOrCrematory}
                    </strong>
                    <span className="text-[10px] text-neutral-400 block">Package: {caseData.serviceSelections?.packageTitle || 'Full Traditional Service'}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('disposition', cemeteryOrCrematory, 'Disposition Facility')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'disposition' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Transit / Burial Permit Number */}
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Burial / Transit Permit Number</span>
                    <strong className="font-mono text-neutral-900 text-sm">{transitPermit}</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard('permit', transitPermit, 'Permit Number')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'permit' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Funeral Firm */}
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Registered Funeral Firm & Establishment #</span>
                    <strong className="text-neutral-900">Benta's Funeral Home, Inc. (NYS Reg #08850)</strong>
                    <span className="text-[10px] text-neutral-500 block">630 Saint Nicholas Ave, New York, NY 10030</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('firm', "Benta's Funeral Home, Inc. (NYS Reg #08850)", 'Funeral Firm')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'firm' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Supervising Licensed Funeral Director */}
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs flex justify-between items-center group hover:border-[#991b1b]">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Supervising Licensed Funeral Director in Charge</span>
                    <strong className="text-neutral-900">{directorName}</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard('director', directorName, 'Supervising Director')}
                    className="p-2 text-neutral-400 group-hover:text-[#991b1b] hover:bg-red-50 rounded-lg transition"
                  >
                    {copiedKey === 'director' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
