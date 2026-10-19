import type { Metadata } from "next";
import { NoirCheckoutView } from "@/components/noir/noirCheckoutView";

const url = "https://codemaestro.tech/exemplos/ecommerce/moda/checkout";

export const metadata: Metadata = {
  title: "Checkout demonstrativo NOIR Studio — sem pagamento",
  description:
    "Fluxo de checkout 100% fictício: resumo do pedido e total ilustrativo, sem cartão, CPF, endereço ou qualquer dado pessoal.",
  alternates: { canonical: url },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Checkout demonstrativo NOIR Studio",
    description:
      "Checkout simulado sem coleta de dados e sem processamento de pagamento.",
    url,
    type: "website",
    locale: "pt_BR",
  },
};

export default function NoirCheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#666666]">
          Checkout sem pagamento
        </p>
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#111111] sm:text-4xl">
          Finalizar pedido
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#666666]">
          Nada aqui é cobrado: o pedido gerado é apenas uma simulação local
          desta demonstração.
        </p>
      </header>
      <NoirCheckoutView />
    </div>
  );
}
