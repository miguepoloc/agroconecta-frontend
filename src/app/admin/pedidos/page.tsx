"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { mockOrders, formatCOP } from "@/lib/mock-data";
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

export default function AdminPedidosPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [typeFilter, setTypeFilter] = useState("todos");

  const filtered = mockOrders.filter((o) => {
    if (statusFilter !== "todos" && o.status !== statusFilter) return false;
    if (typeFilter !== "todos" && o.type !== typeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return o.orderNumber.toLowerCase().includes(q) || o.user.name.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <h1 className="font-epilogue font-bold text-2xl text-on-surface">Pedidos</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <Input
              placeholder="Buscar pedido o cliente…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              {Object.entries(STATUS_LABELS).map(([v, l]) => (
                <SelectItem key={v} value={v}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={(v) => v && setTypeFilter(v)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los tipos</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="institucional">Institucional</SelectItem>
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
                {["Pedido", "Cliente", "Tipo", "Productos", "Total", "Estado", "Fecha", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-on-surface">{order.orderNumber}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{order.user.name}</td>
                  <td className="px-4 py-3">
                    <Badge className={cn("text-xs border-0", order.type === "institucional"
                      ? "bg-primary-container text-on-primary-container"
                      : "bg-surface-container text-on-surface-variant"
                    )}>
                      {order.type === "institucional" ? "Institucional" : "Individual"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant text-xs max-w-[180px] truncate">
                    {order.items.map((i) => i.product.name).join(", ")}
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
                  <td className="px-4 py-3">
                    <Link href={`/admin/pedidos/${order.id}`} className="text-primary hover:text-primary/80">
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
