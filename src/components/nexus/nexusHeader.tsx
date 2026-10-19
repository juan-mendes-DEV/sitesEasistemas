"use client";

import Link from "next/link";
import { GitCompare, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart, useCompare } from "@/components/ecommerce/storeProvider";
import { NEXUS_STORE } from "./data";

const BASE = NEXUS_STORE.route;

const NAV = [
  { label: "Início", href: BASE },
  { label: "Catálogo", href: `${BASE}/produtos` },
  { label: "Comparador", href: `${BASE}/comparador` },
];

export function NexusHeader() {
  const [open, setOpen] = useState(false);
  const cart = useCart();
  const compare = useCompare();

  return (
    <header className="sticky top-0 z-50 border-b border-[#20C7D9]/25 bg-[#0B1220]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href={BASE} className="flex items-center gap-2.5 focus-visible:outline-[#20C7D9]">
            <span className="flex h-8 w-8 items-center justify-center border border-[#20C7D9] text-sm font-black text-[#20C7D9]">
              N
            </span>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#E9F2F7] sm:text-base">
              NEXUS <span className="text-[#20C7D9]">Tech Store</span>
            </span>
          </Link>

          <nav
            aria-label="Navegação principal da NEXUS Tech Store"
            className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.15em] text-[#E9F2F7]/70 md:flex"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[#20C7D9] focus-visible:outline-[#20C7D9]"
              >
                {item.label}
                {item.label === "Comparador" && compare.ids.length > 0 && (
                  <span
                    aria-hidden="true"
                    className="ml-1.5 inline-flex min-w-4.5 items-center justify-center bg-[#20C7D9] px-1 text-[10px] font-bold text-[#0B1220]"
                  >
                    {compare.ids.length}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`${BASE}/carrinho`}
              aria-label={`Carrinho com ${cart.count} ${cart.count === 1 ? "item" : "itens"}`}
              className="flex items-center gap-2 bg-[#172B40] px-3 py-2 text-xs font-semibold text-[#E9F2F7] transition-colors hover:bg-[#20C7D9] hover:text-[#0B1220] focus-visible:outline-[#20C7D9]"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Carrinho</span>
              <span
                aria-hidden="true"
                className="inline-flex min-w-5 items-center justify-center bg-[#20C7D9] px-1 text-[11px] font-bold text-[#0B1220]"
              >
                {cart.count}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((valor) => !valor)}
              aria-label="Menu mobile"
              aria-expanded={open}
              className="p-2 text-[#E9F2F7] transition-colors hover:text-[#20C7D9] focus-visible:outline-[#20C7D9] md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#20C7D9]/20 bg-[#0B1220] md:hidden">
          <nav
            aria-label="Navegação mobile da NEXUS Tech Store"
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 text-xs font-semibold uppercase tracking-[0.15em] text-[#E9F2F7]/70 sm:px-6"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2.5 transition-colors hover:text-[#20C7D9] focus-visible:outline-[#20C7D9]"
              >
                {item.label === "Comparador" && (
                  <GitCompare className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {item.label}
                {item.label === "Comparador" && compare.ids.length > 0 && (
                  <span aria-hidden="true" className="text-[#20C7D9]">
                    ({compare.ids.length})
                  </span>
                )}
              </Link>
            ))}
            <Link
              href={`${BASE}/carrinho`}
              onClick={() => setOpen(false)}
              className="py-2.5 transition-colors hover:text-[#20C7D9] focus-visible:outline-[#20C7D9]"
            >
              Carrinho ({cart.count})
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
