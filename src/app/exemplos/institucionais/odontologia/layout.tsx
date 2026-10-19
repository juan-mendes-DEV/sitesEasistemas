import type { Metadata } from "next";
import { OdHeader } from "@/components/odontologia/odHeader";
import { OdFooter } from "@/components/odontologia/odFooter";

export const metadata: Metadata = {
  title: "Lumina Odontologia — Demonstração institucional",
  description:
    "Demonstração de site institucional para clínica odontológica: especialidades, estrutura e agendamento externo. Conteúdo fictício criado pela Code Maestro Tech.",
  openGraph: {
    title: "Lumina Odontologia — Demonstração institucional",
    description:
      "Site institucional demonstrativo de odontologia com especialidades, estrutura e contato. Conteúdo fictício.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function OdontologiaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-svh flex-col bg-white text-[#353C45]">
      <OdHeader />
      <main className="flex-1">{children}</main>
      <OdFooter />
    </div>
  );
}
