"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/ecommerce/storeProvider";
import { NOIR_STORE } from "./data";

const BASE = NOIR_STORE.route;

const NAV = [
  { label: "Início", href: BASE },
  { label: "Catálogo", href: `${BASE}/produtos` },
  { label: "Favoritos", href: `${BASE}/favoritos` },
];

export function NoirHeader() {
  const [open, setOpen] = useState(false);
  const cart = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[#A99A86]/25 bg-[#111111] text-[#F2EFE9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href={BASE} className="flex items-baseline gap-3 focus-visible:outline-[#A99A86]">
            <span className="text-base font-black tracking-[0.35em] sm:text-lg">
              NOIR STUDIO
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.28em] text-[#A99A86] lg:block">
              Vista sua identidade
            </span>
          </Link>

          <nav
            aria-label="Navegação principal da NOIR Studio"
            className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F2EFE9]/75 md:flex"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[#A99A86] focus-visible:outline-[#A99A86]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`${BASE}/carrinho`}
              aria-label={`Carrinho com ${cart.count} ${cart.count === 1 ? "item" : "itens"}`}
              className="flex items-center gap-2 border border-[#A99A86]/50 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:border-[#A99A86] hover:text-[#A99A86] focus-visible:outline-[#A99A86]"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Carrinho</span>
              <span
                aria-hidden="true"
                className="inline-flex min-w-5 items-center justify-center bg-[#A99A86] px-1 text-[11px] font-bold text-[#111111]"
              >
                {cart.count}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((valor) => !valor)}
              aria-label="Menu mobile"
              aria-expanded={open}
              className="p-2 transition-colors hover:text-[#A99A86] focus-visible:outline-[#A99A86] md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#A99A86]/25 bg-[#111111] md:hidden">
          <nav
            aria-label="Navegação mobile da NOIR Studio"
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F2EFE9]/75 sm:px-6"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 transition-colors hover:text-[#A99A86] focus-visible:outline-[#A99A86]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`${BASE}/carrinho`}
              onClick={() => setOpen(false)}
              className="py-2.5 transition-colors hover:text-[#A99A86] focus-visible:outline-[#A99A86]"
            >
              Carrinho ({cart.count})
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
