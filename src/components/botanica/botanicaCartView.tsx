"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trash } from "lucide-react";
import { formatBRL, productImageAlt } from "@/lib/ecommerce/format";
import { QuantityStepper } from "@/components/ecommerce/quantityStepper";
import { useCart } from "@/components/ecommerce/storeProvider";
import { BOTANICA_STORE } from "./data";

const BASE = BOTANICA_STORE.route;

export function BotanicaCartView() {
  const cart = useCart();

  if (!cart.loaded) {
    return (
      <p role="status" aria-live="polite" className="text-sm text-[#493F36]/70">
        Carregando seu carrinho (demonstração)…
      </p>
    );
  }

  if (cart.resolved.length === 0) {
    return (
      <div className="border border-dashed border-[#3F5748]/30 p-10 text-center">
        <p className="text-base font-semibold text-[#3F5748]">
          Seu carrinho está vazio.
        </p>
        <p className="mt-2 text-sm text-[#493F36]/70">
          Os itens adicionados aparecem aqui — sem cadastro e sem pagamento.
        </p>
        <Link
          href={`${BASE}/produtos`}
          className="mt-5 inline-block bg-[#3F5748] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAF8F2] transition-colors hover:bg-[#493F36] focus-visible:outline-[#C7A88A]"
        >
          Explorar o catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-12">
      <ul className="list-none space-y-5 p-0">
        {cart.resolved.map((linha) => (
          <li
            key={linha.key}
            className="flex gap-4 border border-[#3F5748]/15 bg-[#E8E1D3]/40 p-4 sm:gap-6"
          >
            <div className="relative aspect-[4/3] w-20 shrink-0 overflow-hidden border border-[#3F5748]/10 sm:w-24">
              <Image
                src={linha.product.images[0]}
                alt={productImageAlt(linha.product.name, 0)}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-[#3F5748]">
                    <Link
                      href={`${BASE}/produtos/${linha.product.slug}`}
                      className="hover:text-[#493F36] focus-visible:outline-[#C7A88A]"
                    >
                      {linha.product.name}
                    </Link>
                  </h3>
                  {linha.product.volume && (
                    <p className="mt-0.5 text-xs text-[#493F36]/70">
                      {linha.product.volume}
                    </p>
                  )}
                  <p className="mt-1 text-xs tabular-nums text-[#493F36]/70">
                    {formatBRL(linha.unitPrice)} · unidade (fictício)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => cart.remove(linha.key)}
                  aria-label={`Remover ${linha.product.name} do carrinho`}
                  className="p-2 text-[#493F36]/65 transition-colors hover:text-[#8C1D18] focus-visible:outline-[#C7A88A]"
                >
                  <Trash className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                <QuantityStepper
                  value={linha.quantity}
                  max={linha.maxStock}
                  onChange={(valor) => cart.setQuantity(linha.key, valor)}
                  label={linha.product.name}
                  className="inline-flex items-stretch border border-[#3F5748]/30 bg-white"
                  buttonClassName="px-2.5 py-2 text-[#493F36] transition-colors hover:bg-[#E8E1D3] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-[#C7A88A]"
                  valueClassName="min-w-9 self-center text-center text-sm font-bold tabular-nums text-[#3F5748]"
                />
                <span className="text-sm font-bold tabular-nums text-[#3F5748]">
                  {formatBRL(linha.lineTotal)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside
        aria-label="Resumo do carrinho"
        className="h-fit border border-[#3F5748] bg-[#3F5748] p-6 text-[#FAF8F2] lg:sticky lg:top-24"
      >
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C7A88A]">
          Resumo
        </h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-[#FAF8F2]/70">Itens</dt>
            <dd className="tabular-nums">{cart.totals.itemCount}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#FAF8F2]/70">Subtotal</dt>
            <dd className="tabular-nums">{formatBRL(cart.totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-[#FAF8F2]/15 pt-3 text-base font-bold">
            <dt>Total demonstrativo</dt>
            <dd className="tabular-nums">{formatBRL(cart.totals.total)}</dd>
          </div>
        </dl>

        <Link
          href={`${BASE}/checkout`}
          className="mt-6 flex items-center justify-center gap-2 bg-[#C7A88A] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#493F36] transition-colors hover:bg-[#FAF8F2] focus-visible:outline-[#FAF8F2]"
        >
          Finalizar (demonstração)
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <p className="mt-4 text-xs leading-relaxed text-[#FAF8F2]/65">
          Nenhum dado pessoal é solicitado e nenhum pagamento é processado.
          Total apenas ilustrativo.
        </p>

        {cart.notice && (
          <p
            role="status"
            aria-live="polite"
            className={`mt-4 border px-3 py-2.5 text-xs ${
              cart.notice.tone === "error"
                ? "border-[#F5C7C1]/60 bg-[#8C1D18]/25 text-[#FFD9D5]"
                : "border-[#C7A88A]/50 bg-[#FAF8F2]/10 text-[#FAF8F2]"
            }`}
          >
            {cart.notice.text}
          </p>
        )}
      </aside>
    </div>
  );
}
