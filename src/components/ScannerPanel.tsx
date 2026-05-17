import { useEffect, useRef, useState } from "react";
import { Camera, Square, Image as ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QualityBadge } from "@/components/QualityBadge";
import { ResultPanel } from "@/components/ResultPanel";
import { VoiceGuide } from "@/components/VoiceGuide";
import { useVoiceGuide } from "@/hooks/useVoiceGuide";
import { useScannerSimulation, statusLabel } from "@/hooks/useScannerSimulation";
import { analyzeUploadedImage, type QualityMetrics } from "@/services/brailleApi";

function avgQuality(q: QualityMetrics | null): number {
  if (!q) return 0;
  return (
    (q.lighting + q.blur + q.stability + q.distance + q.alignment + q.brailleConfidence) / 6
  );
}

export function ScannerPanel() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<{ text: string; confidence: number; quality: QualityMetrics } | null>(null);

  const voice = useVoiceGuide();

  const sim = useScannerSimulation({
    onStatus: (_s, cue) => {
      if (cue) voice.speak(cue);
    },
    onResult: (r) => {
      voice.speakResult(r.text);
    },
  });

  useEffect(() => () => stopCamera(), []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraOn(true);
      voice.speak("Camera started. Hold the Braille page in front of the camera.");
    } catch (err) {
      setCameraError("Camera not available. You can still upload a Braille image below.");
      voice.speak("Camera not available. Please upload an image instead.");
      console.warn(err);
    }
  };

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
  }

  const handleCapture = () => {
    sim.start();
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedUrl(url);
    setUploadResult(null);
    voice.speak("Image uploaded. Analyzing now.");
    const res = await analyzeUploadedImage(file);
    setUploadResult(res);
    voice.speakResult(res.text);
  };

  const liveResult = sim.result;
  const liveStatus = sim.status;
  const liveQuality = sim.quality;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      {/* Camera + controls */}
      <section className="space-y-4">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="aspect-video w-full bg-muted">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              playsInline
              muted
              aria-label="Live camera preview"
            />
            {!cameraOn && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
                <Camera className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">
                  {cameraError ?? "Start your camera to scan real Braille."}
                </p>
              </div>
            )}
            {cameraOn && (
              <>
                <div className="pointer-events-none absolute inset-6 rounded-xl border-2 border-dashed border-white/70 mix-blend-difference" />
                <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
                  {statusLabel(liveStatus)}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {!cameraOn ? (
            <Button onClick={startCamera} className="gap-2">
              <Camera className="h-4 w-4" /> Start camera
            </Button>
          ) : (
            <Button onClick={stopCamera} variant="outline" className="gap-2">
              <Square className="h-4 w-4" /> Stop camera
            </Button>
          )}
          <Button onClick={handleCapture} disabled={!cameraOn} className="gap-2" variant="default">
            <ImageIcon className="h-4 w-4" /> Capture frame
          </Button>
          <Button onClick={() => fileRef.current?.click()} variant="outline" className="gap-2">
            <Upload className="h-4 w-4" /> Upload image
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onUpload}
            aria-label="Upload Braille image"
          />
        </div>

        <VoiceGuide
          enabled={voice.enabled}
          onToggle={voice.toggle}
          onRepeat={voice.repeat}
          onStop={voice.stop}
        />

        {uploadedUrl && (
          <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
            <h3 className="text-sm font-semibold text-foreground">Uploaded image</h3>
            <img
              src={uploadedUrl}
              alt="Uploaded Braille page preview"
              className="mt-3 max-h-72 w-full rounded-xl object-contain"
            />
            {uploadResult && (
              <div className="mt-4">
                <ResultPanel
                  text={uploadResult.text}
                  confidence={uploadResult.confidence}
                  qualityScore={avgQuality(uploadResult.quality)}
                  onSpeak={() => voice.speakResult(uploadResult.text)}
                  onRescan={() => {
                    setUploadResult(null);
                    setUploadedUrl(null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                />
              </div>
            )}
          </div>
        )}
      </section>

      {/* Status + quality + result */}
      <aside className="space-y-4" aria-label="Scan status">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Scan status
          </p>
          <p className="mt-1 text-lg font-semibold text-foreground">{statusLabel(liveStatus)}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Image quality
          </p>
          <div className="mt-3 grid gap-2">
            <QualityBadge label="Lighting" value={liveQuality?.lighting ?? 0} />
            <QualityBadge label="Blur" value={liveQuality?.blur ?? 0} />
            <QualityBadge label="Stability" value={liveQuality?.stability ?? 0} />
            <QualityBadge label="Distance" value={liveQuality?.distance ?? 0} />
            <QualityBadge label="Alignment" value={liveQuality?.alignment ?? 0} />
            <QualityBadge label="Braille confidence" value={liveQuality?.brailleConfidence ?? 0} />
          </div>
        </div>

        {liveResult && (liveStatus === "result" || liveStatus === "low-confidence") && (
          <ResultPanel
            text={liveResult.text}
            confidence={liveResult.confidence}
            qualityScore={avgQuality(liveQuality)}
            onSpeak={() => voice.speakResult(liveResult.text)}
            onRescan={() => sim.reset()}
          />
        )}
      </aside>
    </div>
  );
}
