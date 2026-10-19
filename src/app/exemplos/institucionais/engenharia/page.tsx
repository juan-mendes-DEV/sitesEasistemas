import type { Metadata } from "next";
import { EngHero } from "@/components/engenharia/engHero";
import { EngIntro } from "@/components/engenharia/engIntro";
import { EngServices } from "@/components/engenharia/engServices";
import { EngProjects } from "@/components/engenharia/engProjects";
import { EngContact } from "@/components/engenharia/engContact";

export const metadata: Metadata = {
  title: "Vértice Engenharia — Precisão em cada projeto, confiança em cada construção",
  description:
    "Demonstração de site institucional de engenharia: projetos estruturais, planejamento de obras, consultoria técnica e gerenciamento de projetos. Conteúdo fictício.",
  alternates: {
    canonical: "https://codemaestro.tech/exemplos/institucionais/engenharia",
  },
  openGraph: {
    title: "Vértice Engenharia — Demonstração institucional",
    description:
      "Projetos estruturais, planejamento de obras e gerenciamento. Demonstração fictícia da Code Maestro Tech.",
    url: "https://codemaestro.tech/exemplos/institucionais/engenharia",
    type: "website",
    locale: "pt_BR",
  },
};

export default function EngenhariaHomePage() {
  return (
    <>
      <EngHero />
      <EngIntro />
      <EngServices id="especialidades" />
      <EngProjects limit={3} id="projetos" />
      <EngContact />
    </>
  );
}
