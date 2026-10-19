"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "@/types/ecommerce";
import { formatBRL, formatStock, productImageAlt } from "@/lib/ecommerce/format";
import { QuantityStepper } from "@/components/ecommerce/quantityStepper";
import { useCart, useStore } from "@/components/ecommerce/storeProvider";
import { BOTANICA_CATEGORIES, BOTANICA_NOTICE, BOTANICA_STORE } from "./data";
import { BotanicaProductCard } from "./botanicaProductCard";

const BASE = BOTANICA_STORE.route;

export function BotanicaProductDetail({ product }: { product: Product }) {
  const { products } = useStore();
  const cart = useCart();

  const [imagem, setImagem] = useState(0);
  const [quantidade, setQuantidade] = useState(1);

  const clearNotice = cart.clearNotice;
  useEffect(() => {
    clearNotice();
  }, [product.id, clearNotice]);

  const categoria =
    BOTANICA_CATEGORIES.find((item) => item.id === product.category)?.label ??
    "";
  const podeAdicionar = product.stock > 0;
  const relacionados = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 3);

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
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#3F5748]/15 bg-[#E8E1D3]/60">
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
                className={`relative aspect-[4/3] w-24 overflow-hidden border transition-colors focus-visible:outline-[#C7A88A] ${
                  imagem === indice
                    ? "border-[#3F5748]"
                    : "border-[#3F5748]/20 hover:border-[#3F5748]/60"
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

          {/* Ingredientes */}
          {(product.ingredients || product.kitContents) && (
            <section aria-labelledby="botanica-ficha" className="mt-8">
              <h2
                id="botanica-ficha"
                className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#3F5748]"
              >
                Conteúdo demonstrativo
              </h2>
              <div className="mt-4 space-y-5 border border-[#3F5748]/15 bg-[#E8E1D3]/40 p-5">
                {product.kitContents && (
                  <div>
                    <h3 className="text-sm font-semibold text-[#3F5748]">
                      Conteúdo do kit
                    </h3>
                    <ul className="mt-2 space-y-1.5 text-sm text-[#493F36]/80">
                      {product.kitContents.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Leaf
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C7A88A]"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.ingredients && (
                  <div>
                    <h3 className="text-sm font-semibold text-[#3F5748]">
                      Ingredientes (ilustrativos)
                    </h3>
                    <p className="mt-1 text-xs text-[#493F36]/65">
                      Lista fictícia apenas para demonstrar o formato da ficha.
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {product.ingredients.map((item) => (
                        <li
                          key={item}
                          className="border border-[#3F5748]/25 bg-white px-3 py-1.5 text-xs text-[#493F36]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="border-t border-[#3F5748]/15 pt-4 text-xs leading-relaxed text-[#493F36]/65">
                  {BOTANICA_NOTICE}
                </p>
              </div>
            </section>
          )}
        </div>

        {/* Compra */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C7A88A]">
              {categoria}
            </p>
            {product.badge && (
              <span className="bg-[#3F5748] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FAF8F2]">
                {product.badge}
              </span>
            )}
          </div>

          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#3F5748] sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold tabular-nums text-[#493F36]">
              {formatBRL(product.price)}
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#493F36]/60">
              Preço fictício
            </span>
            {product.volume && (
              <span className="text-xs text-[#493F36]/70">
                · {product.volume}
              </span>
            )}
          </p>

          <p className="mt-5 text-sm leading-relaxed text-[#493F36]/80">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs text-[#3F5748]">
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
              className="inline-flex items-stretch border border-[#3F5748]/30 bg-white"
              buttonClassName="px-3 py-3 text-[#493F36] transition-colors hover:bg-[#E8E1D3] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-[#C7A88A]"
              valueClassName="min-w-10 self-center text-center text-sm font-bold tabular-nums text-[#3F5748]"
            />
            <button
              type="button"
              onClick={adicionar}
              disabled={!podeAdicionar}
              className="inline-flex items-center gap-2 bg-[#3F5748] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FAF8F2] transition-colors hover:bg-[#493F36] disabled:cursor-not-allowed disabled:bg-[#493F36]/30 disabled:text-[#FAF8F2]/70 focus-visible:outline-[#C7A88A]"
            >
              {podeAdicionar ? "Adicionar ao carrinho" : "Esgotado"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {cart.notice && (
            <p
              role="status"
              aria-live="polite"
              className={`mt-4 border px-4 py-3 text-sm ${
                cart.notice.tone === "error"
                  ? "border-[#8C1D18]/40 bg-[#8C1D18]/5 text-[#8C1D18]"
                  : "border-[#3F5748]/30 bg-white text-[#3F5748]"
              }`}
            >
              {cart.notice.text}
            </p>
          )}

          <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-[#3F5748]/15 pt-6 text-sm sm:grid-cols-2">
            <div className="flex justify-between gap-4">
              <dt className="text-[#493F36]/65">Categoria</dt>
              <dd className="font-medium text-[#3F5748]">{categoria}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#493F36]/65">Código</dt>
              <dd className="font-mono text-xs text-[#3F5748]">
                BOT-{product.slug}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#493F36]/65">Volume</dt>
              <dd className="font-medium text-[#3F5748]">
                {product.volume ?? "Não informado"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#493F36]/65">Estoque demo</dt>
              <dd className="font-medium tabular-nums text-[#3F5748]">
                {product.stock}
              </dd>
            </div>
          </dl>

          <p className="mt-6 text-xs leading-relaxed text-[#493F36]/65">
            Demonstração da Code Maestro Tech: fórmulas, volumes e preços são
            fictícios; a loja não afirma propriedades médicas, terapêuticas ou
            de eficácia e não possui certificações.
          </p>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section aria-labelledby="botanica-relacionados" className="mt-16">
          <h2
            id="botanica-relacionados"
            className="text-lg font-semibold uppercase tracking-[0.22em] text-[#3F5748]"
          >
            Da mesma categoria
          </h2>
          <ul className="mt-6 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((item) => (
              <li key={item.id} className="h-full">
                <BotanicaProductCard product={item} />
              </li>
            ))}
          </ul>
          <Link
            href={`${BASE}/produtos`}
            className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#3F5748] underline underline-offset-4 hover:text-[#493F36] focus-visible:outline-[#C7A88A]"
          >
            Voltar ao catálogo
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </section>
      )}
    </div>
  );
}
