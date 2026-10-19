import type { Metadata } from "next";
import { StoreProvider } from "@/components/ecommerce/storeProvider";
import { NoirHeader } from "@/components/noir/noirHeader";
import { NoirFooter } from "@/components/noir/noirFooter";
import { NOIR_PRODUCTS, NOIR_STORE } from "@/components/noir/data";

export const metadata: Metadata = {
  title: "NOIR Studio — demonstração de e-commerce de moda",
  description:
    "Loja de demonstração de moda contemporânea e streetwear premium: catálogo com busca e filtros, variantes de tamanho e cor, favoritos locais, carrinho isolado e checkout fictício. Projeto ilustrativo da Code Maestro Tech.",
  openGraph: {
    title: "NOIR Studio — demonstração de e-commerce de moda",
    description:
      "Demonstração navegável de loja de moda com catálogo, variantes, favoritos e checkout sem pagamento. Conteúdo fictício.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function NoirLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <StoreProvider store={NOIR_STORE.key} products={NOIR_PRODUCTS}>
      <div className="flex min-h-svh flex-col bg-[#F2EFE9] text-[#111111]">
        <NoirHeader />
        <main className="flex-1">{children}</main>
        <NoirFooter />
      </div>
    </StoreProvider>
  );
}
