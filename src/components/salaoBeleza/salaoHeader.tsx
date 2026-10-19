"use client";

import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

export function SalaoHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Galeria", href: "#galeria" },
    { label: "Agendamento", href: "#agendamento" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111118]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="#inicio"
            className="flex items-center gap-2"
            aria-label="Maison Belle — Página inicial"
          >
            <div className="w-8 h-8 rounded-full bg-[#E83E8C] flex items-center justify-center text-white font-bold text-sm">
              MB
            </div>
            <div>
              <span className="text-white font-bold text-sm tracking-tight">Maison Belle</span>
              <span className="text-[#E83E8C] text-[10px] uppercase tracking-wider mt-0.5 block">Salão de Beleza</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-widest text-white/70">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[#E83E8C] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#agendamento"
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E83E8C]/40 bg-transparent text-[#E83E8C] text-xs font-semibold hover:bg-[#E83E8C] hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3" />
              Agendar
            </Link>
            <button
              className="md:hidden p-2 text-white/70 hover:text-[#E83E8C] transition-colors"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Abrir menu mobile"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#111118]/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <nav className="flex flex-col gap-2 text-xs font-medium uppercase tracking-widest text-white/70">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block hover:text-[#E83E8C] transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="#agendamento"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E83E8C]/40 bg-transparent text-[#E83E8C] text-xs font-semibold hover:bg-[#E83E8C] hover:text-white transition-colors w-fit"
              >
                <Phone className="h-3 w-3" />
                Agendar
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
