"use client";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

const NAV = [
  { label: "Início", href: "/exemplos/institucionais/odontologia" },
  { label: "Sobre", href: "/exemplos/institucionais/odontologia/sobre" },
  { label: "Especialidades", href: "/exemplos/institucionais/odontologia/especialidades" },
  { label: "Estrutura", href: "/exemplos/institucionais/odontologia/estrutura" },
  { label: "Contato", href: "/exemplos/institucionais/odontologia/contato" },
];

export function OdHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[#174B57]/10 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/exemplos/institucionais/odontologia" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#174B57] flex items-center justify-center text-white font-bold text-sm">LO</div>
            <div>
              <span className="text-[#174B57] font-bold text-sm tracking-tight">Lumina Odontologia</span>
              <span className="text-[#8FC9C1] text-[10px] uppercase tracking-wider mt-0.5 block">Cuidado em cada detalhe</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-widest text-[#174B57]/60">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-[#8FC9C1] transition-colors">{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/exemplos/institucionais/odontologia/contato" className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#174B57] text-white text-xs font-semibold hover:bg-[#19353D] transition-colors">
              <Phone className="h-3 w-3" /> Agendar
            </Link>
            <button className="md:hidden p-2 text-[#174B57] hover:text-[#8FC9C1]" onClick={() => setOpen(!open)} aria-label="Menu mobile" aria-expanded={open}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#174B57]/10 bg-white/95">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <nav className="flex flex-col gap-2 text-xs font-medium uppercase tracking-widest text-[#174B57]/60">
              {NAV.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block hover:text-[#8FC9C1] py-2">{l.label}</Link>
              ))}
            </nav>
            <Link href="/exemplos/institucionais/odontologia/contato" className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#174B57] text-white text-xs font-semibold w-fit">
              <Phone className="h-3 w-3" /> Agendar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
