import React, { useState, useEffect } from 'react';
import { 
  GoldenRecordCase, 
  WebcastShareInvite,
  SimulatedNotification
} from '../../lib/types/funeral';
import { 
  Calendar, 
  Clock, 
  Share2, 
  Send, 
  Mail, 
  Smartphone, 
  Copy, 
  Check, 
  QrCode, 
  Printer, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Users, 
  Key, 
  Sparkles, 
  Eye, 
  Car, 
  Church, 
  Heart,
  X
} from 'lucide-react';

interface FamilyWebcastServiceViewProps {
  activeCase: GoldenRecordCase;
  onUpdateCase?: (updatedCase: GoldenRecordCase) => void;
  onSendNotification?: (notif: SimulatedNotification) => void;
  onOpenScheduleModal?: () => void;
}

export const FamilyWebcastServiceView: React.FC<FamilyWebcastServiceViewProps> = ({
  activeCase,
  onUpdateCase,
  onSendNotification,
  onOpenScheduleModal
}) => {
  const webcast = activeCase.webcastSchedule || {
    isEnabled: true,
    venueId: 'chapel_1',
    venueName: 'Chapel 1 (Main Sanctuary)',
    streamStatus: 'scheduled',
    broadcastDate: activeCase.serviceSelections.serviceDate || '2026-09-22',
    broadcastStartTime: '10:30 AM',
    broadcastEndTime: '01:00 PM',
    assignedDirector: 'Jason Benta, LFD',
    assignedAvTech: 'Marcus Vance (Harlem Media AV)',
    avTechPhone: '(212) 555-4920',
    streamUrl: `https://broadcast.e-bfh.com/live/${activeCase.caseNumber}`,
    isPinProtected: true,
    securityPin: '1928',
    cameraPresets: ['Pulpit Sanctuary Wide', 'Casket & Floral Alcove', 'Choir & Pipe Organ', 'Family Pew Front View'],
    audioBoardVerified: true,
    recordingArchived: false,
    estimatedViewers: 120,
    notes: 'Sanctuary 4K PTZ Camera array active. Direct soundboard feed.'
  };

  // Video Player Preview State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentCameraAngle, setCurrentCameraAngle] = useState(0);
  const [liveViewerCount, setLiveViewerCount] = useState(webcast.estimatedViewers || 94);

  // Countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 22, seconds: 45 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Webcast Share Invites State
  const [shares, setShares] = useState<WebcastShareInvite[]>(
    activeCase.webcastShares || [
      {
        id: 'ws-1',
        caseId: activeCase.id,
        recipientName: 'Aunt Evelyn Vance',
        recipientContact: '(312) 555-8120',
        channel: 'sms',
        sentAt: 'Sep 18, 2026 2:15 PM',
        status: 'opened',
        viewerLocation: 'Chicago, IL'
      },
      {
        id: 'ws-2',
        caseId: activeCase.id,
        recipientName: 'Dr. Gregory Vance',
        recipientContact: 'gregory.vance@oxford-med.ac.uk',
        channel: 'email',
        sentAt: 'Sep 18, 2026 3:30 PM',
        status: 'watching',
        viewerLocation: 'London, United Kingdom'
      },
      {
        id: 'ws-3',
        caseId: activeCase.id,
        recipientName: 'Abyssinian Senior Deacon Circle',
        recipientContact: '(917) 555-0914',
        channel: 'whatsapp',
        sentAt: 'Sep 18, 2026 4:10 PM',
        status: 'delivered',
        viewerLocation: 'Harlem, NYC'
      }
    ]
  );

  // Share Dispatch Form State
  const [shareChannel, setShareChannel] = useState<'sms' | 'email'>('sms');
  const [recipientName, setRecipientName] = useState('');
  const [recipientContact, setRecipientContact] = useState('');
  const [customMessage, setCustomMessage] = useState(
    `You are warmly invited to celebrate the life of ${activeCase.decedent.legalName}. Join us in person or watch the live 4K sanctuary webcast: ${webcast.streamUrl} (Passcode: ${webcast.securityPin || 'None'}).`
  );
  
  // UI Modals & Toast
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`Copied ${label} to clipboard!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !recipientContact.trim()) return;

    const newInvite: WebcastShareInvite = {
      id: `ws-${Date.now()}`,
      caseId: activeCase.id,
      recipientName: recipientName.trim(),
      recipientContact: recipientContact.trim(),
      channel: shareChannel,
      sentAt: 'Just now',
      status: 'sent',
      viewerLocation: 'Remote Guest'
    };

    const updatedShares = [newInvite, ...shares];
    setShares(updatedShares);

    if (onUpdateCase) {
      onUpdateCase({
        ...activeCase,
        webcastShares: updatedShares
      });
    }

    if (onSendNotification) {
      onSendNotification({
        id: `notif-webcast-${Date.now()}`,
        caseId: activeCase.id,
        decedentName: activeCase.decedent.legalName,
        recipientName: recipientName.trim(),
        recipientPhone: shareChannel === 'sms' ? recipientContact.trim() : activeCase.informant.phone,
        recipientEmail: shareChannel === 'email' ? recipientContact.trim() : undefined,
        channel: shareChannel === 'sms' ? 'sms' : 'email',
        type: 'webcast_invite',
        title: `Live Service Webcast Invitation: ${activeCase.decedent.legalName}`,
        bodyText: `${customMessage}\n\nLive Broadcast Venue: ${webcast.venueName}\nDate: ${webcast.broadcastDate} at ${webcast.broadcastStartTime}\nLink: ${webcast.streamUrl}`,
        status: 'delivered',
        sentAt: 'Just now'
      });
    }

    setToastMessage(`Webcast invitation dispatched to ${recipientName.trim()} via ${shareChannel.toUpperCase()}!`);
    setTimeout(() => setToastMessage(null), 4000);

    setRecipientName('');
    setRecipientContact('');
  };

  const handleSimulateStatus = (id: string, nextStatus: WebcastShareInvite['status']) => {
    const updated = shares.map(s => s.id === id ? { ...s, status: nextStatus } : s);
    setShares(updated);
    if (nextStatus === 'watching') setLiveViewerCount(prev => prev + 1);
  };

  const servicePacketText = `=====================================================
BENTA'S FUNERAL HOME, INC. • HARLEM, NEW YORK
CELEBRATION OF LIFE & LIVE WEBCAST SERVICE ITINERARY
=====================================================

IN LOVING MEMORY OF:
${activeCase.decedent.legalName} (${activeCase.decedent.dateOfBirth} — ${activeCase.decedent.dateOfDeath})

1. VIEWING & VISITATION
• Date & Time: ${activeCase.serviceSelections.serviceDate || 'Monday, September 21, 2026'} (4:00 PM - 8:00 PM)
• Location: Benta's Funeral Home, ${activeCase.serviceSelections.viewingParlor}
• Address: 630 Saint Nicholas Avenue, New York, NY 10030

2. FUNERAL & SANCTUARY SERVICE
• Date & Time: ${webcast.broadcastDate} (${webcast.broadcastStartTime})
• Location: ${webcast.venueName} (630 St. Nicholas Ave)
• Officiant: ${activeCase.serviceSelections.officiantName || 'Rev. Dr. Calvin Butts IV'}
• Organist & Music: ${activeCase.serviceSelections.organistName || 'Marcus Roberts Ensemble'}

3. LIVE HD WEBCAST & STREAMING BROADCAST
• Live Webcast Link: ${webcast.streamUrl}
• Stream Passcode: ${webcast.securityPin || 'Open / No PIN required'}
• Broadcast Venue: Multi-Camera 4K Feed from ${webcast.venueName}

4. INTERMENT & COMMITTAL CORTEGE
• Destination: ${activeCase.serviceSelections.crematoryOrCemeteryName}
• Limousine Escort: Benta Lead Car & Cortege departing 630 St. Nicholas Ave

5. REPAST & FELLOWSHIP
• Location: The Repast Room (630 St. Nicholas Ave) or Family Reception Hall

Direct Benta Director Hotline: (212) 281-8850
=====================================================`;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141b2b] text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400 flex items-center space-x-3 text-xs font-bold animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HERO HEADER BANNER */}
      <div className="bg-gradient-to-br from-[#141b2b] via-[#1f293d] to-[#2c1d11] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border border-amber-500/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 bg-red-600/30 border border-red-500/60 text-red-200 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>4K HD Sanctuary Webcasting</span>
            </span>
            <span className="bg-amber-400/20 text-amber-200 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-400/40">
              {webcast.venueName}
            </span>
          </div>

          <h2 className="font-serif-title text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide">
            Live Webcast & Complete Service Information
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            Family and friends worldwide can join the celebration of life for <strong>{activeCase.decedent.legalName}</strong> in high-definition video with direct soundboard audio. Share the official live broadcast link, service schedule, and printable bulletin below.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleCopyText(webcast.streamUrl, 'Webcast URL')}
              className="bg-[#991b1b] hover:bg-red-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-2 shadow-md shadow-red-950/30"
            >
              <Copy className="w-4 h-4 text-amber-300" />
              <span>Copy Webcast Link ({webcast.streamUrl.replace('https://', '')})</span>
            </button>

            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-2 border border-neutral-600"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print Keepsake Service Bulletin (with QR)</span>
            </button>

            {onOpenScheduleModal && (
              <button
                onClick={onOpenScheduleModal}
                className="bg-amber-600/30 hover:bg-amber-600/40 text-amber-200 font-bold text-xs px-3.5 py-2.5 rounded-xl transition border border-amber-500/50 flex items-center space-x-1.5"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Director Scheduling Controls</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN GRID: LIVE PLAYER & DISPATCH SUITE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: LIVE BROADCAST PLAYER (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* HD Broadcast Player Card */}
          <div className="bg-[#0f1522] rounded-3xl overflow-hidden border-2 border-neutral-800 shadow-2xl space-y-0">
            
            {/* Player Top Bar */}
            <div className="bg-[#141b2b] px-4 py-3 border-b border-neutral-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                  {webcast.streamStatus === 'live' ? '🔴 LIVE STREAMING NOW' : 'SANCTUARY BROADCAST FEED'}
                </span>
                <span className="text-neutral-500">•</span>
                <span className="text-amber-400 font-bold">{webcast.venueName}</span>
              </div>

              <div className="flex items-center space-x-3 text-neutral-400 text-[11px]">
                <span className="flex items-center space-x-1 text-emerald-400 font-mono font-bold">
                  <Users className="w-3.5 h-3.5" />
                  <span>{liveViewerCount} tuned in</span>
                </span>
                {webcast.isPinProtected && (
                  <span className="flex items-center space-x-1 text-amber-300 bg-amber-900/30 px-2 py-0.5 rounded-md border border-amber-700/40 font-mono text-[10px]">
                    <Key className="w-3 h-3" />
                    <span>PIN: {webcast.securityPin}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Video Stage / Canvas */}
            <div className="relative aspect-video bg-gradient-to-b from-neutral-900 to-black flex items-center justify-center group overflow-hidden">
              
              {/* Background Sanctuary Ambience Simulation */}
              <div 
                className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${isPlaying ? 'opacity-80 scale-105' : 'opacity-40 filter blur-xs'}`}
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80')`
                }}
              />

              {/* Dignified Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1522] via-transparent to-black/60 pointer-events-none" />

              {/* Watermark Crest */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="text-[10px] font-bold tracking-widest text-amber-400/90 uppercase font-serif-title bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm border border-amber-500/20">
                  BENTA'S HARLEM SANCTUARY 4K
                </span>
              </div>

              {/* Center Play Overlay / Countdown */}
              {!isPlaying ? (
                <div className="relative z-20 text-center space-y-4 p-6 max-w-md">
                  <div className="bg-black/80 backdrop-blur-md border border-amber-500/40 p-5 rounded-3xl shadow-2xl space-y-3">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                      Broadcast Service Countdown
                    </span>
                    
                    {/* Countdown Clock */}
                    <div className="grid grid-cols-3 gap-2 text-center font-mono">
                      <div className="bg-neutral-900/90 p-2 rounded-xl border border-neutral-700">
                        <span className="text-2xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="text-[9px] text-neutral-400 block uppercase">Hours</span>
                      </div>
                      <div className="bg-neutral-900/90 p-2 rounded-xl border border-neutral-700">
                        <span className="text-2xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="text-[9px] text-neutral-400 block uppercase">Mins</span>
                      </div>
                      <div className="bg-neutral-900/90 p-2 rounded-xl border border-neutral-700">
                        <span className="text-2xl font-bold text-amber-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="text-[9px] text-neutral-400 block uppercase">Secs</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-neutral-300">
                      Scheduled for <strong>{webcast.broadcastDate}</strong> at <strong>{webcast.broadcastStartTime}</strong>
                    </div>

                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-full bg-[#991b1b] hover:bg-red-800 text-white font-bold text-xs py-3 rounded-2xl transition flex items-center justify-center space-x-2 shadow-lg shadow-red-950/40"
                    >
                      <Play className="w-4 h-4 fill-current text-amber-300" />
                      <span>Start Webcast Preview Stream</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Live Streaming Feed active */
                <div className="absolute inset-0 flex flex-col justify-between p-4 z-20">
                  <div className="flex justify-end">
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-md">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                      <span>LIVE PREVIEW</span>
                    </span>
                  </div>

                  {/* Sanctuary Caption Overlay */}
                  <div className="bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white max-w-sm">
                    <div className="text-[11px] font-serif-title font-bold text-amber-300">
                      Celebrating the Life of {activeCase.decedent.legalName}
                    </div>
                    <div className="text-[10px] text-neutral-300">
                      Current View: {webcast.cameraPresets[currentCameraAngle] || 'Sanctuary Main Pulpit'}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Player Controls Bar */}
            <div className="bg-[#141b2b] px-4 py-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl transition"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl transition"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>

                <div className="hidden sm:flex items-center space-x-1.5">
                  <span className="text-[10px] text-neutral-400">Angle:</span>
                  {webcast.cameraPresets.map((preset, idx) => (
                    <button
                      key={preset}
                      onClick={() => {
                        setCurrentCameraAngle(idx);
                        setIsPlaying(true);
                      }}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                        currentCameraAngle === idx 
                          ? 'bg-[#991b1b] text-white shadow-xs' 
                          : 'bg-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      Cam {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopyText(webcast.streamUrl, 'Webcast URL')}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold rounded-xl text-xs transition flex items-center space-x-1.5"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Share</span>
                </button>

                <button
                  onClick={() => {
                    const elem = document.querySelector('.aspect-video');
                    if (elem && elem.requestFullscreen) elem.requestFullscreen();
                  }}
                  className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl transition"
                  title="Full Screen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Webcast Hardware & Sanctuary Audio Specs */}
          <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm space-y-3">
            <h4 className="font-serif-title font-bold text-neutral-900 text-sm flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Sanctuary Broadcast Engineering Specifications</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1">
                <span className="text-[10px] text-neutral-500 font-bold uppercase">Production Venue</span>
                <div className="font-bold text-neutral-900">{webcast.venueName}</div>
                <div className="text-[11px] text-emerald-700 font-semibold">4K PTZ Multi-Cam Array</div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1">
                <span className="text-[10px] text-neutral-500 font-bold uppercase">Direct Audio Feed</span>
                <div className="font-bold text-neutral-900">Yamaha 32-Ch Soundboard</div>
                <div className="text-[11px] text-neutral-600">Pulpit, Choir & Pipe Organ</div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1">
                <span className="text-[10px] text-neutral-500 font-bold uppercase">Assigned Director & AV</span>
                <div className="font-bold text-neutral-900">{webcast.assignedDirector}</div>
                <div className="text-[11px] text-[#991b1b]">{webcast.assignedAvTech}</div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: SEND INVITATIONS & COMPLETE SERVICE ITINERARY (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* 1. DISPATCH INVITATION FORM (SMS / EMAIL) */}
          <div className="bg-white p-6 rounded-3xl border-2 border-amber-400/80 shadow-lg space-y-5 relative">
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-[#991b1b] text-amber-300 text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-md">
              Fast Family Dispatch
            </div>

            <div className="space-y-1">
              <h3 className="font-serif-title text-lg font-bold text-neutral-900 flex items-center space-x-2">
                <Send className="w-4 h-4 text-[#991b1b]" />
                <span>Send Webcast Link & Service Details</span>
              </h3>
              <p className="text-xs text-neutral-600">
                Send an instant text message or letterhead email to loved ones worldwide with the live stream link.
              </p>
            </div>

            {/* Channel Toggle (SMS vs Email) */}
            <div className="grid grid-cols-2 gap-2 bg-neutral-100 p-1.5 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setShareChannel('sms')}
                className={`py-2 rounded-xl transition flex items-center justify-center space-x-2 ${
                  shareChannel === 'sms' 
                    ? 'bg-[#991b1b] text-white shadow-sm' 
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>SMS Text Message</span>
              </button>

              <button
                type="button"
                onClick={() => setShareChannel('email')}
                className={`py-2 rounded-xl transition flex items-center justify-center space-x-2 ${
                  shareChannel === 'email' 
                    ? 'bg-[#991b1b] text-white shadow-sm' 
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Letterhead</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSendInvite} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-700">Recipient Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Uncle Raymond, Church Deacon Board, Class of '68"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs text-neutral-900 font-semibold outline-none focus:border-[#991b1b]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-700">
                  {shareChannel === 'sms' ? 'Mobile Phone Number (for SMS)' : 'Email Address'}
                </label>
                <input
                  type={shareChannel === 'sms' ? 'tel' : 'email'}
                  required
                  placeholder={shareChannel === 'sms' ? '(212) 555-0199' : 'family.member@gmail.com'}
                  value={recipientContact}
                  onChange={(e) => setRecipientContact(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs text-neutral-900 font-semibold outline-none focus:border-[#991b1b]"
                />
              </div>

              {/* Message Draft Preview Box */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-neutral-700">Invitation Note</label>
                  <span className="text-[11px] text-neutral-400">Includes Link & PIN Automatically</span>
                </div>
                <textarea
                  rows={3}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-xl text-xs text-neutral-800 outline-none focus:border-[#991b1b]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#991b1b] hover:bg-red-800 text-white font-bold text-xs py-3 rounded-xl transition flex items-center justify-center space-x-2 shadow-md shadow-red-950/20"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>Send Webcast Invitation via {shareChannel === 'sms' ? 'SMS' : 'Email'}</span>
              </button>
            </form>

            {/* 1-Click Instant Share Buttons */}
            <div className="pt-3 border-t border-neutral-200 space-y-2">
              <span className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                1-Click Instant Sharing
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold text-center">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `Celebration of Life for ${activeCase.decedent.legalName}\nService: ${webcast.broadcastDate} at ${webcast.broadcastStartTime}\nVenue: ${webcast.venueName}\nLive HD Webcast: ${webcast.streamUrl} (PIN: ${webcast.securityPin || 'None'})`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition flex items-center justify-center space-x-1"
                >
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`sms:?&body=${encodeURIComponent(
                    `Celebration of Life for ${activeCase.decedent.legalName}: Join us in person or watch live: ${webcast.streamUrl} (PIN: ${webcast.securityPin || 'None'})`
                  )}`}
                  className="bg-sky-600 hover:bg-sky-700 text-white p-2.5 rounded-xl transition flex items-center justify-center space-x-1"
                >
                  <span>iMessage</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleCopyText(servicePacketText, 'Full Service Itinerary')}
                  className="bg-neutral-800 hover:bg-neutral-900 text-white p-2.5 rounded-xl transition flex items-center justify-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Copy Packet</span>
                </button>
              </div>
            </div>

          </div>

          {/* 2. LIVE GUEST ATTENDANCE & WATCH ROSTER */}
          <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-serif-title font-bold text-neutral-900 text-sm flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#991b1b]" />
                <span>Family & Friend Webcast Roster ({shares.length})</span>
              </h4>
              <span className="text-[11px] text-neutral-400">Live Status Tracking</span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {shares.map((share) => (
                <div
                  key={share.id}
                  className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs hover:bg-neutral-100 transition"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-neutral-900 flex items-center space-x-1.5">
                      <span>{share.recipientName}</span>
                      <span className="text-[10px] text-neutral-400 font-normal">({share.channel.toUpperCase()})</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 flex items-center space-x-2">
                      <span>{share.recipientContact}</span>
                      {share.viewerLocation && (
                        <span className="text-[10px] bg-neutral-200 px-1.5 py-0.2 rounded-md text-neutral-700">
                          📍 {share.viewerLocation}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 ${
                      share.status === 'watching' 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse' 
                        : share.status === 'opened' 
                        ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {share.status === 'watching' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                      <span>{share.status === 'watching' ? 'Watching Live' : share.status === 'opened' ? 'Link Opened' : 'Invite Sent'}</span>
                    </span>

                    {share.status !== 'watching' && (
                      <button
                        onClick={() => handleSimulateStatus(share.id, 'watching')}
                        className="text-[10px] text-[#991b1b] font-bold hover:underline"
                        title="Simulate Guest Tuning In"
                      >
                        Tune In
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 3. COMPLETE SERVICE & ITINERARY BREAKDOWN (4-Card Grid) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-serif-title text-xl font-bold text-neutral-900 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-[#991b1b]" />
            <span>Complete Service Schedule & Committal Itinerary</span>
          </h3>
          <button
            onClick={() => handleCopyText(servicePacketText, 'Service Schedule')}
            className="text-xs text-[#991b1b] font-bold hover:underline flex items-center space-x-1"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Complete Itinerary</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Viewing & Visitation */}
          <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm space-y-3 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-[#991b1b]" />
            <div className="flex items-center space-x-2 text-[#991b1b]">
              <Eye className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">1. Viewing & Visitation</span>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-neutral-900">{activeCase.serviceSelections.viewingParlor}</div>
              <div className="text-xs text-neutral-600">630 Saint Nicholas Avenue, Harlem</div>
              <div className="text-xs font-semibold text-[#991b1b] mt-2">
                {activeCase.serviceSelections.serviceDate || 'Monday, Sep 21'} • 4:00 PM - 8:00 PM
              </div>
            </div>
            <p className="text-[11px] text-neutral-500 border-t border-neutral-100 pt-2">
              Private family vigil first hour, followed by community visitation & floral tributes.
            </p>
          </div>

          {/* Card 2: Funeral Sanctuary Service */}
          <div className="bg-white p-5 rounded-3xl border-2 border-amber-400 shadow-md space-y-3 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#991b1b] via-[#d4af37] to-[#991b1b]" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[#991b1b]">
                <Church className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">2. Sanctuary Funeral</span>
              </div>
              <span className="text-[9px] bg-red-100 text-[#991b1b] font-bold px-2 py-0.5 rounded-full">
                Live Webcast
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-neutral-900">{webcast.venueName}</div>
              <div className="text-xs text-neutral-600">Officiant: {activeCase.serviceSelections.officiantName || 'Rev. Dr. Calvin Butts IV'}</div>
              <div className="text-xs font-bold text-[#991b1b] mt-2">
                {webcast.broadcastDate} • {webcast.broadcastStartTime}
              </div>
            </div>
            <p className="text-[11px] text-neutral-500 border-t border-neutral-100 pt-2">
              Music: {activeCase.serviceSelections.organistName || 'Sanctuary Organ & Choral Ensemble'}.
            </p>
          </div>

          {/* Card 3: Committal & Cortege */}
          <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm space-y-3 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-neutral-700" />
            <div className="flex items-center space-x-2 text-neutral-800">
              <Car className="w-4 h-4 text-[#991b1b]" />
              <span className="text-xs font-bold uppercase tracking-wider">3. Committal Procession</span>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-neutral-900">{activeCase.serviceSelections.crematoryOrCemeteryName}</div>
              <div className="text-xs text-neutral-600">Lead Hearse & 2x Family Limousines</div>
              <div className="text-xs font-semibold text-neutral-900 mt-2">
                Cortege Departure: 1:15 PM
              </div>
            </div>
            <p className="text-[11px] text-neutral-500 border-t border-neutral-100 pt-2">
              Navy Military Honors flag folding ceremony & final committal blessing.
            </p>
          </div>

          {/* Card 4: Repast & Fellowship */}
          <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm space-y-3 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-emerald-600" />
            <div className="flex items-center space-x-2 text-emerald-800">
              <Heart className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-wider">4. Repast & Fellowship</span>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-neutral-900">The Repast Room</div>
              <div className="text-xs text-neutral-600">630 St. Nicholas Ave (2nd Fl Hospitality)</div>
              <div className="text-xs font-semibold text-emerald-800 mt-2">
                3:00 PM - 6:00 PM
              </div>
            </div>
            <p className="text-[11px] text-neutral-500 border-t border-neutral-100 pt-2">
              Full buffet reception, memories sharing, and family fellowship.
            </p>
          </div>

        </div>
      </div>

      {/* 4. MODAL: PRINTABLE SERVICE BULLETIN & WEBCAST KEEPSAKE (1-Page Order of Service + QR) */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border-2 border-amber-400 max-h-[92vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
              <div className="flex items-center space-x-2">
                <Printer className="w-5 h-5 text-[#991b1b]" />
                <h3 className="font-serif-title text-xl font-bold text-neutral-900">
                  Printable Service Bulletin & Webcast Flyer
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="bg-[#991b1b] hover:bg-red-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center space-x-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-300" />
                  <span>Print Bulletin</span>
                </button>
                <button
                  onClick={() => setIsPrintModalOpen(false)}
                  className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* High-Fidelity Printable Service Bulletin Card */}
            <div className="bg-white border-2 border-neutral-900 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#991b1b] via-[#d4af37] to-[#991b1b]" />
              
              <div className="space-y-1">
                <span className="text-[9px] font-bold tracking-widest text-[#991b1b] uppercase">
                  BENTA'S FUNERAL HOME, INC. • HARLEM, NYC
                </span>
                <h2 className="font-serif-title text-2xl font-bold text-neutral-900">
                  Celebration of Life & Homegoing Service
                </h2>
                <div className="font-serif-title text-xl font-bold text-[#991b1b]">
                  {activeCase.decedent.legalName}
                </div>
                <div className="text-xs text-neutral-500 italic">
                  {activeCase.decedent.dateOfBirth} — {activeCase.decedent.dateOfDeath}
                </div>
              </div>

              {/* Service Schedule Summary */}
              <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl text-xs space-y-2 text-left">
                <div className="font-bold text-neutral-900 border-b border-neutral-200 pb-1">Order of Service Schedule</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div><strong>Sanctuary Service:</strong> {webcast.broadcastDate} ({webcast.broadcastStartTime})</div>
                  <div><strong>Venue:</strong> {webcast.venueName}</div>
                  <div><strong>Officiant:</strong> {activeCase.serviceSelections.officiantName || 'Rev. Dr. Calvin Butts IV'}</div>
                  <div><strong>Committal:</strong> {activeCase.serviceSelections.crematoryOrCemeteryName}</div>
                </div>
              </div>

              {/* Webcast QR Section */}
              <div className="bg-amber-50 border border-amber-300 p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 max-w-xs mx-auto">
                <div className="w-32 h-32 bg-white border border-neutral-300 rounded-xl p-2 flex items-center justify-center shadow-sm">
                  <QrCode className="w-full h-full text-neutral-900" />
                </div>
                <div className="text-[11px] font-bold text-neutral-900">
                  Scan to Watch Live 4K Webcast
                </div>
                <div className="text-[9px] font-mono text-neutral-600">
                  {webcast.streamUrl}
                </div>
                {webcast.isPinProtected && (
                  <div className="text-[10px] font-mono bg-amber-200/80 px-2 py-0.5 rounded font-bold text-[#991b1b]">
                    Passcode: {webcast.securityPin}
                  </div>
                )}
              </div>

              <div className="text-[10px] text-neutral-400">
                630 Saint Nicholas Ave, New York, NY 10030 • (212) 281-8850 • info@bentasfuneralhome.com
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
