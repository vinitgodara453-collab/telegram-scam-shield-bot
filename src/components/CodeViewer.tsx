import React, { useState } from 'react';
import { Code, Download, Copy, Check, FileCode, Terminal, Sparkles, FolderArchive, ShieldAlert, Cpu } from 'lucide-react';
import {
  SCAM_SHIELD_BOT_PYTHON,
  DEPLOY_VPS_SH,
  SCAMSHIELD_SERVICE,
  SCAM_SHIELD_REQUIREMENTS
} from '../data/scamShieldCode';
import { downloadCleanShieldRepoZip, downloadSingleFile, REPO_README, ENV_EXAMPLE_CONTENT } from '../utils/zipGenerator';

interface CodeViewerProps {
  isHindi: boolean;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ isHindi }) => {
  const [activeTab, setActiveTab] = useState<'bot' | 'deploy' | 'service' | 'requirements' | 'env' | 'readme'>('bot');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const files = {
    bot: {
      name: 'scam_shield_bot.py',
      content: SCAM_SHIELD_BOT_PYTHON,
      lang: 'python',
      badge: 'Core Bot (Premium Emojis & SQLite)'
    },
    deploy: {
      name: 'deploy_vps.sh',
      content: DEPLOY_VPS_SH,
      lang: 'bash',
      badge: '1-Click VPS Installer'
    },
    service: {
      name: 'scamshield.service',
      content: SCAMSHIELD_SERVICE,
      lang: 'ini',
      badge: 'Systemd 24/7 Daemon'
    },
    requirements: {
      name: 'requirements.txt',
      content: SCAM_SHIELD_REQUIREMENTS,
      lang: 'text',
      badge: 'Python Dependencies'
    },
    env: {
      name: '.env.example',
      content: ENV_EXAMPLE_CONTENT,
      lang: 'bash',
      badge: 'Config & Emoji IDs'
    },
    readme: {
      name: 'README.md',
      content: REPO_README,
      lang: 'markdown',
      badge: 'Hindi + English Docs'
    }
  };

  const currentFile = files[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      await downloadCleanShieldRepoZip();
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-black border border-zinc-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  {isHindi ? 'क्लीन स्कैम-शील्ड बॉट सोर्स कोड' : 'Clean Scam-Shield Bot Source Code'}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  100% PRODUCTION READY
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {isHindi
                  ? 'सभी पुराने अप्रचलित कोड हटा दिए गए हैं। यह केवल फ्रेश स्कैम शील्ड बॉट और VPS होस्टिंग फाइल्स का सेट है।'
                  : 'All legacy scrapers removed. Contains only pristine Telegram Anti-Scam Bot & VPS deployment files.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition cursor-pointer"
            >
              <FolderArchive className="w-4 h-4" />
              <span>{isZipping ? 'Generating ZIP...' : isHindi ? 'डाउनलोड न्यू रेपो ज़िप (.ZIP)' : 'Download Clean Repo (.ZIP)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* File Tabs & Actions */}
      <div className="border border-zinc-800 rounded-2xl bg-zinc-950 overflow-hidden shadow-2xl">
        <div className="p-3 bg-zinc-900/90 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          {/* File selector buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {(Object.keys(files) as (keyof typeof files)[]).map(key => {
              const file = files[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer ${
                    isActive
                      ? 'bg-zinc-800 text-emerald-400 border border-zinc-700 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>{file.name}</span>
                </button>
              );
            })}
          </div>

          {/* Copy and Download File Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy File</span>
                </>
              )}
            </button>
            <button
              onClick={() => downloadSingleFile(currentFile.name, currentFile.content)}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save File</span>
            </button>
          </div>
        </div>

        {/* File Header Details */}
        <div className="px-4 py-2.5 bg-zinc-900/40 border-b border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="text-zinc-200 font-semibold">{currentFile.name}</span>
            <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">
              {currentFile.badge}
            </span>
          </div>
          <span className="text-[11px] text-zinc-500">
            {currentFile.content.split('\n').length} lines
          </span>
        </div>

        {/* Code Content Area */}
        <div className="p-4 bg-black/90 font-mono text-xs text-zinc-200 max-h-[550px] overflow-y-auto overflow-x-auto scrollbar-thin">
          <pre className="whitespace-pre leading-relaxed select-text">
            {currentFile.content}
          </pre>
        </div>
      </div>
    </div>
  );
};
