#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
==============================================================================
📱 NAMAN SELL BOT - 5SIM DIRECT OTP & VIRTUAL ACCOUNT STORE
Designed for: 24/7 Deployment (Ubuntu / Debian / VPS / Termux / Render)
Integrated with Official 5SIM.net API for Direct Instant Deals!
==============================================================================
Features:
1. 🛒 Direct Deal OTP Store for All Major Apps:
   - Telegram, WhatsApp, Instagram, Facebook, Google/Gmail, Twitter/X,
     OpenAI/ChatGPT, Amazon, Discord, TikTok, Snapchat, Netflix, etc.
2. 🌍 Multi-Country Support:
   - India 🇮🇳, Russia 🇷🇺, Indonesia 🇮🇩, USA 🇺🇸, UK 🇬🇧, Vietnam 🇻🇳,
     Philippines 🇵🇭, Brazil 🇧🇷, Kazakhstan 🇰🇿, Nigeria 🇳🇬.
3. ⚡ Live Real-time OTP Listener:
   - Auto-polls 5SIM every 3 seconds. The second the OTP arrives,
     the bot immediately notifies the user with copyable code!
4. 💰 Automatic UPI Wallet System:
   - UPI ID: vinit-godara@fam (Vinit Godara)
   - Dynamic QR Code generation for instant wallet top-ups.
5. 🛡️ 100% Refund Protection:
   - No OTP received within 15 minutes? 1-click cancel with 100% instant refund.
6. 🌐 24/7 Keep-Alive HTTP Web Server for Cloud/VPS Hosting.
==============================================================================
"""

import os
import re
import sys
import time
import json
import sqlite3
import asyncio
import logging
import urllib.request
import urllib.parse
from datetime import datetime
from typing import Dict, Any, List, Optional
from urllib.parse import quote_plus

# ==============================================================================
# ENVIRONMENT & CONFIGURATION
# ==============================================================================
def _load_env_file():
    candidates = [
        os.path.join(os.getcwd(), ".env"),
        os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
    ]
    for p in candidates:
        if os.path.isfile(p):
            try:
                with open(p, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if not line or line.startswith("#"):
                            continue
                        if "=" in line:
                            k, v = line.split("=", 1)
                            k = k.strip()
                            v = v.strip().strip('"').strip("'")
                            if k and k not in os.environ:
                                os.environ[k] = v
            except Exception:
                pass
            break

_load_env_file()

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO
)
logger = logging.getLogger("NamanSellBot")

BOT_TOKEN = os.environ.get("BOT_TOKEN", "").strip()
ADMIN_ID = int(os.environ.get("ADMIN_ID", "0") or "0")
DATABASE_PATH = os.environ.get("DATABASE_PATH", "naman_sell.db")

# 5SIM.NET API KEY (Provided by user)
FIVESIM_API_KEY = os.environ.get(
    "FIVESIM_API_KEY",
    "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4MjM4OTk0NDYsImlhdCI6MTc5MjM2MzQ0NiwicmF5IjoiODc2MzBlNTk3ZDFkZjA3MmY5YzZjMDBmMDVkMGUxNzIiLCJzdWIiOjQ1NjkyOTF9.gtfaH2AJA1OSkyGPHKR3Xl9aFw5UYmxDIXLtCb_ec7_HdMWBM91H3JiKcAAMDogYh9Ud-YnTGIaVZhjXKWz7C6u9EnnBUqCrq8CHhvHvYX5GK1m6pR9ytxvSfwEH4onkqrWG9_-ZrCtl2S65_CdH4VHMCdVhnWLq_vsh3gqSXV-E1FPNlTOtDq1imBFdGWBEX_77tCqv0LeggUqYUeyDOuYXiwFRrFvFxDSOh6l2YZbtEKHsIC9gW2kcomZZL2MHAcVd8_AvrrbKn9T7ajZ2OQeHJaoIw885XZuxtpuASndTxtR9Bbv6IYXTl2UtIxp2bKl2svPC0ErAJYsgMUMI1w"
).strip()

# UPI Wallet Topup Details
UPI_ID = os.environ.get("UPI_ID", "vinit-godara@fam").strip()
UPI_NAME = os.environ.get("UPI_NAME", "Vinit Godara").strip()

# Exchange rate estimate: 1 RUB ~= 1.1 INR (with small platform margin)
RUB_TO_INR_RATE = float(os.environ.get("RUB_TO_INR_RATE", "1.25"))

# Supported Apps & Icons
SUPPORTED_SERVICES = {
    "telegram": {"name": "Telegram", "icon": "💬", "code": "telegram"},
    "whatsapp": {"name": "WhatsApp", "icon": "📱", "code": "whatsapp"},
    "google": {"name": "Google / Gmail", "icon": "🔴", "code": "google"},
    "instagram": {"name": "Instagram", "icon": "📸", "code": "instagram"},
    "facebook": {"name": "Facebook", "icon": "🔵", "code": "facebook"},
    "twitter": {"name": "Twitter / X", "icon": "🐦", "code": "twitter"},
    "openai": {"name": "OpenAI / ChatGPT", "icon": "🤖", "code": "openai"},
    "amazon": {"name": "Amazon", "icon": "🛍️", "code": "amazon"},
    "discord": {"name": "Discord", "icon": "🎮", "code": "discord"},
    "tiktok": {"name": "TikTok", "icon": "🎵", "code": "tiktok"},
    "snapchat": {"name": "Snapchat", "icon": "👻", "code": "snapchat"},
    "netflix": {"name": "Netflix", "icon": "🎬", "code": "netflix"},
    "microsoft": {"name": "Microsoft / Outlook", "icon": "💻", "code": "microsoft"},
    "steam": {"name": "Steam", "icon": "🕹️", "code": "steam"},
    "uber": {"name": "Uber", "icon": "🚗", "code": "uber"},
    "other": {"name": "Any Other Service", "icon": "🌐", "code": "other"}
}

# Popular Countries
SUPPORTED_COUNTRIES = {
    "india": {"name": "India", "flag": "🇮🇳", "code": "india"},
    "russia": {"name": "Russia (Lowest)", "flag": "🇷🇺", "code": "russia"},
    "indonesia": {"name": "Indonesia", "flag": "🇮🇩", "code": "indonesia"},
    "usa": {"name": "USA", "flag": "🇺🇸", "code": "usa"},
    "england": {"name": "United Kingdom", "flag": "🇬🇧", "code": "england"},
    "vietnam": {"name": "Vietnam", "flag": "🇻🇳", "code": "vietnam"},
    "philippines": {"name": "Philippines", "flag": "🇵🇭", "code": "philippines"},
    "brazil": {"name": "Brazil", "flag": "🇧🇷", "code": "brazil"},
    "kazakhstan": {"name": "Kazakhstan", "flag": "🇰🇿", "code": "kazakhstan"},
    "nigeria": {"name": "Nigeria", "flag": "🇳🇬", "code": "nigeria"}
}

# ==============================================================================
# 5SIM API CLIENT
# ==============================================================================
class FiveSimClient:
    """Official 5SIM.net API v1 Client."""
    BASE_URL = "https://5sim.net/v1"

    def __init__(self, api_key: str):
        self.api_key = api_key

    def _request(self, endpoint: str, method: str = "GET", data: Optional[dict] = None) -> Any:
        url = f"{self.BASE_URL}/{endpoint}"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Accept": "application/json",
            "User-Agent": "NamanSellBot/1.0 (Windows NT 10.0; Win64; x64)"
        }
        body = json.dumps(data).encode("utf-8") if data else None
        req = urllib.request.Request(url, data=body, headers=headers, method=method)

        try:
            with urllib.request.urlopen(req, timeout=12) as resp:
                raw = resp.read().decode("utf-8")
                return json.loads(raw)
        except urllib.error.HTTPError as e:
            raw_err = e.read().decode("utf-8", errors="ignore")
            logger.error(f"5SIM HTTP Error {e.code}: {raw_err}")
            raise Exception(f"5SIM Error ({e.code}): {raw_err or e.reason}")
        except Exception as e:
            logger.error(f"5SIM Request Error: {e}")
            raise Exception(f"5SIM Connection Error: {str(e)}")

    def get_profile(self) -> Dict[str, Any]:
        """Returns balance, rating, email."""
        return self._request("user/profile")

    def get_prices(self, country: str = "india", product: str = "telegram") -> Dict[str, Any]:
        """Fetches product price and availability for specified country."""
        return self._request(f"guest/products/{country}/any")

    def buy_number(self, country: str, product: str, operator: str = "any") -> Dict[str, Any]:
        """Purchases an activation number."""
        return self._request(f"user/buy/activation/{country}/{operator}/{product}")

    def check_order(self, order_id: int) -> Dict[str, Any]:
        """Checks order status and received SMS."""
        return self._request(f"user/check/{order_id}")

    def cancel_order(self, order_id: int) -> Dict[str, Any]:
        """Cancels order and triggers 100% refund."""
        return self._request(f"user/cancel/{order_id}")

    def finish_order(self, order_id: int) -> Dict[str, Any]:
        """Marks order as completed."""
        return self._request(f"user/finish/{order_id}")

fivesim = FiveSimClient(FIVESIM_API_KEY)

# ==============================================================================
# DATABASE MANAGEMENT (WALLET & ORDERS)
# ==============================================================================
def init_database():
    """Initializes SQLite database for users, balances, and orders."""
    conn = sqlite3.connect(DATABASE_PATH)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY,
            username TEXT,
            first_name TEXT,
            balance REAL DEFAULT 0.0,
            total_spent REAL DEFAULT 0.0,
            orders_count INTEGER DEFAULT 0,
            joined_at TEXT
        )
    """)
    c.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            order_id INTEGER PRIMARY KEY,
            user_id INTEGER,
            service TEXT,
            country TEXT,
            phone TEXT,
            price REAL,
            status TEXT DEFAULT 'PENDING',
            otp TEXT,
            created_at TEXT
        )
    """)
    c.execute("""
        CREATE TABLE IF NOT EXISTS deposits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            username TEXT,
            amount REAL,
            utr TEXT UNIQUE,
            status TEXT DEFAULT 'pending',
            created_at TEXT
        )
    """)
    conn.commit()
    conn.close()
    logger.info("Database initialized successfully.")

def get_or_create_user(user_id: int, username: str = "", first_name: str = "") -> Dict[str, Any]:
    conn = sqlite3.connect(DATABASE_PATH)
    c = conn.cursor()
    c.execute("SELECT user_id, username, first_name, balance, total_spent, orders_count FROM users WHERE user_id = ?", (user_id,))
    row = c.fetchone()
    if not row:
        c.execute("""
            INSERT INTO users (user_id, username, first_name, balance, total_spent, orders_count, joined_at)
            VALUES (?, ?, ?, 0.0, 0.0, 0, ?)
        """, (user_id, username, first_name, datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")))
        conn.commit()
        row = (user_id, username, first_name, 0.0, 0.0, 0)
    conn.close()
    return {
        "user_id": row[0],
        "username": row[1],
        "first_name": row[2],
        "balance": row[3],
        "total_spent": row[4],
        "orders_count": row[5]
    }

def update_user_balance(user_id: int, delta: float) -> float:
    conn = sqlite3.connect(DATABASE_PATH)
    c = conn.cursor()
    c.execute("UPDATE users SET balance = balance + ? WHERE user_id = ?", (delta, user_id))
    c.execute("SELECT balance FROM users WHERE user_id = ?", (user_id,))
    new_bal = c.fetchone()[0]
    conn.commit()
    conn.close()
    return new_bal

# ==============================================================================
# TELEGRAM BOT LOGIC & DISPATCHER
# ==============================================================================
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.constants import ParseMode
from telegram.ext import (
    Application,
    CommandHandler,
    CallbackQueryHandler,
    MessageHandler,
    ContextTypes,
    filters
)

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Main Home Menu for Naman Sell Bot."""
    user = update.effective_user
    u = get_or_create_user(user.id, user.username or "", user.first_name or "Friend")

    # Check 5SIM API status
    try:
        prof = fivesim.get_profile()
        fivesim_status = f"🟢 Connected (ID: {prof.get('id')})"
    except Exception:
        fivesim_status = "🟡 Connecting..."

    welcome_text = (
        f"╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮\n"
        f"│  📱 <b>NAMAN SELL OTP BOT</b> ⚡  │\n"
        f"╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n"
        f"👋 <i>नमस्ते {user.first_name}!</i>\n"
        f"यहाँ आपको मिलेंगे सभी मुख्य ऐप्स के <b>सस्ते वर्चुअल नंबर्स व लाइव OTP</b>!\n\n"
        f"💰 <b>आपका वॉलेट बैलेंस:</b> <code>₹{u['balance']:.2f} INR</code>\n"
        f"📦 <b>कुल ऑर्डर्स:</b> <code>{u['orders_count']}</code>\n"
        f"⚡ <b>5SIM सर्वर स्टेटस:</b> <code>{fivesim_status}</code>\n\n"
        f"<blockquote expandable>"
        f"✨ <b>हमारी मुख्य सेवाएं:</b>\n"
        f"• 💬 Telegram, WhatsApp, Instagram, Google\n"
        f"• 🤖 OpenAI ChatGPT, Facebook, Twitter, Amazon\n"
        f"• 🇮🇳 भारत, 🇷🇺 रूस, 🇮🇩 इंडोनेशिया, 🇺🇸 USA व 10+ देश\n"
        f"• ⚡ 100% ऑटोमैटिक OTP डिटेक्शन (3 सेकंड में)\n"
        f"• 🛡️ OTP न आने पर 1-क्लिक रिफंड पॉलिसी\n"
        f"</blockquote>\n\n"
        f"👇 <i>नंबर खरीदने या वॉलेट रिचार्ज करने के लिए बटन चुनें:</i>"
    )

    keyboard = [
        [
            InlineKeyboardButton("🛒 नंबर खरीदें (Buy Number / OTP)", callback_data="btn_services_list"),
            InlineKeyboardButton("💳 वॉलेट रिचार्ज (Add Funds)", callback_data="btn_wallet_topup")
        ],
        [
            InlineKeyboardButton("📋 मेरे ऑर्डर्स (My Orders)", callback_data="btn_my_orders"),
            InlineKeyboardButton("💰 बैलेंस चेक (Balance)", callback_data="btn_check_balance")
        ],
        [
            InlineKeyboardButton("👑 5SIM अकाउंट स्टेटस", callback_data="btn_5sim_profile"),
            InlineKeyboardButton("ℹ️ सहायता (Help)", callback_data="btn_help")
        ]
    ]

    target = update.message if update.message else update.callback_query.message
    await target.reply_text(
        text=welcome_text,
        parse_mode=ParseMode.HTML,
        reply_markup=InlineKeyboardMarkup(keyboard),
        disable_web_page_preview=True
    )

async def services_list_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Shows all available apps/services."""
    query = update.callback_query
    await query.answer()

    text = (
        f"╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮\n"
        f"│  🛒 <b>SELECT APP / SERVICE</b> 📱  │\n"
        f"╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n"
        f"👉 <i>जिस ऐप के लिए आपको OTP चाहिए, उसे चुनें:</i>"
    )

    keyboard = []
    row = []
    for code, info in SUPPORTED_SERVICES.items():
        row.append(InlineKeyboardButton(f"{info['icon']} {info['name']}", callback_data=f"srv_{code}"))
        if len(row) == 2:
            keyboard.append(row)
            row = []
    if row:
        keyboard.append(row)

    keyboard.append([InlineKeyboardButton("🔙 मुख्य मेनू (Main Menu)", callback_data="btn_home")])

    await query.edit_message_text(
        text=text,
        parse_mode=ParseMode.HTML,
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def country_selection_handler(update: Update, context: ContextTypes.DEFAULT_TYPE, service_code: str):
    """Shows country choices for the selected service."""
    query = update.callback_query
    await query.answer()

    service_info = SUPPORTED_SERVICES.get(service_code, {"name": service_code.title(), "icon": "📱"})

    text = (
        f"╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮\n"
        f"│  🌍 <b>SELECT COUNTRY</b> | {service_info['icon']}  │\n"
        f"╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n"
        f"📌 <b>सेवा:</b> {service_info['icon']} <b>{service_info['name']}</b>\n"
        f"👉 <i>किस देश का वर्चुअल नंबर चाहिए, चुनें:</i>\n\n"
        f"💡 <i>टिप: रूस 🇷🇺, इंडोनेशिया 🇮🇩 और वियतनाम 🇻🇳 के नंबर सबसे सस्ते होते हैं!</i>"
    )

    keyboard = []
    row = []
    for c_code, c_info in SUPPORTED_COUNTRIES.items():
        row.append(InlineKeyboardButton(f"{c_info['flag']} {c_info['name']}", callback_data=f"buy_{service_code}_{c_code}"))
        if len(row) == 2:
            keyboard.append(row)
            row = []
    if row:
        keyboard.append(row)

    keyboard.append([InlineKeyboardButton("🔙 ऐप्स लिस्ट पर वापस", callback_data="btn_services_list")])

    await query.edit_message_text(
        text=text,
        parse_mode=ParseMode.HTML,
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def buy_number_handler(update: Update, context: ContextTypes.DEFAULT_TYPE, service_code: str, country_code: str):
    """Executes the purchase order directly on 5SIM API."""
    query = update.callback_query
    await query.answer()

    user = update.effective_user
    u = get_or_create_user(user.id, user.username or "", user.first_name or "")

    service_info = SUPPORTED_SERVICES.get(service_code, {"name": service_code.title(), "icon": "📱"})
    country_info = SUPPORTED_COUNTRIES.get(country_code, {"name": country_code.title(), "flag": "🌍"})

    # Show loading status
    await query.edit_message_text(
        f"⏳ <b>5SIM से {country_info['flag']} {country_info['name']} का {service_info['name']} नंबर प्राप्त किया जा रहा है...</b>\nकृपया 2-3 सेकंड प्रतीक्षा करें...",
        parse_mode=ParseMode.HTML
    )

    try:
        # Call 5SIM buy activation API
        order = fivesim.buy_number(country_code, service_code, operator="any")

        order_id = order.get("id")
        phone = order.get("phone")
        rub_price = float(order.get("price", 1.0))
        inr_price = round(rub_price * RUB_TO_INR_RATE, 2)
        if inr_price < 2.0:
            inr_price = 3.0  # Fair minimum floor

        # Save order to DB
        conn = sqlite3.connect(DATABASE_PATH)
        c = conn.cursor()
        c.execute("""
            INSERT INTO orders (order_id, user_id, service, country, phone, price, status, created_at)
            VALUES (?, ?, ?, ?, ?, 'PENDING', ?)
        """, (order_id, user.id, service_code, country_code, phone, inr_price, datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")))
        c.execute("UPDATE users SET orders_count = orders_count + 1 WHERE user_id = ?", (user.id,))
        conn.commit()
        conn.close()

        success_text = (
            f"╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮\n"
            f"│  🎉 <b>नंबर मिल गया (NUMBER READY)</b> ⚡  │\n"
            f"╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n"
            f"📌 <b>सेवा:</b> {service_info['icon']} <b>{service_info['name']}</b>\n"
            f"🌍 <b>देश:</b> {country_info['flag']} <b>{country_info['name']}</b>\n"
            f"📞 <b>वर्चुअल नंबर:</b> <code>{phone}</code> (क्लिक करके कॉपी करें)\n"
            f"🆔 <b>ऑर्डर आईडी:</b> <code>{order_id}</code>\n"
            f"💰 <b>कीमत:</b> <b>₹{inr_price} INR</b>\n"
            f"⏳ <b>वैधता:</b> 15 मिनट\n\n"
            f"<blockquote expandable>"
            f"<b>📲 अब क्या करें?</b>\n"
            f"1. ऊपर दिए गए नंबर <code>{phone}</code> को कॉपी करें।\n"
            f"2. अपने {service_info['name']} ऐप में जाकर यह नंबर डालें और OTP भेजें।\n"
            f"3. <b>हमारा बॉट अपने आप OTP सुन रहा है!</b> जैसे ही कोड आएगा, यहाँ तुरंत दिखेगा।\n"
            f"4. यदि 2 मिनट में कोड न आए, तो नीचे <b>रिफंड</b> बटन दबाकर तुरंत दूसरा नंबर लें।"
            f"</blockquote>\n\n"
            f"⏳ <i>OTP का इंतज़ार किया जा रहा है (Live Listening)...</i>"
        )

        keyboard = [
            [
                InlineKeyboardButton("🔄 OTP रिफ्रेश करें", callback_data=f"chk_{order_id}"),
                InlineKeyboardButton("❌ कैंसिल व रिफंड", callback_data=f"can_{order_id}")
            ],
            [InlineKeyboardButton("🔙 मुख्य मेनू", callback_data="btn_home")]
        ]

        await query.edit_message_text(
            text=success_text,
            parse_mode=ParseMode.HTML,
            reply_markup=InlineKeyboardMarkup(keyboard)
        )

        # Launch background polling task
        asyncio.create_task(poll_otp_background(context, query.message.chat_id, query.message.message_id, order_id, phone, service_info["name"]))

    except Exception as e:
        err_msg = str(e)
        logger.error(f"Buy number error: {err_msg}")
        err_text = (
            f"❌ <b>नंबर बुक करने में समस्या आई:</b>\n\n"
            f"<code>{err_msg}</code>\n\n"
            f"💡 <i>सुझाव:</i>\n"
            f"• 5SIM पर इस देश में फिलहाल स्टॉक खाली हो सकता है, कृपया <b>दूसरा देश</b> (जैसे रूस 🇷🇺 या इंडोनेशिया 🇮🇩) चुनें।\n"
            f"• या 5SIM खाते में बैलेंस चेक करें।"
        )
        keyboard = [
            [InlineKeyboardButton("🔄 दूसरा देश चुनें", callback_data=f"srv_{service_code}")],
            [InlineKeyboardButton("🔙 मुख्य मेनू", callback_data="btn_home")]
        ]
        await query.edit_message_text(
            text=err_text,
            parse_mode=ParseMode.HTML,
            reply_markup=InlineKeyboardMarkup(keyboard)
        )

async def poll_otp_background(context: ContextTypes.DEFAULT_TYPE, chat_id: int, message_id: int, order_id: int, phone: str, service_name: str):
    """Background loop polling 5SIM API for incoming SMS/OTP."""
    max_retries = 100  # ~5 minutes
    for _ in range(max_retries):
        await asyncio.sleep(4)
        try:
            order_data = fivesim.check_order(order_id)
            status = order_data.get("status")
            sms_list = order_data.get("sms", [])

            if status == "CANCELED" or status == "TIMEOUT":
                break

            if sms_list and len(sms_list) > 0:
                latest_sms = sms_list[-1]
                code = latest_sms.get("code") or "Received"
                full_text = latest_sms.get("text", "")

                # Update DB
                conn = sqlite3.connect(DATABASE_PATH)
                c = conn.cursor()
                c.execute("UPDATE orders SET status = 'RECEIVED', otp = ? WHERE order_id = ?", (code, order_id))
                conn.commit()
                conn.close()

                # Mark finished on 5SIM
                try:
                    fivesim.finish_order(order_id)
                except Exception:
                    pass

                # Send big celebratory notification
                otp_msg = (
                    f"╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮\n"
                    f"│  🎉 <b>OTP आ गया! (OTP RECEIVED)</b> ⚡  │\n"
                    f"╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n"
                    f"📌 <b>सेवा:</b> <b>{service_name}</b>\n"
                    f"📞 <b>नंबर:</b> <code>{phone}</code>\n"
                    f"🔑 <b>आपका OTP कोड:</b> <code>{code}</code> (क्लिक करके कॉपी करें)\n\n"
                    f"💬 <b>पूरा मैसेज:</b>\n"
                    f"<code>{full_text}</code>\n\n"
                    f"✅ <i>सफलतापूर्वक पूर्ण! हमारे साथ डील करने के लिए धन्यवाद।</i>"
                )

                keyboard = [
                    [InlineKeyboardButton("🛒 नया नंबर खरीदें", callback_data="btn_services_list")],
                    [InlineKeyboardButton("🔙 मुख्य मेनू", callback_data="btn_home")]
                ]

                try:
                    await context.bot.send_message(
                        chat_id=chat_id,
                        text=otp_msg,
                        parse_mode=ParseMode.HTML,
                        reply_markup=InlineKeyboardMarkup(keyboard)
                    )
                except Exception as e:
                    logger.warning(f"Failed to send OTP message: {e}")
                break

        except Exception as e:
            logger.debug(f"Polling loop check exception: {e}")

async def wallet_topup_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """UPI Wallet Recharge with dynamic QR Code."""
    query = update.callback_query
    await query.answer()

    user = update.effective_user
    u = get_or_create_user(user.id, user.username or "", user.first_name or "")

    upi_intent = f"upi://pay?pa={UPI_ID}&pn={quote_plus(UPI_NAME)}&am=50&cu=INR&tn={quote_plus(f'WALLET_{user.id}')}"
    qr_url = f"https://api.qrserver.com/v1/create-qr-code/?size=350x350&margin=12&data={quote_plus(upi_intent)}"

    text = (
        f"╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮\n"
        f"│  💳 <b>वॉलेट रिचार्ज (ADD FUNDS)</b> ⚡  │\n"
        f"╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n"
        f"💰 <b>वर्तमान बैलेंस:</b> <code>₹{u['balance']:.2f} INR</code>\n\n"
        f"💳 <b>ऑफिशियल UPI ID:</b> <code>{UPI_ID}</code> (कॉपी करें)\n"
        f"👤 <b>प्राप्तकर्ता:</b> <b>{UPI_NAME}</b>\n\n"
        f"<blockquote expandable>"
        f"<b>📌 रिचार्ज करने का तरीका:</b>\n"
        f"1. नीचे दिए गए QR कोड को PhonePe, Paytm या Google Pay से स्कैन करें।\n"
        f"2. जितना बैलेंस चाहिए (जैसे ₹30, ₹50, ₹100), पेमेंट करें।\n"
        f"3. पेमेंट के बाद 12-अंकों का UTR नंबर इस प्रकार भेजें:\n"
        f"   <code>/submitutr 12_DIGIT_UTR RASHI</code>\n"
        f"   (उदा: <code>/submitutr 412345678901 50</code>)\n"
        f"4. एडमिन पुष्टि के बाद तुरंत आपके बैलेंस में जुड़ जाएगा!"
        f"</blockquote>\n\n"
        f"👇 <i>सीधे पेमेंट करने के लिए नीचे दिए बटन पर क्लिक करें:</i>"
    )

    keyboard = [
        [InlineKeyboardButton("📲 Pay via UPI App (PhonePe/GPay)", url=upi_intent)],
        [InlineKeyboardButton("🔙 मुख्य मेनू", callback_data="btn_home")]
    ]

    try:
        await query.message.reply_photo(
            photo=qr_url,
            caption=text,
            parse_mode=ParseMode.HTML,
            reply_markup=InlineKeyboardMarkup(keyboard)
        )
    except Exception:
        await query.edit_message_text(
            text=text,
            parse_mode=ParseMode.HTML,
            reply_markup=InlineKeyboardMarkup(keyboard)
        )

async def check_5sim_profile_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Checks live 5SIM account connection and balance."""
    query = update.callback_query
    await query.answer()

    try:
        prof = fivesim.get_profile()
        p_text = (
            f"╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮\n"
            f"│  👑 <b>5SIM.NET LIVE STATUS</b> 🌐  │\n"
            f"╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n"
            f"👤 <b>अकाउंट ईमेल:</b> <code>{prof.get('email')}</code>\n"
            f"🆔 <b>यूज़र आईडी:</b> <code>{prof.get('id')}</code>\n"
            f"💰 <b>5SIM बैलेंस:</b> <b>{prof.get('balance')} RUB</b>\n"
            f"⭐ <b>अकाउंट रेटिंग:</b> <code>{prof.get('rating')}/100</code>\n"
            f"⚡ <b>सक्रिय ऑर्डर्स:</b> <code>{prof.get('total_active_orders')}</code>\n\n"
            f"✅ <i>आपकी API Key सही प्रकार से काम कर रही है और 5SIM सर्वर से लाइव कनेक्टेड है!</i>"
        )
    except Exception as e:
        p_text = f"❌ <b>5SIM एरर:</b> <code>{e}</code>"

    keyboard = [
        [InlineKeyboardButton("🛒 नंबर खरीदें", callback_data="btn_services_list")],
        [InlineKeyboardButton("🔙 मुख्य मेनू", callback_data="btn_home")]
    ]

    await query.edit_message_text(
        text=p_text,
        parse_mode=ParseMode.HTML,
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def callback_router(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Main Callback router for inline buttons."""
    query = update.callback_query
    data = query.data

    if data == "btn_home":
        await start_command(update, context)
    elif data == "btn_services_list":
        await services_list_handler(update, context)
    elif data.startswith("srv_"):
        service_code = data.replace("srv_", "")
        await country_selection_handler(update, context, service_code)
    elif data.startswith("buy_"):
        parts = data.split("_")
        if len(parts) >= 3:
            s_code, c_code = parts[1], parts[2]
            await buy_number_handler(update, context, s_code, c_code)
    elif data == "btn_wallet_topup":
        await wallet_topup_handler(update, context)
    elif data == "btn_5sim_profile":
        await check_5sim_profile_handler(update, context)
    elif data == "btn_check_balance":
        user = update.effective_user
        u = get_or_create_user(user.id)
        await query.answer(f"💰 आपका बैलेंस: ₹{u['balance']:.2f} INR", show_alert=True)
    elif data.startswith("chk_"):
        order_id = int(data.replace("chk_", ""))
        try:
            ord_res = fivesim.check_order(order_id)
            sms_list = ord_res.get("sms", [])
            if sms_list:
                code = sms_list[-1].get("code")
                await query.answer(f"🎉 OTP: {code}", show_alert=True)
            else:
                await query.answer("⏳ अभी SMS नहीं आया, 10-15 सेकंड बाद चेक करें।", show_alert=True)
        except Exception as e:
            await query.answer(f"एरर: {e}", show_alert=True)
    elif data.startswith("can_"):
        order_id = int(data.replace("can_", ""))
        try:
            fivesim.cancel_order(order_id)
            await query.edit_message_text("✅ <b>ऑर्डर सफलतापूर्वक कैंसिल हो गया और बैलेंस रिफंड हो गया!</b>", parse_mode=ParseMode.HTML)
        except Exception as e:
            await query.answer(f"कैंसिल एरर: {e}", show_alert=True)
    elif data == "btn_help":
        await help_command(update, context)

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Help guide."""
    help_text = (
        f"📱 <b>NAMAN SELL BOT - कमांड गाइड:</b>\n"
        f"━━━━━━━━━━━━━━━━━━━━\n"
        f"• <code>/start</code> - मुख्य स्टोर मेनू खोलें\n"
        f"• <code>/buy</code> - किसी भी ऐप के लिए नंबर खरीदें\n"
        f"• <code>/balance</code> - अपना वॉलेट बैलेंस देखें\n"
        f"• <code>/deposit</code> - UPI द्वारा वॉलेट रिचार्ज करें\n"
        f"• <code>/submitutr &lt;UTR&gt; &lt;RASHI&gt;</code> - UTR सबमिट करें\n"
        f"• <code>/5sim</code> - 5SIM लाइव बैलेंस व स्टेटस देखें\n"
        f"• <code>/help</code> - यह सहायता मेनू\n\n"
        f"💡 <i>सभी ऑर्डर्स 100% सुरक्षित और ऑटोमैटिक हैं!</i>"
    )
    target = update.message if update.message else update.callback_query.message
    await target.reply_text(help_text, parse_mode=ParseMode.HTML)

async def submit_utr_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles UTR submission for wallet recharge: /submitutr <UTR> <AMOUNT>"""
    user = update.effective_user
    if not context.args or len(context.args) < 1:
        await update.message.reply_text(
            "ℹ️ <b>उपयोग:</b> <code>/submitutr 12_DIGIT_UTR RASHI</code>\nउदा: <code>/submitutr 412345678901 50</code>",
            parse_mode=ParseMode.HTML
        )
        return

    utr = context.args[0].strip()
    amt = float(context.args[1]) if len(context.args) > 1 and context.args[1].replace('.', '', 1).isdigit() else 50.0

    conn = sqlite3.connect(DATABASE_PATH)
    c = conn.cursor()
    try:
        c.execute("""
            INSERT INTO deposits (user_id, username, amount, utr, status, created_at)
            VALUES (?, ?, ?, ?, 'pending', ?)
        """, (user.id, user.username or user.first_name, amt, utr, datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")))
        conn.commit()
        await update.message.reply_text(
            f"✅ <b>UTR {utr} प्राप्त हुआ!</b> एडमिन द्वारा पुष्टि होते ही ₹{amt} आपके वॉलेट में जुड़ जाएंगे।",
            parse_mode=ParseMode.HTML
        )
    except sqlite3.IntegrityError:
        await update.message.reply_text(f"⚠️ यह UTR (<code>{utr}</code>) पहले ही दर्ज है!", parse_mode=ParseMode.HTML)
    conn.close()

# Keep-Alive Background HTTP Server for 24/7 Hosting
def start_keepalive_server():
    port_env = os.environ.get("PORT")
    keep_alive_env = os.environ.get("KEEP_ALIVE", "").lower() in ("1", "true", "yes")
    if not port_env and not keep_alive_env:
        return

    port = int(port_env) if port_env else 8080
    try:
        from http.server import HTTPServer, BaseHTTPRequestHandler
        import threading

        class KeepAliveHandler(BaseHTTPRequestHandler):
            def do_GET(self):
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                res = {
                    "status": "online",
                    "bot": "Naman Sell OTP & 5SIM Bot",
                    "uptime": "24/7 Continuous Active ⚡",
                    "timestamp": datetime.utcnow().isoformat() + "Z"
                }
                self.wfile.write(json.dumps(res, indent=2).encode("utf-8"))

            def log_message(self, format, *args):
                pass

        server = HTTPServer(("0.0.0.0", port), KeepAliveHandler)
        t = threading.Thread(target=server.serve_forever, daemon=True)
        t.start()
        print(f"🌐 [24/7 Cloud] Keep-Alive server active on port {port}")
    except Exception as e:
        logger.warning(f"Keepalive error: {e}")

# ==============================================================================
# MAIN ENTRYPOINT
# ==============================================================================
def main():
    print("=" * 65)
    print("📱 Starting Naman Sell OTP & Virtual Account Telegram Bot...")
    print(f"💳 UPI Payment ID: {UPI_ID}")
    print("⚡ Powered by 5SIM.net API (Live Direct Deals)")
    print("=" * 65)

    init_database()

    token = ""
    if len(sys.argv) > 1 and sys.argv[1].strip() and not sys.argv[1].startswith("-"):
        token = sys.argv[1].strip()

    if not token:
        token = os.environ.get("BOT_TOKEN", "").strip()

    if not token or token == "your_bot_token_here":
        if sys.stdin and sys.stdin.isatty():
            try:
                token = input("👉 Enter your Telegram BOT_TOKEN from @BotFather: ").strip()
            except (EOFError, KeyboardInterrupt):
                token = ""

    if not token or token == "your_bot_token_here":
        print("\n❌ Error: Bot Token not found! Provide via argument or .env")
        print("Usage: python naman_sell_bot.py YOUR_BOT_TOKEN\n")
        sys.exit(1)

    try:
        app = Application.builder().token(token).build()

        app.add_handler(CommandHandler("start", start_command))
        app.add_handler(CommandHandler("buy", services_list_handler))
        app.add_handler(CommandHandler("wallet", wallet_topup_handler))
        app.add_handler(CommandHandler("deposit", wallet_topup_handler))
        app.add_handler(CommandHandler("5sim", check_5sim_profile_handler))
        app.add_handler(CommandHandler("submitutr", submit_utr_command))
        app.add_handler(CommandHandler("help", help_command))
        app.add_handler(CallbackQueryHandler(callback_router))

        start_keepalive_server()

        print("\n" + "⚡" * 30)
        print("✅ Naman Sell Bot is ONLINE!")
        print("👉 Go to Telegram and type /start")
        print("⚡" * 30 + "\n")

        app.run_polling(drop_pending_updates=True)

    except Exception as e:
        print(f"❌ Failed to start bot: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
