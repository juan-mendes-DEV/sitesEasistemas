"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/types/ecommerce";
import { formatBRL, productImageAlt } from "@/lib/ecommerce/format";
import { useFavorites } from "@/components/ecommerce/storeProvider";
import { NOIR_CATEGORIES, NOIR_STORE } from "./data";

const BASE = NOIR_STORE.route;

export function NoirProductCard({ product }: { product: Product }) {
  const favorites = useFavorites();
  const ativo = favorites.has(product.id);
  const categoria =
    NOIR_CATEGORIES.find((item) => item.id === product.category)?.label ?? "";
  const esgotado = product.stock <= 0;
  const href = `${BASE}/produtos/${product.slug}`;

  return (
    <article className="group relative flex h-full flex-col border border-[#111111]/12 bg-white transition-colors hover:border-[#111111]">
      <Link
        href={href}
        className="relative block aspect-[3/4] overflow-hidden focus-visible:outline-[#A99A86]"
      >
        <Image
          src={product.images[0]}
          alt={productImageAlt(product.name, 0)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 bg-[#111111] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F2EFE9]">
            {product.badge}
          </span>
        )}
        {esgotado && (
          <span className="absolute inset-x-0 bottom-0 bg-[#111111]/85 px-3 py-2 text-center text-[11px] uppercase tracking-[0.18em] text-[#F2EFE9]">
            Esgotado (demonstração)
          </span>
        )}
      </Link>

      <button
        type="button"
        onClick={() => favorites.toggle(product.id)}
        aria-pressed={ativo}
        aria-label={
          ativo
            ? `Remover ${product.name} dos favoritos`
            : `Adicionar ${product.name} aos favoritos`
        }
        className="absolute right-3 top-3 border border-[#111111]/15 bg-white/90 p-2 text-[#111111] transition-colors hover:bg-[#111111] hover:text-[#F2EFE9] focus-visible:outline-[#A99A86]"
      >
        <Heart
          className={`h-4 w-4 ${ativo ? "fill-[#111111] text-[#111111]" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#666666]">
          {categoria}
        </p>
        <h3 className="mt-1.5 text-sm font-semibold leading-snug text-[#111111]">
          <Link
            href={href}
            className="transition-colors hover:text-[#666666] focus-visible:outline-[#A99A86]"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#666666]">
            Preço fictício
          </span>
          <span className="text-base font-bold tabular-nums text-[#111111]">
            {formatBRL(product.price)}
          </span>
        </div>
      </div>
    </article>
  );
}
