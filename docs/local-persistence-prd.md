# PRD – Local Persistence

## Purpose

Keep projects safe between sessions without sign-ups or servers.

## Primary Actor

Any creator (age 10-50) reopening Story Lab.

## User Stories

- _As a user, I want my unfinished story to appear on the home screen so I can pick up where I left off._
- _As a teacher on a shared Chromebook, I want to delete old projects to free space._

## Functional Requirements

- Auto-save project JSON after every field change (≤ 1 s debounce).
- “My Stories” landing screen shows thumbnail, title, last-edited timestamp.
- Delete and duplicate actions per project.
- Detect quota errors and surface a tidy warning: “Your device is full—delete an older project or download then remove it.”

## Non-Functional Requirements

- Write/read < 200 ms on typical mobile hardware.
- Max single-project size ≤ 15 MB.

## Success Metrics

- ≥ 95 % of abandon/resume attempts restore full state.
- Storage error seen by < 5 % of users with ≤ 3 projects.

## Edge Cases

Private-browsing modes that disable storage → show “draft lost” banner and encourage download.

## Pitfalls to Avoid

Silent data loss when quota hits—always confirm write success.

## Open Questions

Should “Export & Delete” be a single click for low-storage devices?

## Dependencies

ZIP Export (needs same folder naming).
