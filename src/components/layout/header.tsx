"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CategoryKey } from "@/types/catalog";

/**
 * Âncora do catálogo na home. As rotas de categoria (`CATEGORIES.route`)
 * apontam para páginas hub que ainda não existem (404); até serem criadas,
 * toda a navegação do catálogo leva à seção `#catalogo` da home.
 */
const CATALOGO_HREF = "/#catalogo";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Condições Comerciais", href: "#condicoes-comerciais" },
];

const CATEGORY_NAV: { key: CategoryKey; label: string }[] = [
  { key: "simples", label: "Sites Simples" },
  { key: "institucionais", label: "Institucionais" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "sistemas", label: "Sistemas" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="border-b border-border/40"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Code Maestro Tech — Página inicial">
            <span className="text-violet font-mono text-sm font-bold tracking-tighter">CM</span>
            <span className="text-text-primary font-bold text-sm tracking-tight">Code Maestro<span className="text-gold">Tech</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-text-secondary hover:text-violet transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-6">
              {CATEGORY_NAV.map((cat) => (
                <Link
                  key={cat.key}
                  href={CATALOGO_HREF}
                  className="text-text-secondary hover:text-gold transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
              <a href="#contato" className="text-text-secondary hover:text-violet transition-colors">
                Contato
              </a>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/#catalogo" className="hidden sm:block">
              <Button variant="outline" size="sm">
                Explorar demonstrações <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
            <Button variant="primary" size="sm">
              Solicitar orçamento
            </Button>
            <button
              className="md:hidden p-2 text-text-secondary hover:text-gold transition-colors"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Abrir menu mobile"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
            <nav className="flex flex-col gap-4 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-text-secondary hover:text-violet transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {CATEGORY_NAV.map((cat) => (
                <Link
                  key={cat.key}
                  href={CATALOGO_HREF}
                  onClick={() => setIsOpen(false)}
                  className="block text-text-secondary hover:text-gold transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
              <a
                href="#contato"
                onClick={() => setIsOpen(false)}
                className="block text-text-secondary hover:text-violet transition-colors"
              >
                Contato
              </a>
            </nav>
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/#catalogo">
                <Button variant="outline" size="md" className="w-full">
                  Explorar demonstrações <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="primary" size="md" className="w-full">
                Solicitar orçamento
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function ContactBadge() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-surface/50 text-xs font-medium text-text-secondary">
      <Phone className="h-3.5 w-3.5 text-gold" />
      <span>Contato comercial</span>
    </div>
  );
}
