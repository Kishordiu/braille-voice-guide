import { Volume2, VolumeX, RotateCcw, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  enabled: boolean;
  onToggle: () => void;
  onRepeat: () => void;
  onStop: () => void;
};

export function VoiceGuide({ enabled, onToggle, onRepeat, onStop }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant={enabled ? "default" : "outline"}
        size="sm"
        onClick={onToggle}
        aria-pressed={enabled}
        aria-label={enabled ? "Disable voice guide" : "Enable voice guide"}
        className="gap-2"
      >
        {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        Voice guide {enabled ? "on" : "off"}
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={onRepeat} className="gap-2" aria-label="Repeat last voice instruction">
        <RotateCcw className="h-4 w-4" /> Repeat
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={onStop} className="gap-2" aria-label="Stop voice">
        <StopCircle className="h-4 w-4" /> Stop voice
      </Button>
    </div>
  );
}
