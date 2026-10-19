import type { Metadata } from "next";
import { OdHero } from "@/components/odontologia/odHero";
import { OdIntro } from "@/components/odontologia/odIntro";
import { OdSpecialties } from "@/components/odontologia/odSpecialties";
import { OdContact } from "@/components/odontologia/odContact";

export const metadata: Metadata = {
  title: "Lumina Odontologia — Seu sorriso merece cuidado em cada detalhe",
  description:
    "Demonstração de site institucional de odontologia: clínica geral, ortodontia, implantodontia, clareamento e odontopediatria. Conteúdo fictício e educativo.",
  alternates: {
    canonical: "https://codemaestro.tech/exemplos/institucionais/odontologia",
  },
  openGraph: {
    title: "Lumina Odontologia — Demonstração institucional",
    description:
      "Demonstração fictícia de clínica odontológica com especialidades e agendamento externo.",
    url: "https://codemaestro.tech/exemplos/institucionais/odontologia",
    type: "website",
    locale: "pt_BR",
  },
};

export default function OdontologiaHomePage() {
  return (
    <>
      <OdHero />
      <OdIntro />
      <OdSpecialties id="especialidades" />
      <OdContact />
    </>
  );
}
