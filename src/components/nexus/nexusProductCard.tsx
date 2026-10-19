"use client";

import Image from "next/image";
import Link from "next/link";
import { GitCompare } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/ecommerce";
import { formatBRL, productImageAlt } from "@/lib/ecommerce/format";
import { useCompare } from "@/components/ecommerce/storeProvider";
import { NEXUS_CATEGORIES, NEXUS_STORE } from "./data";

const BASE = NEXUS_STORE.route;

export function NexusProductCard({ product }: { product: Product }) {
  const compare = useCompare();
  const [aviso, setAviso] = useState<string | null>(null);

  const selecionado = compare.has(product.id);
  const categoria =
    NEXUS_CATEGORIES.find((item) => item.id === product.category)?.label ?? "";
  const esgotado = product.stock <= 0;
  const href = `${BASE}/produtos/${product.slug}`;
  const destaque = product.specs?.[0];

  function alternar() {
    const alterado = compare.toggle(product.id);
    if (!alterado) {
      setAviso("Comparador cheio: remova um produto para incluir este.");
    } else if (selecionado) {
      setAviso("Produto removido do comparador.");
    } else {
      setAviso("Produto adicionado ao comparador.");
    }
  }

  return (
    <article className="group relative flex h-full flex-col border border-[#E9F2F7]/10 bg-[#172B40] transition-colors hover:border-[#20C7D9]/60">
      <Link
        href={href}
        className="relative block aspect-[4/3] overflow-hidden focus-visible:outline-[#20C7D9]"
      >
        <Image
          src={product.images[0]}
          alt={productImageAlt(product.name, 0)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 bg-[#20C7D9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#0B1220]">
            {product.badge}
          </span>
        )}
        {esgotado && (
          <span className="absolute inset-x-0 bottom-0 bg-[#0B1220]/90 px-3 py-2 text-center text-[11px] uppercase tracking-[0.15em] text-[#E9F2F7]">
            Esgotado (demonstração)
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#20C7D9]">
            {categoria}
          </p>
          <button
            type="button"
            onClick={alternar}
            aria-pressed={selecionado}
            aria-label={
              selecionado
                ? `Remover ${product.name} do comparador`
                : `Adicionar ${product.name} ao comparador`
            }
            className={`border p-1.5 transition-colors focus-visible:outline-[#20C7D9] ${
              selecionado
                ? "border-[#20C7D9] bg-[#20C7D9] text-[#0B1220]"
                : "border-[#E9F2F7]/20 text-[#E9F2F7]/70 hover:border-[#20C7D9] hover:text-[#20C7D9]"
            }`}
          >
            <GitCompare className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <h3 className="mt-1.5 text-sm font-semibold leading-snug text-[#E9F2F7]">
          <Link
            href={href}
            className="transition-colors hover:text-[#20C7D9] focus-visible:outline-[#20C7D9]"
          >
            {product.name}
          </Link>
        </h3>

        {destaque && (
          <p className="mt-1.5 text-xs text-[#E9F2F7]/55">
            {destaque.label}: {destaque.value ?? "Não disponível"}
          </p>
        )}

        <p
          role="status"
          aria-live="polite"
          className="mt-2 min-h-4 text-[11px] text-[#20C7D9]"
        >
          {aviso ?? ""}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#E9F2F7]/50">
            Preço fictício
          </span>
          <span className="text-lg font-bold tabular-nums text-[#E9F2F7]">
            {formatBRL(product.price)}
          </span>
        </div>
      </div>
    </article>
  );
}
