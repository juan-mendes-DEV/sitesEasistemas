import type { Metadata } from "next";
import { BotanicaCartView } from "@/components/botanica/botanicaCartView";

const url = "https://codemaestro.tech/exemplos/ecommerce/cosmeticos/carrinho";

export const metadata: Metadata = {
  title: "Carrinho Botânica Essence — demonstração",
  description:
    "Carrinho de demonstração isolado desta loja, guardado apenas no navegador. Sem pagamento e sem coleta de dados.",
  alternates: { canonical: url },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Carrinho Botânica Essence (demonstração)",
    description: "Carrinho fictício com subtotal ilustrativo, sem checkout real.",
    url,
    type: "website",
    locale: "pt_BR",
  },
};

export default function BotanicaCarrinhoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C7A88A]">
          Dados fictícios
        </p>
        <h1 className="mt-3 text-3xl font-semibold uppercase tracking-tight text-[#3F5748] sm:text-4xl">
          Seu carrinho
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#493F36]/75">
          O carrinho pertence somente à Botânica Essence — outras lojas desta
          demonstração não compartilham itens.
        </p>
      </header>
      <BotanicaCartView />
    </div>
  );
}
