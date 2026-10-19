import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/home/projectCard";
import { PROJECTS } from "@/lib/catalog";

describe("ProjectCard", () => {
  const project = PROJECTS[0];
  const catLabels: Record<string, string> = {
    simples: "Site Simples",
    institucionais: "Institucional",
    ecommerce: "E-commerce",
    sistemas: "Sistema",
  };
  const statusLabels: Record<string, string> = {
    "em-desenvolvimento": "Demonstração em desenvolvimento",
    disponivel: "Disponível",
  };

  it("renderiza título, categoria, preço-base, funcionalidades e status", () => {
    render(<ProjectCard project={project} />);

    // getByText já lança se o elemento não for encontrado
    expect(screen.getByText(project.title)).toBeTruthy();
    expect(screen.getByText("R$ 700,00")).toBeTruthy();
    expect(screen.getByText(catLabels[project.category])).toBeTruthy();
    expect(screen.getByText(statusLabels[project.status])).toBeTruthy();
    project.features.slice(0, 3).forEach((feature) => {
      expect(screen.getByText(feature)).toBeTruthy();
    });
  });

  it("possui link de acesso para a rota do projeto", () => {
    render(<ProjectCard project={project} />);
    const link = screen.getByRole("link", { name: /acessar/i });
    expect(link.getAttribute("href")).toBe(project.route);
  });
});
