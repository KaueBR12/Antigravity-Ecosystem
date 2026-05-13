#!/usr/bin/env python3
"""
Obsidian Brain Bridge - Sync to Obsidian
Creates and updates notes in the Obsidian vault.

Usage:
  python sync_to_obsidian.py --type conversation --project "PontoUau" --topic "Fix auth" ...
  python sync_to_obsidian.py --type decision --project "PontoUau" --title "Use JWT" ...
  python sync_to_obsidian.py --type daily --project "PontoUau" --progress "Fixed RBAC" ...
  python sync_to_obsidian.py --type project-update --project "PontoUau" --status "Active" ...
"""

import argparse
import os
import re
from datetime import datetime
from pathlib import Path

VAULT_ROOT = Path(os.path.expanduser("~/Documents/antigravity"))
TODAY = datetime.now().strftime("%Y-%m-%d")
NOW = datetime.now().strftime("%Y-%m-%d %H:%M")


def sanitize_filename(name: str) -> str:
    return re.sub(r'[\\/*?:"<>|]', '-', name).strip()


def ensure_dir(path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)


def create_conversation_note(args):
    slug = sanitize_filename(args.topic or "untitled")[:60]
    filename = f"{TODAY}-{slug}.md"
    filepath = VAULT_ROOT / "00_Inbox" / filename

    content = f"""---
type: conversation
project: "{args.project}"
date: "{TODAY}"
workspace: "{args.workspace or ''}"
tags: [conversation, ai-generated, {args.project.lower()}]
---

# 💬 {args.topic or 'Conversa'}

> **Projeto**: {args.project}
> **Data**: {NOW}
> **Workspace**: {args.workspace or 'N/A'}

---

## 🎯 Objetivo da Conversa
{args.summary or '(não especificado)'}

## 🛠️ O que foi feito
{args.files_changed or '(nenhuma alteração registrada)'}

## 📝 Decisões Tomadas
{args.decisions or '(nenhuma decisão registrada)'}

## ⏭️ Próximos Passos
{args.next_steps or '(nenhum próximo passo registrado)'}
"""

    ensure_dir(filepath)

    if filepath.exists():
        existing = filepath.read_text(encoding="utf-8")
        separator = f"\n\n---\n\n## 🔄 Atualização ({NOW})\n\n"
        update = f"{args.summary or ''}\n{args.files_changed or ''}"
        filepath.write_text(existing + separator + update, encoding="utf-8")
        print(f"📝 Updated: {filepath}")
    else:
        filepath.write_text(content, encoding="utf-8")
        print(f"✅ Created: {filepath}")

    return filepath


def create_decision_note(args):
    slug = sanitize_filename(args.title or "untitled")[:60]
    filename = f"{TODAY}_{slug}.md"
    filepath = VAULT_ROOT / "20_Decisions" / filename

    content = f"""---
type: decision
project: "{args.project}"
date: "{TODAY}"
status: accepted
tags: [decision, adr, {args.project.lower()}]
---

# 🏛️ ADR: {args.title}

> **Projeto**: {args.project}
> **Data**: {NOW}
> **Status**: Aceita

---

## Contexto
{args.context or '(não especificado)'}

## Decisão
{args.decision or '(não especificada)'}

## Alternativas Consideradas
{args.alternatives or '(nenhuma registrada)'}
"""

    ensure_dir(filepath)
    filepath.write_text(content, encoding="utf-8")
    print(f"✅ Decision recorded: {filepath}")
    return filepath


def update_daily_note(args):
    year = datetime.now().strftime("%Y")
    month = datetime.now().strftime("%m")
    filepath = VAULT_ROOT / "40_Daily" / year / month / f"{TODAY}.md"

    project_section = f"""
### 🔵 {args.project}
- **Progresso**: {args.progress or '(não especificado)'}
"""

    learnings_section = ""
    if args.learnings:
        learnings_section = f"\n## 🧠 Aprendizados\n{args.learnings}\n"

    ensure_dir(filepath)

    if filepath.exists():
        existing = filepath.read_text(encoding="utf-8")
        marker = f"### 🔵 {args.project}"
        if marker in existing:
            pattern = re.escape(marker) + r".*?(?=### 🔵|## 🧠|## ✅|\Z)"
            existing = re.sub(pattern, "", existing, flags=re.DOTALL)

        insertion_point = "## 📁 Projetos Trabalhados"
        if insertion_point in existing:
            existing = existing.replace(
                insertion_point,
                f"{insertion_point}{project_section}"
            )
        else:
            existing += project_section

        if learnings_section and "## 🧠 Aprendizados" in existing:
            existing = existing.replace(
                "## 🧠 Aprendizados",
                f"## 🧠 Aprendizados\n{args.learnings}"
            )
        elif learnings_section:
            existing += learnings_section

        filepath.write_text(existing, encoding="utf-8")
        print(f"📝 Updated daily: {filepath}")
    else:
        content = f"""---
type: daily
date: "{TODAY}"
tags: [daily, devlog]
---

# 📔 {TODAY} — Daily DevLog

> 🌟 **Destaque do dia**: Trabalhado em {args.project}

---

## 📁 Projetos Trabalhados
{project_section}
{learnings_section}
---

## ✅ Action Items Globais
- [ ] Revisar progresso do dia
"""
        filepath.write_text(content, encoding="utf-8")
        print(f"✅ Created daily: {filepath}")

    return filepath


def update_project_moc(args):
    filename = f"{sanitize_filename(args.project)}.md"
    filepath = VAULT_ROOT / "10_Projects" / filename

    if not filepath.exists():
        stack = args.stack if hasattr(args, 'stack') and args.stack else "[]"
        content = f"""---
type: project
name: "{args.project}"
workspace: "{args.workspace or ''}"
created: "{TODAY}"
stack: {stack}
tags: [project, moc, {args.project.lower()}]
---

# 📁 {args.project}

> **Workspace**: {args.workspace or 'N/A'}
> **Criado em**: {TODAY}

---

## 🎯 Objetivo
(a ser preenchido)

## 🛠️ Tech Stack
(a ser preenchido)

## 📊 Status Atual
{args.status or 'Ativo'}

---

## 🗂️ Notas Relacionadas

### Conversas Recentes
-

### Decisões Técnicas
-

### Problemas Conhecidos
-

---

## 📈 Timeline
| Data | Evento |
|------|--------|
| {TODAY} | Projeto registrado no vault |
"""
        ensure_dir(filepath)
        filepath.write_text(content, encoding="utf-8")
        print(f"✅ Created project MOC: {filepath}")
    else:
        existing = filepath.read_text(encoding="utf-8")
        event = args.event or f"Sessão de trabalho em {args.project}"
        timeline_entry = f"| {TODAY} | {event} |"

        if timeline_entry not in existing:
            existing = existing.rstrip()
            existing += f"\n{timeline_entry}\n"
            filepath.write_text(existing, encoding="utf-8")
            print(f"📝 Updated project MOC: {filepath}")
        else:
            print(f"ℹ️ Timeline entry already exists, skipping.")

    return filepath


def main():
    parser = argparse.ArgumentParser(description="Obsidian Brain Bridge - Sync")
    parser.add_argument("--type", required=True,
                        choices=["conversation", "decision", "daily", "project-update"],
                        help="Type of note to create/update")
    parser.add_argument("--project", required=True, help="Project name")
    parser.add_argument("--workspace", default="", help="Workspace path")
    parser.add_argument("--topic", default="", help="Conversation topic")
    parser.add_argument("--summary", default="", help="Brief summary")
    parser.add_argument("--decisions", default="", help="Decisions made")
    parser.add_argument("--files-changed", default="", help="Files modified")
    parser.add_argument("--next-steps", default="", help="Next steps")
    parser.add_argument("--title", default="", help="Decision title")
    parser.add_argument("--context", default="", help="Decision context")
    parser.add_argument("--decision", default="", help="Decision description")
    parser.add_argument("--alternatives", default="", help="Alternatives considered")
    parser.add_argument("--progress", default="", help="Daily progress")
    parser.add_argument("--learnings", default="", help="Learnings")
    parser.add_argument("--status", default="", help="Project status")
    parser.add_argument("--event", default="", help="Timeline event")

    args = parser.parse_args()

    if args.type == "conversation":
        create_conversation_note(args)
    elif args.type == "decision":
        create_decision_note(args)
    elif args.type == "daily":
        update_daily_note(args)
    elif args.type == "project-update":
        update_project_moc(args)


if __name__ == "__main__":
    main()
