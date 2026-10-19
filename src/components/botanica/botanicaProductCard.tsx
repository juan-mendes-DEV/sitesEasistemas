"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/ecommerce";
import { formatBRL, productImageAlt } from "@/lib/ecommerce/format";
import { BOTANICA_CATEGORIES, BOTANICA_STORE } from "./data";

const BASE = BOTANICA_STORE.route;

export function BotanicaProductCard({ product }: { product: Product }) {
  const categoria =
    BOTANICA_CATEGORIES.find((item) => item.id === product.category)?.label ??
    "";
  const esgotado = product.stock <= 0;
  const href = `${BASE}/produtos/${product.slug}`;

  return (
    <article className="group relative flex h-full flex-col border border-[#3F5748]/15 bg-[#E8E1D3]/40 transition-colors hover:border-[#3F5748]">
      <Link
        href={href}
        className="relative block aspect-[4/3] overflow-hidden focus-visible:outline-[#C7A88A]"
      >
        <Image
          src={product.images[0]}
          alt={productImageAlt(product.name, 0)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 bg-[#3F5748] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FAF8F2]">
            {product.badge}
          </span>
        )}
        {esgotado && (
          <span className="absolute inset-x-0 bottom-0 bg-[#493F36]/85 px-3 py-2 text-center text-[11px] uppercase tracking-[0.15em] text-[#FAF8F2]">
            Esgotado (demonstração)
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C7A88A]">
          {categoria}
        </p>
        <h3 className="mt-1.5 text-sm font-semibold leading-snug text-[#3F5748]">
          <Link
            href={href}
            className="transition-colors hover:text-[#493F36] focus-visible:outline-[#C7A88A]"
          >
            {product.name}
          </Link>
        </h3>
        {product.volume && (
          <p className="mt-1 text-xs text-[#493F36]/65">{product.volume}</p>
        )}
        {product.kitContents && (
          <p className="mt-1 text-xs text-[#493F36]/65">
            {product.kitContents.length} itens no kit (demonstração)
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#493F36]/60">
            Preço fictício
          </span>
          <span className="text-base font-bold tabular-nums text-[#3F5748]">
            {formatBRL(product.price)}
          </span>
        </div>
      </div>
    </article>
  );
}
