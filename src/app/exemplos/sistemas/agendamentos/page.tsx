import type { Metadata } from "next";
import { SystemPanel } from "@/components/sistemas/systemPanel";
import { SISTEMA_AGENDAMENTOS } from "@/components/sistemas/systemData";

const url = "https://codemaestro.tech/exemplos/sistemas/agendamentos";

export const metadata: Metadata = {
  title: "CORTE & CIA — sistema de agendamentos (demonstração)",
  description:
    "Sistema básico de agendamentos em demonstração: agenda para uma cadeira com data, horário e duração, bloqueio de sobreposição, status de atendimento, busca e indicadores automáticos. Dados fictícios salvos apenas no navegador, sem servidor.",
  alternates: { canonical: url },
  openGraph: {
    title: "CORTE & CIA — sistema de agendamentos (demonstração)",
    description:
      "Agenda demonstrativa com bloqueio de horários sobrepostos, status e indicadores. Conteúdo ilustrativo da Code Maestro Tech; dados locais no navegador.",
    url,
    type: "website",
    locale: "pt_BR",
  },
  robots: { index: true, follow: true },
};

export default function SistemaAgendamentosPage() {
  return <SystemPanel config={SISTEMA_AGENDAMENTOS} />;
}
