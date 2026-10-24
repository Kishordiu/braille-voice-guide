<div align="center">
  <img src="./assets/hero.png" alt="Braille Voice Guide — warm audio-tactile accessibility artwork" width="100%" />
</div>

<p align="center">
  <a href="https://diufoundry.online"><img alt="DIU Foundry" src="https://img.shields.io/badge/DIU_FOUNDRY-ACCESSIBILITY_LAB-241611?style=for-the-badge&logoColor=F2CC8F&labelColor=090504" /></a>
  <img alt="Interface" src="https://img.shields.io/badge/INTERFACE-AUDIO_TACTILE-E07A5F?style=for-the-badge&labelColor=090504" />
  <img alt="Voice feedback" src="https://img.shields.io/badge/VOICE-BROWSER_SPEECH-F2CC8F?style=for-the-badge&labelColor=090504" />
</p>

# Braille Voice Guide

**A tactile Braille learning interface with spoken feedback.**

Braille Voice Guide is an accessibility-focused learning prototype by DIU Foundry. It includes a camera preview, image upload, visual Braille-oriented components, and spoken feedback through the browser's SpeechSynthesis API.

> [!IMPORTANT]
> **Braille recognition is currently simulated.** The recognition service in `src/services/brailleApi.ts` returns sample text, confidence values, and quality metrics. It does not perform real Braille OCR yet. Do not use its output to read safety-critical text, medicine labels, signs, or real documents.

## What is implemented

- **Camera and upload workflow:** Uses browser camera permission or accepts an image upload.
- **Visual dot-pattern interface:** Demonstrates Braille-related layouts and learning interactions; it is not physical haptic output.
- **Spoken UI feedback:** Uses the browser SpeechSynthesis API. Available voices and behaviour vary by browser and device.
- **Simulated recognition flow:** Helps exercise the UI while a real Braille recognition model or service remains future work.

## Current processing path

```text
Camera preview / image upload
          │
          ▼
ScannerPanel.tsx
          │
          ▼
brailleApi.ts
(simulated recognition and quality metrics)
          │
          ├──► sample text / confidence / quality UI
          │
          └──► voiceService.ts
                browser SpeechSynthesis API
```

## Project structure

```text
src/
├── components/       Accessible controls, scanner and result panels
├── hooks/            Scanner simulation and voice-guide state
├── routes/           Learning, scanner and supporting pages
└── services/
    ├── brailleApi.ts     Simulated Braille recognition responses
    └── voiceService.ts   Browser text-to-speech wrapper
```

The repository includes a Cloudflare Vite plugin for deployment configuration, but that dependency alone does not confirm a production edge deployment or guarantee a performance level.

## Run locally

**Requirements:** Bun (recommended) or npm and a supported Node.js runtime.

```bash
git clone https://github.com/Kishordiu/braille-voice-guide.git
cd braille-voice-guide
bun install
bun run dev
```

Open the local URL printed by Vite. Camera access generally requires a secure context such as localhost or HTTPS and explicit browser permission.

## Status and accessibility boundary

**Status: interaction prototype, not validated assistive technology.** Real Braille recognition and user testing with Braille readers are needed before the project can be relied on to interpret real-world material. Treat the app as a demonstration of interface, visual learning, and spoken feedback rather than a dependable document reader.

---

<p align="center"><sub>DIU FOUNDRY · ACCESSIBILITY / PRODUCT / SYSTEMS</sub></p>
