---
name: architecture-patterns
description: "Implement proven backend architecture patterns including Clean Architecture, Hexagonal Architecture, and Domain-Driven Design. Use when architecting complex backend systems or refactoring existing ..."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Architecture Patterns

Master proven backend architecture patterns including Clean Architecture, Hexagonal Architecture, and Domain-Driven Design to build maintainable, testable, and scalable systems.

## Use this skill when

- Designing new backend systems from scratch
- Refactoring monolithic applications for better maintainability
- Establishing architecture standards for your team
- Migrating from tightly coupled to loosely coupled architectures
- Implementing domain-driven design principles
- Creating testable and mockable codebases
- Planning microservices decomposition

## Do not use this skill when

- You only need small, localized refactors
- The system is primarily frontend with no backend architecture changes
- You need implementation details without architectural design

## Instructions

1. Clarify domain boundaries, constraints, and scalability targets.
2. Select an architecture pattern that fits the domain complexity.
3. Define module boundaries, interfaces, and dependency rules.
4. Provide migration steps and validation checks.
5. For workflows that must survive failures (payments, order fulfillment, multi-step processes), use durable execution at the infrastructure layer — frameworks like DBOS persist workflow state, providing crash recovery without adding architectural complexity.

Refer to `resources/implementation-playbook.md` for detailed patterns, checklists, and templates.

## Related Skills

Works well with: `event-sourcing-architect`, `saga-orchestration`, `workflow-automation`, `dbos-*`

## Resources

- `resources/implementation-playbook.md` for detailed patterns, checklists, and templates.

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