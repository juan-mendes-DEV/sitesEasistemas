import type { Metadata } from "next";
import { BotanicaCheckoutView } from "@/components/botanica/botanicaCheckoutView";

const url = "https://codemaestro.tech/exemplos/ecommerce/cosmeticos/checkout";

export const metadata: Metadata = {
  title: "Checkout demonstrativo Botânica Essence — sem pagamento",
  description:
    "Fluxo de checkout 100% fictício: resumo do pedido e total ilustrativo, sem cartão, CPF, endereço ou qualquer dado pessoal.",
  alternates: { canonical: url },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Checkout demonstrativo Botânica Essence",
    description:
      "Checkout simulado sem coleta de dados e sem processamento de pagamento.",
    url,
    type: "website",
    locale: "pt_BR",
  },
};

export default function BotanicaCheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C7A88A]">
          Checkout sem pagamento
        </p>
        <h1 className="mt-3 text-3xl font-semibold uppercase tracking-tight text-[#3F5748] sm:text-4xl">
          Finalizar pedido
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#493F36]/75">
          Nada aqui é cobrado: o pedido gerado é apenas uma simulação local
          desta demonstração.
        </p>
      </header>
      <BotanicaCheckoutView />
    </div>
  );
}
