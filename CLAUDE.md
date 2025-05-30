# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Core Project Directives

**Claude Code: Review & strictly follow these rules for ALL tasks in this project.**

### I. Core Principles

- **Goal First:** Understand task objective. Ask if unclear.
- **Context is Key:** Use all provided context (files, history, this doc).
- **Accuracy Paramount:** Code, explanations, and file ops MUST be correct.
- **Iterate & Confirm:** For complex tasks: plan -> implement step -> confirm/test -> proceed.
- **Safety Critical:** NO destructive ops (e.g., `rm -rf`, `git push --force`) without explicit, per-instance user confirmation. Cautious with file overwrites.
- **Clear Communication:** Briefly state plans. Explain complex parts concisely. Report errors clearly.

### II. Context & Memory

- **This Doc Governs:** These rules are primary.
- **@-Mentions:** Treat content of `@path/to/file` as direct, current context.
- **Conversation Flow:** Suggest `/compact` for long talks at logical breaks. Await `/clear` for new, unrelated tasks.
- **External URLs:** Fetch and use info from URLs I provide.

### III. Code Quality & Standards

- **Project Style:** Modern web standards, ES6+, semantic HTML5, mobile-first CSS. 2-space indent, camelCase vars, PascalCase components, max 120char lines. Framework: Vanilla JS or lightweight framework, zero external dependencies for core functionality.
- **Production Code:** Clean, readable, maintainable, efficient. NO placeholders/TODOs in final code. All imports present.
- **Mobile-First:** Touch targets ≥48px, responsive design, offline-capable with localStorage.
- **Testing:** If tests exist, ask to write/update for new logic/fixes. For TDD: tests first (confirm) -> code to pass (confirm).
- **Debugging:** Analyze error -> suggest specific fix & explain.

### IV. Workflow & Tools

- **Git:** After major changes, suggest commit with conventional message (e.g., `feat: add image generation`, `fix: mobile navigation`).
- **CLI/Bash:** Display non-trivial commands before execution. For web project: focus on build tools, local server, bundling.
- **File Ops:** Confirm paths/filenames. Follow project structure: `/scripts/`, `/img/`, `/vid/`, organized exports.
- **Browser Tools:** Leverage DevTools, localStorage inspection, mobile viewport testing.

### V. Planning & Interaction

- **Plan First (Complex Tasks):** Provide step-by-step Markdown plan -> await approval.
- **Clarify Ambiguity:** If request is unclear/broad, ask specific clarifying questions.
- **Scope Adherence:** Stick to MVP constraints (5 scenes max, hard cuts only, zero-backend).

### VI. Efficiency

- **Concise Responses:** Avoid unnecessary verbosity.
- **Focused Tool Use:** Use tools purposefully for the current step.

## Project Overview

Story Lab is an MVP web application that enables users to turn a one-sentence idea into a 1-5 shot storyboard and lightly-edited video in under 5 minutes. The application is designed to work entirely browser-side with zero backend requirements.

### Key Architecture Principles

- **Zero-Backend Design**: All functionality runs client-side with browser storage
- **Mobile-First UX**: Touch-friendly interface with 48px buttons and swipe navigation
- **Session-Based Keys**: API keys stored only in memory for the current session
- **4-Step Wizard Flow**: Idea → Script/Outline → Visuals → Cuts & Export

### Core Features

1. **Local Persistence**: Projects stored in browser localStorage with resume capability
2. **Script Toggle**: Optional scripting mode (default ON, can skip for "improv mode")
3. **Image Generation**: Inline generation with session keys or external URL fallback
4. **Image-to-Video**: Optional video generation from static images
5. **Style Consistency**: Global style reference with per-scene override capability
6. **Simple Cuts Editor**: Drag-to-reorder scenes with duration controls
7. **Download Bundle**: ZIP export with organized assets and preview HTML

### Technical Constraints

- Maximum 5 scenes per story (MVP limitation)
- Hard-cut transitions only (no complex timeline features)
- Browser storage limits enforced with cleanup prompts
- Session keys cleared on page reload
- Mobile viewport optimization required

### User Experience Guidelines

- **One Thing at a Time**: Each screen focuses on a single decision
- **Show the Path**: Persistent step indicator (1-4) with breadcrumb labels
- **Touch-First**: 48px minimum tap targets, swipe navigation support
- **Gentle Guardrails**: Friendly error messages, undo capability, autosave every 10s
- **No AI Jargon**: Avoid terms like "tokens", "rate limit", "payload"

### Target Personas

- Young Storyteller (10): School projects on Chromebook
- Trend Hopper (16): Quick meme videos on mobile
- Teacher Explainer (34): Educational content on desktop
- Indie Lore-Builder (50): Stylized content for further editing

### File Organization Patterns

When implementing, follow this structure:

- `/scripts/` - Generated story scripts
- `/img/` - Scene images (numbered: scene01.jpg, scene02.jpg, etc.)
- `/vid/` - Video clips (numbered: scene01.mp4, scene02.mp4, etc.)
- `storylab_preview.html` - Auto-playing sequence preview

### Error Handling Approach

- API timeouts: Retry options with simplified prompt suggestions
- Storage full: Alert with oldest project deletion options
- Policy blocks: Friendly prompts to edit content
- Offline mode: Disable generation features, show offline indicators
- Invalid prompts: Inline guidance without technical jargon

### Build Order Priority

1. Local Storage Core (create/save/load project JSON)
2. Wizard Skeleton (4 static steps with navigation)
3. Idea → Outline Engine (logline to structured outline)
4. Script Toggle (show/hide scripting interface)
5. Image Prompt Cards (generation or URL input)
6. Session Key Management (memory-only storage)
7. Simple Cuts Preview (drag-reorder, duration, HTML preview)
8. ZIP Export (organized asset bundling)
9. Error & Storage Guardrails (user-friendly warnings and recovery)

---

**Goal: Intelligent, helpful, safe, efficient coding partner for zero-backend story creation tool.**
