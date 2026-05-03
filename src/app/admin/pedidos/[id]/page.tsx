"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { mockOrders, formatCOP } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { OrderStatus } from "@/lib/types";

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

export default function AdminPedidoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = mockOrders.find((o) => o.id === id);
  const [status, setStatus] = useState(order?.status ?? "pendiente");

  if (!order) notFound();

  function handleStatusChange(newStatus: string) {
    setStatus(newStatus as OrderStatus);
    toast.success(`Estado actualizado a "${STATUS_LABELS[newStatus]}"`);
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/pedidos" className="text-primary hover:text-primary/80">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-epilogue font-bold text-xl text-on-surface">
            Pedido <span className="font-mono">{order.orderNumber}</span>
          </h1>
          <Badge className={cn("text-xs border-0 ml-auto", STATUS_STYLES[status])}>
            {STATUS_LABELS[status]}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order info */}
          <div className="bg-surface-container-low border border-outline-variant rounded-md p-5 space-y-4">
            <h2 className="font-epilogue font-semibold text-on-surface">Información del pedido</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Tipo</dt>
                <dd className="font-medium text-on-surface capitalize">{order.type}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Creado</dt>
                <dd className="text-on-surface">{new Date(order.createdAt).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Entrega estimada</dt>
                <dd className="text-on-surface">{order.deliveryDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Método de pago</dt>
                <dd className="text-on-surface uppercase">{order.paymentMethod}</dd>
              </div>
              {order.purchaseOrderNumber && (
                <div className="flex justify-between">
                  <dt className="text-on-surface-variant">Orden de compra</dt>
                  <dd className="font-mono text-on-surface">{order.purchaseOrderNumber}</dd>
                </div>
              )}
            </dl>

            <div className="pt-2 border-t border-outline-variant">
              <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2">Cambiar estado</p>
              <Select value={status} onValueChange={(v) => v && handleStatusChange(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_LABELS).map(([v, l]) => (
                    <SelectItem key={v} value={v}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Client info */}
          <div className="bg-surface-container-low border border-outline-variant rounded-md p-5 space-y-4">
            <h2 className="font-epilogue font-semibold text-on-surface">Cliente</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Nombre</dt>
                <dd className="font-medium text-on-surface">{order.user.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Correo</dt>
                <dd className="text-on-surface">{order.user.email}</dd>
              </div>
              {order.user.phone && (
                <div className="flex justify-between">
                  <dt className="text-on-surface-variant">Teléfono</dt>
                  <dd className="text-on-surface">{order.user.phone}</dd>
                </div>
              )}
            </dl>
            <div className="pt-2 border-t border-outline-variant space-y-1 text-sm">
              <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Dirección de entrega</p>
              <p className="text-on-surface">{order.deliveryAddress.street}</p>
              <p className="text-on-surface-variant">{order.deliveryAddress.city}, {order.deliveryAddress.department}</p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="border border-outline-variant rounded-md overflow-hidden">
          <div className="bg-surface-container-low px-5 py-3">
            <h2 className="font-epilogue font-semibold text-on-surface">Productos</h2>
          </div>
          <div className="divide-y divide-outline-variant">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 p-4">
                <div className="relative w-14 h-14 rounded shrink-0 overflow-hidden">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-on-surface">{item.product.name}</p>
                  <p className="text-xs text-on-surface-variant font-mono">{item.product.lotNumber}</p>
                  <p className="text-xs text-on-surface-variant">{item.product.farmer.name}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-on-surface text-sm">{formatCOP(item.unitPrice * item.quantity)}</p>
                  <p className="text-xs text-on-surface-variant">{item.quantity} kg × {formatCOP(item.unitPrice)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-surface-container-low px-5 py-3 flex justify-between items-center">
            <span className="text-sm text-on-surface-variant">
              Subtotal: {formatCOP(order.subtotal)} + Envío: {formatCOP(order.deliveryFee)}
            </span>
            <span className="font-epilogue font-bold text-on-surface">Total: {formatCOP(order.total)}</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
