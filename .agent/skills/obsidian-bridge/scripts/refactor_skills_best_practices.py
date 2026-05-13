#!/usr/bin/env python3
"""
Mass Refactoring Script: Injects 2026 Market Best Practices into all SKILL.md files.
It tries to place the section smartly before "Examples", "How It Works", or "Limitations".
"""

import os
import re
from pathlib import Path

SKILLS_DIR = Path(os.path.expanduser("~/.gemini/antigravity/skills"))

BEST_PRACTICES_BLOCK = """

## 🏆 Market Best Practices & Clean Code (2026)

> *This section is universally enforced across all tasks performed by this skill.*

1. **Security First (Zero Trust)**:
   - Validate all inputs strictly.
   - Never hardcode secrets or credentials.
   - Apply principle of least privilege in APIs and Database queries.
   - Adhere to OWASP Top 10 guidelines.

2. **Clean Code & SOLID Principles**:
   - Write code for humans first, machines second.
   - Functions must have a Single Responsibility and no side-effects.
   - Use highly descriptive variable/function names over comments.
   - Keep cyclomatic complexity low (avoid deep nesting).

3. **Test-Driven & Reliability (AAA Pattern)**:
   - Follow Arrange-Act-Assert pattern for all tests.
   - Ensure comprehensive coverage (Unit > Integration > E2E).
   - Handle errors gracefully as values (e.g., Result/Either patterns) rather than throwing naked exceptions.

4. **Performance & Observability**:
   - Optimize for Core Web Vitals (Frontend) and latency (Backend).
   - Implement structured logging and distributed tracing.
   - Design for horizontal scalability and graceful degradation.

5. **AI-Assisted Quality Control**:
   - Verify all generated logic against the project's Architecture Decision Records (ADRs).
   - Prioritize determinism and type safety over "clever" dynamic hacks.

"""

def refactor_skill(filepath: Path) -> bool:
    content = filepath.read_text(encoding="utf-8", errors="ignore")
    
    # Skip if already injected
    if "Market Best Practices & Clean Code" in content:
        return False
        
    lines = content.split('\n')
    
    # Try to find a good injection point
    injection_index = -1
    markers = [
        re.compile(r'^##\s+Examples?', re.IGNORECASE),
        re.compile(r'^##\s+How It Works', re.IGNORECASE),
        re.compile(r'^##\s+Limitations', re.IGNORECASE),
        re.compile(r'^##\s+When to Use', re.IGNORECASE)
    ]
    
    for i, line in enumerate(lines):
        for marker in markers:
            if marker.match(line):
                injection_index = i
                break
        if injection_index != -1:
            break
            
    if injection_index != -1:
        # Insert before the marker
        lines.insert(injection_index, BEST_PRACTICES_BLOCK.strip('\n'))
        lines.insert(injection_index + 1, "")
    else:
        # Append to the end if no markers found
        lines.append(BEST_PRACTICES_BLOCK.strip('\n'))
        
    new_content = '\n'.join(lines)
    
    # Fix multiple blank lines
    new_content = re.sub(r'\n{3,}', '\n\n', new_content)
    
    filepath.write_text(new_content, encoding="utf-8")
    return True

def main():
    updated_count = 0
    skipped_count = 0
    
    for skill_folder in SKILLS_DIR.iterdir():
        if not skill_folder.is_dir():
            continue
            
        skill_md = skill_folder / "SKILL.md"
        if not skill_md.exists():
            continue
            
        try:
            if refactor_skill(skill_md):
                updated_count += 1
            else:
                skipped_count += 1
        except Exception as e:
            print(f"Erro em {skill_folder.name}: {e}")
            
    print(f"✅ Refatoração concluída!")
    print(f"✅ {updated_count} skills atualizadas com sucesso.")
    print(f"ℹ️ {skipped_count} skills já possuíam a seção ou foram puladas.")

if __name__ == "__main__":
    main()
