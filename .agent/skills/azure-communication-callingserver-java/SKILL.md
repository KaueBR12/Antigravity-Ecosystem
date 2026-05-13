---
name: azure-communication-callingserver-java
description: "Azure Communication Services CallingServer (legacy) Java SDK. Note - This SDK is deprecated. Use azure-communication-callautomation instead for new projects. Only use this skill when maintaining le..."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Azure Communication CallingServer (Java) - DEPRECATED

> **⚠️ DEPRECATED**: This SDK has been renamed to **Call Automation**. For new projects, use `azure-communication-callautomation` instead. This skill is for maintaining legacy code only.

## Migration to Call Automation

```xml
<!-- OLD (deprecated) -->
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-callingserver</artifactId>
    <version>1.0.0-beta.5</version>
</dependency>

<!-- NEW (use this instead) -->
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-callautomation</artifactId>
    <version>1.6.0</version>
</dependency>
```

## Class Name Changes

| CallingServer (Old) | Call Automation (New) |
|---------------------|----------------------|
| `CallingServerClient` | `CallAutomationClient` |
| `CallingServerClientBuilder` | `CallAutomationClientBuilder` |
| `CallConnection` | `CallConnection` (same) |
| `ServerCall` | Removed - use `CallConnection` |

## Legacy Client Creation

```java
// OLD WAY (deprecated)
import com.azure.communication.callingserver.CallingServerClient;
import com.azure.communication.callingserver.CallingServerClientBuilder;

CallingServerClient client = new CallingServerClientBuilder()
    .connectionString("<connection-string>")
    .buildClient();

// NEW WAY
import com.azure.communication.callautomation.CallAutomationClient;
import com.azure.communication.callautomation.CallAutomationClientBuilder;

CallAutomationClient client = new CallAutomationClientBuilder()
    .connectionString("<connection-string>")
    .buildClient();
```

## Legacy Recording

```java
// OLD WAY
StartRecordingOptions options = new StartRecordingOptions(serverCallId)
    .setRecordingStateCallbackUri(callbackUri);

StartCallRecordingResult result = client.startRecording(options);
String recordingId = result.getRecordingId();

client.pauseRecording(recordingId);
client.resumeRecording(recordingId);
client.stopRecording(recordingId);

// NEW WAY - see azure-communication-callautomation skill
```

## For New Development

**Do not use this SDK for new projects.** 

See the `azure-communication-callautomation-java` skill for:
- Making outbound calls
- Answering incoming calls
- Call recording
- DTMF recognition
- Text-to-speech / speech-to-text
- Adding/removing participants
- Call transfer

## Trigger Phrases

- "callingserver legacy", "deprecated calling SDK"
- "migrate callingserver to callautomation"

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
