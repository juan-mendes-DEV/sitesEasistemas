import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { NOIR_CATEGORIES, NOIR_PRODUCTS, NOIR_STORE } from "./data";
import { cartStorageKey } from "@/lib/ecommerce/storage";

const raiz = process.cwd();

function imagemExiste(src: string): boolean {
  return fs.existsSync(path.join(raiz, "public", src.replace(/^\//, "")));
}

const textoDoArquivo = fs.readFileSync(
  path.join(raiz, "src/components/noir/data.ts"),
  "utf8",
);

describe("NOIR Studio — estrutura do catálogo", () => {
  it("possui ao menos 12 produtos demonstrativos", () => {
    expect(NOIR_PRODUCTS.length).toBeGreaterThanOrEqual(12);
  });

  it("ids e slugs são únicos e ids seguem o padrão noir-", () => {
    const ids = NOIR_PRODUCTS.map((p) => p.id);
    const slugs = NOIR_PRODUCTS.map((p) => p.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const product of NOIR_PRODUCTS) {
      expect(product.id).toBe(`noir-${product.slug}`);
    }
  });

  it("a loja aponta para a rota e a chave de carrinho corretas", () => {
    expect(NOIR_STORE.key).toBe("moda");
    expect(NOIR_STORE.route).toBe("/exemplos/ecommerce/moda");
    expect(NOIR_STORE.cartStorageKey).toBe(cartStorageKey("moda"));
  });

  it("todos os produtos pertencem a categorias declaradas e todas são usadas", () => {
    const ids = NOIR_CATEGORIES.map((c) => c.id);
    for (const product of NOIR_PRODUCTS) {
      expect(ids).toContain(product.category);
    }
    for (const id of ids) {
      expect(NOIR_PRODUCTS.some((p) => p.category === id)).toBe(true);
    }
  });

  it("preços e descrições são preenchidos", () => {
    for (const product of NOIR_PRODUCTS) {
      expect(product.price).toBeGreaterThan(0);
      expect(product.description.length).toBeGreaterThan(20);
      expect(product.name.length).toBeGreaterThan(3);
    }
  });
});

describe("NOIR Studio — variantes tamanho × cor", () => {
  const comVariantes = NOIR_PRODUCTS.filter((p) => p.category !== "acessorios");
  const acessorios = NOIR_PRODUCTS.filter((p) => p.category === "acessorios");

  it("roupas sempre têm tamanho, cor e variações geradas", () => {
    expect(comVariantes.length).toBeGreaterThanOrEqual(10);
    for (const product of comVariantes) {
      expect(product.sizes?.length).toBeGreaterThan(0);
      expect(product.colors?.length).toBeGreaterThan(0);
      expect(product.variants).toHaveLength(
        product.sizes!.length * product.colors!.length,
      );
    }
  });

  it("cada variação combina tamanho e cor com rótulo legível", () => {
    for (const product of comVariantes) {
      for (const variacao of product.variants!) {
        expect(product.sizes!).toContain(variacao.size);
        expect(product.colors!).toContain(variacao.color);
        expect(variacao.label).toBe(`${variacao.size} · ${variacao.color}`);
        expect(variacao.stock).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it("o catálogo inclui combinações esgotadas e disponíveis (UI de estoque)", () => {
    const todas = comVariantes.flatMap((p) => p.variants!);
    expect(todas.some((v) => v.stock === 0)).toBe(true);
    expect(todas.some((v) => v.stock > 0)).toBe(true);
  });

  it("acessórios são produto simples com estoque próprio", () => {
    expect(acessorios.length).toBeGreaterThanOrEqual(3);
    for (const product of acessorios) {
      expect(product.variants).toBeUndefined();
      expect(product.stock).toBeGreaterThan(0);
    }
  });
});

describe("NOIR Studio — imagens otimizadas locais", () => {
  it("cada produto tem imagem principal e de detalhe existentes no disco", () => {
    for (const product of NOIR_PRODUCTS) {
      expect(product.images.length).toBeGreaterThanOrEqual(2);
      for (const src of product.images) {
        expect(src.startsWith("/imgs/noir/")).toBe(true);
        expect(imagemExiste(src)).toBe(true);
      }
      expect(product.images[0]).not.toBe(product.images[1]);
    }
  });
});

describe("NOIR Studio — dados fictícios honestos", () => {
  it("não contém contatos, registros profissionais ou marcas reais", () => {
    expect(textoDoArquivo).not.toMatch(/whatsapp|wa\.me/i);
    expect(textoDoArquivo).not.toMatch(/\(\d{2}\)\s?\d{4,5}-?\d{4}/);
    expect(textoDoArquivo).not.toMatch(/\bCNPJ\b/);
    expect(textoDoArquivo).not.toMatch(/\b(CREA|CRO|CRECI)\b/);
    expect(textoDoArquivo).not.toMatch(
      /\b(Nike|Adidas|Puma|Fila|Reebok|Zara|Levi'?s|Gucci|Tommy|Calvin Klein|New Balance|Havaianas|Arezzo|Columbia|Under Armour|Shein|Renner|C&A)\b/i,
    );
  });
});
