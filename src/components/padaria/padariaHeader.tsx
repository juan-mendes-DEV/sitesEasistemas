"use client";

import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

export function PadariaHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "História", href: "#historia" },
    { label: "Cardápio", href: "#cardapio" },
    { label: "Galeria", href: "#galeria" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#35251C]/10 bg-[#F7F0E3]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="#inicio"
            className="flex items-center gap-2"
            aria-label="Padaria Aurora — Página inicial"
          >
            <div className="w-8 h-8 rounded-full bg-[#B86B45] flex items-center justify-center text-[#F7F0E3] font-bold text-sm shadow-sm">
              PA
            </div>
            <div>
              <span className="text-[#35251C] font-bold text-sm tracking-tight">Padaria Aurora</span>
              <span className="text-[#B86B45] text-[10px] uppercase tracking-wider mt-0.5 block">Artesanal</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-widest text-[#35251C]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[#B86B45] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#contato"
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#B86B45]/40 bg-transparent text-[#B86B45] text-xs font-semibold hover:bg-[#B86B45] hover:text-[#F7F0E3] transition-colors"
            >
              <Phone className="h-3 w-3" />
              Contato
            </Link>
            <button
              className="md:hidden p-2 text-[#35251C] hover:text-[#B86B45] transition-colors"
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
        <div className="md:hidden border-t border-[#35251C]/10 bg-[#F7F0E3]/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <nav className="flex flex-col gap-2 text-xs font-medium uppercase tracking-widest text-[#35251C]">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block hover:text-[#B86B45] transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="#contato"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#B86B45]/40 bg-transparent text-[#B86B45] text-xs font-semibold hover:bg-[#B86B45] hover:text-[#F7F0E3] transition-colors w-fit"
              >
                <Phone className="h-3 w-3" />
                Contato
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
