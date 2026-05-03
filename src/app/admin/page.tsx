"use client";

import Link from "next/link";
import { ShoppingBag, Users, TrendingUp, Package, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { mockOrders, mockFarmers, mockProducts, formatCOP } from "@/lib/mock-data";
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

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May"];
const CHART_DATA = [38, 52, 61, 47, 78];

export default function AdminPage() {
  const totalRevenue = mockOrders.reduce((acc, o) => acc + o.total, 0);
  const activeOrders = mockOrders.filter((o) => o.status !== "entregado" && o.status !== "cancelado").length;
  const activeCompliance = mockFarmers.filter((f) => f.complianceStatus === "ACTIVE").length;

  const kpis = [
    { label: "Ingresos totales", value: formatCOP(totalRevenue), icon: TrendingUp, sub: "+12% vs mes anterior" },
    { label: "Pedidos activos", value: activeOrders, icon: ShoppingBag, sub: `de ${mockOrders.length} totales` },
    { label: "Agricultores", value: mockFarmers.length, icon: Users, sub: `${activeCompliance} compliance ACTIVE` },
    { label: "Productos", value: mockProducts.length, icon: Package, sub: `${mockProducts.filter((p) => p.inStock).length} en stock` },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="font-epilogue font-bold text-2xl text-on-surface">Panel de administración</h1>
          <p className="text-on-surface-variant text-sm mt-0.5">Mayo 2026 · AgroConecta SAS</p>
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* CSS chart */}
          <div className="lg:col-span-2 bg-surface-container-low border border-outline-variant rounded-md p-5">
            <h2 className="font-epilogue font-bold text-on-surface mb-5">Ventas 2026</h2>
            <div className="flex items-end gap-3 h-36">
              {CHART_DATA.map((v, i) => {
                const pct = (v / Math.max(...CHART_DATA)) * 100;
                return (
                  <div key={MONTHS[i]} className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-[10px] text-on-surface-variant font-semibold">{v}M</span>
                    <div
                      className="w-full rounded-t-sm bg-primary transition-all"
                      style={{ height: `${pct}%`, minHeight: "4px" }}
                    />
                    <span className="text-[10px] text-on-surface-variant">{MONTHS[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-surface-container-low border border-outline-variant rounded-md p-5 space-y-3">
            <h2 className="font-epilogue font-bold text-on-surface">Acceso rápido</h2>
            {[
              { href: "/admin/pedidos", label: "Gestionar pedidos", count: mockOrders.length },
              { href: "/admin/agricultores", label: "Gestionar agricultores", count: mockFarmers.length },
              { href: "/catalogo", label: "Ver catálogo público", count: mockProducts.length },
            ].map(({ href, label, count }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between p-3 rounded-md hover:bg-surface-container transition-colors group"
              >
                <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">{label}</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-surface-container text-on-surface-variant border-0 text-xs">{count}</Badge>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-epilogue font-bold text-lg text-on-surface">Pedidos recientes</h2>
            <Link href="/admin/pedidos" className="text-xs text-primary hover:underline flex items-center gap-1">
              Ver todos <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="border border-outline-variant rounded-md overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Pedido", "Cliente", "Tipo", "Total", "Estado", "Fecha"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {mockOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/admin/pedidos/${order.id}`} className="font-mono text-xs font-semibold text-primary hover:underline">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant">{order.user.name}</td>
                    <td className="px-4 py-3">
                      <Badge className={cn("text-xs border-0", order.type === "institucional"
                        ? "bg-primary-container text-on-primary-container"
                        : "bg-surface-container text-on-surface-variant"
                      )}>
                        {order.type === "institucional" ? "Institucional" : "Individual"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-bold text-on-surface">{formatCOP(order.total)}</td>
                    <td className="px-4 py-3">
                      <Badge className={cn("text-xs border-0", STATUS_STYLES[order.status])}>
                        {STATUS_LABELS[order.status]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-on-surface-variant">
                      {new Date(order.createdAt).toLocaleDateString("es-CO", { day: "numeric", month: "short" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
