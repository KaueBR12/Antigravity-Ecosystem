---
name: incident-response-smart-fix
description: "[Extended thinking: This workflow implements a sophisticated debugging and resolution pipeline that leverages AI-assisted debugging tools and observability platforms to systematically diagnose and res"
risk: unknown
source: community
date_added: "2026-02-27"
---

# Intelligent Issue Resolution with Multi-Agent Orchestration

[Extended thinking: This workflow implements a sophisticated debugging and resolution pipeline that leverages AI-assisted debugging tools and observability platforms to systematically diagnose and resolve production issues. The intelligent debugging strategy combines automated root cause analysis with human expertise, using modern 2024/2025 practices including AI code assistants (GitHub Copilot, Claude Code), observability platforms (Sentry, DataDog, OpenTelemetry), git bisect automation for regression tracking, and production-safe debugging techniques like distributed tracing and structured logging. The process follows a rigorous four-phase approach: (1) Issue Analysis Phase - error-detective and debugger agents analyze error traces, logs, reproduction steps, and observability data to understand the full context of the failure including upstream/downstream impacts, (2) Root Cause Investigation Phase - debugger and code-reviewer agents perform deep code analysis, automated git bisect to identify introducing commit, dependency compatibility checks, and state inspection to isolate the exact failure mechanism, (3) Fix Implementation Phase - domain-specific agents (python-pro, typescript-pro, rust-expert, etc.) implement minimal fixes with comprehensive test coverage including unit, integration, and edge case tests while following production-safe practices, (4) Verification Phase - test-automator and performance-engineer agents run regression suites, performance benchmarks, security scans, and verify no new issues are introduced. Complex issues spanning multiple systems require orchestrated coordination between specialist agents (database-optimizer → performance-engineer → devops-troubleshooter) with explicit context passing and state sharing. The workflow emphasizes understanding root causes over treating symptoms, implementing lasting architectural improvements, automating detection through enhanced monitoring and alerting, and preventing future occurrences through type system enhancements, static analysis rules, and improved error handling patterns. Success is measured not just by issue resolution but by reduced mean time to recovery (MTTR), prevention of similar issues, and improved system resilience.]

## Use this skill when

- Working on intelligent issue resolution with multi-agent orchestration tasks or workflows
- Needing guidance, best practices, or checklists for intelligent issue resolution with multi-agent orchestration

## Do not use this skill when

- The task is unrelated to intelligent issue resolution with multi-agent orchestration
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Resources

- `resources/implementation-playbook.md` for detailed patterns and examples.

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