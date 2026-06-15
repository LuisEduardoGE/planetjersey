#!/usr/bin/env python3
"""Dev launcher for Planet Jersey.

Convenience wrapper so the store can be started with `python run.py` instead of
remembering the npm incantation. It:
  1. Verifies Node/npm are available.
  2. Installs dependencies if `node_modules` is missing.
  3. Starts the Vite dev server (which auto-opens the browser on :5173).

Run from anywhere — paths are resolved relative to this file.
"""
from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DEV_URL = "http://localhost:5173"


def npm() -> str:
    """Resolve the npm executable (npm.cmd on Windows, npm elsewhere)."""
    for candidate in ("npm", "npm.cmd"):
        path = shutil.which(candidate)
        if path:
            return path
    sys.exit("npm not found. Install Node.js from https://nodejs.org and retry.")


def run(args: list[str]) -> None:
    """Run a command in the project root, streaming output; exit on failure."""
    result = subprocess.run(args, cwd=ROOT)
    if result.returncode != 0:
        sys.exit(result.returncode)


def main() -> None:
    npm_exe = npm()

    if not (ROOT / "node_modules").exists():
        print("- Installing dependencies (first run)...")
        run([npm_exe, "install"])

    print(f"- Starting Planet Jersey dev server -> {DEV_URL}")
    print("  (Press Ctrl+C to stop.)")
    try:
        run([npm_exe, "run", "dev"])
    except KeyboardInterrupt:
        print("\n- Dev server stopped. Bye!")


if __name__ == "__main__":
    main()
