---
name: azure-ai-projects-java
description: Azure AI Projects SDK for Java. High-level SDK for Azure AI Foundry project management including connections, datasets, indexes, and evaluations.
risk: unknown
source: community
date_added: '2026-02-27'
---

# Azure AI Projects SDK for Java

High-level SDK for Azure AI Foundry project management with access to connections, datasets, indexes, and evaluations.

## Installation

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-ai-projects</artifactId>
    <version>1.0.0-beta.1</version>
</dependency>
```

## Environment Variables

```bash
PROJECT_ENDPOINT=https://<resource>.services.ai.azure.com/api/projects/<project>
```

## Authentication

```java
import com.azure.ai.projects.AIProjectClientBuilder;
import com.azure.identity.DefaultAzureCredentialBuilder;

AIProjectClientBuilder builder = new AIProjectClientBuilder()
    .endpoint(System.getenv("PROJECT_ENDPOINT"))
    .credential(new DefaultAzureCredentialBuilder().build());
```

## Client Hierarchy

The SDK provides multiple sub-clients for different operations:

| Client | Purpose |
|--------|---------|
| `ConnectionsClient` | Enumerate connected Azure resources |
| `DatasetsClient` | Upload documents and manage datasets |
| `DeploymentsClient` | Enumerate AI model deployments |
| `IndexesClient` | Create and manage search indexes |
| `EvaluationsClient` | Run AI model evaluations |
| `EvaluatorsClient` | Manage evaluator configurations |
| `SchedulesClient` | Manage scheduled operations |

```java
// Build sub-clients from builder
ConnectionsClient connectionsClient = builder.buildConnectionsClient();
DatasetsClient datasetsClient = builder.buildDatasetsClient();
DeploymentsClient deploymentsClient = builder.buildDeploymentsClient();
IndexesClient indexesClient = builder.buildIndexesClient();
EvaluationsClient evaluationsClient = builder.buildEvaluationsClient();
```

## Core Operations

### List Connections

```java
import com.azure.ai.projects.models.Connection;
import com.azure.core.http.rest.PagedIterable;

PagedIterable<Connection> connections = connectionsClient.listConnections();
for (Connection connection : connections) {
    System.out.println("Name: " + connection.getName());
    System.out.println("Type: " + connection.getType());
    System.out.println("Credential Type: " + connection.getCredentials().getType());
}
```

### List Indexes

```java
indexesClient.listLatest().forEach(index -> {
    System.out.println("Index name: " + index.getName());
    System.out.println("Version: " + index.getVersion());
    System.out.println("Description: " + index.getDescription());
});
```

### Create or Update Index

```java
import com.azure.ai.projects.models.AzureAISearchIndex;
import com.azure.ai.projects.models.Index;

String indexName = "my-index";
String indexVersion = "1.0";
String searchConnectionName = System.getenv("AI_SEARCH_CONNECTION_NAME");
String searchIndexName = System.getenv("AI_SEARCH_INDEX_NAME");

Index index = indexesClient.createOrUpdate(
    indexName,
    indexVersion,
    new AzureAISearchIndex()
        .setConnectionName(searchConnectionName)
        .setIndexName(searchIndexName)
);

System.out.println("Created index: " + index.getName());
```

### Access OpenAI Evaluations

The SDK exposes OpenAI's official SDK for evaluations:

```java
import com.openai.services.EvalService;

EvalService evalService = evaluationsClient.getOpenAIClient();
// Use OpenAI evaluation APIs directly
```

## Best Practices

1. **Use DefaultAzureCredential** for production authentication
2. **Reuse client builder** to create multiple sub-clients efficiently
3. **Handle pagination** when listing resources with `PagedIterable`
4. **Use environment variables** for connection names and configuration
5. **Check connection types** before accessing credentials

## Error Handling

```java
import com.azure.core.exception.HttpResponseException;
import com.azure.core.exception.ResourceNotFoundException;

try {
    Index index = indexesClient.get(indexName, version);
} catch (ResourceNotFoundException e) {
    System.err.println("Index not found: " + indexName);
} catch (HttpResponseException e) {
    System.err.println("Error: " + e.getResponse().getStatusCode());
}
```

## Reference Links

| Resource | URL |
|----------|-----|
| Product Docs | https://learn.microsoft.com/azure/ai-studio/ |
| API Reference | https://learn.microsoft.com/rest/api/aifoundry/aiprojects/ |
| GitHub Source | https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/ai/azure-ai-projects |
| Samples | https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/ai/azure-ai-projects/src/samples |

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
