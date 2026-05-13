#!/usr/bin/env python3
"""
Obsidian Brain Bridge - Learn Patterns
Updates pattern files in the Obsidian vault based on detected user preferences.

Usage:
  python learn_patterns.py --type preference --key "UI Framework" --value "Prefers CSS vanilla over Tailwind"
  python learn_patterns.py --type stack --key "Backend" --value "C# / ASP.NET Core"
  python learn_patterns.py --type code-style --key "Naming" --value "camelCase for variables"
  python learn_patterns.py --type gotcha --key "EF Core lazy loading" --value "Causes N+1 queries" --project "PontoUau"
  python learn_patterns.py --type tool --key "Obsidian" --value "Knowledge Management"
"""

import argparse
import os
import re
from datetime import datetime
from pathlib import Path

VAULT_ROOT = Path(os.path.expanduser("~/Documents/antigravity"))
TODAY = datetime.now().strftime("%Y-%m-%d")
NOW = datetime.now().strftime("%Y-%m-%d %H:%M")

PATTERN_FILES = {
    "preference": VAULT_ROOT / "30_Patterns" / "preferences.md",
    "stack": VAULT_ROOT / "30_Patterns" / "stack-choices.md",
    "code-style": VAULT_ROOT / "30_Patterns" / "code-style.md",
    "gotcha": VAULT_ROOT / "50_Learning" / "gotchas.md",
    "tool": VAULT_ROOT / "50_Learning" / "tools.md",
}


def read_file_safe(filepath: Path) -> str:
    if filepath.exists():
        try:
            return filepath.read_text(encoding="utf-8")
        except Exception:
            return ""
    return ""


def update_frontmatter_date(content: str) -> str:
    return re.sub(
        r'updated: "[^"]*"',
        f'updated: "{TODAY}"',
        content
    )


def append_pattern(filepath: Path, key: str, value: str, project: str = ""):
    content = read_file_safe(filepath)

    if not content:
        print(f"⚠️ File not found: {filepath}")
        return

    entry = f"- **{key}**: {value}"
    if project:
        entry += f" (projeto: {project})"

    if key.lower() in content.lower():
        print(f"ℹ️ Pattern '{key}' already exists in {filepath.name}, checking for update...")
        old_pattern = re.compile(
            r'-\s*\*\*' + re.escape(key) + r'\*\*:\s*.*',
            re.IGNORECASE
        )
        if old_pattern.search(content):
            content = old_pattern.sub(entry, content, count=1)
            content = update_frontmatter_date(content)
            filepath.write_text(content, encoding="utf-8")
            print(f"🔄 Updated pattern '{key}' in {filepath.name}")
            return

    last_section = content.rfind("\n## ")
    if last_section != -1:
        next_newline = content.find("\n", last_section + 4)
        if next_newline != -1:
            insert_pos = content.find("\n", next_newline)
            if insert_pos != -1:
                content = content[:insert_pos] + f"\n{entry}" + content[insert_pos:]
            else:
                content += f"\n{entry}\n"
        else:
            content += f"\n{entry}\n"
    else:
        content += f"\n{entry}\n"

    content = update_frontmatter_date(content)
    filepath.write_text(content, encoding="utf-8")
    print(f"✅ Added pattern '{key}' to {filepath.name}")


def append_gotcha(filepath: Path, key: str, value: str, project: str):
    content = read_file_safe(filepath)

    if not content:
        print(f"⚠️ File not found: {filepath}")
        return

    project_section = f"## {project}"

    if key.lower() in content.lower():
        print(f"ℹ️ Gotcha '{key}' already recorded, skipping.")
        return

    entry = f"""
### {key} ({TODAY})
- **Problema**: {value}
- **Solução**: (a ser preenchido quando resolvido)
"""

    if project_section in content:
        idx = content.index(project_section)
        next_section = content.find("\n## ", idx + len(project_section))
        if next_section == -1:
            content += entry
        else:
            content = content[:next_section] + entry + content[next_section:]
    else:
        content += f"\n{project_section}\n{entry}"

    content = update_frontmatter_date(content)
    filepath.write_text(content, encoding="utf-8")
    print(f"✅ Added gotcha '{key}' for {project}")


def append_tool(filepath: Path, key: str, value: str, project: str = ""):
    content = read_file_safe(filepath)

    if not content:
        print(f"⚠️ File not found: {filepath}")
        return

    if key.lower() in content.lower():
        print(f"ℹ️ Tool '{key}' already recorded, skipping.")
        return

    entry = f"| {key} | {value} | {project or '-'} |"

    last_table_row = content.rfind("|")
    if last_table_row != -1:
        end_of_line = content.find("\n", last_table_row)
        if end_of_line != -1:
            content = content[:end_of_line + 1] + entry + "\n" + content[end_of_line + 1:]
        else:
            content += f"\n{entry}\n"
    else:
        content += f"\n{entry}\n"

    content = update_frontmatter_date(content)
    filepath.write_text(content, encoding="utf-8")
    print(f"✅ Added tool '{key}'")


def main():
    parser = argparse.ArgumentParser(description="Learn and record patterns")
    parser.add_argument("--type", required=True,
                        choices=["preference", "stack", "code-style", "gotcha", "tool"],
                        help="Type of pattern")
    parser.add_argument("--key", required=True, help="Pattern key/name")
    parser.add_argument("--value", required=True, help="Pattern value/description")
    parser.add_argument("--project", default="", help="Related project")

    args = parser.parse_args()

    filepath = PATTERN_FILES.get(args.type)
    if not filepath:
        print(f"❌ Unknown pattern type: {args.type}")
        return

    if args.type == "gotcha":
        append_gotcha(filepath, args.key, args.value, args.project or "General")
    elif args.type == "tool":
        append_tool(filepath, args.key, args.value, args.project)
    else:
        append_pattern(filepath, args.key, args.value, args.project)


if __name__ == "__main__":
    main()
