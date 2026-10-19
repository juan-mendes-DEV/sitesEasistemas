import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio/portfolio";
import { PORTFOLIO_PROJECTS } from "@/components/portfolio/portfolioData";
import { OFFICIAL_CONTACT } from "@/components/portfolio/portfolioIdentity";

export const metadata: Metadata = {
  title: { absolute: "Code Maestro Tech — A magia da tecnologia" },
  description: "Explore 12 experiências digitais demonstrativas da Code Maestro Tech: sites, lojas virtuais e sistemas. Ideias, criatividade e tecnologia em conexão.",
  alternates: { canonical: OFFICIAL_CONTACT.site },
  openGraph: {
    title: "Code Maestro Tech — A magia da nova era",
    description: "Um portfólio de possibilidades: 12 demonstrações fictícias de sites, lojas virtuais e sistemas. Conheça a magia da tecnologia.",
    url: OFFICIAL_CONTACT.site,
    siteName: "Code Maestro Tech",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Maestro Tech — A magia da tecnologia",
    description: "Explore experiências digitais demonstrativas e novas possibilidades para transformar ideias em tecnologia.",
  },
};

export default function Home() {
  return <Portfolio projects={PORTFOLIO_PROJECTS} />;
}
