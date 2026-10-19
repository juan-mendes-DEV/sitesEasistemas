import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ENGENHARIA } from "./data";

interface EngProjectsProps {
  limit?: number;
  id?: string;
}

export function EngProjects({ limit, id }: EngProjectsProps) {
  const projects = limit ? ENGENHARIA.projects.slice(0, limit) : ENGENHARIA.projects;

  return (
    <section
      id={id}
      className="bg-[#EDF0F2] py-20 sm:py-28"
      aria-labelledby="eng-projects-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#B77A4A]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#445C6E]">
                Portfólio fictício
              </span>
            </div>
            <h2
              id="eng-projects-title"
              className="mt-4 text-2xl sm:text-4xl font-bold text-[#20252B] tracking-tight"
            >
              Projetos em destaque
            </h2>
          </div>
          {!limit && (
            <p className="max-w-sm text-sm text-[#445C6E] leading-relaxed">
              Seis projetos demonstrativos de residencial, comercial e
              industrial — todos fictícios.
            </p>
          )}
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((project) => (
            <li
              key={project.id}
              className="group bg-white border border-[#20252B]/10 rounded-sm overflow-hidden hover:border-[#B77A4A] transition-colors"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#20252B]/90 text-[#B77A4A] font-mono text-[10px] uppercase tracking-widest rounded-sm">
                  {project.type}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-base font-bold text-[#20252B]">
                  {project.name}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#445C6E]">
                  {project.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {limit !== undefined && (
          <div className="mt-10">
            <Link
              href="/exemplos/institucionais/engenharia/projetos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B77A4A] hover:text-[#20252B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B77A4A] transition-colors"
            >
              Ver todos os projetos
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
