import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImpactBanner({ className }: { className?: string }) {
  return (
    <div className={cn("bg-secondary-container rounded-md p-4 flex items-start gap-4", className)}>
      <div className="bg-primary rounded-full p-2 shrink-0">
        <TrendingUp className="w-5 h-5 text-on-primary" />
      </div>
      <div>
        <p className="font-epilogue font-bold text-on-secondary-container text-lg leading-tight">
          82% va directo al agricultor
        </p>
        <p className="text-on-secondary-container/80 text-sm mt-0.5">
          AgroConecta retiene solo el 18% para cubrir logística y plataforma.
          Cada compra transforma vidas en el campo colombiano.
        </p>
      </div>
    </div>
  );
}
