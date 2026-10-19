import { describe, it, expect } from "vitest";
import { CHECKOUT_DISCLAIMER, DEMO_ORDER_NOTICE, createDemoOrder } from "./checkout";
import { addItem, freshCart, resolveCart } from "./cart";
import { NOIR_PRODUCTS } from "@/components/noir/data";
import { NEXUS_PRODUCTS } from "@/components/nexus/data";

const produtoVariado = NOIR_PRODUCTS.find((p) => p.variants?.length)!;
const variacao = produtoVariado.variants!.find((v) => v.stock > 0)!;
const produtoSimples = NEXUS_PRODUCTS[0];

describe("checkout — mensagens obrigatórias", () => {
  it("DEMO_ORDER_NOTICE é a frase exata exigida pela especificação", () => {
    expect(DEMO_ORDER_NOTICE).toBe(
      "Pedido demonstrativo criado. Nenhuma compra ou pagamento foi realizado.",
    );
  });

  it("CHECKOUT_DISCLAIMER deixa claro que não há coleta de dados nem pagamento", () => {
    expect(CHECKOUT_DISCLAIMER).toContain("cartão");
    expect(CHECKOUT_DISCLAIMER).toContain("CPF");
    expect(CHECKOUT_DISCLAIMER).toContain("endereço");
    expect(CHECKOUT_DISCLAIMER).toContain("Nenhum pagamento é processado");
  });
});

describe("checkout — createDemoOrder", () => {
  it("retorna null para carrinho vazio", () => {
    expect(createDemoOrder(freshCart("moda"), NOIR_PRODUCTS)).toBeNull();
  });

  it("retorna null quando os itens não existem mais no catálogo", () => {
    const cart = {
      store: "moda" as const,
      updatedAt: Date.now(),
      items: [{ productId: "noir-fantasma", variantId: null, quantity: 1 }],
    };
    expect(createDemoOrder(cart, NOIR_PRODUCTS)).toBeNull();
  });

  it("gera pedido demonstrativo com identificador, itens e total fictícios", () => {
    const adicionado = addItem(freshCart("moda"), NOIR_PRODUCTS, {
      productId: produtoVariado.id,
      variantId: variacao.id,
      quantity: 2,
    });
    if (!adicionado.ok) throw new Error("adição deveria funcionar");

    const agora = new Date("2026-10-19T12:00:00.000Z");
    const pedido = createDemoOrder(adicionado.cart, NOIR_PRODUCTS, agora);
    expect(pedido).not.toBeNull();
    if (!pedido) return;

    expect(pedido.id.startsWith("DEMO-")).toBe(true);
    expect(pedido.store).toBe("moda");
    expect(pedido.demo).toBe(true);
    expect(pedido.createdAt).toBe(agora.toISOString());
    expect(pedido.itemCount).toBe(2);
    expect(pedido.total).toBe(produtoVariado.price * 2);
    expect(pedido.items).toHaveLength(1);
    expect(pedido.items[0].name).toBe(produtoVariado.name);
    expect(pedido.items[0].variantLabel).toBe(variacao.label);
    expect(pedido.items[0].quantity).toBe(2);
    expect(pedido.items[0].lineTotal).toBe(produtoVariado.price * 2);
  });

  it("o total do pedido bate com o total resolvido do carrinho", () => {
    const um = addItem(freshCart("eletronicos"), NEXUS_PRODUCTS, {
      productId: produtoSimples.id,
      quantity: 1,
    });
    if (!um.ok) throw new Error("adição deveria funcionar");
    const pedido = createDemoOrder(um.cart, NEXUS_PRODUCTS);
    const totals = resolveCart(um.cart, NEXUS_PRODUCTS);
    const soma = totals.reduce((acumulado, linha) => acumulado + linha.lineTotal, 0);
    expect(pedido?.total).toBe(soma);
  });
});
