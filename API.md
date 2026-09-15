# API

Base path: `/api/v1`.

## Authentication

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `POST /auth/verify-email`
- `POST /auth/resend-verification`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

Access tokens are returned in JSON and kept in frontend memory. Refresh tokens are opaque, rotated, hashed server-side, and set in an httpOnly cookie scoped to `/api/v1/auth`.

## Public/reference data

- `GET /health`
- `GET /health-data`
- `GET /categories`
- `GET /category-specialty-map`
- `GET /opd`
- `GET /hospitals`, `GET /hospitals/:id`
- `GET /protocols`, `GET /protocols/:id`
- `GET /flashcards`
- `GET /doctors`
- `GET /diseases`
- `POST /triage/assess`

Hospital, protocol, OPD, and flashcard responses are repository-backed after the idempotent startup import. List endpoints use `page` and `limit` where applicable and expose supported filters.

## Authenticated records

CRUD routes exist for `/patients`, `/families`, `/family-members`, `/history`, `/medications`, `/prescriptions`, `/timeline`, `/emergency-cards`, `/learning-progress`, and `/consents`. Every record is scoped to the authenticated owner.

Patient profile photos use a separate private storage boundary:

- `POST /patients/:id/photo` (multipart JPG/PNG, 2 MB maximum)
- `GET /patients/:id/photo` (authenticated owner only, private/no-store response)

Reports use multipart upload:

- `POST /reports`
- `GET /reports/:id/download`
- `POST /reports/:id/analyze`
- `DELETE /reports/:id`

## AI and emergency operations

- `POST /ai/health-assistant`
- `POST /ai/report-analysis`
- `POST /ai/condition-matching`
- `POST /ambulances/requests`
- `GET /ambulances/requests`
- `PATCH /ambulances/requests/:id/cancel`
- `POST /ambulances/requests/:id/simulate`
- driver accept/status/location endpoints under `/drivers/me`
- emergency sessions under `/emergency/sessions`

AI endpoints return `503 PROVIDER_UNAVAILABLE` when the provider is disabled; they do not generate fallback medical claims.

## Developer and admin

- developer invitations and provider status
- supplied-data import and validation
- stats and audit stream
- user role/status management
- allowlisted content list/create/update/deactivate/verify under `/admin/content/:collection`

Mutations require Admin. Developers have read-only access to permitted operational data.

## Error shape

```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Calm, actionable message",
    "details": null,
    "requestId": "..."
  }
}
```

Stack traces and secrets are not returned to the browser.
