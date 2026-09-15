# Design system

## Visual philosophy

HealthGuard is a calm near-future healthcare operating system: spatial, precise, source-aware, and reassuring under pressure. Its signatures are the Care Constellation, AI Pulse Core, Family Health Network, Medical Timeline Stream, Emergency Focus band, care explorer, tracking rail, and Academy learning cards.

The system avoids cyberpunk overload, generic white-card dashboards, decorative medical claims, and unearned health scores.

## Tokens

Runtime CSS variables in `src/styles.css` are canonical; `DESIGN.md` mirrors the durable product contract.

The September 2026 typography normalization uses rem-based semantic sizes: 16px body text, 14px readable data, 13px secondary labels, and responsive 32–40px page titles at the browser's default 16px root size. Heading and body line-height and weight tokens apply across shared components and feature pages. First Aid reuses the same surfaces, controls, category colors, dialog, and light/dark tokens.

- Canvas: cool blue-white in light mode, midnight navy in dark mode.
- Primary: trustworthy operational blue.
- Cyan: connected/active system state.
- Green: server-confirmed success.
- Amber: partial, simulated, or degraded state.
- Coral red: urgent, emergency, or destructive actions only.
- Typography: Segoe UI Variable/Aptos with Cascadia Code for exact operational data.
- Radii: 12px controls, 14px panels, 18–24px feature/glass surfaces.

## Glass and depth

Depth ranges from ambient canvas (0) through records, panels, interactive nodes, sticky navigation, popovers, modals, and emergency overlays (7). Glass is concentrated in navigation, auth, modal, and spatial-overlay surfaces; dense medical lists remain opaque for readability.

The aurora authentication screen uses a generated raster background, real Lucide icons, restrained edge light, and readable navy glass. The report uploader uses a clear dashed drop target, supported-file chips, real selection state, progress, and a green completion notification.

## Components and behavior

- Buttons and fields retain 44px minimum targets and visible focus.
- Pills are reserved for statuses and compact tags.
- Dialogs are portaled, focus-managed, Escape-closeable, and inert against the application behind them.
- Toasts have semantic icon, title, actionable copy, close control, and progress indicator.
- Public healthcare claims remain source-backed; uncertainty and provider-disabled states stay visible.

## Responsive behavior

Desktop uses a stable rail and command bar. Below 860px the rail becomes a drawer and a five-item bottom dock preserves critical routes. Spatial diagrams collapse into ordered, readable nodes. Authentication hides the story panel and keeps one scroll-safe glass form. Supported QA widths are 375, 390, 414, 768, 1024, 1280, and 1440+.
