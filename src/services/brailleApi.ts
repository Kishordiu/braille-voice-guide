/**
 * Braille recognition service layer.
 *
 * Currently returns simulated results so the UI is fully functional offline.
 * The function signatures are designed to map 1:1 onto a future FastAPI
 * backend (POST /analyze-frame, /analyze-image, /translate, /quality).
 */

export type QualityMetrics = {
  lighting: number;      // 0..1
  blur: number;          // 0..1 (1 = sharp)
  stability: number;     // 0..1
  distance: number;      // 0..1 (1 = ideal)
  alignment: number;     // 0..1
  brailleConfidence: number; // 0..1
};

export type BrailleDot = { row: number; col: number; cell: number };

export type FrameAnalysis = {
  quality: QualityMetrics;
  brailleDetected: boolean;
  dots: BrailleDot[];
};

export type RecognitionResult = {
  text: string;
  confidence: number; // 0..1
  quality: QualityMetrics;
};

const SAMPLE_TEXTS = [
  "Hello",
  "Welcome",
  "Education is for everyone",
  "Accessibility matters",
  "Reading opens worlds",
];

function jitter(base: number, spread = 0.1): number {
  return Math.max(0, Math.min(1, base + (Math.random() - 0.5) * spread));
}

function fakeQuality(seed = 0.8): QualityMetrics {
  return {
    lighting: jitter(seed),
    blur: jitter(seed),
    stability: jitter(seed),
    distance: jitter(seed),
    alignment: jitter(seed),
    brailleConfidence: jitter(seed),
  };
}

function fakeDots(): BrailleDot[] {
  const dots: BrailleDot[] = [];
  for (let c = 0; c < 6; c++) {
    for (let i = 0; i < 3; i++) {
      if (Math.random() > 0.45) {
        dots.push({ row: i, col: c * 2 + (Math.random() > 0.5 ? 0 : 1), cell: c });
      }
    }
  }
  return dots;
}

export async function analyzeFrame(_imageData: ImageData | null): Promise<FrameAnalysis> {
  await new Promise((r) => setTimeout(r, 120));
  const q = fakeQuality(0.78);
  return {
    quality: q,
    brailleDetected: q.brailleConfidence > 0.6,
    dots: fakeDots(),
  };
}

export async function analyzeUploadedImage(_file: File): Promise<RecognitionResult> {
  await new Promise((r) => setTimeout(r, 900));
  const q = fakeQuality(0.85);
  return {
    text: SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)],
    confidence: jitter(0.86, 0.15),
    quality: q,
  };
}

export async function translateBrailleDots(dots: BrailleDot[]): Promise<{ text: string; confidence: number }> {
  await new Promise((r) => setTimeout(r, 250));
  const idx = Math.min(SAMPLE_TEXTS.length - 1, Math.floor(dots.length / 4));
  return {
    text: SAMPLE_TEXTS[idx] ?? SAMPLE_TEXTS[0],
    confidence: jitter(0.84, 0.18),
  };
}

export async function checkImageQuality(_image: HTMLImageElement | HTMLVideoElement | null): Promise<QualityMetrics> {
  await new Promise((r) => setTimeout(r, 80));
  return fakeQuality(0.8);
}

export function sampleText(): string {
  return SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
}
