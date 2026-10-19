import type { Metadata } from "next";
import { PadariaHeader } from "@/components/padaria/padariaHeader";
import { PadariaHero } from "@/components/padaria/padariaHero";
import { PadariaAbout } from "@/components/padaria/padariaAbout";
import { PadariaProducts } from "@/components/padaria/padariaProducts";
import { PadariaDifferentials } from "@/components/padaria/padariaDifferentials";
import { PadariaGallery } from "@/components/padaria/padariaGallery";
import { PadariaHours } from "@/components/padaria/padariaHours";
import { PadariaContact } from "@/components/padaria/padariaContact";
import { PadariaFooter } from "@/components/padaria/padariaFooter";

export const metadata: Metadata = {
  title: "Padaria Aurora — Pães artesanais com fermentação natural",
  description:
    "Padaria Aurora é uma padaria artesanal com fermentação natural, ingredientes selecionados e produção cuidadosa. Pães, croissants, bolos e café especial.",
  openGraph: {
    title: "Padaria Aurora — Pães artesanais com fermentação natural",
    description: "Padaria artesanal com fermentação natural e ingredientes selecionados.",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PadariaPage() {
  return (
    <div className="flex flex-col min-h-svh">
      <PadariaHeader />
      <main className="flex-1">
        <PadariaHero />
        <PadariaAbout />
        <PadariaProducts />
        <PadariaDifferentials />
        <PadariaGallery />
        <PadariaHours />
        <PadariaContact />
      </main>
      <PadariaFooter />
    </div>
  );
}
