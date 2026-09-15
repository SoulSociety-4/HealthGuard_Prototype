# Setup

## Prerequisites

- Node.js 20 or newer; Node.js 22 is recommended.
- npm.
- MongoDB only when durable database mode is required. Local memory mode is self-contained.

## Local development

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Open `http://127.0.0.1:5500`. The two development processes are:

- Vite web app: `127.0.0.1:5500`
- Express + Socket.IO API: `127.0.0.1:4174`

`npm run dev:web` starts only Vite. `npm run dev:server` starts only the API. HealthGuard should normally be started with `npm run dev`; VS Code Live Server is not sufficient.

## Database modes

Memory mode is the default development experience:

```dotenv
DATABASE_MODE=memory
```

It runs all local application flows but resets when the API restarts. For persistence:

```dotenv
DATABASE_MODE=mongo
MONGODB_URI=mongodb://127.0.0.1:27017/healthguard
MONGODB_DB_NAME=healthguard
```

Startup connects to MongoDB, performs idempotent supplied-data upserts, and then starts the server. A failed MongoDB connection stops startup instead of silently pretending persistence exists.

## Provider configuration

AI and OCR default to `disabled`; their UI reports unavailable rather than returning synthetic results. Configure the HTTP adapters with `AI_API_URL`, `AI_API_KEY`, `AI_MODEL`, `OCR_API_URL`, and `OCR_API_KEY` only when compatible services exist.

Local report storage is functional with `STORAGE_PROVIDER=local` and writes beneath `UPLOAD_DIR`. The console email provider is development-only and returns preview OTP/reset/invitation values outside production.

## Common commands

```powershell
npm run dev
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run validate:data
npm run import:data
npm run build
npm start
```

## Troubleshooting

- Port 5500 in use: close the other process; Vite uses `strictPort` and intentionally will not switch ports.
- API unavailable: confirm port 4174 is free and inspect the API terminal.
- Upload rejected: use PDF, JPG, JPEG, or PNG up to `MAX_UPLOAD_MB` and select a patient profile.
- MongoDB unavailable: either start MongoDB or set `DATABASE_MODE=memory` for local development.
- Registration appears at OTP: in development use the local preview code; in production configure a real email provider.

