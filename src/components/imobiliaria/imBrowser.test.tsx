import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ImBrowser } from "./imBrowser";
import { IMOBILIARIA } from "./data";

function filtrados(): number {
  const anuncio = screen.getByRole("status");
  const numeros = anuncio.textContent?.match(/\d+/);
  return numeros ? Number(numeros[0]) : 0;
}

describe("ImBrowser — filtros locais de imóveis", () => {
  it("renderiza todos os imóveis e anuncia o resultado", () => {
    render(<ImBrowser />);
    expect(filtrados()).toBe(IMOBILIARIA.imoveis.length);
    expect(
      screen.getByText(`${IMOBILIARIA.imoveis.length} imóveis encontrados`)
    ).toBeTruthy();
  });

  it("filtra por tipo ao clicar no botão", () => {
    render(<ImBrowser />);
    fireEvent.click(screen.getByRole("button", { name: "Casas" }));
    const casas = IMOBILIARIA.imoveis.filter((i) => i.tipo === "casa");
    expect(filtrados()).toBe(casas.length);

    fireEvent.click(screen.getByRole("button", { name: "Coberturas" }));
    const coberturas = IMOBILIARIA.imoveis.filter((i) => i.tipo === "cobertura");
    expect(filtrados()).toBe(coberturas.length);
  });

  it("filtra por faixa de preço", () => {
    render(<ImBrowser />);
    fireEvent.click(screen.getByRole("button", { name: "Até R$ 700 mil" }));
    const baratos = IMOBILIARIA.imoveis.filter((i) => i.preco <= 700000);
    expect(filtrados()).toBe(baratos.length);

    fireEvent.click(
      screen.getByRole("button", { name: "Acima de R$ 1,5 mi" })
    );
    const alto = IMOBILIARIA.imoveis.filter((i) => i.preco > 1500000);
    expect(filtrados()).toBe(alto.length);
  });

  it("combina tipo e faixa e mostra estado vazio quando nada corresponde", () => {
    render(<ImBrowser />);
    fireEvent.click(screen.getByRole("button", { name: "Coberturas" }));
    fireEvent.click(screen.getByRole("button", { name: "Até R$ 700 mil" }));
    expect(screen.getByRole("status").textContent).toContain(
      "Nenhum imóvel corresponde aos filtros"
    );
    expect(screen.getByText(/Nenhum imóvel nesta combinação/)).toBeTruthy();
  });

  it("limpa os filtros com o botão correspondente", () => {
    render(<ImBrowser />);
    fireEvent.click(screen.getByRole("button", { name: "Casas" }));
    fireEvent.click(screen.getByRole("button", { name: "R$ 700 mil – R$ 1,5 mi" }));
    expect(filtrados()).toBeLessThan(IMOBILIARIA.imoveis.length);

    fireEvent.click(screen.getByRole("button", { name: /limpar filtros/i }));
    expect(filtrados()).toBe(IMOBILIARIA.imoveis.length);
  });

  it("cada card possui link para a página de detalhe do imóvel", () => {
    render(<ImBrowser />);
    const links = screen.getAllByRole("link").filter((a) =>
      (a.getAttribute("href") ?? "").includes(
        "/exemplos/institucionais/imobiliaria/imoveis/"
      )
    );
    expect(links).toHaveLength(IMOBILIARIA.imoveis.length);
  });
});
