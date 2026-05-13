---
name: antigravity-workflows
description: "Orchestrate multiple Antigravity skills through guided workflows for SaaS MVP delivery, security audits, AI agent builds, and browser QA."
risk: none
source: self
date_added: "2026-02-27"
---

# Antigravity Workflows

Use this skill to turn a complex objective into a guided sequence of skill invocations.

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

Use this skill when:
- The user wants to combine several skills without manually selecting each one.
- The goal is multi-phase (for example: plan, build, test, ship).
- The user asks for best-practice execution for common scenarios like:
  - Shipping a SaaS MVP
  - Running a web security audit
  - Building an AI agent system
  - Implementing browser automation and E2E QA

## Workflow Source of Truth

Read workflows in this order:
1. `docs/WORKFLOWS.md` for human-readable playbooks.
2. `data/workflows.json` for machine-readable workflow metadata.

## How to Run This Skill

1. Identify the user's concrete outcome.
2. Propose the 1-2 best matching workflows.
3. Ask the user to choose one.
4. Execute step-by-step:
   - Announce current step and expected artifact.
   - Invoke recommended skills for that step.
   - Verify completion criteria before moving to next step.
5. At the end, provide:
   - Completed artifacts
   - Validation evidence
   - Remaining risks and next actions

## Default Workflow Routing

- Product delivery request -> `ship-saas-mvp`
- Security review request -> `security-audit-web-app`
- Agent/LLM product request -> `build-ai-agent-system`
- E2E/browser testing request -> `qa-browser-automation`
- Domain-driven design request -> `design-ddd-core-domain`

## Copy-Paste Prompts

```text
Use @antigravity-workflows to run the "Ship a SaaS MVP" workflow for my project idea.
```

```text
Use @antigravity-workflows and execute a full "Security Audit for a Web App" workflow.
```

```text
Use @antigravity-workflows to guide me through "Build an AI Agent System" with checkpoints.
```

```text
Use @antigravity-workflows to execute the "QA and Browser Automation" workflow and stabilize flaky tests.
```

```text
Use @antigravity-workflows to execute the "Design a DDD Core Domain" workflow for my new service.
```

## Limitations

- This skill orchestrates; it does not replace specialized skills.
- It depends on the local availability of referenced skills.
- It does not guarantee success without environment access, credentials, or required infrastructure.
- For stack-specific browser automation in Go, `go-playwright` may require the corresponding skill to be present in your local skills repository.

## Related Skills

- `concise-planning`
- `brainstorming`
- `workflow-automation`
- `verification-before-completion`
