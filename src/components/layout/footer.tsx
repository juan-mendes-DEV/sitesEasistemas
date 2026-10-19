"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import { CATEGORIES } from "@/lib/catalog";

const CATEGORY_LABELS: Record<string, string> = {
  simples: "Sites Simples",
  institucionais: "Sites Institucionais",
  ecommerce: "E-commerce",
  sistemas: "Sistemas Básicos",
};

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface mt-auto">
      <div className="border-y border-border/40"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Marca */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-violet font-mono text-sm font-bold tracking-tighter">CM</span>
              <span className="text-text-primary font-bold text-sm tracking-tight">Code Maestro<span className="text-gold">Tech</span></span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              A Code Maestro Tech é uma marca independente de desenvolvimento de soluções digitais, criada para transformar ideias em projetos tecnológicos e ajudar pessoas e negócios a crescer.
            </p>
          </div>

          {/* Contato */}
          <div id="contato" className="lg:col-span-4">
            <h3 className="text-text-primary font-semibold text-sm tracking-tight uppercase mb-6">Contato</h3>
            <ul className="space-y-3 text-text-secondary text-sm">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <span>olá@codemaestro.tech</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Contato comercial por agendamento</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Atendimento remoto — sem endereço físico</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Segunda a sexta, 9h às 18h</span>
              </li>
            </ul>
          </div>

          {/* Navegação */}
          <div className="lg:col-span-4">
            <h3 className="text-text-primary font-semibold text-sm tracking-tight uppercase mb-6">Navegação</h3>
            <ul className="space-y-3 text-text-secondary text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.key}>
                  <Link
                    href="/#catalogo"
                    className="hover:text-gold transition-colors"
                  >
                    {CATEGORY_LABELS[cat.key]} — {formatPrice(cat.price)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="#condicoes-comerciais" className="hover:text-gold transition-colors">
                  Condições comerciais
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            Code Maestro Tech — Marca independente de desenvolvimento digital. Os valores são preços-base para o escopo definido; não incluem funcionalidades ilimitadas.
          </p>
          <div className="flex gap-4 text-text-muted text-xs">
            <a href="#condicoes-comerciais" className="hover:text-text-primary transition-colors">
              Termos comerciais
            </a>
            <span className="text-text-secondary">·</span>
            <Link
              href="/#catalogo"
              className="hover:text-text-primary transition-colors"
            >
              Catálogo de demonstrações
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
