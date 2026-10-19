"use client";

import { Search } from "lucide-react";
import type { SortOption } from "@/types/ecommerce";
import { useCatalogQuery } from "@/components/ecommerce/useCatalogQuery";
import {
  NEXUS_CATEGORIES,
  NEXUS_PRICE_RANGES,
  NEXUS_PRODUCTS,
} from "./data";
import { NexusProductCard } from "./nexusProductCard";

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "relevancia", label: "Relevância" },
  { value: "preco-asc", label: "Menor preço" },
  { value: "preco-desc", label: "Maior preço" },
  { value: "nome-asc", label: "Nome: A–Z" },
  { value: "nome-desc", label: "Nome: Z–A" },
];

export function NexusCatalog() {
  const query = useCatalogQuery(
    NEXUS_PRODUCTS,
    NEXUS_CATEGORIES,
    NEXUS_PRICE_RANGES,
  );

  return (
    <div>
      <div className="grid gap-5 border-b border-[#E9F2F7]/12 pb-7 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-5">
          <div className="relative w-full sm:max-w-md">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#E9F2F7]/50"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query.term}
              onChange={(evento) => query.setTerm(evento.target.value)}
              placeholder="Buscar produto ou categoria…"
              aria-label="Buscar produtos"
              className="w-full border border-[#E9F2F7]/20 bg-[#0B1220] py-3 pl-10 pr-4 text-sm text-[#E9F2F7] placeholder:text-[#E9F2F7]/45 focus:border-[#20C7D9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20C7D9]"
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
              className={`border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors focus-visible:outline-[#20C7D9] ${
                query.category === null
                  ? "border-[#20C7D9] bg-[#20C7D9] text-[#0B1220]"
                  : "border-[#E9F2F7]/20 text-[#E9F2F7]/70 hover:border-[#20C7D9]"
              }`}
            >
              Todas
            </button>
            {NEXUS_CATEGORIES.map((categoria) => {
              const ativo = query.category === categoria.id;
              return (
                <button
                  key={categoria.id}
                  type="button"
                  onClick={() => query.setCategory(ativo ? null : categoria.id)}
                  aria-pressed={ativo}
                  className={`border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors focus-visible:outline-[#20C7D9] ${
                    ativo
                      ? "border-[#20C7D9] bg-[#20C7D9] text-[#0B1220]"
                      : "border-[#E9F2F7]/20 text-[#E9F2F7]/70 hover:border-[#20C7D9]"
                  }`}
                >
                  {categoria.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor="nexus-faixa"
            className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#E9F2F7]/60"
          >
            Faixa de preço
          </label>
          <select
            id="nexus-faixa"
            value={query.priceRange ?? ""}
            onChange={(evento) =>
              query.setPriceRange(evento.target.value || null)
            }
            className="border border-[#E9F2F7]/20 bg-[#0B1220] px-3 py-2.5 text-sm text-[#E9F2F7] focus:border-[#20C7D9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20C7D9]"
          >
            <option value="">Todas as faixas</option>
            {NEXUS_PRICE_RANGES.map((faixa) => (
              <option key={faixa.id} value={faixa.id}>
                {faixa.label}
              </option>
            ))}
          </select>

          <label
            htmlFor="nexus-ordenacao"
            className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#E9F2F7]/60"
          >
            Ordenar
          </label>
          <select
            id="nexus-ordenacao"
            value={query.sort}
            onChange={(evento) =>
              query.setSort(evento.target.value as SortOption)
            }
            className="border border-[#E9F2F7]/20 bg-[#0B1220] px-3 py-2.5 text-sm text-[#E9F2F7] focus:border-[#20C7D9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20C7D9]"
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
        aria-live="polite"
        className="mt-6 text-sm text-[#E9F2F7]/65"
      >
        {query.results.length === 0
          ? "Nenhum produto corresponde à sua busca."
          : `${query.results.length} de ${query.total} produtos — especificações fictícias.`}
        {query.filters > 0 ? ` · ${query.filters} filtro(s) ativo(s).` : ""}
      </p>

      {query.results.length === 0 ? (
        <div className="mt-10 border border-dashed border-[#E9F2F7]/25 p-10 text-center">
          <p className="text-base font-semibold text-[#E9F2F7]">
            Nenhum resultado encontrado.
          </p>
          <p className="mt-2 text-sm text-[#E9F2F7]/60">
            Ajuste o termo buscado ou limpe os filtros aplicados.
          </p>
          <button
            type="button"
            onClick={query.reset}
            className="mt-5 bg-[#20C7D9] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1220] transition-colors hover:bg-[#E9F2F7] focus-visible:outline-[#E9F2F7]"
          >
            Limpar busca e filtros
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {query.results.map((product) => (
            <li key={product.id} className="h-full">
              <NexusProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
