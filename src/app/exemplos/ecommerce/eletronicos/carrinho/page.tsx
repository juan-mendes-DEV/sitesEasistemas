import type { Metadata } from "next";
import { NexusCartView } from "@/components/nexus/nexusCartView";

const url = "https://codemaestro.tech/exemplos/ecommerce/eletronicos/carrinho";

export const metadata: Metadata = {
  title: "Carrinho NEXUS Tech Store — demonstração",
  description:
    "Carrinho de demonstração isolado desta loja, guardado apenas no navegador. Sem pagamento e sem coleta de dados.",
  alternates: { canonical: url },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Carrinho NEXUS Tech Store (demonstração)",
    description: "Carrinho fictício com subtotal ilustrativo, sem checkout real.",
    url,
    type: "website",
    locale: "pt_BR",
  },
};

export default function NexusCarrinhoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#20C7D9]">
          Dados fictícios
        </p>
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#E9F2F7] sm:text-4xl">
          Seu carrinho
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#E9F2F7]/65">
          O carrinho pertence somente à NEXUS Tech Store — outras lojas desta
          demonstração não compartilham itens.
        </p>
      </header>
      <NexusCartView />
    </div>
  );
}
