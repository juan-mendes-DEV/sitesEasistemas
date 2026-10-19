import type { Metadata } from "next";
import { NexusCatalog } from "@/components/nexus/nexusCatalog";

const url = "https://codemaestro.tech/exemplos/ecommerce/eletronicos/produtos";

export const metadata: Metadata = {
  title: "Catálogo NEXUS Tech Store — eletrônicos de demonstração",
  description:
    "13 produtos fictícios de eletrônicos e acessórios com busca, filtro por categoria e faixa de preço, e ordenação. Especificações inventadas para demonstração.",
  alternates: { canonical: url },
  openGraph: {
    title: "Catálogo NEXUS Tech Store (demonstração)",
    description:
      "Smartphones, fones, teclados, mouses, monitores e acessórios fictícios com filtros e ordenação. Conteúdo ilustrativo.",
    url,
    type: "website",
    locale: "pt_BR",
  },
};

export default function NexusCatalogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#20C7D9]">
          Especificações fictícias
        </p>
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#E9F2F7] sm:text-4xl">
          Catálogo NEXUS
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#E9F2F7]/65">
          Busque, filtre por categoria e faixa de preço, ordene e adicione ao
          comparador — tudo localmente no navegador.
        </p>
      </header>
      <NexusCatalog />
    </div>
  );
}
