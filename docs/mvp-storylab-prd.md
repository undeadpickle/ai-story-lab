# 🚀 Story Lab – MVP PRD (Zero-Backend, Mobile-Friendly)

---

> **About this Document**  
> This specification defines the **Minimum Viable Product** for Story Lab.  
> It is expressly **NOT** the final vision; all requirements here serve to validate fundamental value, speed, and usability. A richer, fully-featured release (audio, cloud sync, sandbox editing, collaboration, etc.) will be layered **on top of this MVP foundation** once real-world feedback is gathered.

---

## 1. Goal

Let a creator, aged 10 to 50, turn a one-sentence idea into a **1 to 5-shot storyboard and lightly-edited video** in < 5 minutes on phone or desktop, entirely browser-side.

---

## 2. Success Metrics

| Metric                                | Target          |
| ------------------------------------- | --------------- |
| First publish ≤ 5 min                 | 80 % of testers |
| Ease-of-use rating                    | ≥ 4 / 5         |
| Export works on iOS, Android, desktop | 100 %           |

---

## 3. Scope – Must-Haves

| Component                        | Details                                                                                                                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Local Persistence**            | Projects stored in browser storage; resume list on launch.                                                                                                                      |
| **Wizard (4 steps, ≤ 5 scenes)** | 1) Idea  2) Outline + Script (toggle to skip) 3) Visual Prompts & Generation 4) Simple Cuts & Export                                                                            |
| **Script Toggle**                | Default ON; user can “Skip scripting (improv mode)”.                                                                                                                            |
| **Image Generation**             | Inline “Generate” button that calls an integrated image API if user pastes a session key. Alternate option: user pastes an external image URL if they prefer another generator. |
| **Image→Video Generation**       | Prompt field + optional session key for a compatible image-to-video API (e.g., Kling). If no key, user can paste a finished clip URL instead.                                   |
| **Style Consistency**            | Scene card shows “Global Style” reference; user can override per scene.                                                                                                         |
| **Simple Cuts Editor**           | List of up to 5 scene thumbnails; drag-to-reorder; “duration seconds” numeric field; preview sequence; hard-cut playback only.                                                  |
| **Download Bundle**              | ZIP → `/scripts/story.txt`, `/img/scene01.jpg…`, `/vid/scene01.mp4…`, `/storylab_preview.html` (auto-plays sequence).                                                           |
| **Mobile UX**                    | Thumb-reachable nav bar, 48 px buttons, swipe gallery for images, drag-reorder works with touch.                                                                                |
| **Desktop UX**                   | Wider grid, same features; keyboard shortcuts optional (not required).                                                                                                          |
| **Session Keys**                 | Dialog at first use of each generator type; key lives only in memory for that page session.                                                                                     |
| **Safety**                       | Friendly error if generator blocks content; no age gate for MVP.                                                                                                                |

---

## 4. Out-of-Scope (Phase 2+)

Audio/TTS, transitions beyond hard cuts, authentication, cloud sync, sandbox editor, collaboration, analytics dashboards.

---

## 5. Golden Flow (Phone Portrait)

1. **Start a Story**
2. **Idea** – enter logline → “Next”.
3. **Outline & Script** – auto-filled; user edits; or toggles _Skip Script_ → “Next”.
4. **Visuals** – for each scene:
   - shows Global Style reference,
   - user can edit prompt, tap **Generate** (if key present) or paste existing image URL,
   - choose 1 of 4 thumbs.
5. **Video (Optional)** – per scene: paste/prompt-generate clip (or leave blank for still).
6. **Simple Cuts** – drag scenes to order, set duration, tap **Preview**.
7. **Download Bundle** – ZIP saved; toast confirms; prompt “Start New Story?”.

Total taps: **≤ 22**.

---

## 6. Real-World Use-Case Walkthroughs

| Persona                     | Flow Snapshot                                                                                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Trend Hopper (16)**       | On phone → 3-scene meme idea → skips script → 3 images, 3 auto clips via session key → 6-sec preview → ZIP → uploads to Shorts.                                                                  |
| **Young Storyteller (10)**  | Chromebook → 5-scene fantasy → keeps script → uses image generation for cartoons → leaves video blank (still images) → downloads slideshow ZIP for class.                                        |
| **Teacher Explainer (34)**  | Desktop → 4 slides on “Photosynthesis” → script auto → generates stills → sets each still to 4 s → bundle → embeds preview HTML in Google Sites.                                                 |
| **Indie Lore-Builder (50)** | Tablet → 5-scene noir teaser → refines prompts for consistent detective character → drags scene 3 first → uses external clip URL for finale → ZIP → imports into After Effects for colour grade. |

---

## 7. Edge Cases & Fallbacks

| Situation                    | Expected Behaviour                                               |
| ---------------------------- | ---------------------------------------------------------------- |
| No session key provided      | “Generate” button disabled; field to paste external URL appears. |
| Image API times out          | Retry link + suggestion to simplify prompt.                      |
| User adds 6th scene          | Alert: “MVP limit is five shots.”                                |
| Skip script toggled mid-flow | Outline pane collapses; stored script cleared.                   |
| Local storage full           | Alert lists oldest projects to delete.                           |

---

## 8. Pitfalls & “Don’t Do” Items

- **Complex timeline UI** – keep to drag-reorder + duration box only.
- **Jargon** – never surface words like “token limit” or “rate-limit.”
- **Hidden prompts** – show the text each generator receives.
- **Unlabeled exports** – every file prefixed with scene number.
- **Forgetting session keys** – remind users keys vanish on page reload.

---

## 9. Known Risks & Mitigations

| Risk                                 | Mitigation                                                                                      |
| ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Generator policies block kid prompts | Friendly fail message; offer prompt edit.                                                       |
| Users lose work on tab close         | Autosave draft to local storage every 10 s.                                                     |
| Inconsistent visuals                 | Global Style reference banner on every scene card; override banner turns orange when deviating. |

---

## 10. Thin-Slice Build Order (No Tech References)

1. **Local Storage Core** – create/save/load project JSON list.
2. **Wizard Skeleton** – 4 static steps; swipe/tap nav.
3. **Idea → Outline Engine** – logline → outline & script JSON.
4. **Script Toggle** – switch between outline view and skipped state.
5. **Image Prompt Card** – prompt field, 4-thumb mock fetch, select 1.
6. **Session Key Dialog** – per generator type, memory-only.
7. **Simple Cuts Preview** – drag-reorder, duration input, HTML preview.
8. **ZIP Export** – bundle all assets, numbered files, preview page.
9. **Error & Storage Guardrails** – toasts, space warnings, retry loops.

Ship → test with real users → iterate.
