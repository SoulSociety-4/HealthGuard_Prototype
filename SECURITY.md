# Security

## Implemented controls

- bcrypt password hashing with a cost factor of 12.
- short-lived JWT access tokens held in browser memory.
- opaque refresh tokens stored as server-side hashes, rotated on refresh, revocable on logout/password reset/disable, and delivered through httpOnly same-site cookies.
- email verification before protected health data or realtime access.
- backend-enforced USER, DEVELOPER, ADMIN, and DRIVER roles; public registration cannot select a privileged role.
- patient/family/report ownership checks with 404-style isolation against cross-user enumeration.
- Helmet, strict origin CORS, global and authentication rate limits, bounded JSON/form sizes, request IDs, and safe JSON errors.
- allowlisted admin collections and fields; no client-provided owner IDs or roles are trusted.
- report extension, MIME, signature, maximum-size, patient ownership, private path, authenticated download, and delete checks.
- patient-avatar ownership checks, isolated private storage keys, JPG/PNG MIME validation, a 2 MB limit, private cache controls, and deletion with the owning patient.
- audit events contain actor/action/resource/outcome/request metadata, not patient payloads.
- no patient medical records or access tokens in localStorage.

## Production requirements

- Use MongoDB and durable encrypted storage with backups and access logging.
- Generate different 32+ character access and refresh secrets.
- Set `COOKIE_SECURE=true`, terminate HTTPS, and define exact `CLIENT_ORIGIN` values.
- Disable demo accounts and console email.
- Configure secret management, retention, incident response, key rotation, and jurisdiction-specific health/privacy controls.
- Run dependency, SAST, DAST, and penetration testing in the deployment environment.

## Residual limitations

This codebase is an engineering implementation, not a compliance certification. It does not by itself provide HIPAA, ABDM, GDPR, or local regulatory compliance. Local filesystem storage is suitable for development and a single trusted host, not a production medical-record object store. Horizontal Socket.IO deployment needs a shared adapter. Provider contracts require organization-specific validation and medical governance.

## Reporting

Do not include patient content, credentials, access tokens, refresh cookies, or production provider secrets in bug reports. Reproduce with synthetic data and include the request ID when available.
