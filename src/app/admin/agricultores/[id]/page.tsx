"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { FarmerCard } from "@/components/farmer-card";
import { mockFarmers, mockProducts, formatCOP } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminAgricultorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const farmer = mockFarmers.find((f) => f.id === id);
  const [suspended, setSuspended] = useState(false);

  if (!farmer) notFound();

  const myProducts = mockProducts.filter((p) => p.farmerId === farmer.id);
  const renewalNeeded = farmer.certifications.filter((c) => c.status === "RENEWAL_NEEDED");

  function handleSuspend() {
    setSuspended(true);
    toast.error(`${farmer!.name} ha sido suspendido temporalmente.`);
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/agricultores" className="text-primary hover:text-primary/80">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-epilogue font-bold text-xl text-on-surface">{farmer.name}</h1>
          </div>
          <Dialog>
            <DialogTrigger>
              <Button variant="destructive" size="sm" disabled={suspended}>
                {suspended ? "Suspendido" : "Suspender agricultor"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>¿Suspender a {farmer.name}?</DialogTitle>
                <DialogDescription>
                  Esto ocultará sus productos del catálogo y bloqueará nuevos pedidos. Esta acción se puede revertir.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button variant="destructive" onClick={handleSuspend}>Confirmar suspensión</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Renewal alert */}
        {renewalNeeded.length > 0 && (
          <div className="bg-error-container border border-error rounded-md p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-on-error-container text-sm">
                Certificaciones por renovar: {renewalNeeded.map((c) => c.type).join(", ")}
              </p>
              <p className="text-on-error-container/70 text-xs mt-0.5">
                Comunícate con el agricultor para iniciar el proceso de renovación.
              </p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Full farmer card */}
          <FarmerCard farmer={farmer} variant="full" />

          {/* Stats */}
          <div className="space-y-4">
            <div className="bg-surface-container-low border border-outline-variant rounded-md p-5">
              <h2 className="font-epilogue font-semibold text-on-surface mb-4">Resumen financiero</h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-on-surface-variant">Ventas totales</dt>
                  <dd className="font-bold text-on-surface">{formatCOP(farmer.totalSales)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-on-surface-variant">Productos activos</dt>
                  <dd className="font-bold text-on-surface">{farmer.activeProducts}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-on-surface-variant">Miembro desde</dt>
                  <dd className="text-on-surface">{new Date(farmer.joinedDate).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-on-surface-variant">Rank</dt>
                  <dd>
                    <Badge className={cn("text-xs border-0", {
                      Gold: "bg-secondary-container text-on-secondary-container",
                      Silver: "bg-surface-container-highest text-on-surface",
                      Bronze: "bg-surface-container-high text-on-surface",
                    }[farmer.sustainabilityRank])}>
                      {farmer.sustainabilityRank}
                    </Badge>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Certifications */}
            <div className="bg-surface-container-low border border-outline-variant rounded-md p-5">
              <h2 className="font-epilogue font-semibold text-on-surface mb-4">Certificaciones</h2>
              <div className="space-y-2">
                {farmer.certifications.map((cert) => (
                  <div key={cert.type} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {cert.status === "ACTIVE"
                        ? <CheckCircle className="w-4 h-4 text-primary" />
                        : <AlertTriangle className="w-4 h-4 text-error" />
                      }
                      <span className="font-medium text-on-surface">{cert.type}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-on-surface-variant">
                        Vence: {new Date(cert.expiryDate).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        {myProducts.length > 0 && (
          <div>
            <h2 className="font-epilogue font-bold text-lg text-on-surface mb-4">Productos ({myProducts.length})</h2>
            <div className="border border-outline-variant rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-surface-container-low">
                  <tr>
                    {["Producto", "Lote", "Categoría", "Precio", "Frescura", "Stock"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {myProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-surface-container/50">
                      <td className="px-4 py-3 font-semibold text-on-surface">{p.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-on-surface-variant">{p.lotNumber}</td>
                      <td className="px-4 py-3 text-on-surface-variant">{p.category}</td>
                      <td className="px-4 py-3 font-bold text-primary">{formatCOP(p.price)}/kg</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-16 bg-surface-container-high rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${p.freshnessScore}%` }}
                            />
                          </div>
                          <span className="text-xs text-on-surface-variant">{p.freshnessScore}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={cn("text-xs border-0", p.inStock
                          ? "bg-primary-container text-on-primary-container"
                          : "bg-error-container text-on-error-container"
                        )}>
                          {p.inStock ? "En stock" : "Agotado"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
