"use client";

import { use } from "react";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight, Sprout, Hash } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

export default function ConfirmacionPage({ searchParams }: { searchParams: Promise<{ numero?: string }> }) {
  const params = use(searchParams);
  const numero = params.numero ?? "AGR-2026-00487";

  const steps = [
    { label: "Pedido recibido", desc: "Tu orden ha sido registrada exitosamente.", done: true },
    { label: "En preparación", desc: "Los agricultores están preparando tu pedido.", done: false },
    { label: "En tránsito", desc: "Tu pedido está en camino.", done: false },
    { label: "Entregado", desc: "¡Disfruta tus productos frescos!", done: false },
  ];

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        {/* Success icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
        </div>

        <h1 className="font-epilogue font-bold text-3xl text-on-surface mb-3">¡Pedido confirmado!</h1>
        <p className="text-on-surface-variant text-base mb-2">
          Gracias por apoyar al campo colombiano. Tu pedido está en camino.
        </p>
        <p className="text-sm text-on-surface-variant mb-8">
          Recibirás una confirmación en tu correo electrónico.
        </p>

        {/* Order number */}
        <div className="bg-surface-container-low border border-outline-variant rounded-md p-6 mb-8">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Hash className="w-4 h-4 text-on-surface-variant" />
            <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-widest">Número de pedido</p>
          </div>
          <p className="font-epilogue font-bold text-3xl text-primary tracking-wider">{numero}</p>
        </div>

        {/* Progress steps */}
        <div className="text-left mb-10">
          <div className="space-y-0">
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1;
              return (
                <div key={step.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                        step.done
                          ? "bg-primary text-on-primary"
                          : i === 1
                          ? "bg-secondary-container text-on-secondary-container animate-pulse"
                          : "bg-surface-container text-on-surface-variant"
                      )}
                    >
                      {step.done ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-bold">{i + 1}</span>
                      )}
                    </div>
                    {!isLast && <div className="w-0.5 h-8 bg-outline-variant my-1" />}
                  </div>
                  <div className="pb-6">
                    <p className={cn("font-semibold text-sm", step.done || i === 1 ? "text-on-surface" : "text-on-surface-variant")}>
                      {step.label}
                    </p>
                    <p className="text-xs text-on-surface-variant">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact message */}
        <div className="bg-secondary-container rounded-md p-5 mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sprout className="w-5 h-5 text-on-secondary-container" />
            <p className="font-epilogue font-bold text-on-secondary-container">Tu impacto</p>
          </div>
          <p className="text-on-secondary-container/80 text-sm">
            El <span className="font-bold">82%</span> del valor de tu pedido llega directamente a los agricultores que cultivaron estos alimentos.
            ¡Gracias por hacer parte del cambio!
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/catalogo"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-primary text-on-primary hover:bg-primary/90 font-bold gap-2"
            )}
          >
            Seguir comprando
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/catalogo"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-outline text-on-surface gap-2"
            )}
          >
            <Package className="w-4 h-4" />
            Ver mis pedidos
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
