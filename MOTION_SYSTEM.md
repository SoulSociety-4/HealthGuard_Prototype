# Motion system

## Principles

Motion communicates entry, focus, hierarchy, progress, and state. It is quick, weighted, and medically calm—never theatrical, bouncy, or required to understand an emergency action.

## Timing

- Fast feedback: 120–180ms.
- Controls and menus: 180–260ms.
- Panels and route-level entrances: 300–420ms.
- Exits are shorter than entrances.
- Toast lifetime: approximately 4.6s with a visible progress strip.

Transforms and opacity are preferred. Large continuously animated blur, shadow, and layout properties are avoided.

## Patterns

- Auth inputs rise by 1px and gain a blue focus halo.
- OTP focus uses a small lift/scale without moving adjacent controls.
- Important pointer-fine cards may tilt 2–5 degrees and reset immediately on exit.
- Dialogs combine opacity, small scale, and vertical offset with a blurred backdrop.
- Dropdowns, drawers, and notifications preserve enter, visible, and exit states.
- Upload drag state changes border, light, and elevation while keeping the target stable.

## Reduced motion

`prefers-reduced-motion: reduce` disables ambient drift, parallax, card tilt, complex transforms, and nonessential transition choreography. Controls, state updates, focus, progress labels, and emergency actions remain identical.

