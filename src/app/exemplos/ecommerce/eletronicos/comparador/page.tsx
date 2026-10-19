import type { Metadata } from "next";
import { NexusCompare } from "@/components/nexus/nexusCompare";

const url = "https://codemaestro.tech/exemplos/ecommerce/eletronicos/comparador";

export const metadata: Metadata = {
  title: "Comparador de produtos — NEXUS Tech Store (demonstração)",
  description:
    "Compare até três produtos fictícios lado a lado com atributos técnicos inventados; atributos não informados aparecem como indisponíveis. Loja de demonstração da Code Maestro Tech.",
  alternates: { canonical: url },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Comparador NEXUS Tech Store (demonstração)",
    description:
      "Tabela local de comparação de especificações fictícias, sem servidor.",
    url,
    type: "website",
    locale: "pt_BR",
  },
};

export default function NexusComparadorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#20C7D9]">
          Recurso local · até 3 produtos
        </p>
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#E9F2F7] sm:text-4xl">
          Comparador
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#E9F2F7]/65">
          A seleção fica apenas neste navegador e considera apenas produtos da
          NEXUS — nunca de outras lojas da demonstração.
        </p>
      </header>
      <NexusCompare />
    </div>
  );
}
