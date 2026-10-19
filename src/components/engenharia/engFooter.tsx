import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ENGENHARIA } from "./data";

export function EngFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#20252B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#B77A4A] flex items-center justify-center text-white font-bold text-[10px]">
                VE
              </div>
              <span className="font-bold text-white text-sm tracking-tight">
                {ENGENHARIA.name}
              </span>
            </div>
            <p className="mt-2 text-xs text-white/50 max-w-sm leading-relaxed">
              {ENGENHARIA.tagline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-xs text-white/50">
            <a
              href={`mailto:${ENGENHARIA.email}`}
              className="hover:text-[#B77A4A] transition-colors"
            >
              {ENGENHARIA.email}
            </a>
            <span className="hidden sm:inline text-white/20" aria-hidden="true">
              ·
            </span>
            <span>{ENGENHARIA.instagram}</span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-[#B77A4A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B77A4A] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Voltar ao catálogo Code Maestro Tech
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-[10px] font-mono uppercase tracking-widest text-white/35">
          <span>Demonstração fictícia — sem dados de empresa real</span>
          <span>Code Maestro Tech</span>
        </div>
      </div>
    </footer>
  );
}
