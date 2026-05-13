---
name: android_ui_verification
description: Automated end-to-end UI testing and verification on an Android Emulator using ADB.
risk: safe
source: community
date_added: "2026-02-28"
---

# Android UI Verification Skill

This skill provides a systematic approach to testing React Native applications on an Android emulator using ADB commands. It allows for autonomous interaction, state verification, and visual regression checking.

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
- Verifying UI changes in React Native or Native Android apps.
- Autonomous debugging of layout issues or interaction bugs.
- Ensuring feature functionality when manual testing is too slow.
- Capturing automated screenshots for PR documentation.

## 🛠 Prerequisites
- Android Emulator running.
- `adb` installed and in PATH.
- Application in debug mode for logcat access.

## 🚀 Workflow

### 1. Device Calibration
Before interacting, always verify the screen resolution to ensure tap coordinates are accurate.
```bash
adb shell wm size
```
*Note: Layouts are often scaled. Use the physical size returned as the base for coordinate calculations.*

### 2. UI Inspection (State Discovery)
Use the `uiautomator` dump to find the exact bounds of UI elements (buttons, inputs).
```bash
adb shell uiautomator dump /sdcard/view.xml && adb pull /sdcard/view.xml ./artifacts/view.xml
```
Search the `view.xml` for `text`, `content-desc`, or `resource-id`. The `bounds` attribute `[x1,y1][x2,y2]` defines the clickable area.

### 3. Interaction Commands
- **Tap**: `adb shell input tap <x> <y>` (Use the center of the element bounds).
- **Swipe**: `adb shell input swipe <x1> <y1> <x2> <y2> <duration_ms>` (Used for scrolling).
- **Text Input**: `adb shell input text "<message>"` (Note: Limited support for special characters).
- **Key Events**: `adb shell input keyevent <code_id>` (e.g., 66 for Enter).

### 4. Verification & Reporting
#### Visual Verification
Capture a screenshot after interaction to confirm UI changes.
```bash
adb shell screencap -p /sdcard/screen.png && adb pull /sdcard/screen.png ./artifacts/test_result.png
```

#### Analytical Verification
Monitor the JS console logs in real-time to detect errors or log successes.
```bash
adb logcat -d | grep "ReactNativeJS" | tail -n 20
```

#### Cleanup
Always store generated files in the `artifacts/` folder to satisfy project organization rules.

## 💡 Best Practices
- **Wait for Animations**: Always add a short sleep (e.g., 1-2s) between interaction and verification.
- **Center Taps**: Calculate the arithmetic mean of `[x1,y1][x2,y2]` for the most reliable tap target.
- **Log Markers**: Use distinct log messages in the code (e.g., `✅ Action Successful`) to make `grep` verification easy.
- **Fail Fast**: If a `uiautomator dump` fails or doesn't find the expected text, stop and troubleshoot rather than blind-tapping.
