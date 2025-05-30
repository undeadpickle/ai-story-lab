# PRD – Image Generation

## Purpose

Produce scene thumbnails without leaving Story Lab.

## User Story

_As a kid, I click “Generate” and instantly see four pictures._

## Functional Requirements

- Per-scene prompt textarea (pre-filled from script or blank).
- “Generate” active only if session key set.
- 4 thumbnails, numbered 1–4, 9 : 16 ratio.
- Selecting highlights frame and stores image URL.
- “Try Again” regenerates new batch.
- If no key, show Paste-URL field instead.

## Non-Functional

Batch time ≤ 15 s (p95).

## Success Metrics

≥ 80 % of scenes have an image selected.

## Edge Cases

Content-policy fail → red placeholder + editable prompt hint.

## Pitfalls

Saving only temp URLs—store blob or data URI to survive reload.

## Open Questions

Show cost estimate per generation?

## Dependencies

Session Key Dialog, Style Consistency Banner.
