"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FreshnessBadge } from "@/components/freshness-badge";
import { useCart } from "@/lib/cart-context";
import { formatCOP } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { toast } from "sonner";

const certColors: Record<string, string> = {
  GlobalGAP: "bg-primary-container text-on-primary-container",
  FairTrade: "bg-tertiary-container text-on-tertiary-container",
  ICA: "bg-surface-container-highest text-on-surface",
  INVIMA: "bg-surface-container-highest text-on-surface",
  Orgánico: "bg-primary-container text-on-primary-container",
};

interface ProductCardProps {
  product: Product;
  variant?: "catalog" | "compact";
}

export function ProductCard({ product, variant = "catalog" }: ProductCardProps) {
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem(product, 1);
    toast.success(`${product.name} agregado al carrito`);
  }

  if (variant === "compact") {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant rounded-md overflow-hidden flex gap-3 p-3">
        <div className="relative w-16 h-16 rounded shrink-0 overflow-hidden">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-on-surface truncate">{product.name}</p>
          <p className="text-primary font-bold text-sm">{formatCOP(product.price)}/kg</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-md overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
      {/* Image */}
      <Link href={`/productos/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-surface text-on-surface text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            Ver detalle
          </span>
        </div>
        {/* Freshness overlay */}
        <div className="absolute bottom-2 left-2 right-2">
          <FreshnessBadge score={product.freshnessScore} />
        </div>
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Farmer */}
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={product.farmer.avatar} />
            <AvatarFallback className="bg-primary text-on-primary text-[10px]">
              {product.farmer.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-on-surface-variant truncate">{product.farmer.name}</span>
          <span className="text-xs text-on-surface-variant/50 shrink-0">· {product.farmer.department}</span>
        </div>

        {/* Name & price */}
        <div>
          <Link href={`/productos/${product.slug}`}>
            <h3 className="font-epilogue font-semibold text-on-surface hover:text-primary transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-primary font-bold text-lg">{formatCOP(product.price)}</span>
            <span className="text-xs text-on-surface-variant">/ kg</span>
            {product.institutionalPrice && (
              <span className="text-xs text-on-surface-variant ml-auto">
                Inst. {formatCOP(product.institutionalPrice)}/kg
              </span>
            )}
          </div>
        </div>

        {/* Certifications */}
        {product.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.certifications.slice(0, 3).map((cert) => (
              <Badge
                key={cert}
                className={cn("text-[10px] px-1.5 py-0 border-0 font-medium", certColors[cert] ?? "bg-muted text-muted-foreground")}
              >
                {cert}
              </Badge>
            ))}
          </div>
        )}

        {/* Add to cart */}
        <Button
          onClick={handleAddToCart}
          className="mt-auto w-full bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim font-semibold"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
}
