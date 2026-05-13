---
name: hig-components-controls
description: Apple HIG guidance for selection and input controls including pickers, toggles, sliders, steppers, segmented controls, combo boxes, text fields, text views, labels, token fields, virtual...
risk: unknown
source: community
date_added: '2026-02-27'
---

# Apple HIG: Selection and Input Controls

Check for `.claude/apple-design-context.md` before asking questions. Use existing context and only ask for information not already covered.

## Key Principles

1. **Clear current state.** Users must always see what is selected. Toggles show on/off, segmented controls highlight the active segment, pickers display the current selection.

2. **Prefer standard system controls.** Built-in controls provide consistency and accessibility. Custom controls introduce a learning curve and may break assistive features.

3. **Toggles for binary states.** On or off. In Settings-style screens, changes take effect immediately. In modal forms, changes commit on confirmation.

4. **Segmented controls for mutually exclusive options.** 2-5 items, roughly equal importance, short labels.

5. **Sliders for continuous values.** When precise numeric input is not critical. Provide min/max labels or icons for range endpoints.

6. **Pickers for long option lists.** Too many options for a segmented control. Works well for dates, times, structured data.

7. **Steppers for small, precise adjustments.** Increment/decrement in fixed steps. Display current value next to the stepper with reasonable min/max bounds.

8. **Text fields for short, single-line input.** Text views for multi-line. Configure keyboard type to match expected input (email, URL, number).

9. **Combo boxes: text input + selection list.** macOS. Type a value or choose from a predefined list when custom values are valid.

10. **Token fields: discrete values as visual tokens.** macOS. For email recipients, tags, or collections of discrete items.

11. **Gauges and rating indicators display values.** Gauges show a value within a range. Rating indicators show ratings (often stars). Display-only; use interactive variants for input.

## Reference Index

| Reference | Topic | Key content |
|---|---|---|
| [controls.md](references/controls.md) | General controls | States, affordance, system controls |
| [toggles.md](references/toggles.md) | Toggles | On/off, immediate effect |
| [segmented-controls.md](references/segmented-controls.md) | Segmented controls | 2-5 options, equal weight |
| [sliders.md](references/sliders.md) | Sliders | Continuous range, min/max labels |
| [steppers.md](references/steppers.md) | Steppers | Fixed steps, bounded values |
| [pickers.md](references/pickers.md) | Pickers | Dates, times, long option sets |
| [combo-boxes.md](references/combo-boxes.md) | Combo boxes | macOS, type or select, custom values |
| [text-fields.md](references/text-fields.md) | Text fields | Short input, keyboard types, validation |
| [text-views.md](references/text-views.md) | Text views | Multi-line, comments, descriptions |
| [labels.md](references/labels.md) | Labels | Placement, VoiceOver support |
| [token-fields.md](references/token-fields.md) | Token fields | macOS, chips, tags, recipients |
| [virtual-keyboards.md](references/virtual-keyboards.md) | Virtual keyboards | Email, URL, number keyboard types |
| [rating-indicators.md](references/rating-indicators.md) | Rating indicators | Star ratings, display-only |
| [gauges.md](references/gauges.md) | Gauges | Level indicators, range display |

## Output Format

1. **Control recommendation with rationale** and why alternatives are less suitable.
2. **State management** -- how the control communicates current state and whether changes apply immediately or on confirmation.
3. **Validation approach** -- when to show errors and how to communicate rules.
4. **Accessibility** -- labels, traits, hints for VoiceOver.

## Questions to Ask

1. What type of data? (Boolean, choice from fixed set, numeric, free-form text?)
2. How many options?
3. Which platforms? (Combo boxes and token fields are macOS-only)
4. Settings screen or inline form?

## Related Skills

- **hig-components-menus** -- Buttons and pop-up buttons complementing selection controls
- **hig-components-dialogs** -- Sheets and popovers containing forms
- **hig-components-search** -- Search fields sharing text input patterns
- **hig-inputs** -- Keyboard, pointer, gesture interactions with controls
- **hig-foundations** -- Typography, color, layout for control styling

---

*Built by [Raintree Technology](https://raintree.technology) · [More developer tools](https://raintree.technology)*

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
