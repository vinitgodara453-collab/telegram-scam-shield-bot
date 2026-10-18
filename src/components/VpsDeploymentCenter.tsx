import React, { useState } from 'react';
import {
  Server,
  Terminal,
  Copy,
  Check,
  Zap,
  Play,
  RotateCw,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Key,
  ShieldAlert,
  Database,
  ExternalLink,
  Sparkles,
  Smartphone,
  Cloud,
  Layers,
  BatteryCharging
} from 'lucide-react';
import { DEPLOY_VPS_SH, SCAMSHIELD_SERVICE, RUN_24_7_SH, DOCKERFILE_CODE } from '../data/scamShieldCode';

interface VpsDeploymentCenterProps {
  isHindi: boolean;
}

export const VpsDeploymentCenter: React.FC<VpsDeploymentCenterProps> = ({ isHindi }) => {
  const [deployMode, setDeployMode] = useState<'termux' | 'cloud' | 'vps'>('termux');
  const [botToken, setBotToken] = useState('');
  const [adminId, setAdminId] = useState('');
  const [repoUrl, setRepoUrl] = useState('https://github.com/vinitgodara453-collab/telegram-scam-shield-bot');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const oneClickCommand = `curl -sSL https://raw.githubusercontent.com/vinitgodara453-collab/telegram-scam-shield-bot/main/deploy_vps.sh | bash`;
  const termuxBackgroundCmd = `nohup ./run_24_7.sh > /dev/null 2>&1 &`;
  const termuxLogsCmd = `tail -f bot_24_7.log`;
  const termuxStopCmd = `pkill -f run_24_7.sh ; pkill -f scam_shield_bot.py`;
  const termuxPullCmd = `git pull && chmod +x run_24_7.sh`;

  const manualSteps = [
    {
      title: isHindi ? '1. सिस्टम अपडेट व Python3 टूल्स' : '1. Update System & Install Python3',
      cmd: `sudo apt update -y && sudo apt upgrade -y\nsudo apt install -y python3 python3-pip python3-venv git sqlite3 curl nano`,
      desc: isHindi ? 'Ubuntu / Debian VPS पर आवश्यक पैकेजेस इंस्टॉल करता है।' : 'Installs core system dependencies on Ubuntu/Debian VPS.'
    },
    {
      title: isHindi ? '2. रिपॉजिटरी क्लोन व डायरेक्टरी में जाएं' : '2. Clone Clean Repository',
      cmd: `git clone ${repoUrl}.git\ncd telegram-scam-shield-bot`,
      desc: isHindi ? 'नई स्कैम शील्ड रिपॉजिटरी को सर्वर पर डाउनलोड करता है।' : 'Clones the fresh scam-shield bot repo to your VPS.'
    },
    {
      title: isHindi ? '3. पायथन लाइब्रेरीज़ इंस्टॉल करें' : '3. Install Python Dependencies',
      cmd: `pip3 install -r requirements.txt`,
      desc: isHindi ? 'python-telegram-bot, Pillow, colorama और आवश्यक लाइब्रेरीज़ इंस्टॉल करता है।' : 'Installs PTB, Pillow image forensics, and colorama.'
    },
    {
      title: isHindi ? '4. .env कॉन्फ़िगरेशन फाइल बनाएं' : '4. Create .env Credentials',
      cmd: `cat << 'EOF' > .env
BOT_TOKEN="${botToken.trim() || 'YOUR_BOT_TOKEN_FROM_BOTFATHER'}"
ADMIN_ID="${adminId.trim() || 'YOUR_TELEGRAM_NUMERIC_ID'}"
DATABASE_PATH="scam_shield.db"
EMOJI_SHIELD="5368324170671202286"
EMOJI_VERIFIED="5449747923766094392"
EMOJI_ALERT="5370908842851965692"
EMOJI_FIRE="5371077754646307137"
EMOJI_ROBOT="5370724838722248557"
EMOJI_STAR="5409166649855057077"
EOF`,
      desc: isHindi ? 'अपना Bot Token व Admin ID सुरक्षित रूप से .env में सेव करता है।' : 'Creates the production environment variables file.'
    },
    {
      title: isHindi ? '5. 24/7 Systemd सर्विस सेटअप व स्टार्ट' : '5. Setup & Start 24/7 Background Service',
      cmd: `sudo cp scamshield.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable scamshield
sudo systemctl start scamshield`,
      desc: isHindi ? 'VPS रीस्टार्ट होने पर भी बॉट अपने आप 24/7 चालू रहेगा।' : 'Enables auto-start on server reboot and runs bot continuously.'
    },
    {
      title: isHindi ? '6. स्टेटस व लाइव लॉग्स चेक करें' : '6. Check Status & Live Logs',
      cmd: `sudo systemctl status scamshield\nsudo journalctl -u scamshield -f`,
      desc: isHindi ? 'देखें कि बॉट बिना किसी त्रुटि के सक्रिय रूप से चल रहा है या नहीं।' : 'Verifies active service status and tails live Telegram events.'
    }
  ];

  const adminCheatSheet = [
    { cmd: 'sudo systemctl restart scamshield', desc: isHindi ? 'बॉट को रीस्टार्ट करें (अपडेट के बाद)' : 'Restart bot service' },
    { cmd: 'sudo systemctl stop scamshield', desc: isHindi ? 'बॉट को अस्थायी रोकें' : 'Stop bot service' },
    { cmd: 'sudo journalctl -u scamshield -n 100 --no-pager', desc: isHindi ? 'अंतिम 100 लॉग्स तुरंत देखें' : 'View last 100 log lines' },
    { cmd: 'sqlite3 scam_shield.db "SELECT * FROM reports ORDER BY id DESC LIMIT 10;"', desc: isHindi ? 'डेटाबेस में ताज़ा स्कैम रिपोर्ट्स देखें' : 'Inspect recent reports in SQLite' },
    { cmd: 'sqlite3 scam_shield.db "SELECT COUNT(*) FROM blacklists;"', desc: isHindi ? 'कुल ब्लैकलिस्टेड स्कैमर्स की संख्या' : 'Count total blacklisted targets' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-black border border-emerald-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <RotateCw className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  {isHindi ? '⚡ 24/7 ऑल-टाइम बॉट होस्टिंग सेंटर' : '⚡ 24/7 Continuous Bot Hosting Center'}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  AUTO-RESTART
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                {isHindi
                  ? 'बॉट को 24 घंटे, 365 दिन बिना बंद हुए चालू रखने के 3 आसान तरीके (Termux, Free Cloud या VPS)।'
                  : 'Three bulletproof methods to run your Scam-Shield Bot 24/7 without interruption.'}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Deployment Mode Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5 pt-5 border-t border-zinc-800">
          <button
            onClick={() => setDeployMode('termux')}
            className={`p-3 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${
              deployMode === 'termux'
                ? 'bg-emerald-500/15 border-emerald-500/50 text-white'
                : 'bg-black/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <Smartphone className={`w-5 h-5 shrink-0 ${deployMode === 'termux' ? 'text-emerald-400' : 'text-zinc-500'}`} />
            <div>
              <div className="text-xs font-bold text-white">
                {isHindi ? '1. Android Termux 24/7' : '1. Android Termux 24/7'}
              </div>
              <div className="text-[10px] text-zinc-400">
                {isHindi ? 'फोन में बैकग्राउंड व ऑटो-रीस्टार्ट' : 'Wake-Lock + Auto Restart Loop'}
              </div>
            </div>
          </button>

          <button
            onClick={() => setDeployMode('cloud')}
            className={`p-3 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${
              deployMode === 'cloud'
                ? 'bg-cyan-500/15 border-cyan-500/50 text-white'
                : 'bg-black/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <Cloud className={`w-5 h-5 shrink-0 ${deployMode === 'cloud' ? 'text-cyan-400' : 'text-zinc-500'}`} />
            <div>
              <div className="text-xs font-bold text-white">
                {isHindi ? '2. 100% Free Cloud (बिना फोन के)' : '2. 100% Free Cloud (Render/Koyeb)'}
              </div>
              <div className="text-[10px] text-zinc-400">
                {isHindi ? 'फोन बंद होने पर भी 24/7 चलेगा' : 'Runs forever even if phone is OFF'}
              </div>
            </div>
          </button>

          <button
            onClick={() => setDeployMode('vps')}
            className={`p-3 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${
              deployMode === 'vps'
                ? 'bg-purple-500/15 border-purple-500/50 text-white'
                : 'bg-black/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <Server className={`w-5 h-5 shrink-0 ${deployMode === 'vps' ? 'text-purple-400' : 'text-zinc-500'}`} />
            <div>
              <div className="text-xs font-bold text-white">
                {isHindi ? '3. VPS Server (Ubuntu/Debian)' : '3. Dedicated Linux VPS'}
              </div>
              <div className="text-[10px] text-zinc-400">
                {isHindi ? 'Systemd डेमन 24/7 सर्विस' : 'Systemd Daemon with reboot recovery'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* MODE 1: TERMUX 24/7 */}
      {deployMode === 'termux' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Important Battery Tip */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-4">
            <BatteryCharging className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-300">
                {isHindi ? '⚠️ सबसे महत्वपूर्ण: Android की Battery Setting बदलें' : '⚠️ Critical Android Step: Disable Battery Optimization'}
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {isHindi
                  ? 'जब फोन की स्क्रीन बंद होती है, तो Android फोन Termux को सुला (kill) देता है। इसे रोकने के लिए अपने फोन की Settings -> Apps -> Termux -> Battery (बैटरी) में जाकर "Unrestricted" (कोई प्रतिबंध नहीं / No restrictions) चुनें।'
                  : 'Android kills background apps when the screen turns off. To prevent this, go to Settings -> Apps -> Termux -> Battery and select "Unrestricted" / "No restrictions".'}
              </p>
            </div>
          </div>

          {/* Step 1: Update Repo */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-sm font-bold text-white">
                  {isHindi ? 'Termux में नया 24/7 अपडेट डाउनलोड करें' : 'Pull latest 24/7 runner in Termux'}
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(termuxPullCmd, 'termux-pull')}
                className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedId === 'termux-pull' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'termux-pull' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-black border border-zinc-800 font-mono text-xs text-emerald-300 select-all">
              {termuxPullCmd}
            </pre>
          </div>

          {/* Step 2: 24/7 Background Run Command */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-emerald-950/30 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-black text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-sm font-bold text-white">
                  {isHindi ? '24/7 ऑटो-रीस्टार्ट बैकग्राउंड कमांड चलाएं' : 'Start 24/7 Keep-Alive Background Daemon'}
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(termuxBackgroundCmd, 'termux-bg')}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md"
              >
                {copiedId === 'termux-bg' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'termux-bg' ? 'Copied!' : 'Copy Command'}</span>
              </button>
            </div>
            <p className="text-xs text-zinc-300">
              {isHindi
                ? 'यह कमांड Termux Wake-Lock सक्रिय करती है (CPU जागृत रहता है) और यदि इंटरनेट या बॉट बंद होता है, तो 3 सेकंड में अपने आप रीस्टार्ट कर देती है:'
                : 'Acquires Termux CPU wake-lock and keeps an infinite loop restarting the bot automatically if the connection drops:'}
            </p>
            <pre className="p-4 rounded-xl bg-black border border-emerald-500/40 font-mono text-xs text-emerald-300 select-all whitespace-pre-wrap break-all">
              {termuxBackgroundCmd}
            </pre>
          </div>

          {/* Live Logs & Stop Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-200">
                  {isHindi ? '📝 लाइव 24/7 लॉग्स देखें:' : '📝 Tail Live Logs:'}
                </span>
                <button
                  onClick={() => copyToClipboard(termuxLogsCmd, 'termux-logs')}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'termux-logs' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <pre className="p-2.5 rounded-lg bg-black border border-zinc-800 font-mono text-xs text-cyan-300">
                {termuxLogsCmd}
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-300">
                  {isHindi ? '🛑 24/7 बॉट को पूरी तरह बंद करें:' : '🛑 Stop Background Bot:'}
                </span>
                <button
                  onClick={() => copyToClipboard(termuxStopCmd, 'termux-stop')}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'termux-stop' ? <Check className="w-3 h-3 text-red-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <pre className="p-2.5 rounded-lg bg-black border border-zinc-800 font-mono text-xs text-red-300">
                {termuxStopCmd}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: FREE CLOUD (RENDER / KOYEB) */}
      {deployMode === 'cloud' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-cyan-300">
                {isHindi ? 'फोन की बैटरी खत्म होने या फोन बंद होने पर भी 24/7 ऑनलाइन!' : 'Zero Battery Usage: Completely Free 24/7 Cloud Hosting'}
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {isHindi
                  ? 'आपकी GitHub रिपॉजिटरी में Dockerfile और 24/7 Keep-Alive HTTP सर्वर पहले से जोड़ा गया है। बस Render.com या Koyeb.com पर अपनी GitHub रिपॉजिटरी कनेक्ट करके बॉट 24/7 फ्री में चला सकते हैं।'
                  : 'Your repository already has a production Dockerfile, Procfile, and background health server built-in. Deploy to Render or Koyeb with zero configuration!'}
              </p>
            </div>
          </div>

          {/* 3 Simple Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h4 className="text-xs font-bold text-white">
                {isHindi ? 'Render.com पर फ्री अकाउंट बनाएं' : '1. Sign up on Render.com'}
              </h4>
              <p className="text-[11px] text-zinc-400">
                {isHindi
                  ? 'Render.com पर जाएं और "New +" -> "Web Service" पर क्लिक करें।'
                  : 'Create a free account on Render.com, then click "New +" -> "Web Service".'}
              </p>
              <a
                href="https://dashboard.render.com/select-repo"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold pt-1"
              >
                <span>Render Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h4 className="text-xs font-bold text-white">
                {isHindi ? 'GitHub रिपॉजिटरी चुनें' : '2. Select Your GitHub Repo'}
              </h4>
              <p className="text-[11px] text-zinc-400">
                {isHindi
                  ? 'अपनी रिपॉजिटरी "vinitgodara453-collab/telegram-scam-shield-bot" को सिलेक्ट करें।'
                  : 'Connect your public or private GitHub repository: telegram-scam-shield-bot.'}
              </p>
              <div className="p-2 rounded bg-black/60 border border-zinc-800 font-mono text-[10px] text-zinc-300 truncate">
                vinitgodara453-collab/telegram-scam-shield-bot
              </div>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h4 className="text-xs font-bold text-white">
                {isHindi ? 'BOT_TOKEN जोड़ें व Deploy करें' : '3. Add BOT_TOKEN & Deploy'}
              </h4>
              <p className="text-[11px] text-zinc-400">
                {isHindi
                  ? 'Environment Variables में Key: BOT_TOKEN और Value में अपना बॉट टोकन डालें। बस!'
                  : 'Add Environment Variable: BOT_TOKEN with your Telegram API Token, then click Deploy.'}
              </p>
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                24/7 ONLINE FOREVER
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: VPS LINUX / UBUNTU */}
      {deployMode === 'vps' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Method 1: 1-Click Fast Track Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-purple-950/30 border border-purple-500/40 shadow-xl">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-bold text-white">
                  {isHindi ? '1-क्लिक ऑटोमैटिक VPS डिप्लॉय' : '1-Click Automated Fast Deploy'}
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">
                SYSTEMD 24/7
              </span>
            </div>

            <p className="text-xs text-zinc-300 mb-3">
              {isHindi
                ? 'बस अपने VPS टर्मिनल (SSH) में यह एक लाइन पेस्ट करें और Enter दबाएं। यह स्क्रिप्ट सिस्टम अपडेट, पायथन लाइब्रेरीज़ और 24/7 Systemd सर्विस खुद चालू कर देगी:'
                : 'Paste this single line into your VPS SSH console. It automatically handles apt update, pip dependencies, systemd daemon, and asks for your bot token:'}
            </p>

            <div className="relative group">
              <pre className="p-4 rounded-xl bg-black border border-purple-500/40 font-mono text-xs text-purple-300 overflow-x-auto pr-24 whitespace-pre-wrap break-all select-all">
                {oneClickCommand}
              </pre>
              <button
                onClick={() => copyToClipboard(oneClickCommand, 'one-click')}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition cursor-pointer"
              >
                {copiedId === 'one-click' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dynamic Credentials Generator */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white">
                  {isHindi ? 'क्रेडेंशियल्स जनरेटर (वैकल्पिक)' : 'Dynamic Configuration Generator'}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                  Telegram Bot Token (@BotFather):
                </label>
                <input
                  type="text"
                  value={botToken}
                  onChange={e => setBotToken(e.target.value)}
                  placeholder="7123456789:AAF_kX9..."
                  className="w-full px-3 py-2 bg-black/60 border border-zinc-700 rounded-xl text-xs font-mono text-cyan-300 placeholder-zinc-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                  Admin Numeric Telegram ID:
                </label>
                <input
                  type="text"
                  value={adminId}
                  onChange={e => setAdminId(e.target.value)}
                  placeholder="589219481"
                  className="w-full px-3 py-2 bg-black/60 border border-zinc-700 rounded-xl text-xs font-mono text-cyan-300 placeholder-zinc-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Manual Step-by-Step with Hindi explanations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-400" />
                <span>{isHindi ? 'स्टेप-बाय-स्टेप मैन्युअल कमांड्स' : 'Step-by-Step Manual Commands'}</span>
              </h3>
              <span className="text-xs text-zinc-500 font-mono">Total 6 Steps</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {manualSteps.map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-200">{step.title}</h4>
                    <button
                      onClick={() => copyToClipboard(step.cmd, `step-${idx}`)}
                      className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono flex items-center gap-1 transition cursor-pointer"
                    >
                      {copiedId === `step-${idx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-zinc-400">{step.desc}</p>
                  <pre className="p-3 rounded-lg bg-black border border-zinc-800/80 font-mono text-xs text-zinc-300 overflow-x-auto whitespace-pre">
                    {step.cmd}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Operations Cheatsheet */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <h3 className="text-xs font-bold text-zinc-200 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>{isHindi ? 'VPS ऑपरेशन्स व डेटाबेस चीट-शीट' : 'VPS Operations & Database Cheat-Sheet'}</span>
            </h3>
            <div className="space-y-2">
              {adminCheatSheet.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-black/40 border border-zinc-800/80 text-xs font-mono"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-cyan-300 block truncate">{item.cmd}</span>
                    <span className="text-[11px] text-zinc-500">{item.desc}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.cmd, `cheat-${idx}`)}
                    className="self-end sm:self-center px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] flex items-center gap-1 transition cursor-pointer shrink-0"
                  >
                    {copiedId === `cheat-${idx}` ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>Copy</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
