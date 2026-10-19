import type { Metadata } from "next";
import { EngPageHeader } from "@/components/engenharia/engPageHeader";
import { EngProjects } from "@/components/engenharia/engProjects";
import { EngContact } from "@/components/engenharia/engContact";

export const metadata: Metadata = {
  title: "Projetos — portfólio da Vértice Engenharia",
  description:
    "Seis projetos fictícios de residencial, comercial e industrial com imagens ilustrativas — portfólio de demonstração.",
  alternates: {
    canonical: "https://codemaestro.tech/exemplos/institucionais/engenharia/projetos",
  },
  openGraph: {
    title: "Projetos — Vértice Engenharia (demonstração)",
    description:
      "Portfólio fictício com seis obras demonstrativas em residencial, comercial e industrial.",
    url: "https://codemaestro.tech/exemplos/institucionais/engenharia/projetos",
    type: "website",
    locale: "pt_BR",
  },
};

export default function EngenhariaProjetosPage() {
  return (
    <>
      <EngPageHeader
        eyebrow="Projetos"
        title="Portfólio fictício de seis obras."
        description="Residencial, comercial e industrial — projetos ilustrativos que demonstram o formato da página de portfólio."
        current="Projetos"
      />
      <EngProjects />
      <EngContact />
    </>
  );
}
