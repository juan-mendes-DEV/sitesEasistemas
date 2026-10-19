import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatBRL } from "@/lib/ecommerce/format";
import {
  BOTANICA_CATEGORIES,
  BOTANICA_PRODUCTS,
  BOTANICA_STORE,
} from "@/components/botanica/data";
import { BotanicaProductDetail } from "@/components/botanica/botanicaProductDetail";

const BASE = BOTANICA_STORE.route;

interface BotanicaProdutoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BOTANICA_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: BotanicaProdutoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = BOTANICA_PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    return { title: "Produto não encontrado — Botânica Essence" };
  }

  const url = `https://codemaestro.tech${BASE}/produtos/${product.slug}`;
  const categoria =
    BOTANICA_CATEGORIES.find((item) => item.id === product.category)?.label ??
    "Cosméticos";

  return {
    title: `${product.name} — Botânica Essence (demonstração)`,
    description: `${categoria} de demonstração${product.volume ? ` (${product.volume})` : ""} por ${formatBRL(product.price)} — preço e ingredientes fictícios, sem alegações de eficácia.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} — Botânica Essence (demonstração)`,
      description: `${product.description.slice(0, 140)} Preço fictício: ${formatBRL(product.price)}.`,
      url,
      type: "article",
      locale: "pt_BR",
    },
  };
}

export default async function BotanicaProdutoPage({
  params,
}: BotanicaProdutoPageProps) {
  const { slug } = await params;
  const product = BOTANICA_PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <nav
        aria-label="Trilha de navegação"
        className="mb-7 flex flex-wrap items-center gap-2 text-xs text-[#493F36]/70"
      >
        <Link
          href={BASE}
          className="underline underline-offset-4 hover:text-[#3F5748] focus-visible:outline-[#C7A88A]"
        >
          Início
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href={`${BASE}/produtos`}
          className="underline underline-offset-4 hover:text-[#3F5748] focus-visible:outline-[#C7A88A]"
        >
          Catálogo
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="font-medium text-[#3F5748]">
          {product.name}
        </span>
      </nav>

      <BotanicaProductDetail product={product} />
    </div>
  );
}
