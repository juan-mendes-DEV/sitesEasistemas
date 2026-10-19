import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { EngHeader } from "@/components/engenharia/engHeader";
import { OdHeader } from "@/components/odontologia/odHeader";
import { ImHeader } from "@/components/imobiliaria/imHeader";

const raiz = process.cwd();

function rotaExiste(href: string): boolean {
  if (href === "/" || href.startsWith("#") || href.startsWith("mailto:")) {
    return true;
  }
  const [rota] = href.split("#");
  return fs.existsSync(path.join(raiz, "src/app", rota, "page.tsx"));
}

function coletarHrefs(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll("a")).map(
    (a) => a.getAttribute("href") ?? ""
  );
}

describe("navegação dos sites institucionais", () => {
  it("EngHeader: todos os links apontam para rotas existentes", () => {
    const { container } = render(<EngHeader />);
    const hrefs = coletarHrefs(container);
    expect(hrefs.length).toBeGreaterThanOrEqual(5);
    for (const href of hrefs) {
      expect(rotaExiste(href), `link quebrado: ${href}`).toBe(true);
    }
    expect(hrefs).toContain("/exemplos/institucionais/engenharia/servicos");
  });

  it("OdHeader: todos os links apontam para rotas existentes", () => {
    const { container } = render(<OdHeader />);
    const hrefs = coletarHrefs(container);
    expect(hrefs.length).toBeGreaterThanOrEqual(5);
    for (const href of hrefs) {
      expect(rotaExiste(href), `link quebrado: ${href}`).toBe(true);
    }
    expect(hrefs).toContain("/exemplos/institucionais/odontologia/especialidades");
  });

  it("ImHeader: todos os links apontam para rotas existentes", () => {
    const { container } = render(<ImHeader />);
    const hrefs = coletarHrefs(container);
    expect(hrefs.length).toBeGreaterThanOrEqual(4);
    for (const href of hrefs) {
      expect(rotaExiste(href), `link quebrado: ${href}`).toBe(true);
    }
    expect(hrefs).toContain("/exemplos/institucionais/imobiliaria/imoveis");
  });

  it("cada header possui botão de menu mobile com aria-expanded", () => {
    for (const Header of [EngHeader, OdHeader, ImHeader]) {
      const { container } = render(<Header />);
      const botao = container.querySelector("button[aria-expanded]");
      expect(botao).toBeTruthy();
      expect(botao?.getAttribute("aria-expanded")).toBe("false");
      expect(botao?.getAttribute("aria-label")).toBeTruthy();
    }
  });

  it("o menu mobile abre e fecha alternando aria-expanded", () => {
    const { container } = render(<OdHeader />);
    const botao = container.querySelector<HTMLButtonElement>("button[aria-expanded]");
    expect(botao).toBeTruthy();

    fireEvent.click(botao!);
    expect(botao!.getAttribute("aria-expanded")).toBe("true");
    // links do menu mobile passam a existir no DOM aberto
    const hrefs = coletarHrefs(container);
    expect(
      hrefs.filter((h) => h === "/exemplos/institucionais/odontologia/sobre").length
    ).toBeGreaterThanOrEqual(2);

    fireEvent.click(botao!);
    expect(botao!.getAttribute("aria-expanded")).toBe("false");
  });
});
