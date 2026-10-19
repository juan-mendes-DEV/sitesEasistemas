"use client";

import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { formatBRL } from "@/lib/ecommerce/format";
import { useCart } from "@/components/ecommerce/storeProvider";
import { useDemoCheckout } from "@/components/ecommerce/useDemoCheckout";
import { BOTANICA_STORE } from "./data";

const BASE = BOTANICA_STORE.route;

export function BotanicaCheckoutView() {
  const cart = useCart();
  const checkout = useDemoCheckout();

  if (checkout.order) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-[#3F5748] bg-white p-8 sm:p-10"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center bg-[#3F5748] text-[#FAF8F2]">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#3F5748]">
          Pedido demonstrativo criado.
        </h2>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-[#493F36]">
          {checkout.successNotice}
        </p>

        <dl className="mt-6 grid gap-3 border-t border-[#3F5748]/15 pt-6 text-sm sm:grid-cols-2">
          <div className="flex justify-between gap-4">
            <dt className="text-[#493F36]/65">Identificador</dt>
            <dd className="font-mono text-xs text-[#3F5748]">
              {checkout.order.id}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#493F36]/65">Itens</dt>
            <dd className="tabular-nums text-[#3F5748]">
              {checkout.order.itemCount}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#493F36]/65">Total fictício</dt>
            <dd className="font-bold tabular-nums text-[#3F5748]">
              {formatBRL(checkout.order.total)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#493F36]/65">Criado em</dt>
            <dd className="text-[#3F5748]">
              {new Date(checkout.order.createdAt).toLocaleString("pt-BR")}
            </dd>
          </div>
        </dl>

        <ul className="mt-6 list-none space-y-2 border-t border-[#3F5748]/15 p-0 pt-6 text-sm text-[#493F36]/75">
          {checkout.order.items.map((item) => (
            <li
              key={`${item.productId}-${item.variantLabel ?? "-"}`}
              className="flex justify-between gap-4"
            >
              <span className="text-[#3F5748]">
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
            className="bg-[#3F5748] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAF8F2] transition-colors hover:bg-[#493F36] focus-visible:outline-[#C7A88A]"
          >
            Continuar no catálogo
          </Link>
          <Link
            href={BASE}
            className="border border-[#3F5748]/40 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3F5748] transition-colors hover:border-[#3F5748] focus-visible:outline-[#C7A88A]"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  if (!cart.loaded) {
    return (
      <p role="status" aria-live="polite" className="text-sm text-[#493F36]/70">
        Carregando o resumo (demonstração)…
      </p>
    );
  }

  if (cart.resolved.length === 0) {
    return (
      <div className="border border-dashed border-[#3F5748]/30 p-10 text-center">
        <p className="text-base font-semibold text-[#3F5748]">
          Nada para finalizar ainda.
        </p>
        <p className="mt-2 text-sm text-[#493F36]/70">
          Adicione produtos ao carrinho para gerar um pedido demonstrativo.
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
      <div>
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#3F5748]">
          Resumo do pedido
        </h2>
        <ul className="mt-4 list-none space-y-3 border border-[#3F5748]/15 bg-[#E8E1D3]/40 p-5">
          {cart.resolved.map((linha) => (
            <li
              key={linha.key}
              className="flex items-start justify-between gap-4 border-b border-[#3F5748]/12 pb-3 text-sm last:border-b-0 last:pb-0"
            >
              <span className="text-[#3F5748]">
                {linha.quantity}× {linha.product.name}
                {linha.variantLabel ? ` — ${linha.variantLabel}` : ""}
              </span>
              <span className="shrink-0 tabular-nums text-[#493F36]/70">
                {formatBRL(linha.lineTotal)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex gap-3 border border-[#3F5748]/25 bg-white p-4 text-xs leading-relaxed text-[#493F36]/75">
          <ShieldCheck
            className="h-4 w-4 shrink-0 text-[#3F5748]"
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
        className="h-fit border border-[#3F5748] bg-[#3F5748] p-6 text-[#FAF8F2] lg:sticky lg:top-24"
      >
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-[#FAF8F2]/70">Itens</dt>
            <dd className="tabular-nums">{cart.totals.itemCount}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-[#FAF8F2]/15 pt-3 text-base font-bold">
            <dt>Total demonstrativo</dt>
            <dd className="tabular-nums">{formatBRL(cart.totals.total)}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={checkout.finalize}
          className="mt-6 w-full bg-[#C7A88A] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#493F36] transition-colors hover:bg-[#FAF8F2] focus-visible:outline-[#FAF8F2]"
        >
          Gerar pedido demonstrativo
        </button>

        <p className="mt-4 text-xs leading-relaxed text-[#FAF8F2]/65">
          Sem cartão, CPF, endereço ou qualquer dado pessoal. O pedido existe
          apenas nesta demonstração.
        </p>
      </aside>
    </div>
  );
}
