# PRD – Simple Cuts Editor

## Purpose

Provide the tiniest timeline needed for TikTok-style stitching.

## User Story

_As a phone user, I drag a thumbnail upward and it moves left — simple!_

## Functional Requirements

- List of scene cards with grab handle.
- Drag-to-reorder (touch + mouse).
- Duration field (seconds) next to each card; default 3 s for stills, read-only for clips.
- “Preview” button plays sequence with hard cuts.

## Non-Functional

Drag latency < 100 ms; Preview 30 fps.

## Success Metrics

≥ 90 % of previews play without buffering.

## Edge Cases

Setting still duration to 0 s → warn “Must be ≥ 1 s.”

## Pitfalls

Adding fades—save for later.

## Dependencies

Image / Video assets ready.
