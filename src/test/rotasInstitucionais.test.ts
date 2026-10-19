import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { PROJECTS, getProjectBySlug } from "@/lib/catalog";
import { ENGENHARIA } from "@/components/engenharia/data";
import { ODONTOLOGIA } from "@/components/odontologia/data";
import { IMOBILIARIA } from "@/components/imobiliaria/data";

const raiz = process.cwd();

function existeRota(rota: string): boolean {
  return fs.existsSync(path.join(raiz, "src/app", rota, "page.tsx"));
}

function existeImagem(src: string): boolean {
  return fs.existsSync(path.join(raiz, "public", src));
}

const SUBPAGINAS: Record<string, string[]> = {
  engenharia: ["sobre", "servicos", "projetos", "contato"],
  odontologia: ["sobre", "especialidades", "estrutura", "contato"],
  imobiliaria: ["sobre", "imoveis", "contato"],
};

describe("rotas dos sites institucionais", () => {
  const institucionais = PROJECTS.filter((p) => p.category === "institucionais");

  it("possui exatamente 3 projetos institucionais a R$ 1.200", () => {
    expect(institucionais).toHaveLength(3);
    for (const p of institucionais) {
      expect(p.price).toBe(1200);
    }
  });

  it("as três rotas institucionais possuem página correspondente", () => {
    for (const p of institucionais) {
      expect(existeRota(p.route)).toBe(true);
    }
  });

  it("cada demonstração possui subpáginas esperadas", () => {
    for (const [slug, subpaginas] of Object.entries(SUBPAGINAS)) {
      const projeto = getProjectBySlug(slug);
      expect(projeto).toBeTruthy();
      for (const sub of subpaginas) {
        expect(existeRota(`${projeto?.route}/${sub}`)).toBe(true);
      }
    }
  });

  it("a imobiliária possui rota dinâmica de detalhe por slug", () => {
    expect(
      fs.existsSync(
        path.join(
          raiz,
          "src/app/exemplos/institucionais/imobiliaria/imoveis/[slug]/page.tsx"
        )
      )
    ).toBe(true);
  });

  it("cada demonstração possui layout próprio com header e footer", () => {
    for (const p of institucionais) {
      expect(
        fs.existsSync(path.join(raiz, "src/app", p.route, "layout.tsx"))
      ).toBe(true);
    }
  });
});

describe("imagens locais das demonstrações institucionais", () => {
  it("todas as imagens referenciadas nos dados existem em public/", () => {
    const fontes = [
      ENGENHARIA.images.hero,
      ENGENHARIA.images.sobre,
      ENGENHARIA.images.metodo,
      ...ENGENHARIA.projects.map((p) => p.image),
      ODONTOLOGIA.images.hero,
      ODONTOLOGIA.images.sobre,
      ODONTOLOGIA.images.destaque,
      ...ODONTOLOGIA.structure.map((s) => s.src),
      IMOBILIARIA.images.hero,
      IMOBILIARIA.images.sobre,
      ...IMOBILIARIA.imoveis.map((i) => i.imagem),
      ...IMOBILIARIA.imoveis.flatMap((i) => i.galeria.map((g) => g.src)),
    ];

    expect(fontes.length).toBeGreaterThan(20);
    for (const src of fontes) {
      expect(existeImagem(src), `imagem ausente: ${src}`).toBe(true);
    }
  });

  it("nenhuma demonstração institacional usa imagem externa", () => {
    const fontes = [
      ...ENGENHARIA.projects.map((p) => p.image),
      ...ODONTOLOGIA.structure.map((s) => s.src),
      ...IMOBILIARIA.imoveis.map((i) => i.imagem),
    ];
    for (const src of fontes) {
      expect(src.startsWith("/imgs/")).toBe(true);
    }
  });
});

describe("integridade dos sites simples após a Etapa 03", () => {
  it("as 3 demonstrações simples continuam com rota e status disponíveis", () => {
    const simples = PROJECTS.filter((p) => p.category === "simples");
    expect(simples).toHaveLength(3);
    for (const p of simples) {
      expect(existeRota(p.route)).toBe(true);
      expect(p.status).toBe("disponivel");
      expect(p.price).toBe(700);
    }
  });

  it("os 12 projetos do catálogo continuam únicos e completos", () => {
    expect(PROJECTS).toHaveLength(12);
    const rotas = PROJECTS.map((p) => p.route);
    expect(new Set(rotas).size).toBe(rotas.length);
    for (const p of PROJECTS) {
      expect(existeRota(p.route)).toBe(true);
    }
  });
});
