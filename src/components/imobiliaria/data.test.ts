import { describe, it, expect } from "vitest";
import { IMOBILIARIA, formatPreco, TIPO_LABEL, type Imovel } from "./data";

describe("dados da Altavista Imóveis", () => {
  it("deve conter nome, slogan e contato demonstrativo", () => {
    expect(IMOBILIARIA.name).toBe("Altavista Imóveis");
    expect(IMOBILIARIA.tagline).toContain("próximo capítulo");
    expect(IMOBILIARIA.phone).toBeNull();
    expect(IMOBILIARIA.whatsappLink).toBeNull();
  });

  it("deve conter ao menos 6 imóveis com todos os campos obrigatórios", () => {
    expect(IMOBILIARIA.imoveis.length).toBeGreaterThanOrEqual(6);
    for (const imovel of IMOBILIARIA.imoveis) {
      expect(imovel.slug.length).toBeGreaterThan(3);
      expect(imovel.titulo.length).toBeGreaterThan(3);
      expect(["casa", "apartamento", "cobertura"]).toContain(imovel.tipo);
      expect(typeof imovel.preco).toBe("number");
      expect(imovel.preco).toBeGreaterThan(0);
      expect(imovel.area).toBeGreaterThan(0);
      expect(imovel.quartos).toBeGreaterThan(0);
      expect(imovel.banheiros).toBeGreaterThan(0);
      expect(imovel.descricao).toContain("demonstração");
      expect(imovel.imagem).toMatch(/^\/imgs\/imobiliaria\//);
      expect(imovel.identificador).toMatch(/^AV-\d{3}$/);
      expect(imovel.galeria).toHaveLength(2);
    }
  });

  it("deve ter slugs e identificadores únicos", () => {
    const slugs = IMOBILIARIA.imoveis.map((i) => i.slug);
    const ids = IMOBILIARIA.imoveis.map((i) => i.identificador);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("deve cobrir os 3 tipos de imóvel", () => {
    const tipos = new Set(IMOBILIARIA.imoveis.map((i) => i.tipo));
    expect(tipos.has("casa")).toBe(true);
    expect(tipos.has("apartamento")).toBe(true);
    expect(tipos.has("cobertura")).toBe(true);
  });

  it("os filtros de faixa de preço devem particionar o portfólio", () => {
    const ate700 = IMOBILIARIA.imoveis.filter((i) => i.preco <= 700000);
    const medio = IMOBILIARIA.imoveis.filter(
      (i) => i.preco > 700000 && i.preco <= 1500000
    );
    const alto = IMOBILIARIA.imoveis.filter((i) => i.preco > 1500000);

    expect(ate700.length).toBeGreaterThanOrEqual(1);
    expect(medio.length).toBeGreaterThanOrEqual(1);
    expect(alto.length).toBeGreaterThanOrEqual(1);
    expect(ate700.length + medio.length + alto.length).toBe(
      IMOBILIARIA.imoveis.length
    );
  });

  it("formatPreco deve formatar em reais sem centavos", () => {
    expect(formatPreco(850000)).toMatch(/R\$\s?850\.000/);
    expect(formatPreco(480000)).toMatch(/480\.000/);
  });

  it("TIPO_LABEL deve cobrir todos os tipos", () => {
    expect(TIPO_LABEL.casa).toBe("Casa");
    expect(TIPO_LABEL.apartamento).toBe("Apartamento");
    expect(TIPO_LABEL.cobertura).toBe("Cobertura");
  });

  it("não deve inventar CRECI, corretores ou endereços reais", () => {
    const texto = JSON.stringify(IMOBILIARIA);
    // nenhum número de CRECI
    expect(texto).not.toMatch(/creci[-\s]?\d+/i);
    // nenhum campo de corretor ou endereço nos dados
    expect(texto).not.toContain('"corretor');
    expect(texto).not.toContain('"endereco');
    // nenhum logradouro no formato "Rua X"
    expect(texto).not.toMatch(/\bRua\s+[A-Z]/);
    expect(IMOBILIARIA.demoNotice).toContain("fictícia");
    expect(IMOBILIARIA.demoNotice).toContain("Code Maestro Tech");
  });

  it("galeria deve usar imagens locais existentes do pacote", () => {
    for (const imovel of IMOBILIARIA.imoveis as Imovel[]) {
      for (const foto of imovel.galeria) {
        expect(foto.src).toMatch(/^\/imgs\/imobiliaria\//);
        expect(foto.alt.length).toBeGreaterThan(10);
      }
    }
  });
});
