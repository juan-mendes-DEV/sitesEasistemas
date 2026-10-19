import { PROJECTS } from "@/lib/catalog";
import type { CategoryKey } from "@/types/catalog";

export interface PortfolioProject {
  id: string;
  slug: string;
  name: string;
  category: CategoryKey;
  description: string;
  route: string;
  preview: string;
}

const NAMES: Record<string, string> = {
  barbearia: "Ferro & Navalha",
  padaria: "Padaria Aurora",
  "salao-beleza": "Maison Belle",
  engenharia: "Vértice Engenharia",
  odontologia: "Lumina Odontologia",
  imobiliaria: "Altavista Imóveis",
  moda: "NOIR Studio",
  eletronicos: "NEXUS",
  cosmeticos: "Botânica",
  estoque: "NUVEM · Estoque",
  agendamentos: "CORTE & CIA · Agenda",
  pedidos: "GRÃO · Pedidos",
};

// Projeção explícita: preços, pacotes e termos legados não são serializados
// para a interface cliente. O catálogo original permanece intacto.
export const PORTFOLIO_PROJECTS: PortfolioProject[] = PROJECTS.map((project) => ({
  id: project.id,
  slug: project.slug,
  name: NAMES[project.slug] ?? project.title,
  category: project.category,
  description: project.description,
  route: project.route,
  preview: `/portfolio/previews/${project.slug}.jpg`,
}));
