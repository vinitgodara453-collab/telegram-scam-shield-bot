import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Bot,
  Terminal,
  Download,
  Copy,
  ExternalLink,
  Share2,
  Sparkles,
  Server,
  Zap,
  Image,
  RefreshCw,
  FileCode,
  ShieldCheck,
  Check
} from 'lucide-react';
import JSZip from 'jszip';
import {
  SCAM_SHIELD_BOT_PYTHON,
  SCAM_SHIELD_REQUIREMENTS,
  DEPLOY_VPS_SH,
  SCAMSHIELD_SERVICE
} from '../data/scamShieldCode';

interface ScamShieldStudioProps {
  isHindi: boolean;
}

export const ScamShieldStudio: React.FC<ScamShieldStudioProps> = ({ isHindi }) => {
  const [activeSubTab, setActiveSubTab] = useState<'scanner' | 'emojis' | 'vps' | 'code'>('scanner');
  const [queryInput, setQueryInput] = useState('@crypto_signals_daily_100x');
  const [analyzing, setAnalyzing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Analysis result state
  const [result, setResult] = useState<{
    target: string;
    targetType: string;
    score: number;
    verdict: string;
    level: 'safe' | 'caution' | 'critical';
    flags: string[];
  }>({
    target: '@crypto_signals_daily_100x',
    targetType: 'TELEGRAM_CHANNEL',
    score: 92,
    verdict: '🔴 CRITICAL SCAMMER (कालासूची में दर्ज)',
    level: 'critical',
    flags: [
      '🚨 "100% Guaranteed Profit / 100x Return" अवास्तविक लालच का दावा',
      '🚨 एडमिन डीएम व अनवेरिफाइड क्रिप्टो वॉलेट ट्रांसफर की मांग',
      '⚠️ बॉट फार्म गतिविधि व असामान्य यूज़रनेम पैटर्न पाया गया',
      '⚠️ सामुदायिक ब्लैकलिस्ट डेटाबेस में 8+ यूज़र्स द्वारा रिपोर्टेड'
    ]
  });

  const runAnalysis = (input: string) => {
    setAnalyzing(true);
    setTimeout(() => {
      const lower = input.toLowerCase().trim();
      let score = 10;
      let targetType = 'TELEGRAM_HANDLE';
      let flags: string[] = [];

      if (lower.includes('paytm') || lower.includes('upi') || lower.includes('okaxis') || lower.includes('ybl')) {
        targetType = 'UPI_ID';
      } else if (lower.startsWith('0x') || lower.startsWith('t')) {
        targetType = 'CRYPTO_WALLET';
      }

      if (lower.includes('support') || lower.includes('admin') || lower.includes('helpdesk') || lower.includes('official')) {
        score += 45;
        flags.push('🚨 आधिकारिक टेलीग्राम / बैंक सपोर्ट इंपर्सनेशन (धोखाधड़ी का सबसे आम तरीका)');
      }

      if (lower.includes('100x') || lower.includes('double') || lower.includes('fixed') || lower.includes('toss') || lower.includes('profit')) {
        score += 40;
        flags.push('🚨 पोंजी व फर्जी मुनाफा योजना कीवर्ड मैच (100% Guarantee, Double Money)');
      }

      if (lower.includes('refund') || lower.includes('claim') || lower.includes('airdrop') || lower.includes('gift')) {
        score += 35;
        flags.push('⚠️ फर्जी रिफंड या लॉटरी क्लेम लिंक पैटर्न पहचाना गया');
      }

      if (flags.length === 0) {
        flags.push('✅ किसी भी ज्ञात स्कैम डेटाबेस में कोई नकारात्मक रिपोर्ट नहीं मिली');
        flags.push('✅ नाम व यूज़रनेम सामान्य व सुरक्षित मापदंडों पर खरे उतरे');
      }

      score = Math.min(Math.max(score, 8), 98);

      let verdict = '🟢 SAFE / CLEAN (सुरक्षित)';
      let level: 'safe' | 'caution' | 'critical' = 'safe';

      if (score >= 70) {
        verdict = '🔴 CRITICAL DANGER (अत्यधिक खतरनाक स्कैमर)';
        level = 'critical';
      } else if (score >= 35) {
        verdict = '🟡 CAUTION (संदेहास्पद - सावधानी बरतें)';
        level = 'caution';
      }

      setResult({
        target: input,
        targetType,
        score,
        verdict,
        level,
        flags
      });
      setAnalyzing(false);
    }, 450);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadFullBotZip = async () => {
    const zip = new JSZip();
    zip.file('scam_shield_bot.py', SCAM_SHIELD_BOT_PYTHON);
    zip.file('requirements.txt', SCAM_SHIELD_REQUIREMENTS);
    zip.file('deploy_vps.sh', DEPLOY_VPS_SH);
    zip.file('scamshield.service', SCAMSHIELD_SERVICE);
    
    const envContent = `BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN_HERE
ADMIN_ID=YOUR_TELEGRAM_NUMERIC_ID
DATABASE_PATH=scam_shield.db
EMOJI_SHIELD=5368324170671202286
EMOJI_VERIFIED=5449747923766094392
EMOJI_ALERT=5370908842851965692
EMOJI_FIRE=5371077754646307137
EMOJI_ROBOT=5370724838722248557
EMOJI_STAR=5409166649855057077
`;
    zip.file('.env.example', envContent);

    const readmeContent = `# 🛡️ AI Scam-Shield & Forensic Telegram Bot
24/7 VPS Ready Anti-Fraud Bot with Telegram Premium Custom Emojis

## 🚀 1-Click VPS Installation (Ubuntu / Debian)
\`\`\`bash
chmod +x deploy_vps.sh
bash deploy_vps.sh
\`\`\`

## ⚙️ Manual Setup
1. Install Python packages:
\`\`\`bash
pip install -r requirements.txt
\`\`\`
2. Configure \`.env\` with your \`BOT_TOKEN\` from @BotFather.
3. Run the bot:
\`\`\`bash
python3 scam_shield_bot.py
\`\`\`

## 🌟 Telegram Premium Emojis
This bot uses Telegram custom animated emoji tags:
\`<tg-emoji emoji-id="5368324170671202286">🛡️</tg-emoji>\`
`;
    zip.file('README.md', readmeContent);

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scam-shield-bot-vps.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const samplePresets = [
    { label: '@crypto_signals_daily_100x', type: 'scam' },
    { label: 'refund_support@okaxis', type: 'scam' },
    { label: '@telegram_support_official', type: 'impersonator' },
    { label: '@legit_developer_radhe', type: 'safe' }
  ];

  const premiumEmojiPack = [
    { name: 'Security Shield', fallback: '🛡️', id: '5368324170671202286', desc: 'Official Anti-Scam Shield' },
    { name: 'Verified Badge', fallback: '✅', id: '5449747923766094392', desc: 'Telegram Blue/Star Verified' },
    { name: 'Alert Siren', fallback: '🚨', id: '5370908842851965692', desc: 'Critical Danger & Warning' },
    { name: 'Fire / Trending', fallback: '🔥', id: '5371077754646307137', desc: 'Viral / Hot Alert' },
    { name: 'AI Robot', fallback: '🤖', id: '5370724838722248557', desc: 'Forensic Scanner Bot' },
    { name: 'Premium Star', fallback: '⭐', id: '5409166649855057077', desc: 'Telegram Gold Star' },
    { name: 'VIP Diamond', fallback: '💎', id: '5370921471783868516', desc: 'VIP Member / Trusted' }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/40 border border-emerald-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                {isHindi ? 'अनोखा AI प्रोजेक्ट' : 'WORLD-FIRST CONCEPT'}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                24/7 VPS READY
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-purple-500/15 text-purple-400 border border-purple-500/30">
                ⭐ TG PREMIUM EMOJIS
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span className="text-emerald-400">🛡️ AI Scam-Shield</span> &amp; Forensic Bot
            </h1>

            <p className="text-sm md:text-base text-zinc-300 max-w-2xl leading-relaxed">
              {isHindi
                ? 'टेलीग्राम पर स्कैमर चैनलों, फर्जी पेमेंट प्रूफ व फ़िशिंग UPI का पर्दाफाश करने वाला पहला बॉट। इसे अपने VPS पर 24/7 होस्ट करें, प्रीमियम इमोजी लगाएं और ग्रुप्स में शेयर करवाएं!'
                : 'The first-of-its-kind Forensic Scanner Bot that detects fake payment screenshots, scam channels, and spoofed UPI IDs with viral Telegram share cards.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={downloadFullBotZip}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-900/30 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isHindi ? 'पूरा बॉट पैकेज डाउनलोड करें (.ZIP)' : 'Download Full Bot Pack (.ZIP)'}</span>
            </button>
            <button
              onClick={() => setActiveSubTab('vps')}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-emerald-500/50 text-zinc-200 text-sm font-medium transition cursor-pointer"
            >
              <Server className="w-4 h-4 text-emerald-400" />
              <span>{isHindi ? 'VPS सेटअप' : 'VPS Setup'}</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto border-t border-zinc-800/80 pt-4 mt-6">
          {[
            { id: 'scanner', label: isHindi ? '🔍 लाइव स्कैनर सिमुलेटर' : '🔍 Live Scanner Simulator' },
            { id: 'emojis', label: isHindi ? '⭐ प्रीमियम इमोजी व बटन स्टाइल' : '⭐ Premium Emojis & Buttons' },
            { id: 'vps', label: isHindi ? '🚀 VPS 24/7 होस्टिंग गाइड' : '🚀 VPS 24/7 Guide' },
            { id: 'code', label: isHindi ? '💻 Python कोड (scam_shield_bot.py)' : '💻 Python Source Code' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SUB-TAB 1: LIVE SCANNER SIMULATOR */}
      {activeSubTab === 'scanner' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Input and Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-emerald-400" />
                  {isHindi ? 'लाइव फॉरेंसिक स्कैनर' : 'Live Forensic Scanner'}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  REAL-TIME AI
                </span>
              </div>

              {/* Input Box */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400">
                  {isHindi ? 'यूज़रनेम, चैनल लिंक, UPI ID या वॉलेट दर्ज करें:' : 'Enter Telegram @handle, UPI, or Wallet:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={queryInput}
                    onChange={e => setQueryInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && runAnalysis(queryInput)}
                    placeholder="@scammer_channel या payment@upi"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 focus:border-emerald-500 text-white font-mono text-sm outline-none transition"
                  />
                  <button
                    onClick={() => runAnalysis(queryInput)}
                    disabled={analyzing}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-sm transition cursor-pointer flex items-center gap-1.5"
                  >
                    {analyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    <span>{isHindi ? 'स्कैन करें' : 'Scan'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="space-y-2">
                <span className="text-xs text-zinc-400 font-medium">
                  {isHindi ? 'क्विक टेस्ट प्रीसेट्स (क्लिक करें):' : 'Quick Test Samples:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {samplePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQueryInput(preset.label);
                        runAnalysis(preset.label);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 text-xs text-zinc-300 font-mono transition cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fake Payment Screenshot Inspector Card */}
              <div className="rounded-xl bg-zinc-950/70 border border-zinc-800/80 p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Image className="w-4 h-4" />
                  <span>{isHindi ? 'पेमेंट स्क्रीनशॉट फॉरेंसिक (Paytm/PhonePe Spoofers)' : 'Screenshot Forensic Engine'}</span>
                </div>
                <p className="text-xs text-zinc-400">
                  {isHindi
                    ? 'टेलीग्राम बॉट में यूज़र किसी भी पेमेंट स्क्रीनशॉट की फोटो भेजता है, तो बॉट उसके फॉन्ट, साइज़ और डिजिटल आर्टिफ़ैक्ट्स को तुरंत चेक कर लेता है।'
                    : 'When users send a payment screenshot to the Telegram bot, it auto-detects spoofed apps and fake balance slips.'}
                </p>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-800">
                  <span>Photo Handler:</span>
                  <span className="text-emerald-400 font-semibold">Active in scam_shield_bot.py</span>
                </div>
              </div>
            </div>

            {/* Forensic Result Details */}
            <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  {isHindi ? 'फॉरेंसिक रिस्क मीटर' : 'Forensic Risk Meter'}
                </span>
                <span
                  className={`text-sm font-black font-mono px-3 py-1 rounded-full ${
                    result.level === 'critical'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : result.level === 'caution'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {result.score}% RISK
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-zinc-950 h-3.5 rounded-full overflow-hidden p-0.5 border border-zinc-800">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    result.level === 'critical'
                      ? 'bg-gradient-to-r from-orange-500 to-red-600'
                      : result.level === 'caution'
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-zinc-300">
                  {isHindi ? 'पता लगाए गए बिंदु (Detected Indicators):' : 'Detected Indicators:'}
                </div>
                <div className="space-y-1.5">
                  {result.flags.map((flag, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-zinc-300 bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800/80 flex items-start gap-2"
                    >
                      <span>{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Telegram Live Message Simulation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-zinc-400 ml-2">Telegram Dark Mode Simulation</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  PREMIUM EMOJI ENABLED
                </span>
              </div>

              {/* Bot Message Box */}
              <div className="bg-[#182533] rounded-2xl p-4 md:p-5 text-white text-xs md:text-sm font-sans space-y-3.5 shadow-xl border border-blue-900/20 max-w-lg mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-blue-900/40">
                  <div className="flex items-center gap-2 font-bold text-sky-400 text-sm">
                    <span className="p-1 rounded bg-sky-500/20 text-sky-300 text-base">🛡️</span>
                    <span>AI SCAM FORENSIC REPORT</span>
                    <span className="text-amber-300 text-xs">⭐</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">11:42 AM</span>
                </div>

                {/* Details */}
                <div className="space-y-1.5 font-mono text-xs">
                  <div>
                    <span className="text-zinc-400">Target: </span>
                    <span className="bg-black/30 px-1.5 py-0.5 rounded text-sky-300">{result.target}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400">Type: </span>
                    <span className="text-zinc-200">{result.targetType}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400">Verdict: </span>
                    <span className="font-bold text-red-400">{result.verdict}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400">Risk Score: </span>
                    <span className="text-amber-400 font-bold">{result.score}%</span>
                  </div>
                </div>

                {/* Risk Bar in Telegram */}
                <div className="text-sm tracking-widest font-mono select-none">
                  {'🟥'.repeat(Math.floor(result.score / 10))}
                  {'🟩'.repeat(10 - Math.floor(result.score / 10))}
                </div>

                {/* Flags in Telegram */}
                <div className="border-t border-blue-900/30 pt-2 space-y-1 text-xs">
                  <div className="font-bold text-zinc-300">फॉरेंसिक विश्लेषण बिंदु:</div>
                  {result.flags.map((f, i) => (
                    <div key={i} className="text-zinc-300">
                      • {f}
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-zinc-400 italic pt-1">
                  💡 सलाह: किसी को भी पैसे भेजने या ओटीपी देने से पहले 100% वेरिफाई करें!
                </div>

                {/* Telegram Inline Buttons */}
                <div className="pt-2 space-y-2">
                  <a
                    href={`https://t.me/share/url?url=https://t.me/ScamShieldBot&text=${encodeURIComponent(
                      `🚨 SCAM ALERT: ${result.target} का रिस्क स्कोर ${result.score}% है! जांच परिणाम: ${result.verdict}. सुरक्षित रहें व ग्रुप में शेयर करें!`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#2b5278] hover:bg-[#336394] text-sky-200 font-bold text-xs flex items-center justify-center gap-2 transition text-center shadow"
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-300" />
                    <span>🔥 इस चेतावनी को टेलीग्राम ग्रुप में शेयर करें</span>
                    <Share2 className="w-3.5 h-3.5" />
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-2 px-3 rounded-xl bg-[#203247] hover:bg-[#273d57] text-zinc-200 text-xs font-semibold text-center transition">
                      🚨 सबूत जमा करें
                    </button>
                    <button
                      onClick={() => runAnalysis(queryInput)}
                      className="py-2 px-3 rounded-xl bg-[#203247] hover:bg-[#273d57] text-zinc-200 text-xs font-semibold text-center transition"
                    >
                      🔄 नया स्कैन
                    </button>
                  </div>
                </div>
              </div>

              {/* Explanatory Callout */}
              <div className="rounded-xl bg-emerald-950/20 border border-emerald-500/20 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <span>वायरल शेयरिंग का सीक्रेट (Viral Growth Feature)</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  जब कोई यूज़र किसी ग्रुप में इस बॉट से स्कैमर को चेक करता है, तो बॉट का शेयर बटन 1-क्लिक में बाकी मेंबर्स को फॉरवर्ड करने की सुविधा देता है। इससे आपका बॉट बिना किसी पेड ऐड के बहुत तेज़ी से वायरल होता है!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: TELEGRAM PREMIUM EMOJIS & BUTTON STYLING */}
      {activeSubTab === 'emojis' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-purple-400" />
                {isHindi ? 'टेलीग्राम प्रीमियम इमोजी व बटन स्टाइलिंग गाइड' : 'Telegram Premium Emoji & Button Guide'}
              </h3>
              <p className="text-xs md:text-sm text-zinc-400 mt-1">
                {isHindi
                  ? 'टेलीग्राम बॉट में कस्टम एनिमेटेड इमोजी लगाने के लिए आपको केवल HTML टैग और इमोजी आईडी का उपयोग करना होता है। नीचे दिए गए लोकप्रिय इमोजी आईडी को 1-क्लिक में कॉपी करें:'
                  : 'Use custom animated emoji tags in Telegram HTML parse mode. Pre-configured IDs ready to paste into your bot.'}
              </p>
            </div>

            {/* Ready to Copy Custom Emoji IDs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {premiumEmojiPack.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 space-y-3 hover:border-purple-500/40 transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.fallback}</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `<tg-emoji emoji-id="${item.id}">${item.fallback}</tg-emoji>`,
                          item.id
                        )
                      }
                      className="p-1.5 rounded-lg bg-zinc-900 hover:bg-purple-900/40 text-zinc-400 hover:text-purple-300 border border-zinc-800 transition cursor-pointer"
                      title="Copy HTML Tag"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.name}</h4>
                    <p className="text-[11px] text-zinc-400">{item.desc}</p>
                  </div>
                  <div className="bg-zinc-900 px-2 py-1 rounded text-[10px] font-mono text-purple-300 truncate border border-zinc-800">
                    ID: {item.id}
                  </div>
                </div>
              ))}
            </div>

            {/* How to use in Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-5 space-y-3">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" />
                  1. HTML Mode (सर्वोत्तम व अनुशंसित)
                </span>
                <pre className="text-xs font-mono text-zinc-300 bg-zinc-900/90 p-3.5 rounded-lg overflow-x-auto border border-zinc-800 leading-relaxed">
{`# Python कोड में ऐसे लिखें:
msg = '<tg-emoji emoji-id="5368324170671202286">🛡️</tg-emoji> <b>सुरक्षा शील्ड सक्रिय!</b>'

await bot.send_message(
    chat_id=chat_id,
    text=msg,
    parse_mode="HTML"
)`}
                </pre>
                <p className="text-[11px] text-zinc-400">
                  {isHindi
                    ? 'यदि यूज़र के पास पुराना टेलीग्राम है, तो टैग के अंदर का 🛡️ इमोजी अपने आप दिखाई देगा।'
                    : 'Gracefully degrades to standard emoji for non-premium clients.'}
                </p>
              </div>

              <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-5 space-y-3">
                <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" />
                  2. 1-Click Viral Share Button
                </span>
                <pre className="text-xs font-mono text-zinc-300 bg-zinc-900/90 p-3.5 rounded-lg overflow-x-auto border border-zinc-800 leading-relaxed">
{`from urllib.parse import quote_plus
from telegram import InlineKeyboardButton, InlineKeyboardMarkup

share_url = f"https://t.me/share/url?url=https://t.me/{bot_username}&text={quote_plus('सावधान! यह स्कैमर है!')}"

keyboard = InlineKeyboardMarkup([
    [InlineKeyboardButton("🔥 ग्रुप में शेयर करें", url=share_url)]
])`}
                </pre>
                <p className="text-[11px] text-zinc-400">
                  {isHindi
                    ? 'इस यूआरएल बटन पर क्लिक करते ही टेलीग्राम की शेयर शीट खुलती है और यूज़र अपने सभी ग्रुप्स में रिपोर्ट भेज सकता है।'
                    : 'Opens native Telegram share sheet to send report to any chat/channel.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: VPS 24/7 HOSTING GUIDE */}
      {activeSubTab === 'vps' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Server className="w-5 h-5 text-emerald-400" />
                  {isHindi ? 'VPS (Ubuntu/Debian) पर 24/7 बॉट कैसे चलाएं' : 'How to Run 24/7 on Ubuntu/Debian VPS'}
                </h3>
                <p className="text-xs md:text-sm text-zinc-400 mt-1">
                  {isHindi
                    ? 'Hostinger, DigitalOcean, Hetzner या AWS VPS पर इस बॉट को बैकग्राउंड में चलाएं ताकि कंप्यूटर या फोन बंद होने पर भी यह लगातार काम करता रहे।'
                    : 'Host 24/7 using background systemd service on any Linux VPS.'}
                </p>
              </div>

              <button
                onClick={downloadFullBotZip}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition cursor-pointer self-start"
              >
                <Download className="w-4 h-4" />
                <span>Download VPS Pack (.ZIP)</span>
              </button>
            </div>

            {/* Quick 1-Command Auto Installer */}
            <div className="rounded-xl bg-gradient-to-r from-emerald-950/40 to-zinc-950 border border-emerald-500/30 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  {isHindi ? '⚡ विधि 1: 1-कमांड ऑटो-इंस्टॉलर (सबसे तेज़)' : '⚡ Method 1: 1-Command Auto-Deploy'}
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      'curl -sSL https://raw.githubusercontent.com/Avijit360/K5FREE/main/deploy_vps.sh | bash',
                      'curl-cmd'
                    )
                  }
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 font-mono flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'curl-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'curl-cmd' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="bg-zinc-950 p-3 rounded-lg font-mono text-xs text-emerald-300 border border-zinc-800">
                chmod +x deploy_vps.sh &amp;&amp; bash deploy_vps.sh
              </div>
              <p className="text-[11px] text-zinc-400">
                {isHindi
                  ? 'यह स्क्रिप्ट आपके VPS पर Python3, सारी लाइब्रेरी, .env फाइल और 24/7 Systemd सर्विस अपने आप सेटअप कर देगी।'
                  : 'Automatically installs dependencies, asks for bot token, and creates a 24/7 systemd service.'}
              </p>
            </div>

            {/* Step-by-Step Manual Commands */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-bold text-white">
                {isHindi ? '🛠️ विधि 2: स्टेप-बाय-स्टेप मैन्युअल कमांड्स' : '🛠️ Method 2: Step-by-Step Manual Setup'}
              </h4>

              <div className="space-y-3">
                {[
                  {
                    step: '1',
                    title: isHindi ? 'VPS में लॉगिन करें व निर्भरताएं स्थापित करें' : 'Connect via SSH & Install Dependencies',
                    cmd: 'apt update -y && apt install -y python3 python3-pip git sqlite3\npip3 install python-telegram-bot Pillow colorama'
                  },
                  {
                    step: '2',
                    title: isHindi ? 'बॉट फाइल अपलोड करें या बनाएं' : 'Upload or Create Bot File',
                    cmd: 'mkdir -p /root/scam-shield-bot && cd /root/scam-shield-bot\n# scam_shield_bot.py को इस डायरेक्टरी में रखें'
                  },
                  {
                    step: '3',
                    title: isHindi ? 'Systemd सर्विस बनाएं (24/7 बैकग्राउंड रनर)' : 'Create Systemd Auto-Restart Service',
                    cmd: 'cat <<EOF > /etc/systemd/system/scamshield.service\n[Unit]\nDescription=AI Scam Shield Bot\nAfter=network.target\n\n[Service]\nUser=root\nWorkingDirectory=/root/scam-shield-bot\nExecStart=/usr/bin/python3 /root/scam-shield-bot/scam_shield_bot.py\nRestart=always\n\n[Install]\nWantedBy=multi-user.target\nEOF'
                  },
                  {
                    step: '4',
                    title: isHindi ? 'बॉट शुरू करें व स्थिति जांचें' : 'Start and Enable Bot Service',
                    cmd: 'systemctl daemon-reload\nsystemctl enable scamshield.service\nsystemctl start scamshield.service\n\n# लाइव लॉग्स देखने के लिए:\njournalctl -u scamshield -f'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs flex items-center justify-center font-bold">
                          {item.step}
                        </span>
                        <span className="text-xs font-bold text-zinc-200">{item.title}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(item.cmd, `step-${idx}`)}
                        className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
                      >
                        {copiedId === `step-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <pre className="bg-zinc-900/90 p-3 rounded-lg font-mono text-xs text-zinc-300 overflow-x-auto border border-zinc-800">
                      {item.cmd}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: FULL PYTHON SOURCE CODE */}
      {activeSubTab === 'code' && (
        <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-emerald-400" />
                <span>scam_shield_bot.py (पूर्ण पायथन स्क्रिप्ट)</span>
              </h3>
              <p className="text-xs text-zinc-400">
                {isHindi
                  ? 'यह स्क्रिप्ट आपके VPS पर सीधे चलने के लिए पूरी तरह तैयार है।'
                  : 'Complete standalone Python script ready to deploy on any server.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(SCAM_SHIELD_BOT_PYTHON);
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                }}
                className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
              <button
                onClick={downloadFullBotZip}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .ZIP</span>
              </button>
            </div>
          </div>

          <pre className="bg-zinc-950 p-4 rounded-xl text-xs font-mono text-emerald-300/90 overflow-x-auto max-h-[580px] border border-zinc-800/80 leading-relaxed">
            {SCAM_SHIELD_BOT_PYTHON}
          </pre>
        </div>
      )}
    </div>
  );
};
