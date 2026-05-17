
# BrailleVision Assistive Scanner — Build Plan

A premium Stripe-style multi-page assistive tech web app: real-time Braille scanning via camera/upload, voice-guided capture assistance, English text + speech output. All recognition is simulated (API-ready) for now.

## Routes (TanStack Start file-based routing)

- `src/routes/index.tsx` — Home (hero, problem/solution, innovation teaser, architecture teaser, trust row, CTA)
- `src/routes/scanner.tsx` — Live camera scanner + upload mode
- `src/routes/demo.tsx` — Animated judge-ready demo flow
- `src/routes/innovation.tsx` — Voice-first guidance differentiators
- `src/routes/architecture.tsx` — Pipeline diagram + tech explanation
- `src/routes/about.tsx` — Mission, use cases, author credit
- `__root.tsx` — wraps Navbar + Outlet + Footer, sets global SEO defaults; each route adds its own `head()` meta

## Components (`src/components/`)

Navbar, Hero, GradientRibbon (abstract SVG/CSS gradient shapes), FeatureCard, TrustRow, ScannerPanel, CameraView, UploadPanel, VoiceGuide (toggle + repeat + stop), QualityBadge, ResultPanel, ArchitectureFlow, DemoPlayer, Footer, SectionHeading.

## Services & hooks

- `src/services/voiceService.ts` — wraps `window.speechSynthesis`: `speak()`, `stopSpeaking()`, `repeatLastMessage()`, `speakResult()`, voice enable/disable, last-message memory.
- `src/services/brailleApi.ts` — async simulated functions returning typed results, structured so a real FastAPI backend can drop in:
  - `analyzeFrame(imageData)` → `{ quality, brailleDetected, dots }`
  - `analyzeUploadedImage(file)` → `{ text, confidence, quality }`
  - `translateBrailleDots(dots)` → `{ text, confidence }`
  - `checkImageQuality(image)` → `{ lighting, blur, stability, distance, alignment, brailleConfidence }`
- `src/hooks/useVoiceGuide.ts` — toggle state, speaks status changes, debounces repeats.
- `src/hooks/useScannerSimulation.ts` — state machine: `idle → waiting → checking-lighting → checking-blur → checking-alignment → detecting → translating → result | low-confidence`; emits voice cues on transitions.

## Scanner behavior

- Uses `navigator.mediaDevices.getUserMedia({ video: true })` for live preview (graceful fallback if denied).
- Start / Stop / Capture / Upload buttons; voice toggle; repeat; stop voice.
- Quality badges (Lighting, Blur, Stability, Distance, Alignment, Braille confidence) update via simulated logic on an interval while scanning.
- Result panel: recognized text, confidence %, quality score, Speak / Copy / Download (.txt) / Rescan. Low-confidence warning banner.

## Demo mode

Scripted timeline animating each pipeline step with progress + voice narration, ending in a sample result (rotating through "Hello", "Welcome", "Education is for everyone", "Accessibility matters").

## Design system (Stripe-inspired, original)

Tokens added to `src/styles.css` (oklch only, no hardcoded colors in components):
- Background: near-white `#fafafa`-equivalent; surface white
- Foreground: deep navy
- Primary: vivid purple (CTA)
- Accent: blue + violet
- Gradient ribbons: pink→orange→purple→blue (CSS `linear-gradient` + blurred SVG blobs behind hero)
- Soft borders, soft shadows, generous spacing, rounded-2xl cards
- Typography: large bold display headings, comfortable body, strong contrast

Navbar lives inside a white rounded "card" pill with subtle shadow at top of page.

## Accessibility

ARIA labels on all icon buttons, visible focus rings, large tap targets (≥44px), semantic landmarks (single `<main>` per route), high contrast, voice-first flow toggle persists in localStorage.

## Footer

Plain text: © 2026 K. Kishor Kumar. All rights reserved. / Concept, design, and implementation by K. Kishor Kumar. / Built for BrailleVision Hackathon 2026. No Lovable or template credits.

## SEO

Per-route `head()` with unique title + description + og tags. Single H1 per page. Semantic HTML throughout.

## Out of scope (now)

- Real Braille CV model — all detection is realistic simulation behind the service layer, ready to swap for FastAPI calls.
- Backend / auth / database.

## Deliverable

A polished, responsive, voice-enabled, multi-route React app ready to demo, with the architecture in place to plug in a real recognition backend later.
