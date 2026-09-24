#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export LOQ_REQUIRE_AUTH="${LOQ_REQUIRE_AUTH:-false}"
export LOQ_DATA_DIR="${LOQ_DATA_DIR:-$ROOT/.local-data}"

cd "$ROOT/backend"
if [[ ! -d .venv ]]; then
  python3 -m venv .venv
  .venv/bin/pip install -r requirements.txt
fi
source .venv/bin/activate

cd "$ROOT/frontend"
if [[ ! -d node_modules ]]; then
  npm install
fi

trap 'kill 0' EXIT
python "$ROOT/backend/run.py" &
npm run dev &
wait
