import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Printer, Package, Calendar, Hash, User, MapPin, ChevronRight, ShoppingCart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TraceabilityTimeline } from "@/components/traceability-timeline";
import { FarmerCard } from "@/components/farmer-card";
import { FreshnessBadge } from "@/components/freshness-badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { mockProducts, formatCOP } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const certColors: Record<string, string> = {
  GlobalGAP: "bg-primary-container text-on-primary-container",
  FairTrade: "bg-tertiary-container text-on-tertiary-container",
  ICA: "bg-surface-container-highest text-on-surface",
  INVIMA: "bg-surface-container-highest text-on-surface",
  Orgánico: "bg-primary-container text-on-primary-container",
};

export default function LotePage({ params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.lotNumber === params.id);

  if (!product) notFound();

  return (
    <>
      <Navbar />

      {/* Public banner */}
      <div className="bg-primary-container border-b border-outline-variant">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-on-primary-container">
          <Hash className="w-3.5 h-3.5" />
          Consulta pública de trazabilidad — Sin necesidad de cuenta
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-6">
          <Link href="/" className="hover:text-on-surface">Inicio</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-on-surface font-medium">Trazabilidad</span>
          <ChevronRight className="w-3 h-3" />
          <span className="font-mono text-on-surface">{product.lotNumber}</span>
        </nav>

        {/* Header card */}
        <div className="bg-primary text-on-primary rounded-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-on-primary/60 text-xs uppercase tracking-widest mb-1">Número de lote</p>
              <p className="font-mono font-bold text-2xl text-secondary-container tracking-wider">{product.lotNumber}</p>
            </div>
            <button
              onClick={() => typeof window !== "undefined" && window.print()}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "border-on-primary/30 text-on-primary hover:bg-on-primary/10 gap-2 print:hidden"
              )}
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </button>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-on-primary/60" />
              <span className="text-on-primary/80">Producto:</span>
              <span className="font-semibold">{product.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-on-primary/60" />
              <span className="text-on-primary/80">Cosecha:</span>
              <span className="font-semibold">
                {new Date(product.harvestDate).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-on-primary/60" />
              <span className="text-on-primary/80">Origen:</span>
              <span className="font-semibold">{product.farmer.region}, {product.farmer.department}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {/* Traceability chain */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-epilogue font-bold text-xl text-on-surface mb-5">Cadena de custodia</h2>
              <TraceabilityTimeline steps={product.traceabilityChain} />
            </div>

            <Separator />

            {/* Product info */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="relative aspect-square rounded-md overflow-hidden">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                <div className="absolute bottom-2 left-2 right-2">
                  <FreshnessBadge score={product.freshnessScore} />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-epilogue font-bold text-lg text-on-surface">{product.name}</h3>
                  <Badge className="mt-1 bg-surface-container text-on-surface-variant border-0 text-xs">{product.category}</Badge>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{product.description}</p>
                <div>
                  <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2">Certificaciones</p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.certifications.map((cert) => (
                      <Badge key={cert} className={cn("text-xs border-0 font-medium", certColors[cert] ?? "bg-muted text-muted-foreground")}>
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-1">Precio al público</p>
                  <span className="font-epilogue font-bold text-xl text-primary">{formatCOP(product.price)}</span>
                  <span className="text-xs text-on-surface-variant ml-1">/ kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Farmer + CTA */}
          <div className="space-y-5">
            <div>
              <h2 className="font-epilogue font-bold text-xl text-on-surface mb-4">Productor</h2>
              <FarmerCard farmer={product.farmer} variant="full" />
            </div>

            <div className="bg-surface-container-low border border-outline-variant rounded-md p-4 space-y-3">
              <p className="font-semibold text-sm text-on-surface">¿Te interesa este producto?</p>
              <p className="text-xs text-on-surface-variant">
                Puedes comprarlo directo en nuestro catálogo con trazabilidad garantizada.
              </p>
              <Link
                href={`/productos/${product.slug}`}
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "w-full bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim font-bold border-0 gap-2 justify-center"
                )}
              >
                <ShoppingCart className="w-4 h-4" />
                Comprar este producto
              </Link>
            </div>
          </div>
        </div>

        {/* Verification footer */}
        <div className="bg-surface-container-low border border-outline-variant rounded-md p-4 text-center">
          <p className="text-xs text-on-surface-variant">
            Esta información es pública y verificable. Generada por AgroConecta SAS · NIT 901.234.567-8 ·{" "}
            <a href="mailto:trazabilidad@agroconecta.co" className="underline">trazabilidad@agroconecta.co</a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return mockProducts.map((p) => ({ id: p.lotNumber }));
}
