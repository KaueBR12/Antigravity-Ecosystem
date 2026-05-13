---
name: blueprint
description: "Turn a one-line objective into a step-by-step construction plan any coding agent can execute cold. Each step has a self-contained context brief — a fresh agent in a new session can pick up any step without reading prior steps."
category: planning
risk: safe
source: community
date_added: "2026-03-10"
---

# Blueprint — Construction Plan Generator

Turn a one-line objective into a step-by-step plan any coding agent can execute cold.

## Overview

Blueprint is for multi-session, multi-agent engineering projects where each step must be independently executable by a fresh agent that has never seen the conversation history. Install it once, invoke it with `/blueprint <project> <objective>`.

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

- Use when the task requires multiple PRs or sessions
- Use when multiple agents or team members need to share execution
- Use when you want adversarial review of the plan before execution
- Use when parallel step detection and dependency graphs matter

## How It Works

1. **Research** — Scans the codebase, reads project memory, runs pre-flight checks
2. **Design** — Breaks the objective into one-PR-sized steps, identifies parallelism, assigns model tiers
3. **Draft** — Generates the plan from a structured template with branch workflow rules, CI policy, and rollback strategies inline
4. **Review** — Delegates adversarial review to a strongest-model sub-agent (falls back to default model if unavailable)
5. **Register** — Saves the plan and updates project memory

## Examples

### Example 1: Database migration
```
/blueprint myapp "migrate database to PostgreSQL"
```

### Example 2: Plugin extraction
```
/blueprint antbot "extract providers into plugins"
```

## Best Practices

- ✅ Use for tasks requiring 3+ PRs or multiple sessions
- ✅ Let Blueprint auto-detect git/gh availability — it degrades gracefully
- ❌ Don't invoke for tasks completable in a single PR
- ❌ Don't invoke when the user says "just do it"

## Key Differentiators

- **Cold-start execution**: Every step has a self-contained context brief
- **Adversarial review gate**: Strongest-model review before execution
- **Zero runtime risk**: Pure markdown — no hooks, no scripts, no executable code
- **Plan mutation protocol**: Steps can be split, inserted, skipped with audit trail

## Installation

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/antbotlab/blueprint.git ~/.claude/skills/blueprint
```

## Additional Resources

- [GitHub Repository](https://github.com/antbotlab/blueprint)
- [Examples: small plan](https://github.com/antbotlab/blueprint/blob/main/examples/small-plan.md)
- [Examples: large plan](https://github.com/antbotlab/blueprint/blob/main/examples/large-plan.md)
