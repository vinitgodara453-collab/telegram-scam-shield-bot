# 🛡️ Telegram AI Scam-Shield & Forensic Bot

> **अल्ट्रा-फास्ट टेलीग्राम स्कैम डिटेक्टर व कम्युनिटी शील्ड बॉट (24/7 VPS Ready)**  
> Built with Python, `python-telegram-bot`, Telegram Custom Premium Emojis, SQLite Forensic DB, and 1-Click VPS Deployment.

---

## 🌟 प्रमुख विशेषताएं (Key Features)

1. **⭐ Telegram Premium Custom Emojis**:
   - संदेशों और बटन्स में असली कस्टम टेलीग्राम प्रीमियम इमोजीज़ (`<tg-emoji emoji-id="...">`)।
   - वेरीफाइड बैज (`5449747923766094392`), शील्ड (`5368324170671202286`), और डेंजर अलर्ट्स।

2. **🔍 रियल-टाइम स्कैम व इम्पर्सनेटर डिटेक्शन**:
   - फर्जी टेलीग्राम चैनल्स, फेक एडमिन्स, बॉट फार्म्स और पोंजी स्कीम्स का त्वरित विश्लेषण।
   - फर्जी पेमेंट स्क्रीनशॉट्स (Paytm/GPay spoofers) की फोरेंसिक जांच।

3. **💳 UPI ID व क्रिप्टो वॉलेट फ्रॉड डिटेक्शन**:
   - ज्ञात फ्रॉड पैटर्न्स और यूज़र रिपोर्ट्स के आधार पर त्वरित अलर्ट।

4. **📢 1-क्लिक वायरल "Share to Group" फीचर**:
   - यूज़र सीधे एक क्लिक से अपनी कम्युनिटी और ग्रुप्स को स्कैमर के प्रति सचेत कर सकते हैं।

5. **🗄️ SQLite डेटाबेस व एडमिन कंट्रोल**:
   - रिपोर्ट्स, ब्लैकलिस्ट और ऑडिट लॉग्स का स्थायी डेटाबेस।
   - एडमिन कमांड्स: `/admin`, `/broadcast`, `/addblacklist`, `/stats`।

6. **⚡ 24/7 VPS डेप्लॉयमेंट (Systemd Daemon)**:
   - बिना रुके बैकग्राउंड में चलने के लिए तैयार सर्विस।

7. **👑 VIP मेम्बरशिप व ऑटोमैटिक UPI QR कोड**:
   - **प्लान 1 महीना:** ₹30 मात्र
   - **प्लान 2 महीने:** ₹50 मात्र
   - **प्लान लाइफटाइम:** ₹100 (हमेशा के लिए)
   - **ऑफिशियल UPI ID:** `vinit-godara@fam` (Vinit Godara)
   - बॉट में `/vip` कमांड देने पर रियल-टाइम डायनामिक QR कोड व UPI ऐप लिंक ऑटोमैटिक जनरेट होता है।
   - पेमेंट के बाद UTR सबमिशन (`/submitpay <UTR> <PLAN>`) और एडमिन द्वारा 1-क्लिक अप्रूवल।

8. **🔍 100% रियल डिटेल्स व OSINT एक्सट्रैक्टर (`/details`)**:
   - 🏦 **बैंक IFSC कोड:** RBI ऑफिशियल डेटाबेस से बैंक का नाम, ब्रांच, पूरा पता, जिला, RTGS, NEFT, IMPS की स्थिति।
   - 🌐 **IP एड्रेस जांच:** लाइव सर्वर Geolocation, ISP, Autonomous System (ASN), शहर, देश व टाइमज़ोन।
   - 📱 **मोबाइल नंबर सर्किल:** भारतीय नेशनल नंबरिंग प्लान (NNP) से मूल राज्य टेलीकॉम सर्किल (जैसे Rajasthan, Delhi) व ऑपरेटर।
   - 💳 **UPI ID (VPA):** जारीकर्ता बैंक व PSP ऐप (FamPay, Google Pay, PhonePe, Paytm) की प्रामाणिकता व फ्रॉड रिस्क।
   - 🚗 **वाहन RTO कोड:** भारत के सभी राज्यों और जिलों के RTO कार्यालय की पहचान (जैसे RJ14 -> Jaipur South)।

---

## 📱 Termux (Android Mobile) पर कैसे चलाएं?

यदि आप बॉट को अपने Android फ़ोन पर **Termux** ऐप में चलाना चाहते हैं, तो यह बहुत आसान है:

### 1-क्लिक Termux सेटअप:
Termux खोलें और बस यह कमांड पेस्ट करें:
```bash
pkg update -y && pkg install -y git python && git clone https://github.com/vinitgodara453-collab/telegram-scam-shield-bot.git && cd telegram-scam-shield-bot && bash termux_setup.sh
```

### मैन्युअल स्टेप्स (Termux):
1. **Termux पैकेज अपडेट करें और टूल्स इंस्टॉल करें**:
   ```bash
   pkg update -y && pkg upgrade -y
   pkg install -y python git clang libjpeg-turbo libcrypt
   ```

2. **रिपॉजिटरी क्लोन करें**:
   ```bash
   git clone https://github.com/vinitgodara453-collab/telegram-scam-shield-bot.git
   cd telegram-scam-shield-bot
   ```

3. **आवश्यक लाइब्रेरीज़ इंस्टॉल करें**:
   ```bash
   pip install -r requirements.txt
   ```

4. **बॉट टोकन सेट करें**:
   ```bash
   cp .env.example .env
   nano .env
   ```
   *(यहाँ अपना `BOT_TOKEN` और `ADMIN_ID` डालें, फिर `Ctrl + O` दबाकर Enter करें और `Ctrl + X` से बाहर निकलें)*

5. **बॉट चालू करें**:
   - डायरेक्ट टोकन के साथ चालू करें:
     ```bash
     python scam_shield_bot.py AAPKA_BOT_TOKEN
     ```
   - या सामान्य तरीके से चालू करें:
     ```bash
     python scam_shield_bot.py
     ```

---

## ⚡ बॉट को 24/7 बिना रुके कैसे चलाएं (3 तरीके):

### 📱 तरीका 1: Android Termux में 24/7 चलाना (Auto-Restart + Anti-Sleep)
Android फोन स्क्रीन बंद होने पर ऐप्स को स्लीप मोड में डाल देता है। 24/7 चलाने के लिए ये 2 काम करें:
1. **फोन की सेटिंग में जाएं**:
   - `Settings` -> `Apps` -> `Termux` -> `Battery` -> **"Unrestricted"** (बिना रोक-टोक) चुनें।
2. **24/7 ऑटो-रीस्टार्ट स्क्रिप्ट चलाएं**:
   ```bash
   nohup ./run_24_7.sh > /dev/null 2>&1 &
   ```
   *(यह स्क्रिप्ट `termux-wake-lock` लगाकर CPU को जागृत रखती है और नेटवर्क कटने पर खुद 3 सेकंड में दोबारा चालू कर देती है)*
3. **लाइव स्टेटस व लॉग्स देखें**:
   ```bash
   tail -f bot_24_7.log
   ```
4. **बॉट बंद करने के लिए**:
   ```bash
   pkill -f run_24_7.sh ; pkill -f scam_shield_bot.py
   ```

---

### ☁️ तरीका 2: 100% Free Cloud पर 24/7 चलाना (बिना फोन चालू रखे!)
अगर आप अपना फोन या Termux 24 घंटे चालू नहीं रखना चाहते, तो इसे **Render.com** या **Koyeb.com** पर 100% मुफ्त चला सकते हैं:
1. **Render.com** पर फ्री अकाउंट बनाएं।
2. **New +** -> **Web Service** या **Background Worker** चुनें।
3. अपनी GitHub रिपॉजिटरी कनेक्ट करें: `vinitgodara453-collab/telegram-scam-shield-bot`
4. **Environment Variables** में जोड़ें:
   - `BOT_TOKEN` = आपका टेलीग्राम बॉट टोकन
5. **Deploy** पर क्लिक करें!
   *(बॉट में 24/7 कीप-अलाइव HTTP सर्वर और Dockerfile पहले से इनबिल्ट है)*

---

### 🖥️ तरीका 3: VPS / Ubuntu सर्वर पर Systemd द्वारा 24/7 चलाना
VPS सर्वर पर रीबूट होने पर भी बॉट अपने आप चालू रहेगा:
```bash
sudo cp scamshield.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable scamshield
sudo systemctl start scamshield
```
लॉग्स चेक करें:
```bash
sudo journalctl -u scamshield -f
```

### ❓ बॉट ऑन (Start) क्यों नहीं हुआ? (समाधान / Troubleshooting):
1. **टोकन नहीं डाला गया**:
   - समाधान: `python scam_shield_bot.py <AAPKA_TOKEN>` चलाएं। टोकन अपने आप `.env` में सुरक्षित सेव हो जाएगा।
2. **लाइब्रेरी इंस्टॉल नहीं हुई**:
   - समाधान: `pip install -r requirements.txt` चलाएं।
3. **नया अपडेट लें**:
   - यदि आपने पहले क्लोन किया था, तो फ़ोल्डर में जाकर अपडेट लें:
     ```bash
     cd telegram-scam-shield-bot && git pull
     ```
4. **स्क्रीन पर एरर देखें**:
   - `python scam_shield_bot.py` चलाकर देखें कि स्क्रीन पर क्या लिखा आता है।

---

## 🚀 1-क्लिक VPS इंस्टालेशन (Ubuntu / Debian)

अपने VPS टर्मिनल पर बस यह कमांड चलाएं:

```bash
curl -sSL https://raw.githubusercontent.com/vinitgodara453-collab/telegram-scam-shield-bot/main/deploy_vps.sh | bash
```

---

## 🛠️ VPS मैन्युअल इंस्टालेशन स्टेप्स (Step-by-Step)

### 1. सिस्टम अपडेट व टूल्स इंस्टॉल करें:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3 python3-pip python3-venv git sqlite3 curl
```

### 2. रिपॉजिटरी क्लोन करें:
```bash
git clone https://github.com/vinitgodara453-collab/telegram-scam-shield-bot.git
cd telegram-scam-shield-bot
```

### 3. आवश्यकताएं इंस्टॉल करें:
```bash
pip3 install -r requirements.txt
```

### 4. कॉन्फ़िगरेशन (.env) सेट करें:
```bash
cp .env.example .env
nano .env
```
*(अपना `BOT_TOKEN` और `ADMIN_ID` दर्ज करें)*

### 5. 24/7 बैकग्राउंड सर्विस शुरू करें:
```bash
sudo cp scamshield.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable scamshield
sudo systemctl start scamshield
```

### 6. बॉट का स्टेटस व लाइव लॉग्स चेक करें:
```bash
sudo systemctl status scamshield
sudo journalctl -u scamshield -f
```

---

## 📁 रिपॉजिटरी संरचना (Repository Structure)

```
.
├── scam_shield_bot.py      # मुख्य बॉट स्क्रिप्ट (Python 3)
├── deploy_vps.sh           # 1-क्लिक ऑटोमैटिक VPS इंस्टालर
├── scamshield.service      # Systemd 24/7 ऑटो-स्टार्ट सर्विस
├── requirements.txt        # आवश्यक पायथन लाइब्रेरीज़
├── .env.example            # क्रेडेंशियल्स और प्रीमियम इमोजी सेटिंग्स
└── README.md               # संपूर्ण गाइड
```

---

## 👑 बॉट कमांड्स (Bot Commands)

| कमांड | उपयोग |
|---|---|
| `/start` | बॉट शुरू करें व मेनू देखें |
| `/scan <handle/upi>` | किसी हैंडल, चैनल या UPI की जांच करें |
| `/report` | स्कैमर की शिकायत व सबूत जमा करें |
| `/stats` | कुल स्कैमर्स व जांच की स्थिति |
| `/admin` | एडमिन पैनल (केवल एडमिन के लिए) |

---
**License**: MIT  
**Developed for**: Community Protection & Cyber Anti-Fraud Shield
