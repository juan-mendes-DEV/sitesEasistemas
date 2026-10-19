import { describe, it, expect } from "vitest";
import {
  ADD_ITEM_MESSAGES,
  addItem,
  cartTotals,
  findVariant,
  freshCart,
  lineKey,
  removeItem,
  resolveCart,
  setItemQuantity,
  validateCart,
} from "./cart";
import { NOIR_PRODUCTS } from "@/components/noir/data";
import { NEXUS_PRODUCTS } from "@/components/nexus/data";

const produtoVariado = NOIR_PRODUCTS.find((p) => p.variants?.length)!;
const variacaoOk = produtoVariado.variants!.find((v) => v.stock >= 2)!;
const produtoComEsgotado = NOIR_PRODUCTS.find((p) =>
  p.variants?.some((v) => v.stock === 0),
)!;
const variacaoEsgotada = produtoComEsgotado.variants!.find((v) => v.stock === 0)!;
const produtoSimples = NEXUS_PRODUCTS[0];

describe("cart — identidade e carrinho vazio", () => {
  it("freshCart cria um carrinho vazio para a loja informada", () => {
    const cart = freshCart("moda");
    expect(cart.store).toBe("moda");
    expect(cart.items).toEqual([]);
    expect(cart.updatedAt).toBeGreaterThan(0);
  });

  it("carrinhos de lojas distintas não compartilham identidade", () => {
    expect(freshCart("moda").store).not.toBe(freshCart("eletronicos").store);
  });

  it("lineKey distingue variações do mesmo produto", () => {
    expect(lineKey(produtoVariado.id, null)).not.toBe(
      lineKey(produtoVariado.id, variacaoOk.id),
    );
    expect(lineKey(produtoVariado.id, variacaoOk.id)).toBe(
      `${produtoVariado.id}::${variacaoOk.id}`,
    );
  });

  it("findVariant localiza a variação correta", () => {
    expect(findVariant(produtoVariado, variacaoOk.id)?.id).toBe(variacaoOk.id);
    expect(findVariant(produtoVariado, "nao-existe")).toBeNull();
    expect(findVariant(produtoSimples, null)).toBeNull();
  });
});

describe("cart — addItem", () => {
  it("rejeita produto que não existe na loja", () => {
    const result = addItem(freshCart("moda"), NOIR_PRODUCTS, {
      productId: "noir-fantasma",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("produto-invalido");
      expect(ADD_ITEM_MESSAGES[result.reason]).toContain("não encontrado");
    }
  });

  it("exige a seleção de variação antes de adicionar", () => {
    const result = addItem(freshCart("moda"), NOIR_PRODUCTS, {
      productId: produtoVariado.id,
      variantId: null,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("variacao-obrigatoria");
      expect(ADD_ITEM_MESSAGES[result.reason]).toContain("Selecione as opções");
    }
  });

  it("rejeita variação inexistente no produto", () => {
    const result = addItem(freshCart("moda"), NOIR_PRODUCTS, {
      productId: produtoVariado.id,
      variantId: "variacao-fantasma",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("variacao-invalida");
  });

  it("rejeita variação em produto que não tem variações", () => {
    const result = addItem(freshCart("eletronicos"), NEXUS_PRODUCTS, {
      productId: produtoSimples.id,
      variantId: "qualquer",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("variacao-invalida");
  });

  it("rejeita variação esgotada no estoque demonstrativo", () => {
    const result = addItem(freshCart("moda"), NOIR_PRODUCTS, {
      productId: produtoComEsgotado.id,
      variantId: variacaoEsgotada.id,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("estoque-esgotado");
      expect(ADD_ITEM_MESSAGES[result.reason]).toContain("Esgotado");
    }
  });

  it("adiciona produto sem variação com quantity controlada pelo estoque", () => {
    const result = addItem(freshCart("eletronicos"), NEXUS_PRODUCTS, {
      productId: produtoSimples.id,
      quantity: 999,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.cart.items).toHaveLength(1);
      expect(result.cart.items[0].variantId).toBeNull();
      expect(result.cart.items[0].quantity).toBe(produtoSimples.stock);
    }
  });

  it("limita a quantidade à variação escolhida", () => {
    const result = addItem(freshCart("moda"), NOIR_PRODUCTS, {
      productId: produtoVariado.id,
      variantId: variacaoOk.id,
      quantity: 999,
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.cart.items[0].quantity).toBe(variacaoOk.stock);
  });

  it("acumula a mesma variação em uma única linha", () => {
    const primeiro = addItem(freshCart("moda"), NOIR_PRODUCTS, {
      productId: produtoVariado.id,
      variantId: variacaoOk.id,
      quantity: 1,
    });
    expect(primeiro.ok).toBe(true);
    if (!primeiro.ok) return;

    const segundo = addItem(primeiro.cart, NOIR_PRODUCTS, {
      productId: produtoVariado.id,
      variantId: variacaoOk.id,
      quantity: 1,
    });
    expect(segundo.ok).toBe(true);
    if (segundo.ok) {
      expect(segundo.cart.items).toHaveLength(1);
      expect(segundo.cart.items[0].quantity).toBe(2);
    }
  });

  it("mantém variações diferentes em linhas separadas", () => {
    const outra = produtoVariado.variants!.find(
      (v) => v.id !== variacaoOk.id && v.stock > 0,
    )!;
    const primeiro = addItem(freshCart("moda"), NOIR_PRODUCTS, {
      productId: produtoVariado.id,
      variantId: variacaoOk.id,
    });
    if (!primeiro.ok) throw new Error("primeira adição deveria funcionar");
    const segundo = addItem(primeiro.cart, NOIR_PRODUCTS, {
      productId: produtoVariado.id,
      variantId: outra.id,
    });
    expect(segundo.ok).toBe(true);
    if (segundo.ok) expect(segundo.cart.items).toHaveLength(2);
  });
});

describe("cart — removeItem e setItemQuantity", () => {
  function cartComDuasLinhas() {
    const outra = produtoVariado.variants!.find(
      (v) => v.id !== variacaoOk.id && v.stock > 0,
    )!;
    const um = addItem(freshCart("moda"), NOIR_PRODUCTS, {
      productId: produtoVariado.id,
      variantId: variacaoOk.id,
    });
    const dois = um.ok
      ? addItem(um.cart, NOIR_PRODUCTS, {
          productId: produtoVariado.id,
          variantId: outra.id,
        })
      : null;
    if (!dois || !dois.ok) throw new Error("montagem do carrinho falhou");
    return { cart: dois.cart, chaveOutra: lineKey(produtoVariado.id, outra.id) };
  }

  it("remove somente a linha alvo", () => {
    const { cart, chaveOutra } = cartComDuasLinhas();
    const result = removeItem(cart, chaveOutra);
    expect(result.items).toHaveLength(1);
    expect(result.items[0].variantId).toBe(variacaoOk.id);
  });

  it("quantidade zero remove a linha", () => {
    const { cart, chaveOutra } = cartComDuasLinhas();
    const result = setItemQuantity(cart, NOIR_PRODUCTS, chaveOutra, 0);
    expect(result.items).toHaveLength(1);
  });

  it("quantidade acima do estoque é limitada ao estoque da variação", () => {
    const { cart, chaveOutra } = cartComDuasLinhas();
    const result = setItemQuantity(cart, NOIR_PRODUCTS, chaveOutra, 999);
    const linha = result.items.find(
      (item) => lineKey(item.productId, item.variantId) === chaveOutra,
    );
    const estoque = produtoVariado.variants!.find(
      (v) => v.id === linha?.variantId,
    )!.stock;
    expect(linha?.quantity).toBe(estoque);
  });

  it("chave desconhecida devolve o carrinho intacto", () => {
    const { cart } = cartComDuasLinhas();
    const result = setItemQuantity(cart, NOIR_PRODUCTS, "chave-fantasma", 5);
    expect(result.items).toHaveLength(cart.items.length);
  });
});

describe("cart — resolveCart e validateCart", () => {
  it("descarta produtos inexistentes e itens malformados", () => {
    const cart = {
      store: "moda" as const,
      updatedAt: Date.now(),
      items: [
        { productId: "noir-fantasma", variantId: null, quantity: 2 },
        { productId: produtoVariado.id, variantId: null, quantity: 1 },
        { productId: produtoVariado.id, variantId: variacaoOk.id, quantity: 0 },
        { productId: produtoVariado.id, variantId: variacaoOk.id, quantity: -4 },
      ],
    };
    const resolvidos = resolveCart(cart, NOIR_PRODUCTS);
    expect(resolvidos).toHaveLength(0);
  });

  it("mescla duplicatas da mesma linha", () => {
    const cart = {
      store: "moda" as const,
      updatedAt: Date.now(),
      items: [
        { productId: produtoVariado.id, variantId: variacaoOk.id, quantity: 1 },
        { productId: produtoVariado.id, variantId: variacaoOk.id, quantity: 1 },
      ],
    };
    const resolvidos = resolveCart(cart, NOIR_PRODUCTS);
    expect(resolvidos).toHaveLength(1);
    expect(resolvidos[0].quantity).toBe(2);
    expect(resolvidos[0].lineTotal).toBe(produtoVariado.price * 2);
  });

  it("validateCart preserva a loja e normaliza os itens", () => {
    const cart = {
      store: "moda" as const,
      updatedAt: 123,
      items: [
        { productId: produtoVariado.id, variantId: variacaoOk.id, quantity: 7 },
        { productId: "noir-fantasma", variantId: null, quantity: 1 },
      ],
    };
    const validado = validateCart(cart, NOIR_PRODUCTS);
    expect(validado.store).toBe("moda");
    expect(validado.updatedAt).toBe(123);
    expect(validado.items).toHaveLength(1);
    expect(validado.items[0].quantity).toBe(variacaoOk.stock);
  });
});

describe("cart — cartTotals", () => {
  it("soma unidades e valores das linhas", () => {
    const cart = {
      store: "moda" as const,
      updatedAt: Date.now(),
      items: [
        { productId: produtoVariado.id, variantId: variacaoOk.id, quantity: 2 },
      ],
    };
    const totals = cartTotals(resolveCart(cart, NOIR_PRODUCTS));
    expect(totals.itemCount).toBe(2);
    expect(totals.subtotal).toBe(produtoVariado.price * 2);
    expect(totals.total).toBe(totals.subtotal);
  });

  it("carrinho vazio zera tudo", () => {
    const totals = cartTotals([]);
    expect(totals).toEqual({ itemCount: 0, subtotal: 0, total: 0 });
  });
});
