import { describe, it, expect } from "vitest";
import { PADARIA } from "./data";

describe("dados da Padaria Aurora", () => {
  it("deve conter nome, tagline e descrição", () => {
    expect(PADARIA.name).toBe("Padaria Aurora");
    expect(PADARIA.tagline).toContain("tradição");
    expect(typeof PADARIA.description).toBe("string");
    expect(PADARIA.description.length).toBeGreaterThan(50);
  });

  it("deve conter 6 produtos com nome, descrição e preço", () => {
    expect(PADARIA.products).toHaveLength(6);
    for (const product of PADARIA.products) {
      expect(typeof product.name).toBe("string");
      expect(product.name.length).toBeGreaterThan(0);
      expect(typeof product.description).toBe("string");
      expect(product.price).toMatch(/^R\$\s/);
      expect(typeof product.unit).toBe("string");
    }
  });

  it("deve conter 4 diferenciais", () => {
    expect(PADARIA.differentials).toHaveLength(4);
    for (const d of PADARIA.differentials) {
      expect(typeof d.title).toBe("string");
      expect(typeof d.text).toBe("string");
    }
  });

  it("deve conter horários para 7 dias", () => {
    expect(PADARIA.hours).toHaveLength(7);
    const days = PADARIA.hours.map((h) => h.day);
    expect(days).toContain("Segunda");
    expect(days).toContain("Sábado");
    expect(days).toContain("Domingo");
  });

  it("não deve conter número de telefone real", () => {
    expect(PADARIA.phone).toBeNull();
  });

  it("deve conter aviso de demonstração", () => {
    expect(PADARIA.demoNotice).toContain("demonstração");
    expect(PADARIA.demoNotice).toContain("Code Maestro Tech");
  });

  it("deve conter endereço demonstrativo sem endereço real", () => {
    expect(PADARIA.address).toBe("São Paulo, SP");
    expect(PADARIA.neighborhood).toContain("demonstração");
  });
});
