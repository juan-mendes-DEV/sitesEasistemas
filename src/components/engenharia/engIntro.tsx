import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ENGENHARIA } from "./data";

export function EngIntro() {
  return (
    <section
      id="apresentacao"
      className="bg-[#EDF0F2] py-20 sm:py-28"
      aria-labelledby="eng-intro-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-[#20252B]/10">
                <Image
                  src={ENGENHARIA.images.sobre}
                  alt={ENGENHARIA.images.sobreAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-2 sm:right-6 bg-[#20252B] text-white px-5 py-4 rounded-sm shadow-xl max-w-[15rem]">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#B77A4A]">
                  Nosso compromisso
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug">
                  Obra dentro do prazo, orçamento e escopo definidos.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#B77A4A]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#445C6E]">
                Apresentação
              </span>
            </div>
            <h2
              id="eng-intro-title"
              className="mt-5 text-2xl sm:text-4xl font-bold text-[#20252B] leading-tight tracking-tight"
            >
              Engenharia que trata a obra como um sistema — previsível,
              documentado e controlado.
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#353C45]/80">
              {ENGENHARIA.about.history[0]}
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#353C45]/80">
              {ENGENHARIA.about.mission}
            </p>

            <div className="mt-9 grid sm:grid-cols-2 gap-4">
              {ENGENHARIA.about.values.slice(0, 4).map((value) => (
                <div
                  key={value.title}
                  className="bg-white border border-[#20252B]/10 rounded-sm p-5 hover:border-[#B77A4A]/60 transition-colors"
                >
                  <h3 className="text-sm font-bold text-[#20252B] uppercase tracking-wide">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#445C6E]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/exemplos/institucionais/engenharia/sobre"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#B77A4A] hover:text-[#20252B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B77A4A] transition-colors"
            >
              Conheça nossa metodologia
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
