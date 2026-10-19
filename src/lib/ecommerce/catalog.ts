/**
 * Busca, filtros e ordenação do catálogo — funções puras.
 * A apresentação (inputs, chips, selects) é responsabilidade de cada loja.
 */

import type {
  CatalogQuery,
  PriceRange,
  Product,
  ProductCategory,
} from "@/types/ecommerce";

export function normalizeTerm(term: string): string {
  return term.trim().toLowerCase();
}

function labelOf(categories: ProductCategory[], categoryId: string): string {
  return categories.find((categoria) => categoria.id === categoryId)?.label ?? "";
}

function matchesTerm(
  product: Product,
  term: string,
  categorias: ProductCategory[],
): boolean {
  const alvo = `${product.name} ${product.description} ${labelOf(
    categorias,
    product.category,
  )}`.toLowerCase();
  return alvo.includes(term);
}

export function sortProducts(products: Product[], sort: CatalogQuery["sort"]): Product[] {
  const lista = [...products];
  switch (sort) {
    case "preco-asc":
      return lista.sort((a, b) => a.price - b.price);
    case "preco-desc":
      return lista.sort((a, b) => b.price - a.price);
    case "nome-asc":
      return lista.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    case "nome-desc":
      return lista.sort((a, b) => b.name.localeCompare(a.name, "pt-BR"));
    case "relevancia":
    default:
      return lista;
  }
}

/**
 * Aplica busca + categoria + faixa de preço + ordenação.
 * Campos vazios/nulos são ignorados (estado inicial do catálogo).
 */
export function applyCatalogQuery(
  products: Product[],
  categorias: ProductCategory[],
  ranges: PriceRange[],
  query: CatalogQuery,
): Product[] {
  let lista = [...products];

  const term = normalizeTerm(query.term);
  if (term) {
    lista = lista.filter((produto) => matchesTerm(produto, term, categorias));
  }

  if (query.category) {
    lista = lista.filter((produto) => produto.category === query.category);
  }

  if (query.priceRange) {
    const range = ranges.find((faixa) => faixa.id === query.priceRange);
    if (range) {
      lista = lista.filter(
        (produto) => produto.price >= range.min && produto.price < range.max,
      );
    }
  }

  return sortProducts(lista, query.sort);
}

/** Quantidade de filtros ativos (busca não conta). */
export function activeFilterCount(query: CatalogQuery): number {
  return (query.category ? 1 : 0) + (query.priceRange ? 1 : 0);
}
