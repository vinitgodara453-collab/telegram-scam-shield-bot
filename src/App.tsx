import React, { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { ScamShieldStudio } from './components/ScamShieldStudio';
import { NamanSellBotStudio } from './components/NamanSellBotStudio';
import { VipMembershipCenter } from './components/VipMembershipCenter';
import { RealDetailsExplorer } from './components/RealDetailsExplorer';
import { TelegramFontEmojiStudio } from './components/TelegramFontEmojiStudio';
import { VpsDeploymentCenter } from './components/VpsDeploymentCenter';
import { GitHubPusher } from './components/GitHubPusher';
import { CodeViewer } from './components/CodeViewer';
import { ShieldCheck, Heart, Github, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('naman-bot');
  const [isHindi, setIsHindi] = useState(true);

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isHindi={isHindi}
        setIsHindi={setIsHindi}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {activeTab === 'naman-bot' && (
          <NamanSellBotStudio isHindi={isHindi} />
        )}

        {activeTab === 'scam-shield' && (
          <ScamShieldStudio isHindi={isHindi} />
        )}

        {activeTab === 'vip-plans' && (
          <VipMembershipCenter isHindi={isHindi} />
        )}

        {activeTab === 'details-lookup' && (
          <RealDetailsExplorer isHindi={isHindi} />
        )}

        {activeTab === 'fonts' && (
          <TelegramFontEmojiStudio isHindi={isHindi} />
        )}

        {activeTab === 'vps' && (
          <VpsDeploymentCenter isHindi={isHindi} />
        )}

        {activeTab === 'github' && (
          <GitHubPusher isHindi={isHindi} />
        )}

        {activeTab === 'code' && (
          <CodeViewer isHindi={isHindi} />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono font-medium text-zinc-300">
              Telegram AI Scam Shield Suite
            </span>
            <span className="text-zinc-600">•</span>
            <span>24/7 VPS Systemd Daemon Ready</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-500 flex items-center gap-1">
              Built for Community Safety <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" />
            </span>
            <button
              onClick={() => setActiveTab('github')}
              className="hover:text-emerald-400 transition flex items-center gap-1 cursor-pointer font-mono"
            >
              <Github className="w-3.5 h-3.5" />
              <span>{isHindi ? 'नई रिपो पुश' : 'Push New Repo'}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
