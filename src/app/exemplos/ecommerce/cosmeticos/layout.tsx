import type { Metadata } from "next";
import { StoreProvider } from "@/components/ecommerce/storeProvider";
import { BotanicaHeader } from "@/components/botanica/botanicaHeader";
import { BotanicaFooter } from "@/components/botanica/botanicaFooter";
import { BOTANICA_PRODUCTS, BOTANICA_STORE } from "@/components/botanica/data";

export const metadata: Metadata = {
  title: "Botânica Essence — demonstração de e-commerce de cosméticos",
  description:
    "Loja de demonstração de cosméticos e autocuidado: catálogo com busca e filtros, ingredientes demonstrativos, kits, carrinho isolado e checkout fictício. Sem alegações médicas. Projeto ilustrativo da Code Maestro Tech.",
  openGraph: {
    title: "Botânica Essence — demonstração de e-commerce de cosméticos",
    description:
      "Demonstração navegável de loja de cosméticos com catálogo fictício, kits e checkout sem pagamento. Conteúdo ilustrativo.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function BotanicaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <StoreProvider store={BOTANICA_STORE.key} products={BOTANICA_PRODUCTS}>
      <div className="flex min-h-svh flex-col bg-[#FAF8F2] text-[#493F36]">
        <BotanicaHeader />
        <main className="flex-1">{children}</main>
        <BotanicaFooter />
      </div>
    </StoreProvider>
  );
}
