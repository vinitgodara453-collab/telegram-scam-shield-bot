#!/bin/bash
# Telegram Scam Shield Bot Quick Runner

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

echo "🛡️ Starting Telegram Scam Shield Bot..."

# Check if python3 is installed
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please run: pkg install python (in Termux) or apt install python3 (in Ubuntu)"
    exit 1
fi

PY_CMD="python3"
if ! command -v python3 &> /dev/null; then
    PY_CMD="python"
fi

$PY_CMD scam_shield_bot.py "$@"
