import { describe, it, expect } from "vitest";
import { activeFilterCount, applyCatalogQuery, normalizeTerm, sortProducts } from "./catalog";
import type { CatalogQuery } from "@/types/ecommerce";
import { NOIR_CATEGORIES, NOIR_PRODUCTS } from "@/components/noir/data";
import {
  NEXUS_CATEGORIES,
  NEXUS_PRICE_RANGES,
  NEXUS_PRODUCTS,
} from "@/components/nexus/data";
import {
  BOTANICA_CATEGORIES,
  BOTANICA_PRICE_RANGES,
  BOTANICA_PRODUCTS,
} from "@/components/botanica/data";

const base: CatalogQuery = {
  term: "",
  category: null,
  priceRange: null,
  sort: "relevancia",
};

describe("catalog — busca", () => {
  it("normalizeTerm aparas e caixa-baixa", () => {
    expect(normalizeTerm("  Vestido ")).toBe("vestido");
  });

  it("encontra produtos pelo nome", () => {
    const results = applyCatalogQuery(NOIR_PRODUCTS, NOIR_CATEGORIES, [], {
      ...base,
      term: "vestido",
    });
    const esperados = NOIR_PRODUCTS.filter((p) => p.category === "vestidos");
    expect(esperados.length).toBeGreaterThan(0);
    expect(results).toHaveLength(esperados.length);
  });

  it("busca também casa na descrição e no rótulo da categoria", () => {
    const results = applyCatalogQuery(NEXUS_PRODUCTS, NEXUS_CATEGORIES, [], {
      ...base,
      term: "teclados",
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.category === "teclados")).toBe(true);
  });

  it("termo sem correspondência retorna lista vazia", () => {
    const results = applyCatalogQuery(
      BOTANICA_PRODUCTS,
      BOTANICA_CATEGORIES,
      BOTANICA_PRICE_RANGES,
      { ...base, term: "produto-inexistente-xyz" },
    );
    expect(results).toEqual([]);
  });

  it("busca sem termo devolve o catálogo inteiro", () => {
    const results = applyCatalogQuery(NOIR_PRODUCTS, NOIR_CATEGORIES, [], base);
    expect(results).toHaveLength(NOIR_PRODUCTS.length);
  });
});

describe("catalog — filtros", () => {
  it("filtra por categoria", () => {
    const results = applyCatalogQuery(NEXUS_PRODUCTS, NEXUS_CATEGORIES, [], {
      ...base,
      category: "teclados",
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.category === "teclados")).toBe(true);
  });

  it("filtra por faixa de preço com limite superior exclusivo", () => {
    const faixa = NEXUS_PRICE_RANGES.find((r) => r.id === "300-800")!;
    const results = applyCatalogQuery(
      NEXUS_PRODUCTS,
      NEXUS_CATEGORIES,
      NEXUS_PRICE_RANGES,
      { ...base, priceRange: "300-800" },
    );
    expect(
      results.every((p) => p.price >= faixa.min && p.price < faixa.max),
    ).toBe(true);
    const esperados = NEXUS_PRODUCTS.filter(
      (p) => p.price >= faixa.min && p.price < faixa.max,
    );
    expect(results).toHaveLength(esperados.length);
  });

  it("combina categoria + faixa de preço", () => {
    const results = applyCatalogQuery(
      BOTANICA_PRODUCTS,
      BOTANICA_CATEGORIES,
      BOTANICA_PRICE_RANGES,
      { ...base, category: "kits", priceRange: "200-em-diante" },
    );
    const esperados = BOTANICA_PRODUCTS.filter(
      (p) => p.category === "kits" && p.price >= 200,
    );
    expect(results).toHaveLength(esperados.length);
    expect(results.every((p) => p.category === "kits")).toBe(true);
  });

  it("faixa desconhecida não altera o resultado", () => {
    const results = applyCatalogQuery(
      NEXUS_PRODUCTS,
      NEXUS_CATEGORIES,
      NEXUS_PRICE_RANGES,
      { ...base, priceRange: "faixa-fantasma" },
    );
    expect(results).toHaveLength(NEXUS_PRODUCTS.length);
  });

  it("activeFilterCount conta categoria e faixa, mas não a busca", () => {
    expect(activeFilterCount({ ...base, term: "fone" })).toBe(0);
    expect(activeFilterCount({ ...base, category: "fones" })).toBe(1);
    expect(
      activeFilterCount({ ...base, category: "fones", priceRange: "ate-300" }),
    ).toBe(2);
  });
});

describe("catalog — ordenação", () => {
  it("preco-asc e preco-desc são monotônicos", () => {
    const asc = sortProducts(NOIR_PRODUCTS, "preco-asc");
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i].price).toBeGreaterThanOrEqual(asc[i - 1].price);
    }
    const desc = sortProducts(NOIR_PRODUCTS, "preco-desc");
    for (let i = 1; i < desc.length; i++) {
      expect(desc[i].price).toBeLessThanOrEqual(desc[i - 1].price);
    }
  });

  it("nome-asc ordena alfabeticamente em pt-BR", () => {
    const ordenado = sortProducts(BOTANICA_PRODUCTS, "nome-asc");
    for (let i = 1; i < ordenado.length; i++) {
      expect(
        ordenado[i - 1].name.localeCompare(ordenado[i].name, "pt-BR"),
      ).toBeLessThanOrEqual(0);
    }
  });

  it("relevância preserva a ordem original", () => {
    const resultado = sortProducts(NEXUS_PRODUCTS, "relevancia");
    expect(resultado.map((p) => p.id)).toEqual(NEXUS_PRODUCTS.map((p) => p.id));
  });

  it("a ordenação respeitada chega ao resultado final do catálogo", () => {
    const results = applyCatalogQuery(
      NEXUS_PRODUCTS,
      NEXUS_CATEGORIES,
      NEXUS_PRICE_RANGES,
      { ...base, sort: "preco-asc" },
    );
    for (let i = 1; i < results.length; i++) {
      expect(results[i].price).toBeGreaterThanOrEqual(results[i - 1].price);
    }
  });
});
