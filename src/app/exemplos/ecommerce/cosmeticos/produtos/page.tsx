import type { Metadata } from "next";
import { BotanicaCatalog } from "@/components/botanica/botanicaCatalog";

const url = "https://codemaestro.tech/exemplos/ecommerce/cosmeticos/produtos";

export const metadata: Metadata = {
  title: "Catálogo Botânica Essence — cosméticos de demonstração",
  description:
    "13 produtos fictícios de hidratantes, séruns, sabonetes, óleos e kits com busca, filtro por categoria e faixa de preço, e ordenação. Conteúdo ilustrativo da Code Maestro Tech.",
  alternates: { canonical: url },
  openGraph: {
    title: "Catálogo Botânica Essence (demonstração)",
    description:
      "Cosméticos fictícios com ingredientes ilustrativos, filtros e ordenação. Conteúdo ilustrativo.",
    url,
    type: "website",
    locale: "pt_BR",
  },
};

export default function BotanicaCatalogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C7A88A]">
          Ingredientes ilustrativos
        </p>
        <h1 className="mt-3 text-3xl font-semibold uppercase tracking-tight text-[#3F5748] sm:text-4xl">
          Catálogo Botânica
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#493F36]/75">
          Busque, filtre por categoria e faixa de preço e ordene como
          preferir. Produtos, volumes e preços são de demonstração.
        </p>
      </header>
      <BotanicaCatalog />
    </div>
  );
}
