"use client";

import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { formatBRL } from "@/lib/ecommerce/format";
import { useCart } from "@/components/ecommerce/storeProvider";
import { useDemoCheckout } from "@/components/ecommerce/useDemoCheckout";
import { NEXUS_STORE } from "./data";

const BASE = NEXUS_STORE.route;

export function NexusCheckoutView() {
  const cart = useCart();
  const checkout = useDemoCheckout();

  if (checkout.order) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-[#20C7D9] bg-[#172B40] p-8 sm:p-10"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center bg-[#20C7D9] text-[#0B1220]">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl font-black tracking-tight text-[#E9F2F7]">
          Pedido demonstrativo criado.
        </h2>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-[#20C7D9]">
          {checkout.successNotice}
        </p>

        <dl className="mt-6 grid gap-3 border-t border-[#E9F2F7]/15 pt-6 text-sm sm:grid-cols-2">
          <div className="flex justify-between gap-4">
            <dt className="text-[#E9F2F7]/60">Identificador</dt>
            <dd className="font-mono text-xs text-[#E9F2F7]">
              {checkout.order.id}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#E9F2F7]/60">Itens</dt>
            <dd className="tabular-nums text-[#E9F2F7]">
              {checkout.order.itemCount}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#E9F2F7]/60">Total fictício</dt>
            <dd className="font-bold tabular-nums text-[#E9F2F7]">
              {formatBRL(checkout.order.total)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#E9F2F7]/60">Criado em</dt>
            <dd className="text-[#E9F2F7]">
              {new Date(checkout.order.createdAt).toLocaleString("pt-BR")}
            </dd>
          </div>
        </dl>

        <ul className="mt-6 list-none space-y-2 border-t border-[#E9F2F7]/15 p-0 pt-6 text-sm">
          {checkout.order.items.map((item) => (
            <li
              key={`${item.productId}-${item.variantLabel ?? "-"}`}
              className="flex justify-between gap-4"
            >
              <span className="text-[#E9F2F7]">
                {item.quantity}× {item.name}
                {item.variantLabel ? ` — ${item.variantLabel}` : ""}
              </span>
              <span className="tabular-nums text-[#E9F2F7]/70">
                {formatBRL(item.lineTotal)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`${BASE}/produtos`}
            className="bg-[#20C7D9] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B1220] transition-colors hover:bg-[#E9F2F7] focus-visible:outline-[#E9F2F7]"
          >
            Continuar no catálogo
          </Link>
          <Link
            href={BASE}
            className="border border-[#20C7D9]/60 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#20C7D9] transition-colors hover:bg-[#20C7D9] hover:text-[#0B1220] focus-visible:outline-[#20C7D9]"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  if (!cart.loaded) {
    return (
      <p role="status" aria-live="polite" className="text-sm text-[#E9F2F7]/65">
        Carregando o resumo (demonstração)…
      </p>
    );
  }

  if (cart.resolved.length === 0) {
    return (
      <div className="border border-dashed border-[#E9F2F7]/25 p-10 text-center">
        <p className="text-base font-semibold text-[#E9F2F7]">
          Nada para finalizar ainda.
        </p>
        <p className="mt-2 text-sm text-[#E9F2F7]/60">
          Adicione produtos ao carrinho para gerar um pedido demonstrativo.
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
      <div>
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#20C7D9]">
          Resumo do pedido
        </h2>
        <ul className="mt-4 list-none space-y-3 border border-[#E9F2F7]/12 bg-[#172B40] p-5">
          {cart.resolved.map((linha) => (
            <li
              key={linha.key}
              className="flex items-start justify-between gap-4 border-b border-[#E9F2F7]/10 pb-3 text-sm last:border-b-0 last:pb-0"
            >
              <span className="text-[#E9F2F7]">
                {linha.quantity}× {linha.product.name}
                {linha.variantLabel ? ` — ${linha.variantLabel}` : ""}
              </span>
              <span className="shrink-0 tabular-nums text-[#E9F2F7]/65">
                {formatBRL(linha.lineTotal)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex gap-3 border border-[#20C7D9]/40 bg-[#0B1220] p-4 text-xs leading-relaxed text-[#E9F2F7]/75">
          <ShieldCheck
            className="h-4 w-4 shrink-0 text-[#20C7D9]"
            aria-hidden="true"
          />
          <p>{checkout.disclaimer}</p>
        </div>

        {checkout.error && (
          <p
            role="alert"
            className="mt-4 text-sm font-semibold text-[#FFB4AC]"
          >
            {checkout.error}
          </p>
        )}
      </div>

      <aside
        aria-label="Total do pedido"
        className="h-fit border border-[#20C7D9]/50 bg-[#172B40] p-6 lg:sticky lg:top-24"
      >
        <dl className="space-y-3 text-sm text-[#E9F2F7]">
          <div className="flex justify-between gap-4">
            <dt className="text-[#E9F2F7]/60">Itens</dt>
            <dd className="tabular-nums">{cart.totals.itemCount}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-[#E9F2F7]/15 pt-3 text-base font-bold">
            <dt>Total demonstrativo</dt>
            <dd className="tabular-nums">{formatBRL(cart.totals.total)}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={checkout.finalize}
          className="mt-6 w-full bg-[#20C7D9] px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B1220] transition-colors hover:bg-[#E9F2F7] focus-visible:outline-[#E9F2F7]"
        >
          Gerar pedido demonstrativo
        </button>

        <p className="mt-4 text-xs leading-relaxed text-[#E9F2F7]/55">
          Sem cartão, CPF, endereço ou qualquer dado pessoal. O pedido existe
          apenas nesta demonstração.
        </p>
      </aside>
    </div>
  );
}
