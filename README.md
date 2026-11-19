# React in Motion

Build a modern, premium, cinematic interactive React slide deck presentation for GROUP 8, based on the attached PowerPoint template (Blue and Black Modern Brand Marketing Presentation.pptx) and animation guidelines (6.1. SMOOTH ANIMATIONS AND TRANSITIONS).

Requirements:
1. Visual Identity & Styling:
- Adopt the deep blue and black modern tech aesthetic from the reference PowerPoint (dark slate/navy backgrounds #0A0F1D, glowing blue/cyan accents #2563EB/#38BDF8, clean typography, page numbers, and presentation badges).
- 16:9 widescreen format, sleek modern slide container with full-screen presenter mode, keyboard navigation (left/right arrows, space, fullscreen toggle, slide list picker, and progress bar).

2. Slide Structure (13 Slides):
- Slide 01: Title Slide — 'React Presentation' presented by GROUP 8.
- Slide 02: Presentation Overview & Agenda — React Event Systems, Component Architecture, Propagation, and Performance.
- Slide 03: React Synthetic Events — What they are, cross-browser wrapper, native vs React event comparison.
- Slide 04: Event Handling Pipeline — Step-by-step interactive 4-stage diagram (User Click → SyntheticEvent Layer → Handler Execution → State Dispatch → UI Update).
- Slide 05: Controlled vs. Uncontrolled Components — Explanations and single source of truth philosophy.
- Slide 06: Controlled vs. Uncontrolled Comparison Table — Clean, high-impact comparison table (Data source, state management, form validation, performance, use cases).
- Slide 07: Controlled Component Lifecycle Diagram — Minimalist 4-step loop diagram (Input typing → onChange trigger → useState update → re-render with value prop).
- Slide 08: Event Bubbling & Propagation — Capturing phase, bubbling phase, and e.stopPropagation().
- Slide 09: DOM Tree Bubbling Diagram — Minimalist hierarchical DOM diagram showing event propagation upwards with an interactive stopPropagation toggle.
- Slide 10: Debouncing in React — Concept, timing mechanics, and search input optimization.
- Slide 11: Throttling in React — Concept, execution intervals, and scroll event rate limiting.
- Slide 12: Debouncing vs. Throttling Comparison Table & Timeline Diagram — Minimalist timeline comparing rapid event bursts and execution timing between Debounce and Throttle, plus comparison table.
- Slide 13: Summary, Best Practices & Q&A — Key rules, cleanups, memory leaks, and closing slide for GROUP 8.

3. Animations & Interactive Controls:
- Smooth slide transitions (Fade, Slide/Push, Morph).
- Progressive step reveals: on slides with diagrams or multi-step lists, allow advancing step-by-step with space/arrow keys before moving to the next slide.
- Minimalist, easy-to-understand diagrams: clean block layouts, clear arrows, high contrast, uncluttered.
- Code animations with syntax highlighting and progressive line highlights for React hooks and props (onClick, onChange, onSubmit, value, useState).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f26861b6-747c-4f6d-8395-fa2274bd1335).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
