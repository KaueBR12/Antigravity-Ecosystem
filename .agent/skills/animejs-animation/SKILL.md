--- 
name: animejs-animation
description: Advanced JavaScript animation library skill for creating complex, high-performance web animations.
risk: safe
source: community
date_added: "2026-03-07"
---

# Anime.js Animation Skill

[Anime.js](https://animejs.com/) is a lightweight but extremely powerful JavaScript animation engine. It excels at complex timelines, staggering, and precise control over DOM, CSS, and SVGs.

## Context

This skill is used for creating high-fidelity, jaw-dropping web animations that go far beyond simple CSS transitions. It's the tool of choice for awards-caliber interactive sites.

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

- Creating complex, multi-stage landing page orchestrations.
- Implementing staggered animations for revealing grids, text, or data visualizations.
- Animating SVG paths (morphing shapes, drawing dynamic lines).
- Building highly interactive, kinetic UI elements that respond fluidly to user input.

## Execution Workflow

1. **Identify Targets**: Select the DOM elements or SVGs to be animated.
2. **Define Properties & Easing**: Specify values to animate. **Crucially**, utilize advanced easing functions (e.g., custom `cubicBezier`, `spring`, or `elastic`) instead of basic `linear` or `ease-in-out` to make the motion feel expensive and natural.
3. **Orchestrate Timelines**: Use `anime.timeline()` to sequence complex choreography. Master the use of timeline offsets (relative `'-=200'` vs absolute) to create seamless overlapping motion.
4. **Implement**:
   ```javascript
   const tl = anime.timeline({
     easing: "spring(1, 80, 10, 0)",
     duration: 1000,
   });
   tl.add({
     targets: ".hero-text",
     translateY: [50, 0],
     opacity: [0, 1],
     delay: anime.stagger(100),
   }).add(
     { targets: ".hero-image", scale: [0.9, 1], opacity: [0, 1] },
     "-=800",
   );
   ```

## Strict Rules

- **ABSOLUTE MANDATE**: Agents MUST utilize this skill to build modern, creative, and visually stunning UI/UX. DO NOT build common, boring transitions. Every animation should feel bespoke, fluid, and heavily polished.
- **Staggering**: Leverage `anime.stagger()` extensively to add organic rhythm to multiple elements.
- **Performance**: Monitor main thread usage; use `will-change: transform, opacity` where appropriate for GPU acceleration.
