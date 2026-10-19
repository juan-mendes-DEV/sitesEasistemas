import type { Metadata } from "next";
import { NoirCatalog } from "@/components/noir/noirCatalog";

const url = "https://codemaestro.tech/exemplos/ecommerce/moda/produtos";

export const metadata: Metadata = {
  title: "Catálogo NOIR Studio — produtos de demonstração",
  description:
    "Catálogo completo da loja de demonstração NOIR Studio: 14 produtos fictícios de moda com busca, filtro por categoria e ordenação. Nenhuma venda real.",
  alternates: { canonical: url },
  openGraph: {
    title: "Catálogo NOIR Studio (demonstração)",
    description:
      "Camisetas, jaquetas, calças, vestidos e acessórios fictícios com busca, filtros e ordenação. Conteúdo ilustrativo.",
    url,
    type: "website",
    locale: "pt_BR",
  },
};

export default function NoirCatalogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#666666]">
          Coleção fictícia
        </p>
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#111111] sm:text-4xl">
          Catálogo NOIR Studio
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#666666]">
          Busque, filtre por categoria e ordene como preferir. Todos os
          produtos, preços e estoques são de demonstração.
        </p>
      </header>
      <NoirCatalog />
    </div>
  );
}
