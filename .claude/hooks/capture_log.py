#!/usr/bin/env python3
"""8x assignment capture hook: appends prompt/response entries to .agent-logs/.

Fired by Claude Code on UserPromptSubmit (records the prompt) and Stop
(records the final response text for that turn). Reads the hook JSON on
stdin per Claude Code's documented hook contract.
"""
import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
LOG_DIR = REPO_ROOT / ".agent-logs"
STATE_DIR = REPO_ROOT / ".claude" / "hooks" / ".state"
AUTHOR = "abdullahmirza-software"
PROJECT = REPO_ROOT.name
TOOL = "claude-code"


def now_iso():
    dt = datetime.now(timezone.utc)
    return dt.strftime("%Y-%m-%dT%H:%M:%S.") + f"{dt.microsecond // 1000:03d}Z"


def read_input():
    try:
        raw = sys.stdin.read()
        return json.loads(raw) if raw.strip() else {}
    except Exception:
        return {}


def read_transcript_lines(transcript_path):
    if not transcript_path or not os.path.exists(transcript_path):
        return []
    try:
        with open(transcript_path, "r", encoding="utf-8") as f:
            return f.readlines()
    except Exception:
        return []


def latest_model(transcript_path):
    for line in reversed(read_transcript_lines(transcript_path)):
        line = line.strip()
        if not line:
            continue
        try:
            obj = json.loads(line)
        except Exception:
            continue
        msg = obj.get("message", {})
        if obj.get("type") == "assistant" and msg.get("model"):
            return msg["model"]
    return "unknown"


def final_response(transcript_path):
    """Last assistant message that contains a text block: the final turn response."""
    for line in reversed(read_transcript_lines(transcript_path)):
        line = line.strip()
        if not line:
            continue
        try:
            obj = json.loads(line)
        except Exception:
            continue
        if obj.get("type") != "assistant":
            continue
        msg = obj.get("message", {})
        model = msg.get("model", "unknown")
        content = msg.get("content", [])
        texts = [
            b.get("text", "")
            for b in content
            if isinstance(b, dict) and b.get("type") == "text"
        ]
        if texts:
            return "\n".join(texts).strip(), model
    return "", "unknown"


def state_path(session_id):
    STATE_DIR.mkdir(parents=True, exist_ok=True)
    return STATE_DIR / f"{session_id}.json"


def load_state(session_id):
    p = state_path(session_id)
    if p.exists():
        try:
            return json.loads(p.read_text())
        except Exception:
            pass
    return None


def save_state(session_id, state):
    state_path(session_id).write_text(json.dumps(state))


def init_session(session_id):
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    ts = datetime.now(timezone.utc)
    fname = ts.strftime("%Y-%m-%d_%H-%M-%S") + f"_{session_id}.md"
    fpath = LOG_DIR / fname
    short = session_id.split("-")[0]
    date_str = ts.strftime("%Y-%m-%d")
    started = now_iso()
    header = f"""---
session_id: {session_id}
date: {date_str}
author: {AUTHOR}
model: pending
tool: {TOOL}
project: {PROJECT}
total_exchanges: 0
first_prompt_time: {started}
last_prompt_time: {started}
---

# Session Log - {date_str}

Session: `{short}` | Project: `{PROJECT}` | Author: `{AUTHOR}`

---
"""
    fpath.write_text(header)
    state = {"file": str(fpath), "num": 0}
    save_state(session_id, state)
    return state


def update_frontmatter(fpath, updates):
    text = fpath.read_text()
    m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not m:
        return
    fm = m.group(1)
    for key, value in updates.items():
        pattern = re.compile(rf"^{re.escape(key)}: .*$", re.MULTILINE)
        if pattern.search(fm):
            fm = pattern.sub(f"{key}: {value}", fm)
        else:
            fm += f"\n{key}: {value}"
    fpath.write_text(f"---\n{fm}\n---\n" + text[m.end():])


def append_entry(fpath, entry_type, num, session_id, model, content):
    ts = now_iso()
    short = session_id.split("-")[0]
    block = (
        f"\n[LOG_ENTRY type={entry_type} num={num} session={short}]\n"
        f"timestamp: {ts}\n"
        f"model: {model}\n\n"
        f"{content}\n\n"
    )
    with open(fpath, "a", encoding="utf-8") as f:
        f.write(block)
    return ts


def main():
    data = read_input()
    event = data.get("hook_event_name", "")
    session_id = data.get("session_id") or "unknown-session"
    transcript_path = data.get("transcript_path", "")

    state = load_state(session_id) or init_session(session_id)
    fpath = Path(state["file"])
    if not fpath.exists():
        # log file was deleted/moved out from under us; recreate the session
        state = init_session(session_id)
        fpath = Path(state["file"])

    if event == "UserPromptSubmit":
        prompt = data.get("prompt", "")
        if not prompt.strip():
            return
        model = latest_model(transcript_path)
        state["num"] = state.get("num", 0) + 1
        num = state["num"]
        ts = append_entry(fpath, "PROMPT", num, session_id, model, prompt)
        update_frontmatter(
            fpath,
            {"model": model, "total_exchanges": num, "last_prompt_time": ts},
        )
        save_state(session_id, state)

    elif event == "Stop":
        # The transcript's final write can lag slightly behind the Stop event
        # firing (seen with `claude -p`); retry briefly before giving up.
        text, model = "", "unknown"
        for _ in range(10):
            text, model = final_response(transcript_path)
            if text:
                break
            time.sleep(0.3)
        if not text:
            text = "_(no final text response captured for this turn)_"
        num = state.get("num", 1)
        append_entry(fpath, "RESPONSE", num, session_id, model, text)
        update_frontmatter(fpath, {"model": model})
        save_state(session_id, state)


if __name__ == "__main__":
    main()
