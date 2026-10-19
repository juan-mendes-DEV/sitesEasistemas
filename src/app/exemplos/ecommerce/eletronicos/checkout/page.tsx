import type { Metadata } from "next";
import { NexusCheckoutView } from "@/components/nexus/nexusCheckoutView";

const url = "https://codemaestro.tech/exemplos/ecommerce/eletronicos/checkout";

export const metadata: Metadata = {
  title: "Checkout demonstrativo NEXUS Tech Store — sem pagamento",
  description:
    "Fluxo de checkout 100% fictício: resumo do pedido e total ilustrativo, sem cartão, CPF, endereço ou qualquer dado pessoal.",
  alternates: { canonical: url },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Checkout demonstrativo NEXUS Tech Store",
    description:
      "Checkout simulado sem coleta de dados e sem processamento de pagamento.",
    url,
    type: "website",
    locale: "pt_BR",
  },
};

export default function NexusCheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#20C7D9]">
          Checkout sem pagamento
        </p>
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#E9F2F7] sm:text-4xl">
          Finalizar pedido
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#E9F2F7]/65">
          Nada aqui é cobrado: o pedido gerado é apenas uma simulação local
          desta demonstração.
        </p>
      </header>
      <NexusCheckoutView />
    </div>
  );
}
