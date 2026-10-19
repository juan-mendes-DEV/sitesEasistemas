"use client";

import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { formatBRL } from "@/lib/ecommerce/format";
import { useCart } from "@/components/ecommerce/storeProvider";
import { useDemoCheckout } from "@/components/ecommerce/useDemoCheckout";
import { NOIR_STORE } from "./data";

const BASE = NOIR_STORE.route;

export function NoirCheckoutView() {
  const cart = useCart();
  const checkout = useDemoCheckout();

  if (checkout.order) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-[#111111] bg-white p-8 sm:p-10"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center bg-[#111111] text-[#F2EFE9]">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl font-black tracking-tight text-[#111111]">
          Pedido demonstrativo criado.
        </h2>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-[#111111]">
          {checkout.successNotice}
        </p>

        <dl className="mt-6 grid gap-3 border-t border-[#111111]/12 pt-6 text-sm sm:grid-cols-2">
          <div className="flex justify-between gap-4">
            <dt className="text-[#666666]">Identificador</dt>
            <dd className="font-mono text-xs text-[#111111]">
              {checkout.order.id}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#666666]">Itens</dt>
            <dd className="tabular-nums text-[#111111]">
              {checkout.order.itemCount}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#666666]">Total fictício</dt>
            <dd className="font-bold tabular-nums text-[#111111]">
              {formatBRL(checkout.order.total)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#666666]">Criado em</dt>
            <dd className="text-[#111111]">
              {new Date(checkout.order.createdAt).toLocaleString("pt-BR")}
            </dd>
          </div>
        </dl>

        <ul className="mt-6 list-none space-y-2 border-t border-[#111111]/12 p-0 pt-6 text-sm text-[#666666]">
          {checkout.order.items.map((item) => (
            <li
              key={`${item.productId}-${item.variantLabel ?? "-"}`}
              className="flex justify-between gap-4"
            >
              <span className="text-[#111111]">
                {item.quantity}× {item.name}
                {item.variantLabel ? ` — ${item.variantLabel}` : ""}
              </span>
              <span className="tabular-nums">{formatBRL(item.lineTotal)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`${BASE}/produtos`}
            className="bg-[#111111] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F2EFE9] transition-colors hover:bg-[#666666] focus-visible:outline-[#A99A86]"
          >
            Continuar no catálogo
          </Link>
          <Link
            href={BASE}
            className="border border-[#111111]/25 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#111111] transition-colors hover:border-[#111111] focus-visible:outline-[#A99A86]"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  if (!cart.loaded) {
    return (
      <p role="status" aria-live="polite" className="text-sm text-[#666666]">
        Carregando o resumo (demonstração)…
      </p>
    );
  }

  if (cart.resolved.length === 0) {
    return (
      <div className="border border-dashed border-[#111111]/25 p-10 text-center">
        <p className="text-base font-semibold text-[#111111]">
          Nada para finalizar ainda.
        </p>
        <p className="mt-2 text-sm text-[#666666]">
          Adicione produtos ao carrinho para gerar um pedido demonstrativo.
        </p>
        <Link
          href={`${BASE}/produtos`}
          className="mt-5 inline-block bg-[#111111] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F2EFE9] transition-colors hover:bg-[#666666] focus-visible:outline-[#A99A86]"
        >
          Explorar o catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-12">
      <div>
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#666666]">
          Resumo do pedido
        </h2>
        <ul className="mt-4 list-none space-y-3 border border-[#111111]/12 bg-white p-5">
          {cart.resolved.map((linha) => (
            <li
              key={linha.key}
              className="flex items-start justify-between gap-4 border-b border-[#111111]/10 pb-3 text-sm last:border-b-0 last:pb-0"
            >
              <span className="text-[#111111]">
                {linha.quantity}× {linha.product.name}
                {linha.variantLabel ? ` — ${linha.variantLabel}` : ""}
              </span>
              <span className="shrink-0 tabular-nums text-[#666666]">
                {formatBRL(linha.lineTotal)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex gap-3 border border-[#111111]/15 bg-[#F2EFE9] p-4 text-xs leading-relaxed text-[#666666]">
          <ShieldCheck
            className="h-4 w-4 shrink-0 text-[#111111]"
            aria-hidden="true"
          />
          <p>{checkout.disclaimer}</p>
        </div>

        {checkout.error && (
          <p role="alert" className="mt-4 text-sm font-semibold text-[#8C1D18]">
            {checkout.error}
          </p>
        )}
      </div>

      <aside
        aria-label="Total do pedido"
        className="h-fit border border-[#111111] bg-[#111111] p-6 text-[#F2EFE9] lg:sticky lg:top-24"
      >
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-[#F2EFE9]/70">Itens</dt>
            <dd className="tabular-nums">{cart.totals.itemCount}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-[#F2EFE9]/15 pt-3 text-base font-bold">
            <dt>Total demonstrativo</dt>
            <dd className="tabular-nums">{formatBRL(cart.totals.total)}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={checkout.finalize}
          className="mt-6 w-full bg-[#A99A86] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#111111] transition-colors hover:bg-[#F2EFE9] focus-visible:outline-[#F2EFE9]"
        >
          Gerar pedido demonstrativo
        </button>

        <p className="mt-4 text-xs leading-relaxed text-[#F2EFE9]/60">
          Sem cartão, CPF, endereço ou qualquer dado pessoal. O pedido existe
          apenas nesta demonstração.
        </p>
      </aside>
    </div>
  );
}
