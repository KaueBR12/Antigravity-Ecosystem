---
name: comprehensive-review-pr-enhance
description: >
  Generate structured PR descriptions from diffs, add review checklists,
  risk assessments, and test coverage summaries. Use when the user says
  "write a PR description", "improve this PR", "summarize my changes",
  "PR review", "pull request", or asks to document a diff for reviewers.
---

# Pull Request Enhancement

## Workflow

1. Run `git diff <base>...HEAD --stat` to identify changed files and scope
2. Categorise changes: source, test, config, docs, build, styles
3. Generate the PR description using the template below
4. Add a review checklist based on which file categories changed
5. Flag breaking changes, security-sensitive files, or large diffs (>500 lines)

## PR Description Template

```markdown
## Summary
<!-- one-paragraph executive summary: what changed and why -->

## Changes
| Category | Files | Key change |
|----------|-------|------------|
| source   | `src/auth.ts` | added OAuth2 PKCE flow |
| test     | `tests/auth.test.ts` | covers token refresh edge case |
| config   | `.env.example` | new `OAUTH_CLIENT_ID` var |

## Why
<!-- link to issue/ticket + one sentence on motivation -->

## Testing
- [ ] unit tests pass (`npm test`)
- [ ] manual smoke test on staging
- [ ] no coverage regression

## Risks & Rollback
- **Breaking?** yes / no
- **Rollback**: revert this commit; no migration needed
- **Risk level**: low / medium / high — because ___
```

## Review Checklist Rules

Add checklist sections only when the matching file category appears in the diff:

| File category | Checklist items |
|---------------|----------------|
| source | no debug statements, functions <50 lines, descriptive names, error handling |
| test | meaningful assertions, edge cases, no flaky tests, AAA pattern |
| config | no hardcoded secrets, env vars documented, backwards compatible |
| docs | accurate, examples included, changelog updated |
| security-sensitive (`auth`, `crypto`, `token`, `password` in path) | input validation, no secrets in logs, authz correct |

## Splitting Large PRs

When diff exceeds 20 files or 1000 lines, suggest splitting by feature area:

```
git checkout -b feature/part-1
git cherry-pick <commits-for-part-1>
```

## Resources

- `resources/implementation-playbook.md` — Python helpers for automated PR analysis, coverage reports, and risk scoring

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