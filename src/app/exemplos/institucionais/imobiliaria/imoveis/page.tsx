import type { Metadata } from "next";
import { ImPageHeader } from "@/components/imobiliaria/imPageHeader";
import { ImBrowser } from "@/components/imobiliaria/imBrowser";
import { ImContact } from "@/components/imobiliaria/imContact";

export const metadata: Metadata = {
  title: "Imóveis — portfólio da Altavista Imóveis",
  description:
    "Catálogo demonstrativo com seis imóveis fictícios: casas, apartamentos e coberturas com filtros locais por tipo e faixa de preço.",
  alternates: {
    canonical: "https://codemaestro.tech/exemplos/institucionais/imobiliaria/imoveis",
  },
  openGraph: {
    title: "Imóveis — Altavista Imóveis (demonstração)",
    description:
      "Seis imóveis fictícios com fichas técnicas completas e filtros por tipo e valor.",
    url: "https://codemaestro.tech/exemplos/institucionais/imobiliaria/imoveis",
    type: "website",
    locale: "pt_BR",
  },
};

export default function ImobiliariaImoveisPage() {
  return (
    <>
      <ImPageHeader
        eyebrow="Portfólio"
        title="Seis imóveis fictícios para explorar."
        description="Filtros por tipo e faixa de preço funcionam localmente no navegador — sem servidor, sem dados reais."
        current="Imóveis"
      />
      <ImBrowser />
      <ImContact />
    </>
  );
}
