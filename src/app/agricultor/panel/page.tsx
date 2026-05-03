"use client";

import Link from "next/link";
import { AlertTriangle, CheckCircle, Star, TrendingUp, Package, ShoppingBag, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { FreshnessBadge } from "@/components/freshness-badge";
import { mockFarmers, mockOrders, mockProducts, formatCOP } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect } from "react";

const STATUS_STYLES: Record<string, string> = {
  entregado: "bg-primary-container text-on-primary-container",
  en_camino: "bg-secondary-container text-on-secondary-container",
  confirmado: "bg-surface-container-highest text-on-surface",
  pendiente: "bg-surface-container text-on-surface-variant",
};

const STATUS_LABELS: Record<string, string> = {
  entregado: "Entregado",
  en_camino: "En camino",
  confirmado: "Confirmado",
  pendiente: "Pendiente",
};

export default function PanelAgricultorPage() {
  const { user } = useAuth();
  const farmer = mockFarmers.find((f) => f.email === user?.email) ?? mockFarmers[0];
  const myProducts = mockProducts.filter((p) => p.farmerId === farmer.id);
  const myOrders = mockOrders.filter((o) => o.items.some((i) => i.product.farmerId === farmer.id));

  const totalRevenue = myOrders
    .filter((o) => o.status === "entregado")
    .reduce((acc, o) => {
      return acc + o.items
        .filter((i) => i.product.farmerId === farmer.id)
        .reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    }, 0);

  const renewalNeeded = farmer.certifications.filter((c) => c.status === "RENEWAL_NEEDED");

  useEffect(() => {
    if (renewalNeeded.length > 0) {
      setTimeout(() => {
        toast.warning(`${renewalNeeded.length} certificación(es) requieren renovación`, {
          description: renewalNeeded.map((c) => c.type).join(", "),
          duration: 6000,
        });
      }, 500);
    }
  }, []);

  const kpis = [
    { label: "Ingresos totales", value: formatCOP(totalRevenue), icon: TrendingUp, color: "text-primary" },
    { label: "Productos activos", value: myProducts.length, icon: Package, color: "text-primary" },
    { label: "Pedidos recibidos", value: myOrders.length, icon: ShoppingBag, color: "text-primary" },
    { label: "Rank sostenibilidad", value: farmer.sustainabilityRank, icon: Star, color: "text-secondary-container" },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h1 className="font-epilogue font-bold text-2xl text-on-surface">
              Hola, {farmer.name.split(" ")[0]}
            </h1>
            <p className="text-on-surface-variant text-sm mt-0.5">
              {farmer.region}, {farmer.department} · Desde {new Date(farmer.joinedDate).getFullYear()}
            </p>
          </div>
          {farmer.sustainabilityRank === "Gold" && (
            <Badge className="bg-secondary-container text-on-secondary-container border-0 text-sm font-bold px-3 py-1.5">
              <Star className="w-4 h-4 mr-1.5" />
              Gold Rank
            </Badge>
          )}
        </div>

        {/* Compliance alerts */}
        {renewalNeeded.length > 0 && (
          <div className="bg-error-container border border-error rounded-md p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-on-error-container text-sm">
                {renewalNeeded.length} certificación{renewalNeeded.length > 1 ? "es requieren" : " requiere"} renovación
              </p>
              <p className="text-on-error-container/70 text-xs mt-0.5">
                {renewalNeeded.map((c) => c.type).join(", ")} — Renueva antes de la fecha de vencimiento para mantener tu ranking Gold.
              </p>
            </div>
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-surface-container-low border border-outline-variant rounded-md p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-on-surface-variant">{label}</p>
                <Icon className={cn("w-4 h-4", color)} />
              </div>
              <p className={cn("font-epilogue font-bold text-xl", color === "text-secondary-container" ? "text-secondary-container" : "text-on-surface")}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <h2 className="font-epilogue font-bold text-lg text-on-surface mb-4">Estado de certificaciones</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {farmer.certifications.map((cert) => {
              const isOk = cert.status === "ACTIVE";
              return (
                <div
                  key={cert.type}
                  className={cn(
                    "border rounded-md p-4 flex items-center gap-3",
                    isOk ? "border-outline-variant" : "border-error bg-error-container/10"
                  )}
                >
                  {isOk
                    ? <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    : <AlertTriangle className="w-5 h-5 text-error shrink-0" />
                  }
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-on-surface">{cert.type}</p>
                    <p className="text-xs text-on-surface-variant">
                      Vence: {new Date(cert.expiryDate).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <Badge className={cn("text-xs border-0", isOk
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-error-container text-on-error-container"
                  )}>
                    {isOk ? "Activo" : "Renovar"}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* My products */}
        <div>
          <h2 className="font-epilogue font-bold text-lg text-on-surface mb-4">Mis productos activos</h2>
          <div className="space-y-3">
            {myProducts.map((product) => (
              <div key={product.id} className="bg-surface-container-low border border-outline-variant rounded-md p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm text-on-surface">{product.name}</p>
                    <Badge className="bg-surface-container text-on-surface-variant border-0 text-[10px]">{product.category}</Badge>
                  </div>
                  <p className="text-xs text-on-surface-variant font-mono mt-0.5">{product.lotNumber}</p>
                </div>
                <div className="w-28 shrink-0">
                  <FreshnessBadge score={product.freshnessScore} />
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-primary text-sm">{formatCOP(product.price)}/kg</p>
                  {product.inStock
                    ? <p className="text-[10px] text-primary">En stock</p>
                    : <p className="text-[10px] text-error">Sin stock</p>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        {myOrders.length > 0 && (
          <div>
            <h2 className="font-epilogue font-bold text-lg text-on-surface mb-4">Pedidos recientes</h2>
            <div className="border border-outline-variant rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-surface-container-low">
                  <tr>
                    {["Pedido", "Cliente", "Total", "Estado"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {myOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-surface-container/50">
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-on-surface">{order.orderNumber}</td>
                      <td className="px-4 py-3 text-on-surface-variant">{order.user.name}</td>
                      <td className="px-4 py-3 font-bold text-on-surface">{formatCOP(order.total)}</td>
                      <td className="px-4 py-3">
                        <Badge className={cn("text-xs border-0", STATUS_STYLES[order.status] ?? "bg-surface-container text-on-surface")}>
                          {STATUS_LABELS[order.status] ?? order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Impact */}
        <div className="bg-primary rounded-md p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center shrink-0">
            <Leaf className="w-6 h-6 text-secondary-container" />
          </div>
          <div>
            <p className="font-epilogue font-bold text-on-primary text-lg">
              {formatCOP(totalRevenue)} llegaron directamente a tu bolsillo
            </p>
            <p className="text-on-primary/70 text-sm">
              En AgroConecta, el 82% del precio final es tuyo. Sin intermediarios abusivos.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
