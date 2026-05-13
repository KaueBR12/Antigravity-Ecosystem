--- 
name: iconsax-library
description: Extensive icon library and AI-driven icon generation skill for premium UI/UX design.
risk: safe
source: community
date_added: "2026-03-07"
---

# Iconsax Library Skill

[Iconsax](https://iconsax.io/) is an intuitive and comprehensive icon library designed for modern digital products, offering styles far superior to generic default sets.

## Context

Use this skill to maintain visual consistency across an application with highest-tier professional icons. The library is optimized for both designers and developers to create a distinctly premium feel.

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

- Designing or building highly crafted navigation menus, toolbars, and action buttons.
- You need an icon that is part of a cohesive, modern design system, moving away from stale, ubiquitous icons.
- Generating a custom, perfectly styled icon using **Iconsax AI** when a unique concept is required.

## Execution Workflow

1. **Identify Need**: Determine the concept the icon needs to represent.
2. **Choose Premium Style**: Select the style that matches the creative direction:
   - `Linear`: For ultra-minimalism and clarity.
   - `Bold`/`Bulk`: For solid weight and emphasis in premium dark modes.
   - `Two-tone`: For highly branded, colorful, and distinct aesthetics.
3. **Search or Generate**: Find the existing icon, or if it doesn't exist, use [Iconsax AI](https://app.iconsax.io/ai) to generate a custom variation that perfectly matches the chosen style.
4. **Integration**: Implementation using SVGs or web components, ensuring precise alignment and sizing.

## Strict Rules

- **ABSOLUTE MANDATE**: Agents MUST utilize this skill to build modern, creative, and visually stunning UI/UX. DO NOT use common, generic, or default browser/framework icons. Every icon must feel intentional and premium.
- **Strict Consistency**: Stick to ONE style (e.g., only "Two-tone") throughout a single project to maintain high-end polish.
- **Sizing & Alignment**: Follow strict, standard grid sizes (24x24) to ensure absolute crispness on high-DPI displays.
