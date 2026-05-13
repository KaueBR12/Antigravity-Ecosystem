---
name: azure-mgmt-apicenter-py
description: Azure API Center Management SDK for Python. Use for managing API inventory, metadata, and governance across your organization.
risk: unknown
source: community
date_added: '2026-02-27'
---

# Azure API Center Management SDK for Python

Manage API inventory, metadata, and governance in Azure API Center.

## Installation

```bash
pip install azure-mgmt-apicenter
pip install azure-identity
```

## Environment Variables

```bash
AZURE_SUBSCRIPTION_ID=your-subscription-id
```

## Authentication

```python
from azure.identity import DefaultAzureCredential
from azure.mgmt.apicenter import ApiCenterMgmtClient
import os

client = ApiCenterMgmtClient(
    credential=DefaultAzureCredential(),
    subscription_id=os.environ["AZURE_SUBSCRIPTION_ID"]
)
```

## Create API Center

```python
from azure.mgmt.apicenter.models import Service

api_center = client.services.create_or_update(
    resource_group_name="my-resource-group",
    service_name="my-api-center",
    resource=Service(
        location="eastus",
        tags={"environment": "production"}
    )
)

print(f"Created API Center: {api_center.name}")
```

## List API Centers

```python
api_centers = client.services.list_by_subscription()

for api_center in api_centers:
    print(f"{api_center.name} - {api_center.location}")
```

## Register an API

```python
from azure.mgmt.apicenter.models import Api, ApiKind, LifecycleStage

api = client.apis.create_or_update(
    resource_group_name="my-resource-group",
    service_name="my-api-center",
    workspace_name="default",
    api_name="my-api",
    resource=Api(
        title="My API",
        description="A sample API for demonstration",
        kind=ApiKind.REST,
        lifecycle_stage=LifecycleStage.PRODUCTION,
        terms_of_service={"url": "https://example.com/terms"},
        contacts=[{"name": "API Team", "email": "api-team@example.com"}]
    )
)

print(f"Registered API: {api.title}")
```

## Create API Version

```python
from azure.mgmt.apicenter.models import ApiVersion, LifecycleStage

version = client.api_versions.create_or_update(
    resource_group_name="my-resource-group",
    service_name="my-api-center",
    workspace_name="default",
    api_name="my-api",
    version_name="v1",
    resource=ApiVersion(
        title="Version 1.0",
        lifecycle_stage=LifecycleStage.PRODUCTION
    )
)

print(f"Created version: {version.title}")
```

## Add API Definition

```python
from azure.mgmt.apicenter.models import ApiDefinition

definition = client.api_definitions.create_or_update(
    resource_group_name="my-resource-group",
    service_name="my-api-center",
    workspace_name="default",
    api_name="my-api",
    version_name="v1",
    definition_name="openapi",
    resource=ApiDefinition(
        title="OpenAPI Definition",
        description="OpenAPI 3.0 specification"
    )
)
```

## Import API Specification

```python
from azure.mgmt.apicenter.models import ApiSpecImportRequest, ApiSpecImportSourceFormat

# Import from inline content
client.api_definitions.import_specification(
    resource_group_name="my-resource-group",
    service_name="my-api-center",
    workspace_name="default",
    api_name="my-api",
    version_name="v1",
    definition_name="openapi",
    body=ApiSpecImportRequest(
        format=ApiSpecImportSourceFormat.INLINE,
        value='{"openapi": "3.0.0", "info": {"title": "My API", "version": "1.0"}, "paths": {}}'
    )
)
```

## List APIs

```python
apis = client.apis.list(
    resource_group_name="my-resource-group",
    service_name="my-api-center",
    workspace_name="default"
)

for api in apis:
    print(f"{api.name}: {api.title} ({api.kind})")
```

## Create Environment

```python
from azure.mgmt.apicenter.models import Environment, EnvironmentKind

environment = client.environments.create_or_update(
    resource_group_name="my-resource-group",
    service_name="my-api-center",
    workspace_name="default",
    environment_name="production",
    resource=Environment(
        title="Production",
        description="Production environment",
        kind=EnvironmentKind.PRODUCTION,
        server={"type": "Azure API Management", "management_portal_uri": ["https://portal.azure.com"]}
    )
)
```

## Create Deployment

```python
from azure.mgmt.apicenter.models import Deployment, DeploymentState

deployment = client.deployments.create_or_update(
    resource_group_name="my-resource-group",
    service_name="my-api-center",
    workspace_name="default",
    api_name="my-api",
    deployment_name="prod-deployment",
    resource=Deployment(
        title="Production Deployment",
        description="Deployed to production APIM",
        environment_id="/workspaces/default/environments/production",
        definition_id="/workspaces/default/apis/my-api/versions/v1/definitions/openapi",
        state=DeploymentState.ACTIVE,
        server={"runtime_uri": ["https://api.example.com"]}
    )
)
```

## Define Custom Metadata

```python
from azure.mgmt.apicenter.models import MetadataSchema

metadata = client.metadata_schemas.create_or_update(
    resource_group_name="my-resource-group",
    service_name="my-api-center",
    metadata_schema_name="data-classification",
    resource=MetadataSchema(
        schema='{"type": "string", "title": "Data Classification", "enum": ["public", "internal", "confidential"]}'
    )
)
```

## Client Types

| Client | Purpose |
|--------|---------|
| `ApiCenterMgmtClient` | Main client for all operations |

## Operations

| Operation Group | Purpose |
|----------------|---------|
| `services` | API Center service management |
| `workspaces` | Workspace management |
| `apis` | API registration and management |
| `api_versions` | API version management |
| `api_definitions` | API definition management |
| `deployments` | Deployment tracking |
| `environments` | Environment management |
| `metadata_schemas` | Custom metadata definitions |

## Best Practices

1. **Use workspaces** to organize APIs by team or domain
2. **Define metadata schemas** for consistent governance
3. **Track deployments** to understand where APIs are running
4. **Import specifications** to enable API analysis and linting
5. **Use lifecycle stages** to track API maturity
6. **Add contacts** for API ownership and support

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
