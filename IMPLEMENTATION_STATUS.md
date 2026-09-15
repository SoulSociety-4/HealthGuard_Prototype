# Implementation status

Status vocabulary: IMPLEMENTED, PARTIAL, DEMO, NOT IMPLEMENTED, REQUIRES EXTERNAL PROVIDER, BLOCKED.

## Platform

| Capability | Status | Notes |
|---|---|---|
| React/TypeScript/Vite app | IMPLEMENTED | One preserved and transformed frontend; dev port 5500. |
| Express API | IMPLEMENTED | Versioned routes, safe errors, health endpoint, production SPA serving. |
| MongoDB/Mongoose | IMPLEMENTED | Durable repository mode and 27 operational models. |
| Memory repository | DEMO | Complete local mode; resets on API restart. |
| Auth and sessions | IMPLEMENTED | bcrypt, JWT access, rotating hashed refresh sessions, httpOnly cookie, logout. |
| OTP/email verification | IMPLEMENTED | Six-digit hashed, expiring, attempt-limited code; protected data blocked until verified. |
| Password recovery | IMPLEMENTED | Expiring hashed reset token and session revocation. Delivery depends on email provider. |
| RBAC/invitations | IMPLEMENTED | USER/DEVELOPER/ADMIN/DRIVER and expiring single-use invitation tokens. |
| Ownership isolation | IMPLEMENTED | GET/update/delete/download/analyze tests across users. |

## Healthcare data and features

| Capability | Status | Notes |
|---|---|---|
| Hospitals/OPD | IMPLEMENTED | 108 hospitals and 76 OPD schedules imported and repository-backed; original strings retained. |
| Protocols | IMPLEMENTED | 435 source rows validated; 414 unique IDs stored, 21 duplicates reported. |
| Flashcards/Academy | IMPLEMENTED | 162 source cards plus backend progress. |
| Verified MCQs | PARTIAL | Quiz model/progress exist; no verified MCQ dataset was supplied, so questions are not fabricated. |
| Diseases | PARTIAL | Model, API, admin CRUD, and importer extension point exist; no source disease dataset supplied. |
| Doctors | PARTIAL | Model, API, admin CRUD, and honest empty state exist; no verified doctor dataset supplied. |
| My Health CRUD | IMPLEMENTED | Patient, family, history, medication, prescription, timeline, emergency card, consent, and notifications. |
| Medical reports | IMPLEMENTED | Real private local upload/download/delete, ownership, validation, and progress. |
| Production object storage | REQUIRES EXTERNAL PROVIDER | Local private storage is functional; cloud/KMS-backed adapter is not configured. |
| OCR | REQUIRES EXTERNAL PROVIDER | Disabled and HTTP adapters exist; no provider credentials. |
| AI assistant/report analysis | REQUIRES EXTERNAL PROVIDER | Disabled and HTTP adapters exist; no provider credentials. |
| Deterministic emergency triage | IMPLEMENTED | Red flags first, source protocol matching, 112 escalation, non-diagnostic copy. |
| Live medical diagnosis | NOT IMPLEMENTED | Intentionally out of scope. |

## Operations

| Capability | Status | Notes |
|---|---|---|
| Ambulance backend/state machine | IMPLEMENTED | Owned requests, cancellation, driver acceptance/status/location APIs. |
| Socket.IO | IMPLEMENTED | Authenticated user/role/request rooms and status/location events. |
| Ambulance simulation | DEMO | Explicit simulation; it does not dispatch a real vehicle or claim GPS. |
| Real dispatch/GPS | REQUIRES EXTERNAL PROVIDER | Requires dispatch organization, driver devices, maps, and operations agreements. |
| Admin control center | IMPLEMENTED | Stats, users/roles, invitations, imports, provider state, audit, and allowlisted content CRUD. |
| Audit logs | IMPLEMENTED | Persistent in Mongo mode; privacy-safe payload. |
| Email | REQUIRES EXTERNAL PROVIDER | Console preview works in development only. |
| Maps | PARTIAL | External directions link works; proximity and live maps are not claimed. |

## UI and quality

| Capability | Status | Notes |
|---|---|---|
| Health Command Center | IMPLEMENTED | Care Constellation, Family Health, Timeline Stream, emergency band. |
| Auth/OTP/password/upload UI | IMPLEMENTED | Aurora glass, password checks, six-box OTP, Dropbox drag/drop, success toast. |
| Themes/responsive/reduced motion | IMPLEMENTED | Light/dark/system; desktop, tablet, and mobile layouts. |
| Optional sound | IMPLEMENTED | User-gesture AudioContext and preference; never required. |
| Automated tests | IMPLEMENTED | Server, client, Playwright E2E, data validation, typecheck, lint, build. |

## Genuine limitations

- Production launch still requires MongoDB, TLS, durable private object storage, real email, secret management, monitoring, backups, and organizational privacy/compliance controls.
- AI/OCR and real dispatch/GPS cannot be completed truthfully without external providers and operating agreements.
- The supplied data contains no verified doctor, disease, MCQ, or emergency-contact directory, so HealthGuard preserves honest empty states.
- Multi-instance Socket.IO needs a shared adapter.

