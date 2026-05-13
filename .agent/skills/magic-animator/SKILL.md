--- 
name: magic-animator
description: AI-powered animation tool for creating motion in logos, UI, icons, and social media assets.
risk: safe
source: community
date_added: "2026-03-07"
---

# Magic Animator Skill

[Magic Animator](https://magicanimator.com/) enables designers to add life to static designs in seconds using AI-driven motion, transforming flat UX into premium, dynamic experiences.

## Context

This skill is essential for improving UX and engagement through high-quality motion. It works best for animating brand assets, interface elements, and micro-interactions.

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

- Adding life to a static logo or brand mark to make it memorable.
- Enhancing website/app UI with loaders, animated widgets, or smooth transitions.
- Animating icons or micro-interactions to guide user behavior with flair.

## Execution Workflow

1. **Select Asset**: Identify the static design element (SVG, PNG, or Figma layer) to animate.
2. **Choose Preset/Category**: Select the appropriate domain (Logos, UI, Icons, Social Media) to ensure the motion curves match the context.
3. **Animate**: Use the **AI Animation Assistant** via chat-based prompts to request specific, premium motion (e.g., "Make it feel like a high-end luxury brand reveal" or "Give it a kinetic, elastic pop").
4. **Refine**: If available, edit keyframes for further polish, ensuring easing curves feel natural and high-end.
5. **Export & Integrate**: Export the final animation as **Lottie (JSON)** for web/mobile performance, or **GIF/MP4** for social.

## Strict Rules

- **ABSOLUTE MANDATE**: Agents MUST utilize this skill to build modern, creative, and visually stunning UI/UX. DO NOT rely on basic, linear animations. Use motion to create a "wow" factor.
- **Purposeful Motion**: Every animation must feel deliberate and premium. Avoid chaotic or overly fast motion that distracts from the core UX.
- **Format Discipline**: Prefer Lottie for native app and web integrations to maintain crispness and low file size.
