import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IMOBILIARIA } from "./data";

export function ImFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#14243A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#B99A63] flex items-center justify-center text-[#14243A] font-bold text-[10px]">
                AI
              </div>
              <span className="font-medium text-white text-sm tracking-wide">
                {IMOBILIARIA.name}
              </span>
            </div>
            <p className="mt-2 text-xs text-white/55 max-w-sm leading-relaxed italic">
              {IMOBILIARIA.tagline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-xs text-white/55">
            <a
              href={`mailto:${IMOBILIARIA.email}`}
              className="hover:text-[#B99A63] transition-colors"
            >
              {IMOBILIARIA.email}
            </a>
            <span className="hidden sm:inline text-white/25" aria-hidden="true">
              ·
            </span>
            <span>{IMOBILIARIA.instagram}</span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/75 hover:text-[#B99A63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A63] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Voltar ao catálogo Code Maestro Tech
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-[10px] font-mono uppercase tracking-widest text-white/40">
          <span>Demonstração fictícia — imóveis ilustrativos</span>
          <span>Code Maestro Tech</span>
        </div>
      </div>
    </footer>
  );
}
