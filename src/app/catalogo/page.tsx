"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/product-card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { apiClient } from "@/lib/api-client";
import type { ProductCategory, Product } from "@/lib/types";
import { cn } from "@/lib/utils";

const CATEGORIES: ProductCategory[] = ["Verduras", "Frutas", "Granos", "Tubérculos", "Hortalizas", "Lácteos"];

const SORT_OPTIONS = [
  { value: "featured", label: "Destacados" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "freshness", label: "Más frescos" },
];

const LOT_OPTIONS = [
  { value: "any", label: "Cualquier lote" },
  { value: "50", label: "50 kg mínimo" },
  { value: "100", label: "100 kg mínimo" },
];

function CatalogoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await apiClient.get<Product[]>("/api/v1/products?page_size=100");
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const categoria = searchParams.get("categoria") as ProductCategory | null;
  const orden = searchParams.get("orden") ?? "featured";
  const lote = searchParams.get("lote") ?? "any";
  const cert = searchParams.get("cert");

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "any" && value !== "featured") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/catalogo?${params.toString()}`);
  }

  const filtered = useMemo(() => {
    let list = [...products];

    if (categoria) list = list.filter((p) => p.category === categoria);
    if (cert) list = list.filter((p) => p.certifications?.includes(cert as never));
    if (lote !== "any") list = list.filter((p) => p.minimumLot >= Number(lote));

    switch (orden) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "freshness":
        list.sort((a, b) => b.freshnessScore - a.freshnessScore);
        break;
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [products, categoria, cert, orden, lote]);

  const activeFilters = [
    categoria && { key: "categoria", label: categoria },
    cert && { key: "cert", label: cert },
    lote !== "any" && { key: "lote", label: `Mín. ${lote} kg` },
  ].filter(Boolean) as { key: string; label: string }[];

  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="bg-primary text-on-primary">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-secondary-container font-semibold text-sm uppercase tracking-widest mb-2">Catálogo</p>
          <h1 className="font-epilogue font-bold text-3xl lg:text-4xl">Productos del campo colombiano</h1>
          <p className="text-on-primary/70 mt-2 text-sm">Certificados · Frescos · Trazables</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filtros */}
          <aside className="w-full lg:w-56 shrink-0">
            <div className="lg:sticky lg:top-20 space-y-6">
              <div>
                <p className="font-epilogue font-semibold text-on-surface text-sm mb-3 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtros
                </p>

                {/* Categorías */}
                <div className="space-y-1">
                  <button
                    onClick={() => setParam("categoria", null)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                      !categoria
                        ? "bg-primary text-on-primary font-semibold"
                        : "text-on-surface-variant hover:bg-surface-container"
                    )}
                  >
                    Todas las categorías
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setParam("categoria", cat)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        categoria === cat
                          ? "bg-primary text-on-primary font-semibold"
                          : "text-on-surface-variant hover:bg-surface-container"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Lote mínimo */}
              <div>
                <p className="font-semibold text-on-surface text-sm mb-3">Lote mínimo</p>
                <div className="space-y-1">
                  {LOT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setParam("lote", opt.value)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        lote === opt.value
                          ? "bg-primary text-on-primary font-semibold"
                          : "text-on-surface-variant hover:bg-surface-container"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Certificaciones */}
              <div>
                <p className="font-semibold text-on-surface text-sm mb-3">Certificación</p>
                <div className="flex flex-wrap gap-2">
                  {["GlobalGAP", "FairTrade", "ICA", "INVIMA", "Orgánico"].map((c) => (
                    <Badge
                      key={c}
                      onClick={() => setParam("cert", cert === c ? null : c)}
                      className={cn(
                        "cursor-pointer border-0 text-xs font-medium transition-colors",
                        cert === c
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                      )}
                    >
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-on-surface-variant">
                  <span className="font-semibold text-on-surface">{filtered.length}</span> productos
                </span>
                {activeFilters.map((f) => (
                  <Badge
                    key={f.key}
                    className="bg-primary-container text-on-primary-container border-0 gap-1 text-xs cursor-pointer"
                    onClick={() => setParam(f.key, null)}
                  >
                    {f.label}
                    <X className="w-3 h-3" />
                  </Badge>
                ))}
                {activeFilters.length > 0 && (
                  <button
                    onClick={() => router.push("/catalogo")}
                    className="text-xs text-on-surface-variant hover:text-on-surface underline"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
              <Select value={orden} onValueChange={(v) => v && setParam("orden", v)}>
                <SelectTrigger className="w-52 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-xs">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4">
                  <SlidersHorizontal className="w-7 h-7 text-on-surface-variant" />
                </div>
                <h3 className="font-epilogue font-semibold text-on-surface mb-2">Sin resultados</h3>
                <p className="text-sm text-on-surface-variant mb-6">No encontramos productos con estos filtros.</p>
                <Button variant="outline" onClick={() => router.push("/catalogo")}>
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense>
      <CatalogoContent />
    </Suspense>
  );
}
