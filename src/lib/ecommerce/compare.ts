/**
 * Comparador local da NEXUS Tech Store (até três produtos).
 * Sem backend: seleção guardada no localStorage e validada no restore.
 */

import type { Product } from "@/types/ecommerce";

export const MAX_COMPARE = 3;

/** Remove o produto se já estiver; adiciona se houver espaço. */
export function toggleCompare(
  selected: string[],
  productId: string,
): { ids: string[]; changed: boolean; reason?: "limite-atingido" } {
  if (selected.includes(productId)) {
    return { ids: selected.filter((id) => id !== productId), changed: true };
  }
  if (selected.length >= MAX_COMPARE) {
    return { ids: selected, changed: false, reason: "limite-atingido" };
  }
  return { ids: [...selected, productId], changed: true };
}

export function isCompared(selected: string[], productId: string): boolean {
  return selected.includes(productId);
}

export interface CompareRow {
  label: string;
  /** Um valor por produto; null = atributo não informado. */
  values: Array<string | null>;
}

/**
 * Monta as linhas da tabela de comparação.
 * Atributo ausente em algum produto vira null (exibido como
 * "Não disponível" pela interface).
 */
export function buildCompareRows(products: Product[]): CompareRow[] {
  const labels: string[] = [];
  for (const product of products) {
    for (const spec of product.specs ?? []) {
      if (!labels.includes(spec.label)) labels.push(spec.label);
    }
  }

  return labels.map((label) => ({
    label,
    values: products.map(
      (product) => product.specs?.find((spec) => spec.label === label)?.value ?? null,
    ),
  }));
}

/** Resolve ids para produtos, descartando desconhecidos e preservando a ordem. */
export function resolveCompareProducts(
  ids: string[],
  products: Product[],
): Product[] {
  const porId = new Map(products.map((produto) => [produto.id, produto]));
  const resolvidos: Product[] = [];
  for (const id of ids) {
    const product = porId.get(id);
    if (product && !resolvidos.includes(product)) resolvidos.push(product);
    if (resolvidos.length >= MAX_COMPARE) break;
  }
  return resolvidos;
}
