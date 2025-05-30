# PRD – Image → Video Generation

## Purpose

Animate selected stills into 1- to 2-second motion clips.

## User Story

_As an Indie creator, I paste my prompt and key to get a wobbly 2 s shot._

## Functional Requirements

- Collapsible panel under chosen image: prompt field, key field, “Generate Clip”.
- Clip thumbnail appears, duration auto-detected.

## Non-Functional

Clip ≤ 6 MB, ≤ 10 s length (hard limit).

## Success Metrics

≥ 50 % of scenes have a clip.

## Edge Cases

If generation fails, retain still image as fallback.

## Pitfalls

Allowing > 10 s clips—will blow ZIP size.

## Open Questions

Looping playback or play once on tap?

## Dependencies

Session Keys, Download Bundle (/vid folder).
