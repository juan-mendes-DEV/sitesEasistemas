import {
  PROJECTS,
  CATEGORIES,
  getProjectBySlug,
  getProjectsByCategory,
  getCategoryByKey,
  formatPrice,
} from "@/lib/catalog";
import type { CategoryKey } from "@/types/catalog";

describe("catálogo comercial", () => {
  it("deve conter exatamente 12 projetos", () => {
    expect(PROJECTS).toHaveLength(12);
  });

  it("deve conter 4 categorias com os preços-base corretos", () => {
    const byKey = Object.fromEntries(
      CATEGORIES.map((c) => [c.key, c.price])
    ) as Record<CategoryKey, number>;
    expect(byKey.simples).toBe(700);
    expect(byKey.institucionais).toBe(1200);
    expect(byKey.ecommerce).toBe(3000);
    expect(byKey.sistemas).toBe(3500);
  });

  it("cada projeto deve possuir identificador, slug, título, descrição, categoria, preço, funcionalidades, status e rota", () => {
    for (const project of PROJECTS) {
      expect(typeof project.id).toBe("string");
      expect(typeof project.slug).toBe("string");
      expect(typeof project.title).toBe("string");
      expect(typeof project.description).toBe("string");
      expect(["simples", "institucionais", "ecommerce", "sistemas"]).toContain(
        project.category
      );
      expect(typeof project.price).toBe("number");
      expect(Array.isArray(project.features)).toBe(true);
      expect(project.features.length).toBeGreaterThan(0);
      expect(["em-desenvolvimento", "disponivel"]).toContain(project.status);
      expect(typeof project.route).toBe("string");
      expect(project.route).toMatch(/^\/exemplos\//);
    }
  });

  it("os 3 projetos de cada categoria devem bater com o preço da categoria", () => {
    for (const cat of CATEGORIES) {
      const projetos = getProjectsByCategory(cat.key);
      expect(projetos).toHaveLength(3);
      for (const p of projetos) {
        expect(p.price).toBe(cat.price);
        expect(p.route).toContain(cat.key);
      }
    }
  });

  it("getProjectBySlug deve retornar o projeto correto e undefined para slug inválido", () => {
    const p = getProjectBySlug("barbearia");
    expect(p?.title).toBe("Barbearia");
    expect(p?.category).toBe("simples");
    expect(getProjectBySlug("nao-existe")).toBeUndefined();
  });

  it("getCategoryByKey deve retornar a categoria correta", () => {
    expect(getCategoryByKey("ecommerce")?.label).toBe("E-commerce");
    expect(getCategoryByKey("nao-existe" as CategoryKey)).toBeUndefined();
  });

  it("formatPrice deve formatar em reais", () => {
    expect(formatPrice(700)).toMatch(/R\$\s*700,00/);
    expect(formatPrice(3500)).toMatch(/R\$\s*3\.500,00/);
  });

  it("todas as rotas dos projetos devem ser únicas", () => {
    const rotas = PROJECTS.map((p) => p.route);
    expect(new Set(rotas).size).toBe(rotas.length);
  });
});
