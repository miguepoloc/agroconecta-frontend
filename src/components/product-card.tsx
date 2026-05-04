"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuickViewModal } from "@/components/quick-view-modal";
import { formatCOP } from "@/lib/mock-data";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  variant?: "catalog" | "compact";
}

export function ProductCard({ product, variant = "catalog" }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

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

  const isOrganic = product.certifications.includes("Orgánico");
  const isFresh = product.freshnessScore > 90;

  return (
    <>
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden flex flex-col group border border-outline-variant/30 shadow-sm hover:shadow-md transition-all">
        {/* Image Section - Clickable for Quick View */}
        <button 
          onClick={() => setIsQuickViewOpen(true)}
          className="relative block aspect-[4/3] w-full overflow-hidden text-left"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Top-left Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isOrganic ? (
              <Badge className="bg-[#1b3d2f] text-white font-bold uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded-full border-none">
                Organic
              </Badge>
            ) : isFresh ? (
              <Badge className="bg-[#ffb703] text-black font-bold uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded-full border-none">
                Fresh
              </Badge>
            ) : null}
          </div>
        </button>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1 gap-4">
          
          {/* Title and Price */}
          <div className="flex justify-between items-start gap-4">
            <button onClick={() => setIsQuickViewOpen(true)} className="text-left">
              <h3 className="font-epilogue font-semibold text-lg text-on-surface line-clamp-2 leading-tight hover:text-primary transition-colors">
                {product.name}
              </h3>
            </button>
            <span className="text-[#1b3d2f] font-bold text-xl whitespace-nowrap">
              {formatCOP(product.price).replace(",00", "")}
            </span>
          </div>

          {/* Location / Farmer */}
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="text-sm truncate">
              {product.farmer.name.includes("Finca") ? product.farmer.name : `Finca ${product.farmer.name}`}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-auto flex items-center gap-3 pt-2">
            <Button
              onClick={() => setIsQuickViewOpen(true)}
              className="flex-1 bg-[#012d1d] hover:bg-[#1b4332] text-[#ffffff] font-inter font-semibold rounded-xl h-11"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Añadir al carrito
            </Button>
            <Button
              className="bg-[#ffb702] hover:bg-[#ffba27] text-[#271900] font-inter font-semibold rounded-xl h-11 px-6"
            >
              <Link href={`/productos/${product.slug}`}>
                Detalles
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <QuickViewModal 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </>
  );
}

