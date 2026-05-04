"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoppingCart, ChevronLeft, Package, Hash, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FarmerCard } from "@/components/farmer-card";
import { FreshnessBadge } from "@/components/freshness-badge";
import { TraceabilityTimeline } from "@/components/traceability-timeline";
import { ProductCard } from "@/components/product-card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useCart } from "@/lib/cart-context";
import { cn, formatCOP } from "@/lib/utils";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import type { Product } from "@/lib/types";

const certColors: Record<string, string> = {
  GlobalGAP: "bg-primary-container text-on-primary-container",
  FairTrade: "bg-tertiary-container text-on-tertiary-container",
  ICA: "bg-surface-container-highest text-on-surface",
  INVIMA: "bg-surface-container-highest text-on-surface",
  Orgánico: "bg-primary-container text-on-primary-container",
};

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await apiClient.get<Product>(`/api/v1/products/${slug}`);
        setProduct(data);
        setQuantity(data.minimumLot ?? 1);
        
        // Fetch related products in the same category
        try {
          const relatedData = await apiClient.get<Product[]>(`/api/v1/products?category=${data.category}&limit=4`);
          setRelated(relatedData.filter(p => p.id !== data.id).slice(0, 3));
        } catch (e) {
          console.error("Failed to fetch related products", e);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant font-medium">Cargando producto...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) notFound();

  function handleAddToCart() {
    addItem(product!, quantity);
    toast.success(`${product!.name} agregado al carrito (${quantity} kg)`);
  }

  const activeVolumePrice = product.volumePrices?.find((v) => {
    if (v.maxKg) return quantity >= v.minKg && quantity <= v.maxKg;
    return quantity >= v.minKg;
  });
  const activePrice = activeVolumePrice?.pricePerKg ?? product.price;

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-6">
          <Link href="/" className="hover:text-on-surface">Inicio</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/catalogo" className="hover:text-on-surface">Catálogo</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/catalogo?categoria=${product.category}`} className="hover:text-on-surface">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-on-surface font-medium truncate">{product.name}</span>
        </nav>

        <Link href="/catalogo" className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 mb-6 font-medium">
          <ChevronLeft className="w-4 h-4" />
          Volver al catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-md overflow-hidden bg-surface-container">
              <Image
                src={product.images[activeImage] ?? product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-3 left-3 right-3">
                <FreshnessBadge score={product.freshnessScore} />
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "relative w-20 h-20 rounded overflow-hidden border-2 transition-colors",
                      activeImage === i ? "border-primary" : "border-outline-variant"
                    )}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Purchase panel */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <Badge className="bg-surface-container text-on-surface-variant text-xs border-0">{product.category}</Badge>
                {(product.certifications || []).map((cert) => (
                  <Badge key={cert} className={cn("text-xs border-0", certColors[cert] ?? "bg-muted text-muted-foreground")}>
                    {cert}
                  </Badge>
                ))}
              </div>
              <h1 className="font-epilogue font-bold text-3xl text-on-surface mb-1">{product.name}</h1>
              <p className="text-sm text-on-surface-variant">{product.farmer?.region || "Región Andina"}, {product.farmer?.department || "Boyacá"}</p>
            </div>

            {/* Price */}
            <div className="bg-surface-container-low rounded-md p-4 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="font-epilogue font-bold text-3xl text-primary">{formatCOP(activePrice)}</span>
                <span className="text-on-surface-variant text-sm">/ kg</span>
              </div>
              {product.institutionalPrice && (
                <p className="text-xs text-on-surface-variant">
                  Precio institucional: <span className="font-semibold">{formatCOP(product.institutionalPrice)}/kg</span>
                </p>
              )}
            </div>

            {/* Volume prices */}
            {product.volumePrices && product.volumePrices.length > 1 && (
              <div>
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2">Precios por volumen</p>
                <div className="grid grid-cols-3 gap-2">
                  {product.volumePrices.map((vp) => (
                    <div
                      key={vp.label}
                      className={cn(
                        "rounded-md p-3 text-center border transition-colors",
                        activeVolumePrice?.label === vp.label
                          ? "border-primary bg-primary-container"
                          : "border-outline-variant bg-surface"
                      )}
                    >
                      <p className="text-xs text-on-surface-variant mb-0.5">{vp.label}</p>
                      <p className="font-bold text-sm text-on-surface">{formatCOP(vp.pricePerKg)}/kg</p>
                      <p className="text-[10px] text-on-surface-variant">
                        {vp.maxKg ? `${vp.minKg}–${vp.maxKg} kg` : `+${vp.minKg} kg`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2">
                Cantidad (mín. {product.minimumLot} kg)
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-outline-variant rounded-md overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(product.minimumLot, q - 10))}
                    className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="w-16 text-center text-sm font-semibold text-on-surface">{quantity} kg</span>
                  <button
                    onClick={() => setQuantity((q) => q + 10)}
                    className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors text-lg font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-on-surface-variant">
                  Total: <span className="font-bold text-on-surface">{formatCOP(activePrice * quantity)}</span>
                </span>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim font-bold h-12 gap-2"
              size="lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Agregar al carrito
            </Button>

            {/* Lot info */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <Hash className="w-3 h-3" /> Lote
                </div>
                <p className="text-xs font-mono font-semibold text-on-surface">{product.lotNumber}</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <Calendar className="w-3 h-3" /> Cosecha
                </div>
                <p className="text-xs font-semibold text-on-surface">
                  {new Date(product.harvestDate).toLocaleDateString("es-CO", { day: "numeric", month: "short" })}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <Package className="w-3 h-3" /> Mín.
                </div>
                <p className="text-xs font-semibold text-on-surface">{product.minimumLot} kg</p>
              </div>
            </div>

            <Link
              href={`/lote/${product.lotNumber}`}
              className="text-xs text-primary hover:text-primary/80 underline underline-offset-2"
            >
              Ver trazabilidad completa del lote →
            </Link>
          </div>
        </div>

        {/* Description */}
        <div className="grid lg:grid-cols-3 gap-10 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-epilogue font-bold text-xl text-on-surface mb-3">Descripción</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {/* Traceability */}
            <div>
              <h2 className="font-epilogue font-bold text-xl text-on-surface mb-4">Camino a tu mesa</h2>
              <TraceabilityTimeline steps={product.traceabilityChain || []} />
            </div>
          </div>

          {/* Farmer */}
          <div>
            <h2 className="font-epilogue font-bold text-xl text-on-surface mb-4">Productor</h2>
            {product.farmer && <FarmerCard farmer={product.farmer} variant="full" />}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-epilogue font-bold text-xl text-on-surface mb-6">Más en {product.category}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
