"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, AlertTriangle, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { mockFarmers, formatCOP } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const RANK_STYLES: Record<string, string> = {
  Gold: "bg-secondary-container text-on-secondary-container",
  Silver: "bg-surface-container-highest text-on-surface",
  Bronze: "bg-surface-container-high text-on-surface",
};

const COMPLIANCE_STYLES: Record<string, string> = {
  ACTIVE: "bg-primary-container text-on-primary-container",
  RENEWAL_NEEDED: "bg-error-container text-on-error-container",
  EXPIRED: "bg-error-container text-on-error-container",
};

export default function AdminAgricultoresPage() {
  const [search, setSearch] = useState("");
  const [complianceFilter, setComplianceFilter] = useState("todos");
  const [rankFilter, setRankFilter] = useState("todos");

  const filtered = mockFarmers.filter((f) => {
    if (complianceFilter !== "todos" && f.complianceStatus !== complianceFilter) return false;
    if (rankFilter !== "todos" && f.sustainabilityRank !== rankFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return f.name.toLowerCase().includes(q) || f.region.toLowerCase().includes(q) || f.department.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <h1 className="font-epilogue font-bold text-2xl text-on-surface">Agricultores</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <Input
              placeholder="Buscar agricultor o región…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={complianceFilter} onValueChange={(v) => v && setComplianceFilter(v)}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos compliance</SelectItem>
              <SelectItem value="ACTIVE">Activo</SelectItem>
              <SelectItem value="RENEWAL_NEEDED">Por renovar</SelectItem>
              <SelectItem value="EXPIRED">Expirado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={rankFilter} onValueChange={(v) => v && setRankFilter(v)}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los ranks</SelectItem>
              <SelectItem value="Gold">Gold</SelectItem>
              <SelectItem value="Silver">Silver</SelectItem>
              <SelectItem value="Bronze">Bronze</SelectItem>
            </SelectContent>
          </Select>
          <p className="flex items-center text-sm text-on-surface-variant">
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Table */}
        <div className="border border-outline-variant rounded-md overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-surface-container-low">
              <tr>
                {["Agricultor", "Región", "Productos", "Ventas", "Rank", "Compliance", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filtered.map((farmer) => (
                <tr key={farmer.id} className="hover:bg-surface-container/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={farmer.avatar} alt={farmer.name} />
                        <AvatarFallback className="bg-primary text-on-primary text-xs">
                          {farmer.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-on-surface">{farmer.name}</p>
                        <p className="text-[10px] text-on-surface-variant">{farmer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant text-xs">{farmer.region}, {farmer.department}</td>
                  <td className="px-4 py-3 font-semibold text-on-surface">{farmer.activeProducts}</td>
                  <td className="px-4 py-3 font-bold text-on-surface">{formatCOP(farmer.totalSales)}</td>
                  <td className="px-4 py-3">
                    <Badge className={cn("text-xs border-0", RANK_STYLES[farmer.sustainabilityRank])}>
                      {farmer.sustainabilityRank}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className={cn(
                      "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium",
                      COMPLIANCE_STYLES[farmer.complianceStatus]
                    )}>
                      {farmer.complianceStatus === "ACTIVE"
                        ? <CheckCircle className="w-3 h-3" />
                        : <AlertTriangle className="w-3 h-3" />
                      }
                      {farmer.complianceStatus === "ACTIVE" ? "Activo" : "Renovar"}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/agricultores/${farmer.id}`} className="text-primary hover:text-primary/80">
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
