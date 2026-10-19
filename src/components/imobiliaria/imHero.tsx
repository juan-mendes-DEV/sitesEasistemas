import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { IMOBILIARIA } from "./data";

export function ImHero() {
  return (
    <section
      className="relative overflow-hidden bg-[#14243A] text-white"
      aria-labelledby="im-hero-title"
    >
      {/* Imagem de fundo — o conteúdo dita a altura da seção */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={IMOBILIARIA.images.hero}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14243A]/95 via-[#14243A]/80 to-[#14243A]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14243A] via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20 min-h-[22rem] sm:min-h-[26rem] flex flex-col justify-center">
        <div className="max-w-2xl animate-cm-slide-up">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#B99A63]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#B99A63]">
              Imobiliária premium
            </span>
          </div>

          <h1
            id="im-hero-title"
            className="mt-5 text-3xl sm:text-5xl font-medium leading-[1.1] tracking-tight"
          >
            O próximo capítulo da sua vida
            <span className="block text-[#B99A63] italic">começa aqui.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-white/75">
            Curadoria de imóveis com fichas técnicas completas, galeria de
            ambientes e atendimento consultivo — portfólio demonstrativo.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/exemplos/institucionais/imobiliaria/imoveis"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#B99A63] text-[#14243A] text-sm font-semibold rounded-sm hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Explorar imóveis
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/exemplos/institucionais/imobiliaria/sobre"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/30 text-white text-sm font-semibold rounded-sm hover:border-[#B99A63] hover:text-[#B99A63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A63] transition-colors"
            >
              Conheça a Altavista
            </Link>
          </div>
        </div>

        <p className="mt-8 inline-flex w-fit items-center gap-2 rounded-sm border border-[#B99A63]/40 bg-[#14243A]/85 px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-[#B99A63]">
          <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Demonstração fictícia — imóveis ilustrativos, sem ofertas reais
        </p>
      </div>
    </section>
  );
}
