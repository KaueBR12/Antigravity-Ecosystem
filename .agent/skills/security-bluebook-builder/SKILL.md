---
name: security-bluebook-builder
description: Create or refine a concise, normative security policy ("Blue Book") for sensitive applications. Use when users need a threat model, data classification rules, auth/session policy, logging and audit requirements, retention/deletion expectations, incident response, or security...
---

# Security Bluebook Builder

## Overview
Build a minimal but real security policy for sensitive apps. The output is a single, coherent Blue Book document using MUST/SHOULD/CAN language, with explicit assumptions, scope, and security gates.

## Workflow

### 1) Gather inputs (ask only if missing)
Collect just enough context to fill the template. If the user has not provided details, ask up to 6 short questions:
- What data classes are handled (PII, PHI, financial, tokens, content)?
- What are the trust boundaries (client/server/third parties)?
- How do users authenticate (OAuth, email/password, SSO, device sessions)?
- What storage is used (DB, object storage, logs, analytics)?
- What connectors or third parties are used?
- Retention and deletion expectations (default + user-initiated)?

If the user cannot answer, proceed with safe defaults and mark TODOs.

### 2) Draft the Blue Book
Load `references/bluebook_template.md` and fill it with the provided details. Keep it concise, deterministic, and enforceable.

### 3) Enforce guardrails
- Do not include secrets, tokens, or internal credentials.
- If something is unknown, write "TODO" plus a clear assumption.
- Fail closed: if a capability is required but unavailable, call it out explicitly.
- Keep scope minimal; do not add features or tools beyond what the user asked for.

### 4) Quality checks
Confirm the Blue Book includes:
- Threat model (assumptions + out-of-scope)
- Data classification + handling rules
- Trust boundaries + controls
- Auth/session policy
- Token handling policy
- Logging/audit policy
- Retention/deletion
- Incident response mini-runbook
- Security gates + go/no-go checklist

## Resources
- `references/bluebook_template.md`

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