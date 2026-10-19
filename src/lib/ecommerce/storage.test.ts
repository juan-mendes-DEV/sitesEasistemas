import { beforeEach, describe, it, expect } from "vitest";
import {
  cartStorageKey,
  isBrowser,
  loadCart,
  loadSelection,
  saveCart,
  saveSelection,
  selectionStorageKey,
} from "./storage";
import { addItem, freshCart } from "./cart";
import { MAX_COMPARE } from "./compare";
import { NOIR_PRODUCTS, NOIR_STORE } from "@/components/noir/data";
import { NEXUS_PRODUCTS, NEXUS_STORE } from "@/components/nexus/data";

const produtoVariado = NOIR_PRODUCTS.find((p) => p.variants?.length)!;
const variacao = produtoVariado.variants![0];
const produtoSimples = NEXUS_PRODUCTS[0];

beforeEach(() => {
  window.localStorage.clear();
});

describe("storage — chaves", () => {
  it("cada loja tem sua própria chave de carrinho", () => {
    expect(cartStorageKey("moda")).toBe("cm-ecommerce:cart:moda");
    expect(cartStorageKey("eletronicos")).toBe("cm-ecommerce:cart:eletronicos");
    expect(cartStorageKey("cosmeticos")).toBe("cm-ecommerce:cart:cosmeticos");
    expect(new Set([
      cartStorageKey("moda"),
      cartStorageKey("eletronicos"),
      cartStorageKey("cosmeticos"),
    ]).size).toBe(3);
  });

  it("as lojas declaram chaves coerentes com a engine", () => {
    expect(NOIR_STORE.cartStorageKey).toBe(cartStorageKey(NOIR_STORE.key));
    expect(NEXUS_STORE.cartStorageKey).toBe(cartStorageKey(NEXUS_STORE.key));
  });

  it("favoritos e comparador usam chaves distintas", () => {
    expect(selectionStorageKey("favoritos", "moda")).not.toBe(
      selectionStorageKey("comparador", "moda"),
    );
    expect(selectionStorageKey("favoritos", "moda")).not.toBe(
      selectionStorageKey("favoritos", "eletronicos"),
    );
  });

  it("isBrowser detecta o ambiente de teste", () => {
    expect(isBrowser()).toBe(true);
  });
});

describe("storage — carrinho", () => {
  it("roundtrip save/load preserva os itens da loja", () => {
    const adicionado = addItem(freshCart("moda"), NOIR_PRODUCTS, {
      productId: produtoVariado.id,
      variantId: variacao.id,
      quantity: 2,
    });
    if (!adicionado.ok) throw new Error("adição deveria funcionar");
    saveCart(adicionado.cart);

    const carregado = loadCart("moda", NOIR_PRODUCTS);
    expect(carregado.store).toBe("moda");
    expect(carregado.items).toEqual([
      { productId: produtoVariado.id, variantId: variacao.id, quantity: 2 },
    ]);
  });

  it("carrinho salvo numa loja não aparece na outra (isolamento)", () => {
    const adicionado = addItem(freshCart("moda"), NOIR_PRODUCTS, {
      productId: produtoVariado.id,
      variantId: variacao.id,
    });
    if (!adicionado.ok) throw new Error("adição deveria funcionar");
    saveCart(adicionado.cart);

    const daOutra = loadCart("eletronicos", NEXUS_PRODUCTS);
    expect(daOutra.store).toBe("eletronicos");
    expect(daOutra.items).toEqual([]);
  });

  it("payload com store divergente é ignorado", () => {
    window.localStorage.setItem(
      cartStorageKey("moda"),
      JSON.stringify({
        store: "eletronicos",
        items: [{ productId: produtoSimples.id, variantId: null, quantity: 1 }],
        updatedAt: Date.now(),
      }),
    );
    expect(loadCart("moda", NOIR_PRODUCTS).items).toEqual([]);
  });

  it("JSON corrompido resulta em carrinho vazio", () => {
    window.localStorage.setItem(cartStorageKey("moda"), "{nao-e-json");
    const cart = loadCart("moda", NOIR_PRODUCTS);
    expect(cart.items).toEqual([]);
    expect(cart.store).toBe("moda");
  });

  it("descarta itens de produtos desconhecidos e quantidades inválidas", () => {
    window.localStorage.setItem(
      cartStorageKey("moda"),
      JSON.stringify({
        store: "moda",
        items: [
          { productId: "noir-fantasma", variantId: null, quantity: 3 },
          { productId: produtoVariado.id, variantId: variacao.id, quantity: 0 },
          { productId: produtoVariado.id, variantId: variacao.id, quantity: -2 },
          "lixo",
          { productId: produtoVariado.id, variantId: variacao.id, quantity: 2 },
        ],
        updatedAt: Date.now(),
      }),
    );
    const cart = loadCart("moda", NOIR_PRODUCTS);
    expect(cart.items).toEqual([
      { productId: produtoVariado.id, variantId: variacao.id, quantity: 2 },
    ]);
  });

  it("linha de produto com variação sem variação escolhida é descartada", () => {
    window.localStorage.setItem(
      cartStorageKey("moda"),
      JSON.stringify({
        store: "moda",
        items: [{ productId: produtoVariado.id, variantId: null, quantity: 1 }],
        updatedAt: Date.now(),
      }),
    );
    expect(loadCart("moda", NOIR_PRODUCTS).items).toEqual([]);
  });
});

describe("storage — seleções (favoritos/comparador)", () => {
  it("roundtrip save/load preserva ids válidos e remove duplicatas", () => {
    const ids = [NOIR_PRODUCTS[0].id, NOIR_PRODUCTS[1].id];
    saveSelection("favoritos", "moda", [...ids, ids[0], "noir-fantasma"]);
    expect(loadSelection("favoritos", "moda", NOIR_PRODUCTS)).toEqual(ids);
  });

  it("seleção de uma loja não vaza para outra", () => {
    saveSelection("favoritos", "moda", [NOIR_PRODUCTS[0].id]);
    expect(loadSelection("favoritos", "eletronicos", NEXUS_PRODUCTS)).toEqual([]);
    expect(loadSelection("comparador", "moda", NOIR_PRODUCTS)).toEqual([]);
  });

  it("respeita o limite informado (comparador de até 3)", () => {
    const ids = NEXUS_PRODUCTS.slice(0, 5).map((p) => p.id);
    saveSelection("comparador", "eletronicos", ids);
    expect(
      loadSelection("comparador", "eletronicos", NEXUS_PRODUCTS, MAX_COMPARE),
    ).toEqual(ids.slice(0, MAX_COMPARE));
  });

  it("conteúdo inválido (não-array, tipos errados) retorna lista vazia", () => {
    window.localStorage.setItem(
      selectionStorageKey("favoritos", "moda"),
      JSON.stringify({ não: "é-array" }),
    );
    expect(loadSelection("favoritos", "moda", NOIR_PRODUCTS)).toEqual([]);

    window.localStorage.setItem(
      selectionStorageKey("favoritos", "moda"),
      JSON.stringify([42, null, NOIR_PRODUCTS[0].id]),
    );
    expect(loadSelection("favoritos", "moda", NOIR_PRODUCTS)).toEqual([
      NOIR_PRODUCTS[0].id,
    ]);
  });
});
