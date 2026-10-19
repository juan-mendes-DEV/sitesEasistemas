import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import {
  BOTANICA_CATEGORIES,
  BOTANICA_PRICE_RANGES,
  BOTANICA_NOTICE,
  BOTANICA_PRODUCTS,
  BOTANICA_STORE,
} from "./data";
import { cartStorageKey } from "@/lib/ecommerce/storage";

const raiz = process.cwd();

function imagemExiste(src: string): boolean {
  return fs.existsSync(path.join(raiz, "public", src.replace(/^\//, "")));
}

const textoDoArquivo = fs.readFileSync(
  path.join(raiz, "src/components/botanica/data.ts"),
  "utf8",
);

/** Alegações médicas ou de eficácia proibidas no conteúdo dos produtos. */
const ALEGACAO_PROIBIDA =
  /\bcura\b|\bcurar\b|\btratament\w*|\bcl[íi]nicamente\b|\bcomprovad\w*|\befic[áa]cia\b|\bterap[êe]utic\w*|\bprescri[çc]\w*|\bmedicament\w*|\bdermatologic\w*|\bmilagr\w*|\brem[eé]dio\b/i;

/**
 * Detecta alegação sem negação no trecho: frases como "sem promessa de
 * eficácia" ou "não faz alegações terapêuticas" são avisos honestos e
 * passam; uma afirmação positiva ("cura acne") é reprovada.
 */
function contemAlegacaoNaoNegada(texto: string): boolean {
  const regex = new RegExp(ALEGACAO_PROIBIDA.source, "gi");
  let match = regex.exec(texto);
  while (match !== null) {
    const antes = texto.slice(Math.max(0, match.index - 60), match.index);
    const negado = /\b(sem|não|nenhum\w*|livre de|ausência de)\b[^.!?]*$/i.test(
      antes,
    );
    if (!negado) return true;
    match = regex.exec(texto);
  }
  return false;
}

function conteudoDoProduto(
  product: (typeof BOTANICA_PRODUCTS)[number],
): string {
  return [
    product.name,
    product.description,
    product.badge ?? "",
    product.volume ?? "",
    ...(product.ingredients ?? []),
    ...(product.kitContents ?? []),
  ].join(" ");
}

describe("Botânica Essence — estrutura do catálogo", () => {
  it("possui ao menos 12 produtos demonstrativos", () => {
    expect(BOTANICA_PRODUCTS.length).toBeGreaterThanOrEqual(12);
  });

  it("ids e slugs são únicos e ids seguem o padrão bot-", () => {
    const ids = BOTANICA_PRODUCTS.map((p) => p.id);
    const slugs = BOTANICA_PRODUCTS.map((p) => p.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const product of BOTANICA_PRODUCTS) {
      expect(product.id.startsWith("bot-")).toBe(true);
    }
  });

  it("a loja aponta para a rota e a chave de carrinho corretas", () => {
    expect(BOTANICA_STORE.key).toBe("cosmeticos");
    expect(BOTANICA_STORE.route).toBe("/exemplos/ecommerce/cosmeticos");
    expect(BOTANICA_STORE.cartStorageKey).toBe(cartStorageKey("cosmeticos"));
  });

  it("todas as categorias esperadas existem e estão preenchidas", () => {
    const esperadas = ["hidratantes", "serums", "sabonetes", "oleos", "kits"];
    expect(BOTANICA_CATEGORIES.map((c) => c.id).sort()).toEqual(
      esperadas.sort(),
    );
    const ids = BOTANICA_CATEGORIES.map((c) => c.id);
    for (const product of BOTANICA_PRODUCTS) {
      expect(ids).toContain(product.category);
    }
    for (const id of esperadas) {
      expect(BOTANICA_PRODUCTS.some((p) => p.category === id)).toBe(true);
    }
  });

  it("cada produto se encaixa em exatamente uma faixa de preço", () => {
    for (const product of BOTANICA_PRODUCTS) {
      expect(product.price).toBeGreaterThan(0);
      const faixas = BOTANICA_PRICE_RANGES.filter(
        (r) => product.price >= r.min && product.price < r.max,
      );
      expect(faixas).toHaveLength(1);
    }
  });
});

describe("Botânica Essence — fichas de produto", () => {
  it("todo produto declara volume demonstrativo", () => {
    for (const product of BOTANICA_PRODUCTS) {
      expect(product.volume?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it("todo produto declara ingredientes ilustrativos", () => {
    for (const product of BOTANICA_PRODUCTS) {
      expect(product.ingredients?.length ?? 0).toBeGreaterThan(0);
      for (const item of product.ingredients!) {
        expect(item.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("kits listam o conteúdo item a item", () => {
    const kits = BOTANICA_PRODUCTS.filter((p) => p.category === "kits");
    expect(kits.length).toBeGreaterThanOrEqual(1);
    for (const kit of kits) {
      expect(kit.kitContents?.length ?? 0).toBeGreaterThanOrEqual(2);
    }
  });

  it("nenhuma ficha contém alegação médica ou de eficácia afirmada", () => {
    for (const product of BOTANICA_PRODUCTS) {
      expect(contemAlegacaoNaoNegada(conteudoDoProduto(product))).toBe(false);
    }
  });

  it("controle: o detector reprova alegação afirmada e aceita aviso negado", () => {
    expect(contemAlegacaoNaoNegada("Fórmula que cura acne comprovadamente")).toBe(
      true,
    );
    expect(
      contemAlegacaoNaoNegada("Resultados comprovados em teste clínico"),
    ).toBe(true);
    expect(contemAlegacaoNaoNegada("Sem promessa de eficácia.")).toBe(false);
    expect(
      contemAlegacaoNaoNegada("Esta loja não faz alegações terapêuticas."),
    ).toBe(false);
  });
});

describe("Botânica Essence — imagens otimizadas locais", () => {
  it("cada produto tem imagem principal e de detalhe existentes no disco", () => {
    for (const product of BOTANICA_PRODUCTS) {
      expect(product.images.length).toBeGreaterThanOrEqual(2);
      for (const src of product.images) {
        expect(src.startsWith("/imgs/botanica/")).toBe(true);
        expect(imagemExiste(src)).toBe(true);
      }
      expect(product.images[0]).not.toBe(product.images[1]);
    }
  });
});

describe("Botânica Essence — dados fictícios honestos", () => {
  it("não contém registros sanitários, certificações, contatos ou marcas reais", () => {
    expect(textoDoArquivo).not.toMatch(/\b(ANVISA|FDA|ISO 9001)\b/);
    expect(textoDoArquivo).not.toMatch(/\bCNPJ\b/);
    expect(textoDoArquivo).not.toMatch(/\b(CREA|CRO|CRECI)\b/);
    expect(textoDoArquivo).not.toMatch(/whatsapp|wa\.me/i);
    expect(textoDoArquivo).not.toMatch(/\(\d{2}\)\s?\d{4,5}-?\d{4}/);
    expect(textoDoArquivo).not.toMatch(
      /\b(Natura|Botic[áa]rio|L'?Or[ée]al|Dove|Nivea|CeraVe|Chanel|Pond'?s|Neutrogena|Bioderma|Curology|Garnier|Olay|Johnson'?s)\b/i,
    );
  });

  it("o aviso da loja deixa explícita a ausência de alegações e certificações", () => {
    expect(BOTANICA_NOTICE).toContain("não faz alegações médicas");
    expect(BOTANICA_NOTICE).toContain("não possui certificações");
  });
});
