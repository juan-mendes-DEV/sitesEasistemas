import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { NEXUS_CATEGORIES, NEXUS_PRICE_RANGES, NEXUS_PRODUCTS, NEXUS_STORE } from "./data";
import { cartStorageKey } from "@/lib/ecommerce/storage";

const raiz = process.cwd();

function imagemExiste(src: string): boolean {
  return fs.existsSync(path.join(raiz, "public", src.replace(/^\//, "")));
}

const textoDoArquivo = fs.readFileSync(
  path.join(raiz, "src/components/nexus/data.ts"),
  "utf8",
);

describe("NEXUS Tech Store — estrutura do catálogo", () => {
  it("possui ao menos 12 produtos demonstrativos", () => {
    expect(NEXUS_PRODUCTS.length).toBeGreaterThanOrEqual(12);
  });

  it("ids e slugs são únicos e ids seguem o padrão nexus-", () => {
    const ids = NEXUS_PRODUCTS.map((p) => p.id);
    const slugs = NEXUS_PRODUCTS.map((p) => p.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const product of NEXUS_PRODUCTS) {
      expect(product.id.startsWith("nexus-")).toBe(true);
    }
  });

  it("a loja aponta para a rota e a chave de carrinho corretas", () => {
    expect(NEXUS_STORE.key).toBe("eletronicos");
    expect(NEXUS_STORE.route).toBe("/exemplos/ecommerce/eletronicos");
    expect(NEXUS_STORE.cartStorageKey).toBe(cartStorageKey("eletronicos"));
  });

  it("todas as categorias esperadas existem e estão preenchidas", () => {
    const esperadas = [
      "smartphones",
      "fones",
      "teclados",
      "mouses",
      "monitores",
      "acessorios",
    ];
    expect(NEXUS_CATEGORIES.map((c) => c.id).sort()).toEqual(esperadas.sort());
    for (const id of esperadas) {
      expect(NEXUS_PRODUCTS.some((p) => p.category === id)).toBe(true);
    }
    const ids = NEXUS_CATEGORIES.map((c) => c.id);
    for (const product of NEXUS_PRODUCTS) {
      expect(ids).toContain(product.category);
    }
  });

  it("preços, estoques e descrições são preenchidos", () => {
    for (const product of NEXUS_PRODUCTS) {
      expect(product.price).toBeGreaterThan(0);
      expect(product.stock).toBeGreaterThanOrEqual(0);
      expect(product.description.length).toBeGreaterThan(20);
    }
  });
});

describe("NEXUS Tech Store — fichas técnicas", () => {
  it("todo produto tem ficha com pelo menos três linhas", () => {
    for (const product of NEXUS_PRODUCTS) {
      expect(product.specs?.length ?? 0).toBeGreaterThanOrEqual(3);
      for (const spec of product.specs!) {
        expect(spec.label.trim().length).toBeGreaterThan(0);
        expect(spec.value === null || typeof spec.value === "string").toBe(true);
      }
    }
  });

  it("o catálogo tem atributos não informados (exibidos como “Não disponível”)", () => {
    const comNulo = NEXUS_PRODUCTS.filter((p) =>
      p.specs!.some((s) => s.value === null),
    );
    expect(comNulo.length).toBeGreaterThan(0);
  });

  it("cada produto se encaixa em exatamente uma faixa de preço", () => {
    for (const product of NEXUS_PRODUCTS) {
      const faixas = NEXUS_PRICE_RANGES.filter(
        (r) => product.price >= r.min && product.price < r.max,
      );
      expect(faixas).toHaveLength(1);
    }
  });
});

describe("NEXUS Tech Store — imagens otimizadas locais", () => {
  it("cada produto tem imagem principal e de detalhe existentes no disco", () => {
    for (const product of NEXUS_PRODUCTS) {
      expect(product.images.length).toBeGreaterThanOrEqual(2);
      for (const src of product.images) {
        expect(src.startsWith("/imgs/nexus/")).toBe(true);
        expect(imagemExiste(src)).toBe(true);
      }
      expect(product.images[0]).not.toBe(product.images[1]);
    }
  });
});

describe("NEXUS Tech Store — dados fictícios honestos", () => {
  it("não nomeia marcas, sistemas ou fabricantes reais", () => {
    expect(textoDoArquivo).not.toMatch(
      /\b(Samsung|Apple|iPhone|Xiaomi|Sony|JBL|Bose|Beats|LG|Dell|HP|Lenovo|ASUS|Acer|Logitech|Razer|Anker|Motorola|Intel|AMD|Nvidia|Canon|Nikon)\b/i,
    );
    expect(textoDoArquivo).not.toMatch(/\b(Android|iOS|Windows|macOS)\b/);
  });

  it("não contém contatos, registros ou estética gamer", () => {
    expect(textoDoArquivo).not.toMatch(/whatsapp|wa\.me/i);
    expect(textoDoArquivo).not.toMatch(/\(\d{2}\)\s?\d{4,5}-?\d{4}/);
    expect(textoDoArquivo).not.toMatch(/\bCNPJ\b/);
    expect(textoDoArquivo).not.toMatch(/\b(CREA|CRO|CRECI)\b/);
    expect(textoDoArquivo).not.toMatch(/\b(gamer|rgb|player)\b/i);
  });
});
