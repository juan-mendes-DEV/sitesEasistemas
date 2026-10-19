import type { Metadata } from "next";
import { EngHeader } from "@/components/engenharia/engHeader";
import { EngFooter } from "@/components/engenharia/engFooter";

export const metadata: Metadata = {
  title: "Vértice Engenharia — Demonstração institucional",
  description:
    "Demonstração de site institucional de engenharia: projetos estruturais, planejamento de obras, consultoria e gerenciamento. Conteúdo fictício criado pela Code Maestro Tech.",
  openGraph: {
    title: "Vértice Engenharia — Demonstração institucional",
    description:
      "Site institucional demonstrativo de engenharia com projetos, serviços e contato. Conteúdo fictício.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function EngenhariaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-svh flex-col bg-[#EDF0F2] text-[#20252B]">
      <EngHeader />
      <main className="flex-1">{children}</main>
      <EngFooter />
    </div>
  );
}
