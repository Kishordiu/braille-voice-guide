import { Camera, Image as ImageIcon, ArrowRight, Brain, Type, Volume2 } from "lucide-react";

const steps = [
  { icon: Camera, label: "Camera / Upload Image", note: "Capture a Braille page" },
  { icon: ImageIcon, label: "Image Quality Check", note: "Lighting, blur, alignment" },
  { icon: Brain, label: "Braille Dot Detection", note: "Detect raised dots" },
  { icon: Type, label: "Braille Cell Mapping", note: "Group into characters" },
  { icon: ArrowRight, label: "English Text", note: "Convert to readable text" },
  { icon: Volume2, label: "Speech Output", note: "Speak the result" },
];

export function ArchitectureFlow() {
  return (
    <ol className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
      {steps.map((s, i) => (
        <li
          key={s.label}
          className="relative rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground">
              {i + 1}
            </span>
            Step
          </div>
          <s.icon className="mt-3 h-5 w-5 text-primary" aria-hidden="true" />
          <h3 className="mt-2 text-sm font-semibold text-foreground">{s.label}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
        </li>
      ))}
    </ol>
  );
}
