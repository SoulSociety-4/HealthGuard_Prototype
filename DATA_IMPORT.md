# Data import

## Supplied sources

- `hospitals.json`: 108 hospital records
- `hospital_opd.json`: 76 named OPD schedules
- `protocols.json`: 435 rows, 414 unique protocol IDs
- `flashcards.json`: 162 learning cards
- `categories.json`: 20 presentation categories
- `category_specialty_map.json`: category/specialty vocabulary

The original files are preserved in `server/data` and `public/data` for traceability and static offline fallback.

## Pipeline

```text
JSON read → structural validation → OPD normalization → source-key deduplication
→ repository upsert → audit event → validation/import report
```

The importer is idempotent. Hospitals use a stable name-based source key, protocols use their source ID, and flashcards use their supplied order. Duplicate protocol IDs are reported and one record per unique source ID is persisted. No missing medical facts are invented.

OPD records retain exact original weekday/Saturday/Sunday/note strings. The normalizer records conservative machine-readable fields only when the source text supports them. Original values remain authoritative for display and audit.

## Commands

```powershell
npm run validate:data
npm run import:data
```

Startup also runs the supplied-data import against the active repository. The report includes records read, valid/invalid counts, duplicates, missing fields, parsing warnings, imported records, source counts, and per-collection upsert counts.

## First Aid Guidance source migration (2026-09-08)

`healthguard_redesign.zip` contains `index.html`, `style.css`, `script.js`, and `logo.png`. The React integration imports the complete `CATS`, `DB`, and `generateExtraEntries()` data from `script.js`; it does not execute the standalone script, inject HTML, load its global CSS, or duplicate its navbar/chat system. The existing official HealthGuard logo remains canonical.

`scripts/import-first-aid.mjs` uses Acorn to read only allowlisted literal AST nodes. Run it from the project root with the source script path. The resulting `src/data/first-aid-source.json` contains 435 entries, 20 categories, the source filename and SHA-256. All title, category, severity, tag, icon, warning, step, do-not and professional-help fields are preserved. Twenty-one repeated source IDs receive stable suffixed UI IDs; `sourceId` preserves each original value. Existing backend protocol imports and all hospital/patient/auth data are unchanged.

`src/data/firstAidProtocols.ts` supplies typed data and shared filtering. The route is lazy-loaded so the reference database is not in the initial application bundle. Bookmarks contain only validated protocol IDs. The imported dataset includes clinician-only medicines/procedures and has not been clinically validated; it is visibly marked as a source reference. General first-response instructions link to the Red Cross and the local emergency number links to 112 India. Clinical review of all imported entries is required before presenting them as validated treatment guidance.

## Doctors directory (2026-09-12)

The supplied `doctors.json` is preserved byte-for-byte in `src/data/doctors.json`. The existing authenticated `/doctors` page imports all 23 records directly, following the bundled first-aid directory pattern. No database import or additional API setup is needed for this frontend page.

Cards show each source name, specialty, qualifications, experience, hospital/practice location and optional note. Four null experience values display as “Not provided”. Hospital strings retain their original locality and former-name information; no street addresses, availability or verification status are inferred. Search covers names, specialties, qualifications and hospitals. Specialty and hospital filters combine with search, and six records appear per page. Query, filters and page are URL-backed.

To update this frontend directory, replace `src/data/doctors.json` with an array using the same fields, then rebuild. This does not populate the separate backend doctor model/API.

## Adding repository-backed disease or doctor data

Place verified source data in a dedicated source file, extend the allowlist/loader and importer, preserve a source record ID and provenance, add validation tests, and only then expose it through the existing repository-backed model/API. Do not hand-create medical facts to fill empty states.
