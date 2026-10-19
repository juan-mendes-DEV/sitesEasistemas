import type { Metadata } from "next";
import Image from "next/image";
import { OdPageHeader } from "@/components/odontologia/odPageHeader";
import { ODONTOLOGIA } from "@/components/odontologia/data";

export const metadata: Metadata = {
  title: "Sobre a Lumina Odontologia",
  description:
    "História fictícia, proposta de atendimento e estrutura da Lumina Odontologia — demonstração sem nomes, CROs ou credenciais.",
  alternates: {
    canonical: "https://codemaestro.tech/exemplos/institucionais/odontologia/sobre",
  },
  openGraph: {
    title: "Sobre a Lumina Odontologia — Demonstração",
    description:
      "Proposta de atendimento e estrutura da clínica fictícia. Conteúdo demonstrativo.",
    url: "https://codemaestro.tech/exemplos/institucionais/odontologia/sobre",
    type: "website",
    locale: "pt_BR",
  },
};

export default function OdontologiaSobrePage() {
  const { about } = ODONTOLOGIA;

  return (
    <>
      <OdPageHeader
        eyebrow="Sobre nós"
        title="Uma clínica pensada na calma."
        description="A história fictícia, a proposta de atendimento e a estrutura da Lumina Odontologia — conteúdo ilustrativo de demonstração."
        current="Sobre"
      />

      <section className="bg-white py-16 sm:py-24" aria-labelledby="od-historia-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#8FC9C1]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#174B57]/60">
                  Nossa história
                </span>
              </div>
              <h2
                id="od-historia-title"
                className="mt-4 text-2xl sm:text-3xl font-bold text-[#174B57] tracking-tight"
              >
                De onde viemos
              </h2>
              <div className="mt-5 space-y-4">
                {about.history.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-sm sm:text-base leading-relaxed text-[#353C45]/75"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-[#174B57]/10 bg-[#F3F7F7] p-6">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#174B57]">
                  Proposta de atendimento
                </h3>
                <p className="mt-2 text-sm text-[#353C45] leading-relaxed">
                  {about.proposal}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#174B57]/10">
                <Image
                  src={ODONTOLOGIA.images.sobre}
                  alt={ODONTOLOGIA.images.sobreAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-[#174B57]/50">
                Ambiente ilustrativo de demonstração
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-[#F3F7F7] py-16 sm:py-24"
        aria-labelledby="od-estrutura-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#8FC9C1]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#174B57]/60">
              Estrutura
            </span>
          </div>
          <h2
            id="od-estrutura-title"
            className="mt-4 text-2xl sm:text-3xl font-bold text-[#174B57] tracking-tight"
          >
            O que a clínica oferece
          </h2>
          <ul className="mt-8 grid sm:grid-cols-2 gap-4">
            {about.structure.map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-[#174B57]/10 bg-white p-5"
              >
                <span className="font-mono text-xs font-bold text-[#8FC9C1]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-[#353C45] leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ODONTOLOGIA.differentials.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl bg-[#174B57] text-white p-5"
              >
                <h3 className="text-sm font-bold">{d.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/70">
                  {d.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 border-l-2 border-[#8FC9C1] bg-white p-5 text-xs leading-relaxed text-[#19353D]/70">
            {ODONTOLOGIA.demoNotice}
          </p>
        </div>
      </section>
    </>
  );
}
