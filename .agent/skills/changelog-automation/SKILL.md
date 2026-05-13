---
name: changelog-automation
description: "Automate changelog generation from commits, PRs, and releases following Keep a Changelog format. Use when setting up release workflows, generating release notes, or standardizing commit conventions."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Changelog Automation

Patterns and tools for automating changelog generation, release notes, and version management following industry standards.

## Use this skill when

- Setting up automated changelog generation
- Implementing conventional commits
- Creating release note workflows
- Standardizing commit message formats
- Managing semantic versioning

## Do not use this skill when

- The project has no release process or versioning
- You only need a one-time manual release note
- Commit history is unavailable or unreliable

## Instructions

- Select a changelog format and versioning strategy.
- Enforce commit conventions or labeling rules.
- Configure tooling to generate and publish notes.
- Review output for accuracy, completeness, and wording.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Safety

- Avoid exposing secrets or internal-only details in release notes.

## Resources

- `resources/implementation-playbook.md` for detailed patterns, templates, and examples.

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