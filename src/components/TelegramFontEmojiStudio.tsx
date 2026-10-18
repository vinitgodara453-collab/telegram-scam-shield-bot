import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Type,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  Flame,
  Award
} from 'lucide-react';

interface TelegramFontEmojiStudioProps {
  isHindi: boolean;
}

export const TelegramFontEmojiStudio: React.FC<TelegramFontEmojiStudioProps> = ({ isHindi }) => {
  const [inputText, setInputText] = useState('Scam Shield VIP Bot');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Unicode font transformers
  const toBoldSans = (str: string) => {
    const res: string[] = [];
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      if (c >= 65 && c <= 90) res.push(String.fromCodePoint(0x1d5d4 + (c - 65)));
      else if (c >= 97 && c <= 122) res.push(String.fromCodePoint(0x1d5ee + (c - 97)));
      else if (c >= 48 && c <= 57) res.push(String.fromCodePoint(0x1d7ec + (c - 48)));
      else res.push(str[i]);
    }
    return res.join('');
  };

  const toSmallCaps = (str: string) => {
    const norm = 'abcdefghijklmnopqrstuvwxyz';
    const caps = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ';
    let res = '';
    for (let i = 0; i < str.length; i++) {
      const idx = norm.indexOf(str[i].toLowerCase());
      res += idx !== -1 ? caps[idx] : str[i];
    }
    return res;
  };

  const toMonospace = (str: string) => {
    const res: string[] = [];
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      if (c >= 65 && c <= 90) res.push(String.fromCodePoint(0x1d670 + (c - 65)));
      else if (c >= 97 && c <= 122) res.push(String.fromCodePoint(0x1d68a + (c - 97)));
      else if (c >= 48 && c <= 57) res.push(String.fromCodePoint(0x1d7f6 + (c - 48)));
      else res.push(str[i]);
    }
    return res.join('');
  };

  const toGothic = (str: string) => {
    const gothicMap: Record<string, string> = {
      A: '𝔄', B: '𝔅', C: 'ℭ', D: '𝔇', E: '𝔈', F: '𝔉', G: '𝔊', H: 'ℌ', I: 'ℑ', J: '𝔍',
      K: '𝔎', L: '𝔏', M: '𝔐', N: '𝔑', O: '𝔒', P: '𝔓', Q: '𝔔', R: 'ℜ', S: '𝔖', T: '𝔗',
      U: '𝔘', V: '𝔙', W: '𝔚', X: '𝔛', Y: '𝔜', Z: 'ℨ',
      a: '𝔞', b: '𝔟', c: '𝔠', d: '𝔡', e: '𝔢', f: '𝔣', g: '𝔤', h: '𝔥', i: '𝔦', j: '𝔧',
      k: '𝔨', l: '𝔩', m: '𝔪', n: '𝔫', o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯', s: '𝔰', t: '𝔱',
      u: '𝔲', v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔩'
    };
    return str.split('').map(char => gothicMap[char] || char).join('');
  };

  const toBubble = (str: string) => {
    const res: string[] = [];
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      if (c >= 65 && c <= 90) res.push(String.fromCodePoint(0x24b6 + (c - 65)));
      else if (c >= 97 && c <= 122) res.push(String.fromCodePoint(0x24d0 + (c - 97)));
      else if (c >= 49 && c <= 57) res.push(String.fromCodePoint(0x2460 + (c - 49)));
      else if (c === 48) res.push('⓪');
      else res.push(str[i]);
    }
    return res.join('');
  };

  const toDoubleStruck = (str: string) => {
    const dsMap: Record<string, string> = {
      C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ'
    };
    const res: string[] = [];
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      if (dsMap[str[i]]) res.push(dsMap[str[i]]);
      else if (c >= 65 && c <= 90) res.push(String.fromCodePoint(0x1d538 + (c - 65)));
      else if (c >= 97 && c <= 122) res.push(String.fromCodePoint(0x1d552 + (c - 97)));
      else if (c >= 48 && c <= 57) res.push(String.fromCodePoint(0x1d7d8 + (c - 48)));
      else res.push(str[i]);
    }
    return res.join('');
  };

  const fontOptions = [
    {
      id: 'bold-sans',
      name: 'Mathematical Bold Sans (VIP Header)',
      desc: isHindi ? 'टेलीग्राम बॉट के हेडर व मुख्य टाइटल के लिए सर्वश्रेष्ठ' : 'Best for Telegram headers & highlights',
      output: toBoldSans(inputText),
      badge: 'POPULAR'
    },
    {
      id: 'small-caps',
      name: 'Small-Caps (Button & Menu Style)',
      desc: isHindi ? 'बटन के नाम और मेनू ऑप्शन्स को लग्जरी लुक देने के लिए' : 'Used for VIP inline keyboard button titles',
      output: toSmallCaps(inputText),
      badge: 'BUTTONS'
    },
    {
      id: 'monospace',
      name: 'Typewriter / Monospace',
      desc: isHindi ? 'कोड, यूजरनेम और टेक्निकल डिटेल्स के लिए' : 'Clean monospace aesthetic for IDs & commands',
      output: toMonospace(inputText)
    },
    {
      id: 'gothic',
      name: 'Gothic / Fraktur',
      desc: isHindi ? 'रॉयल व वीआईपी चैनल स्टाइल' : 'Royal vintage flair for branding',
      output: toGothic(inputText)
    },
    {
      id: 'double-struck',
      name: 'Blackboard / Double Struck',
      desc: isHindi ? 'एस्थेटिक व मॉडर्न लुक' : 'Double stroked modern aesthetic',
      output: toDoubleStruck(inputText)
    },
    {
      id: 'bubble',
      name: 'Circled Bubble',
      desc: isHindi ? 'सर्कल्ड लेटर्स व आकर्षक बुलेट' : 'Circled characters for decorative titles',
      output: toBubble(inputText)
    },
    {
      id: 'tg-blockquote',
      name: 'Telegram Expandable Blockquote',
      desc: isHindi ? 'टेलीग्राम का नया एक्सपांडेबल कार्ड फॉर्मेट' : 'Telegram 10+ clickable expandable quote format',
      output: `<blockquote expandable>${inputText}</blockquote>`,
      isHtml: true,
      badge: 'NEW'
    },
    {
      id: 'tg-spoiler',
      name: 'Telegram Spoiler Alert',
      desc: isHindi ? 'टैप करने पर दिखने वाला हिडन टेक्स्ट' : 'Hidden tap-to-reveal spoiler effect',
      output: `<tg-spoiler>${inputText}</tg-spoiler>`,
      isHtml: true
    }
  ];

  const premiumEmojiPack = [
    {
      id: '5368324170671202286',
      name: 'Cyber Shield',
      fallback: '🛡️',
      desc: 'एआई साइबर शील्ड'
    },
    {
      id: '5449747923766094392',
      name: 'Verified Tick',
      fallback: '✅',
      desc: 'एनिमेटेड ग्रीन टिक'
    },
    {
      id: '5370908842851965692',
      name: 'Siren Alert',
      fallback: '🚨',
      desc: 'क्रिटिकल स्कैमर अलार्म'
    },
    {
      id: '5371077754646307137',
      name: 'Trending Flame',
      fallback: '🔥',
      desc: 'हॉट व वायरल टैग'
    },
    {
      id: '5370724838722248557',
      name: 'AI Robot',
      fallback: '🤖',
      desc: 'स्मार्ट रोबोट'
    },
    {
      id: '5409166649855057077',
      name: 'Telegram Star',
      fallback: '⭐',
      desc: 'टेलीग्राम स्टार'
    },
    {
      id: '5411270216690704481',
      name: 'VIP Diamond',
      fallback: '💎',
      desc: 'प्रीमियम डायमंड'
    },
    {
      id: '5472164874886772598',
      name: 'Royal Crown',
      fallback: '👑',
      desc: 'शाही क्राउन'
    },
    {
      id: '5373142079070410427',
      name: 'High Voltage',
      fallback: '⚡',
      desc: 'बिजली / सुपरफास्ट'
    },
    {
      id: '5382006323635444390',
      name: 'Danger Skull',
      fallback: '💀',
      desc: 'खतरनाक स्कैम'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950/40 via-zinc-900 to-zinc-950 border border-purple-500/30 p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TELEGRAM VIP ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isHindi ? '💎 प्रीमियम फॉन्ट व कस्टम इमोजी कंवर्टर' : '💎 VIP Fonts & Custom Emoji Studio'}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              {isHindi
                ? 'टेलीग्राम बॉट में फॉन्ट कैसे बदलते हैं और प्रीमियम कस्टम इमोजी कैसे लगाते हैं? नीचे दिए गए कंवर्टर से किसी भी टेक्स्ट को तुरंत VIP फॉन्ट में बदलें और बॉट के लिए कस्टम इमोजी टैग्स कॉपी करें।'
                : 'Convert any text into aesthetic mathematical unicode fonts and copy Telegram Premium <tg-emoji> tags.'}
            </p>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl space-y-1.5 self-start md:self-auto font-mono text-xs">
            <div className="text-zinc-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Active in Python Bot:</span>
            </div>
            <div className="text-purple-300 font-bold">/fonts & /emojis Commands</div>
            <div className="text-[11px] text-zinc-500">Live in scam_shield_bot.py</div>
          </div>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE FONT CONVERTER */}
      <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Type className="w-5 h-5 text-purple-400" />
              {isHindi ? '1. लाइव फॉन्ट कंवर्टर (Live Telegram Font Generator)' : '1. Live Font Generator'}
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              {isHindi ? 'यहाँ कुछ भी टाइप करें — यह अपने आप टेलीग्राम के सभी 8 वीआईपी फॉन्ट्स में बदल जाएगा:' : 'Type anything below to generate Telegram styles:'}
            </p>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5 text-xs font-mono">
            {['SCAM SHIELD AI', 'VERIFIED VIP', 'REPORT FRAUD', 'JOIN COMMUNITY'].map(preset => (
              <button
                key={preset}
                onClick={() => setInputText(preset)}
                className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-purple-500 text-zinc-300 hover:text-white transition cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <div className="space-y-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Type your bot text or button title..."
            className="w-full px-5 py-3.5 rounded-xl bg-zinc-950 border border-zinc-700 focus:border-purple-500 text-white font-mono text-base outline-none transition shadow-inner"
          />
        </div>

        {/* Font Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fontOptions.map(font => (
            <div
              key={font.id}
              className="rounded-xl bg-zinc-950 border border-zinc-800/90 p-4 space-y-3 hover:border-purple-500/40 transition group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-200">{font.name}</span>
                  {font.badge && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/50">
                      {font.badge}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => copyToClipboard(font.output, font.id)}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-purple-950/60 text-zinc-300 hover:text-purple-300 border border-zinc-800 flex items-center gap-1.5 text-xs font-mono transition cursor-pointer"
                >
                  {copiedId === font.id ? (
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

              {/* Converted Output Display */}
              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-sans text-purple-200 select-all break-words leading-relaxed">
                {font.output}
              </div>

              <p className="text-[11px] text-zinc-400 italic">{font.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: CUSTOM EMOJI TAGS */}
      <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              {isHindi ? '2. एक्टिव टेलीग्राम प्रीमियम कस्टम इमोजी पैक' : '2. Active Telegram Custom Emojis'}
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              {isHindi
                ? 'टेलीग्राम बॉट में कस्टम इमोजी <tg-emoji emoji-id="..."> टैग द्वारा भेजे जाते हैं। 1-क्लिक में टैग कॉपी करें:'
                : 'Copy tested working custom emoji HTML tags directly for your bot:'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {premiumEmojiPack.map(emoji => (
            <div
              key={emoji.id}
              className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 space-y-3 hover:border-amber-500/40 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-1 bg-zinc-900 rounded-lg">{emoji.fallback}</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<tg-emoji emoji-id="${emoji.id}">${emoji.fallback}</tg-emoji>`,
                        emoji.id
                      )
                    }
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-amber-950/60 text-zinc-400 hover:text-amber-300 border border-zinc-800 transition cursor-pointer"
                    title="Copy Telegram HTML tag"
                  >
                    {copiedId === emoji.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <div className="mt-3">
                  <div className="text-xs font-bold text-white">{emoji.name}</div>
                  <div className="text-[11px] text-zinc-400">{emoji.desc}</div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-zinc-400 bg-zinc-900 p-1.5 rounded border border-zinc-800 truncate">
                ID: {emoji.id}
              </div>
            </div>
          ))}
        </div>

        {/* STEP-BY-STEP GUIDE: HOW TO GET ANY EMOJI ID */}
        <div className="rounded-xl bg-gradient-to-r from-purple-950/30 via-zinc-950 to-zinc-950 border border-purple-500/30 p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-purple-300">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>{isHindi ? 'अपना मनपसंद इमोजी पैक कैसे ढूंढें व बॉट में कैसे लगाएं?' : 'How to find any Custom Emoji ID:'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
              <span className="font-mono text-purple-400 font-bold">चरण 1:</span>
              <p className="text-zinc-300 font-medium">Telegram खोलें और <b>@emoji_id_bot</b> या <b>@idbot</b> पर जाएं।</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
              <span className="font-mono text-purple-400 font-bold">चरण 2:</span>
              <p className="text-zinc-300 font-medium">कोई भी मनपसंद प्रीमियम इमोजी उस बॉट को भेजें।</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
              <span className="font-mono text-purple-400 font-bold">चरण 3:</span>
              <p className="text-zinc-300 font-medium">वह आपको उसकी न्यूमेरिक <code>emoji-id</code> (उदा. <code>5411270216...</code>) दे देगा।</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
              <span className="font-mono text-purple-400 font-bold">चरण 4:</span>
              <p className="text-zinc-300 font-medium">अपने <code>.env</code> में वह ID पेस्ट करें और बॉट रीस्टार्ट करें!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
