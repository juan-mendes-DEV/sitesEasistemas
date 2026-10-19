import type { Metadata } from "next";
import { OdPageHeader } from "@/components/odontologia/odPageHeader";
import { OdContact } from "@/components/odontologia/odContact";

export const metadata: Metadata = {
  title: "Agendamento — Lumina Odontologia",
  description:
    "Canal de agendamento externo configurável da Lumina Odontologia. Sem formulário de dados de saúde — demonstração fictícia.",
  alternates: {
    canonical: "https://codemaestro.tech/exemplos/institucionais/odontologia/contato",
  },
  openGraph: {
    title: "Agendamento — Lumina Odontologia (demonstração)",
    description:
      "Contato demonstrativo com agendamento externo configurável. Nenhum dado de saúde é coletado.",
    url: "https://codemaestro.tech/exemplos/institucionais/odontologia/contato",
    type: "website",
    locale: "pt_BR",
  },
};

export default function OdontologiaContatoPage() {
  return (
    <>
      <OdPageHeader
        eyebrow="Contato"
        title="Agende sua avaliação."
        description="Agendamento por canal externo configurável. Esta demonstração não coleta dados de saúde nem informa endereço ou telefone reais."
        current="Contato"
      />
      <OdContact />
    </>
  );
}
