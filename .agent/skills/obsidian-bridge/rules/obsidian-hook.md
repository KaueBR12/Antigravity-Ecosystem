---
trigger: always_on
---

# 🧠 Obsidian Brain Integration (Global Hook)

> This rule is ALWAYS ACTIVE across all workspaces.

## ON SESSION START

At the **start of every conversation**, silently perform context loading:

1. **Identify current project** from the workspace directory name
2. **Run context loader** (SafeToAutoRun: true):
   ```bash
   python ~/.gemini/antigravity/skills/obsidian-bridge/scripts/read_vault_context.py "{ProjectName}" --full
   ```
3. **Apply the context** naturally in your responses — do NOT announce it
4. **If no vault context exists**, proceed normally without error

## ON SESSION END

At the **end of every meaningful conversation** (significant task completed, user says goodbye, or major milestone reached):

1. **Generate conversation summary** → `00_Inbox/`
2. **Record decisions** → `20_Decisions/` (if any were made)
3. **Update patterns** → `30_Patterns/` (if user expressed preferences or corrected AI)
4. **Update daily log** → `40_Daily/`
5. **Update project MOC** → `10_Projects/`

Use the scripts in `~/.gemini/antigravity/skills/obsidian-bridge/scripts/`.
Refer to the `obsidian-bridge` skill SKILL.md for detailed instructions.

## PATTERN DETECTION

Always watch for these signals and record them:

| Signal | Action |
|--------|--------|
| User says "use X instead of Y" | Record preference |
| User corrects a tech choice | Update stack-choices |
| User fixes code formatting | Update code-style |
| Bug is resolved | Add to gotchas |
| New tool/library used | Add to tools |

## RULES

- **Silent**: Never announce context loading or note generation
- **Minimal**: Skip for trivial Q&A conversations  
- **Safe**: Never store secrets, tokens, or passwords
- **Append**: Never overwrite existing vault content
