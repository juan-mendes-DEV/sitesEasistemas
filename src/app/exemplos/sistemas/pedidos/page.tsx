import type { Metadata } from "next";
import { SystemPanel } from "@/components/sistemas/systemPanel";
import { SISTEMA_PEDIDOS } from "@/components/sistemas/systemData";

const url = "https://codemaestro.tech/exemplos/sistemas/pedidos";

export const metadata: Metadata = {
  title: "GRÃO — sistema de pedidos (demonstração)",
  description:
    "Sistema básico de pedidos em demonstração: cadastro por cliente ou mesa, quantidade e preço unitário, avanço de status, busca, filtros e indicadores automáticos. Dados fictícios salvos apenas no navegador, sem servidor.",
  alternates: { canonical: url },
  openGraph: {
    title: "GRÃO — sistema de pedidos (demonstração)",
    description:
      "Balcão de pedidos demonstrativo com busca, filtros, status e indicadores. Conteúdo ilustrativo da Code Maestro Tech; dados locais no navegador.",
    url,
    type: "website",
    locale: "pt_BR",
  },
  robots: { index: true, follow: true },
};

export default function SistemaPedidosPage() {
  return <SystemPanel config={SISTEMA_PEDIDOS} />;
}
