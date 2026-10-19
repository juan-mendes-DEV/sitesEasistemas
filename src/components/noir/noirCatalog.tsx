"use client";

import { Search } from "lucide-react";
import type { SortOption } from "@/types/ecommerce";
import { useCatalogQuery } from "@/components/ecommerce/useCatalogQuery";
import { NOIR_CATEGORIES, NOIR_PRODUCTS } from "./data";
import { NoirProductCard } from "./noirProductCard";

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "relevancia", label: "Relevância" },
  { value: "preco-asc", label: "Menor preço" },
  { value: "preco-desc", label: "Maior preço" },
  { value: "nome-asc", label: "Nome: A–Z" },
  { value: "nome-desc", label: "Nome: Z–A" },
];

export function NoirCatalog() {
  const query = useCatalogQuery(NOIR_PRODUCTS, NOIR_CATEGORIES);

  return (
    <div>
      <div className="grid gap-5 border-b border-[#111111]/12 pb-7 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-5">
          <div className="relative w-full sm:max-w-md">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query.term}
              onChange={(evento) => query.setTerm(evento.target.value)}
              placeholder="Buscar por nome ou categoria…"
              aria-label="Buscar produtos"
              className="w-full border border-[#111111]/20 bg-white py-3 pl-10 pr-4 text-sm text-[#111111] placeholder:text-[#666666]/70 focus:border-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A99A86]"
            />
          </div>

          <div
            role="group"
            aria-label="Filtrar por categoria"
            className="flex flex-wrap gap-2"
          >
            <button
              type="button"
              onClick={() => query.setCategory(null)}
              aria-pressed={query.category === null}
              className={`border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors focus-visible:outline-[#A99A86] ${
                query.category === null
                  ? "border-[#111111] bg-[#111111] text-[#F2EFE9]"
                  : "border-[#111111]/20 text-[#666666] hover:border-[#111111]"
              }`}
            >
              Todas
            </button>
            {NOIR_CATEGORIES.map((categoria) => {
              const ativo = query.category === categoria.id;
              return (
                <button
                  key={categoria.id}
                  type="button"
                  onClick={() =>
                    query.setCategory(ativo ? null : categoria.id)
                  }
                  aria-pressed={ativo}
                  className={`border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors focus-visible:outline-[#A99A86] ${
                    ativo
                      ? "border-[#111111] bg-[#111111] text-[#F2EFE9]"
                      : "border-[#111111]/20 text-[#666666] hover:border-[#111111]"
                  }`}
                >
                  {categoria.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="noir-ordenacao"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#666666]"
          >
            Ordenar
          </label>
          <select
            id="noir-ordenacao"
            value={query.sort}
            onChange={(evento) =>
              query.setSort(evento.target.value as SortOption)
            }
            className="border border-[#111111]/20 bg-white px-3 py-2.5 text-sm text-[#111111] focus:border-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A99A86]"
          >
            {SORT_OPTIONS.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p
        role="status"
        className="mt-6 text-sm text-[#666666]"
        aria-live="polite"
      >
        {query.results.length === 0
          ? "Nenhum produto corresponde à sua busca."
          : `${query.results.length} de ${query.total} produtos — dados fictícios.`}
      </p>

      {query.results.length === 0 ? (
        <div className="mt-10 border border-dashed border-[#111111]/25 p-10 text-center">
          <p className="text-base font-semibold text-[#111111]">
            Nada encontrado por aqui.
          </p>
          <p className="mt-2 text-sm text-[#666666]">
            Tente outro termo ou limpe os filtros aplicados.
          </p>
          <button
            type="button"
            onClick={query.reset}
            className="mt-5 bg-[#111111] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F2EFE9] transition-colors hover:bg-[#666666] focus-visible:outline-[#A99A86]"
          >
            Limpar busca e filtros
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {query.results.map((product) => (
            <li key={product.id} className="h-full">
              <NoirProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
