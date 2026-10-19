import type { Metadata } from "next";
import { NoirHome } from "@/components/noir/noirHome";

const url = "https://codemaestro.tech/exemplos/ecommerce/moda";

export const metadata: Metadata = {
  title: "NOIR Studio — vista sua identidade (loja de demonstração)",
  description:
    "Demonstração de loja de moda online: coleção fictícia com camisetas, jaquetas, calças, vestidos e acessórios, busca, filtros, favoritos e carrinho funcional. Sem pagamentos reais.",
  alternates: { canonical: url },
  openGraph: {
    title: "NOIR Studio — vista sua identidade (demonstração)",
    description:
      "E-commerce de moda em demonstração com catálogo fictício, variantes e checkout simulado. Conteúdo ilustrativo da Code Maestro Tech.",
    url,
    type: "website",
    locale: "pt_BR",
  },
};

export default function NoirHomePage() {
  return <NoirHome />;
}
