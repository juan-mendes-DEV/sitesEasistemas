"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trash } from "lucide-react";
import { formatBRL, productImageAlt } from "@/lib/ecommerce/format";
import { QuantityStepper } from "@/components/ecommerce/quantityStepper";
import { useCart } from "@/components/ecommerce/storeProvider";
import { NEXUS_STORE } from "./data";

const BASE = NEXUS_STORE.route;

export function NexusCartView() {
  const cart = useCart();

  if (!cart.loaded) {
    return (
      <p role="status" aria-live="polite" className="text-sm text-[#E9F2F7]/65">
        Carregando seu carrinho (demonstração)…
      </p>
    );
  }

  if (cart.resolved.length === 0) {
    return (
      <div className="border border-dashed border-[#E9F2F7]/25 p-10 text-center">
        <p className="text-base font-semibold text-[#E9F2F7]">
          Seu carrinho está vazio.
        </p>
        <p className="mt-2 text-sm text-[#E9F2F7]/60">
          Os produtos adicionados aparecem aqui — este carrinho não compartilha
          itens com outras lojas da demonstração.
        </p>
        <Link
          href={`${BASE}/produtos`}
          className="mt-5 inline-block bg-[#20C7D9] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1220] transition-colors hover:bg-[#E9F2F7] focus-visible:outline-[#E9F2F7]"
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
            className="flex gap-4 border border-[#E9F2F7]/12 bg-[#172B40] p-4 sm:gap-6"
          >
            <div className="relative aspect-square w-20 shrink-0 overflow-hidden border border-[#E9F2F7]/10 sm:w-24">
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
                  <h3 className="truncate text-sm font-semibold text-[#E9F2F7]">
                    <Link
                      href={`${BASE}/produtos/${linha.product.slug}`}
                      className="hover:text-[#20C7D9] focus-visible:outline-[#20C7D9]"
                    >
                      {linha.product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-xs tabular-nums text-[#E9F2F7]/55">
                    {formatBRL(linha.unitPrice)} · unidade (fictício)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => cart.remove(linha.key)}
                  aria-label={`Remover ${linha.product.name} do carrinho`}
                  className="p-2 text-[#E9F2F7]/55 transition-colors hover:text-[#FF8A80] focus-visible:outline-[#20C7D9]"
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
                  className="inline-flex items-stretch border border-[#E9F2F7]/25 bg-[#0B1220]"
                  buttonClassName="px-2.5 py-2 text-[#E9F2F7] transition-colors hover:bg-[#172B40] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-[#20C7D9]"
                  valueClassName="min-w-9 self-center text-center text-sm font-bold tabular-nums text-[#E9F2F7]"
                />
                <span className="text-sm font-bold tabular-nums text-[#E9F2F7]">
                  {formatBRL(linha.lineTotal)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside
        aria-label="Resumo do carrinho"
        className="h-fit border border-[#20C7D9]/50 bg-[#172B40] p-6 lg:sticky lg:top-24"
      >
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#20C7D9]">
          Resumo
        </h2>
        <dl className="mt-5 space-y-3 text-sm text-[#E9F2F7]">
          <div className="flex justify-between gap-4">
            <dt className="text-[#E9F2F7]/60">Itens</dt>
            <dd className="tabular-nums">{cart.totals.itemCount}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#E9F2F7]/60">Subtotal</dt>
            <dd className="tabular-nums">{formatBRL(cart.totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-[#E9F2F7]/15 pt-3 text-base font-bold">
            <dt>Total demonstrativo</dt>
            <dd className="tabular-nums">{formatBRL(cart.totals.total)}</dd>
          </div>
        </dl>

        <Link
          href={`${BASE}/checkout`}
          className="mt-6 flex items-center justify-center gap-2 bg-[#20C7D9] px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B1220] transition-colors hover:bg-[#E9F2F7] focus-visible:outline-[#E9F2F7]"
        >
          Finalizar (demonstração)
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <p className="mt-4 text-xs leading-relaxed text-[#E9F2F7]/55">
          Sem cobrança e sem coleta de dados: o total é apenas ilustrativo.
        </p>

        {cart.notice && (
          <p
            role="status"
            aria-live="polite"
            className={`mt-4 border px-3 py-2.5 text-xs ${
              cart.notice.tone === "error"
                ? "border-[#FF8A80]/50 bg-[#FF8A80]/10 text-[#FFB4AC]"
                : "border-[#20C7D9]/50 bg-[#0B1220] text-[#E9F2F7]"
            }`}
          >
            {cart.notice.text}
          </p>
        )}
      </aside>
    </div>
  );
}
