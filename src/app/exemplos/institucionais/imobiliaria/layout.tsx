import type { Metadata } from "next";
import { ImHeader } from "@/components/imobiliaria/imHeader";
import { ImFooter } from "@/components/imobiliaria/imFooter";

export const metadata: Metadata = {
  title: "Altavista Imóveis — Demonstração institucional",
  description:
    "Demonstração de site institucional de imobiliária: portfólio de imóveis fictícios, filtros locais e contato externo configurável. Conteúdo fictício da Code Maestro Tech.",
  openGraph: {
    title: "Altavista Imóveis — Demonstração institucional",
    description:
      "Site institucional demonstrativo de imobiliária com portfólio fictício e detalhes de imóveis. Conteúdo ilustrativo.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function ImobiliariaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-svh flex-col bg-white text-[#353C45]">
      <ImHeader />
      <main className="flex-1">{children}</main>
      <ImFooter />
    </div>
  );
}
