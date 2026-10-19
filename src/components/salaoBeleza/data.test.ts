import { describe, it, expect } from "vitest";
import { SALAO } from "./data";

describe("dados do Maison Belle", () => {
  it("deve conter nome, tagline e descrição", () => {
    expect(SALAO.name).toBe("Maison Belle");
    expect(SALAO.tagline).toContain("beleza");
    expect(typeof SALAO.description).toBe("string");
    expect(SALAO.description.length).toBeGreaterThan(50);
  });

  it("deve conter 6 serviços com nome, descrição e preço", () => {
    expect(SALAO.services).toHaveLength(6);
    for (const service of SALAO.services) {
      expect(typeof service.name).toBe("string");
      expect(service.name.length).toBeGreaterThan(0);
      expect(typeof service.description).toBe("string");
      expect(service.price).toMatch(/^R\$\s/);
      expect(service.duration).toMatch(/min$/);
    }
  });

  it("deve conter 4 diferenciais", () => {
    expect(SALAO.differentials).toHaveLength(4);
    for (const d of SALAO.differentials) {
      expect(typeof d.title).toBe("string");
      expect(typeof d.text).toBe("string");
    }
  });

  it("deve conter horários para 7 dias", () => {
    expect(SALAO.hours).toHaveLength(7);
    const days = SALAO.hours.map((h) => h.day);
    expect(days).toContain("Segunda");
    expect(days).toContain("Sábado");
    expect(days).toContain("Domingo");
  });

  it("não deve conter número de telefone real", () => {
    expect(SALAO.phone).toBeNull();
  });

  it("deve conter aviso de demonstração", () => {
    expect(SALAO.demoNotice).toContain("demonstração");
    expect(SALAO.demoNotice).toContain("Code Maestro Tech");
  });

  it("deve conter endereço demonstrativo sem endereço real", () => {
    expect(SALAO.address).toBe("São Paulo, SP");
    expect(SALAO.neighborhood).toContain("demonstração");
  });
});
