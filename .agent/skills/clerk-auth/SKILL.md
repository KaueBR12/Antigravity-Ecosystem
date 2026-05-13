---
name: clerk-auth
description: "Expert patterns for Clerk auth implementation, middleware, organizations, webhooks, and user sync Use when: adding authentication, clerk auth, user authentication, sign in, sign up."
risk: unknown
source: "vibeship-spawner-skills (Apache 2.0)"
date_added: "2026-02-27"
---

# Clerk Authentication

## Patterns

### Next.js App Router Setup

Complete Clerk setup for Next.js 14/15 App Router.

Includes ClerkProvider, environment variables, and basic
sign-in/sign-up components.

Key components:
- ClerkProvider: Wraps app for auth context
- <SignIn />, <SignUp />: Pre-built auth forms
- <UserButton />: User menu with session management

### Middleware Route Protection

Protect routes using clerkMiddleware and createRouteMatcher.

Best practices:
- Single middleware.ts file at project root
- Use createRouteMatcher for route groups
- auth.protect() for explicit protection
- Centralize all auth logic in middleware

### Server Component Authentication

Access auth state in Server Components using auth() and currentUser().

Key functions:
- auth(): Returns userId, sessionId, orgId, claims
- currentUser(): Returns full User object
- Both require clerkMiddleware to be configured

## ⚠️ Sharp Edges

| Issue | Severity | Solution |
|-------|----------|----------|
| Issue | critical | See docs |
| Issue | high | See docs |
| Issue | high | See docs |
| Issue | high | See docs |
| Issue | medium | See docs |
| Issue | medium | See docs |
| Issue | medium | See docs |
| Issue | medium | See docs |

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
