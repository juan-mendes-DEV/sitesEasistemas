/** Formatação monetária demonstrativa (BRL) compartilhada pelas lojas. */

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Formata um valor fictício em reais, ex.: "R$ 189,00". */
export function formatBRL(value: number): string {
  return BRL.format(value);
}

/** Texto curto de estoque demonstrativo. */
export function formatStock(stock: number): string {
  if (stock <= 0) return "Esgotado (demonstração)";
  if (stock === 1) return "1 unidade (demonstração)";
  return `${stock} unidades (demonstração)`;
}

/** Alt acessível padrão das imagens de produto (0 = principal). */
export function productImageAlt(productName: string, imageIndex: number): string {
  return imageIndex === 0
    ? `${productName} — imagem de demonstração`
    : `${productName} — detalhe de demonstração`;
}
