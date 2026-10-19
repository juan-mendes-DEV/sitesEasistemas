"use client";

import React from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

interface BarberHeaderProps {
  className?: string;
}

export function BarberHeader({ className }: BarberHeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { label: "Início", href: "#" },
    { label: "Serviços", href: "#servicos" },
    { label: "Galeria", href: "#galeria" },
    { label: "Horário", href: "#horario" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b border-white/10 bg-[#1A1A1A]/90 backdrop-blur-md ${className}`}>
      <div className="border-b border-white/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="#"
            className="flex items-center gap-2"
            aria-label="Ferro & Navalha — Página inicial"
          >
            <div className="w-8 h-8 rounded-full bg-copper flex items-center justify-center text-[#1A1A1A] font-bold text-sm shadow-[0_0_15px_rgba(184,115,51,0.4)]">
              FN
            </div>
            <div>
              <span className="text-white font-bold text-sm tracking-tight">Ferro &amp; Navalha</span>
              <span className="text-copper-soft text-[10px] uppercase tracking-wider mt-0.5 block">Barbearia</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-widest text-copper-soft">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-copper-soft hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full border border-copper/40 bg-transparent text-copper text-xs font-semibold hover:bg-copper hover:text-[#1A1A1A] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Phone className="h-3 w-3" />
              Agendar
            </button>
            <button
              className="md:hidden p-2 text-copper-soft hover:text-white transition-colors"
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
        <div className="md:hidden border-t border-white/10 bg-[#1A1A1A]/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <nav className="flex flex-col gap-2 text-xs font-medium uppercase tracking-widest text-copper-soft">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-copper-soft hover:text-white transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-4 flex flex-col gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-copper/40 bg-transparent text-copper text-xs font-semibold hover:bg-copper hover:text-[#1A1A1A] transition-colors w-fit"
              >
                <Phone className="h-3 w-3" />
                Agendar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
