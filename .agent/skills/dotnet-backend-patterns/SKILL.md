---
name: dotnet-backend-patterns
description: "Master C#/.NET backend development patterns for building robust APIs, MCP servers, and enterprise applications. Covers async/await, dependency injection, Entity Framework Core, Dapper, configuratio..."
risk: unknown
source: community
date_added: "2026-02-27"
---

# .NET Backend Development Patterns

Master C#/.NET patterns for building production-grade APIs, MCP servers, and enterprise backends with modern best practices (2024/2025).

## Use this skill when

- Developing new .NET Web APIs or MCP servers
- Reviewing C# code for quality and performance
- Designing service architectures with dependency injection
- Implementing caching strategies with Redis
- Writing unit and integration tests
- Optimizing database access with EF Core or Dapper
- Configuring applications with IOptions pattern
- Handling errors and implementing resilience patterns

## Do not use this skill when

- The project is not using .NET or C#
- You only need frontend or client guidance
- The task is unrelated to backend architecture

## Instructions

- Define architecture boundaries, modules, and layering.
- Apply DI, async patterns, and resilience strategies.
- Validate data access performance and caching.
- Add tests and observability for critical flows.
- If detailed patterns are required, open `resources/implementation-playbook.md`.

## Resources

- `resources/implementation-playbook.md` for detailed .NET patterns and examples.

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