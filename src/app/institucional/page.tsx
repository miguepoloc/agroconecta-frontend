"use client";

import Link from "next/link";
import { ShoppingBag, Package, FileText, TrendingUp, ChevronRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { mockOrders, mockProducts, formatCOP } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  entregado: "bg-primary-container text-on-primary-container",
  en_camino: "bg-secondary-container text-on-secondary-container",
  confirmado: "bg-surface-container-highest text-on-surface",
  pendiente: "bg-surface-container text-on-surface-variant",
  cancelado: "bg-error-container text-on-error-container",
};

const STATUS_LABELS: Record<string, string> = {
  entregado: "Entregado",
  en_camino: "En camino",
  confirmado: "Confirmado",
  pendiente: "Pendiente",
  cancelado: "Cancelado",
};

export default function InstitucionalPage() {
  const { user } = useAuth();
  const instOrders = mockOrders.filter((o) => o.type === "institucional");

  const kpis = [
    { label: "Pedidos este mes", value: instOrders.length, icon: ShoppingBag, sub: "2 activos" },
    { label: "Total invertido", value: formatCOP(instOrders.reduce((a, o) => a + o.total, 0)), icon: TrendingUp, sub: "en 2026" },
    { label: "Productos disponibles", value: mockProducts.length, icon: Package, sub: "con cert. institucional" },
    { label: "Licitaciones abiertas", value: "3", icon: FileText, sub: "PAE 2026" },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-epilogue font-bold text-2xl text-on-surface">
              Portal Institucional
            </h1>
            {user?.institutionName && (
              <p className="text-on-surface-variant text-sm mt-0.5">{user.institutionName} · NIT {user.nit}</p>
            )}
          </div>
          <Link
            href="/catalogo"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim font-semibold border-0 gap-2"
            )}
          >
            <ShoppingBag className="w-4 h-4" />
            Nuevo pedido
          </Link>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(({ label, value, icon: Icon, sub }) => (
            <div key={label} className="bg-surface-container-low border border-outline-variant rounded-md p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-on-surface-variant">{label}</p>
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <p className="font-epilogue font-bold text-xl text-on-surface">{value}</p>
              <p className="text-[10px] text-on-surface-variant">{sub}</p>
            </div>
          ))}
        </div>

        {/* Active orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-epilogue font-bold text-lg text-on-surface">Pedidos activos</h2>
            <Link href="#" className="text-xs text-primary hover:underline flex items-center gap-1">
              Ver todos <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="border border-outline-variant rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Pedido", "Productos", "Total", "Estado", "Entrega"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {instOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-mono text-xs font-semibold text-on-surface">{order.orderNumber}</p>
                      {order.purchaseOrderNumber && (
                        <p className="text-[10px] text-on-surface-variant">{order.purchaseOrderNumber}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant">
                      {order.items.map((i) => i.product.name).join(", ")}
                    </td>
                    <td className="px-4 py-3 font-bold text-on-surface">{formatCOP(order.total)}</td>
                    <td className="px-4 py-3">
                      <Badge className={cn("text-xs border-0", STATUS_STYLES[order.status])}>
                        {STATUS_LABELS[order.status]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant text-xs">{order.deliveryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Licitaciones */}
        <div>
          <h2 className="font-epilogue font-bold text-lg text-on-surface mb-4">Licitaciones abiertas — PAE 2026</h2>
          <div className="space-y-3">
            {[
              { title: "Suministro de verduras — Localidad Chapinero", valor: "$ 48.000.000", cierre: "15 Jun 2026" },
              { title: "Frutas temporada seca — Colegios Distritales", valor: "$ 120.000.000", cierre: "30 Jun 2026" },
              { title: "Tubérculos y hortalizas — Hospital Norte", valor: "$ 78.500.000", cierre: "20 Jul 2026" },
            ].map(({ title, valor, cierre }) => (
              <div key={title} className="bg-surface-container-low border border-outline-variant rounded-md p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-sm text-on-surface">{title}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Valor: {valor} · Cierre: {cierre}</p>
                </div>
                <a
                  href="#"
                  className="text-xs text-primary hover:underline flex items-center gap-1 shrink-0"
                >
                  Ver términos <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
