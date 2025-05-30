# PRD – Script Toggle

## Purpose

Let users decide whether a formal script is useful for their micro-video.

## Default

ON (script shown)

## User Story

_As a Trend-Hopper, I want to skip script for a one-liner meme._

## Functional Requirements

- Toggle switch top-right of Step 2.
- OFF = hide outline pane, store `"scriptSkipped": true`.
- ON again regenerates outline (previous edits lost — warn user).

## Non-Functional

Toggle instant; generation ≤ 2 s.

## Success Metrics

≤ 10 % of users who toggle OFF flip back to ON within same session.

## Edge Cases

Toggling OFF after edits → confirmation modal.

## Pitfalls

Hiding toggle deep in settings—keep visible.

## Dependencies

Outline Generator.
