#!/usr/bin/env python3
"""
Obsidian Brain Bridge - Import Skills
Scans all local Antigravity skills and generates individual Obsidian notes
plus a central MOC (Map of Content) catalog.
"""

import os
import re
from pathlib import Path

SKILLS_DIR = Path(os.path.expanduser("~/.gemini/antigravity/skills"))
VAULT_SKILLS_DIR = Path(os.path.expanduser("~/Documents/antigravity/60_Skills"))

def extract_frontmatter(content: str) -> dict:
    metadata = {}
    if content.startswith("---"):
        end_idx = content.find("---", 3)
        if end_idx != -1:
            yaml_block = content[3:end_idx].strip()
            for line in yaml_block.split("\n"):
                if ":" in line:
                    parts = line.split(":", 1)
                    key = parts[0].strip()
                    val = parts[1].strip().strip('"').strip("'")
                    metadata[key] = val
    return metadata

def sanitize_filename(name: str) -> str:
    return re.sub(r'[\\/*?:"<>|]', '-', name).strip()

def main():
    if not VAULT_SKILLS_DIR.exists():
        VAULT_SKILLS_DIR.mkdir(parents=True, exist_ok=True)
    
    skills_found = []
    
    for skill_folder in SKILLS_DIR.iterdir():
        if not skill_folder.is_dir():
            continue
            
        skill_md = skill_folder / "SKILL.md"
        if not skill_md.exists():
            continue
            
        try:
            content = skill_md.read_text(encoding="utf-8", errors="ignore")
            metadata = extract_frontmatter(content)
            
            # Fallback to folder name if name is missing
            name = metadata.get("name", skill_folder.name)
            description = metadata.get("description", "Sem descrição disponível.")
            trigger = metadata.get("trigger", "")
            
            filename = f"{sanitize_filename(name)}.md"
            filepath = VAULT_SKILLS_DIR / filename
            
            note_content = f"""---
type: skill
name: "{name}"
trigger: "{trigger}"
tags: [skill, auto-imported]
---

# 🛠️ Skill: {name}

> **Arquivo Local**: `{skill_md}`
> **Trigger**: `{trigger or 'N/A'}`

## Descrição
{description}

## Projetos que Utilizam
*(adicione links para os projetos que fazem uso frequente desta skill)*
- 

"""
            filepath.write_text(note_content, encoding="utf-8")
            
            skills_found.append({
                "name": name,
                "description": description,
                "trigger": trigger,
                "filename": filename
            })
            
        except Exception as e:
            print(f"Erro processando {skill_folder.name}: {e}")
            
    # Gerar o Catálogo (MOC)
    catalog_path = VAULT_SKILLS_DIR / "00_Skills_Catalog.md"
    
    # Sort skills alphabetically
    skills_found.sort(key=lambda x: x["name"].lower())
    
    catalog_content = f"""---
type: moc
title: "Skills Catalog"
count: {len(skills_found)}
tags: [moc, skills]
---

# 🗂️ Catálogo de Skills

> **Total de Skills Importadas**: {len(skills_found)}
> Esse catálogo contém todas as capacidades disponíveis para os agentes no Antigravity.

---

## 🔍 Índice Alfabético

"""
    # Group by first letter
    current_letter = ""
    for skill in skills_found:
        first_letter = skill["name"][0].upper()
        if not first_letter.isalpha():
            first_letter = "#"
            
        if first_letter != current_letter:
            catalog_content += f"### {first_letter}\n"
            current_letter = first_letter
            
        # Add link and short description
        short_desc = skill["description"][:100] + "..." if len(skill["description"]) > 100 else skill["description"]
        catalog_content += f"- [[{skill['filename'].replace('.md', '')}]] — {short_desc}\n"
        
    catalog_path.write_text(catalog_content, encoding="utf-8")
    print(f"✅ Importação concluída! {len(skills_found)} skills processadas.")
    print(f"✅ Catálogo gerado em: {catalog_path}")

if __name__ == "__main__":
    main()
