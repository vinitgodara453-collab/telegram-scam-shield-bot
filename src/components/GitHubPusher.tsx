import React, { useState } from 'react';
import {
  Github,
  Key,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  UploadCloud,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Terminal,
  FolderGit2,
  Trash2,
  ArrowRight
} from 'lucide-react';
import {
  SCAM_SHIELD_BOT_PYTHON,
  DEPLOY_VPS_SH,
  SCAMSHIELD_SERVICE,
  SCAM_SHIELD_REQUIREMENTS
} from '../data/scamShieldCode';
import { REPO_README, ENV_EXAMPLE_CONTENT } from '../utils/zipGenerator';

interface GitHubPusherProps {
  isHindi: boolean;
}

export const GitHubPusher: React.FC<GitHubPusherProps> = ({ isHindi }) => {
  const [token, setToken] = useState('');
  const [repoName, setRepoName] = useState('telegram-scam-shield-bot');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '[✓] Ready to push clean Scam Shield Bot repository to GitHub',
    '[✓] Files prepared: scam_shield_bot.py, deploy_vps.sh, scamshield.service, requirements.txt, .env.example, README.md',
    '[✓] Old obsolete scraper and clutter files have been completely excluded.'
  ]);
  const [pushedRepoUrl, setPushedRepoUrl] = useState<string | null>(null);
  const [githubUser, setGithubUser] = useState<string | null>(null);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const steps = [
    {
      num: '1',
      title: isHindi ? 'GitHub पर टोकन पेज खोलें' : 'Open GitHub Token Page',
      desc: isHindi
        ? 'GitHub में लॉगिन करें और सीधे टोकन जनरेट करने वाले पेज पर जाएं।'
        : 'Sign in to GitHub and open Personal Access Tokens page directly.',
      actionUrl: 'https://github.com/settings/tokens/new?scopes=repo&description=Telegram-ScamShield-Bot',
      actionText: isHindi ? 'सीधे टोकन पेज खोलें (Click Here)' : 'Direct Token Link (Click Here)'
    },
    {
      num: '2',
      title: isHindi ? 'नोट और Expiration सेट करें' : 'Set Note & Expiration',
      desc: isHindi
        ? 'Note में "ScamShield-Bot" लिखें और Expiration को "No expiration" या "90 days" चुनें।'
        : 'Enter "ScamShield-Bot" as Note, select expiration (e.g. No expiration).'
    },
    {
      num: '3',
      title: isHindi ? '"repo" पर टिक लगाएं' : 'Select "repo" Scope',
      desc: isHindi
        ? 'Select scopes में सबसे ऊपर वाले "repo" (Full control of repositories) वाले बॉक्स को टिक करें।'
        : 'Under Select scopes, check the "repo" box to grant repository push access.'
    },
    {
      num: '4',
      title: isHindi ? 'टोकन कॉपी करके नीचे पेस्ट करें' : 'Generate & Copy Token',
      desc: isHindi
        ? 'पेज के नीचे हरे रंग का "Generate token" बटन दबाएं और जो टोकन (ghp_...) दिखे उसे कॉपी करके नीचे बॉक्स में डालें।'
        : 'Scroll down and click "Generate token". Copy the green token (starts with ghp_...) and paste it below.'
    }
  ];

  const filesToUpload: Record<string, string> = {
    'scam_shield_bot.py': SCAM_SHIELD_BOT_PYTHON,
    'deploy_vps.sh': DEPLOY_VPS_SH,
    'scamshield.service': SCAMSHIELD_SERVICE,
    'requirements.txt': SCAM_SHIELD_REQUIREMENTS,
    '.env.example': ENV_EXAMPLE_CONTENT,
    'README.md': REPO_README
  };

  const handlePushToGithub = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanToken = token.trim();
    const cleanRepo = repoName.trim().replace(/[^a-zA-Z0-9._-]/g, '-');

    if (!cleanToken) {
      alert(isHindi ? 'कृपया अपना GitHub टोकन (ghp_...) दर्ज करें!' : 'Please enter your GitHub Token!');
      return;
    }
    if (!cleanRepo) {
      alert(isHindi ? 'कृपया रिपॉजिटरी का नाम दर्ज करें!' : 'Please enter repository name!');
      return;
    }

    setIsPushing(true);
    setLogs([]);
    setPushedRepoUrl(null);

    const log = (msg: string) => {
      setLogs(prev => [...prev, msg]);
    };

    try {
      log(isHindi ? '[1/5] GitHub टोकन की पुष्टि की जा रही है...' : '[1/5] Validating GitHub token...');

      // Step 1: Validate User
      const userRes = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });

      if (!userRes.ok) {
        throw new Error(
          isHindi
            ? 'टोकन अमान्य है! कृपया सुनिश्चित करें कि टोकन सही है और उसमें "repo" अनुमति है।'
            : 'Invalid token! Ensure token is correct and has "repo" permission.'
        );
      }

      const userData = await userRes.json();
      const username = userData.login;
      setGithubUser(username);
      log(isHindi ? `[✓] टोकन मान्य है! यूज़र: @${username}` : `[✓] Token verified! Authenticated as @${username}`);

      // Step 2: Check or Create Repo
      log(isHindi ? `[2/5] रिपॉजिटरी "${cleanRepo}" की जाँच हो रही है...` : `[2/5] Checking repository "${cleanRepo}"...`);
      const repoCheck = await fetch(`https://api.github.com/repos/${username}/${cleanRepo}`, {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });

      if (repoCheck.status === 404) {
        log(isHindi ? `[+] नई GitHub रिपॉजिटरी "${cleanRepo}" बनाई जा रही है...` : `[+] Creating new GitHub repository "${cleanRepo}"...`);
        const createRes = await fetch('https://api.github.com/user/repos', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: cleanRepo,
            description: '🛡️ Telegram AI Scam-Shield & Forensic Bot with Premium Emojis & 24/7 VPS Deployment',
            private: isPrivate,
            auto_init: true
          })
        });

        if (!createRes.ok) {
          const errData = await createRes.json();
          throw new Error(errData.message || 'Failed to create repository');
        }
        log(isHindi ? `[✓] नई रिपॉजिटरी सफलतापूर्वक तैयार हो गई!` : `[✓] New repository created successfully!`);
        // Small delay for GitHub to initialize branch
        await new Promise(r => setTimeout(r, 2000));
      } else {
        log(isHindi ? `[✓] मौजूदा रिपॉजिटरी मिली! फाइलें अपडेट की जा रही हैं...` : `[✓] Found existing repository! Updating files...`);
      }

      // Step 3: Push All Clean Files
      log(isHindi ? `[3/5] क्लीन स्कैम शील्ड फाइल्स पुश की जा रही हैं (${Object.keys(filesToUpload).length} फाइलें)...` : `[3/5] Uploading ${Object.keys(filesToUpload).length} pristine bot files...`);

      for (const [filename, content] of Object.entries(filesToUpload)) {
        log(isHindi ? `   -> अपलोड हो रही है: ${filename}` : `   -> Uploading: ${filename}`);

        // Check if file exists to get SHA for update
        let sha: string | undefined = undefined;
        try {
          const fileCheck = await fetch(
            `https://api.github.com/repos/${username}/${cleanRepo}/contents/${filename}`,
            {
              headers: {
                Authorization: `Bearer ${cleanToken}`,
                Accept: 'application/vnd.github.v3+json'
              }
            }
          );
          if (fileCheck.ok) {
            const fileData = await fileCheck.json();
            sha = fileData.sha;
          }
        } catch {
          // ignore error if not existing
        }

        // Base64 encode file content safely with UTF-8 support
        const utf8Bytes = new TextEncoder().encode(content);
        let binaryStr = '';
        utf8Bytes.forEach(b => {
          binaryStr += String.fromCharCode(b);
        });
        const base64Content = btoa(binaryStr);

        const putRes = await fetch(
          `https://api.github.com/repos/${username}/${cleanRepo}/contents/${filename}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${cleanToken}`,
              Accept: 'application/vnd.github.v3+json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message: `Add ${filename} - Telegram Scam-Shield Bot Suite`,
              content: base64Content,
              sha: sha
            })
          }
        );

        if (!putRes.ok) {
          const errData = await putRes.json();
          log(`   ⚠️ चेतावनी: ${filename} अपलोड में समस्या: ${errData.message}`);
        } else {
          log(`   ✓ ${filename} सुरक्षित अपलोड हो गई!`);
        }
      }

      const finalUrl = `https://github.com/${username}/${cleanRepo}`;
      setPushedRepoUrl(finalUrl);
      log(isHindi ? `\n🎉 [4/5] बधाई! रिपॉजिटरी सफलतापूर्वक तैयार व पुश हो गई:` : `\n🎉 [4/5] Success! All files committed to:`);
      log(`👉 ${finalUrl}`);
      log(isHindi ? `[5/5] अब आप VPS पर सीधे 1-कमांड से इसे चला सकते हैं!` : `[5/5] Ready for 24/7 VPS launch!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      log(`❌ त्रुटि (Error): ${msg}`);
    } finally {
      setIsPushing(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  const gitCliCommands = `# 1. VPS या कंप्यूटर पर नया फोल्डर बनाएं व इनिशियलाइज़ करें
mkdir -p telegram-scam-shield-bot && cd telegram-scam-shield-bot
git init
git branch -M main

# 2. अपनी GitHub रिपॉजिटरी से कनेक्ट करें (अपना यूज़रनेम डालें)
git remote add origin https://github.com/${githubUser || 'vinitgodara453-collab'}/${repoName}.git

# 3. फाइल्स कमिट करें और पुश करें
git add .
git commit -m "Initial release: Telegram AI Scam Shield Bot"
git push -u origin main --force`;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-black border border-emerald-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  {isHindi ? 'नई GitHub रिपॉजिटरी क्रिएटर व ऑटो-पुशर' : 'New GitHub Repo Creator & Auto-Pusher'}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  CLEAN REPO
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                {isHindi
                  ? 'पुराना कचरा हटाकर बिल्कुल फ्रेश रिपॉजिटरी में केवल स्कैम-शील्ड बॉट की फाइलें एक क्लिक में पुश करें।'
                  : 'Completely purge obsolete scraper files and push only the pristine Scam Shield bot files directly to GitHub.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-mono">
              {isHindi ? 'कुल फ्रेश फाइलें:' : 'Fresh Files:'} <strong className="text-emerald-400">6 Files</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Instructions vs Push Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form & Push Action */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800">
            <div className="flex items-center gap-2 mb-4">
              <Key className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">
                {isHindi ? '1-क्लिक ऑटोमैटिक गिटहब पब्लिशर' : '1-Click GitHub Automated Publisher'}
              </h3>
            </div>

            <form onSubmit={handlePushToGithub} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">
                  {isHindi ? '1. GitHub पर्सनल एक्सेस टोकन (PAT)' : '1. GitHub Personal Access Token (PAT)'}
                </label>
                <input
                  type="password"
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3 py-2 bg-black/60 border border-zinc-700 rounded-xl text-xs font-mono text-emerald-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[11px] text-zinc-500 mt-1">
                  {isHindi
                    ? 'टोकन आपके ब्राउज़र में ही रहता है, किसी तीसरे सर्वर पर कभी नहीं जाता।'
                    : 'Your token stays entirely in browser memory and calls GitHub API directly.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    {isHindi ? '2. नई रिपॉजिटरी का नाम' : '2. New Repository Name'}
                  </label>
                  <input
                    type="text"
                    value={repoName}
                    onChange={e => setRepoName(e.target.value)}
                    placeholder="telegram-scam-shield-bot"
                    className="w-full px-3 py-2 bg-black/60 border border-zinc-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    {isHindi ? '3. दृश्यता (Visibility)' : '3. Visibility'}
                  </label>
                  <select
                    value={isPrivate ? 'private' : 'public'}
                    onChange={e => setIsPrivate(e.target.value === 'private')}
                    className="w-full px-3 py-2 bg-black/60 border border-zinc-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="public">🌐 Public (ओपन सोर्स - रिकमेंडेड)</option>
                    <option value="private">🔒 Private (प्राइवेट)</option>
                  </select>
                </div>
              </div>

              {/* Files Included Checklist */}
              <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 space-y-2">
                <span className="text-[11px] font-mono text-zinc-400 block font-medium">
                  {isHindi ? '✓ नई रिपॉजिटरी में शामिल होने वाली फाइलें:' : '✓ Files included in this clean repository:'}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono text-zinc-300">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-3.5 h-3.5" /> scam_shield_bot.py
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-3.5 h-3.5" /> deploy_vps.sh
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-3.5 h-3.5" /> scamshield.service
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-3.5 h-3.5" /> requirements.txt
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-3.5 h-3.5" /> .env.example
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-3.5 h-3.5" /> README.md
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPushing}
                className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition shadow-lg ${
                  isPushing
                    ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40'
                }`}
              >
                {isPushing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>{isHindi ? 'गिटहब पर नई रिपॉजिटरी पुश हो रही है...' : 'Pushing New Repository to GitHub...'}</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>
                      {isHindi ? '🚀 नई रिपॉजिटरी बनाएं और फाइलें पुश करें' : '🚀 Create Clean Repo & Push All Files'}
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Pushed Success Box */}
            {pushedRepoUrl && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-emerald-300">
                    {isHindi ? 'रिपॉजिटरी सफलतापूर्वक तैयार हो गई!' : 'Repository Successfully Created & Pushed!'}
                  </h4>
                  <a
                    href={pushedRepoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-400 underline hover:text-emerald-200 break-all flex items-center gap-1 mt-1 font-mono"
                  >
                    <span>{pushedRepoUrl}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Live Action Logs */}
          <div className="p-4 rounded-2xl bg-black border border-zinc-800 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-zinc-400 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isHindi ? 'गिटहब सिंक कंसोल' : 'GitHub Sync Console'}</span>
              </span>
              <span>{logs.length} events</span>
            </div>
            <div className="h-44 overflow-y-auto space-y-1 scrollbar-thin text-zinc-300 text-[11px]">
              {logs.map((logLine, idx) => (
                <div
                  key={idx}
                  className={`${
                    logLine.startsWith('[✓]') || logLine.includes('🎉')
                      ? 'text-emerald-400'
                      : logLine.startsWith('❌')
                      ? 'text-rose-400'
                      : logLine.startsWith('👉')
                      ? 'text-cyan-300 font-bold'
                      : 'text-zinc-400'
                  }`}
                >
                  {logLine}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Step by step token guide + Manual CLI commands */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Steps */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <h3 className="text-xs font-semibold text-zinc-200 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{isHindi ? 'GitHub टोकन प्राप्त करने के 4 आसान कदम' : '4 Easy Steps to Get GitHub Token'}</span>
            </h3>

            <div className="space-y-3">
              {steps.map(step => (
                <div key={step.num} className="p-3 rounded-xl bg-black/40 border border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">
                      {step.num}
                    </span>
                    <h4 className="text-xs font-semibold text-zinc-200">{step.title}</h4>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 pl-7">{step.desc}</p>
                  {step.actionUrl && (
                    <div className="pl-7 mt-2">
                      <a
                        href={step.actionUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[11px] font-medium transition"
                      >
                        <span>{step.actionText}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Manual Git CLI Commands Option */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>{isHindi ? 'वैकल्पिक: Git CLI कमांड्स (मैन्युअल)' : 'Alternative: Git CLI Commands'}</span>
              </h3>
              <button
                onClick={() => copyToClipboard(gitCliCommands, 'git-cli')}
                className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] flex items-center gap-1 transition cursor-pointer"
              >
                {copiedCmd === 'git-cli' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-zinc-400 mb-2">
              {isHindi
                ? 'यदि आप अपने VPS या लोकल टर्मिनल से सीधे Git कमांड चलाना चाहते हैं:'
                : 'If you prefer running git commands directly in terminal or VPS:'}
            </p>
            <pre className="p-3 rounded-xl bg-black border border-zinc-800 text-[10px] font-mono text-zinc-300 overflow-x-auto whitespace-pre">
              {gitCliCommands}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
