# Architecture

## Runtime shape

```text
Browser (React/Vite :5500)
  ├─ public discovery and deterministic triage
  ├─ in-memory access token + httpOnly refresh cookie
  ├─ protected record/upload/admin screens
  └─ authenticated Socket.IO client
            │
            ▼
Express + Socket.IO (:4174)
  ├─ auth, RBAC, ownership, validation, audit
  ├─ report/storage/OCR/AI provider boundaries
  ├─ deterministic triage and ambulance state machine
  └─ repository interface
         ├─ MemoryRepository (complete local mode)
         └─ MongoRepository + Mongoose (durable mode)
```

The project remains one React frontend. Vite owns development assets and proxies backend traffic; Express serves the compiled `dist` bundle in production.

## Frontend

- `src/App.tsx`: routes and protected-role composition.
- `src/components`: command shell, dialog, loaders, route guard, and shared primitives.
- `src/context`: authentication, healthcare data, theme, sound, and rich notification state.
- `src/pages`: Command Center, My Health, AI/triage, care discovery, ambulance, driver, Academy, Emergency Center, admin, and authentication flows.
- `src/services/api.ts`: access-token memory, single-flight refresh rotation, JSON APIs, private downloads, and XHR upload progress.

No patient medical content is persisted to browser localStorage. Only non-sensitive theme/sound preferences and First Aid reference bookmark IDs may be persisted.

First Aid Guidance is a lazy-loaded authenticated React route at `/first-aid`. Its additive typed source archive preserves all 435 standalone reference entries, including duplicate source IDs, without modifying the existing server import pipeline or API contracts.

## Backend

- `server/src/app.mjs`: security middleware, route composition, health endpoint, SPA serving, and safe errors.
- `server/src/services`: authentication, audit, deterministic triage, and idempotent imports.
- `server/src/providers`: local/private storage plus disabled or HTTP AI/OCR/email boundaries.
- `server/src/routes`: auth, repository-backed data, owned records, AI/triage, ambulance/driver, notifications, developer, and admin endpoints.
- `server/src/db`: interchangeable memory and Mongo repositories.
- `server/src/models`: Mongoose schemas for operational collections.

## Trust boundaries

The browser is untrusted. Backend authentication, role checks, ownership filters, upload signatures, state transitions, and allowlisted admin fields are authoritative. UI route guards improve navigation but are not relied upon for access control.

Optional providers are untrusted boundaries. HealthGuard applies timeouts and never labels provider output as deterministic clinical truth. Red-flag triage executes before optional AI.

## Data flow

Supplied JSON remains the traceable source input. Startup runs parser/normalizer/deduplicator/upsert logic into the active repository. Public hospital, protocol, OPD, and flashcard endpoints read from the repository, not directly from source files. Category presentation metadata remains static because it is a UI vocabulary rather than a medical entity.

## Deployment topology

Production can run one Node process behind a TLS reverse proxy, with MongoDB and durable object storage supplied externally. Horizontal Socket.IO scaling requires a shared adapter; the current in-process Socket.IO server is appropriate for a single instance.
