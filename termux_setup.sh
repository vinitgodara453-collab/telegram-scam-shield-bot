#!/data/data/com.termux/files/usr/bin/bash
# ==============================================================================
# Telegram Scam Shield Bot - Termux 1-Click Setup Script
# Designed specifically for Android Termux environment
# ==============================================================================

set -e

clear
echo "🛡️====================================================🛡️"
echo "   TELEGRAM SCAM SHIELD BOT - TERMUX 1-CLICK SETUP    "
echo "🛡️====================================================🛡️"
echo ""

# 1. Update Termux packages safely
echo "📦 [1/4] Checking and installing Python & Git in Termux..."
pkg update -y || true
pkg install -y python git || pkg install -y python git -y

# 2. Upgrade pip and install build dependencies
echo "⬆️ [2/4] Upgrading pip..."
pip install --upgrade pip --no-cache-dir || true

# 3. Install lightweight python dependencies
echo "📚 [3/4] Installing Telegram Bot libraries..."
pip install --no-cache-dir -r requirements.txt || pip install --no-cache-dir python-telegram-bot requests aiohttp colorama python-dotenv

# 4. Check configuration & Token
echo "⚙️ [4/4] Setting up Bot Configuration (.env)..."
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
    else
        touch .env
    fi
fi

# Check if BOT_TOKEN is already configured
EXISTING_TOKEN=$(grep -E "^BOT_TOKEN=" .env | cut -d'=' -f2- | tr -d '"' | tr -d "'" | tr -d ' ' || true)

if [ -z "$EXISTING_TOKEN" ] || [ "$EXISTING_TOKEN" = "your_bot_token_here" ]; then
    echo ""
    echo "========================================================"
    echo "🔑 TELEGRAM BOT TOKEN SETUP:"
    echo "👉 @BotFather से मिला बॉट टोकन यहाँ पेस्ट करें (Right Click / Long Press -> Paste):"
    read -r USER_TOKEN
    USER_TOKEN=$(echo "$USER_TOKEN" | tr -d ' ')
    if [ -n "$USER_TOKEN" ]; then
        if grep -q "^BOT_TOKEN=" .env; then
            sed -i "s|^BOT_TOKEN=.*|BOT_TOKEN=\"$USER_TOKEN\"|" .env
        else
            echo "BOT_TOKEN=\"$USER_TOKEN\"" >> .env
        fi
        echo "✅ Bot Token सफलतापूर्वक सेव हो गया!"
    else
        echo "⚠️ कोई टोकन नहीं डाला गया। आप बाद में 'nano .env' या 'python scam_shield_bot.py YOUR_TOKEN' से डाल सकते हैं।"
    fi
else
    echo "✅ Bot Token पहले से .env में मौजूद है।"
fi

chmod +x start.sh || true
chmod +x termux_setup.sh || true
chmod +x run_24_7.sh || true

echo ""
echo "========================================================"
echo "🎉 SETUP COMPLETED SUCCESSFULLY!"
echo "========================================================"
echo "👉 बॉट सामान्य रूप से चलाने के लिए:"
echo "   python scam_shield_bot.py"
echo ""
echo "👉 ⚡ 24/7 बिना रुके चलाने के लिए (Auto-Restart + Wake-Lock):"
echo "   nohup ./run_24_7.sh > /dev/null 2>&1 &"
echo "   (या स्क्रीन के सामने चलाने के लिए: ./run_24_7.sh)"
echo ""
echo "👉 24/7 बॉट के लाइव लॉग्स देखने के लिए:"
echo "   tail -f bot_24_7.log"
echo ""
echo "👉 24/7 बॉट को पूरी तरह बंद करने के लिए:"
echo "   pkill -f run_24_7.sh ; pkill -f scam_shield_bot.py"
echo "========================================================"
