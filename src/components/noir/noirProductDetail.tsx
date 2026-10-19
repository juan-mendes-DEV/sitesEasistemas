"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "@/types/ecommerce";
import { formatBRL, formatStock, productImageAlt } from "@/lib/ecommerce/format";
import { QuantityStepper } from "@/components/ecommerce/quantityStepper";
import {
  useCart,
  useFavorites,
  useStore,
} from "@/components/ecommerce/storeProvider";
import { NOIR_CATEGORIES, NOIR_STORE } from "./data";
import { NoirProductCard } from "./noirProductCard";

const BASE = NOIR_STORE.route;

export function NoirProductDetail({ product }: { product: Product }) {
  const { products } = useStore();
  const cart = useCart();
  const favorites = useFavorites();

  const [imagem, setImagem] = useState(0);
  const [tamanho, setTamanho] = useState<string | null>(null);
  const [cor, setCor] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(1);

  const clearNotice = cart.clearNotice;
  useEffect(() => {
    clearNotice();
  }, [product.id, clearNotice]);

  const temVariantes = Boolean(product.variants?.length);
  const variacao =
    temVariantes && tamanho !== null && cor !== null
      ? product.variants?.find(
          (item) => item.size === tamanho && item.color === cor,
        ) ?? null
      : null;
  const selecaoCompleta = !temVariantes || (tamanho !== null && cor !== null);
  const estoqueSelecionado = temVariantes
    ? variacao
      ? variacao.stock
      : 0
    : product.stock;
  const podeAdicionar = selecaoCompleta && estoqueSelecionado > 0;

  const categoria =
    NOIR_CATEGORIES.find((item) => item.id === product.category)?.label ?? "";
  const favorito = favorites.has(product.id);
  const relacionados = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 3);

  function adicionar() {
    const resultado = cart.add({
      productId: product.id,
      variantId: variacao?.id ?? null,
      quantity: quantidade,
    });
    if (resultado.ok) setQuantidade(1);
  }

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Galeria */}
        <div>
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#111111]/12 bg-white">
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
                className={`relative aspect-[3/4] w-20 overflow-hidden border transition-colors focus-visible:outline-[#A99A86] ${
                  imagem === indice
                    ? "border-[#111111]"
                    : "border-[#111111]/15 hover:border-[#666666]"
                }`}
              >
                <Image
                  src={caminho}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Informações e compra */}
        <div>
          <div className="flex items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#666666]">
              {categoria}
            </p>
            {product.badge && (
              <span className="bg-[#111111] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F2EFE9]">
                {product.badge}
              </span>
            )}
          </div>

          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#111111] sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold tabular-nums text-[#111111]">
              {formatBRL(product.price)}
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#666666]">
              Preço fictício
            </span>
          </p>

          <p className="mt-5 text-sm leading-relaxed text-[#666666]">
            {product.description}
          </p>

          {/* Seleção de tamanho e cor */}
          {temVariantes && (
            <div className="mt-7 space-y-5">
              <fieldset>
                <legend className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#111111]">
                  Tamanho
                </legend>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {product.sizes?.map((size) => (
                    <label key={size} className="cursor-pointer">
                      <input
                        type="radio"
                        name={`${product.slug}-tamanho`}
                        value={size}
                        checked={tamanho === size}
                        onChange={() => {
                          setTamanho(size);
                          setQuantidade(1);
                        }}
                        className="peer sr-only"
                      />
                      <span className="inline-flex min-w-11 justify-center border border-[#111111]/25 px-3 py-2 text-xs font-semibold text-[#111111] transition-colors peer-checked:border-[#111111] peer-checked:bg-[#111111] peer-checked:text-[#F2EFE9] peer-focus-visible:ring-2 peer-focus-visible:ring-[#A99A86] peer-focus-visible:ring-offset-2">
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#111111]">
                  Cor
                </legend>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {product.colors?.map((opcao) => (
                    <label key={opcao} className="cursor-pointer">
                      <input
                        type="radio"
                        name={`${product.slug}-cor`}
                        value={opcao}
                        checked={cor === opcao}
                        onChange={() => {
                          setCor(opcao);
                          setQuantidade(1);
                        }}
                        className="peer sr-only"
                      />
                      <span className="inline-flex justify-center border border-[#111111]/25 px-3.5 py-2 text-xs font-semibold text-[#111111] transition-colors peer-checked:border-[#111111] peer-checked:bg-[#111111] peer-checked:text-[#F2EFE9] peer-focus-visible:ring-2 peer-focus-visible:ring-[#A99A86] peer-focus-visible:ring-offset-2">
                        {opcao}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {!selecaoCompleta && (
                <p className="text-xs text-[#666666]">
                  Selecione tamanho e cor para habilitar a compra.
                </p>
              )}
              {selecaoCompleta && estoqueSelecionado === 0 && (
                <p className="text-xs font-semibold text-[#8C1D18]">
                  Combinação esgotada no estoque demonstrativo.
                </p>
              )}
            </div>
          )}

          {/* Quantidade + adicionar */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <QuantityStepper
              value={quantidade}
              max={Math.max(estoqueSelecionado, 1)}
              onChange={setQuantidade}
              label={product.name}
              disabled={!podeAdicionar}
              className="inline-flex items-stretch border border-[#111111]/25 bg-white"
              buttonClassName="px-3 py-3 text-[#111111] transition-colors hover:bg-[#F2EFE9] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-[#A99A86]"
              valueClassName="min-w-10 self-center text-center text-sm font-bold tabular-nums text-[#111111]"
            />
            <button
              type="button"
              onClick={adicionar}
              disabled={!podeAdicionar}
              className="inline-flex items-center gap-2 bg-[#111111] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F2EFE9] transition-colors hover:bg-[#666666] disabled:cursor-not-allowed disabled:bg-[#666666]/40 focus-visible:outline-[#A99A86]"
            >
              {selecaoCompleta
                ? estoqueSelecionado > 0
                  ? "Adicionar ao carrinho"
                  : "Esgotado"
                : "Selecione as opções"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => favorites.toggle(product.id)}
              aria-pressed={favorito}
              aria-label={
                favorito
                  ? `Remover ${product.name} dos favoritos`
                  : `Adicionar ${product.name} aos favoritos`
              }
              className="inline-flex items-center gap-2 border border-[#111111]/25 px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#111111] transition-colors hover:border-[#111111] focus-visible:outline-[#A99A86]"
            >
              <Heart
                className={`h-4 w-4 ${favorito ? "fill-[#111111]" : ""}`}
                aria-hidden="true"
              />
              {favorito ? "Salvo" : "Favoritar"}
            </button>
          </div>

          <p className="mt-4 text-xs text-[#666666]">
            {formatStock(estoqueSelecionado)}
          </p>

          {cart.notice && (
            <p
              role="status"
              aria-live="polite"
              className={`mt-4 border px-4 py-3 text-sm ${
                cart.notice.tone === "error"
                  ? "border-[#8C1D18]/40 bg-[#8C1D18]/5 text-[#8C1D18]"
                  : "border-[#111111]/20 bg-white text-[#111111]"
              }`}
            >
              {cart.notice.text}
            </p>
          )}

          {/* Detalhes */}
          <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-[#111111]/12 pt-6 text-sm sm:grid-cols-2">
            <div className="flex justify-between gap-4">
              <dt className="text-[#666666]">Categoria</dt>
              <dd className="font-medium text-[#111111]">{categoria}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#666666]">Código</dt>
              <dd className="font-mono text-xs text-[#111111]">
                NOIR-{product.slug}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#666666]">Tamanhos</dt>
              <dd className="font-medium text-[#111111]">
                {product.sizes?.join(", ") ?? "Não se aplica"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#666666]">Cores</dt>
              <dd className="font-medium text-[#111111]">
                {product.colors?.join(", ") ?? "Não se aplica"}
              </dd>
            </div>
          </dl>

          <p className="mt-6 text-xs leading-relaxed text-[#666666]">
            Demonstração da Code Maestro Tech: ficha, preços e estoques são
            fictícios e nenhum pagamento é processado nesta loja.
          </p>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section aria-labelledby="noir-relacionados" className="mt-16">
          <h2
            id="noir-relacionados"
            className="text-lg font-black uppercase tracking-[0.25em] text-[#111111]"
          >
            Você também pode ver
          </h2>
          <ul className="mt-6 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((item) => (
              <li key={item.id} className="h-full">
                <NoirProductCard product={item} />
              </li>
            ))}
          </ul>
          <Link
            href={`${BASE}/produtos`}
            className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111111] underline underline-offset-4 transition-colors hover:text-[#666666] focus-visible:outline-[#A99A86]"
          >
            Voltar ao catálogo
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </section>
      )}
    </div>
  );
}
