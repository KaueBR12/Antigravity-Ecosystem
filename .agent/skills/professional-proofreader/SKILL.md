---
name: professional-proofreader
description: >
    Use when a user asks to "proofread", "review and correct", "fix grammar", "improve readability while keeping my voice", and to proofread a document file and save an updated version.
risk: safe
source: original
date_added: "2026-03-04"
---

# Professional Proofreader

## Overview

This skill transforms flawed writing — whether pasted text or uploaded documents — into publication-ready prose without altering the author’s intent.
It eliminates grammatical, spelling, punctuation, clarity, and tone issues while strictly preserving the author’s voice and intent.
Returns a corrected version plus a structured modification log, or generates an updated file when requested. Not for code editing or technical refactoring.

---

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

- Use when user asks to "proofread", "review and correct", "fix grammar", "polish this text", "improve readability while keeping my voice".
- Use when user asks to proofread a document file (like .docx, .pdf, .txt) and save the updated version as new file with 'UPDATED_' prefix.

---

# WORKFLOW MODES

This skill operates in two modes:
1. Inline Text Mode
2. File Processing Mode

### MODE 1: Inline Text

Refer [markdown](references/inline-text-mode.md) for complete inline text mode.

### MODE 2: File Processing

Trigger when user says:

- "Proofread [filename].[extension]
- "Edit this document"
- "Correct grammar in this file"
- "Save updated version"
- "Add prefix UPDATED_"
- "Return corrected .[extension]"

Refer [markdown](references/file-processing-mode.md) for complete file processing mode.

---

## Best Practices

### ✅ **Do:** [Good practice]
- Always include modification explanations.
- Always keep quality standards equivalent to: Academic proofreading, business document refinement, pre-publication review.
- Always follow below editing standards:

#### Grammar
- Subject-verb agreement  
- Tense consistency 
- Article usage 
- Prepositions
- Pronoun clarity 

#### Spelling
- Correct typos 
- Maintain original spelling variant (US/UK)

#### Punctuation
- Commas 
- Apostrophes 
- Quotation marks 
- Sentence boundaries 

#### Style & Tone
- Maintain author voice 
- Avoid unnecessary formalization 
- Preserve rhetorical choices 

#### Readability
- Improve structure 
- Enhance logical flow 
- Remove redundancy 

### ❌ **Don't:** [What to avoid] 
- Never alter meaning.
- Never drop formatting intentionally.
- Never change file name logic beyond request.
- Never expand the content

---

# Output Rules

If inline:
-> Return Corrected Version + Modifications list.

If file rewrite:
-> Save updated file.
-> Confirm filename.
-> Provide modifications list unless suppressed.

Give friendly message to user in the end.

---