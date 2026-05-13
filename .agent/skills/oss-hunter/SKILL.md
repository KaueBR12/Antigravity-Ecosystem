---
name: oss-hunter
description: "Automatically hunt for high-impact OSS contribution opportunities in trending repositories."
risk: safe
source: "https://github.com/jackjin1997/ClawForge"
date_added: "2026-02-27"
---

# OSS Hunter 🎯

A precision skill for agents to find, analyze, and strategize for high-impact Open Source contributions. This skill helps you become a top-tier contributor by identifying the most "mergeable" and influential issues in trending repositories.

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

- Use when the user asks to find open source issues to work on.
- Use when searching for "help wanted" or "good first issue" tasks in specific domains like AI or Web3.
- Use to generate a "Contribution Dossier" with ready-to-execute strategies for trending projects.

## Quick Start

Ask your agent:
- "Find me some help-wanted issues in trending AI repositories."
- "Hunt for bug fixes in langchain-ai/langchain that are suitable for a quick PR."
- "Generate a contribution dossier for the most recent trending projects on GitHub."

## Workflow

When hunting for contributions, the agent follows this multi-stage protocol:

### Phase 1: Repository Discovery
Use `web_search` or `gh api` to find trending repositories.
Focus on:
- Stars > 1000
- Recent activity (pushed within 24 hours)
- Relevant topics (AI, Agentic, Web3, Tooling)

### Phase 2: Issue Extraction
Search for specific labels:
- `help-wanted`
- `good-first-issue`
- `bug`
- `v1` / `roadmap`

```bash
gh issue list --repo owner/repo --label "help wanted" --limit 10
```

### Phase 3: Feasibility Analysis
Analyze the issue:
1. **Reproducibility**: Is there a code snippet to reproduce the bug?
2. **Impact**: How many users does this affect?
3. **Mergeability**: Check recent PR history. Does the maintainer merge community PRs quickly?
4. **Complexity**: Can this be solved by an agent with the current tools?

### Phase 4: The Dossier
Generate a structured report for the human:
- **Project Name & Stars**
- **Issue Link & Description**
- **Root Cause Analysis** (based on code inspection)
- **Proposed Fix Strategy**
- **Confidence Score** (1-10)

## Limitations

- Accuracy depends on the availability of `gh` CLI or `web_search` tools.
- Analysis is limited by context window when reading very large repositories.
- Cannot guarantee PR acceptance (maintainer discretion).

---

## Contributing to the Matrix

Build a better hunter by adding new heuristics to Phase 3. Submit your improvements to the [ClawForge](https://github.com/jackjin1997/ClawForge).

*Powered by OpenClaw & ClawForge.*
