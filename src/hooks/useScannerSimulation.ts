import { useEffect, useRef, useState } from "react";
import { analyzeFrame, type QualityMetrics, sampleText } from "@/services/brailleApi";

export type ScannerStatus =
  | "idle"
  | "waiting"
  | "checking-lighting"
  | "checking-blur"
  | "checking-alignment"
  | "detecting"
  | "translating"
  | "result"
  | "low-confidence";

export type ScannerResult = { text: string; confidence: number };

const FLOW: ScannerStatus[] = [
  "waiting",
  "checking-lighting",
  "checking-blur",
  "checking-alignment",
  "detecting",
  "translating",
  "result",
];

export function statusLabel(s: ScannerStatus): string {
  switch (s) {
    case "idle": return "Idle";
    case "waiting": return "Waiting for camera";
    case "checking-lighting": return "Checking lighting";
    case "checking-blur": return "Checking blur";
    case "checking-alignment": return "Checking alignment";
    case "detecting": return "Braille dots detected";
    case "translating": return "Translating Braille";
    case "result": return "Result ready";
    case "low-confidence": return "Low confidence — please rescan";
  }
}

export function statusVoiceCue(s: ScannerStatus): string | null {
  switch (s) {
    case "waiting": return "Looking for Braille page.";
    case "checking-lighting": return "Checking lighting. Please stay in a well lit area.";
    case "checking-blur": return "Please hold the camera steady.";
    case "checking-alignment": return "Center the Braille page in the frame.";
    case "detecting": return "Braille dots detected. Reading now.";
    case "translating": return "Translating Braille to English.";
    case "result": return "Result ready. Speaking the detected text.";
    case "low-confidence": return "Confidence is low. Please rescan with better lighting.";
    default: return null;
  }
}

type Options = {
  onStatus?: (s: ScannerStatus, voiceCue: string | null) => void;
  onResult?: (r: ScannerResult, quality: QualityMetrics) => void;
};

export function useScannerSimulation(opts: Options = {}) {
  const [status, setStatus] = useState<ScannerStatus>("idle");
  const [quality, setQuality] = useState<QualityMetrics | null>(null);
  const [result, setResult] = useState<ScannerResult | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const optsRef = useRef(opts);
  optsRef.current = opts;

  const clear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => () => clear(), []);

  const start = () => {
    clear();
    setResult(null);
    let i = 0;
    const step = async () => {
      if (i >= FLOW.length) return;
      const s = FLOW[i];
      setStatus(s);
      optsRef.current.onStatus?.(s, statusVoiceCue(s));
      // refresh simulated quality
      const a = await analyzeFrame(null);
      setQuality(a.quality);
      if (s === "translating") {
        const confidence = 0.55 + Math.random() * 0.4;
        const r: ScannerResult = { text: sampleText(), confidence };
        setResult(r);
        const finalStatus: ScannerStatus = confidence < 0.65 ? "low-confidence" : "result";
        timerRef.current = setTimeout(() => {
          setStatus(finalStatus);
          optsRef.current.onStatus?.(finalStatus, statusVoiceCue(finalStatus));
          if (finalStatus === "result") optsRef.current.onResult?.(r, a.quality);
        }, 900);
        return;
      }
      i++;
      timerRef.current = setTimeout(step, 1100);
    };
    step();
  };

  const stop = () => {
    clear();
    setStatus("idle");
  };

  const reset = () => {
    clear();
    setStatus("idle");
    setResult(null);
    setQuality(null);
  };

  return { status, quality, result, start, stop, reset };
}
