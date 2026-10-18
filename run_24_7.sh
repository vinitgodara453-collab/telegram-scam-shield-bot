#!/data/data/com.termux/files/usr/bin/bash
# ==============================================================================
# Telegram Scam Shield Bot - 24/7 Auto-Restart Runner
# Works on both Android Termux and Linux / VPS / Ubuntu
# ==============================================================================

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

# Prevent Android CPU from sleeping if running inside Termux
if command -v termux-wake-lock &> /dev/null; then
    echo "⚡ [Termux] Acquiring Wake Lock (ताकि फोन लॉक होने पर भी बॉट न रुके)..."
    termux-wake-lock
fi

# Detect Python interpreter
PY_BIN="python3"
if ! command -v python3 &> /dev/null; then
    if command -v python &> /dev/null; then
        PY_BIN="python"
    else
        echo "❌ Python नहीं मिला! कृपया पहले 'pkg install python' या 'apt install python3' चलाएं।"
        exit 1
    fi
fi

LOG_FILE="bot_24_7.log"
CRASH_COUNT=0
MAX_QUICK_CRASHES=10

echo "🛡️====================================================🛡️"
echo "   TELEGRAM SCAM SHIELD BOT - 24/7 DAEMON RUNNER      "
echo "🛡️====================================================🛡️"
echo "📂 Working Directory: $SCRIPT_DIR"
echo "🐍 Python Binary: $PY_BIN"
echo "📝 Log File: $LOG_FILE"
echo "⏰ Started At: $(date)"
echo "--------------------------------------------------------"
echo "💡 सुझाव: बैकग्राउंड में छोड़ने के लिए 'Ctrl+C' मत दबाएं।"
echo "👉 लाइव लॉग्स देखने के लिए दूसरे टर्मिनल में चलाएं:"
echo "   tail -f $LOG_FILE"
echo "👉 बॉट को पूरी तरह बंद करने के लिए चलाएं:"
echo "   pkill -f run_24_7.sh ; pkill -f scam_shield_bot.py"
echo "--------------------------------------------------------"

# Infinite keep-alive loop
while true; do
    START_TIME=$(date +%s)
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🚀 बॉट चालू हो रहा है..." | tee -a "$LOG_FILE"

    # Run the bot
    $PY_BIN scam_shield_bot.py "$@" 2>&1 | tee -a "$LOG_FILE"
    EXIT_CODE=$?

    END_TIME=$(date +%s)
    RUNTIME=$((END_TIME - START_TIME))

    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️ बॉट प्रोसेस समाप्त हुई (Exit Code: $EXIT_CODE, चली: ${RUNTIME}s)" | tee -a "$LOG_FILE"

    # If user manually stopped with Ctrl+C (SIGINT 130) or SIGTERM (143), ask or stop
    if [ "$EXIT_CODE" -eq 130 ] || [ "$EXIT_CODE" -eq 143 ]; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🛑 बॉट यूजर द्वारा रोका गया (Exit Code $EXIT_CODE)।" | tee -a "$LOG_FILE"
        exit 0
    fi

    # Reset quick crash counter if ran for more than 60 seconds
    if [ "$RUNTIME" -gt 60 ]; then
        CRASH_COUNT=0
    else
        CRASH_COUNT=$((CRASH_COUNT + 1))
    fi

    # If it crashes too fast repeatedly (e.g. invalid token), pause longer to prevent loop explosion
    if [ "$CRASH_COUNT" -ge "$MAX_QUICK_CRASHES" ]; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] ❌ बॉट बार-बार तुरंत बंद हो रहा है। कृपया अपना BOT_TOKEN चेक करें।" | tee -a "$LOG_FILE"
        echo "⏳ 15 सेकंड का विराम..." | tee -a "$LOG_FILE"
        sleep 15
        CRASH_COUNT=0
    else
        echo "⏳ 3 सेकंड में ऑटो-रीस्टार्ट हो रहा है (24/7 Keep-Alive)..." | tee -a "$LOG_FILE"
        sleep 3
    fi
done
