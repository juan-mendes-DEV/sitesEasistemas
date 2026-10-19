import type { Metadata } from "next";
import { StoreProvider } from "@/components/ecommerce/storeProvider";
import { NexusHeader } from "@/components/nexus/nexusHeader";
import { NexusFooter } from "@/components/nexus/nexusFooter";
import { NEXUS_PRODUCTS, NEXUS_STORE } from "@/components/nexus/data";

export const metadata: Metadata = {
  title: "NEXUS Tech Store — demonstração de e-commerce de eletrônicos",
  description:
    "Loja de demonstração de eletrônicos: catálogo com busca, filtros e ordenação, fichas técnicas fictícias, comparador local de até três produtos, carrinho isolado e checkout sem pagamento. Projeto ilustrativo da Code Maestro Tech.",
  openGraph: {
    title: "NEXUS Tech Store — demonstração de e-commerce de eletrônicos",
    description:
      "Demonstração navegável de loja de eletrônicos com comparador de especificações fictícias e checkout simulado. Conteúdo ilustrativo.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function NexusLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <StoreProvider store={NEXUS_STORE.key} products={NEXUS_PRODUCTS}>
      <div className="flex min-h-svh flex-col bg-[#0B1220] text-[#E9F2F7]">
        <NexusHeader />
        <main className="flex-1">{children}</main>
        <NexusFooter />
      </div>
    </StoreProvider>
  );
}
