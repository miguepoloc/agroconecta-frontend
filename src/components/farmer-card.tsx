import { MapPin, Star, AlertTriangle, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Farmer } from "@/lib/types";

const rankConfig = {
  Bronze: { label: "Bronze", class: "bg-surface-container-high text-on-surface" },
  Silver: { label: "Silver", class: "bg-surface-container-highest text-on-surface" },
  Gold: { label: "Gold ⭐", class: "bg-secondary-container text-on-secondary-container" },
};

const complianceConfig = {
  ACTIVE: { label: "Activo", icon: CheckCircle, class: "bg-primary-container text-on-primary-container" },
  RENEWAL_NEEDED: { label: "Renovar", icon: AlertTriangle, class: "bg-secondary-container text-on-secondary-container" },
  EXPIRED: { label: "Expirado", icon: AlertTriangle, class: "bg-error-container text-on-error-container" },
};

interface FarmerCardProps {
  farmer: Farmer;
  variant?: "compact" | "full";
  className?: string;
}

export function FarmerCard({ farmer, variant = "compact", className }: FarmerCardProps) {
  const farmerName = farmer?.name || "Agricultor";
  const avatarText = farmerName.slice(0, 2).toUpperCase();
  const farmerQuote = farmer?.quote || "Trabajando por un campo más sostenible y justo.";
  
  const rankKey = farmer?.sustainabilityRank 
    ? (farmer.sustainabilityRank.charAt(0).toUpperCase() + farmer.sustainabilityRank.slice(1).toLowerCase()) 
    : "Bronze";
  const rank = rankConfig[rankKey as keyof typeof rankConfig] || rankConfig.Bronze;

  const complianceKey = farmer?.complianceStatus ? farmer.complianceStatus.toUpperCase() : "ACTIVE";
  const compliance = complianceConfig[complianceKey as keyof typeof complianceConfig] || complianceConfig.ACTIVE;
  const ComplianceIcon = compliance.icon;

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <Avatar className="w-10 h-10">
          <AvatarImage src={farmer?.avatar} alt={farmerName} />
          <AvatarFallback className="bg-primary text-on-primary text-xs">
            {avatarText}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-medium text-sm text-on-surface truncate">{farmerName}</p>
          <div className="flex items-center gap-1 text-xs text-on-surface-variant">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{farmer?.region || "Región Andina"}, {farmer?.department || "Boyacá"}</span>
          </div>
        </div>
        <Badge className={cn("shrink-0 text-xs border-0", rank.class)}>
          {rank.label}
        </Badge>
      </div>
    );
  }

  return (
    <div className={cn("bg-surface-container-low rounded-md p-5 space-y-4", className)}>
      <div className="flex items-start gap-4">
        <Avatar className="w-16 h-16 shrink-0">
          <AvatarImage src={farmer?.avatar} alt={farmerName} />
          <AvatarFallback className="bg-primary text-on-primary text-lg">
            {avatarText}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-epilogue font-semibold text-on-surface">{farmerName}</h3>
              <div className="flex items-center gap-1 text-sm text-on-surface-variant mt-0.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {farmer?.region || "Región Andina"}, {farmer?.department || "Boyacá"}
              </div>
            </div>
            <Badge className={cn("text-xs border-0 shrink-0", rank.class)}>
              <Star className="w-3 h-3 mr-1" />
              {rank.label}
            </Badge>
          </div>
        </div>
      </div>

      <blockquote className="text-sm text-on-surface-variant italic border-l-2 border-primary pl-3">
        "{farmerQuote}"
      </blockquote>

      <p className="text-sm text-on-surface leading-relaxed">{farmer?.bio || "Productor verificado de AgroConecta."}</p>

      {/* Certifications */}
      <div className="flex flex-wrap gap-2">
        {(farmer?.certifications || []).map((cert) => {
          const certCompliance = complianceConfig[cert.status.toUpperCase() as keyof typeof complianceConfig] || complianceConfig.ACTIVE;
          const CertIcon = certCompliance.icon;
          return (
            <span
              key={cert.type}
              className={cn("inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium", certCompliance.class)}
            >
              <CertIcon className="w-3 h-3" />
              {cert.type}
            </span>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-outline-variant">
        <div>
          <p className="text-xs text-on-surface-variant">Productos activos</p>
          <p className="font-semibold text-on-surface">{farmer?.activeProducts || 0}</p>
        </div>
        <div>
          <p className="text-xs text-on-surface-variant">Compliance</p>
          <div className={cn("inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium", compliance.class)}>
            <ComplianceIcon className="w-3 h-3" />
            {compliance.label}
          </div>
        </div>
      </div>
    </div>
  );
}
