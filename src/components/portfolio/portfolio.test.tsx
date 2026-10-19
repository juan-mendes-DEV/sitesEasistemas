import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Portfolio } from "./portfolio";
import { PORTFOLIO_PROJECTS } from "./portfolioData";
import { DEMONSTRATION_NOTICE, OFFICIAL_CONTACT, PORTFOLIO_CATEGORIES } from "./portfolioIdentity";
import { PROJECTS } from "@/lib/catalog";
import { metadata } from "@/app/page";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

vi.mock("next/image", () => ({
  default: ({ src, alt, preload: _preload, ...props }: Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { src: string | { src: string }; preload?: boolean }) => {
    void _preload;
    // eslint-disable-next-line @next/next/no-img-element -- substituto DOM do componente Next nos testes.
    return <img {...props} src={typeof src === "string" ? src : src.src} alt={alt} />;
  },
}));

afterEach(cleanup);

describe("Portfólio demonstrativo isolado", () => {
  it("mantém exatamente as 12 rotas originais sem serializar preços", () => {
    expect(PORTFOLIO_PROJECTS).toHaveLength(12);
    expect(PORTFOLIO_PROJECTS.map((p) => p.route)).toEqual(PROJECTS.map((p) => p.route));
    for (const project of PORTFOLIO_PROJECTS) {
      expect(project).not.toHaveProperty("price");
      expect(project).not.toHaveProperty("features");
      expect(existsSync(resolve("public", project.preview.slice(1)))).toBe(true);
    }
  });

  it("exibe 3 demonstrações em cada uma das 4 categorias", () => {
    for (const category of PORTFOLIO_CATEGORIES) {
      expect(PORTFOLIO_PROJECTS.filter((p) => p.category === category.key)).toHaveLength(3);
    }
  });

  it("não mostra preços, pacotes, orçamento ou termos na home", () => {
    const { container } = render(<Portfolio projects={PORTFOLIO_PROJECTS} />);
    expect(container.textContent).not.toMatch(/R\$|preço|parcela|contrata[çc]|termos comerciais|condições de pagamento|orçamento|pacotes/i);
    expect(screen.getAllByRole("article")).toHaveLength(12);
    expect(screen.getByText(DEMONSTRATION_NOTICE)).toBeVisible();
  });

  it.each(PORTFOLIO_CATEGORIES)("filtra $label sem perder o retorno a todos", (category) => {
    render(<Portfolio projects={PORTFOLIO_PROJECTS} />);
    const filter = screen.getByRole("button", { name: new RegExp(category.label) });
    fireEvent.click(filter);
    expect(filter).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("status")).toHaveTextContent("3 demonstrações");
    fireEvent.click(screen.getByRole("button", { name: /Todos/ }));
    expect(screen.getAllByRole("article")).toHaveLength(12);
  });

  it("cada card contém prévia, nome, descrição, categoria e link original", () => {
    render(<Portfolio projects={PORTFOLIO_PROJECTS} />);
    for (const project of PORTFOLIO_PROJECTS) {
      expect(screen.getByRole("heading", { name: project.name })).toBeVisible();
      expect(screen.getByRole("img", { name: `Prévia da demonstração ${project.name}` })).toHaveAttribute("src", project.preview);
      expect(screen.getByRole("link", { name: `Explorar demonstração: ${project.name}` })).toHaveAttribute("href", project.route);
    }
  });

  it("usa somente os contatos oficiais nas ações de contato", () => {
    render(<Portfolio projects={PORTFOLIO_PROJECTS} />);
    const whats = screen.getAllByRole("link", { name: /Conversar no WhatsApp/ });
    for (const link of whats) {
      expect(link).toHaveAttribute("href", "https://wa.me/553531911991");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    expect(screen.getByRole("link", { name: "Enviar e-mail" })).toHaveAttribute("href", "mailto:jp436807@gmail.com");
    expect(screen.getByRole("link", { name: OFFICIAL_CONTACT.domain })).toHaveAttribute("href", OFFICIAL_CONTACT.site);
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
  });

  it("abre e fecha o menu mobile e oferece link de salto", () => {
    render(<Portfolio projects={PORTFOLIO_PROJECTS} />);
    expect(screen.getByRole("link", { name: "Ir para o conteúdo" })).toHaveAttribute("href", "#conteudo");
    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(screen.getByRole("button", { name: "Fechar menu" })).toHaveAttribute("aria-expanded", "true");
    const nav = screen.getByRole("navigation", { name: "Navegação mobile" });
    fireEvent.click(nav.querySelector('a[href="#catalogo"]')!);
    expect(screen.queryByRole("navigation", { name: "Navegação mobile" })).not.toBeInTheDocument();
  });

  it("preserva SEO técnico e todas as URLs do sitemap sob o domínio oficial", () => {
    expect(metadata.alternates?.canonical).toBe(OFFICIAL_CONTACT.site);
    expect(JSON.stringify(metadata)).not.toMatch(/preço|comercial|R\$/i);
    expect(sitemap()).toHaveLength(73);
    for (const entry of sitemap()) expect(entry.url.startsWith(OFFICIAL_CONTACT.site)).toBe(true);
    expect(robots().sitemap).toBe(`${OFFICIAL_CONTACT.site}/sitemap.xml`);
  });

  it("não carrega estilos, componentes comerciais ou dependências pesadas na home", () => {
    const page = readFileSync(resolve("src/app/page.tsx"), "utf8");
    const css = readFileSync(resolve("src/components/portfolio/portfolio.module.css"), "utf8");
    expect(page).not.toMatch(/CommercialTerms|CommercialPresentation|components\/layout/);
    expect(css).not.toMatch(/:root\s*\{|^body\s*\{/m);
    expect(css).toContain("prefers-reduced-motion: reduce");
  });
});
