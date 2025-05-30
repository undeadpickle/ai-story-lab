# PRD – Style Consistency

## Purpose

Prevent unintentional character or palette drift across scenes.

## User Story

_As a teacher, I lock “Cartoon Forest” style once so every scene matches._

## Functional Requirements

- Global Style text/seed displayed atop Step 3.
- “Lock Style” toggle—injects style text into every prompt.
- When a scene overrides, banner turns orange: “Scene 3 overrides Global Style.”

## Non-Functional

No performance impact—string concat only.

## Success Metrics

≥ 60 % of completed stories use style lock.

## Edge Cases

Removing global style mid-project asks whether to regenerate existing images.

## Pitfalls

Hidden lock state—always visible.

## Dependencies

Image Generation, Video Generation.
