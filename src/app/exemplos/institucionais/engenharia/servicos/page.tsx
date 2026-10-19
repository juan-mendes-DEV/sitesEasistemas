import type { Metadata } from "next";
import { EngPageHeader } from "@/components/engenharia/engPageHeader";
import { EngServices } from "@/components/engenharia/engServices";
import { EngContact } from "@/components/engenharia/engContact";

export const metadata: Metadata = {
  title: "Serviços de engenharia",
  description:
    "Projetos estruturais, planejamento de obras, consultoria técnica e gerenciamento de projetos — demonstração fictícia da Vértice Engenharia.",
  alternates: {
    canonical: "https://codemaestro.tech/exemplos/institucionais/engenharia/servicos",
  },
  openGraph: {
    title: "Serviços de engenharia — Vértice Engenharia (demonstração)",
    description:
      "Quatro frentes de atendimento: projeto, planejamento, consultoria e gestão de obra.",
    url: "https://codemaestro.tech/exemplos/institucionais/engenharia/servicos",
    type: "website",
    locale: "pt_BR",
  },
};

export default function EngenhariaServicosPage() {
  return (
    <>
      <EngPageHeader
        eyebrow="Serviços"
        title="Quatro frentes para cobrir toda a obra."
        description="Do projeto estrutural ao gerenciamento de execução — escopo demonstrativo compatível com site institucional."
        current="Serviços"
      />
      <EngServices detailed />
      <EngContact />
    </>
  );
}
