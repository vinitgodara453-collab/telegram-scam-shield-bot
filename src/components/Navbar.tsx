import React from 'react';
import {
  ShieldAlert,
  Server,
  Github,
  Code,
  Download,
  Globe,
  Sparkles,
  Bot,
  Crown,
  Search,
  ShoppingBag
} from 'lucide-react';
import { downloadCleanShieldRepoZip } from '../utils/zipGenerator';

export type TabType = 'naman-bot' | 'scam-shield' | 'vip-plans' | 'details-lookup' | 'fonts' | 'vps' | 'github' | 'code';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isHindi: boolean;
  setIsHindi: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isHindi,
  setIsHindi
}) => {
  const tabs: { id: TabType; label: string; labelHi: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'naman-bot',
      label: '📱 @Namansellbot (5SIM)',
      labelHi: '📱 Naman Sell Bot (5SIM)',
      icon: <ShoppingBag className="w-4 h-4 text-emerald-400" />,
      badge: '5SIM API'
    },
    {
      id: 'scam-shield',
      label: '🛡️ AI Scam Shield',
      labelHi: '🛡️ AI स्कैम शील्ड',
      icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />,
      badge: 'BOT'
    },
    {
      id: 'vip-plans',
      label: '👑 VIP Plans & UPI QR',
      labelHi: '👑 VIP प्लान्स व UPI QR',
      icon: <Crown className="w-4 h-4 text-amber-400" />,
      badge: '₹30-₹100'
    },
    {
      id: 'details-lookup',
      label: '🔍 Real Details & OSINT',
      labelHi: '🔍 रियल डिटेल्स खोजक',
      icon: <Search className="w-4 h-4 text-cyan-400" />,
      badge: 'LIVE RBI/IP'
    },
    {
      id: 'fonts',
      label: '💎 VIP Fonts & Emojis',
      labelHi: '💎 VIP फॉन्ट व इमोजी',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      badge: 'VIP'
    },
    {
      id: 'vps',
      label: '⚡ 24/7 Hosting (Termux/Cloud)',
      labelHi: '⚡ 24/7 होस्टिंग (Termux/Cloud)',
      icon: <Server className="w-4 h-4 text-cyan-400" />,
      badge: '24/7'
    },
    {
      id: 'github',
      label: '🐙 GitHub Pusher',
      labelHi: '🐙 GitHub पुशर',
      icon: <Github className="w-4 h-4 text-purple-400" />,
      badge: 'CLEAN'
    },
    {
      id: 'code',
      label: '💻 Source Code & ZIP',
      labelHi: '💻 सोर्स कोड व ज़िप',
      icon: <Code className="w-4 h-4 text-amber-400" />
    }
  ];

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md sticky top-0 z-50">
      {/* Top Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-zinc-100 tracking-wide font-mono">
                TELEGRAM SCAM SHIELD
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                v2.0 • VPS READY
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 truncate hidden sm:block">
              {isHindi
                ? 'टेलीग्राम प्रीमियम इमोजी सपोर्ट • ऑटोमैटिक स्कैमर डिटेक्टर • 24/7 VPS बैकग्राउंड सर्विस'
                : 'Telegram Premium Custom Emojis • Forensic Anti-Scam Bot • 24/7 Ubuntu VPS Daemon'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Language Toggle */}
          <button
            onClick={() => setIsHindi(!isHindi)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:border-zinc-700 transition cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium">{isHindi ? 'English' : 'हिंदी'}</span>
          </button>

          {/* Quick Clean Repo ZIP Download */}
          <button
            onClick={() => downloadCleanShieldRepoZip()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-950/40 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isHindi ? 'न्यू रेपो ज़िप (.ZIP)' : 'Download Repo (.ZIP)'}
            </span>
            <span className="sm:hidden">ZIP</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 overflow-x-auto scrollbar-none border-t border-zinc-800/60 py-1.5">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-zinc-800 text-emerald-300 font-semibold shadow-sm border border-zinc-700/60'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              {tab.icon}
              <span>{isHindi ? tab.labelHi : tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
