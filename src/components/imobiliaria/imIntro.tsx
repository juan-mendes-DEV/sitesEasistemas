import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { IMOBILIARIA } from "./data";

export function ImIntro() {
  return (
    <section
      id="apresentacao"
      className="bg-[#EDE4D6] py-20 sm:py-28"
      aria-labelledby="im-intro-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-sm">
                <Image
                  src={IMOBILIARIA.images.sobre}
                  alt={IMOBILIARIA.images.sobreAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-4 sm:left-8 bg-[#14243A] text-white px-6 py-5 rounded-sm shadow-xl">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#B99A63]">
                  Portfólio
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {String(IMOBILIARIA.imoveis.length).padStart(2, "0")}
                  <span className="text-sm font-medium text-white/60 ml-2">
                    imóveis demonstrativos
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pt-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#B99A63]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#353C45]/70">
                A imobiliária
              </span>
            </div>
            <h2
              id="im-intro-title"
              className="mt-5 text-2xl sm:text-4xl font-medium text-[#14243A] leading-tight tracking-tight"
            >
              Curadoria, transparência e um jeito mais calmo de escolher um lar.
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#353C45]/80">
              {IMOBILIARIA.about.history[0]}
            </p>

            <ul className="mt-7 space-y-3">
              {IMOBILIARIA.about.differentials.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B99A63]/20 text-[#B99A63]">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-[#353C45] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {IMOBILIARIA.about.values.map((value) => (
                <div
                  key={value.title}
                  className="border-t-2 border-[#14243A] bg-white/70 p-4"
                >
                  <h3 className="text-sm font-bold text-[#14243A] uppercase tracking-wide">
                    {value.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#353C45]/75">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/exemplos/institucionais/imobiliaria/sobre"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#14243A] hover:text-[#B99A63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A63] transition-colors"
            >
              Nossa história
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
