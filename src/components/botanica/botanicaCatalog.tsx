"use client";

import { Search } from "lucide-react";
import type { SortOption } from "@/types/ecommerce";
import { useCatalogQuery } from "@/components/ecommerce/useCatalogQuery";
import {
  BOTANICA_CATEGORIES,
  BOTANICA_PRICE_RANGES,
  BOTANICA_PRODUCTS,
} from "./data";
import { BotanicaProductCard } from "./botanicaProductCard";

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "relevancia", label: "Relevância" },
  { value: "preco-asc", label: "Menor preço" },
  { value: "preco-desc", label: "Maior preço" },
  { value: "nome-asc", label: "Nome: A–Z" },
  { value: "nome-desc", label: "Nome: Z–A" },
];

export function BotanicaCatalog() {
  const query = useCatalogQuery(
    BOTANICA_PRODUCTS,
    BOTANICA_CATEGORIES,
    BOTANICA_PRICE_RANGES,
  );

  return (
    <div>
      <div className="grid gap-5 border-b border-[#3F5748]/15 pb-7 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-5">
          <div className="relative w-full sm:max-w-md">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#493F36]/60"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query.term}
              onChange={(evento) => query.setTerm(evento.target.value)}
              placeholder="Buscar produto ou categoria…"
              aria-label="Buscar produtos"
              className="w-full border border-[#3F5748]/25 bg-white py-3 pl-10 pr-4 text-sm text-[#493F36] placeholder:text-[#493F36]/55 focus:border-[#3F5748] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A88A]"
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
              className={`border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors focus-visible:outline-[#C7A88A] ${
                query.category === null
                  ? "border-[#3F5748] bg-[#3F5748] text-[#FAF8F2]"
                  : "border-[#3F5748]/25 text-[#493F36]/70 hover:border-[#3F5748]"
              }`}
            >
              Todas
            </button>
            {BOTANICA_CATEGORIES.map((categoria) => {
              const ativo = query.category === categoria.id;
              return (
                <button
                  key={categoria.id}
                  type="button"
                  onClick={() => query.setCategory(ativo ? null : categoria.id)}
                  aria-pressed={ativo}
                  className={`border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors focus-visible:outline-[#C7A88A] ${
                    ativo
                      ? "border-[#3F5748] bg-[#3F5748] text-[#FAF8F2]"
                      : "border-[#3F5748]/25 text-[#493F36]/70 hover:border-[#3F5748]"
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
            htmlFor="botanica-faixa"
            className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#493F36]/65"
          >
            Faixa de preço
          </label>
          <select
            id="botanica-faixa"
            value={query.priceRange ?? ""}
            onChange={(evento) =>
              query.setPriceRange(evento.target.value || null)
            }
            className="border border-[#3F5748]/25 bg-white px-3 py-2.5 text-sm text-[#493F36] focus:border-[#3F5748] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A88A]"
          >
            <option value="">Todas as faixas</option>
            {BOTANICA_PRICE_RANGES.map((faixa) => (
              <option key={faixa.id} value={faixa.id}>
                {faixa.label}
              </option>
            ))}
          </select>

          <label
            htmlFor="botanica-ordenacao"
            className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#493F36]/65"
          >
            Ordenar
          </label>
          <select
            id="botanica-ordenacao"
            value={query.sort}
            onChange={(evento) =>
              query.setSort(evento.target.value as SortOption)
            }
            className="border border-[#3F5748]/25 bg-white px-3 py-2.5 text-sm text-[#493F36] focus:border-[#3F5748] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A88A]"
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
        className="mt-6 text-sm text-[#493F36]/70"
      >
        {query.results.length === 0
          ? "Nenhum produto corresponde à sua busca."
          : `${query.results.length} de ${query.total} produtos — ingredientes demonstrativos.`}
        {query.filters > 0 ? ` · ${query.filters} filtro(s) ativo(s).` : ""}
      </p>

      {query.results.length === 0 ? (
        <div className="mt-10 border border-dashed border-[#3F5748]/30 p-10 text-center">
          <p className="text-base font-semibold text-[#3F5748]">
            Nenhum resultado encontrado.
          </p>
          <p className="mt-2 text-sm text-[#493F36]/70">
            Ajuste o termo buscado ou limpe os filtros aplicados.
          </p>
          <button
            type="button"
            onClick={query.reset}
            className="mt-5 bg-[#3F5748] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAF8F2] transition-colors hover:bg-[#493F36] focus-visible:outline-[#C7A88A]"
          >
            Limpar busca e filtros
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {query.results.map((product) => (
            <li key={product.id} className="h-full">
              <BotanicaProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
