import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ruler } from "lucide-react";
import { ENGENHARIA } from "./data";

export function EngHero() {
  return (
    <section
      className="relative overflow-hidden bg-[#20252B] text-white"
      aria-labelledby="eng-hero-title"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#20252B]/60 via-[#20252B]/80 to-[#20252B]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 animate-cm-slide-up">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#B77A4A]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#B77A4A]">
                Engenharia &amp; Gestão de Obras
              </span>
            </div>

            <h1
              id="eng-hero-title"
              className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              Precisão em cada projeto.
              <span className="block text-[#B77A4A]">
                Confiança em cada construção.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-white/70">
              Projetos estruturais, planejamento de obras e gerenciamento
              completo — do primeiro traço à entrega final, com método e
              transparência.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/exemplos/institucionais/engenharia/projetos"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#B77A4A] text-white text-sm font-semibold rounded-sm hover:bg-[#C98D5E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Ver projetos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/exemplos/institucionais/engenharia/contato"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/25 text-white text-sm font-semibold rounded-sm hover:border-[#B77A4A] hover:text-[#B77A4A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B77A4A] transition-colors"
              >
                Fale com a equipe
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md border-t border-white/10 pt-6">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Frentes
                </dt>
                <dd className="mt-1 text-lg font-bold text-white">04</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Etapas
                </dt>
                <dd className="mt-1 text-lg font-bold text-white">05</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Método
                </dt>
                <dd className="mt-1 text-lg font-bold text-white">Técnico</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6 animate-cm-fade-in">
            <div className="relative">
              <span
                className="absolute -top-3 -left-3 h-8 w-8 border-t-2 border-l-2 border-[#B77A4A]"
                aria-hidden="true"
              />
              <span
                className="absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-[#B77A4A]"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-white/10 shadow-2xl">
                <Image
                  src={ENGENHARIA.images.hero}
                  alt={ENGENHARIA.images.heroAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#20252B]/70 via-transparent to-transparent" />
              </div>
              <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
                <Ruler className="h-3.5 w-3.5 text-[#B77A4A]" aria-hidden="true" />
                Demonstração fictícia — Code Maestro Tech
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
