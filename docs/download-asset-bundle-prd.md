# PRD – Download Bundle

## Purpose

Give creators a portable package for upload or further editing.

## User Story

_As an After-Effects user, I love seeing scene files already numbered._

## Functional Requirements

- ZIP with `/img`, `/vid`, `/scripts`, plus `storylab_preview.html`.
- HTML autoplays sequence using specified durations.
- File naming: `01_scene_title.jpg / .mp4` etc.
- Show total ZIP size before download.

## Non-Functional

ZIP creation ≤ 5 s for 5 scenes.

## Success Metrics

0 corrupted ZIP reports in first 50 testers.

## Edge Cases

Mobile Safari can’t open ZIP inline → prompt “Download to Files app.”

## Pitfalls

Missing MIME types in HTML—test offline.

## Dependencies

Simple Cuts (duration JSON), Local Persistence.
