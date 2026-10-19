import type { Metadata } from "next";
import { ImPageHeader } from "@/components/imobiliaria/imPageHeader";
import { ImContact } from "@/components/imobiliaria/imContact";

export const metadata: Metadata = {
  title: "Contato — Altavista Imóveis",
  description:
    "Canais de contato demonstrativos da Altavista Imóveis. Sem CRECI, corretores ou endereços reais — demonstração fictícia.",
  alternates: {
    canonical: "https://codemaestro.tech/exemplos/institucionais/imobiliaria/contato",
  },
  openGraph: {
    title: "Contato — Altavista Imóveis (demonstração)",
    description:
      "E-mail demonstrativo, Instagram fictício e horários. Canal externo configurável.",
    url: "https://codemaestro.tech/exemplos/institucionais/imobiliaria/contato",
    type: "website",
    locale: "pt_BR",
  },
};

export default function ImobiliariaContatoPage() {
  return (
    <>
      <ImPageHeader
        eyebrow="Contato"
        title="Fale com a equipe Altavista."
        description="Canais demonstrativos com contato externo configurável. Nenhum endereço, telefone ou CRECI real é apresentado nesta demonstração."
        current="Contato"
      />
      <ImContact />
    </>
  );
}
