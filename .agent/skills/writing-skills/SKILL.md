---
name: writing-skills
description: "Use when creating, updating, or improving agent skills."
category: meta
risk: unknown
source: community
date_added: "2026-02-27"
---

# Writing Skills (Excellence)

Dispatcher for skill creation excellence. Use the decision tree below to find the right template and standards.

## ⚡ Quick Decision Tree

### What do you need to do?

1. **Create a NEW skill:**
   - Is it simple (single file, <200 lines)? → [Tier 1 Architecture](references/tier-1-simple/README.md)
   - Is it complex (multi-concept, 200-1000 lines)? → [Tier 2 Architecture](references/tier-2-expanded/README.md)
   - Is it a massive platform (10+ products, AWS, Convex)? → [Tier 3 Architecture](references/tier-3-platform/README.md)

2. **Improve an EXISTING skill:**
   - Fix "it's too long" -> [Modularize (Tier 3)](references/templates/tier-3-platform.md)
   - Fix "AI ignores rules" -> [Anti-Rationalization](references/anti-rationalization/README.md)
   - Fix "users can't find it" -> [CSO (Search Optimization)](references/cso/README.md)

3. **Verify Compliance:**
   - Check metadata/naming -> [Standards](references/standards/README.md)
   - Add tests -> [Testing Guide](references/testing/README.md)

## 📚 Component Index

| Component | Purpose |
|-----------|---------|
| **[CSO](references/cso/README.md)** | "SEO for LLMs". How to write descriptions that trigger. |
| **[Standards](references/standards/README.md)** | File naming, YAML frontmatter, directory structure. |
| **[Anti-Rationalization](references/anti-rationalization/README.md)**| How to write rules that agents won't ignore. |
| **[Testing](references/testing/README.md)** | How to ensure your skill actually works. |

## 🛠️ Templates

- [Technique Skill](references/templates/technique.md) (How-to)
- [Reference Skill](references/templates/reference.md) (Docs)
- [Discipline Skill](references/templates/discipline.md) (Rules)
- [Pattern Skill](references/templates/pattern.md) (Design Patterns)

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

## When to Use

- Creating a NEW skill from scratch
- Improving an EXISTING skill that agents ignore
- Debugging why a skill isn't being triggered
- Standardizing skills across a team

## How It Works

1. **Identify goal** → Use decision tree above
2. **Select template** → From `references/templates/`
3. **Apply CSO** → Optimize description for discovery
4. **Add anti-rationalization** → For discipline skills
5. **Test** → RED-GREEN-REFACTOR cycle

## Quick Example

```yaml
---
name: my-technique
description: Use when [specific symptom occurs].
metadata:
  category: technique
  triggers: error-text, symptom, tool-name
---

# My Technique

## When to Use
- [Symptom A]
- [Error message]
```

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Description summarizes workflow | Use "Use when..." triggers only |
| No `metadata.triggers` | Add 3+ keywords |
| Generic name ("helper") | Use gerund (`creating-skills`) |
| Long monolithic SKILL.md | Split into `references/` |

See [gotchas.md](gotchas.md) for more.

## ✅ Pre-Deploy Checklist

Before deploying any skill:

- [ ] `name` field matches directory name exactly
- [ ] `SKILL.md` filename is ALL CAPS
- [ ] Description starts with "Use when..."
- [ ] `metadata.triggers` has 3+ keywords
- [ ] Total lines < 500 (use `references/` for more)
- [ ] No `@` force-loading in cross-references
- [ ] Tested with real scenarios

## 🔗 Related Skills

- **opencode-expert**: For OpenCode environment configuration
- Use `/write-skill` command for guided skill creation

## Examples

**Create a Tier 1 skill:**
```bash
mkdir -p ~/.config/opencode/skills/my-technique
touch ~/.config/opencode/skills/my-technique/SKILL.md
```

**Create a Tier 2 skill:**
```bash
mkdir -p ~/.config/opencode/skills/my-skill/references/core
touch ~/.config/opencode/skills/my-skill/{SKILL.md,gotchas.md}
touch ~/.config/opencode/skills/my-skill/references/core/README.md
```
