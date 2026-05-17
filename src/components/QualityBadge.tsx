import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type Props = {
  label: string;
  value: number; // 0..1
};

function tone(v: number) {
  if (v >= 0.75) return { color: "text-success", Icon: CheckCircle2, ring: "border-success/30 bg-success/10" };
  if (v >= 0.5) return { color: "text-warning-foreground", Icon: AlertTriangle, ring: "border-warning/40 bg-warning/15" };
  return { color: "text-destructive", Icon: XCircle, ring: "border-destructive/30 bg-destructive/10" };
}

export function QualityBadge({ label, value }: Props) {
  const { color, Icon, ring } = tone(value);
  const pct = Math.round(value * 100);
  return (
    <div className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 ${ring}`}>
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${color}`} aria-hidden="true" />
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <span className={`text-xs font-semibold tabular-nums ${color}`}>{pct}%</span>
    </div>
  );
}
