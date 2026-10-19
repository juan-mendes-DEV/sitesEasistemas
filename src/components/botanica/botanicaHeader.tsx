"use client";

import Link from "next/link";
import { Leaf, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/ecommerce/storeProvider";
import { BOTANICA_STORE } from "./data";

const BASE = BOTANICA_STORE.route;

const NAV = [
  { label: "Início", href: BASE },
  { label: "Catálogo", href: `${BASE}/produtos` },
  { label: "Nossa essência", href: `${BASE}#essencia` },
];

export function BotanicaHeader() {
  const [open, setOpen] = useState(false);
  const cart = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[#3F5748]/20 bg-[#FAF8F2]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href={BASE}
            className="flex items-center gap-2.5 focus-visible:outline-[#C7A88A]"
          >
            <Leaf className="h-5 w-5 text-[#3F5748]" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#3F5748] sm:text-base">
              Botânica <span className="font-normal italic tracking-[0.1em] text-[#493F36]">Essence</span>
            </span>
          </Link>

          <nav
            aria-label="Navegação principal da Botânica Essence"
            className="hidden items-center gap-7 text-xs font-medium uppercase tracking-[0.18em] text-[#493F36]/70 md:flex"
          >
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-[#3F5748] focus-visible:outline-[#C7A88A]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`${BASE}/carrinho`}
              aria-label={`Carrinho com ${cart.count} ${cart.count === 1 ? "item" : "itens"}`}
              className="flex items-center gap-2 bg-[#3F5748] px-3.5 py-2 text-xs font-semibold text-[#FAF8F2] transition-colors hover:bg-[#493F36] focus-visible:outline-[#C7A88A]"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Carrinho</span>
              <span
                aria-hidden="true"
                className="inline-flex min-w-5 items-center justify-center bg-[#C7A88A] px-1 text-[11px] font-bold text-[#493F36]"
              >
                {cart.count}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((valor) => !valor)}
              aria-label="Menu mobile"
              aria-expanded={open}
              className="p-2 text-[#493F36] transition-colors hover:text-[#3F5748] focus-visible:outline-[#C7A88A] md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#3F5748]/15 bg-[#FAF8F2] md:hidden">
          <nav
            aria-label="Navegação mobile da Botânica Essence"
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 text-xs font-medium uppercase tracking-[0.18em] text-[#493F36]/70 sm:px-6"
          >
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 transition-colors hover:text-[#3F5748] focus-visible:outline-[#C7A88A]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`${BASE}/carrinho`}
              onClick={() => setOpen(false)}
              className="py-2.5 transition-colors hover:text-[#3F5748] focus-visible:outline-[#C7A88A]"
            >
              Carrinho ({cart.count})
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
