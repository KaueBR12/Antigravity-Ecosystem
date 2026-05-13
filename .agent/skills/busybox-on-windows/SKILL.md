---
name: busybox-on-windows
description: "How to use a Win32 build of BusyBox to run many of the standard UNIX command line tools on Windows."
risk: unknown
source: community
date_added: "2026-02-27"
---

BusyBox is a single binary that implements many common Unix tools.

Use this skill only on Windows. If you are on UNIX, then stop here.

Run the following steps only if you cannot find a `busybox.exe` file in the same directory as this document is. 
These are PowerShell commands, if you have a classic `cmd.exe` terminal, then you must use `powershell -Command "..."` to run them.
1. Print the type of CPU: `Get-CimInstance -ClassName Win32_Processor | Select-Object Name, NumberOfCores, MaxClockSpeed`
2. Print the OS versions: `Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion" | Select-Object ProductName, DisplayVersion, CurrentBuild`
3. Download a suitable build of BusyBox by running one of these PowerShell commands:
   - 32-bit x86 (ANSI): `$ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -Uri https://frippery.org/files/busybox/busybox.exe -OutFile busybox.exe`
   - 64-bit x86 (ANSI): `$ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -Uri https://frippery.org/files/busybox/busybox64.exe -OutFile busybox.exe`
   - 64-bit x86 (Unicode): `$ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -Uri https://frippery.org/files/busybox/busybox64u.exe -OutFile busybox.exe`
   - 64-bit ARM (Unicode): `$ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -Uri https://frippery.org/files/busybox/busybox64a.exe -OutFile busybox.exe`

Useful commands:
- Help: `busybox.exe --list`
- Available UNIX commands: `busybox.exe --list`

Usage: Prefix the UNIX command with `busybox.exe`, for example: `busybox.exe ls -1`

If you need to run a UNIX command under another CWD, then use the absolute path to `busybox.exe`.

Documentation: https://frippery.org/busybox/
Original BusyBox: https://busybox.net/

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
