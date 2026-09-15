# AI integration

## Safety order

HealthGuard separates deterministic emergency triage from optional AI:

1. explicit red flags are checked locally;
2. matching supplied medical protocols are selected deterministically;
3. emergency instructions and the 112 action are shown immediately;
4. an optional AI provider may assist only after those controls.

AI output is never required to expose an emergency action and is never represented as a diagnosis.

## Provider contract

`DisabledAIProvider` returns a truthful `503 PROVIDER_UNAVAILABLE`. `HttpAIProvider` supports three tasks through a configured server-side endpoint:

- `health-assistant`
- `report-analysis`
- `condition-matching`

The adapter sends `{ model, task, payload }` with a bearer API key, a 25-second timeout, and no frontend secret exposure. Configure `AI_PROVIDER`, `AI_API_URL`, `AI_API_KEY`, and `AI_MODEL`.

The OCR boundary follows the same disabled/HTTP pattern and is invoked only after file validation and storage. Report stages shown in the UI correspond to operations actually attempted.

## Production provider requirements

A production adapter still requires a contracted service, schema validation for its exact response, data-processing and retention agreements, PHI minimization, auditability, regional controls, medical safety evaluation, human escalation, and organization-approved prompts/models. HealthGuard intentionally does not fabricate provider output when these are absent.

