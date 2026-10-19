"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/catalog";
import type { Project } from "@/types/catalog";

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  "em-desenvolvimento": { label: "Demonstração em desenvolvimento", color: "text-gold-soft" },
  disponivel: { label: "Disponível", color: "text-success" },
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const status = STATUS_CONFIG[project.status];
  const category = project.category;
  const catLabels: Record<string, string> = {
    simples: "Site Simples",
    institucionais: "Institucional",
    ecommerce: "E-commerce",
    sistemas: "Sistema",
  };

  return (
    <article
      className="group relative flex flex-col rounded-xl border border-border bg-surface/60 backdrop-blur-sm p-6 transition-cm hover:border-gold/50 hover:shadow-[0_0_32px_rgba(212,175,112,0.12)]"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-gold/30 bg-gold/5 text-[10px] font-mono font-bold text-gold-soft uppercase tracking-wider">
          {catLabels[category]}
        </span>
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-transparent bg-white/5 text-[10px] font-mono font-bold ${status.color} uppercase tracking-wider`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 animate-cm-pulse" />
          {status.label}
        </span>
      </div>

      <h3 className="text-lg font-bold text-text-primary group-hover:text-violet transition-colors leading-snug">
        {project.title}
      </h3>

      <p className="mt-2 text-sm text-text-secondary leading-relaxed line-clamp-2">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.features.slice(0, 3).map((feature, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-sm border border-border/60 bg-surface px-2 py-1 text-[11px] font-mono text-text-muted"
          >
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            {feature}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6 flex items-center justify-between">
        <div>
          <span className="block text-xs font-mono text-text-muted">Preço-base</span>
          <span className="text-xl font-bold text-text-primary">{formatPrice(project.price)}</span>
        </div>
        <Link
          href={project.route}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gold/40 bg-gold/10 text-[11px] font-mono font-bold text-gold hover:bg-gold hover:text-[#0B0A10] transition-colors"
        >
          Acessar
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
