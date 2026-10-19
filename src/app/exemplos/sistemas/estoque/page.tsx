import type { Metadata } from "next";
import { SystemPanel } from "@/components/sistemas/systemPanel";
import { SISTEMA_ESTOQUE } from "@/components/sistemas/systemData";

const url = "https://codemaestro.tech/exemplos/sistemas/estoque";

export const metadata: Metadata = {
  title: "NUVEM — sistema de estoque (demonstração)",
  description:
    "Sistema básico de estoque em demonstração: cadastro de peças com quantidade e preço, busca, filtros automáticos, alerta abaixo de cinco unidades e valor total da coleção. Dados fictícios salvos apenas no navegador, sem servidor.",
  alternates: { canonical: url },
  openGraph: {
    title: "NUVEM — sistema de estoque (demonstração)",
    description:
      "Controle de estoque demonstrativo com alerta de reposição, busca, filtros e indicadores. Conteúdo ilustrativo da Code Maestro Tech; dados locais no navegador.",
    url,
    type: "website",
    locale: "pt_BR",
  },
  robots: { index: true, follow: true },
};

export default function SistemaEstoquePage() {
  return <SystemPanel config={SISTEMA_ESTOQUE} />;
}
