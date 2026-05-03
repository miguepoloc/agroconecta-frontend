"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImpactBanner } from "@/components/impact-banner";
import { ProductCard } from "@/components/product-card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useCart } from "@/lib/cart-context";
import { mockProducts, formatCOP } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const DELIVERY_FEE = 15000;
const FREE_DELIVERY_THRESHOLD = 200000;

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();

  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;

  const suggested = mockProducts
    .filter((p) => !items.some((i) => i.productId === p.id) && p.featured)
    .slice(0, 3);

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-6">
            <ShoppingBag className="w-9 h-9 text-on-surface-variant" />
          </div>
          <h1 className="font-epilogue font-bold text-2xl text-on-surface mb-3">Tu carrito está vacío</h1>
          <p className="text-on-surface-variant text-sm mb-8 max-w-sm">
            Explora nuestro catálogo y agrega productos frescos directos del agricultor colombiano.
          </p>
          <Link href="/catalogo" className={cn(buttonVariants({ size: "lg" }), "bg-primary text-on-primary gap-2")}>
            Ir al catálogo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/catalogo" className="text-primary hover:text-primary/80 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-epilogue font-bold text-2xl text-on-surface">
            Carrito <span className="text-on-surface-variant font-normal text-lg">({items.length} {items.length === 1 ? "producto" : "productos"})</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 flex gap-4">
                <div className="relative w-24 h-24 rounded shrink-0 overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/productos/${item.product.slug}`}
                        className="font-epilogue font-semibold text-on-surface hover:text-primary transition-colors text-sm"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-on-surface-variant">{item.product.farmer.name} · {item.product.farmer.department}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-error hover:text-error/80 transition-colors shrink-0 p-1"
                      aria-label="Eliminar del carrito"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-outline-variant rounded-md overflow-hidden h-8">
                      <button
                        onClick={() => updateQuantity(item.productId, Math.max(item.product.minimumLot, item.quantity - 10))}
                        className="w-8 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors font-bold"
                      >
                        −
                      </button>
                      <span className="px-3 text-sm font-semibold text-on-surface">{item.quantity} kg</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 10)}
                        className="w-8 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors font-bold"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary text-sm">{formatCOP(item.product.price * item.quantity)}</p>
                      <p className="text-[10px] text-on-surface-variant">{formatCOP(item.product.price)}/kg</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="text-xs text-error hover:text-error/80 underline underline-offset-2"
              >
                Vaciar carrito
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="bg-surface-container-low border border-outline-variant rounded-md p-5 space-y-4">
              <h2 className="font-epilogue font-bold text-on-surface">Resumen del pedido</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} kg)</span>
                  <span className="text-on-surface font-medium">{formatCOP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Envío</span>
                  <span className={delivery === 0 ? "text-primary font-semibold" : "text-on-surface font-medium"}>
                    {delivery === 0 ? "GRATIS" : formatCOP(delivery)}
                  </span>
                </div>
                {subtotal < FREE_DELIVERY_THRESHOLD && (
                  <p className="text-[10px] text-on-surface-variant bg-primary-container/30 rounded px-2 py-1.5">
                    Agrega {formatCOP(FREE_DELIVERY_THRESHOLD - subtotal)} más para envío gratis
                  </p>
                )}
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-on-surface">
                <span>Total</span>
                <span className="text-xl text-primary">{formatCOP(total)}</span>
              </div>

              <Link
                href="/checkout"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim font-bold border-0 gap-2 justify-center"
                )}
              >
                Continuar al pago
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-[10px] text-on-surface-variant text-center">
                Pago seguro · SSL · Factura electrónica
              </p>
            </div>

            {/* Lote info */}
            <div className="bg-surface-container-low border border-outline-variant rounded-md p-4 space-y-2">
              <p className="text-xs font-semibold text-on-surface">Lotes en tu carrito</p>
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between text-xs text-on-surface-variant">
                  <span className="truncate pr-2">{item.product.name}</span>
                  <span className="font-mono shrink-0">{item.product.lotNumber}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ImpactBanner />

      {/* Suggested */}
      {suggested.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="font-epilogue font-bold text-xl text-on-surface mb-6">También te puede interesar</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {suggested.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
