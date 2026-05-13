---
name: obsidian-bridge
description: "Bidirectional Antigravity ↔ Obsidian integration. Auto-generates conversation summaries, captures decisions, learns patterns, and reads vault context. Always active."
risk: safe
source: self
version: 1.0
trigger: always_on
---

# 🧠 Obsidian Brain Bridge

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

## When to Use This Skill

This skill is **always active**. It provides bidirectional integration between Antigravity and the Obsidian vault at `~/Documents/antigravity`.

## Do Not Use This Skill When

- Never. This skill is always on.

---

## Core Paths

| Path | Purpose |
|------|---------|
| `~/Documents/antigravity/00_Inbox/` | Raw conversation notes |
| `~/Documents/antigravity/10_Projects/` | Project MOCs |
| `~/Documents/antigravity/20_Decisions/` | Architecture Decision Records |
| `~/Documents/antigravity/30_Patterns/` | User preferences and patterns |
| `~/Documents/antigravity/40_Daily/` | Daily devlogs |
| `~/Documents/antigravity/50_Learning/` | KIs, gotchas, tools |

---

## 📥 ON SESSION START — Context Loading

**At the START of every conversation, silently perform:**

1. **Identify the current project** from the workspace path
2. **Read user preferences**:
   ```
   Read ~/Documents/antigravity/30_Patterns/preferences.md
   ```
3. **Check if project MOC exists**:
   ```
   Read ~/Documents/antigravity/10_Projects/{ProjectName}.md
   ```
4. **If MOC exists**, extract:
   - Current status
   - Recent decisions
   - Known problems (from gotchas)
5. **Apply context** to improve responses (use preferences for language, style, stack choices)

> ⚠️ **Silent Operation**: Do NOT tell the user you are loading context. Just use it naturally.
> ⚠️ **Fail Gracefully**: If files don't exist, proceed normally without error.

---

## 📤 ON SESSION END — Knowledge Capture

**At the END of every meaningful conversation (when user says goodbye, or after completing a significant task):**

### Step 1: Generate Conversation Summary
Run the sync script to create a note in `00_Inbox/`:

```bash
python ~/.gemini/antigravity/skills/obsidian-bridge/scripts/sync_to_obsidian.py \
  --type conversation \
  --project "{ProjectName}" \
  --workspace "{WorkspacePath}" \
  --topic "{ConversationTopic}" \
  --summary "{BriefSummary}" \
  --decisions "{DecisionsMade}" \
  --files-changed "{FilesModified}" \
  --next-steps "{NextSteps}"
```

Set `SafeToAutoRun: true` for this script.

### Step 2: Detect and Record Decisions
If a technical decision was made during the conversation:

```bash
python ~/.gemini/antigravity/skills/obsidian-bridge/scripts/sync_to_obsidian.py \
  --type decision \
  --project "{ProjectName}" \
  --title "{DecisionTitle}" \
  --context "{WhyThisDecision}" \
  --decision "{WhatWasDecided}" \
  --alternatives "{AlternativesConsidered}"
```

### Step 3: Update Patterns (Learning)
If the user corrected the AI, expressed a preference, or a new pattern was detected:

```bash
python ~/.gemini/antigravity/skills/obsidian-bridge/scripts/learn_patterns.py \
  --type "{preference|stack|code-style|gotcha|tool}" \
  --key "{PatternKey}" \
  --value "{PatternValue}" \
  --project "{ProjectName}"
```

### Step 4: Update Daily Log
```bash
python ~/.gemini/antigravity/skills/obsidian-bridge/scripts/sync_to_obsidian.py \
  --type daily \
  --project "{ProjectName}" \
  --progress "{WhatWasDone}" \
  --learnings "{WhatWasLearned}"
```

### Step 5: Update Project MOC
```bash
python ~/.gemini/antigravity/skills/obsidian-bridge/scripts/sync_to_obsidian.py \
  --type project-update \
  --project "{ProjectName}" \
  --workspace "{WorkspacePath}" \
  --status "{CurrentStatus}" \
  --event "{TodayEvent}"
```

---

## 🔍 Pattern Detection Rules

Detect and record patterns in the following situations:

| Trigger | Pattern Type | Action |
|---------|-------------|--------|
| User says "use X instead of Y" | `preference` | Record in preferences.md |
| User corrects a tech choice | `stack` | Update stack-choices.md |
| User fixes code style | `code-style` | Update code-style.md |
| Bug is resolved | `gotcha` | Add to gotchas.md |
| New tool is used | `tool` | Add to tools.md |
| User rejects a suggestion | `preference` | Record the rejection |

---

## 📋 Templates

When creating notes, use the frontmatter format from `90_Templates/`. Key fields:

```yaml
---
type: conversation|decision|daily|project
project: "ProjectName"
date: "YYYY-MM-DD"
workspace: "/path/to/workspace"
tags: [auto-generated tags]
---
```

---

## ⚡ Important Rules

1. **Never pollute**: Each project's data stays isolated in its own sections
2. **Append, don't overwrite**: When updating existing files, ALWAYS append
3. **Fail gracefully**: If Obsidian vault is not accessible, continue normally
4. **Silent operation**: Don't announce context loading or note generation
5. **Minimal overhead**: Only generate notes for meaningful conversations (not quick Q&A)
6. **Privacy**: Never store tokens, passwords, API keys, or secrets in the vault
