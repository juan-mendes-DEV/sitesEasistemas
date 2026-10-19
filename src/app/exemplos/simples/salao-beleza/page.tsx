import type { Metadata } from "next";
import { SalaoHeader } from "@/components/salaoBeleza/salaoHeader";
import { SalaoHero } from "@/components/salaoBeleza/salaoHero";
import { SalaoAbout } from "@/components/salaoBeleza/salaoAbout";
import { SalaoServices } from "@/components/salaoBeleza/salaoServices";
import { SalaoGallery } from "@/components/salaoBeleza/salaoGallery";
import { SalaoDifferentials } from "@/components/salaoBeleza/salaoDifferentials";
import { SalaoHours } from "@/components/salaoBeleza/salaoHours";
import { SalaoContact } from "@/components/salaoBeleza/salaoContact";
import { SalaoFooter } from "@/components/salaoBeleza/salaoFooter";

export const metadata: Metadata = {
  title: "Maison Belle — Salão de beleza premium",
  description:
    "Maison Belle é um salão de beleza premium com atendimento personalizado, ambiente acolhedor e profissionais especializadas. Cortes, coloração, hidratação, manicure e maquiagem.",
  openGraph: {
    title: "Maison Belle — Salão de beleza premium",
    description: "Salão de beleza premium com atendimento personalizado e ambiente acolhedor.",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SalaoBelezaPage() {
  return (
    <div className="flex flex-col min-h-svh">
      <SalaoHeader />
      <main className="flex-1">
        <SalaoHero />
        <SalaoAbout />
        <SalaoServices />
        <SalaoGallery />
        <SalaoDifferentials />
        <SalaoHours />
        <SalaoContact />
      </main>
      <SalaoFooter />
    </div>
  );
}
