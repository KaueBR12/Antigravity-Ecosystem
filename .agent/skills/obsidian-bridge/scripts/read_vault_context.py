#!/usr/bin/env python3
"""
Obsidian Brain Bridge - Read Vault Context
Reads relevant context from the Obsidian vault for a given project.

Usage:
  python read_vault_context.py "ProjectName"
  python read_vault_context.py "ProjectName" --full

Output: Formatted context string printed to stdout for AI consumption.
"""

import argparse
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path

VAULT_ROOT = Path(os.path.expanduser("~/Documents/antigravity"))
TODAY = datetime.now().strftime("%Y-%m-%d")


def read_file_safe(filepath: Path) -> str:
    if filepath.exists():
        try:
            return filepath.read_text(encoding="utf-8")
        except Exception:
            return ""
    return ""


def find_project_moc(project_name: str) -> str:
    projects_dir = VAULT_ROOT / "10_Projects"
    if not projects_dir.exists():
        return ""

    for md_file in projects_dir.glob("*.md"):
        if project_name.lower() in md_file.stem.lower():
            return read_file_safe(md_file)

    return ""


def get_recent_decisions(project_name: str, days: int = 30) -> list:
    decisions_dir = VAULT_ROOT / "20_Decisions"
    if not decisions_dir.exists():
        return []

    cutoff = datetime.now() - timedelta(days=days)
    results = []

    for md_file in sorted(decisions_dir.glob("*.md"), reverse=True):
        name = md_file.stem
        if len(name) >= 10 and name[:4].isdigit():
            try:
                file_date = datetime.strptime(name[:10], "%Y-%m-%d")
                if file_date >= cutoff:
                    content = read_file_safe(md_file)
                    if project_name.lower() in content.lower():
                        results.append({
                            "file": md_file.name,
                            "content": content[:500]
                        })
            except ValueError:
                continue

    return results[:5]


def get_recent_daily_entries(project_name: str, days: int = 7) -> list:
    daily_dir = VAULT_ROOT / "40_Daily"
    if not daily_dir.exists():
        return []

    results = []
    for i in range(days):
        date = datetime.now() - timedelta(days=i)
        year = date.strftime("%Y")
        month = date.strftime("%m")
        date_str = date.strftime("%Y-%m-%d")
        filepath = daily_dir / year / month / f"{date_str}.md"

        if filepath.exists():
            content = read_file_safe(filepath)
            if project_name.lower() in content.lower():
                project_marker = f"### 🔵 {project_name}"
                if project_marker in content:
                    idx = content.index(project_marker)
                    end_idx = content.find("### 🔵", idx + len(project_marker))
                    if end_idx == -1:
                        end_idx = content.find("## 🧠", idx)
                    if end_idx == -1:
                        end_idx = content.find("## ✅", idx)
                    if end_idx == -1:
                        end_idx = min(idx + 500, len(content))
                    results.append({
                        "date": date_str,
                        "content": content[idx:end_idx].strip()
                    })

    return results


def get_relevant_gotchas(project_name: str) -> str:
    gotchas_file = VAULT_ROOT / "50_Learning" / "gotchas.md"
    content = read_file_safe(gotchas_file)

    if not content:
        return ""

    project_section_start = content.lower().find(f"## {project_name.lower()}")
    if project_section_start == -1:
        return ""

    next_section = content.find("\n## ", project_section_start + 1)
    if next_section == -1:
        return content[project_section_start:]

    return content[project_section_start:next_section].strip()


def get_preferences() -> str:
    prefs_file = VAULT_ROOT / "30_Patterns" / "preferences.md"
    return read_file_safe(prefs_file)


def main():
    parser = argparse.ArgumentParser(description="Read vault context for a project")
    parser.add_argument("project", help="Project name to load context for")
    parser.add_argument("--full", action="store_true",
                        help="Include full context (preferences + stack + gotchas)")
    parser.add_argument("--days", type=int, default=7,
                        help="Number of days to look back for daily entries")

    args = parser.parse_args()
    project = args.project

    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')

    print(f"=== VAULT CONTEXT: {project} ({TODAY}) ===\n")

    # 1. User preferences (always loaded)
    if args.full:
        prefs = get_preferences()
        if prefs:
            print("--- USER PREFERENCES ---")
            frontmatter_end = prefs.find("---", 4)
            if frontmatter_end != -1:
                print(prefs[frontmatter_end + 3:].strip()[:1000])
            print()

    # 2. Project MOC
    moc = find_project_moc(project)
    if moc:
        print("--- PROJECT CONTEXT ---")
        frontmatter_end = moc.find("---", 4)
        if frontmatter_end != -1:
            print(moc[frontmatter_end + 3:].strip()[:1500])
        print()
    else:
        print(f"ℹ️ No project MOC found for '{project}'")
        print()

    # 3. Recent decisions
    decisions = get_recent_decisions(project)
    if decisions:
        print("--- RECENT DECISIONS ---")
        for d in decisions:
            print(f"📋 {d['file']}")
            frontmatter_end = d['content'].find("---", 4)
            if frontmatter_end != -1:
                print(d['content'][frontmatter_end + 3:].strip()[:300])
            print()

    # 4. Recent daily entries
    daily = get_recent_daily_entries(project, args.days)
    if daily:
        print("--- RECENT ACTIVITY ---")
        for d in daily:
            print(f"📅 {d['date']}: {d['content'][:200]}")
        print()

    # 5. Known gotchas
    gotchas = get_relevant_gotchas(project)
    if gotchas:
        print("--- KNOWN GOTCHAS ---")
        print(gotchas[:500])
        print()

    print("=== END VAULT CONTEXT ===")


if __name__ == "__main__":
    main()
