import type { Metadata } from "next";
import { BarberHeader } from "@/components/barbearia/barberHeader";
import { BarberHero } from "@/components/barbearia/barberHero";
import { BarberAbout } from "@/components/barbearia/barberAbout";
import { BarberServices } from "@/components/barbearia/barberServices";
import { BarberGallery } from "@/components/barbearia/barberGallery";
import { BarberHours } from "@/components/barbearia/barberHours";
import { BarberContact } from "@/components/barbearia/barberContact";
import { BarberFooter } from "@/components/barbearia/barberFooter";

export const metadata: Metadata = {
  title: "Ferro & Navalha — Barbearia tradicional com precisão",
  description:
    "Ferro & Navalha é uma barbearia tradicional com técnica de precisão. Cortes masculinos, barba navalha, bigode e sobrancelha em São Paulo, SP. Agende seu horário.",
  openGraph: {
    title: "Ferro & Navalha — Barbearia tradicional com precisão",
    description:
      "Cortes masculinos, barba navalha, bigode e sobrancelha com técnica de precisão em São Paulo, SP.",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BarberiaPage() {
  return (
    <div className="flex flex-col min-h-svh text-white">
      <BarberHeader />
      <main className="flex-1">
        <BarberHero />
        <BarberAbout />
        <BarberServices />
        <BarberGallery />
        <BarberHours />
        <BarberContact />
      </main>
      <BarberFooter />
    </div>
  );
}
