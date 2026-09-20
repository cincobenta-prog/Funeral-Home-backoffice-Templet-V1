import React, { useState } from 'react';
import {
  GoldenRecordCase,
  PartnerScheduleRequest,
  ServicePartnerContact,
  VendorSmsThreadMessage,
  SimulatedNotification
} from '../../lib/types/funeral';
import {
  Smartphone,
  Send,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Users,
  Clock,
  Car,
  Flower,
  Church,
  Music,
  CheckCheck,
  ShieldCheck
} from 'lucide-react';

interface TwoWayVendorSmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCase: GoldenRecordCase;
  partners: ServicePartnerContact[];
  requests: PartnerScheduleRequest[];
  onUpdateRequest: (updated: PartnerScheduleRequest) => void;
  onAddRequest?: (newReq: PartnerScheduleRequest) => void;
  onSendNotification?: (notif: SimulatedNotification) => void;
  targetRequestId?: string | null;
}

export const TwoWayVendorSmsModal: React.FC<TwoWayVendorSmsModalProps> = ({
  isOpen,
  onClose,
  activeCase,
  partners: _partners,
  requests,
  onUpdateRequest,
  onAddRequest: _onAddRequest,
  onSendNotification,
  targetRequestId
}) => {
  // Find initial request or default
  const caseRequests = requests.filter(r => r.caseId === activeCase.id);
  const initialReq = targetRequestId
    ? requests.find(r => r.id === targetRequestId)
    : caseRequests[0] || requests[0];

  const [selectedRequestId, setSelectedRequestId] = useState<string>(initialReq?.id || '');
  const [vendorCustomReplyText, setVendorCustomReplyText] = useState('');
  const [directorOutboundDraft, setDirectorOutboundDraft] = useState('');
  const [adjustedTimeInput, setAdjustedTimeInput] = useState('10:15 AM');
  const [showAdjustTimeModal, setShowAdjustTimeModal] = useState(false);
  const [toastFeedback, setToastFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentRequest = requests.find(r => r.id === selectedRequestId) || initialReq;

  const threadMessages = currentRequest?.threadMessages || [
    {
      id: `msg-init-${currentRequest?.id || '1'}`,
      sender: 'bfh_dispatch',
      senderName: "Benta's Dispatch (Jason Benta, LFD)",
      senderPhone: '(212) 281-8850',
      body: currentRequest?.smsMessageDraft || "BFH SERVICE REQUEST: Please confirm your booking.",
      timestamp: currentRequest?.requestedAt || 'Today 09:30 AM',
      status: 'delivered'
    }
  ];

  const showToast = (msg: string) => {
    setToastFeedback(msg);
    setTimeout(() => setToastFeedback(null), 4000);
  };

  // Director sends an outbound SMS to the vendor
  const handleSendDirectorOutbound = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRequest) return;
    const bodyToSend = directorOutboundDraft.trim() || currentRequest.smsMessageDraft;
    if (!bodyToSend) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: VendorSmsThreadMessage = {
      id: `msg-${Date.now()}`,
      sender: 'bfh_dispatch',
      senderName: "Benta's Dispatch (Jason Benta, LFD)",
      senderPhone: '(212) 281-8850',
      body: bodyToSend,
      timestamp: `Today ${timeStr}`,
      status: 'delivered'
    };

    const updated: PartnerScheduleRequest = {
      ...currentRequest,
      status: currentRequest.status === 'confirmed' ? 'confirmed' : 'sms_sent',
      threadMessages: [...threadMessages, newMsg],
      remindersCount: currentRequest.remindersCount + 1,
      lastReminderAt: `Today ${timeStr}`
    };

    onUpdateRequest(updated);
    setDirectorOutboundDraft('');
    showToast(`Outbound SMS dispatched to ${currentRequest.partnerName} (${currentRequest.partnerPhone})!`);
  };

  // Vendor simulates sending a reply SMS
  const handleVendorSimulateReply = (
    type: 'accept_confirm' | 'time_adjustment' | 'decline' | 'custom_reply',
    customText?: string
  ) => {
    if (!currentRequest) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let bodyText = '';
    let newStatus = currentRequest.status;
    let adjustedTime: string | undefined = undefined;
    let declineReason: string | undefined = undefined;

    switch (type) {
      case 'accept_confirm':
        bodyText = `YES, CONFIRMED. We have scheduled the service for ${currentRequest.serviceDate} at ${currentRequest.callTime} in ${currentRequest.venueLocation}. Everything will be staged reverently. - ${currentRequest.partnerName}`;
        newStatus = 'confirmed';
        break;
      case 'time_adjustment':
        adjustedTime = adjustedTimeInput;
        bodyText = `CONFIRMED WITH TIME ADJUSTMENT: We can accommodate the service on ${currentRequest.serviceDate}, but arrival will be at ${adjustedTimeInput} due to prior sanctuary service. Please confirm if acceptable. - ${currentRequest.partnerName}`;
        newStatus = 'confirmed';
        setShowAdjustTimeModal(false);
        break;
      case 'decline':
        declineReason = 'Vendor unavailable on requested date/time.';
        bodyText = `UNAVAILABLE / DECLINED: Unfortunately we are fully committed on ${currentRequest.serviceDate} at ${currentRequest.callTime}. We suggest checking with alternate guild partner. Sincere apologies. - ${currentRequest.partnerName}`;
        newStatus = 'declined';
        break;
      case 'custom_reply':
        bodyText = customText || vendorCustomReplyText.trim();
        newStatus = 'confirmed';
        setVendorCustomReplyText('');
        break;
    }

    if (!bodyText.trim()) return;

    const vendorMsg: VendorSmsThreadMessage = {
      id: `msg-vendor-${Date.now()}`,
      sender: 'vendor',
      senderName: currentRequest.partnerName,
      senderPhone: currentRequest.partnerPhone,
      body: bodyText,
      timestamp: `Today ${timeStr}`,
      status: 'read',
      quickActionTriggered: type
    };

    const updated: PartnerScheduleRequest = {
      ...currentRequest,
      status: newStatus,
      confirmedAt: type !== 'decline' ? `Today ${timeStr}` : undefined,
      adjustedArrivalTime: adjustedTime || currentRequest.adjustedArrivalTime,
      declineReason: declineReason || currentRequest.declineReason,
      threadMessages: [...threadMessages, vendorMsg]
    };

    onUpdateRequest(updated);

    // Also fire a system notification simulation
    if (onSendNotification) {
      const notif: SimulatedNotification = {
        id: `notif-vendor-${Date.now()}`,
        caseId: activeCase.id,
        decedentName: activeCase.decedent.legalName,
        recipientName: "Jason Benta, LFD",
        recipientPhone: '(212) 281-8850',
        channel: 'sms',
        type: 'service_schedule',
        title: `Two-Way SMS: ${currentRequest.partnerName} (${currentRequest.roleTitle})`,
        bodyText: `Carrier Reply from ${currentRequest.partnerPhone}: "${bodyText}"`,
        sentAt: `Today ${timeStr}`,
        status: 'delivered',
        actionUrl: '#partners',
        actionButtonText: 'View in Partner Hub'
      };
      onSendNotification(notif);
    }

    showToast(`Incoming carrier reply logged from ${currentRequest.partnerName}! Status: ${newStatus.toUpperCase()}`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hairdresser_barber':
        return Users;
      case 'musician_organist':
        return Music;
      case 'minister_clergy':
        return Church;
      case 'other_vendor':
        return Flower;
      case 'livery_transport':
        return Car;
      default:
        return Users;
    }
  };

  const Icon = currentRequest ? getCategoryIcon(currentRequest.category) : Users;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full border border-neutral-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Universal Top Header */}
        <div className="bg-gradient-to-r from-[#141b2b] via-[#1e2738] to-[#141b2b] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-b-2 border-amber-400/80 shrink-0">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#991b1b] text-white flex items-center justify-center font-bold shadow-sm border border-amber-300">
              <Smartphone className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  TWO-WAY VENDOR SMS DISPATCH & CONFIRMATION HUB
                </span>
                <span className="text-xs text-neutral-300 font-mono">
                  Case #{activeCase.caseNumber}
                </span>
              </div>
              <h3 className="font-serif-title text-base sm:text-lg font-bold text-white tracking-wide">
                Direct Carrier Link: {currentRequest?.partnerName || 'Service Partner'} ({currentRequest?.roleTitle || 'Vendor'})
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Case Request Switcher Dropdown */}
            <div className="flex items-center space-x-1.5 bg-neutral-800/80 p-1 rounded-xl border border-neutral-700">
              <span className="text-[10px] text-neutral-400 font-bold px-2 uppercase hidden sm:inline">Partner:</span>
              <select
                value={selectedRequestId}
                onChange={(e) => setSelectedRequestId(e.target.value)}
                className="bg-neutral-900 text-white text-xs font-bold rounded-lg px-2.5 py-1.5 outline-none border border-neutral-700 focus:border-amber-400"
              >
                {requests.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.partnerName} ({r.roleTitle.split(' ')[0]}) • {r.status.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Toast Notification Banner */}
        {toastFeedback && (
          <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs font-bold flex items-center justify-between shadow-inner animate-fadeIn">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>{toastFeedback}</span>
            </div>
            <button onClick={() => setToastFeedback(null)} className="text-white/80 hover:text-white text-xs">
              ✕
            </button>
          </div>
        )}

        {/* Modal Body: 2-Column Split Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left Column (5 cols): BFH Dispatch Control Panel */}
          <div className="lg:col-span-5 p-5 bg-neutral-50/70 border-r border-neutral-200 flex flex-col justify-between space-y-5 overflow-y-auto">
            
            <div className="space-y-4">
              
              {/* Partner Profile Snapshot Card */}
              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 bg-red-50 text-[#991b1b] rounded-xl border border-red-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif-title font-bold text-sm text-neutral-900">
                        {currentRequest?.partnerName}
                      </h4>
                      <p className="text-[11px] text-[#b45309] font-bold">
                        {currentRequest?.roleTitle}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    currentRequest?.status === 'confirmed'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : currentRequest?.status === 'declined'
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {currentRequest?.status === 'confirmed' ? '✅ Confirmed' : currentRequest?.status === 'declined' ? '❌ Declined' : '⏳ Awaiting Reply'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-neutral-100">
                  <div>
                    <span className="text-neutral-500 text-[10px] block">Carrier Phone</span>
                    <strong className="font-mono text-neutral-900">{currentRequest?.partnerPhone}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 text-[10px] block">Scheduled Call Time</span>
                    <strong className="text-neutral-900">{currentRequest?.serviceDate} at {currentRequest?.callTime}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 text-[10px] block">Venue Staging</span>
                    <strong className="text-neutral-900 truncate block">{currentRequest?.venueLocation}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 text-[10px] block">Honorarium / Fee</span>
                    <strong className="text-[#991b1b] font-mono">{currentRequest?.honorariumFee || '$0.00'}</strong>
                  </div>
                </div>

                {currentRequest?.specialInstructions && (
                  <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 text-[11px] text-neutral-700 italic">
                    "{currentRequest.specialInstructions}"
                  </div>
                )}
              </div>

              {/* Outbound Dispatch Form */}
              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-serif-title font-bold text-xs text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-[#991b1b]" />
                    <span>Send Outbound Dispatch SMS</span>
                  </h5>
                  <span className="text-[10px] text-neutral-400 font-mono">Twilio Live Relay</span>
                </div>

                <form onSubmit={handleSendDirectorOutbound} className="space-y-3">
                  <textarea
                    rows={4}
                    value={directorOutboundDraft}
                    onChange={(e) => setDirectorOutboundDraft(e.target.value)}
                    placeholder={currentRequest?.smsMessageDraft || "Type custom dispatch instructions or updates to partner..."}
                    className="w-full bg-[#fbfbfd] border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-[#991b1b] font-mono leading-relaxed"
                  />

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setDirectorOutboundDraft(currentRequest?.smsMessageDraft || '')}
                      className="text-[11px] text-[#991b1b] hover:underline font-bold"
                    >
                      Reset to Default Template
                    </button>

                    <button
                      type="submit"
                      className="bg-[#991b1b] hover:bg-red-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm border border-amber-300/40"
                    >
                      <Send className="w-3.5 h-3.5 text-amber-300" />
                      <span>Dispatch Outbound SMS</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>

            {/* Compliance Guarantee */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-950 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#991b1b] shrink-0" />
              <span>
                All two-way SMS confirmations are cryptographically stamped and synchronized with the <strong>Golden Record Activity Ledger</strong>.
              </span>
            </div>

          </div>

          {/* Right Column (7 cols): Simulated Vendor Smartphone Device */}
          <div className="lg:col-span-7 p-5 sm:p-6 bg-[#f4f5f8] flex flex-col justify-between space-y-4 overflow-y-auto">
            
            <div className="space-y-3">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-neutral-800">
                    Live Vendor Device Simulator • {currentRequest?.partnerName}’s Phone
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">
                  Verizon Wireless (NYC 5G)
                </span>
              </div>

              {/* iPhone Mockup Frame */}
              <div className="bg-[#1f242d] rounded-3xl p-3 sm:p-4 shadow-xl border-4 border-neutral-800 max-w-md mx-auto w-full text-white">
                
                {/* Phone Status Bar */}
                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 px-2 pb-2 border-b border-neutral-700/60">
                  <span>9:41 AM</span>
                  <div className="w-16 h-3 bg-black rounded-full mx-auto" />
                  <span className="flex items-center gap-1">5G 📶 100% 🔋</span>
                </div>

                {/* Conversation Header */}
                <div className="p-3 text-center border-b border-neutral-800 space-y-0.5">
                  <div className="w-10 h-10 rounded-full bg-[#991b1b] text-white flex items-center justify-center font-bold text-xs mx-auto border border-amber-300">
                    BFH
                  </div>
                  <div className="font-bold text-xs text-white">Benta's Funeral Home</div>
                  <div className="text-[10px] text-neutral-400 font-mono">(212) 281-8850 • Harlem, NY</div>
                </div>

                {/* Message Thread Scroll Area */}
                <div className="p-3 sm:p-4 space-y-3 max-h-[300px] overflow-y-auto font-sans text-xs">
                  {threadMessages.map((msg) => {
                    const isBfh = msg.sender === 'bfh_dispatch';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isBfh ? 'items-start' : 'items-end'}`}
                      >
                        <span className="text-[9px] text-neutral-400 font-mono mb-0.5 px-1">
                          {isBfh ? "Benta's Dispatch" : currentRequest?.partnerName} • {msg.timestamp}
                        </span>

                        <div
                          className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed shadow-sm ${
                            isBfh
                              ? 'bg-neutral-800 text-neutral-100 rounded-tl-xs border border-neutral-700'
                              : 'bg-[#007aff] text-white rounded-tr-xs font-medium'
                          }`}
                        >
                          {msg.body}
                        </div>

                        <div className="flex items-center gap-1 text-[9px] text-neutral-500 mt-0.5 px-1">
                          <CheckCheck className="w-3 h-3 text-emerald-400" />
                          <span>Delivered</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Simulated Phone Input Bar */}
                <div className="p-2.5 bg-neutral-900 rounded-2xl border border-neutral-700 flex items-center space-x-2 text-xs">
                  <input
                    type="text"
                    value={vendorCustomReplyText}
                    onChange={(e) => setVendorCustomReplyText(e.target.value)}
                    placeholder="Type custom reply as vendor..."
                    className="flex-1 bg-transparent text-white text-xs outline-none placeholder:text-neutral-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleVendorSimulateReply('custom_reply');
                      }
                    }}
                  />
                  <button
                    onClick={() => handleVendorSimulateReply('custom_reply')}
                    disabled={!vendorCustomReplyText.trim()}
                    className="p-1.5 bg-[#007aff] hover:bg-blue-600 disabled:opacity-40 text-white rounded-full transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

            {/* Vendor Interactive One-Click Response Bar */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Simulate Vendor Interactive Carrier Actions:</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">1-Tap Live Simulation</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                
                {/* 1. Accept & Confirm */}
                <button
                  onClick={() => handleVendorSimulateReply('accept_confirm')}
                  className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex flex-col items-center justify-center text-center gap-1"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-200" />
                  <span>Accept Order & Confirm</span>
                  <span className="text-[10px] text-emerald-200 font-normal">Sends "YES, CONFIRMED"</span>
                </button>

                {/* 2. Adjust Time */}
                <button
                  onClick={() => setShowAdjustTimeModal(true)}
                  className="p-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition shadow-sm flex flex-col items-center justify-center text-center gap-1"
                >
                  <Clock className="w-4 h-4 text-amber-100" />
                  <span>Adjust Arrival Time</span>
                  <span className="text-[10px] text-amber-100 font-normal">Change call time slot</span>
                </button>

                {/* 3. Decline / Unavailable */}
                <button
                  onClick={() => handleVendorSimulateReply('decline')}
                  className="p-3 bg-neutral-800 hover:bg-red-800 text-white rounded-xl text-xs font-bold transition shadow-sm flex flex-col items-center justify-center text-center gap-1"
                >
                  <AlertCircle className="w-4 h-4 text-red-300" />
                  <span>Decline / Unavailable</span>
                  <span className="text-[10px] text-neutral-300 font-normal">Suggest alternate guild</span>
                </button>

              </div>

              {/* Adjust Time Sub-form Modal */}
              {showAdjustTimeModal && (
                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-300 space-y-2 text-xs">
                  <label className="block font-bold text-amber-950">
                    Propose Adjusted Vendor Arrival Time:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={adjustedTimeInput}
                      onChange={(e) => setAdjustedTimeInput(e.target.value)}
                      className="bg-white border border-amber-300 rounded-lg p-2 font-mono font-bold text-xs text-neutral-900 outline-none flex-1"
                    />
                    <button
                      onClick={() => handleVendorSimulateReply('time_adjustment')}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition"
                    >
                      Confirm Time Adjustment
                    </button>
                    <button
                      onClick={() => setShowAdjustTimeModal(false)}
                      className="text-neutral-500 hover:text-neutral-800 px-2 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
