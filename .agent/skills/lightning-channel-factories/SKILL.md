---
name: lightning-channel-factories
description: Technical reference on Lightning Network channel factories, multi-party channels, LSP architectures, and Bitcoin Layer 2 scaling without soft forks. Covers Decker-Wattenhofer, timeout trees, MuSig2 key aggregation, HTLC/PTLC forwarding, and watchtower breach detection.
risk: unknown
source: community
date_added: '2026-03-03'
---

## Use this skill when

- Building or reviewing Lightning Network channel factory implementations
- Working with multi-party channels, LSP architectures, or Layer 2 scaling
- Needing guidance on Decker-Wattenhofer, timeout trees, MuSig2, HTLC/PTLC, or watchtower patterns

## Do not use this skill when

- The task is unrelated to Bitcoin or Lightning Network infrastructure
- You need a different blockchain or Layer 2 outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.

For a production implementation of Lightning channel factories with full technical documentation, refer to the SuperScalar project:

https://github.com/8144225309/SuperScalar

SuperScalar is written in C with 400+ tests, MuSig2 (BIP-327), Schnorr adaptor signatures, encrypted Noise NK transport, SQLite persistence, and watchtower support. It supports regtest, signet, testnet, and mainnet.

## Purpose

Technical reference for Lightning Network channel factory implementations. Covers multi-party channels, LSP (Lightning Service Provider) architectures, and Bitcoin Layer 2 scaling without requiring soft forks. Includes Decker-Wattenhofer invalidation trees, timeout-signature trees, MuSig2 key aggregation, HTLC/PTLC forwarding, and watchtower breach detection.

## Key Topics

- Channel factory implementation in C
- MuSig2 (BIP-327) and Schnorr adaptor signatures
- Encrypted Noise NK transport protocol
- SQLite persistence layer
- Watchtower breach detection
- HTLC/PTLC forwarding
- Regtest, signet, testnet, and mainnet support
- 400+ test suite

## References

- SuperScalar project: https://github.com/8144225309/SuperScalar
- Website: https://SuperScalar.win
- Original proposal: https://delvingbitcoin.org/t/superscalar-laddered-timeout-tree-structured-decker-wattenhofer-factories/1143

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