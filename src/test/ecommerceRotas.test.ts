import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { NOIR_PRODUCTS, NOIR_STORE } from "@/components/noir/data";
import { NEXUS_PRODUCTS, NEXUS_STORE } from "@/components/nexus/data";
import { BOTANICA_PRODUCTS, BOTANICA_STORE } from "@/components/botanica/data";
import NoirProdutoPage, {
  generateStaticParams as noirStaticParams,
} from "@/app/exemplos/ecommerce/moda/produtos/[slug]/page";
import NexusProdutoPage, {
  generateStaticParams as nexusStaticParams,
} from "@/app/exemplos/ecommerce/eletronicos/produtos/[slug]/page";
import BotanicaProdutoPage, {
  generateStaticParams as botanicaStaticParams,
} from "@/app/exemplos/ecommerce/cosmeticos/produtos/[slug]/page";

const raiz = process.cwd();
const app = path.join(raiz, "src/app");

interface Loja {
  nome: string;
  route: string;
  produtos: Array<{ slug: string }>;
  utilitarias: string[];
}

const lojas: Loja[] = [
  {
    nome: "NOIR Studio",
    route: NOIR_STORE.route,
    produtos: NOIR_PRODUCTS,
    utilitarias: ["favoritos"],
  },
  {
    nome: "NEXUS Tech Store",
    route: NEXUS_STORE.route,
    produtos: NEXUS_PRODUCTS,
    utilitarias: ["comparador"],
  },
  {
    nome: "Botânica Essence",
    route: BOTANICA_STORE.route,
    produtos: BOTANICA_PRODUCTS,
    utilitarias: [],
  },
];

describe("E-commerce — rotas no disco", () => {
  it("cada loja tem início, catálogo, carrinho, checkout e páginas utilitárias", () => {
    for (const loja of lojas) {
      const base = path.join(app, loja.route.replace(/^\//, ""));
      const secoes = ["", "produtos", "carrinho", "checkout", ...loja.utilitarias];
      for (const secao of secoes) {
        const arquivo = path.join(base, secao, "page.tsx");
        expect(
          fs.existsSync(arquivo),
          `falta ${loja.nome}: ${path.relative(raiz, arquivo)}`,
        ).toBe(true);
      }
    }
  });

  it("toda loja tem rota dinâmica de detalhe em [slug]/page.tsx", () => {
    for (const loja of lojas) {
      const arquivo = path.join(
        app,
        loja.route.replace(/^\//, ""),
        "produtos",
        "[slug]",
        "page.tsx",
      );
      expect(
        fs.existsSync(arquivo),
        `falta detalhe dinâmico: ${path.relative(raiz, arquivo)}`,
      ).toBe(true);
    }
  });
});

describe("E-commerce — páginas dinâmicas", () => {
  it("generateStaticParams cobre todos os produtos de cada loja", () => {
    const slugs = (lista: Array<{ slug: string }>) =>
      lista.map((item) => item.slug).sort();

    expect(slugs(noirStaticParams())).toEqual(slugs(NOIR_PRODUCTS));
    expect(slugs(nexusStaticParams())).toEqual(slugs(NEXUS_PRODUCTS));
    expect(slugs(botanicaStaticParams())).toEqual(slugs(BOTANICA_PRODUCTS));
  });

  it("slug inexistente cai em notFound() nas três lojas", async () => {
    const params = Promise.resolve({ slug: "produto-que-nao-existe" });
    await expect(NoirProdutoPage({ params })).rejects.toThrow();
    await expect(NexusProdutoPage({ params })).rejects.toThrow();
    await expect(BotanicaProdutoPage({ params })).rejects.toThrow();
  });
});

describe("E-commerce — indexação", () => {
  it("carrinho, checkout, favoritos e comparador são noindex", () => {
    const protegidas = [
      "exemplos/ecommerce/moda/carrinho/page.tsx",
      "exemplos/ecommerce/moda/checkout/page.tsx",
      "exemplos/ecommerce/moda/favoritos/page.tsx",
      "exemplos/ecommerce/eletronicos/carrinho/page.tsx",
      "exemplos/ecommerce/eletronicos/checkout/page.tsx",
      "exemplos/ecommerce/eletronicos/comparador/page.tsx",
      "exemplos/ecommerce/cosmeticos/carrinho/page.tsx",
      "exemplos/ecommerce/cosmeticos/checkout/page.tsx",
    ];
    for (const rota of protegidas) {
      const conteudo = fs.readFileSync(path.join(app, rota), "utf8");
      expect(conteudo, rota).toMatch(/robots:\s*\{\s*index:\s*false/);
    }
  });

  it("inícios e catálogos das lojas permanecem indexáveis", () => {
    const publicaveis = [
      "exemplos/ecommerce/moda/page.tsx",
      "exemplos/ecommerce/moda/produtos/page.tsx",
      "exemplos/ecommerce/eletronicos/page.tsx",
      "exemplos/ecommerce/eletronicos/produtos/page.tsx",
      "exemplos/ecommerce/cosmeticos/page.tsx",
      "exemplos/ecommerce/cosmeticos/produtos/page.tsx",
    ];
    for (const rota of publicaveis) {
      const conteudo = fs.readFileSync(path.join(app, rota), "utf8");
      expect(conteudo, rota).not.toMatch(/index:\s*false/);
    }
  });
});

describe("E-commerce — sitemap", () => {
  const urls = sitemap().map((entrada) => entrada.url);
  const base = "https://codemaestrotech.com.br";

  it("inclui início, catálogo e detalhes de todos os produtos", () => {
    for (const loja of lojas) {
      expect(urls).toContain(`${base}${loja.route}`);
      expect(urls).toContain(`${base}${loja.route}/produtos`);
      for (const produto of loja.produtos) {
        expect(urls).toContain(
          `${base}${loja.route}/produtos/${produto.slug}`,
        );
      }
    }
  });

  it("exclui carrinho, checkout e páginas utilitárias", () => {
    for (const proibida of ["/carrinho", "/checkout", "/favoritos", "/comparador"]) {
      expect(
        urls.some((url) => url.includes(proibida)),
        `não deveria conter: ${proibida}`,
      ).toBe(false);
    }
  });
});
