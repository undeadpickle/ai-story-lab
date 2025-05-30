# 📐 Story Lab – User-Experience & Flow Specification

_(Scope: MVP – “Zero-Backend” edition)_

---

## 1. UX Mission Statement

Deliver a **playful, five-minute creation ritual** that works with equal ease for a curious ten-year-old on a phone and a tinkering fifty-year-old on a laptop.  
The interface should feel like a **colourful story sketchbook**: linear enough to never lose beginners, yet transparent and flexible for iterators.

---

## 2. Core UX Principles

| Principle                      | Practical Translation                                                                     |
| ------------------------------ | ----------------------------------------------------------------------------------------- |
| **Show the Path**              | Persistent step indicator (1–4) and breadcrumb labels (“Idea → Script → Visuals → Cuts”). |
| **One Thing at a Time**        | Each screen focuses on a single decision—no scrolling ​forms crammed with options.        |
| **Touch-First, Click-Awesome** | 48 px tap targets, swipe nav; desktop gets keyboard shortcuts & hover hints.              |
| **Keep Visible State**         | Style-lock banner, selected thumbnails, key-status badge—no hidden mode switches.         |
| **Gentle Guardrails**          | Friendly copy for errors (“Let’s tweak that prompt!”), undo everywhere, autosave.         |

---

## 3. Primary Personas & Motivations

| Persona                              | Device            | Motivation                                                  | UX Hooks                                                            |
| ------------------------------------ | ----------------- | ----------------------------------------------------------- | ------------------------------------------------------------------- |
| **Maya (10)** – Young Storyteller    | School Chromebook | Make a 5-slide fantasy tale for class show-and-tell.        | Bright icons, emoji status markers, big “Shuffle” button.           |
| **Leo (16)** – Trend Hopper          | iPhone portrait   | Ship meme videos in minutes for TikTok.                     | Fast idea seed, skip-script toggle, drag-length to 1-sec shots.     |
| **Sara (34)** – Teacher Explainer    | PC laptop         | Quickly illustrate a science concept.                       | Clear outline structure, alt-text tooltips, PDF in download bundle. |
| **Victor (50)** – Indie Lore-Builder | iPad landscape    | Draft stylized noir shorts, export clips for After Effects. | Style-lock toggle, per-scene prompt edit, labelled ZIP export.      |

---

## 4. Information Architecture

Home / My Stories
├── Story Card ▸ Resume Wizard
└── + New Story
├─ Step 1 Idea
├─ Step 2 Script (toggle on/off)
├─ Step 3 Visuals
│ ├─ Per-scene prompt & Generate
│ └─ (optional) Image→Video sub-panel
├─ Step 4 Cuts & Preview
└─ Download Bundle

_Global elements:_

- Progress bar top / bottom.
- Help “?” opens context panel with GIF of expected action.
- Autosave toast bottom-center (“Saved · 2 sec ago”).

---

## 5. Golden Flow (Mobile Portrait)

| Screen               | Action                                              | Visual Cue                                      | Micro-copy                                                              |
| -------------------- | --------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------- |
| **Home**             | Tap **Start a Story**                               | Plus button ripples                             | “Let’s craft something amazing.”                                        |
| **Step 1 – Idea**    | Type logline → **Next**                             | On-screen keyboard pushes form up               | Placeholder: “e.g. _A raccoon opens a bakery in space_”                 |
| **Step 2 – Script**  | Auto outline appears (3 cards). User tweaks line 2. | Cards float in with subtle slide                | “Need fewer scenes? Drag slider.”                                       |
| **Step 2 Toggle**    | Toggles OFF “Script Mode”.                          | Outline pane collapses; confetti “Improv mode!” | Confirmation snackbar “Script skipped—you can turn it back on anytime.” |
| **Step 3 – Visuals** | Prompt auto-filled, taps **Generate**               | Progress ring on Generate; four thumbs fade in  | Thumb labels A-B-C-D                                                    |
| **Scene Style Lock** | Sets global style once.                             | Banner turns green, lock icon animates          | Tooltip: “All scenes will follow this style.”                           |
| **Step 4 – Cuts**    | Drags Scene 3 up, sets still durations 2-2-1 s.     | Thumbnail snaps, haptic tick                    | “Swipe left/right in Preview to scrub.”                                 |
| **Preview**          | Taps Play ▶                                         | Full-screen vertical player                     | Hard-cut playback                                                       |
| **Download**         | Tap **Download ZIP (12 MB)**                        | Circular progress fills                         | Toast: “Saved to Files — StoryLab_2025-05-29.zip”                       |
| **Return Home**      | Tap back arrow                                      | New card appears top of list                    | Card shows ✅ thumbnail + timestamp                                     |

Expected taps: **18–22**  
Expected elapsed time: **≤ 5 min** on 4G.

---

## 6. Desktop Adaptation

| Element           | Desktop Enhancement                                          |
| ----------------- | ------------------------------------------------------------ |
| Step bar          | Horizontal with clickable labels (Idea ▸ Script ▸ …)         |
| Step 2 & 3 layout | Split-pane: left outline, right live preview / image thumbs. |
| Keyboard          | ← → nav, `Ctrl+G` = Generate, `Space` = Preview.             |
| Drag-reorder      | Grab handle appears on hover; right-click “Move to top”.     |

---

## 7. Interaction & Micro-state Details

| Component                 | States                                                                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Generate Button**       | _Idle_ → focus glow on hover/touch → _Generating_ (progress ring) → _Success_ (brief pulse) → _Error_ (shake + red border). |
| **Thumbnail**             | _Unselected_ (grey border) → _Hover/Touch_ (lift 4 px shadow) → _Selected_ (bold colour ring).                              |
| **Style Banner**          | _Unlocked_ (neutral), _Locked_ (green with lock icon), _Override_ (orange with exclamation).                                |
| **Session-Key Indicator** | Grey dot (unset), red (!), green (valid).                                                                                   |
| **Autosave Toast**        | Bottom-center, fades in/out 1.5 s, secondary line “Saved locally”.                                                          |

---

## 8. Error & Edge-Case Handling

| Scenario                          | UX Response                                                                       |
| --------------------------------- | --------------------------------------------------------------------------------- |
| **Image API timeout**             | Inline card: “Hmm, taking long… Retry?” + spinner pause.                          |
| **Quota full**                    | Modal: “Your device storage is full. Download or delete old stories to continue.” |
| **No key, user hits Generate**    | Slide-up sheet requesting key with friendly copy.                                 |
| **Invalid prompt (policy block)** | Red banner beneath prompt: “Let’s try a friendlier description.”                  |
| **Offline mid-flow**              | Cloud-slash icon top bar, disable Generate, offline tip link.                     |
| **Rotate device**                 | Responsive layout breaks into two rows; progress bar stays visible.               |

---

## 9. Copy & Tone Guidelines

- **Encouraging, not childish** — “Great pick!” vs “Yay you clicked!”
- Use **present-tense verbs** on CTAs: “Generate”, “Download”, “Preview”.
- Avoid AI jargon (“tokens”, “rate limit”, “payload”).
- Friendly emojis allowed sparingly (✅, 🔄) for status clarity.

---

## 10. Visual & Motion Language

- Palette: Bright primaries with 8:1 contrast variants.
- Icons: Minimal outline style, stroke 2 px.
- Motion: 150 ms ease-out for fades, 120 ms for shadows; drag-reorder uses 0.25 s spring drop.
- Fonts: Rounded sans-serif (kid-friendly yet modern).

---

## 11. Accessibility Checklist

| Check           | Target                                              |
| --------------- | --------------------------------------------------- |
| Colour contrast | ≥ 4.5:1 text vs background                          |
| Tap targets     | ≥ 48 × 48 px                                        |
| Focus order     | Logical step sequence, modals return focus          |
| Screen reader   | All buttons labelled (“Generate image for Scene 2”) |
| Captions        | Preview player shows scene captions (if script on)  |

---

## 12. Analytics Hooks (Client-Side Only)

- `start_story`, `step_complete`, `image_generate`, `clip_generate`, `preview_play`, `download_zip`, `error_type`, `autosave_event`.  
  _(Stored locally or sent via privacy-safe ping—implementation deferred.)_

---

## 13. Pitfalls to Avoid

1. **Hidden Navigation:** Always display step bar; don’t rely solely on gestures.
2. **Over-asking for Keys:** Cache key in memory; prompt once per session.
3. **Multitap Generations:** Disable Generate until prior request resolves.
4. **Desktop-only Hovers:** Ensure every hover action has a tap equivalent.

---

## 14. Open UX Questions

1. Should the Skip-Script toggle appear _before_ or _after_ the auto-outline loads?
2. Do we preload sample prompts in Step 3 for users with no key?
3. Is Preview autoplay on download desirable or should we default to mute/paused?

_(Answers will guide micro-copy and layout tweaks.)_
