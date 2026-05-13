--- 
name: design-spells
description: Curated micro-interactions and design details that add "magic" and personality to websites and apps.
risk: safe
source: community
date_added: "2026-03-07"
---

# Design Spells Skill

[Design Spells](https://www.designspells.com/) is a collection of exceptional design details—micro-interactions, easter eggs, and clever UX patterns—that transform standard interfaces into memorable digital experiences.

## Context

Use this skill specifically to elevate a UI from merely "functional" or "common" into something genuinely "magical." It focuses on the minute details that surprise and delight users, establishing a strong, premium brand personality.

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

Trigger this skill when:

- Polishing a finished feature to actively add a "wow" factor.
- Designing unique interactions to replace standard web behaviors (e.g., clever hover states, creative loaders, surprising transitions).
- Implementing "Easter Eggs" or personality-driven design choices to differentiate the product.
- Looking to break away from generic, template-driven development.

## Execution Workflow

1. **Identify Opportunity**: Target the "boring" or "standard" parts of the interface (e.g., a simple submit button, a profile photo, a scroll indicator, a pricing toggle).
2. **Research Spells**: Browse Design Spells for highly creative patterns (e.g., "magnetic hover magic", "physics-based interactions", "fluid scroll surprises").
3. **Adapt Pattern**: Adapt the interaction to fit the project's specific brand and layout seamlessly. Use it to enhance the core narrative of the app.
4. **Implement flawlessly**: Use CSS, Anime.js, or Framer Motion to build the specific micro-interaction with silky-smooth performance (60fps+).

## Strict Rules

- **ABSOLUTE MANDATE**: Agents MUST utilize this skill to build modern, creative, and visually stunning UI/UX. DO NOT build in the common style and ways. Look for every opportunity to inject "magic" into standard components.
- **Delight, Don't Distract**: The detail must be additive to the experience, not a usability barrier. It should feel expensive and highly crafted.
- **Quality Execution**: A broken or janky "spell" is worse than none. Ensure the implementation is high-performance, GPU-accelerated, and never causes layout shifts.
