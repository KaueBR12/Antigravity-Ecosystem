---
name: acceptance-orchestrator
description: Use when a coding task should be driven end-to-end from issue intake through implementation, review, deployment, and acceptance verification with minimal human re-intervention.
risk: safe
source: community
date_added: "2026-03-12"
---

# Acceptance Orchestrator

## Overview

Orchestrate coding work as a state machine that ends only when acceptance criteria are verified with evidence or the task is explicitly escalated.

Core rule: **do not optimize for "code changed"; optimize for "DoD proven".**

## Required Sub-Skills

- `create-issue-gate`
- `closed-loop-delivery`
- `verification-before-completion`

Optional supporting skills:
- `deploy-dev`
- `pr-watch`
- `pr-review-autopilot`
- `git-ship`

## Inputs

Require these inputs:
- issue id or issue body
- issue status
- acceptance criteria (DoD)
- target environment (`dev` default)

Fixed defaults:
- max iteration rounds = `2`
- PR review polling = `3m -> 6m -> 10m`

## State Machine

- `intake`
- `issue-gated`
- `executing`
- `review-loop`
- `deploy-verify`
- `accepted`
- `escalated`

## Workflow

1. **Intake**
   - Read issue and extract task goal + DoD.

2. **Issue gate**
   - Use `create-issue-gate` logic.
   - If issue is not `ready` or execution gate is not `allowed`, stop immediately.
   - Do not implement anything while issue remains `draft`.

3. **Execute**
   - Hand off to `closed-loop-delivery` for implementation and local verification.

4. **Review loop**
   - If PR feedback is relevant, batch polling windows as:
     - wait `3m`
     - then `6m`
     - then `10m`
   - After the `10m` round, stop waiting and process all visible comments together.

5. **Deploy and runtime verification**
   - If DoD depends on runtime behavior, deploy only to `dev` by default.
   - Verify with real logs/API/Lambda behavior, not assumptions.

6. **Completion gate**
   - Before any claim of completion, require `verification-before-completion`.
   - No success claim without fresh evidence.

## Stop Conditions

Move to `accepted` only when every acceptance criterion has matching evidence.

Move to `escalated` when any of these happen:
- DoD still fails after `2` full rounds
- missing secrets/permissions/external dependency blocks progress
- task needs production action or destructive operation approval
- review instructions conflict and cannot both be satisfied

## Human Gates

Always stop for human confirmation on:
- prod/stage deploys beyond agreed scope
- destructive git/data operations
- billing or security posture changes
- missing user-provided acceptance criteria

## Output Contract

When reporting status, always include:
- `Status`: intake / executing / accepted / escalated
- `Acceptance Criteria`: pass/fail checklist
- `Evidence`: commands, logs, API results, or runtime proof
- `Open Risks`: anything still uncertain
- `Need Human Input`: smallest next decision, if blocked

Do not report "done" unless status is `accepted`.

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