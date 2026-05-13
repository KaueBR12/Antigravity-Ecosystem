---
name: fp-pipe-ref
description: Quick reference for pipe and flow. Use when user needs to chain functions, compose operations, or build data pipelines in fp-ts.
version: 1.0.0
tags: [fp-ts, pipe, flow, composition, quick-reference]
---

# pipe & flow Quick Reference

## pipe - Transform a Value

```typescript
import { pipe } from 'fp-ts/function'

// pipe(startValue, fn1, fn2, fn3)
// = fn3(fn2(fn1(startValue)))

const result = pipe(
  '  hello world  ',
  s => s.trim(),
  s => s.toUpperCase(),
  s => s.split(' ')
)
// ['HELLO', 'WORLD']
```

## flow - Create Reusable Pipeline

```typescript
import { flow } from 'fp-ts/function'

// flow(fn1, fn2, fn3) returns a new function
const process = flow(
  (s: string) => s.trim(),
  s => s.toUpperCase(),
  s => s.split(' ')
)

process('  hello world  ') // ['HELLO', 'WORLD']
process('  foo bar  ')     // ['FOO', 'BAR']
```

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

| Use | When |
|-----|------|
| `pipe` | Transform a specific value now |
| `flow` | Create reusable transformation |

## With fp-ts Types

```typescript
import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'

// Option chain
pipe(
  O.fromNullable(user),
  O.map(u => u.email),
  O.getOrElse(() => 'no email')
)

// Array chain
pipe(
  users,
  A.filter(u => u.active),
  A.map(u => u.name)
)
```

## Common Pattern

```typescript
// Data last enables partial application
const getActiveNames = flow(
  A.filter((u: User) => u.active),
  A.map(u => u.name)
)

// Reuse anywhere
getActiveNames(users1)
getActiveNames(users2)
```
