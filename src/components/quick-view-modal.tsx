"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, ShoppingCart, Eye, Leaf, Tractor } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCart } from "@/lib/cart-context";
import { formatCOP } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity} ${product.unit}(s) de ${product.name} añadido(s) al carrito`);
    onClose();
    setQuantity(1);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const farmerDepartment = product.farmer?.department || "Boyacá";
  const originLocation = product.traceabilityChain?.[0]?.location || `${farmerDepartment}, Colombia`;
  const harvestMethod = product.traceabilityChain?.[0]?.notes || "Cosechado manualmente en su punto exacto de madurez para garantizar el máximo sabor y valor nutricional.";

  const isOrganic = product.certifications?.includes("Orgánico") ?? false;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        showCloseButton={false}
        className="max-w-5xl sm:max-w-5xl w-[95vw] p-0 overflow-hidden bg-surface-container-lowest border-none shadow-2xl rounded-xl gap-0 h-auto max-h-[90vh] md:max-h-[921px] flex flex-col md:flex-row"
      >
        <div className="sr-only">
          <DialogTitle>Vista rápida de {product.name}</DialogTitle>
          <DialogDescription>Detalles rápidos de {product.name}</DialogDescription>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-surface-container-lowest/80 backdrop-blur-sm rounded-full p-2 hover:bg-surface-variant transition-colors text-on-surface"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="w-full md:w-1/2 relative bg-surface-container min-h-[300px] md:min-h-full shrink-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            {isOrganic && (
              <span className="bg-primary text-on-primary text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-lg w-fit">
                Orgánico
              </span>
            )}
            {product.freshnessScore > 90 && (
              <span className="bg-secondary-container text-on-secondary-container text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-lg w-fit">
                Cosecha de Hoy
              </span>
            )}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-surface-container-lowest flex flex-col">
          <div className="flex-grow">
            <p className="text-secondary font-bold font-inter text-sm uppercase tracking-wider mb-2">
              {product.category} Premium
            </p>
            <h1 className="font-epilogue text-3xl md:text-4xl text-primary font-bold leading-tight mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-epilogue font-bold text-primary">
                {formatCOP(product.price)}
              </span>
              <span className="text-outline font-inter text-lg">/ {product.unit}</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Leaf className="w-6 h-6 text-primary mt-0.5 shrink-0" fill="currentColor" />
                <div>
                  <h4 className="font-bold font-inter text-on-surface">Origen Natural</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Cultivado en {originLocation}. Libre de pesticidas sintéticos en suelos enriquecidos con composta orgánica.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Tractor className="w-6 h-6 text-primary mt-0.5 shrink-0" fill="currentColor" />
                <div>
                  <h4 className="font-bold font-inter text-on-surface">Método de Cosecha</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {harvestMethod}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-outline-variant pt-8 flex flex-col gap-4 items-center lg:flex-row flex-wrap">
            {/* Action Container */}
            <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
              {/* Quantity Selector */}
              <div className="flex items-center bg-surface-container rounded-xl p-1 border border-outline-variant w-fit">
                <button
                  onClick={decrement}
                  className="w-10 h-10 flex items-center justify-center text-primary hover:bg-surface-variant rounded-lg transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center font-bold font-epilogue text-primary">{quantity}</span>
                <button
                  onClick={increment}
                  className="w-10 h-10 flex items-center justify-center text-primary hover:bg-surface-variant rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Buttons Group */}
              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-secondary-container text-on-secondary-container font-epilogue font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all shadow-md shadow-secondary-container/20"
                >
                  <ShoppingCart className="w-6 h-6 fill-current" />
                  Añadir al carrito
                </button>

                <button
                  onClick={() => {
                    onClose();
                    router.push(`/productos/${product.slug}`);
                  }}
                  className="w-full px-6 py-4 rounded-xl border-2 border-primary text-primary font-epilogue font-bold flex items-center justify-center gap-2 hover:bg-primary/5 active:scale-95 transition-all"
                >
                  <Eye className="w-6 h-6" />
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
          
          {product.minimumLot > 0 && (
            <p className="text-center text-xs text-outline mt-6 font-medium">
              Disponibilidad limitada: Solo quedan {product.minimumLot * 3} {product.unit}s
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
