import type { Metadata } from "next";
import { EngPageHeader } from "@/components/engenharia/engPageHeader";
import { EngContact } from "@/components/engenharia/engContact";

export const metadata: Metadata = {
  title: "Contato — Vértice Engenharia",
  description:
    "Canais de contato demonstrativos da Vértice Engenharia. Endereço e telefone reais não são informados — demonstração fictícia.",
  alternates: {
    canonical: "https://codemaestro.tech/exemplos/institucionais/engenharia/contato",
  },
  openGraph: {
    title: "Contato — Vértice Engenharia (demonstração)",
    description:
      "E-mail demonstrativo, Instagram fictício e horários de atendimento. Canal externo configurável.",
    url: "https://codemaestro.tech/exemplos/institucionais/engenharia/contato",
    type: "website",
    locale: "pt_BR",
  },
};

export default function EngenhariaContatoPage() {
  return (
    <>
      <EngPageHeader
        eyebrow="Contato"
        title="Vamos conversar sobre seu projeto."
        description="Canais demonstrativos com contato externo configurável. Nenhum endereço ou telefone real é apresentado nesta demonstração."
        current="Contato"
      />
      <EngContact />
    </>
  );
}
