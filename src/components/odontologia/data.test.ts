import { describe, it, expect } from "vitest";
import { ODONTOLOGIA } from "./data";

describe("dados da Lumina Odontologia", () => {
  it("deve conter nome, slogan e contato demonstrativo", () => {
    expect(ODONTOLOGIA.name).toBe("Lumina Odontologia");
    expect(ODONTOLOGIA.tagline).toContain("sorriso");
    expect(ODONTOLOGIA.phone).toBeNull();
    expect(ODONTOLOGIA.whatsappLink).toBeNull();
  });

  it("deve conter 5 especialidades com texto educativo", () => {
    expect(ODONTOLOGIA.specialties).toHaveLength(5);
    const nomes = ODONTOLOGIA.specialties.map((s) => s.name);
    expect(nomes).toContain("Clínica Geral");
    expect(nomes).toContain("Ortodontia");
    expect(nomes).toContain("Implantodontia");
    expect(nomes).toContain("Clareamento Dental");
    expect(nomes).toContain("Odontopediatria");
    for (const s of ODONTOLOGIA.specialties) {
      expect(s.description.length).toBeGreaterThan(50);
      expect(s.care.length).toBeGreaterThan(20);
    }
  });

  it("não deve prometer resultados clínicos", () => {
    const texto = JSON.stringify(ODONTOLOGIA).toLowerCase();
    expect(texto).not.toContain("resultado garantido");
    expect(texto).not.toContain("100%");
    expect(texto).not.toContain("prometemos");
  });

  it("não deve citar dentistas, CROs ou credenciais", () => {
    const texto = JSON.stringify(ODONTOLOGIA);
    // nenhum número de registro profissional (CRO-123, CRO 123)
    expect(texto).not.toMatch(/cro[-\s]?\d+/i);
    // nenhum nome de profissional no formato Dr. Fulano / Dra. Fulana
    expect(texto).not.toMatch(/\b(dra?|dr)\.?\s+[A-ZÁÉÍÓÚ][a-záéíóú]+/);
    // nenhum campo de credencial nos dados
    expect(texto).not.toContain('"cro');
    expect(texto).not.toContain('"cren');
  });

  it("deve conter 5 imagens de estrutura com alt descritivo", () => {
    expect(ODONTOLOGIA.structure).toHaveLength(5);
    for (const item of ODONTOLOGIA.structure) {
      expect(item.src).toMatch(/^\/imgs\/odontologia\//);
      expect(item.alt.length).toBeGreaterThan(10);
      expect(item.caption.length).toBeGreaterThan(3);
    }
  });

  it("deve conter 4 diferenciais, 7 horários e aviso de demonstração", () => {
    expect(ODONTOLOGIA.differentials).toHaveLength(4);
    expect(ODONTOLOGIA.hours).toHaveLength(7);
    expect(ODONTOLOGIA.demoNotice).toContain("fictícia");
    expect(ODONTOLOGIA.demoNotice).toContain("Code Maestro Tech");
    expect(ODONTOLOGIA.demoNotice).toContain("Nenhum dado de saúde");
  });

  it("não deve coletar dados de saúde (sem formulários no conteúdo)", () => {
    const texto = JSON.stringify(ODONTOLOGIA).toLowerCase();
    expect(texto).not.toContain("<form");
    expect(texto).not.toContain("alergia");
    expect(texto).not.toContain("histórico médico");
  });
});
