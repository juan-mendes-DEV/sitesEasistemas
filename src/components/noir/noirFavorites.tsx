"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { Product } from "@/types/ecommerce";
import { useStore } from "@/components/ecommerce/storeProvider";
import { NOIR_STORE } from "./data";
import { NoirProductCard } from "./noirProductCard";

const BASE = NOIR_STORE.route;

export function NoirFavorites() {
  const { products, favorites } = useStore();
  const ids = favorites.ids;

  const favoritos = useMemo(() => {
    const porId = new Map(products.map((item) => [item.id, item]));
    return ids
      .map((id) => porId.get(id))
      .filter((item): item is Product => Boolean(item));
  }, [products, ids]);

  return (
    <div>
      <p role="status" aria-live="polite" className="text-sm text-[#666666]">
        {favoritos.length === 0
          ? "Nenhum favorito salvo ainda."
          : `${favoritos.length} ${favoritos.length === 1 ? "produto salvo" : "produtos salvos"} — ficam apenas neste navegador.`}
      </p>

      {favoritos.length === 0 ? (
        <div className="mt-8 border border-dashed border-[#111111]/25 p-10 text-center">
          <p className="text-base font-semibold text-[#111111]">
            Sua lista de favoritos está vazia.
          </p>
          <p className="mt-2 text-sm text-[#666666]">
            Toque no coração de qualquer produto para salvá-lo por aqui — sem
            cadastro e sem login.
          </p>
          <Link
            href={`${BASE}/produtos`}
            className="mt-5 inline-block bg-[#111111] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F2EFE9] transition-colors hover:bg-[#666666] focus-visible:outline-[#A99A86]"
          >
            Explorar o catálogo
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoritos.map((product) => (
            <li key={product.id} className="h-full">
              <NoirProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
