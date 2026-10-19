import { describe, it, expect } from "vitest";
import { ENGENHARIA } from "./data";

describe("dados da Vértice Engenharia", () => {
  it("deve conter nome, slogan e contato demonstrativo", () => {
    expect(ENGENHARIA.name).toBe("Vértice Engenharia");
    expect(ENGENHARIA.tagline).toContain("Precisão");
    expect(ENGENHARIA.email).toContain("@");
    expect(ENGENHARIA.phone).toBeNull();
    expect(ENGENHARIA.whatsappLink).toBeNull();
  });

  it("deve conter 4 serviços com descrição e itens", () => {
    expect(ENGENHARIA.services).toHaveLength(4);
    for (const service of ENGENHARIA.services) {
      expect(service.name.length).toBeGreaterThan(0);
      expect(service.description.length).toBeGreaterThan(20);
      expect(service.items.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("deve conter 6 projetos fictícios com imagem local", () => {
    expect(ENGENHARIA.projects).toHaveLength(6);
    const ids = ENGENHARIA.projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(6);
    for (const project of ENGENHARIA.projects) {
      expect(project.image).toMatch(/^\/imgs\/engenharia\//);
      expect(project.alt.length).toBeGreaterThan(10);
      expect(project.description).toContain("demonstração");
    }
  });

  it("deve conter história, missão, 4 valores e metodologia em 5 etapas", () => {
    expect(ENGENHARIA.about.history.length).toBeGreaterThanOrEqual(3);
    expect(ENGENHARIA.about.mission.length).toBeGreaterThan(20);
    expect(ENGENHARIA.about.values).toHaveLength(4);
    expect(ENGENHARIA.about.method).toHaveLength(5);
    const steps = ENGENHARIA.about.method.map((m) => m.step);
    expect(steps).toEqual(["01", "02", "03", "04", "05"]);
  });

  it("não deve mencionar certificações, registros ou responsáveis técnicos", () => {
    const texto = JSON.stringify(ENGENHARIA).toLowerCase();
    expect(texto).not.toContain("crea");
    expect(texto).not.toContain("creci");
    expect(texto).not.toContain("certificad");
    expect(texto).not.toContain("responsável técnico");
  });

  it("deve ter 7 dias de horário e aviso de demonstração", () => {
    expect(ENGENHARIA.hours).toHaveLength(7);
    expect(ENGENHARIA.demoNotice).toContain("fictícia");
    expect(ENGENHARIA.demoNotice).toContain("Code Maestro Tech");
  });
});
