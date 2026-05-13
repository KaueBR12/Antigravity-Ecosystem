---
name: tdd-workflows-tdd-red
description: "Generate failing tests for the TDD red phase to define expected behavior and edge cases."
risk: unknown
source: community
date_added: "2026-02-27"
---

Write comprehensive failing tests following TDD red phase principles.

[Extended thinking: Generates failing tests that properly define expected behavior using test-automator agent.]

## Use this skill when

- Starting the TDD red phase for new behavior
- You need failing tests that capture expected behavior
- You want edge case coverage before implementation

## Do not use this skill when

- You are in the green or refactor phase
- You only need performance benchmarks
- Tests must run against production systems

## Instructions

1. Identify behaviors, constraints, and edge cases.
2. Generate failing tests that define expected outcomes.
3. Ensure failures are due to missing behavior, not setup errors.
4. Document how to run tests and verify failures.

## Safety

- Keep test data isolated and avoid production environments.
- Avoid flaky external dependencies in the red phase.

## Role

Generate failing tests using Task tool with subagent_type="unit-testing::test-automator".

## Prompt Template

"Generate comprehensive FAILING tests for: $ARGUMENTS

## Core Requirements

1. **Test Structure**
   - Framework-appropriate setup (Jest/pytest/JUnit/Go/RSpec)
   - Arrange-Act-Assert pattern
   - should_X_when_Y naming convention
   - Isolated fixtures with no interdependencies

2. **Behavior Coverage**
   - Happy path scenarios
   - Edge cases (empty, null, boundary values)
   - Error handling and exceptions
   - Concurrent access (if applicable)

3. **Failure Verification**
   - Tests MUST fail when run
   - Failures for RIGHT reasons (not syntax/import errors)
   - Meaningful diagnostic error messages
   - No cascading failures

4. **Test Categories**
   - Unit: Isolated component behavior
   - Integration: Component interaction
   - Contract: API/interface contracts
   - Property: Mathematical invariants

## Framework Patterns

**JavaScript/TypeScript (Jest/Vitest)**
- Mock dependencies with `vi.fn()` or `jest.fn()`
- Use `@testing-library` for React components
- Property tests with `fast-check`

**Python (pytest)**
- Fixtures with appropriate scopes
- Parametrize for multiple test cases
- Hypothesis for property-based tests

**Go**
- Table-driven tests with subtests
- `t.Parallel()` for parallel execution
- Use `testify/assert` for cleaner assertions

**Ruby (RSpec)**
- `let` for lazy loading, `let!` for eager
- Contexts for different scenarios
- Shared examples for common behavior

## Quality Checklist

- Readable test names documenting intent
- One behavior per test
- No implementation leakage
- Meaningful test data (not 'foo'/'bar')
- Tests serve as living documentation

## Anti-Patterns to Avoid

- Tests passing immediately
- Testing implementation vs behavior
- Complex setup code
- Multiple responsibilities per test
- Brittle tests tied to specifics

## Edge Case Categories

- **Null/Empty**: undefined, null, empty string/array/object
- **Boundaries**: min/max values, single element, capacity limits
- **Special Cases**: Unicode, whitespace, special characters
- **State**: Invalid transitions, concurrent modifications
- **Errors**: Network failures, timeouts, permissions

## Output Requirements

- Complete test files with imports
- Documentation of test purpose
- Commands to run and verify failures
- Metrics: test count, coverage areas
- Next steps for green phase"

## Validation

After generation:
1. Run tests - confirm they fail
2. Verify helpful failure messages
3. Check test independence
4. Ensure comprehensive coverage

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

## Example (Minimal)

```typescript
// auth.service.test.ts
describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepo = { findByEmail: jest.fn() } as any;
    authService = new AuthService(mockUserRepo);
  });

  it('should_return_token_when_valid_credentials', async () => {
    const user = { id: '1', email: 'test@example.com', passwordHash: 'hashed' };
    mockUserRepo.findByEmail.mockResolvedValue(user);

    const result = await authService.authenticate('test@example.com', 'pass');

    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
  });

  it('should_fail_when_user_not_found', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(null);

    const result = await authService.authenticate('none@example.com', 'pass');

    expect(result.success).toBe(false);
    expect(result.error).toBe('INVALID_CREDENTIALS');
  });
});
```

Test requirements: $ARGUMENTS
