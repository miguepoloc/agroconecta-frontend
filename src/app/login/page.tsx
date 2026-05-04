"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sprout, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import type { UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";

const QUICK_LOGIN: { role: UserRole; label: string; color: string }[] = [
  { role: "comprador", label: "Comprador", color: "bg-surface-container text-on-surface hover:bg-surface-container-high" },
  { role: "agricultor", label: "Agricultor", color: "bg-primary-container text-on-primary-container hover:bg-primary-container/80" },
  { role: "institucion", label: "Institución", color: "bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim" },
  { role: "admin", label: "Admin", color: "bg-error-container text-on-error-container hover:bg-error-container/80" },
];

const DASHBOARD: Record<UserRole, string> = {
  admin: "/admin",
  agricultor: "/agricultor/panel",
  institucion: "/institucional",
  comprador: "/catalogo",
};

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAs } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = await login(email, password);
    setLoading(false);
    if (!ok) {
      setError("Correo o contraseña incorrectos. Prueba con demo123.");
      return;
    }
    const role = email.includes("admin") ? "admin"
      : email.includes("agricultor") || email.includes("carlos") || email.includes("maria") || email.includes("jesus") || email.includes("ana") ? "agricultor"
      : email.includes("institucion") ? "institucion"
      : "comprador";
    router.push(DASHBOARD[role as UserRole] ?? "/catalogo");
  }

  async function handleQuickLogin(role: UserRole) {
    await loginAs(role);
    router.push(DASHBOARD[role]);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: brand panel */}
      <div className="hidden lg:flex flex-col justify-between bg-primary text-on-primary p-12">
        <Link href="/" className="flex items-center gap-2">
          <Sprout className="w-6 h-6 text-secondary-container" />
          <span className="font-epilogue font-bold text-xl">
            Agro<span className="text-secondary-container">Conecta</span>
          </span>
        </Link>
        <div>
          <blockquote className="font-epilogue font-bold text-3xl leading-snug mb-6">
            "Cada cosecha es un regalo de la tierra. Mi familia lleva 60 años sembrando con respeto."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center font-bold text-secondary-container text-sm">
              CM
            </div>
            <div>
              <p className="font-semibold text-sm">Carlos Muñoz</p>
              <p className="text-on-primary/60 text-xs">Agricultor Gold · Valle de Tenza, Boyacá</p>
            </div>
          </div>
        </div>
        <p className="text-on-primary/40 text-xs">© 2026 AgroConecta SAS</p>
      </div>

      {/* Right: form */}
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

          <h1 className="font-epilogue font-bold text-2xl text-on-surface mb-1">Iniciar sesión</h1>
          <p className="text-on-surface-variant text-sm mb-8">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="text-primary font-semibold hover:underline">
              Regístrate gratis
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-error bg-error-container/30 rounded px-3 py-2" role="alert">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary hover:bg-primary/90 font-bold h-11"
            >
              {loading ? "Entrando…" : "Iniciar sesión"}
            </Button>
          </form>

          {process.env.NODE_ENV !== "production" && (
            <>
              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-2 text-xs text-on-surface-variant">
                  acceso rápido (dev)
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_LOGIN.map(({ role, label, color }) => (
                  <button
                    key={role}
                    onClick={() => handleQuickLogin(role)}
                    className={cn("rounded-md px-3 py-2 text-xs font-semibold transition-colors", color)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-on-surface-variant text-center mt-2">
                Password: <code className="font-mono">demo123</code>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
