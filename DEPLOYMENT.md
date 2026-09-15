# Deployment

## Build and start

```powershell
npm ci
npm run verify
npm run build
npm start
```

Express serves the compiled React SPA and `/api/v1`; Socket.IO shares the same HTTP server. `HOST` defaults to `0.0.0.0` for container/platform compatibility and `PORT` defaults to 4174. In development Vite remains on strict port 5500.

## Required production configuration

- `NODE_ENV=production`
- `DATABASE_MODE=mongo`
- reachable `MONGODB_URI` and database name
- unique, different 32+ character `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`
- exact HTTPS `CLIENT_ORIGIN`
- `COOKIE_SECURE=true`
- `ENABLE_DEMO_ACCOUNT=false`
- durable private `STORAGE_PROVIDER` implementation
- real email provider for OTP, recovery, and invitations
- organization-approved AI/OCR providers only when enabled

Unsafe production secret/database combinations stop startup.

## Infrastructure

Run behind a TLS reverse proxy that supports WebSocket upgrades, body limits compatible with `MAX_UPLOAD_MB`, request timeouts, and forwarded-client IP handling. Keep uploaded objects private and scan them in the production storage pipeline. Back up MongoDB and object storage together, with tested restoration and retention policies.

Use `GET /api/v1/health` for readiness. It reports database mode, provider readiness, and realtime configuration without returning secrets.

## Horizontal scaling

The API is stateless except for Socket.IO process rooms and local filesystem storage. Multiple instances require a shared Socket.IO adapter and durable shared storage. Do not horizontally scale the current local-storage/single-process realtime setup without those replacements.

