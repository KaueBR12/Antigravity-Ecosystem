---
name: segment-cdp
description: "Expert patterns for Segment Customer Data Platform including Analytics.js, server-side tracking, tracking plans with Protocols, identity resolution, destinations configuration, and data governance ..."
risk: unknown
source: "vibeship-spawner-skills (Apache 2.0)"
date_added: "2026-02-27"
---

# Segment CDP

## Patterns

### Analytics.js Browser Integration

Client-side tracking with Analytics.js. Include track, identify, page,
and group calls. Anonymous ID persists until identify merges with user.

### Server-Side Tracking with Node.js

High-performance server-side tracking using @segment/analytics-node.
Non-blocking with internal batching. Essential for backend events,
webhooks, and sensitive data.

### Tracking Plan Design

Design event schemas using Object + Action naming convention.
Define required properties, types, and validation rules.
Connect to Protocols for enforcement.

## Anti-Patterns

### ❌ Dynamic Event Names

### ❌ Tracking Properties as Events

### ❌ Missing Identify Before Track

## ⚠️ Sharp Edges

| Issue | Severity | Solution |
|-------|----------|----------|
| Issue | medium | See docs |
| Issue | high | See docs |
| Issue | medium | See docs |
| Issue | high | See docs |
| Issue | low | See docs |
| Issue | medium | See docs |
| Issue | medium | See docs |
| Issue | high | See docs |

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
This skill is applicable to execute the workflow or actions described in the overview.
