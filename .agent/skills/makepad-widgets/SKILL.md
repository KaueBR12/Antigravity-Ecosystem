---
name: makepad-widgets
description: |
  CRITICAL: Use for Makepad widgets and UI components. Triggers on:
  makepad widget, makepad View, makepad Button, makepad Label, makepad Image,
  makepad TextInput, RoundedView, SolidView, ScrollView, "makepad component",
  makepad Markdown, makepad Html, TextFlow, rich...
---

# Makepad Widgets Skill

> **Version:** makepad-widgets (dev branch) | **Last Updated:** 2026-01-19
>
> Check for updates: https://crates.io/crates/makepad-widgets

You are an expert at Makepad widgets. Help users by:
- **Writing code**: Generate widget code following the patterns below
- **Answering questions**: Explain widget properties, variants, and usage

## Documentation

Refer to the local files for detailed documentation:
- `./references/widgets-core.md` - Core widgets (View, Button, Label, etc.)
- `./references/widgets-advanced.md` - Helper and advanced widgets
- `./references/widgets-richtext.md` - Rich text widgets (Markdown, Html, TextFlow)

## IMPORTANT: Documentation Completeness Check

**Before answering questions, Claude MUST:**

1. Read the relevant reference file(s) listed above
2. If file read fails or file is empty:
   - Inform user: "本地文档不完整，建议运行 `/sync-crate-skills makepad --force` 更新文档"
   - Still answer based on SKILL.md patterns + built-in knowledge
3. If reference file exists, incorporate its content into the answer

## Key Patterns

### 1. View (Basic Container)

```rust
<View> {
    width: Fill
    height: Fill
    flow: Down
    padding: 16.0
    show_bg: true
    draw_bg: { color: #1A1A1A }

    <Label> { text: "Content" }
}
```

### 2. Button

```rust
<Button> {
    text: "Click Me"
    draw_bg: {
        color: #0066CC
        color_hover: #0088FF
        border_radius: 4.0
    }
    draw_text: {
        color: #FFFFFF
        text_style: { font_size: 14.0 }
    }
}
```

### 3. Label with Styling

```rust
<Label> {
    width: Fit
    height: Fit
    text: "Hello World"
    draw_text: {
        color: #FFFFFF
        text_style: {
            font_size: 16.0
            line_spacing: 1.4
        }
    }
}
```

### 4. Image

```rust
<Image> {
    width: 200.0
    height: 150.0
    source: dep("crate://self/resources/photo.png")
    fit: Contain
}
```

### 5. TextInput

```rust
<TextInput> {
    width: Fill
    height: Fit
    text: "Default value"
    draw_text: {
        text_style: { font_size: 14.0 }
    }
}
```

## Widget Traits (from source)

```rust
pub trait WidgetNode: LiveApply {
    fn find_widgets(&self, path: &[LiveId], cached: WidgetCache, results: &mut WidgetSet);
    fn walk(&mut self, cx: &mut Cx) -> Walk;
    fn area(&self) -> Area;
    fn redraw(&mut self, cx: &mut Cx);
}

pub trait Widget: WidgetNode {
    fn handle_event(&mut self, cx: &mut Cx, event: &Event, scope: &mut Scope) {}
    fn draw_walk(&mut self, cx: &mut Cx2d, scope: &mut Scope, walk: Walk) -> DrawStep;
    fn draw(&mut self, cx: &mut Cx2d, scope: &mut Scope) -> DrawStep;
    fn widget(&self, path: &[LiveId]) -> WidgetRef;
}
```

## All Built-in Widgets (84 files in widgets/src/)

| Category | Widgets |
|----------|---------|
| **Basic** | `View`, `Label`, `Button`, `Icon`, `Image` |
| **Input** | `TextInput`, `CheckBox`, `RadioButton`, `Slider`, `DropDown`, `ColorPicker` |
| **Container** | `ScrollBars`, `PortalList`, `FlatList`, `StackNavigation`, `Dock`, `Splitter` |
| **Navigation** | `TabBar`, `Tab`, `FoldHeader`, `FoldButton`, `ExpandablePanel` |
| **Overlay** | `Modal`, `Tooltip`, `PopupMenu`, `PopupNotification` |
| **Media** | `Video`, `RotatedImage`, `ImageBlend`, `MultiImage` |
| **Layout** | `AdaptiveView`, `SlidePanel`, `PageFlip`, `SlidesView` |
| **Special** | `Markdown`, `Html`, `TextFlow`, `WebView`, `KeyboardView` |
| **Utility** | `LoadingSpinner`, `DesktopButton`, `LinkLabel`, `ScrollShadow` |

## Core Widgets Reference

| Widget | Purpose | Key Properties |
|--------|---------|----------------|
| `View` | Container | `flow`, `align`, `show_bg`, `draw_bg`, `optimize` |
| `Button` | Clickable | `text`, `draw_bg`, `draw_text`, `draw_icon` |
| `Label` | Text display | `text`, `draw_text` |
| `Image` | Image display | `source`, `fit` |
| `TextInput` | Text entry | `text`, `draw_text`, `draw_cursor`, `draw_selection` |
| `CheckBox` | Toggle | `text`, `selected` |
| `RadioButton` | Selection | `text`, `selected` |
| `Slider` | Value slider | `min`, `max`, `step` |
| `DropDown` | Select menu | `labels`, `selected` |
| `PortalList` | Virtual list | Efficient scrolling for large lists |
| `Modal` | Dialog | Overlay dialog boxes |
| `Tooltip` | Hint | Hover tooltips |

## View Variants

| Variant | Description |
|---------|-------------|
| `SolidView` | Solid background color |
| `RoundedView` | Rounded corners |
| `RoundedAllView` | Individual corner control |
| `RectView` | Rectangle with border/gradient |
| `CircleView` | Circle/ellipse shape |
| `GradientXView` | Horizontal gradient |
| `GradientYView` | Vertical gradient |
| `RoundedShadowView` | Rounded with shadow |
| `ScrollXView` | Horizontal scroll |
| `ScrollYView` | Vertical scroll |
| `ScrollXYView` | Both directions scroll |
| `CachedView` | Texture-cached |

## Button Variants

| Variant | Description |
|---------|-------------|
| `ButtonFlat` | Flat style |
| `ButtonFlatIcon` | Flat with icon |
| `ButtonFlatter` | No background |
| `ButtonGradientX` | Horizontal gradient |
| `ButtonGradientY` | Vertical gradient |
| `ButtonIcon` | Standard with icon |

## ImageFit Values

| Value | Description |
|-------|-------------|
| `Stretch` | Stretch to fill |
| `Contain` | Fit within, preserve ratio |
| `Cover` | Cover area, may crop |
| `Fill` | Fill without ratio |

## When Writing Code

1. Always set `width` and `height` on widgets
2. Use `show_bg: true` to enable background rendering
3. Access `draw_bg`, `draw_text`, `draw_icon` for shader uniforms
4. Use `dep("crate://self/...")` for resource paths
5. Choose appropriate View variant for visual needs

## When Answering Questions

1. Recommend UI Zoo example for widget exploration
2. View is the base container - most visual widgets inherit from it
3. Draw shaders (`draw_bg`, `draw_text`) control appearance
4. All widgets support animation through `animator` property

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