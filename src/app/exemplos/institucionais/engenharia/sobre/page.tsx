import type { Metadata } from "next";
import Image from "next/image";
import { EngPageHeader } from "@/components/engenharia/engPageHeader";
import { ENGENHARIA } from "@/components/engenharia/data";

export const metadata: Metadata = {
  title: "Sobre a Vértice Engenharia",
  description:
    "História fictícia, missão, valores e metodologia de trabalho da Vértice Engenharia — demonstração institucional com dados ilustrativos.",
  alternates: {
    canonical: "https://codemaestro.tech/exemplos/institucionais/engenharia/sobre",
  },
  openGraph: {
    title: "Sobre a Vértice Engenharia — Demonstração",
    description:
      "Missão, valores e metodologia em cinco etapas. Conteúdo fictício de demonstração.",
    url: "https://codemaestro.tech/exemplos/institucionais/engenharia/sobre",
    type: "website",
    locale: "pt_BR",
  },
};

export default function EngenhariaSobrePage() {
  const { about } = ENGENHARIA;

  return (
    <>
      <EngPageHeader
        eyebrow="Sobre nós"
        title="Método, estrutura e clareza em cada etapa."
        description="A história, os valores e a metodologia de trabalho da Vértice Engenharia — conteúdo fictício para demonstração."
        current="Sobre"
      />

      <section className="bg-white py-16 sm:py-24" aria-labelledby="eng-historia-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#B77A4A]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#445C6E]">
                  Nossa história
                </span>
              </div>
              <h2
                id="eng-historia-title"
                className="mt-4 text-2xl sm:text-3xl font-bold text-[#20252B] tracking-tight"
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

              <div className="mt-8 border-l-2 border-[#445C6E] bg-[#EDF0F2] p-5">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#445C6E]">
                  Missão
                </h3>
                <p className="mt-2 text-sm text-[#20252B] leading-relaxed">
                  {about.mission}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-[#20252B]/10">
                <Image
                  src={ENGENHARIA.images.metodo}
                  alt={ENGENHARIA.images.metodoAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-[#445C6E]/70">
                Ambiente de projetos — imagem ilustrativa
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-[#EDF0F2] py-16 sm:py-24"
        aria-labelledby="eng-valores-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#B77A4A]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#445C6E]">
              Valores
            </span>
          </div>
          <h2
            id="eng-valores-title"
            className="mt-4 text-2xl sm:text-3xl font-bold text-[#20252B] tracking-tight"
          >
            O que guia as nossas decisões
          </h2>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {about.values.map((value, index) => (
              <li
                key={value.title}
                className="bg-white border border-[#20252B]/10 rounded-sm p-6 hover:border-[#B77A4A] transition-colors"
              >
                <span className="font-mono text-xs font-bold text-[#B77A4A]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-bold text-[#20252B]">
                  {value.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#445C6E]">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="bg-white py-16 sm:py-24"
        aria-labelledby="eng-metodologia-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#B77A4A]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#445C6E]">
              Metodologia
            </span>
          </div>
          <h2
            id="eng-metodologia-title"
            className="mt-4 text-2xl sm:text-3xl font-bold text-[#20252B] tracking-tight"
          >
            Cinco etapas, do diagnóstico à entrega
          </h2>
          <ol className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {about.method.map((step) => (
              <li
                key={step.step}
                className="relative bg-[#EDF0F2] border-t-2 border-[#B77A4A] p-5 rounded-b-sm"
              >
                <span className="font-mono text-xs font-bold text-[#B77A4A]">
                  {step.step}
                </span>
                <h3 className="mt-2 text-sm font-bold text-[#20252B] uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#445C6E]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-10 border-l-2 border-[#B77A4A] bg-[#EDF0F2] p-5 text-xs leading-relaxed text-[#445C6E]">
            {ENGENHARIA.demoNotice}
          </p>
        </div>
      </section>
    </>
  );
}
