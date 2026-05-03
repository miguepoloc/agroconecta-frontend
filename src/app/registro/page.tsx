"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sprout, Building2, User, Tractor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Tab = "comprador" | "agricultor" | "institucion";

const TABS: { value: Tab; label: string; icon: React.ElementType }[] = [
  { value: "comprador", label: "Comprador", icon: User },
  { value: "agricultor", label: "Agricultor", icon: Tractor },
  { value: "institucion", label: "Institución", icon: Building2 },
];

function RegistroForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>((searchParams.get("rol") as Tab) ?? "comprador");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/login");
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left brand */}
      <div className="hidden lg:flex flex-col justify-between bg-primary text-on-primary p-12">
        <Link href="/" className="flex items-center gap-2">
          <Sprout className="w-6 h-6 text-secondary-container" />
          <span className="font-epilogue font-bold text-xl">
            Agro<span className="text-secondary-container">Conecta</span>
          </span>
        </Link>
        <div className="space-y-6">
          <div className="w-14 h-14 rounded-full bg-secondary-container/20 flex items-center justify-center">
            <Sprout className="w-7 h-7 text-secondary-container" />
          </div>
          <h2 className="font-epilogue font-bold text-3xl">Únete a la red del campo colombiano</h2>
          <ul className="space-y-3 text-on-primary/70 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-secondary-container font-bold mt-0.5">✓</span>
              Accede a productos frescos con trazabilidad total
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-container font-bold mt-0.5">✓</span>
              Conecta directamente con agricultores certificados
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-container font-bold mt-0.5">✓</span>
              Comercio justo — 82% al productor
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-container font-bold mt-0.5">✓</span>
              Factura electrónica y soporte certificaciones
            </li>
          </ul>
        </div>
        <p className="text-on-primary/40 text-xs">© 2026 AgroConecta SAS</p>
      </div>

      {/* Right form */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 bg-surface">
        <div className="max-w-sm w-full mx-auto">
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-primary" />
              <span className="font-epilogue font-bold text-lg text-primary">
                Agro<span className="text-secondary-container">Conecta</span>
              </span>
            </Link>
          </div>

          <h1 className="font-epilogue font-bold text-2xl text-on-surface mb-1">Crear cuenta</h1>
          <p className="text-on-surface-variant text-sm mb-6">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Inicia sesión
            </Link>
          </p>

          {/* Tabs */}
          <div className="flex gap-1 bg-surface-container rounded-md p-1 mb-6">
            {TABS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setTab(value)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-xs font-semibold transition-colors",
                  tab === value
                    ? "bg-surface text-on-surface shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common fields */}
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                Nombre completo *
              </Label>
              <Input id="fullName" required placeholder="Tu nombre" autoComplete="name" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="regEmail" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                Correo electrónico *
              </Label>
              <Input id="regEmail" type="email" required placeholder="tu@correo.com" autoComplete="email" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="regPhone" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                Teléfono *
              </Label>
              <Input id="regPhone" type="tel" required placeholder="+57 300 000 0000" autoComplete="tel" />
            </div>

            {/* Agricultor fields */}
            {tab === "agricultor" && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="farm" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                    Nombre de la finca *
                  </Label>
                  <Input id="farm" required placeholder="Finca El Progreso" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="municipality" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                    Municipio *
                  </Label>
                  <Input id="municipality" required placeholder="Valle de Tenza, Boyacá" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="hectares" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                    Hectáreas en producción
                  </Label>
                  <Input id="hectares" type="number" min="0" step="0.5" placeholder="8" />
                </div>
              </>
            )}

            {/* Institución fields */}
            {tab === "institucion" && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="nit" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                    NIT *
                  </Label>
                  <Input id="nit" required placeholder="901.234.567-8" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="instName" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                    Nombre de la institución *
                  </Label>
                  <Input id="instName" required placeholder="Colegio Distrital San José" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="instType" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                    Tipo de institución *
                  </Label>
                  <Input id="instType" required placeholder="Colegio / Hospital / Empresa" />
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="regPassword" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                Contraseña *
              </Label>
              <Input id="regPassword" type="password" required placeholder="Mínimo 8 caracteres" autoComplete="new-password" />
            </div>

            <p className="text-[10px] text-on-surface-variant">
              Al registrarte aceptas nuestros{" "}
              <a href="#" className="underline">Términos de servicio</a>{" "}
              y{" "}
              <a href="#" className="underline">Política de privacidad</a>.
            </p>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary hover:bg-primary/90 font-bold h-11"
            >
              {loading ? "Creando cuenta…" : "Crear cuenta"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function RegistroPage() {
  return (
    <Suspense>
      <RegistroForm />
    </Suspense>
  );
}
