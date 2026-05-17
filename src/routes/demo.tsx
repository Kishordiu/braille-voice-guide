import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GradientRibbon } from "@/components/GradientRibbon";
import { ResultPanel } from "@/components/ResultPanel";
import { useVoiceGuide } from "@/hooks/useVoiceGuide";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Demo Mode — BrailleVision" },
      { name: "description", content: "Watch BrailleVision check lighting, blur, alignment, detect Braille dots, and speak the result." },
      { property: "og:title", content: "BrailleVision Demo" },
      { property: "og:description", content: "A judge-ready demo of the camera-powered Braille pipeline with voice guidance." },
    ],
  }),
  component: DemoPage,
});

const STEPS = [
  { key: "lighting", label: "Checking lighting", cue: "Lighting looks good." },
  { key: "blur", label: "Checking blur", cue: "Camera is steady." },
  { key: "alignment", label: "Checking alignment", cue: "Braille page is centered." },
  { key: "detect", label: "Detecting Braille dots", cue: "Braille dots detected." },
  { key: "map", label: "Mapping Braille cells", cue: "Mapping cells to characters." },
  { key: "translate", label: "Translating to English", cue: "Translating Braille to English." },
  { key: "speak", label: "Speaking result", cue: "Result ready." },
] as const;

const SAMPLES = ["Hello", "Welcome", "Education is for everyone", "Accessibility matters"];

function DemoPage() {
  const voice = useVoiceGuide();
  const [running, setRunning] = useState(false);
  const [current, setCurrent] = useState(-1);
  const [done, setDone] = useState(false);
  const [text, setText] = useState<string>("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  const start = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(true);
    setDone(false);
    setCurrent(-1);
    const sampleText = SAMPLES[Math.floor(Math.random() * SAMPLES.length)];
    setText(sampleText);

    STEPS.forEach((step, i) => {
      const t = setTimeout(() => {
        setCurrent(i);
        voice.speak(step.cue);
        if (i === STEPS.length - 1) {
          const t2 = setTimeout(() => {
            voice.speakResult(sampleText);
            setDone(true);
            setRunning(false);
          }, 700);
          timers.current.push(t2);
        }
      }, i * 1300 + 400);
      timers.current.push(t);
    });
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    voice.stop();
    setRunning(false);
    setCurrent(-1);
    setDone(false);
    setText("");
  };

  const progress = current < 0 ? 0 : ((current + (done ? 1 : 0.6)) / STEPS.length) * 100;

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-10 pt-12">
        <GradientRibbon />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Demo Mode</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Watch the full pipeline in action
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            A scripted, voice-guided run through every stage — perfect for a hackathon walkthrough.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={start} disabled={running} size="lg" className="gap-2">
              <Play className="h-4 w-4" /> {done ? "Run again" : "Start demo"}
            </Button>
            <Button onClick={reset} variant="outline" size="lg" className="gap-2">
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Pipeline progress
              </p>
              <p className="text-xs font-mono text-muted-foreground">{Math.round(progress)}%</p>
            </div>
            <Progress value={progress} className="mt-3" />
            <ol className="mt-5 space-y-2">
              {STEPS.map((s, i) => {
                const state = i < current ? "done" : i === current ? "active" : "pending";
                return (
                  <li
                    key={s.key}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors ${
                      state === "done"
                        ? "border-success/30 bg-success/10 text-foreground"
                        : state === "active"
                        ? "border-primary/40 bg-accent text-foreground"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                          state === "done"
                            ? "bg-success text-success-foreground"
                            : state === "active"
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </span>
                      {s.label}
                    </span>
                    {state === "active" && (
                      <span className="text-xs font-semibold uppercase text-primary">Running</span>
                    )}
                    {state === "done" && (
                      <span className="text-xs font-semibold uppercase text-success">Done</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {done && text && (
            <ResultPanel
              text={text}
              confidence={0.94}
              qualityScore={0.92}
              onSpeak={() => voice.speakResult(text)}
              onRescan={start}
            />
          )}

          <p className="text-center text-sm text-muted-foreground">
            Want to try with a real camera?{" "}
            <Link to="/scanner" className="font-semibold text-primary hover:underline">
              Open the scanner
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
