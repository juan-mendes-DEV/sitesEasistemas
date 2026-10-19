"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PROJECTS, CATEGORIES, formatPrice } from "@/lib/catalog";
import { ProjectCard } from "@/components/home/projectCard";
import type { CategoryKey } from "@/types/catalog";

const CAT_LABELS: Record<string, string> = {
  todos: "Todos os projetos",
  simples: "Sites Simples",
  institucionais: "Sites Institucionais",
  ecommerce: "E-commerce",
  sistemas: "Sistemas Básicos",
};

export function CatalogSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "todos">("todos");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "todos") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const categories: { key: CategoryKey | "todos"; label: string; price?: number }[] = [
    { key: "todos", label: "Todos os projetos" },
    ...CATEGORIES.map((c) => ({ key: c.key, label: c.label, price: c.price })),
  ];

  return (
    <section
      id="catalogo"
      className="px-4 pt-20 pb-32 sm:pt-28 sm:pb-40 lg:pt-36 lg:pb-48"
    >
      <div className="max-w-7xl mx-auto">
        <header className="text-center max-w-3xl mx-auto mb-16 animate-cm-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Catálogo comercial
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Doze demonstrações organizadas em quatro categorias. Os valores são preços-base para o escopo definido.
          </p>
        </header>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-cm-slide-up" style={{ animationDelay: "0.2s" }}>
          <button
            onClick={() => setActiveCategory("todos")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "todos"
                ? "bg-gold text-[#0B0A10] shadow-[0_0_20px_rgba(212,175,112,0.35)]"
                : "bg-surface border border-border text-text-secondary hover:text-gold hover:border-gold/50"
            }`}
            aria-pressed={activeCategory === "todos"}
          >
            Todos
          </button>
          {categories.slice(1).map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.key
                  ? "bg-violet text-white shadow-[0_0_20px_rgba(139,92,246,0.35)]"
                  : "bg-surface border border-border text-text-secondary hover:text-gold hover:border-gold/50"
              }`}
              aria-pressed={activeCategory === cat.key}
            >
              {CAT_LABELS[cat.key]}
              {cat.price !== undefined && (
                <span className="ml-1 text-[10px] font-mono opacity-80">· {formatPrice(cat.price)}</span>
              )}
            </button>
          ))}
        </div>

        {/* Resumo do filtro ativo (mobile/acessibilidade) */}
        {activeCategory !== "todos" && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-violet/40 bg-violet/5 text-xs font-mono text-violet mb-12 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-violet" />
            Exibindo: {CAT_LABELS[activeCategory]} ({filteredProjects.length} projetos)
          </div>
        )}

        {/* Grade de projetos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Vazio */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center animate-cm-fade-in">
            <p className="text-text-secondary">Não encontramos projetos nesta categoria.</p>
            <Button variant="outline" onClick={() => setActiveCategory("todos")}>
              Ver todos os projetos
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
