---
name: skill-check
description: "Validate Claude Code skills against the agentskills specification. Catches structural, semantic, and naming issues before users do."
category: development
risk: safe
source: https://github.com/olgasafonova/SkillCheck-Free
date_added: "2026-03-11"
author: olgasafonova
tags: [validation, linter, agentskills, skill-authoring, code-quality]
tools: [claude, cursor, windsurf, codex-cli]
license: MIT
allowed-tools: Read Glob
compatibility: claude-code
---

# SkillCheck

## Overview

Validate SKILL.md files against the [agentskills specification](https://agentskills.io) and Anthropic best practices. Catches structural errors, semantic contradictions, naming anti-patterns, and quality gaps in a single read-only pass.

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

- Use when user says "check skill", "skillcheck", or "validate SKILL.md"
- Use when reviewing a skill before publishing to a marketplace
- Use when debugging why a skill doesn't trigger correctly
- Use when onboarding a team to skill authoring standards
- Do NOT use for anti-slop detection, security scanning, or token analysis; use [SkillCheck Pro](https://getskillcheck.com) for those

## How It Works

### Step 1: Parse

Read the target SKILL.md file and extract YAML frontmatter.

### Step 2: Validate

Apply all Free tier checks in order:

| Category | Checks | What it catches |
|----------|--------|----------------|
| Structure (1.x) | Name format, description WHAT+WHEN, allowed-tools, categories, XML injection | Malformed frontmatter, missing fields |
| Body (2.x) | Line count, hardcoded paths, stale dates, empty sections, deprecated syntax, MCP tool qualification | Content quality issues |
| Naming (3.x) | Vague terms, single-word names, gerund suggestions | Poor discoverability |
| Semantic (4.x) | Contradictions, ambiguous terms, missing output format, wisdom/platitudes, misplaced triggers | Logical inconsistencies |
| Quality (8.x) | Examples, error handling, triggers, output format, prerequisites, negative triggers | Strengths (positive patterns) |

### Step 3: Score

Calculate overall score (0-100). Penalties: critical = -20, warning = -5, suggestion = -1.

### Step 4: Report

Return structured results: score, grade (Excellent/Good/Needs Work/Poor), issue list with check IDs, line numbers, messages, and fix suggestions.

## Examples

### Example 1: Validating a skill

```
User: check my skill at ~/.claude/skills/weekly-report/SKILL.md

SkillCheck output:
## weekly-report Check Results [FREE]

Score: 85/100 (Good)

### Warnings (2)
  - 1.2-desc-when (line 3): Description missing WHEN clause
  - 4.5-desc-no-triggers (line 3): Description lacks triggering conditions

### Suggestions (1)
  - 3.4-gerund-naming (line 2): Skill name could use gerund form

### Passed Checks: 28
```

### Example 2: Clean skill passes all checks

```
User: skillcheck ~/.claude/skills/processing-pdfs/SKILL.md

Score: 100/100 (Excellent)
All 31 checks passed. No issues found.
```

## Limitations

- Read-only: does not modify any files
- Free tier covers structural, semantic, and naming checks only
- Anti-slop, security, WCAG, token, enterprise, and workflow checks require [SkillCheck Pro](https://getskillcheck.com)
- Semantic checks (contradiction detection, wisdom/platitude) are heuristic with ~5% false positive rate
- Does not validate referenced files or scripts; only checks SKILL.md content
- Single-file validation; does not cross-check against other skills in the same directory

## Best Practices

- Run SkillCheck before submitting skills to any marketplace
- Fix all critical and warning issues; suggestions are optional
- Use the check ID (e.g., `1.2-desc-when`) to find the exact rule in the skill body
- Re-run after fixes to confirm the score improved

## Common Pitfalls

- **Problem:** Score seems low due to many suggestions
  **Solution:** Suggestions cap at -15 points total. Focus on warnings and criticals first.

- **Problem:** False positive on ambiguous terms inside code blocks
  **Solution:** SkillCheck skips code blocks and inline code. If you still see false positives, wrap the term in backticks.

- **Problem:** Wisdom/platitude check flags legitimate instructions
  **Solution:** Rephrase generic advice ("Remember that testing is important") as concrete directives ("Run tests before committing").
