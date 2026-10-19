import type { Metadata } from "next";
import { BotanicaHome } from "@/components/botanica/botanicaHome";

const url = "https://codemaestro.tech/exemplos/ecommerce/cosmeticos";

export const metadata: Metadata = {
  title: "Botânica Essence — beleza que floresce naturalmente (demonstração)",
  description:
    "E-commerce de demonstração de cosméticos: hidratantes, séruns, sabonetes, óleos e kits fictícios com ingredientes ilustrativos, busca, filtros, carrinho e checkout simulado.",
  alternates: { canonical: url },
  openGraph: {
    title: "Botânica Essence — loja de demonstração",
    description:
      "Loja de cosméticos em demonstração com catálogo fictício e checkout simulado. Conteúdo ilustrativo da Code Maestro Tech.",
    url,
    type: "website",
    locale: "pt_BR",
  },
};

export default function BotanicaHomePage() {
  return <BotanicaHome />;
}
