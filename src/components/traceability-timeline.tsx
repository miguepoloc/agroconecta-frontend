import { Sprout, Package, Truck, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TraceabilityStep } from "@/lib/types";

const stageConfig = {
  cosecha: { icon: Sprout, label: "Cosecha", color: "bg-primary text-on-primary" },
  empaque: { icon: Package, label: "Empaque", color: "bg-primary-container text-on-primary-container" },
  envio: { icon: Truck, label: "Envío", color: "bg-primary-container text-on-primary-container" },
  llegada: { icon: MapPin, label: "Llegada", color: "bg-secondary-container text-on-secondary-container" },
};

interface TraceabilityTimelineProps {
  steps: TraceabilityStep[];
  className?: string;
  compact?: boolean;
}

export function TraceabilityTimeline({ steps, className, compact }: TraceabilityTimelineProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {steps.map((step, i) => {
        const config = stageConfig[step.stage];
        const Icon = config.icon;
        const isLast = i === steps.length - 1;

        return (
          <div key={step.stage} className="flex gap-4">
            {/* Icon + line */}
            <div className="flex flex-col items-center">
              <div className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0", config.color)}>
                <Icon className="w-4 h-4" />
              </div>
              {!isLast && <div className="w-0.5 flex-1 bg-outline-variant my-1 min-h-4" />}
            </div>

            {/* Content */}
            <div className={cn("pb-5", isLast && "pb-0")}>
              <p className="font-epilogue font-semibold text-on-surface text-sm">{config.label}</p>
              {!compact && (
                <>
                  <p className="text-xs text-on-surface-variant mt-0.5">{step.location}</p>
                  <p className="text-xs text-on-surface-variant">
                    {new Date(step.date).toLocaleDateString("es-CO", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                    {" · "}{step.responsible}
                  </p>
                  {step.notes && (
                    <p className="text-xs text-on-surface-variant/70 mt-1 italic">{step.notes}</p>
                  )}
                </>
              )}
              {compact && (
                <p className="text-xs text-on-surface-variant mt-0.5">{step.location}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
