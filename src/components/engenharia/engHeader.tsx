"use client";

import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

const NAV = [
  { label: "Início", href: "/exemplos/institucionais/engenharia" },
  { label: "Sobre", href: "/exemplos/institucionais/engenharia/sobre" },
  { label: "Serviços", href: "/exemplos/institucionais/engenharia/servicos" },
  { label: "Projetos", href: "/exemplos/institucionais/engenharia/projetos" },
  { label: "Contato", href: "/exemplos/institucionais/engenharia/contato" },
];

export function EngHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#20252B]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/exemplos/institucionais/engenharia" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#B77A4A] flex items-center justify-center text-white font-bold text-sm">VE</div>
            <div>
              <span className="text-white font-bold text-sm tracking-tight">Vértice Engenharia</span>
              <span className="text-[#B77A4A] text-[10px] uppercase tracking-wider mt-0.5 block">Projetos & Obras</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-widest text-white/60">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-[#B77A4A] transition-colors">{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/exemplos/institucionais/engenharia/contato" className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#B77A4A] text-white text-xs font-semibold hover:bg-[#C98D5E] transition-colors">
              <Phone className="h-3 w-3" /> Contato
            </Link>
            <button className="md:hidden p-2 text-white/60 hover:text-[#B77A4A]" onClick={() => setOpen(!open)} aria-label="Menu mobile" aria-expanded={open}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#20252B]/95">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <nav className="flex flex-col gap-2 text-xs font-medium uppercase tracking-widest text-white/60">
              {NAV.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block hover:text-[#B77A4A] py-2">{l.label}</Link>
              ))}
            </nav>
            <Link href="/exemplos/institucionais/engenharia/contato" className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#B77A4A] text-white text-xs font-semibold w-fit">
              <Phone className="h-3 w-3" /> Contato
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
