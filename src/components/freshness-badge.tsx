import { cn } from "@/lib/utils";

interface FreshnessBadgeProps {
  score: number;
  className?: string;
}

function getFreshnessLabel(score: number) {
  if (score >= 95) return "Recién cosechado";
  if (score >= 85) return "Muy fresco";
  if (score >= 70) return "Fresco";
  return "Pronto a vencer";
}

function getFreshnessColor(score: number) {
  if (score >= 85) return "text-primary";
  if (score >= 70) return "text-secondary";
  return "text-error";
}

export function FreshnessBadge({ score, className }: FreshnessBadgeProps) {
  const label = getFreshnessLabel(score);
  const color = getFreshnessColor(score);

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className={cn("font-semibold", color)}>{label}</span>
        <span className="text-on-surface-variant">{score}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-surface-container-highest overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${score}%`,
            background:
              score >= 85
                ? "linear-gradient(to right, #a5d0b9, #012d1d)"
                : score >= 70
                ? "#ffb702"
                : "#ba1a1a",
          }}
        />
      </div>
    </div>
  );
}
