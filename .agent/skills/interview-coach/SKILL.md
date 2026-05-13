---
name: interview-coach
description: "Full job search coaching system — JD decoding, resume, storybank, mock interviews, transcript analysis, comp negotiation. 23 commands, persistent state."
category: productivity
risk: safe
source: community
date_added: "2026-03-11"
author: dbhat93
tags: [interview, job-search, coaching, career, storybank, negotiation]
tools: [claude]
---

# Interview Coach

## Overview

A persistent, adaptive coaching system for the full job search lifecycle.
Not a question bank — an opinionated system that tracks your patterns,
scores your answers, and gets sharper the more you use it. State persists
in `coaching_state.md` across sessions so you always pick up where you left off.

## Install

```bash
npx skills add dbhat93/job-search-os
```

Then type `/coach` → `kickoff`.

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

- Use when starting a job search and need a structured system
- Use when preparing for a specific interview (company research, mock, hype)
- Use when you want to analyze a past interview transcript
- Use when negotiating an offer or handling comp questions on recruiter screens
- Use when building or maintaining a storybank of interview-ready stories

## What It Covers

- **JD decoding** — six lenses, fit verdict, recruiter questions to ask
- **Resume + LinkedIn** — ATS audit, bullet rewrites, platform-native optimization
- **Mock interviews** — behavioral, system design, case, panel, technical formats
- **Transcript analysis** — paste from Otter/Zoom/Grain, auto-detected format
- **Storybank** — STAR stories with earned secrets, retrieval drills, portfolio optimization
- **Comp + negotiation** — pre-offer scripting, offer analysis, exact negotiation scripts
- **23 total commands** across the full search lifecycle

## Examples

### Example 1: Start your job search

```
/coach
kickoff
```

The coach asks for your resume, target role, and timeline — then builds
your profile and gives you a prioritized action plan.

### Example 2: Prep for a specific company

```
/coach
prep Stripe Senior PM
```

Runs company research, generates a role-specific prep brief, and queues
up mock interview questions tailored to Stripe's process.

### Example 3: Analyze an interview transcript

```
/coach
analyze
```

Paste a raw transcript from Otter, Zoom, or any tool. The coach
auto-detects the format, scores each answer across five dimensions,
and gives you a drill plan targeting your specific gaps.

### Example 4: Handle a comp question

```
/coach
salary
```

Coaches you through the recruiter screen "what are your salary
expectations?" moment with a defensible range and exact scripts.

## Source

https://github.com/dbhat93/job-search-os
