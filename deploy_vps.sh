#!/usr/bin/env bash
# ==============================================================================
# 🛡️ AI SCAM-SHIELD BOT - 1-CLICK AUTOMATED VPS INSTALLER
# For Ubuntu 20.04 / 22.04 / 24.04 & Debian 11 / 12
# ==============================================================================

set -e

echo -e "\033[1;36m=====================================================\033[0m"
echo -e "\033[1;32m  AI SCAM-SHIELD BOT - 24/7 VPS AUTO-DEPLOYMENT      \033[0m"
echo -e "\033[1;36m=====================================================\033[0m"

# Auto-detect current directory or fallback to standard path
if [ -f "scam_shield_bot.py" ]; then
    APP_DIR="$(pwd)"
else
    APP_DIR="/root/telegram-scam-shield-bot"
    mkdir -p "$APP_DIR"
    cd "$APP_DIR"
fi

echo -e "\n\033[1;33m[1/5] Updating system packages & installing Python3...\033[0m"
apt-get update -y
apt-get install -y python3 python3-pip python3-venv git curl sqlite3

echo -e "\n\033[1;33m[2/5] Setting up Python dependencies...\033[0m"
pip3 install --upgrade pip 2>/dev/null || true
# Install requirements with fallback for Ubuntu 24.04 / Debian 12 (PEP 668)
pip3 install -r requirements.txt 2>/dev/null || pip3 install -r requirements.txt --break-system-packages 2>/dev/null || pip3 install python-telegram-bot Pillow colorama requests --break-system-packages 2>/dev/null || pip3 install python-telegram-bot Pillow colorama requests

echo -e "\n\033[1;33m[3/5] Configuring Bot Credentials & VIP Payment...\033[0m"
if [ ! -f .env ]; then
    read -p "👉 Enter your Telegram BOT_TOKEN from @BotFather: " BOT_TOKEN_INPUT
    read -p "👉 Enter your Telegram ADMIN_ID (numeric): " ADMIN_ID_INPUT
    cat <<EOF > .env
BOT_TOKEN=${BOT_TOKEN_INPUT}
ADMIN_ID=${ADMIN_ID_INPUT}
DATABASE_PATH=scam_shield.db

# VIP Membership & UPI Configuration
UPI_ID="vinit-godara@fam"
UPI_NAME="Vinit Godara"
VIP_PRICE_1M="30"
VIP_PRICE_2M="50"
VIP_PRICE_LIFETIME="100"

# Telegram Premium Custom Emojis
EMOJI_SHIELD=5368324170671202286
EMOJI_VERIFIED=5449747923766094392
EMOJI_ALERT=5370908842851965692
EMOJI_FIRE=5371077754646307137
EMOJI_ROBOT=5370724838722248557
EMOJI_STAR=5409166649855057077
EMOJI_CROWN=5472164874886772598
EMOJI_LIGHTNING=5373142079070410427
EOF
    echo -e "\033[1;32m✓ .env configuration created successfully with UPI: vinit-godara@fam!\033[0m"
else
    echo -e "\033[1;34m✓ Existing .env found, keeping current settings.\033[0m"
fi

echo -e "\n\033[1;33m[4/5] Configuring Systemd 24/7 Background Service...\033[0m"
cat <<EOF > /etc/systemd/system/scamshield.service
[Unit]
Description=AI Scam-Shield, Real Details & VIP Telegram Bot
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=${APP_DIR}
EnvironmentFile=${APP_DIR}/.env
ExecStart=/usr/bin/python3 ${APP_DIR}/scam_shield_bot.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable scamshield.service
systemctl restart scamshield.service

echo -e "\n\033[1;33m[5/5] Checking Bot Service Status...\033[0m"
sleep 2
systemctl is-active --quiet scamshield.service && echo -e "\033[1;32m🎉 SUCCESS! Scam-Shield Bot is RUNNING 24/7 on your VPS!\033[0m" || echo -e "\033[1;31m⚠️ Service started. Check logs using: journalctl -u scamshield -f\033[0m"

echo -e "\n\033[1;36mUseful Commands for your VPS:\033[0m"
echo -e "  • Check live logs: \033[1;33mjournalctl -u scamshield -f\033[0m"
echo -e "  • Restart bot:     \033[1;33msystemctl restart scamshield\033[0m"
echo -e "  • Stop bot:        \033[1;33msystemctl stop scamshield\033[0m"
echo -e "  • Service status:  \033[1;33msystemctl status scamshield\033[0m"
echo -e "  • View Database:   \033[1;33msqlite3 ${APP_DIR}/scam_shield.db\033[0m"
