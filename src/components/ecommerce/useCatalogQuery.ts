"use client";

/**
 * Estado de busca/filtros/ordenação do catálogo.
 * Comportamento compartilhado; cada loja renderiza seus próprios controles.
 */

import { useMemo, useState } from "react";
import type {
  PriceRange,
  Product,
  ProductCategory,
  SortOption,
} from "@/types/ecommerce";
import { activeFilterCount, applyCatalogQuery } from "@/lib/ecommerce/catalog";

export interface CatalogQueryState {
  term: string;
  setTerm: (value: string) => void;
  category: string | null;
  setCategory: (value: string | null) => void;
  priceRange: string | null;
  setPriceRange: (value: string | null) => void;
  sort: SortOption;
  setSort: (value: SortOption) => void;
  results: Product[];
  /** Nº de filtros ativos (categoria/faixa), sem contar a busca. */
  filters: number;
  reset: () => void;
  total: number;
}

export function useCatalogQuery(
  products: Product[],
  categories: ProductCategory[],
  ranges: PriceRange[] = [],
): CatalogQueryState {
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("relevancia");

  const results = useMemo(
    () =>
      applyCatalogQuery(products, categories, ranges, {
        term,
        category,
        priceRange,
        sort,
      }),
    [products, categories, ranges, term, category, priceRange, sort],
  );

  const filters = activeFilterCount({ term, category, priceRange, sort });

  const reset = () => {
    setTerm("");
    setCategory(null);
    setPriceRange(null);
    setSort("relevancia");
  };

  return {
    term,
    setTerm,
    category,
    setCategory,
    priceRange,
    setPriceRange,
    sort,
    setSort,
    results,
    filters,
    reset,
    total: products.length,
  };
}
