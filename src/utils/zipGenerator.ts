import JSZip from 'jszip';
import {
  SCAM_SHIELD_BOT_PYTHON,
  DEPLOY_VPS_SH,
  SCAMSHIELD_SERVICE,
  SCAM_SHIELD_REQUIREMENTS
} from '../data/scamShieldCode';

export const REPO_README = `# 🛡️ Telegram AI Scam-Shield & Forensic Bot

> **अल्ट्रा-फास्ट टेलीग्राम स्कैम डिटेक्टर व कम्युनिटी शील्ड बॉट (24/7 VPS Ready)**  
> Built with Python, \`python-telegram-bot\`, Telegram Custom Premium Emojis, SQLite Forensic DB, and 1-Click VPS Deployment.

---

## 🌟 प्रमुख विशेषताएं (Key Features)

1. **⭐ Telegram Premium Custom Emojis**:
   - संदेशों और बटन्स में असली कस्टम टेलीग्राम प्रीमियम इमोजीज़ (\`<tg-emoji emoji-id="...">\`)।
   - वेरीफाइड बैज (\`5449747923766094392\`), शील्ड (\`5368324170671202286\`), और डेंजर अलर्ट्स।

2. **🔍 रियल-टाइम स्कैम व इम्पर्सनेटर डिटेक्शन**:
   - फर्जी टेलीग्राम चैनल्स, फेक एडमिन्स, बॉट फार्म्स और पोंजी स्कीम्स का त्वरित विश्लेषण।
   - फर्जी पेमेंट स्क्रीनशॉट्स (Paytm/GPay spoofers) की फोरेंसिक जांच।

3. **💳 UPI ID व क्रिप्टो वॉलेट फ्रॉड डिटेक्शन**:
   - ज्ञात फ्रॉड पैटर्न्स और यूज़र रिपोर्ट्स के आधार पर त्वरित अलर्ट।

4. **📢 1-क्लिक वायरल "Share to Group" फीचर**:
   - यूज़र सीधे एक क्लिक से अपनी कम्युनिटी और ग्रुप्स को स्कैमर के प्रति सचेत कर सकते हैं।

5. **🗄️ SQLite डेटाबेस व एडमिन कंट्रोल**:
   - रिपोर्ट्स, ब्लैकलिस्ट और ऑडिट लॉग्स का स्थायी डेटाबेस।
   - एडमिन कमांड्स: \`/admin\`, \`/broadcast\`, \`/addblacklist\`, \`/stats\`।

6. **⚡ 24/7 VPS डेप्लॉयमेंट (Systemd Daemon)**:
   - बिना रुके बैकग्राउंड में चलने के लिए तैयार सर्विस।

---

## 🚀 1-क्लिक VPS इंस्टालेशन (Ubuntu / Debian)

अपने VPS टर्मिनल पर बस यह कमांड चलाएं:

\`\`\`bash
curl -sSL https://raw.githubusercontent.com/vinitgodara453-collab/telegram-scam-shield-bot/main/deploy_vps.sh | bash
\`\`\`

---

## 🛠️ मैन्युअल इंस्टालेशन स्टेप्स (Step-by-Step)

### 1. सिस्टम अपडेट व टूल्स इंस्टॉल करें:
\`\`\`bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3 python3-pip python3-venv git sqlite3 curl
\`\`\`

### 2. रिपॉजिटरी क्लोन करें:
\`\`\`bash
git clone https://github.com/vinitgodara453-collab/telegram-scam-shield-bot.git
cd telegram-scam-shield-bot
\`\`\`

### 3. आवश्यकताएं इंस्टॉल करें:
\`\`\`bash
pip3 install -r requirements.txt
\`\`\`

### 4. कॉन्फ़िगरेशन (.env) सेट करें:
\`\`\`bash
cp .env.example .env
nano .env
\`\`\`
*(अपना \`BOT_TOKEN\` और \`ADMIN_ID\` दर्ज करें)*

### 5. 24/7 बैकग्राउंड सर्विस शुरू करें:
\`\`\`bash
sudo cp scamshield.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable scamshield
sudo systemctl start scamshield
\`\`\`

### 6. बॉट का स्टेटस व लाइव लॉग्स चेक करें:
\`\`\`bash
sudo systemctl status scamshield
sudo journalctl -u scamshield -f
\`\`\`

---

## 📁 रिपॉजिटरी संरचना (Repository Structure)

\`\`\`
.
├── scam_shield_bot.py      # मुख्य बॉट स्क्रिप्ट (Python 3)
├── deploy_vps.sh           # 1-क्लिक ऑटोमैटिक VPS इंस्टालर
├── scamshield.service      # Systemd 24/7 ऑटो-स्टार्ट सर्विस
├── requirements.txt        # आवश्यक पायथन लाइब्रेरीज़
├── .env.example            # क्रेडेंशियल्स और प्रीमियम इमोजी सेटिंग्स
└── README.md               # संपूर्ण गाइड
\`\`\`

---

## 👑 बॉट कमांड्स (Bot Commands)

| कमांड | उपयोग |
|---|---|
| \`/start\` | बॉट शुरू करें व मेनू देखें |
| \`/scan <handle/upi>\` | किसी हैंडल, चैनल या UPI की जांच करें |
| \`/report\` | स्कैमर की शिकायत व सबूत जमा करें |
| \`/stats\` | कुल स्कैमर्स व जांच की स्थिति |
| \`/admin\` | एडमिन पैनल (केवल एडमिन के लिए) |

---
**License**: MIT  
**Developed for**: Community Protection & Cyber Anti-Fraud Shield
`;

export const ENV_EXAMPLE_CONTENT = `# Telegram Bot Token from @BotFather
BOT_TOKEN="your_bot_token_here"

# Your Numeric Telegram User ID (get from @userinfobot)
ADMIN_ID="123456789"

# Optional: Alert Channel username or ID (e.g. @scam_shield_alerts)
CHANNEL_LOG=""

# SQLite Database storage path
DATABASE_PATH="scam_shield.db"

# Telegram Premium Custom Emoji Document IDs (optional, fallback standard emoji used)
EMOJI_SHIELD="5368324170671202286"
EMOJI_VERIFIED="5449747923766094392"
EMOJI_ALERT="5370908842851965692"
EMOJI_FIRE="5371077754646307137"
EMOJI_ROBOT="5370724838722248557"
EMOJI_STAR="5409166649855057077"
`;

export async function downloadCleanShieldRepoZip() {
  const zip = new JSZip();

  zip.file('scam_shield_bot.py', SCAM_SHIELD_BOT_PYTHON);
  zip.file('deploy_vps.sh', DEPLOY_VPS_SH);
  zip.file('scamshield.service', SCAMSHIELD_SERVICE);
  zip.file('requirements.txt', SCAM_SHIELD_REQUIREMENTS);
  zip.file('.env.example', ENV_EXAMPLE_CONTENT);
  zip.file('README.md', REPO_README);

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'telegram-scam-shield-bot.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Backward compatibility alias
export const downloadUpdatedRepoZip = downloadCleanShieldRepoZip;

export function downloadSingleFile(filename: string, content: string, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
