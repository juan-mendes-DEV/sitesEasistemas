import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { PROJECTS, getProjectBySlug } from "@/lib/catalog";

const raiz = process.cwd();
const app = path.join(raiz, "src/app");

const sistemas = [
  { slug: "estoque", config: "SISTEMA_ESTOQUE" },
  { slug: "agendamentos", config: "SISTEMA_AGENDAMENTOS" },
  { slug: "pedidos", config: "SISTEMA_PEDIDOS" },
];

const base = "https://codemaestro.tech";

describe("Sistemas — rotas no disco", () => {
  it("cada sistema tem sua página em src/app/exemplos/sistemas/<slug>/page.tsx", () => {
    for (const sistema of sistemas) {
      const arquivo = path.join(
        app,
        "exemplos",
        "sistemas",
        sistema.slug,
        "page.tsx",
      );
      expect(
        fs.existsSync(arquivo),
        `falta ${path.relative(raiz, arquivo)}`,
      ).toBe(true);
    }
  });

  it("a antiga rota temporária de financeiro foi removida", () => {
    expect(
      fs.existsSync(path.join(app, "exemplos", "sistemas", "financeiro")),
    ).toBe(false);
  });

  it("todas as páginas renderizam o SystemPanel com a config do sistema", () => {
    for (const sistema of sistemas) {
      const arquivo = path.join(
        app,
        "exemplos",
        "sistemas",
        sistema.slug,
        "page.tsx",
      );
      const conteudo = fs.readFileSync(arquivo, "utf8");
      expect(conteudo, sistema.slug).toContain(
        'from "@/components/sistemas/systemPanel"',
      );
      expect(conteudo, sistema.slug).toContain(sistema.config);
      expect(conteudo, sistema.slug).not.toContain("DemoShell");
    }
  });
});

describe("Sistemas — catálogo comercial", () => {
  it("mantém 12 projetos e a categoria sistemas com os três sistemas atuais", () => {
    expect(PROJECTS).toHaveLength(12);
    const slugs = PROJECTS.filter((p) => p.category === "sistemas")
      .map((p) => p.slug)
      .sort();
    expect(slugs).toEqual(["agendamentos", "estoque", "pedidos"]);
  });

  it("pedidos substitui o antigo financeiro e preserva o preço de R$ 3.500", () => {
    const pedidos = getProjectBySlug("pedidos");
    expect(pedidos).toBeDefined();
    expect(pedidos?.route).toBe("/exemplos/sistemas/pedidos");
    expect(pedidos?.price).toBe(3500);
    expect(getProjectBySlug("financeiro")).toBeUndefined();
    for (const sistema of sistemas) {
      expect(getProjectBySlug(sistema.slug)?.price).toBe(3500);
    }
  });

  it("descrições e funcionalidades refletem os sistemas reais (nada de escopo indefinido)", () => {
    for (const sistema of sistemas) {
      const projeto = getProjectBySlug(sistema.slug)!;
      expect(projeto.description).not.toContain("a definir em contrato");
      for (const feature of projeto.features) {
        expect(feature).not.toContain("a definir");
      }
      expect(projeto.features.length).toBeGreaterThanOrEqual(4);
    }
  });
});

describe("Sistemas — SEO e indexação", () => {
  it("páginas têm canonical próprio e permanecem indexáveis", () => {
    for (const sistema of sistemas) {
      const arquivo = path.join(
        app,
        "exemplos",
        "sistemas",
        sistema.slug,
        "page.tsx",
      );
      const conteudo = fs.readFileSync(arquivo, "utf8");
      expect(conteudo, sistema.slug).toMatch(
        /alternates:\s*\{\s*canonical:/,
      );
      expect(conteudo, sistema.slug).toContain(
        `${base}/exemplos/sistemas/${sistema.slug}`,
      );
      expect(conteudo, sistema.slug).not.toMatch(/index:\s*false/);
      expect(conteudo, sistema.slug).toContain("openGraph");
      expect(conteudo, sistema.slug).toContain("robots");
    }
  });
});

describe("Sistemas — sitemap", () => {
  const urls = sitemap().map((entrada) => entrada.url);

  it("inclui as três rotas de sistemas", () => {
    for (const sistema of sistemas) {
      expect(urls).toContain(`https://codemaestrotech.com.br/exemplos/sistemas/${sistema.slug}`);
    }
  });

  it("não inclui a rota antiga de financeiro", () => {
    expect(
      urls.some((url) => url.includes("sistemas/financeiro")),
    ).toBe(false);
  });
});
