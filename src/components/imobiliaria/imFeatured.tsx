import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IMOBILIARIA } from "./data";
import { ImPropertyCard } from "./imPropertyCard";

interface ImFeaturedProps {
  id?: string;
}

export function ImFeatured({ id }: ImFeaturedProps) {
  const destaque = IMOBILIARIA.imoveis.slice(0, 3);

  return (
    <section
      id={id}
      className="bg-white py-20 sm:py-28"
      aria-labelledby="im-featured-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#B99A63]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#353C45]/70">
                Em destaque
              </span>
            </div>
            <h2
              id="im-featured-title"
              className="mt-4 text-2xl sm:text-4xl font-medium text-[#14243A] tracking-tight"
            >
              Imóveis selecionados
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[#353C45]/75 leading-relaxed">
            Portfólio demonstrativo com fichas completas — área, dormitórios,
            vagas e valor fictício.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {destaque.map((imovel) => (
            <li key={imovel.slug} className="h-full">
              <ImPropertyCard imovel={imovel} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/exemplos/institucionais/imobiliaria/imoveis"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#14243A] hover:text-[#B99A63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A63] transition-colors"
          >
            Ver todos os imóveis
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#353C45]/50">
            {IMOBILIARIA.demoNotice.slice(0, 68)}…
          </p>
        </div>
      </div>
    </section>
  );
}
