import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, ShieldCheck, TrendingUp, Users, Package, Sprout, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { FarmerCard } from "@/components/farmer-card";
import { ImpactBanner } from "@/components/impact-banner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { mockProducts, mockFarmers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const featuredProducts = mockProducts.filter((p) => p.featured).slice(0, 3);
const featuredFarmers = mockFarmers.filter((f) => f.sustainabilityRank === "Gold").slice(0, 3);

const stats = [
  { label: "Agricultores activos", value: "1,240+", icon: Users },
  { label: "Productos certificados", value: "4,800+", icon: Package },
  { label: "Toneladas distribuidas", value: "18,500", icon: Leaf },
  { label: "Ingresos al agricultor", value: "82%", icon: TrendingUp },
];

const propositos = [
  {
    icon: ShieldCheck,
    title: "Trazabilidad total",
    description:
      "Cada producto lleva un número de lote que documenta su viaje desde la cosecha hasta tu mesa. Escanea, verifica, confía.",
  },
  {
    icon: TrendingUp,
    title: "Comercio justo",
    description:
      "El 82% del precio que pagas llega directo al agricultor. Sin intermediarios que se queden con el valor del trabajo campesino.",
  },
  {
    icon: Leaf,
    title: "Agricultura sostenible",
    description:
      "Solo trabajamos con productores certificados en GlobalGAP, FairTrade e ICA. El campo colombiano merece reconocimiento.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-primary text-on-primary overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary-container/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-primary-container/20 blur-2xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="mb-6 bg-secondary-container text-on-secondary-container border-0 font-semibold text-xs px-3 py-1">
              <Sprout className="w-3 h-3 mr-1.5" />
              Del campo a tu mesa — con trazabilidad total
            </Badge>
            <h1 className="font-epilogue font-bold text-4xl lg:text-6xl leading-tight mb-6">
              Alimentos frescos, <br />
              <span className="text-secondary-container">directo del agricultor</span>
              <br />colombiano.
            </h1>
            <p className="text-on-primary/70 text-lg leading-relaxed mb-8 max-w-lg">
              Conectamos productores certificados con compradores que valoran la frescura, la trazabilidad y el comercio justo. Sin
              intermediarios que no aportan valor.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/catalogo"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim font-bold text-base border-0 gap-2"
                )}
              >
                Explorar catálogo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/institucional"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-on-primary/30 text-on-primary hover:bg-on-primary/10 font-semibold text-base"
                )}
              >
                Soy institución
              </Link>
            </div>
          </div>

          {/* Hero image grid */}
          <div className="hidden lg:grid grid-cols-2 gap-3 h-[420px]">
            <Link
              href="/productos/papa-criolla-boyaca"
              className="relative rounded-md overflow-hidden row-span-2 block group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <Image
                src="/images/papa-criolla.png"
                alt="Papa criolla colombiana"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-epilogue font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Papa Criolla Boyacá
                </span>
              </div>
            </Link>
            <Link
              href="/productos/tomate-chonto-antioquia"
              className="relative rounded-md overflow-hidden block group cursor-pointer shadow-md hover:shadow-lg transition-all duration-500"
            >
              <Image
                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=80"
                alt="Tomate fresco"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-epilogue font-semibold text-base translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Tomate Chonto
                </span>
              </div>
            </Link>
            <Link
              href="/catalogo"
              className="relative rounded-md overflow-hidden block group cursor-pointer shadow-md hover:shadow-lg transition-all duration-500"
            >
              <Image
                src="https://images.unsplash.com/photo-1566842600175-97dca489844f?w=600&q=80"
                alt="Agricultor colombiano"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-epilogue font-semibold text-base translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Nuestros Agricultores
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-on-primary/10">
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-secondary-container/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-secondary-container" />
                </div>
                <div>
                  <p className="font-epilogue font-bold text-xl text-secondary-container">{value}</p>
                  <p className="text-xs text-on-primary/60">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Propósito ────────────────────────────────────────────────────── */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Nuestro propósito</p>
            <h2 className="font-epilogue font-bold text-3xl lg:text-4xl text-on-surface">
              Por qué AgroConecta
              <br />
              <span className="text-primary">existe</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {propositos.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-surface-container-low rounded-md p-6 space-y-4">
                <div className="w-11 h-11 rounded-md bg-primary-container flex items-center justify-center">
                  <Icon className="w-5 h-5 text-on-primary-container" />
                </div>
                <h3 className="font-epilogue font-semibold text-lg text-on-surface">{title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact banner ────────────────────────────────────────────────── */}
      <ImpactBanner />

      {/* ── Productos destacados ─────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Cosecha reciente</p>
              <h2 className="font-epilogue font-bold text-3xl text-on-surface">Productos destacados</h2>
            </div>
            <Link
              href="/catalogo"
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Ver catálogo completo
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/catalogo" className={cn(buttonVariants({ variant: "outline" }), "border-primary text-primary")}>
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Agricultores ─────────────────────────────────────────────────── */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Quiénes producen</p>
            <h2 className="font-epilogue font-bold text-3xl lg:text-4xl text-on-surface">
              Conoce a los agricultores
              <br />
              <span className="text-primary">detrás de tu comida</span>
            </h2>
            <p className="mt-4 text-on-surface-variant max-w-lg mx-auto text-sm leading-relaxed">
              Todos certificados. Todos comprometidos con la sostenibilidad. Todos colombianos.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredFarmers.map((farmer) => (
              <FarmerCard key={farmer.id} farmer={farmer} variant="full" />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Institucional ─────────────────────────────────────────────── */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-5 bg-secondary-container/20 text-secondary-container border-0 text-xs font-semibold px-3 py-1">
              Para instituciones y colegios
            </Badge>
            <h2 className="font-epilogue font-bold text-3xl lg:text-4xl text-on-primary mb-5">
              Compra institucional
              <br />
              con precios de mayorista
            </h2>
            <p className="text-on-primary/70 text-base leading-relaxed mb-8 max-w-lg">
              Hospitales, colegios del PAE, restaurantes y empresas de catering: accede a lotes mínimos de 50 kg, factura
              electrónica, certificados de trazabilidad y precios especiales.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/institucional"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim font-bold border-0 gap-2"
                )}
              >
                Portal institucional
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/registro?rol=institucion"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-on-primary/30 text-on-primary hover:bg-on-primary/10 font-semibold"
                )}
              >
                Registrar institución
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "50 kg", label: "Lote mínimo" },
              { value: "48h", label: "Entrega garantizada" },
              { value: "100%", label: "Certificado ICA/INVIMA" },
              { value: "24/7", label: "Soporte dedicado" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-on-primary/10 rounded-md p-5">
                <p className="font-epilogue font-bold text-2xl text-secondary-container mb-1">{value}</p>
                <p className="text-on-primary/70 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trazabilidad demo ────────────────────────────────────────────── */}
      <section className="bg-surface-container-lowest py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Transparencia total</p>
          <h2 className="font-epilogue font-bold text-3xl lg:text-4xl text-on-surface mb-4">Conoce el viaje de tu alimento</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto text-sm leading-relaxed mb-8">
            Cada lote tiene un número único que puedes consultar en cualquier momento. Desde cuándo se cosechó, quién lo empacó,
            cómo llegó a tu ciudad.
          </p>
          <Link
            href="/lote/LOT-2026-0501-PC"
            className={cn(buttonVariants({ size: "lg" }), "bg-primary text-on-primary hover:bg-primary/90 font-semibold gap-2")}
          >
            Ver ejemplo de trazabilidad
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── CTA Agricultores ─────────────────────────────────────────────── */}
      <section className="bg-secondary-container py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-epilogue font-bold text-2xl lg:text-3xl text-on-secondary-container mb-2">
              ¿Eres agricultor? Únete a la red.
            </h2>
            <p className="text-on-secondary-container/70 text-sm max-w-lg">
              Accede a compradores calificados, precios justos y soporte en certificaciones. Sin comisiones abusivas.
            </p>
          </div>
          <Link
            href="/registro?rol=agricultor"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-primary text-on-primary hover:bg-primary/90 font-bold border-0 gap-2 whitespace-nowrap shrink-0"
            )}
          >
            Registrarme como agricultor
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
