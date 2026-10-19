"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GitCompare, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "@/types/ecommerce";
import { formatBRL, formatStock, productImageAlt } from "@/lib/ecommerce/format";
import { QuantityStepper } from "@/components/ecommerce/quantityStepper";
import { useCart, useCompare, useStore } from "@/components/ecommerce/storeProvider";
import { NEXUS_CATEGORIES, NEXUS_STORE } from "./data";
import { NexusProductCard } from "./nexusProductCard";

const BASE = NEXUS_STORE.route;

export function NexusProductDetail({ product }: { product: Product }) {
  const { products } = useStore();
  const cart = useCart();
  const compare = useCompare();

  const [imagem, setImagem] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [avisoComparador, setAvisoComparador] = useState<string | null>(null);

  const clearNotice = cart.clearNotice;
  useEffect(() => {
    clearNotice();
  }, [product.id, clearNotice]);

  const noComparador = compare.has(product.id);
  const categoria =
    NEXUS_CATEGORIES.find((item) => item.id === product.category)?.label ?? "";
  const podeAdicionar = product.stock > 0;
  const relacionados = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 3);

  function alternarComparador() {
    const alterado = compare.toggle(product.id);
    if (!alterado) {
      setAvisoComparador(
        "Comparador cheio: abra a página do comparador para remover um produto.",
      );
    } else if (noComparador) {
      setAvisoComparador("Produto removido do comparador.");
    } else {
      setAvisoComparador("Produto adicionado ao comparador (até 3 no total).");
    }
  }

  function adicionar() {
    const resultado = cart.add({
      productId: product.id,
      variantId: null,
      quantity: quantidade,
    });
    if (resultado.ok) setQuantidade(1);
  }

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Galeria */}
        <div>
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#E9F2F7]/12 bg-[#172B40]">
            <Image
              src={product.images[imagem]}
              alt={productImageAlt(product.name, imagem)}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="mt-3 flex gap-3">
            {product.images.map((caminho, indice) => (
              <button
                key={caminho}
                type="button"
                onClick={() => setImagem(indice)}
                aria-label={`Ver ${indice === 0 ? "imagem principal" : "imagem de detalhe"} de ${product.name}`}
                aria-current={imagem === indice}
                className={`relative aspect-[4/3] w-24 overflow-hidden border transition-colors focus-visible:outline-[#20C7D9] ${
                  imagem === indice
                    ? "border-[#20C7D9]"
                    : "border-[#E9F2F7]/15 hover:border-[#E9F2F7]/50"
                }`}
              >
                <Image
                  src={caminho}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Especificações */}
          <section aria-labelledby="nexus-specs" className="mt-8">
            <h2
              id="nexus-specs"
              className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#20C7D9]"
            >
              Especificações técnicas (fictícias)
            </h2>
            <dl className="mt-4 divide-y divide-[#E9F2F7]/10 border border-[#E9F2F7]/12 bg-[#172B40] px-5">
              {(product.specs ?? []).map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-start justify-between gap-6 py-3 text-sm"
                >
                  <dt className="text-[#E9F2F7]/60">{spec.label}</dt>
                  <dd
                    className={`text-right font-medium ${
                      spec.value === null
                        ? "italic text-[#E9F2F7]/40"
                        : "text-[#E9F2F7]"
                    }`}
                  >
                    {spec.value ?? "Não disponível"}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-[11px] text-[#E9F2F7]/45">
              Atributos ausentes aparecem como “Não disponível” também no
              comparador.
            </p>
          </section>
        </div>

        {/* Compra */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#20C7D9]">
              {categoria}
            </p>
            {product.badge && (
              <span className="bg-[#20C7D9] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#0B1220]">
                {product.badge}
              </span>
            )}
          </div>

          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#E9F2F7] sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold tabular-nums text-[#E9F2F7]">
              {formatBRL(product.price)}
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#E9F2F7]/50">
              Preço fictício
            </span>
          </p>

          <p className="mt-5 text-sm leading-relaxed text-[#E9F2F7]/70">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs text-[#20C7D9]">
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            {formatStock(product.stock)}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <QuantityStepper
              value={quantidade}
              max={Math.max(product.stock, 1)}
              onChange={setQuantidade}
              label={product.name}
              disabled={!podeAdicionar}
              className="inline-flex items-stretch border border-[#E9F2F7]/25 bg-[#0B1220]"
              buttonClassName="px-3 py-3 text-[#E9F2F7] transition-colors hover:bg-[#172B40] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-[#20C7D9]"
              valueClassName="min-w-10 self-center text-center text-sm font-bold tabular-nums text-[#E9F2F7]"
            />
            <button
              type="button"
              onClick={adicionar}
              disabled={!podeAdicionar}
              className="inline-flex items-center gap-2 bg-[#20C7D9] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B1220] transition-colors hover:bg-[#E9F2F7] disabled:cursor-not-allowed disabled:bg-[#E9F2F7]/20 disabled:text-[#E9F2F7]/60 focus-visible:outline-[#E9F2F7]"
            >
              {podeAdicionar ? "Adicionar ao carrinho" : "Esgotado"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={alternarComparador}
              aria-pressed={noComparador}
              className="inline-flex items-center gap-2 border border-[#20C7D9]/60 px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#20C7D9] transition-colors hover:bg-[#20C7D9] hover:text-[#0B1220] focus-visible:outline-[#20C7D9]"
            >
              <GitCompare className="h-4 w-4" aria-hidden="true" />
              {noComparador ? "No comparador" : "Comparar"}
            </button>
          </div>

          <p role="status" aria-live="polite" className="mt-3 min-h-5 text-xs text-[#20C7D9]">
            {avisoComparador ?? ""}
          </p>

          {cart.notice && (
            <p
              role="status"
              aria-live="polite"
              className={`mt-3 border px-4 py-3 text-sm ${
                cart.notice.tone === "error"
                  ? "border-[#FF8A80]/40 bg-[#FF8A80]/10 text-[#FFB4AC]"
                  : "border-[#20C7D9]/50 bg-[#172B40] text-[#E9F2F7]"
              }`}
            >
              {cart.notice.text}
            </p>
          )}

          <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-[#E9F2F7]/12 pt-6 text-sm sm:grid-cols-2">
            <div className="flex justify-between gap-4">
              <dt className="text-[#E9F2F7]/55">Categoria</dt>
              <dd className="font-medium text-[#E9F2F7]">{categoria}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#E9F2F7]/55">Código</dt>
              <dd className="font-mono text-xs text-[#E9F2F7]">
                NEX-{product.slug}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#E9F2F7]/55">Atributos listados</dt>
              <dd className="font-medium text-[#E9F2F7]">
                {product.specs?.length ?? 0}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#E9F2F7]/55">Estoque demo</dt>
              <dd className="font-medium tabular-nums text-[#E9F2F7]">
                {product.stock}
              </dd>
            </div>
          </dl>

          <p className="mt-6 text-xs leading-relaxed text-[#E9F2F7]/50">
            Demonstração da Code Maestro Tech: marcas, modelos e especificações
            são inventados; nenhum pagamento é processado nesta loja.
          </p>

          <Link
            href={`${BASE}/comparador`}
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#20C7D9] underline underline-offset-4 hover:text-[#E9F2F7] focus-visible:outline-[#20C7D9]"
          >
            Abrir comparador
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section aria-labelledby="nexus-relacionados" className="mt-16">
          <h2
            id="nexus-relacionados"
            className="text-lg font-bold uppercase tracking-[0.2em] text-[#E9F2F7]"
          >
            Da mesma categoria
          </h2>
          <ul className="mt-6 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((item) => (
              <li key={item.id} className="h-full">
                <NexusProductCard product={item} />
              </li>
            ))}
          </ul>
          <Link
            href={`${BASE}/produtos`}
            className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#20C7D9] underline underline-offset-4 hover:text-[#E9F2F7] focus-visible:outline-[#20C7D9]"
          >
            Voltar ao catálogo
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </section>
      )}
    </div>
  );
}
