import type { Metadata } from "next";
import Image from "next/image";
import { ImPageHeader } from "@/components/imobiliaria/imPageHeader";
import { IMOBILIARIA } from "@/components/imobiliaria/data";

export const metadata: Metadata = {
  title: "Sobre a Altavista Imóveis",
  description:
    "História fictícia, valores e diferenciais da Altavista Imóveis — demonstração sem CRECI, corretores ou localizações reais.",
  alternates: {
    canonical: "https://codemaestro.tech/exemplos/institucionais/imobiliaria/sobre",
  },
  openGraph: {
    title: "Sobre a Altavista Imóveis — Demonstração",
    description:
      "Curadoria, transparência e atendimento consultivo em conteúdo ilustrativo.",
    url: "https://codemaestro.tech/exemplos/institucionais/imobiliaria/sobre",
    type: "website",
    locale: "pt_BR",
  },
};

export default function ImobiliariaSobrePage() {
  const { about } = IMOBILIARIA;

  return (
    <>
      <ImPageHeader
        eyebrow="Sobre nós"
        title="Curadoria e transparência em cada negociação."
        description="A história fictícia, os valores e os diferenciais da Altavista Imóveis — conteúdo ilustrativo de demonstração."
        current="Sobre"
      />

      <section className="bg-white py-16 sm:py-24" aria-labelledby="im-historia-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#B99A63]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#353C45]/70">
                  Nossa história
                </span>
              </div>
              <h2
                id="im-historia-title"
                className="mt-4 text-2xl sm:text-3xl font-medium text-[#14243A] tracking-tight"
              >
                De onde viemos
              </h2>
              <div className="mt-5 space-y-4">
                {about.history.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-sm sm:text-base leading-relaxed text-[#353C45]/80"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                <Image
                  src={IMOBILIARIA.images.sobre}
                  alt={IMOBILIARIA.images.sobreAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-[#353C45]/55">
                Imagem ilustrativa de demonstração
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-[#EDE4D6] py-16 sm:py-24"
        aria-labelledby="im-valores-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#B99A63]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#353C45]/70">
              Valores
            </span>
          </div>
          <h2
            id="im-valores-title"
            className="mt-4 text-2xl sm:text-3xl font-medium text-[#14243A] tracking-tight"
          >
            O que sustenta a marca
          </h2>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {about.values.map((value, index) => (
              <li
                key={value.title}
                className="bg-white border-t-2 border-[#B99A63] p-6 rounded-b-sm hover:shadow-lg transition-shadow"
              >
                <span className="font-mono text-xs font-bold text-[#B99A63]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-bold text-[#14243A]">
                  {value.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#353C45]/75">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-sm border border-[#14243A]/10 bg-white p-6">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#B99A63]">
              Diferenciais
            </h3>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {about.differentials.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-[#353C45] leading-relaxed"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#B99A63]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 border-l-2 border-[#B99A63] bg-white p-5 text-xs leading-relaxed text-[#353C45]/75">
            {IMOBILIARIA.demoNotice}
          </p>
        </div>
      </section>
    </>
  );
}
