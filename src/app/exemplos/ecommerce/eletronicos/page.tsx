import type { Metadata } from "next";
import { NexusHome } from "@/components/nexus/nexusHome";

const url = "https://codemaestro.tech/exemplos/ecommerce/eletronicos";

export const metadata: Metadata = {
  title: "NEXUS Tech Store — tecnologia para o próximo nível (demonstração)",
  description:
    "E-commerce de demonstração de eletrônicos: smartphones, fones, teclados, mouses e monitores fictícios com fichas técnicas, comparador, carrinho e checkout simulado.",
  alternates: { canonical: url },
  openGraph: {
    title: "NEXUS Tech Store — loja de demonstração",
    description:
      "Loja de eletrônicos em demonstração com catálogo fictício, comparador e checkout simulado. Conteúdo ilustrativo da Code Maestro Tech.",
    url,
    type: "website",
    locale: "pt_BR",
  },
};

export default function NexusHomePage() {
  return <NexusHome />;
}
