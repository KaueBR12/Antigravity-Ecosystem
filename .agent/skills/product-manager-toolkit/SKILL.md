---
name: product-manager-toolkit
description: "Comprehensive toolkit for product managers including RICE prioritization, customer interview analysis, PRD templates, discovery frameworks, and go-to-market strategies. Use for feature prioritizati..."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Product Manager Toolkit

Essential tools and frameworks for modern product management, from discovery to delivery.

## Quick Start

### For Feature Prioritization
```bash
python scripts/rice_prioritizer.py sample  # Create sample CSV
python scripts/rice_prioritizer.py sample_features.csv --capacity 15
```

### For Interview Analysis
```bash
python scripts/customer_interview_analyzer.py interview_transcript.txt
```

### For PRD Creation
1. Choose template from `references/prd_templates.md`
2. Fill in sections based on discovery work
3. Review with stakeholders
4. Version control in your PM tool

## Core Workflows

### Feature Prioritization Process

1. **Gather Feature Requests**
   - Customer feedback
   - Sales requests
   - Technical debt
   - Strategic initiatives

2. **Score with RICE**
   ```bash
   # Create CSV with: name,reach,impact,confidence,effort
   python scripts/rice_prioritizer.py features.csv
   ```
   - **Reach**: Users affected per quarter
   - **Impact**: massive/high/medium/low/minimal
   - **Confidence**: high/medium/low
   - **Effort**: xl/l/m/s/xs (person-months)

3. **Analyze Portfolio**
   - Review quick wins vs big bets
   - Check effort distribution
   - Validate against strategy

4. **Generate Roadmap**
   - Quarterly capacity planning
   - Dependency mapping
   - Stakeholder alignment

### Customer Discovery Process

1. **Conduct Interviews**
   - Use semi-structured format
   - Focus on problems, not solutions
   - Record with permission

2. **Analyze Insights**
   ```bash
   python scripts/customer_interview_analyzer.py transcript.txt
   ```
   Extracts:
   - Pain points with severity
   - Feature requests with priority
   - Jobs to be done
   - Sentiment analysis
   - Key themes and quotes

3. **Synthesize Findings**
   - Group similar pain points
   - Identify patterns across interviews
   - Map to opportunity areas

4. **Validate Solutions**
   - Create solution hypotheses
   - Test with prototypes
   - Measure actual vs expected behavior

### PRD Development Process

1. **Choose Template**
   - **Standard PRD**: Complex features (6-8 weeks)
   - **One-Page PRD**: Simple features (2-4 weeks)
   - **Feature Brief**: Exploration phase (1 week)
   - **Agile Epic**: Sprint-based delivery

2. **Structure Content**
   - Problem → Solution → Success Metrics
   - Always include out-of-scope
   - Clear acceptance criteria

3. **Collaborate**
   - Engineering for feasibility
   - Design for experience
   - Sales for market validation
   - Support for operational impact

## Key Scripts

### rice_prioritizer.py
Advanced RICE framework implementation with portfolio analysis.

**Features**:
- RICE score calculation
- Portfolio balance analysis (quick wins vs big bets)
- Quarterly roadmap generation
- Team capacity planning
- Multiple output formats (text/json/csv)

**Usage Examples**:
```bash
# Basic prioritization
python scripts/rice_prioritizer.py features.csv

# With custom team capacity (person-months per quarter)
python scripts/rice_prioritizer.py features.csv --capacity 20

# Output as JSON for integration
python scripts/rice_prioritizer.py features.csv --output json
```

### customer_interview_analyzer.py
NLP-based interview analysis for extracting actionable insights.

**Capabilities**:
- Pain point extraction with severity assessment
- Feature request identification and classification
- Jobs-to-be-done pattern recognition
- Sentiment analysis
- Theme extraction
- Competitor mentions
- Key quotes identification

**Usage Examples**:
```bash
# Analyze single interview
python scripts/customer_interview_analyzer.py interview.txt

# Output as JSON for aggregation
python scripts/customer_interview_analyzer.py interview.txt json
```

## Reference Documents

### prd_templates.md
Multiple PRD formats for different contexts:

1. **Standard PRD Template**
   - Comprehensive 11-section format
   - Best for major features
   - Includes technical specs

2. **One-Page PRD**
   - Concise format for quick alignment
   - Focus on problem/solution/metrics
   - Good for smaller features

3. **Agile Epic Template**
   - Sprint-based delivery
   - User story mapping
   - Acceptance criteria focus

4. **Feature Brief**
   - Lightweight exploration
   - Hypothesis-driven
   - Pre-PRD phase

## Prioritization Frameworks

### RICE Framework
```
Score = (Reach × Impact × Confidence) / Effort

Reach: # of users/quarter
Impact: 
  - Massive = 3x
  - High = 2x
  - Medium = 1x
  - Low = 0.5x
  - Minimal = 0.25x
Confidence:
  - High = 100%
  - Medium = 80%
  - Low = 50%
Effort: Person-months
```

### Value vs Effort Matrix
```
         Low Effort    High Effort
         
High     QUICK WINS    BIG BETS
Value    [Prioritize]   [Strategic]
         
Low      FILL-INS      TIME SINKS
Value    [Maybe]       [Avoid]
```

### MoSCoW Method
- **Must Have**: Critical for launch
- **Should Have**: Important but not critical
- **Could Have**: Nice to have
- **Won't Have**: Out of scope

## Discovery Frameworks

### Customer Interview Guide
```
1. Context Questions (5 min)
   - Role and responsibilities
   - Current workflow
   - Tools used

2. Problem Exploration (15 min)
   - Pain points
   - Frequency and impact
   - Current workarounds

3. Solution Validation (10 min)
   - Reaction to concepts
   - Value perception
   - Willingness to pay

4. Wrap-up (5 min)
   - Other thoughts
   - Referrals
   - Follow-up permission
```

### Hypothesis Template
```
We believe that [building this feature]
For [these users]
Will [achieve this outcome]
We'll know we're right when [metric]
```

### Opportunity Solution Tree
```
Outcome
├── Opportunity 1
│   ├── Solution A
│   └── Solution B
└── Opportunity 2
    ├── Solution C
    └── Solution D
```

## Metrics & Analytics

### North Star Metric Framework
1. **Identify Core Value**: What's the #1 value to users?
2. **Make it Measurable**: Quantifiable and trackable
3. **Ensure It's Actionable**: Teams can influence it
4. **Check Leading Indicator**: Predicts business success

### Funnel Analysis Template
```
Acquisition → Activation → Retention → Revenue → Referral

Key Metrics:
- Conversion rate at each step
- Drop-off points
- Time between steps
- Cohort variations
```

### Feature Success Metrics
- **Adoption**: % of users using feature
- **Frequency**: Usage per user per time period
- **Depth**: % of feature capability used
- **Retention**: Continued usage over time
- **Satisfaction**: NPS/CSAT for feature

## Best Practices

### Writing Great PRDs
1. Start with the problem, not solution
2. Include clear success metrics upfront
3. Explicitly state what's out of scope
4. Use visuals (wireframes, flows)
5. Keep technical details in appendix
6. Version control changes

### Effective Prioritization
1. Mix quick wins with strategic bets
2. Consider opportunity cost
3. Account for dependencies
4. Buffer for unexpected work (20%)
5. Revisit quarterly
6. Communicate decisions clearly

### Customer Discovery Tips
1. Ask "why" 5 times
2. Focus on past behavior, not future intentions
3. Avoid leading questions
4. Interview in their environment
5. Look for emotional reactions
6. Validate with data

### Stakeholder Management
1. Identify RACI for decisions
2. Regular async updates
3. Demo over documentation
4. Address concerns early
5. Celebrate wins publicly
6. Learn from failures openly

## Common Pitfalls to Avoid

1. **Solution-First Thinking**: Jumping to features before understanding problems
2. **Analysis Paralysis**: Over-researching without shipping
3. **Feature Factory**: Shipping features without measuring impact
4. **Ignoring Technical Debt**: Not allocating time for platform health
5. **Stakeholder Surprise**: Not communicating early and often
6. **Metric Theater**: Optimizing vanity metrics over real value

## Integration Points

This toolkit integrates with:
- **Analytics**: Amplitude, Mixpanel, Google Analytics
- **Roadmapping**: ProductBoard, Aha!, Roadmunk
- **Design**: Figma, Sketch, Miro
- **Development**: Jira, Linear, GitHub
- **Research**: Dovetail, UserVoice, Pendo
- **Communication**: Slack, Notion, Confluence

## Quick Commands Cheat Sheet

```bash
# Prioritization
python scripts/rice_prioritizer.py features.csv --capacity 15

# Interview Analysis
python scripts/customer_interview_analyzer.py interview.txt

# Create sample data
python scripts/rice_prioritizer.py sample

# JSON outputs for integration
python scripts/rice_prioritizer.py features.csv --output json
python scripts/customer_interview_analyzer.py interview.txt json
```

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
