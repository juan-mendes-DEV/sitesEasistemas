import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatBRL } from "@/lib/ecommerce/format";
import { NOIR_CATEGORIES, NOIR_PRODUCTS, NOIR_STORE } from "@/components/noir/data";
import { NoirProductDetail } from "@/components/noir/noirProductDetail";

const BASE = NOIR_STORE.route;

interface NoirProdutoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return NOIR_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: NoirProdutoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = NOIR_PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    return { title: "Produto não encontrado — NOIR Studio" };
  }

  const url = `${"https://codemaestro.tech"}${BASE}/produtos/${product.slug}`;
  const categoria =
    NOIR_CATEGORIES.find((item) => item.id === product.category)?.label ??
    "Moda";

  return {
    title: `${product.name} — NOIR Studio (demonstração)`,
    description: `${categoria} de demonstração por ${formatBRL(product.price)} (preço fictício). Ficha, variantes e estoque ilustrativos da loja NOIR Studio.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} — NOIR Studio (demonstração)`,
      description: `${product.description.slice(0, 140)} Preço fictício: ${formatBRL(product.price)}.`,
      url,
      type: "article",
      locale: "pt_BR",
    },
  };
}

export default async function NoirProdutoPage({ params }: NoirProdutoPageProps) {
  const { slug } = await params;
  const product = NOIR_PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <nav
        aria-label="Trilha de navegação"
        className="mb-7 flex flex-wrap items-center gap-2 text-xs text-[#666666]"
      >
        <Link
          href={BASE}
          className="underline underline-offset-4 hover:text-[#111111] focus-visible:outline-[#A99A86]"
        >
          Início
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href={`${BASE}/produtos`}
          className="underline underline-offset-4 hover:text-[#111111] focus-visible:outline-[#A99A86]"
        >
          Catálogo
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="font-medium text-[#111111]">
          {product.name}
        </span>
      </nav>

      <NoirProductDetail product={product} />
    </div>
  );
}
