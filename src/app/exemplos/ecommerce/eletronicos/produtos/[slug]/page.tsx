import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatBRL } from "@/lib/ecommerce/format";
import {
  NEXUS_CATEGORIES,
  NEXUS_PRODUCTS,
  NEXUS_STORE,
} from "@/components/nexus/data";
import { NexusProductDetail } from "@/components/nexus/nexusProductDetail";

const BASE = NEXUS_STORE.route;

interface NexusProdutoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return NEXUS_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: NexusProdutoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = NEXUS_PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    return { title: "Produto não encontrado — NEXUS Tech Store" };
  }

  const url = `https://codemaestro.tech${BASE}/produtos/${product.slug}`;
  const categoria =
    NEXUS_CATEGORIES.find((item) => item.id === product.category)?.label ??
    "Eletrônicos";

  return {
    title: `${product.name} — NEXUS Tech Store (demonstração)`,
    description: `${categoria} de demonstração por ${formatBRL(product.price)} (preço fictício), com ficha técnica inventada e estoque ilustrativo da loja NEXUS.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} — NEXUS Tech Store (demonstração)`,
      description: `${product.description.slice(0, 140)} Preço fictício: ${formatBRL(product.price)}.`,
      url,
      type: "article",
      locale: "pt_BR",
    },
  };
}

export default async function NexusProdutoPage({
  params,
}: NexusProdutoPageProps) {
  const { slug } = await params;
  const product = NEXUS_PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <nav
        aria-label="Trilha de navegação"
        className="mb-7 flex flex-wrap items-center gap-2 text-xs text-[#E9F2F7]/60"
      >
        <Link
          href={BASE}
          className="underline underline-offset-4 hover:text-[#20C7D9] focus-visible:outline-[#20C7D9]"
        >
          Início
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href={`${BASE}/produtos`}
          className="underline underline-offset-4 hover:text-[#20C7D9] focus-visible:outline-[#20C7D9]"
        >
          Catálogo
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="font-medium text-[#E9F2F7]">
          {product.name}
        </span>
      </nav>

      <NexusProductDetail product={product} />
    </div>
  );
}
