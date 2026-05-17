import { Copy, Download, Volume2, RotateCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  text: string;
  confidence: number;
  qualityScore: number;
  onSpeak: () => void;
  onRescan: () => void;
};

export function ResultPanel({ text, confidence, qualityScore, onSpeak, onRescan }: Props) {
  const low = confidence < 0.65;
  const pct = Math.round(confidence * 100);
  const qPct = Math.round(qualityScore * 100);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
  };

  const download = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "braillevision-result.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      aria-labelledby="result-heading"
      className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 id="result-heading" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Recognized text
        </h3>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-accent px-2 py-1 font-semibold text-accent-foreground">
            {pct}% confidence
          </span>
          <span className="rounded-full bg-muted px-2 py-1 font-semibold text-foreground">
            Quality {qPct}%
          </span>
        </div>
      </div>

      <p className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">"{text}"</p>

      {low && (
        <div role="alert" className="mt-4 flex gap-3 rounded-xl border border-warning/40 bg-warning/15 p-3 text-sm">
          <AlertTriangle className="mt-0.5 h-4 w-4 text-warning-foreground" aria-hidden="true" />
          <p className="text-warning-foreground">
            Result may not be accurate. Please rescan with better lighting and a steady camera.
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <Button type="button" onClick={onSpeak} className="gap-2">
          <Volume2 className="h-4 w-4" /> Speak result
        </Button>
        <Button type="button" variant="outline" onClick={copy} className="gap-2">
          <Copy className="h-4 w-4" /> Copy text
        </Button>
        <Button type="button" variant="outline" onClick={download} className="gap-2">
          <Download className="h-4 w-4" /> Download
        </Button>
        <Button type="button" variant="outline" onClick={onRescan} className="gap-2">
          <RotateCcw className="h-4 w-4" /> Rescan
        </Button>
      </div>
    </section>
  );
}
