---
name: azure-keyvault-certificates-rust
description: Azure Key Vault Certificates SDK for Rust. Use for creating, importing, and managing certificates.
risk: unknown
source: community
date_added: '2026-02-27'
---

# Azure Key Vault Certificates SDK for Rust

Client library for Azure Key Vault Certificates — secure storage and management of certificates.

## Installation

```sh
cargo add azure_security_keyvault_certificates azure_identity
```

## Environment Variables

```bash
AZURE_KEYVAULT_URL=https://<vault-name>.vault.azure.net/
```

## Authentication

```rust
use azure_identity::DeveloperToolsCredential;
use azure_security_keyvault_certificates::CertificateClient;

let credential = DeveloperToolsCredential::new(None)?;
let client = CertificateClient::new(
    "https://<vault-name>.vault.azure.net/",
    credential.clone(),
    None,
)?;
```

## Core Operations

### Get Certificate

```rust
use azure_core::base64;

let certificate = client
    .get_certificate("certificate-name", None)
    .await?
    .into_model()?;

println!(
    "Thumbprint: {:?}",
    certificate.x509_thumbprint.map(base64::encode_url_safe)
);
```

### Create Certificate

```rust
use azure_security_keyvault_certificates::models::{
    CreateCertificateParameters, CertificatePolicy,
    IssuerParameters, X509CertificateProperties,
};

let policy = CertificatePolicy {
    issuer_parameters: Some(IssuerParameters {
        name: Some("Self".into()),
        ..Default::default()
    }),
    x509_certificate_properties: Some(X509CertificateProperties {
        subject: Some("CN=example.com".into()),
        ..Default::default()
    }),
    ..Default::default()
};

let params = CreateCertificateParameters {
    certificate_policy: Some(policy),
    ..Default::default()
};

let operation = client
    .create_certificate("cert-name", params.try_into()?, None)
    .await?;
```

### Import Certificate

```rust
use azure_security_keyvault_certificates::models::ImportCertificateParameters;

let params = ImportCertificateParameters {
    base64_encoded_certificate: Some(base64_cert_data),
    password: Some("optional-password".into()),
    ..Default::default()
};

let certificate = client
    .import_certificate("cert-name", params.try_into()?, None)
    .await?
    .into_model()?;
```

### Delete Certificate

```rust
client.delete_certificate("certificate-name", None).await?;
```

### List Certificates

```rust
use azure_security_keyvault_certificates::ResourceExt;
use futures::TryStreamExt;

let mut pager = client.list_certificate_properties(None)?.into_stream();
while let Some(cert) = pager.try_next().await? {
    let name = cert.resource_id()?.name;
    println!("Certificate: {}", name);
}
```

### Get Certificate Policy

```rust
let policy = client
    .get_certificate_policy("certificate-name", None)
    .await?
    .into_model()?;
```

### Update Certificate Policy

```rust
use azure_security_keyvault_certificates::models::UpdateCertificatePolicyParameters;

let params = UpdateCertificatePolicyParameters {
    // Update policy properties
    ..Default::default()
};

client
    .update_certificate_policy("cert-name", params.try_into()?, None)
    .await?;
```

## Certificate Lifecycle

1. **Create** — generates new certificate with policy
2. **Import** — import existing PFX/PEM certificate
3. **Get** — retrieve certificate (public key only)
4. **Update** — modify certificate properties
5. **Delete** — soft delete (recoverable)
6. **Purge** — permanent deletion

## Best Practices

1. **Use Entra ID auth** — `DeveloperToolsCredential` for dev
2. **Use managed certificates** — auto-renewal with supported issuers
3. **Set proper validity period** — balance security and maintenance
4. **Use certificate policies** — define renewal and key properties
5. **Monitor expiration** — set up alerts for expiring certificates
6. **Enable soft delete** — required for production vaults

## RBAC Permissions

Assign these Key Vault roles:
- `Key Vault Certificates Officer` — full CRUD on certificates
- `Key Vault Reader` — read certificate metadata

## Reference Links

| Resource | Link |
|----------|------|
| API Reference | https://docs.rs/azure_security_keyvault_certificates |
| Source Code | https://github.com/Azure/azure-sdk-for-rust/tree/main/sdk/keyvault/azure_security_keyvault_certificates |
| crates.io | https://crates.io/crates/azure_security_keyvault_certificates |

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
