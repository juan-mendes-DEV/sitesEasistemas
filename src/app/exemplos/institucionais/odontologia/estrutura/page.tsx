import type { Metadata } from "next";
import { OdPageHeader } from "@/components/odontologia/odPageHeader";
import { OdGallery } from "@/components/odontologia/odGallery";
import { OdContact } from "@/components/odontologia/odContact";

export const metadata: Metadata = {
  title: "Estrutura da clínica",
  description:
    "Galeria demonstrativa dos ambientes da Lumina Odontologia — imagens ilustrativas de demonstração fictícia.",
  alternates: {
    canonical: "https://codemaestro.tech/exemplos/institucionais/odontologia/estrutura",
  },
  openGraph: {
    title: "Estrutura — Lumina Odontologia (demonstração)",
    description:
      "Galeria ilustrativa de salas de atendimento, recepção e áreas de higiene.",
    url: "https://codemaestro.tech/exemplos/institucionais/odontologia/estrutura",
    type: "website",
    locale: "pt_BR",
  },
};

export default function OdontologiaEstruturaPage() {
  return (
    <>
      <OdPageHeader
        eyebrow="Estrutura"
        title="Ambientes claros, leves e organizados."
        description="Galeria demonstrativa dos espaços da clínica — imagens ilustrativas usadas para demonstrar o formato da página."
        current="Estrutura"
      />
      <OdGallery />
      <OdContact />
    </>
  );
}
