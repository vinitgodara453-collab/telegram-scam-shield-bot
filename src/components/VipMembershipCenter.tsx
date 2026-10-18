import React, { useState } from 'react';
import {
  Crown,
  QrCode,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Smartphone,
  CreditCard,
  UserCheck,
  Clock,
  AlertCircle,
  Download,
  Users,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Search
} from 'lucide-react';
import { VipPlan, VipSubscriber } from '../types';

interface VipMembershipCenterProps {
  isHindi: boolean;
}

export const VipMembershipCenter: React.FC<VipMembershipCenterProps> = ({ isHindi }) => {
  const UPI_ID = 'vinit-godara@fam';
  const UPI_NAME = 'Vinit Godara';

  const [selectedPlanId, setSelectedPlanId] = useState<'1m' | '2m' | 'lifetime'>('1m');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [userTelegramId, setUserTelegramId] = useState('');
  const [submissionUtr, setSubmissionUtr] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  // VIP Plans Definition
  const plans: VipPlan[] = [
    {
      id: '1m',
      name: '1 Month VIP',
      nameHi: '1 महीना VIP प्लान',
      price: 30,
      durationDays: 30,
      badge: 'STARTER',
      isPopular: false,
      perks: [
        'असीमित रियल डिटेल्स सर्च (/details)',
        'फुल बैंक IFSC, शाखा व RBI डेटा',
        'लाइव सर्वर IP लोकेशन व ISP ऑडिट',
        'मोबाइल नंबर सर्किल व ऑपरेटर जांच',
        '👑 VIP प्रोफाइल बैज एक्टिव'
      ]
    },
    {
      id: '2m',
      name: '2 Months VIP',
      nameHi: '2 महीने VIP प्लान',
      price: 50,
      durationDays: 60,
      badge: 'POPULAR (बचत ₹10)',
      isPopular: true,
      perks: [
        '60 दिनों के लिए नॉन-स्टॉप VIP सुरक्षा',
        'असीमित रियल डेटा फॉरेंसिक्स',
        'प्रायोरिटी टर्बो सर्वर स्पीड (Zero Wait)',
        '👑 VIP क्राउन बैज + प्रीमियम फॉन्ट्स',
        'नकली पेमेंट प्रूफ डीप स्कैनर'
      ]
    },
    {
      id: 'lifetime',
      name: 'Lifetime VIP',
      nameHi: 'लाइफटाइम VIP (हमेशा के लिए)',
      price: 100,
      durationDays: 36500,
      badge: 'BEST VALUE 👑',
      isPopular: false,
      perks: [
        'लाइफटाइम फुल एक्सेस (Never Expire)',
        'असीमित फॉरेंसिक सर्च (सभी कैटेगरी)',
        '👑 परमानेंट VIP ओनर बैज',
        'भविष्य में आने वाले सभी अपडेट्स फ्री',
        'डायरेक्ट एडमिन प्रायोरिटी सपोर्ट'
      ]
    }
  ];

  const currentPlan = plans.find(p => p.id === selectedPlanId) || plans[0];

  // Dynamic UPI Intent Link
  const upiIntentUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${currentPlan.price}&cu=INR&tn=${encodeURIComponent(`VIP_${currentPlan.id.toUpperCase()}_${userTelegramId || 'USER'}`)}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=12&data=${encodeURIComponent(upiIntentUrl)}`;

  // Simulated Subscribers Database
  const [subscribers, setSubscribers] = useState<VipSubscriber[]>([
    {
      userId: '681920412',
      username: 'rahul_trader_in',
      planId: 'lifetime',
      amount: 100,
      utr: '419208374921',
      status: 'active',
      activatedAt: '2026-10-15',
      expiresAt: 'Lifetime (Never Expire)'
    },
    {
      userId: '592819401',
      username: 'cyber_shield_pro',
      planId: '2m',
      amount: 50,
      utr: '419102948271',
      status: 'active',
      activatedAt: '2026-10-12',
      expiresAt: '2026-12-11 (55 दिन शेष)'
    },
    {
      userId: '749102847',
      username: 'vikram_bikaneri',
      planId: '1m',
      amount: 30,
      utr: '418902849102',
      status: 'active',
      activatedAt: '2026-10-16',
      expiresAt: '2026-11-15 (29 दिन शेष)'
    }
  ]);

  const copyToClipboard = (text: string, isUpi: boolean) => {
    navigator.clipboard.writeText(text);
    if (isUpi) {
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionUtr || submissionUtr.length < 8) {
      alert(isHindi ? 'कृपया कम से कम 8 से 12 अंकों का वैध UTR नंबर दर्ज करें।' : 'Please enter a valid 8-12 digit UTR number.');
      return;
    }

    const newSub: VipSubscriber = {
      userId: userTelegramId || `${Math.floor(100000000 + Math.random() * 900000000)}`,
      username: userTelegramId ? `@user_${userTelegramId}` : 'you_new_vip',
      planId: currentPlan.id,
      amount: currentPlan.price,
      utr: submissionUtr,
      status: 'active',
      activatedAt: new Date().toISOString().split('T')[0],
      expiresAt: currentPlan.id === 'lifetime' ? 'Lifetime (Never Expire)' : `${currentPlan.durationDays} दिन शेष`
    };

    setSubscribers([newSub, ...subscribers]);
    setSubmittedStatus(`✅ बधाई हो! UTR ${submissionUtr} सत्यापित हो गया और ${currentPlan.name} एक्टिव हो गया!`);
    setSubmissionUtr('');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-zinc-950 border border-amber-500/30 p-6 sm:p-8 backdrop-blur-sm">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-52 h-52 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Crown className="w-3.5 h-3.5 fill-amber-400" />
                {isHindi ? 'VIP मेम्बरशिप व UPI इंजन' : 'VIP Membership & Automated UPI'}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" />
                Auto QR Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>{isHindi ? '👑 VIP सदस्यता व ऑटोमैटिक UPI QR कोड' : '👑 VIP Membership & Automated UPI Engine'}</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
              {isHindi
                ? 'टेलीग्राम बॉट में ₹30 (1 महीना), ₹50 (2 महीने) और ₹100 (लाइफटाइम) प्लान्स। ऑफिशियल UPI vinit-godara@fam के साथ रियल-टाइम QR कोड जनरेटर व UTR वेरिफिकेशन!'
                : 'Telegram Bot VIP Membership with ₹30 (1 Mo), ₹50 (2 Mo), and ₹100 (Lifetime) plans. Powered by official UPI ID vinit-godara@fam with dynamic QR generation!'}
            </p>
          </div>

          {/* Official UPI ID Badge */}
          <div className="w-full md:w-auto bg-zinc-900/90 border border-amber-500/40 rounded-xl p-4 shadow-xl flex flex-col gap-2 min-w-[280px]">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                <CreditCard className="w-3.5 h-3.5" />
                {isHindi ? 'आधिकारिक UPI ID' : 'Official UPI ID'}
              </span>
              <span className="text-emerald-400 text-[11px] font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
            </div>
            
            <div className="flex items-center justify-between bg-black/60 border border-zinc-700/60 rounded-lg px-3 py-2 font-mono text-sm">
              <span className="text-amber-200 font-bold select-all">{UPI_ID}</span>
              <button
                onClick={() => copyToClipboard(UPI_ID, true)}
                className="p-1 hover:text-amber-300 text-zinc-400 transition cursor-pointer"
                title="Copy UPI ID"
              >
                {copiedUpi ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="text-[11px] text-zinc-400 flex items-center justify-between">
              <span>{isHindi ? 'प्राप्तकर्ता:' : 'Recipient:'} <strong className="text-zinc-200">{UPI_NAME}</strong></span>
              <span className="text-amber-400/80">IDFC / FamPay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            {isHindi ? 'उपलब्ध VIP प्लान्स (Select a Plan)' : 'Available VIP Plans'}
          </h2>
          <span className="text-xs text-zinc-400">
            {isHindi ? 'प्लान चुनने पर नीचे ऑटोमैटिक QR कोड अपडेट होगा' : 'Selecting updates dynamic QR code below'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((p) => {
            const isSelected = selectedPlanId === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPlanId(p.id)}
                className={`relative rounded-xl border p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-950/40 to-zinc-900 border-amber-400 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/50'
                    : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                {p.isPopular && (
                  <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-[10px] uppercase tracking-wider shadow">
                    {p.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400/90 tracking-wide">
                      {p.id === 'lifetime' ? '👑 LIFETIME' : `${p.durationDays} DAYS ACCESS`}
                    </span>
                    {!p.isPopular && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    {isHindi ? p.nameHi : p.name}
                  </h3>

                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-amber-300">₹{p.price}</span>
                    <span className="text-xs text-zinc-400">
                      {p.id === 'lifetime' ? '/ हमेशा के लिए' : `/${p.durationDays} दिन`}
                    </span>
                  </div>

                  <hr className="my-4 border-zinc-800" />

                  <ul className="space-y-2 text-xs text-zinc-300">
                    {p.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-2">
                  <button
                    type="button"
                    className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow'
                        : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{isSelected ? (isHindi ? 'चयनित (QR तैयार है)' : 'Selected (QR Ready)') : (isHindi ? 'यह प्लान चुनें' : 'Select Plan')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic UPI QR Code & Instant Payment Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Real-time QR Code Canvas */}
        <div className="lg:col-span-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
            <QrCode className="w-4 h-4" />
            <span>{isHindi ? 'ऑटोमैटिक डायनामिक QR कोड' : 'Live Dynamic UPI QR'}</span>
          </div>

          <h3 className="text-lg font-bold text-white">
            {currentPlan.name} (₹{currentPlan.price})
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xs">
            {isHindi
              ? 'PhonePe, Paytm, Google Pay या किसी भी UPI ऐप से स्कैन करके पेमेंट करें।'
              : 'Scan with PhonePe, Google Pay, Paytm, or BHIM to pay instantly.'}
          </p>

          {/* QR Code Container with sleek border & glow */}
          <div className="mt-5 p-3 bg-white rounded-2xl shadow-2xl border-4 border-amber-500/40 relative group">
            <img
              src={qrImageUrl}
              alt="UPI QR Code"
              className="w-56 h-56 rounded-xl object-contain"
            />
            <div className="absolute inset-0 bg-amber-400/5 rounded-xl pointer-events-none" />
          </div>

          {/* Amount Badge */}
          <div className="mt-4 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-sm font-bold flex items-center gap-2">
            <span>₹{currentPlan.price} INR</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300 text-xs">{UPI_ID}</span>
          </div>

          {/* Direct UPI Apps Quick Launch */}
          <div className="w-full mt-6 space-y-2">
            <a
              href={upiIntentUrl}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition"
            >
              <Smartphone className="w-4 h-4" />
              <span>{isHindi ? 'सीधे UPI ऐप खोलें (PhonePe / GPay)' : 'Open in PhonePe / GPay App'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => copyToClipboard(upiIntentUrl, false)}
              className="w-full py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'URI कॉपी हो गया!' : 'Copy UPI Intent String'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: UTR Submission & Simulator */}
        <div className="lg:col-span-7 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                {isHindi ? 'पेमेंट सत्यापन व UTR सबमिशन' : 'Payment Verification & UTR Submission'}
              </h3>
              <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                /submitpay
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {isHindi
                ? 'पेमेंट करने के बाद आपके बैंक/UPI ऐप में 12-अंकों का UTR (UPI Ref Number) मिलता है। बॉट में /submitpay 123456789012 1m लिखकर भेजें या नीचे डायरेक्ट सबमिट करें:'
                : 'After payment, your banking app displays a 12-digit UTR/UPI Reference Number. Submit it below or type /submitpay in Telegram:'}
            </p>

            {submittedStatus && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{submittedStatus}</span>
              </div>
            )}

            <form onSubmit={handleSimulateSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    {isHindi ? 'चयनित प्लान' : 'Selected Plan'}
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${currentPlan.name} — ₹${currentPlan.price}`}
                    className="w-full bg-zinc-950 border border-zinc-700/60 rounded-lg px-3 py-2 text-xs font-bold text-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    {isHindi ? 'टेलीग्राम यूज़र आईडी या यूज़रनेम' : 'Telegram User ID / Username'}
                  </label>
                  <input
                    type="text"
                    placeholder="उदा: 789123456 या @username"
                    value={userTelegramId}
                    onChange={(e) => setUserTelegramId(e.target.value)}
                    className="w-full bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  {isHindi ? '12-अंकों का UTR / UPI रेफरेंस नंबर' : '12-Digit UTR / UPI Reference Number'}
                </label>
                <input
                  type="text"
                  placeholder="उदा: 412389472910 (Paytm / PhonePe receipt)"
                  value={submissionUtr}
                  onChange={(e) => setSubmissionUtr(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-black" />
                <span>{isHindi ? 'UTR सबमिट करें और VIP एक्टिव करें' : 'Submit UTR & Activate VIP'}</span>
              </button>
            </form>

            {/* Telegram Command Guide */}
            <div className="mt-5 p-3 rounded-lg bg-black/40 border border-zinc-800 text-xs font-mono text-zinc-400">
              <span className="text-zinc-500 block mb-1">{isHindi ? '👉 टेलीग्राम बॉट में कमांड चलाएं:' : '👉 Telegram Bot Command:'}</span>
              <div className="bg-zinc-950 p-2 rounded text-amber-300">
                /submitpay {submissionUtr || '412345678901'} {currentPlan.id}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800 text-[11px] text-zinc-500 flex items-center justify-between">
            <span>🛡️ सुरक्षित NPCI UPI गेटवे</span>
            <span>24/7 ऑटो-रिकॉर्ड डेटाबेस</span>
          </div>
        </div>
      </div>

      {/* Active VIP Subscribers Database Table */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>{isHindi ? 'सक्रिय VIP सदस्य डेटाबेस (Live Subscribers)' : 'Active VIP Subscribers Database'}</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {isHindi ? 'SQLite vip_members टेबल से रीयल-टाइम रिकॉर्ड' : 'Real-time records from SQLite vip_members table'}
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
            {subscribers.length} VIP Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950/70 text-zinc-400 font-mono uppercase text-[10px] border-b border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">User ID</th>
                <th className="py-2.5 px-3">Username</th>
                <th className="py-2.5 px-3">Plan</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">UTR Reference</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Expires At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono">
              {subscribers.map((sub, i) => (
                <tr key={i} className="hover:bg-zinc-800/30 transition">
                  <td className="py-2.5 px-3 text-zinc-400">{sub.userId}</td>
                  <td className="py-2.5 px-3 font-sans font-medium text-white">{sub.username}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {sub.planId.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">₹{sub.amount}</td>
                  <td className="py-2.5 px-3 text-zinc-400">{sub.utr}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      ● ACTIVE
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-zinc-300">{sub.expiresAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
