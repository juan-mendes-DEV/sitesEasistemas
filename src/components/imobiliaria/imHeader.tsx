"use client";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

const NAV = [
  { label: "Início", href: "/exemplos/institucionais/imobiliaria" },
  { label: "Sobre", href: "/exemplos/institucionais/imobiliaria/sobre" },
  { label: "Imóveis", href: "/exemplos/institucionais/imobiliaria/imoveis" },
  { label: "Contato", href: "/exemplos/institucionais/imobiliaria/contato" },
];

export function ImHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[#14243A]/10 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/exemplos/institucionais/imobiliaria" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#14243A] flex items-center justify-center text-[#B99A63] font-bold text-sm">AI</div>
            <div>
              <span className="text-[#14243A] font-bold text-sm tracking-tight">Altavista Imóveis</span>
              <span className="text-[#B99A63] text-[10px] uppercase tracking-wider mt-0.5 block">Premium</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-widest text-[#14243A]/60">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-[#B99A63] transition-colors">{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/exemplos/institucionais/imobiliaria/contato" className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#B99A63]/50 text-[#B99A63] text-xs font-semibold hover:bg-[#B99A63] hover:text-white transition-colors">
              <Phone className="h-3 w-3" /> Contato
            </Link>
            <button className="md:hidden p-2 text-[#14243A] hover:text-[#B99A63]" onClick={() => setOpen(!open)} aria-label="Menu mobile" aria-expanded={open}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#14243A]/10 bg-white/95">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <nav className="flex flex-col gap-2 text-xs font-medium uppercase tracking-widest text-[#14243A]/60">
              {NAV.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block hover:text-[#B99A63] py-2">{l.label}</Link>
              ))}
            </nav>
            <Link href="/exemplos/institucionais/imobiliaria/contato" className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#B99A63]/50 text-[#B99A63] text-xs font-semibold w-fit">
              <Phone className="h-3 w-3" /> Contato
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
