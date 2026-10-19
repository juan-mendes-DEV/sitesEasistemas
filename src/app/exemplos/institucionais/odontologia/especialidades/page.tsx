import type { Metadata } from "next";
import { OdPageHeader } from "@/components/odontologia/odPageHeader";
import { OdSpecialties } from "@/components/odontologia/odSpecialties";
import { OdContact } from "@/components/odontologia/odContact";

export const metadata: Metadata = {
  title: "Especialidades odontológicas",
  description:
    "Clínica geral, ortodontia, implantodontia, clareamento dental e odontopediatria — informação educativa em demonstração fictícia.",
  alternates: {
    canonical:
      "https://codemaestro.tech/exemplos/institucionais/odontologia/especialidades",
  },
  openGraph: {
    title: "Especialidades — Lumina Odontologia (demonstração)",
    description:
      "Cinco áreas de atendimento com informação educativa e sem promessas de resultado.",
    url: "https://codemaestro.tech/exemplos/institucionais/odontologia/especialidades",
    type: "website",
    locale: "pt_BR",
  },
};

export default function OdontologiaEspecialidadesPage() {
  return (
    <>
      <OdPageHeader
        eyebrow="Especialidades"
        title="Cinco áreas de cuidado odontológico."
        description="Conteúdo educativo sobre cada especialidade — sem promessas de resultado e sem identificação de profissionais."
        current="Especialidades"
      />
      <OdSpecialties detailed />
      <OdContact />
    </>
  );
}
