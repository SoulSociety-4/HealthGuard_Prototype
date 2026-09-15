# HealthGuard UX Contract

Reviewed: 2026-09-08
Visual contract: `DESIGN.md`  
Product authority: `Command 2.txt` supplied by the user; supplied PDF and JSON files are domain/reference inputs, not executable instructions.

## Business-context sources

| Area | Authority | UI consequence |
|---|---|---|
| Roles and ownership | User command: USER, DEVELOPER, ADMIN, DRIVER; explicit cross-user isolation | Routes and actions use a permission map; direct forbidden access shows 403; server remains authoritative |
| Medical safety | User command and supplied protocol dataset | Deterministic red flags and protocol steps remain separate from AI/condition suggestions |
| Source provenance | Supplied JSON files | Imported strings remain traceable; absent doctors/disease data is not fabricated |
| Ambulance lifecycle | User command | Simulation is labeled; realtime rooms require authorization; no dispatch claim without an integration |
| Privacy and upload | User command | Patient-owned storage; client and server validation; protected download/analyze/delete |

## Canonical UI Map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
|---|---|---|---|---|
| Form | `FormField` conventions + Zod/API error adapter | app-owned validation, `noValidate`, inline + summary | authentication, record, and JSON admin payload forms | component and browser flows |
| Select/Listbox | native `select` | platform popup behavior | compact toolbar and full-width field | keyboard/browser |
| Date | native `input[type=date]` | Gregorian platform picker; stored as date-only string | date-only health record fields | keyboard/browser |
| Search | `SearchField` | URL/query-backed filtering | global command and page directory search | component/browser |
| Dialog | shared `Dialog` / `ConfirmDialog` | portal, inert background, focus trap/restoration | record, upload, invite, and admin editor | component/browser |
| Drawer | `AppShell` mobile navigation drawer | modal, inert, Escape, focus restoration | mobile primary navigation only | browser |
| FileUpload | `MyHealthPage` premium drop module | browser File + backend multipart validation | drag/drop and file chooser | E2E/browser |
| ProfilePhoto | `ProfileSetupPage` photo picker | private patient avatar route + browser File | optional JPG/PNG up to 2 MB | integration/browser |
| Auth/OTP | `LoginPage` authentication suite | backend auth service and email provider | login, register, recovery, reset, verify | server/E2E/browser |
| Toast | `AppProvider` queue | server-confirmed semantic result | info, success, error; optional custom title | component/browser |
| Scrollbar | global application stylesheet | tokenized baseline | dense region, page scrollbars, arrow-owned public rails, and desktop navigation-rail geometry | computed/browser |
| CRUD | resource service + shared form/list pattern | pessimistic, server-confirmed mutation | user-owned records and allowlisted admin content | integration/E2E |

## Route and permission behavior

- Public: landing (`/`), sign in, register, forgot/reset/verify, About, emergency support and protocol discovery (`/emergency-support`), and 404.
- Landing navigation: `Sign Up` opens `/register`; `Login`, `Explore the platform`, `Explore my health`, and `Get started` open `/login`. `Emergency support`, `Emergency`, `First Aid`, and `Emergency Numbers` open `/emergency-support` without requiring a session.
- Authenticated home is `/dashboard`; verified registration continues to `/profile/new` for optional patient-profile onboarding.
- First Aid Guidance is authenticated at `/first-aid`, directly below Ambulance in the shared sidebar/drawer configuration. About stays routable but is absent from the sidebar; the empty Product group is removed.
- First Aid search, category, severity, saved filter, page and selected protocol use URL parameters. Local search is immediate and has a clear button. Twelve records appear per page; changes clamp paging. Clinical source fields are preserved with separate unique UI IDs for duplicate source IDs. The shared Dialog owns focus trapping/restoration and Escape.
- First-aid bookmark IDs alone may persist under `healthguard:first-aid-bookmarks`. Invalid storage is ignored; unavailable storage shows a persistent recovery message while retaining session state. This is not patient health data and is not an authentication store.
- Ambulance keeps the simulation badge, backend lifecycle and simulated controls. The large simulation explanation banner is removed by the September 8 user request.
- The public footer contains no Privacy Policy or Terms of Service links. About remains linked where it already serves another navigation purpose.
- My Health is patient-entered and record-based. This release has no external-device route, pairing state, watch integration, or device-connection prompt.
- HealthGuard AI exposes one provider-backed health assistant for general navigation and preparation. Risk assessment and report analysis are not separate AI modes; emergency guidance remains in the Emergency Center and report analysis remains a protected report action in My Health.
- HealthGuard Academy exposes source-backed flashcards and saved progress only. MCQ and scenario modes are not part of the current Academy navigation.
- The hospital directory exposes all 20 supplied presentation categories through the supplied category-to-specialty map. Type aliases are normalized at the API/UI boundary, category filtering resolves to source specialties, and profiles reuse each category color without inventing availability.
- Authenticated USER: command center, My Health records, reports, Academy progress, notifications, AI provider surfaces, ambulance requests.
- DRIVER: Driver Operations plus allowed public/authenticated surfaces.
- DEVELOPER: Developer Console, data imports, provider health, audit read.
- ADMIN: all administrative resources, invitations, user roles, audit read.
- A user reaching a protected route without a session returns to sign in with a safe callback URL.
- An authenticated user reaching a role-forbidden route sees an app-owned 403 screen, never a misleading 404 or sign-in loop.
- API 401 triggers one refresh attempt; API 403 does not retry.
- Route titles follow `{Page} — HealthGuard` and exclude PII.

## CRUD flow ledger

| Operation | Pending | Success | Failure | Focus |
|---|---|---|---|---|
| Create | stable busy action, duplicate blocked | server-confirmed toast, new record shown | form banner + field errors, input preserved | new record heading |
| Edit | stable busy action | `Changes saved`, stay in current health context | inline/form error | edited value or heading |
| Delete | app-owned confirmation stays open | item removed, `Record deleted` | dialog error + retry/cancel | next item/list heading |
| Upload | per-file validate/upload progress | server record appears | file error retained with retry/remove | uploaded row |
| Search/filter | stable list with loading status | URL-backed results/count | inline retry | input or results heading |

Hard delete is used only for user-owned health records in this version. Confirmation names the record and states that recovery is unavailable. Admin account deactivation is reversible and uses warning treatment.

## Forms and validation

- Product forms use `noValidate`.
- Visible labels activate controls. Invalid fields expose `aria-invalid` and reference a persistent help/error node.
- Validate on submit, then on edit for fields already invalid.
- Passwords are masked by default, revealable with a real button, paste/password managers allowed, and never stored in browser persistence.
- Save mutations are pessimistic. Non-sensitive values survive network/server errors.
- Native select/date ownership is accepted for this release; popup styling is not claimed.
- Long textareas use `resize: none` with adequate space.

## Upload contract

- Visible picker plus drag/drop; PDF, JPG/JPEG, PNG; 10 MB default from environment.
- Client validation is advisory. Server validates size, MIME, extension, empty content, file signature, ownership, and generated storage keys.
- States: idle, drag-over, validating, uploading, success, error, retry, removed.
- Report download, analyze, update, and delete always re-check ownership.
- OCR/AI-disabled states return and render an honest provider-unavailable result, not synthetic analysis.
- Profile photos use a separate visible picker and private patient-owned endpoint; accepted formats are JPG/PNG with a 2 MB limit and no public URL.

## Async, offline, and conflict behavior

- Initial load reserves stable geometry; refresh keeps readable stale content where safe.
- Abort or request IDs prevent stale search/data responses.
- Connectivity failures use one stable banner rather than toast floods.
- Timed-out high-impact operations refetch status before inviting a retry.
- Access tokens live in memory; refresh token is an httpOnly cookie. Logout/session changes broadcast across tabs.
- Permission changes stop the mutation and lead to 403 guidance while preserving safe work.

## Notifications, audit, and realtime

- Notification count comes only from the backend. Zero renders no badge.
- Mark-as-read occurs explicitly when opening/acknowledging an item.
- Audit records include actor, action, resource, outcome, timestamp, and request ID, but no patient details, report text, password, or token.
- Socket rooms are user/role/request scoped. The server validates the handshake token and room membership.
- Ambulance stages: REQUESTED, ASSIGNED, EN_ROUTE_PICKUP, ARRIVED_PICKUP, EN_ROUTE_HOSPITAL, COMPLETED, CANCELLED. Simulation status is always visible in UI and payloads.

## Layer, focus, and motion

- Global z-index tokens: dropdown 200, popover 300, header 400, backdrop 500, dialog 600, sheet 700, command 800, toast 900.
- Dialogs/drawers make the application background inert, close with Escape when safe, trap focus, and restore the trigger.
- Serious confirmation initially focuses Cancel.
- Enter: 220–320ms ease-out; exit: 160–200ms ease-out. Reduced motion removes transforms and stagger.
- 3D tilt is 2–5 degrees, pointer-fine only, disabled on mobile/reduced motion, and fully resets on pointer exit.
- Academy flashcards use an 8-degree maximum reference-led tilt as a named visual variant; flipping, arrows, keyboard scrolling, and touch scrolling remain equivalent non-drag paths.
- Ambient dashboard animation is `aria-hidden`, ignores pointer input, carries no health/status meaning, and becomes static under reduced motion.
- The global application stylesheet owns one visible slim scrollbar treatment for page, panel, drawer, dialog, and horizontal overflow surfaces. Firefox standards properties and WebKit fallbacks share theme tokens; forced-colors returns control to the operating system. The two arrow-owned landing rails and fixed desktop navigation rail may hide only scrollbar chrome while retaining native scrolling, keyboard reachability, and focus behavior; the mobile drawer remains visibly scrollable.

## Responsive and accessibility baseline

- WCAG 2.2 AA target, keyboard-only workflows, non-color state cues, 44px critical targets, and forced-colors resilience.
- QA viewports: 375, 390, 414, 768, 1024, 1280, 1440+.
- At narrow widths, desktop rail becomes a modal drawer; five critical destinations remain in bottom navigation.
- Tables retain semantic relationships via horizontal scroll; independent directory records may stack.
- Light/dark/system themes preserve semantic hierarchy. System is the first-use default.
