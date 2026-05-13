---
name: odoo-orm-expert
description: "Master Odoo ORM patterns: search, browse, create, write, domain filters, computed fields, and performance-safe query techniques."
risk: safe
source: "self"
---

# Odoo ORM Expert

## Overview

This skill teaches you Odoo's Object Relational Mapper (ORM) in depth. It covers reading/writing records, building domain filters, working with relational fields, and avoiding common performance pitfalls like N+1 queries.

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

## When to Use This Skill

- Writing `search()`, `browse()`, `create()`, `write()`, or `unlink()` calls.
- Building complex domain filters for views or server actions.
- Implementing computed, stored, and related fields.
- Debugging slow queries or optimizing bulk operations.

## How It Works

1. **Activate**: Mention `@odoo-orm-expert` and describe what data operation you need.
2. **Get Code**: Receive correct, idiomatic Odoo ORM code with explanations.
3. **Optimize**: Ask for performance review on existing ORM code.

## Examples

### Example 1: Search with Domain Filters

```python
# Find all confirmed sale orders for a specific customer, created this year
import datetime

start_of_year = datetime.date.today().replace(month=1, day=1).strftime('%Y-%m-%d')

orders = self.env['sale.order'].search([
    ('partner_id', '=', partner_id),
    ('state', '=', 'sale'),
    ('date_order', '>=', start_of_year),
], order='date_order desc', limit=50)

# Note: pass dates as 'YYYY-MM-DD' strings in domains,
# NOT as fields.Date objects — the ORM serializes them correctly.
```

### Example 2: Computed Field

```python
total_order_count = fields.Integer(
    string='Total Orders',
    compute='_compute_total_order_count',
    store=True
)

@api.depends('sale_order_ids')
def _compute_total_order_count(self):
    for record in self:
        record.total_order_count = len(record.sale_order_ids)
```

### Example 3: Safe Bulk Write (avoid N+1)

```python
# ✅ GOOD: One query for all records
partners = self.env['res.partner'].search([('country_id', '=', False)])
partners.write({'country_id': self.env.ref('base.us').id})

# ❌ BAD: Triggers a separate query per record
for partner in partners:
    partner.country_id = self.env.ref('base.us').id
```

## Best Practices

- ✅ **Do:** Use `mapped()`, `filtered()`, and `sorted()` on recordsets instead of Python loops.
- ✅ **Do:** Use `sudo()` sparingly and only when you understand the security implications.
- ✅ **Do:** Prefer `search_count()` over `len(search(...))` when you only need a count.
- ✅ **Do:** Use `with_context(...)` to pass context values cleanly rather than modifying `self.env.context` directly.
- ❌ **Don't:** Call `search()` inside a loop — this is the #1 Odoo performance killer.
- ❌ **Don't:** Use raw SQL unless absolutely necessary; use ORM for all standard operations.
- ❌ **Don't:** Pass Python `datetime`/`date` objects directly into domain tuples — always stringify them as `'YYYY-MM-DD'`.

## Limitations

- Does not cover **`cr.execute()` raw SQL** patterns in depth — use the Odoo performance tuner skill for SQL-level optimization.
- **Stored computed fields** can cause significant write overhead at scale; this skill does not cover partitioning strategies.
- Does not cover **transient models** (`models.TransientModel`) or wizard patterns.
- ORM behavior can differ slightly between Odoo SaaS and On-Premise due to config overrides.
