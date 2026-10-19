/**
 * Checkout 100% demonstrativo.
 *
 * Nenhum dado pessoal é coletado e nenhum pagamento é processado.
 * O "pedido" existe apenas em memória, com identificador fictício.
 */

import type { Cart, DemoOrder, Product } from "@/types/ecommerce";
import { cartTotals, resolveCart } from "./cart";

/** Mensagem obrigatória exibida ao concluir o checkout. */
export const DEMO_ORDER_NOTICE =
  "Pedido demonstrativo criado. Nenhuma compra ou pagamento foi realizado.";

/** Aviso padrão do fluxo de checkout. */
export const CHECKOUT_DISCLAIMER =
  "Ambiente de demonstração: não informamos cartão, CPF, endereço ou qualquer dado pessoal. Nenhum pagamento é processado.";

/**
 * Converte o carrinho em um pedido demonstrativo.
 * Retorna null quando o carrinho está vazio (nada a "comprar").
 */
export function createDemoOrder(
  cart: Cart,
  products: Product[],
  now: Date = new Date(),
): DemoOrder | null {
  const resolvidos = resolveCart(cart, products);
  if (resolvidos.length === 0) return null;

  const totals = cartTotals(resolvidos);
  const sufixo = Math.random().toString(36).slice(2, 6).toUpperCase();

  return {
    id: `DEMO-${now.getTime().toString(36).toUpperCase()}-${sufixo}`,
    store: cart.store,
    items: resolvidos.map((linha) => ({
      productId: linha.product.id,
      name: linha.product.name,
      variantLabel: linha.variantLabel,
      quantity: linha.quantity,
      unitPrice: linha.unitPrice,
      lineTotal: linha.lineTotal,
    })),
    total: totals.total,
    itemCount: totals.itemCount,
    createdAt: now.toISOString(),
    demo: true,
  };
}
