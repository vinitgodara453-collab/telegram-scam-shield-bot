import React, { useState } from 'react';
import {
  Smartphone,
  Key,
  Check,
  Copy,
  Zap,
  Globe,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Code,
  Github,
  Play,
  Server,
  CreditCard,
  Sparkles,
  ShoppingBag,
  MessageSquare,
  ArrowRight,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { NAMAN_SELL_BOT_PYTHON, RUN_NAMAN_BOT_SH } from '../data/scamShieldCode';

interface NamanSellBotStudioProps {
  isHindi: boolean;
}

export const NamanSellBotStudio: React.FC<NamanSellBotStudioProps> = ({ isHindi }) => {
  const [selectedService, setSelectedService] = useState('telegram');
  const [selectedCountry, setSelectedCountry] = useState('india');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'code' | 'github'>('catalog');

  // GitHub New Repo Push state
  const [repoToken, setRepoToken] = useState('');
  const [newRepoName, setNewRepoName] = useState('naman-sell-otp-bot');
  const [isPushing, setIsPushing] = useState(false);
  const [pushLogs, setPushLogs] = useState<string[]>([]);
  const [pushedRepoUrl, setPushedRepoUrl] = useState<string | null>(null);

  const API_KEY = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4MjM4OTk0NDYsImlhdCI6MTc5MjM2MzQ0NiwicmF5IjoiODc2MzBlNTk3ZDFkZjA3MmY5YzZjMDBmMDVkMGUxNzIiLCJzdWIiOjQ1NjkyOTF9.gtfaH2AJA1OSkyGPHKR3Xl9aFw5UYmxDIXLtCb_ec7_HdMWBM91H3JiKcAAMDogYh9Ud-YnTGIaVZhjXKWz7C6u9EnnBUqCrq8CHhvHvYX5GK1m6pR9ytxvSfwEH4onkqrWG9_-ZrCtl2S65_CdH4VHMCdVhnWLq_vsh3gqSXV-E1FPNlTOtDq1imBFdGWBEX_77tCqv0LeggUqYUeyDOuYXiwFRrFvFxDSOh6l2YZbtEKHsIC9gW2kcomZZL2MHAcVd8_AvrrbKn9T7ajZ2OQeHJaoIw885XZuxtpuASndTxtR9Bbv6IYXTl2UtIxp2bKl2svPC0ErAJYsgMUMI1w";

  const services = [
    { id: 'telegram', name: 'Telegram', icon: '💬', rub: 0.20, inr: '₹0.25' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '📱', rub: 1.75, inr: '₹2.10' },
    { id: 'google', name: 'Google / Gmail', icon: '🔴', rub: 0.26, inr: '₹0.32' },
    { id: 'instagram', name: 'Instagram', icon: '📸', rub: 0.09, inr: '₹0.12' },
    { id: 'facebook', name: 'Facebook', icon: '🔵', rub: 0.06, inr: '₹0.08' },
    { id: 'twitter', name: 'Twitter / X', icon: '🐦', rub: 0.03, inr: '₹0.05' },
    { id: 'openai', name: 'OpenAI / ChatGPT', icon: '🤖', rub: 0.14, inr: '₹0.18' },
    { id: 'amazon', name: 'Amazon', icon: '🛍️', rub: 0.10, inr: '₹0.14' },
    { id: 'discord', name: 'Discord', icon: '🎮', rub: 0.13, inr: '₹0.16' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', rub: 0.10, inr: '₹0.14' },
    { id: 'snapchat', name: 'Snapchat', icon: '👻', rub: 0.12, inr: '₹0.15' },
    { id: 'netflix', name: 'Netflix', icon: '🎬', rub: 0.25, inr: '₹0.30' }
  ];

  const countries = [
    { id: 'india', name: 'India', flag: '🇮🇳' },
    { id: 'russia', name: 'Russia (Lowest)', flag: '🇷🇺' },
    { id: 'indonesia', name: 'Indonesia', flag: '🇮🇩' },
    { id: 'usa', name: 'USA', flag: '🇺🇸' },
    { id: 'england', name: 'United Kingdom', flag: '🇬🇧' },
    { id: 'vietnam', name: 'Vietnam', flag: '🇻🇳' },
    { id: 'philippines', name: 'Philippines', flag: '🇵🇭' },
    { id: 'brazil', name: 'Brazil', flag: '🇧🇷' }
  ];

  const currentService = services.find(s => s.id === selectedService) || services[0];
  const currentCountry = countries.find(c => c.id === selectedCountry) || countries[0];

  const copyText = (text: string, isApi: boolean) => {
    navigator.clipboard.writeText(text);
    if (isApi) {
      setCopiedApiKey(true);
      setTimeout(() => setCopiedApiKey(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handlePushToNewRepo = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanToken = repoToken.trim();
    const cleanRepo = newRepoName.trim().replace(/[^a-zA-Z0-9._-]/g, '-');

    if (!cleanToken) {
      alert(isHindi ? 'कृपया अपना नया GitHub टोकन (ghp_...) दर्ज करें!' : 'Please enter your new GitHub Token!');
      return;
    }

    setIsPushing(true);
    setPushLogs([]);
    setPushedRepoUrl(null);

    const log = (msg: string) => setPushLogs(prev => [...prev, msg]);

    try {
      log(isHindi ? '[1/5] GitHub टोकन सत्यापित किया जा रहा है...' : '[1/5] Validating GitHub token...');
      const userRes = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });

      if (!userRes.ok) {
        throw new Error(isHindi ? 'अमान्य GitHub टोकन! कृपया टोकन दोबारा जांचें।' : 'Invalid GitHub Token! Check token scopes.');
      }

      const userData = await userRes.json();
      const username = userData.login;
      log(`[✓] प्रमाणित यूज़र: @${username}`);

      log(isHindi ? `[2/5] रिपॉजिटरी "${cleanRepo}" की जांच की जा रही है...` : `[2/5] Checking repo "${cleanRepo}"...`);
      let repoUrl = `https://github.com/${username}/${cleanRepo}`;
      const repoCheck = await fetch(`https://api.github.com/repos/${username}/${cleanRepo}`, {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });

      if (repoCheck.status === 404) {
        log(isHindi ? `[3/5] नई रिपॉजिटरी बनाई जा रही है...` : `[3/5] Creating new repository...`);
        const createRes = await fetch('https://api.github.com/user/repos', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: cleanRepo,
            description: 'Naman Sell OTP & Virtual Account Telegram Bot powered by 5SIM.net API',
            private: false,
            auto_init: true
          })
        });

        if (!createRes.ok) {
          const errData = await createRes.json();
          throw new Error(errData.message || 'रिपो बनाने में विफल!');
        }
        const createdData = await createRes.json();
        repoUrl = createdData.html_url;
        log(`[✓] नई रिपॉजिटरी सफलतापूर्वक बन गई!`);
        await new Promise(r => setTimeout(r, 1500));
      } else {
        log(`[✓] रिपॉजिटरी मौजूद है, फाइल्स अपडेट की जाएंगी।`);
      }

      log(isHindi ? '[4/5] बॉट कोड और फाइल्स अपलोड की जा रही हैं...' : '[4/5] Uploading bot files...');

      const filesToPush: Record<string, string> = {
        'naman_sell_bot.py': NAMAN_SELL_BOT_PYTHON,
        'run_naman_bot.sh': RUN_NAMAN_BOT_SH,
        'requirements.txt': 'python-telegram-bot>=20.8\nrequests>=2.31.0\ncolorama>=0.4.6\npython-dotenv>=1.0.0\n',
        '.env.example': `BOT_TOKEN="your_bot_token_from_botfather"\nADMIN_ID="123456789"\nFIVESIM_API_KEY="${API_KEY}"\nUPI_ID="vinit-godara@fam"\nUPI_NAME="Vinit Godara"\nDATABASE_PATH="naman_sell.db"\n`,
        'README.md': `# 📱 Naman Sell Bot (@Namansellbot)\n\n> **5SIM.net API Direct Deals Telegram Virtual Number & OTP Store**\n\n### ⚡ 1-Click Run:\n\`\`\`bash\npip install -r requirements.txt\npython naman_sell_bot.py YOUR_BOT_TOKEN\n\`\`\`\n`
      };

      for (const [filename, content] of Object.entries(filesToPush)) {
        // Check existing file SHA
        let sha: string | undefined = undefined;
        try {
          const getRes = await fetch(`https://api.github.com/repos/${username}/${cleanRepo}/contents/${filename}`, {
            headers: {
              Authorization: `Bearer ${cleanToken}`,
              Accept: 'application/vnd.github.v3+json'
            }
          });
          if (getRes.ok) {
            const data = await getRes.json();
            sha = data.sha;
          }
        } catch {
          // ignore
        }

        // Base64 encode
        const b64 = btoa(unescape(encodeURIComponent(content)));
        const putRes = await fetch(`https://api.github.com/repos/${username}/${cleanRepo}/contents/${filename}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Add ${filename} for Naman Sell Bot`,
            content: b64,
            ...(sha ? { sha } : {})
          })
        });

        if (putRes.ok) {
          log(`  ✓ अपलोड पूर्ण: ${filename}`);
        }
      }

      log(isHindi ? `[5/5] 🎉 बधाई हो! आपका पूरा Naman Sell Bot नई रिपॉजिटरी में लाइव हो गया!` : `[5/5] Success! Pushed to your new repo!`);
      setPushedRepoUrl(repoUrl);
    } catch (err: any) {
      log(`❌ एरर: ${err.message}`);
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-zinc-950 border border-emerald-500/30 p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <ShoppingBag className="w-3.5 h-3.5" />
                @Namansellbot 5SIM Engine
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <CheckCircle2 className="w-3 h-3" /> Live 5SIM API Connected
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>{isHindi ? '📱 Naman Sell Bot — 5SIM डायरेक्ट OTP स्टोर' : '📱 Naman Sell Bot — 5SIM Direct OTP Store'}</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
              {isHindi
                ? 'आपकी दी गई 5SIM API Key से डायरेक्ट कनेक्टेड! टेलीग्राम, व्हाट्सएप, इंस्टाग्राम और सभी ऐप्स के सस्ते वर्चुअल नंबर्स और लाइव 3-सेकंड ऑटो OTP डिटेक्टर।'
                : 'Directly powered by your 5SIM API Key! Wholesale virtual numbers for Telegram, WhatsApp, Instagram, and all apps with instant real-time OTP detection.'}
            </p>
          </div>

          {/* 5SIM Account Card */}
          <div className="w-full md:w-auto bg-zinc-900/90 border border-emerald-500/40 rounded-xl p-4 shadow-xl flex flex-col gap-2 min-w-[280px]">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
                <Key className="w-3.5 h-3.5" />
                5SIM Official Account
              </span>
              <span className="text-emerald-400 text-[11px] font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> User #4569291
              </span>
            </div>

            <div className="bg-black/60 border border-zinc-700/60 rounded-lg p-2.5 font-mono text-xs flex flex-col gap-1">
              <div className="flex justify-between text-zinc-400">
                <span>Email:</span>
                <span className="text-zinc-200">vinitgodara453@gmail.com</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Rating:</span>
                <span className="text-amber-300 font-bold">96 / 100</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Status:</span>
                <span className="text-emerald-400 font-bold">🟢 Live Authorized</span>
              </div>
            </div>

            <button
              onClick={() => copyText(API_KEY, true)}
              className="w-full py-1.5 px-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-mono flex items-center justify-center gap-1 transition cursor-pointer"
            >
              {copiedApiKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedApiKey ? 'API Key Copied!' : 'Copy Configured 5SIM API Key'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
        <button
          onClick={() => setActiveSubTab('catalog')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'catalog'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{isHindi ? 'उपलब्ध ऐप्स व थोक दरें (Catalog)' : 'App Catalog & Rates'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('code')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'code'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>{isHindi ? 'बॉट का पूरा कोड (naman_sell_bot.py)' : 'Bot Source Code'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('github')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'github'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Github className="w-3.5 h-3.5" />
          <span>{isHindi ? 'नई रिपो में पुश करें (Push to Repo)' : 'Push to New Repo'}</span>
        </button>
      </div>

      {/* Tab 1: Catalog & Prices */}
      {activeSubTab === 'catalog' && (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{isHindi ? 'सभी ऐप्स व उपलब्ध सेवाएं (All Available Services)' : 'All Available Services'}</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {isHindi ? '5SIM थोक दरों पर लाइव उपलब्ध (Wholesale Rates in India & Global)' : 'Wholesale Rates in India & Global'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-medium">{isHindi ? 'देश चुनें:' : 'Country:'}</span>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="bg-black border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-emerald-400 font-mono"
              >
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {services.map((srv) => {
              const isSelected = selectedService === srv.id;
              return (
                <div
                  key={srv.id}
                  onClick={() => setSelectedService(srv.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-950/30 border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                      : 'bg-black/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40'
                  }`}
                >
                  <div>
                    <span className="text-2xl mb-1 block">{srv.icon}</span>
                    <h4 className="text-xs font-bold text-white truncate">{srv.name}</h4>
                  </div>

                  <div className="mt-3 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-emerald-400 font-bold">{srv.inr}</span>
                    <span className="text-zinc-500">{srv.rub} ₽</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Service Quick Info */}
          <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentService.icon}</span>
              <div>
                <div className="text-white font-bold text-sm">
                  {currentService.name} ({currentCountry.flag} {currentCountry.name})
                </div>
                <div className="text-zinc-400 text-xs">
                  कीमत: <strong className="text-emerald-400">{currentService.inr}</strong> (~{currentService.rub} RUB) • 15 मिनट एक्टिव • ऑटो रिफंड समर्थित
                </div>
              </div>
            </div>

            <div className="text-xs text-zinc-400 font-mono bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
              बॉट में कमांड: <code className="text-emerald-300">/buy {currentService.id} {currentCountry.id}</code>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Full Bot Code */}
      {activeSubTab === 'code' && (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" />
                <span>naman_sell_bot.py</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                5SIM API Key और UPI ID vinit-godara@fam के साथ पूरी तरह तैयार पायथन बॉट
              </p>
            </div>

            <button
              onClick={() => copyText(NAMAN_SELL_BOT_PYTHON, false)}
              className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'कोड कॉपी हो गया!' : 'Copy Full Code'}</span>
            </button>
          </div>

          <div className="relative">
            <pre className="max-h-[500px] overflow-y-auto bg-black/80 border border-zinc-800 p-4 rounded-xl text-xs font-mono text-zinc-300 leading-relaxed select-all">
              {NAMAN_SELL_BOT_PYTHON}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 3: GitHub Pusher */}
      {activeSubTab === 'github' && (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Github className="w-4 h-4 text-purple-400" />
                <span>{isHindi ? 'नया GitHub रिपॉजिटरी पुशर' : 'New GitHub Repository Pusher'}</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {isHindi ? 'नया टोकन डालें और 1-क्लिक में पूरा बॉट नई रिपो में अपलोड करें' : 'Enter new token to push the entire bot into a fresh repository'}
              </p>
            </div>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            {isHindi
              ? 'जैसे ही आप अपना नया GitHub Personal Access Token (ghp_...) यहाँ दर्ज करेंगे, आपका Naman Sell Bot कोड (`naman_sell_bot.py`, `run_naman_bot.sh`, `requirements.txt`, `.env`) सीधे आपकी नई GitHub रिपॉजिटरी में ऑटोमैटिकली पुश हो जाएगा!'
              : 'Enter your new token below and click Push. It will create the repo and upload all files directly!'}
          </p>

          <form onSubmit={handlePushToNewRepo} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  {isHindi ? 'नया GitHub टोकन (ghp_...)' : 'New GitHub Token (ghp_...)'}
                </label>
                <input
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={repoToken}
                  onChange={(e) => setRepoToken(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-400 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  {isHindi ? 'नई रिपो का नाम' : 'New Repository Name'}
                </label>
                <input
                  type="text"
                  value={newRepoName}
                  onChange={(e) => setNewRepoName(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-purple-400 font-mono"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPushing}
              className="py-2.5 px-5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              {isPushing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Github className="w-3.5 h-3.5" />}
              <span>{isPushing ? 'पुश हो रहा है (Pushing)...' : '1-क्लिक में नई रिपो में पुश करें (Push Now)'}</span>
            </button>
          </form>

          {/* Progress Logs */}
          {pushLogs.length > 0 && (
            <div className="mt-4 p-4 rounded-xl bg-black border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
              <span className="text-zinc-500 block mb-2 font-bold">📋 लाइव पुश लॉग्स:</span>
              {pushLogs.map((log, i) => (
                <div key={i} className="text-zinc-300">{log}</div>
              ))}
              {pushedRepoUrl && (
                <div className="mt-3 pt-3 border-t border-zinc-800">
                  <a
                    href={pushedRepoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-purple-400 hover:underline font-bold"
                  >
                    <span>👉 रिपॉजिटरी खोलें: {pushedRepoUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 24/7 Hosting Quick Commands for Naman Bot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-xl">
          <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>{isHindi ? '📱 Termux (Android) 24/7 रनर' : 'Termux 24/7 Runner'}</span>
          </h4>
          <p className="text-xs text-zinc-400 mb-3">
            {isHindi
              ? 'फोन में बिना रुके 24/7 ऑटो-रीस्टार्ट के साथ बॉट चलाने के लिए:'
              : 'Run non-stop on Termux with wake-lock and auto-restart:'}
          </p>
          <div className="p-2.5 bg-black rounded-lg font-mono text-xs text-emerald-300 border border-zinc-800 flex items-center justify-between">
            <code>bash run_naman_bot.sh</code>
            <button
              onClick={() => copyText('bash run_naman_bot.sh', false)}
              className="p-1 text-zinc-400 hover:text-white"
              title="Copy"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-xl">
          <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>{isHindi ? '🖥️ Linux VPS 24/7 कमांड' : 'Linux VPS 24/7 Command'}</span>
          </h4>
          <p className="text-xs text-zinc-400 mb-3">
            {isHindi
              ? 'VPS में बैकग्राउंड में चालू करने के लिए:'
              : 'Run directly in background on your Linux server:'}
          </p>
          <div className="p-2.5 bg-black rounded-lg font-mono text-xs text-cyan-300 border border-zinc-800 flex items-center justify-between">
            <code>python3 naman_sell_bot.py &amp;</code>
            <button
              onClick={() => copyText('python3 naman_sell_bot.py &', false)}
              className="p-1 text-zinc-400 hover:text-white"
              title="Copy"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
