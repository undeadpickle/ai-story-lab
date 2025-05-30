# PRD – Four-Step Wizard

## Purpose

Move users from blank idea to export in under five minutes.

## Flow

1. **Idea** 2. **Script** 3. **Visuals** 4. **Cuts & Export**

## User Story

_As a 10-year-old, I want obvious “Next” arrows so I never feel lost._

## Functional Requirements

- Persistent progress bar (1/4, 2/4…).
- Mobile: swipe left/right; Desktop: arrow buttons & keyboard left/right.
- “Back” always enabled; exiting returns to autosaved draft.
- Scene-count selector (1-5) pinned in Step 2.

## Non-Functional

Step change < 300 ms; works in portrait 360 px width.

## Success Metrics

≥ 70 % of first-time users finish all 4 steps.

## Edge Cases

Refresh on Step 3 reopens on same screen with state restored.

## Pitfalls

Overloading Step 3 with advanced options—keep prompt + generate only.

## Open Questions

Do we show a mini-tutorial on first launch?

## Dependencies

Local Persistence, Image Gen, Script Toggle, Cuts Editor.
