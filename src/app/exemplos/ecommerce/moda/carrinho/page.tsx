import type { Metadata } from "next";
import { NoirCartView } from "@/components/noir/noirCartView";

const url = "https://codemaestro.tech/exemplos/ecommerce/moda/carrinho";

export const metadata: Metadata = {
  title: "Carrinho NOIR Studio — demonstração",
  description:
    "Carrinho de demonstração isolado desta loja, guardado apenas no navegador. Sem pagamento e sem coleta de dados.",
  alternates: { canonical: url },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Carrinho NOIR Studio (demonstração)",
    description: "Carrinho fictício com subtotal ilustrativo, sem checkout real.",
    url,
    type: "website",
    locale: "pt_BR",
  },
};

export default function NoirCarrinhoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#666666]">
          Dados fictícios
        </p>
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#111111] sm:text-4xl">
          Seu carrinho
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#666666]">
          O carrinho pertence somente à NOIR Studio — outras lojas desta
          demonstração não compartilham itens.
        </p>
      </header>
      <NoirCartView />
    </div>
  );
}
