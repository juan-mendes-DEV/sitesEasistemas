import type { Metadata } from "next";
import { ImHero } from "@/components/imobiliaria/imHero";
import { ImIntro } from "@/components/imobiliaria/imIntro";
import { ImFeatured } from "@/components/imobiliaria/imFeatured";
import { ImContact } from "@/components/imobiliaria/imContact";

export const metadata: Metadata = {
  title: "Altavista Imóveis — O próximo capítulo da sua vida começa aqui",
  description:
    "Demonstração de site institucional de imobiliária com portfólio fictício de seis imóveis, fichas técnicas e contato externo configurável.",
  alternates: {
    canonical: "https://codemaestro.tech/exemplos/institucionais/imobiliaria",
  },
  openGraph: {
    title: "Altavista Imóveis — Demonstração institucional",
    description:
      "Imobiliária demonstrativa com imóveis fictícios, preços ilustrativos e contato configurável.",
    url: "https://codemaestro.tech/exemplos/institucionais/imobiliaria",
    type: "website",
    locale: "pt_BR",
  },
};

export default function ImobiliariaHomePage() {
  return (
    <>
      <ImHero />
      <ImIntro />
      <ImFeatured id="destaques" />
      <ImContact />
    </>
  );
}
