# PRD – Safety

## Purpose

Soft guardrails suitable for children without heavy moderation systems.

## User Story

_As a parent, I’m glad my kid sees a friendly warning instead of a scary error._

## Functional Requirements

- Catch content-policy errors → display “Try a different prompt (avoid violence, gore, adult terms).”
- Max attempt counter (3) before suggesting a full prompt rewrite.
- Idea step disclaimer: “Don’t include private info.”

## Non-Functional

Error message appears < 1 s after response.

## Success Metrics

< 5 % of kids abandon due to confusing block messages.

## Edge Cases

Generator returns empty body → generic retry toast.

## Pitfalls

Technical jargon in safety text.

## Dependencies

Error handling in Image & Video generation.
