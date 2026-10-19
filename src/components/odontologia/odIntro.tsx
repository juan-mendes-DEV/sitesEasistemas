import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ODONTOLOGIA } from "./data";

export function OdIntro() {
  return (
    <section
      id="apresentacao"
      className="bg-white py-20 sm:py-28"
      aria-labelledby="od-intro-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#8FC9C1]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#174B57]/60">
                A clínica
              </span>
            </div>
            <h2
              id="od-intro-title"
              className="mt-5 text-2xl sm:text-4xl font-bold text-[#174B57] leading-tight tracking-tight"
            >
              Cuidado clínico com clareza, higiene e acolhimento.
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#353C45]/75">
              {ODONTOLOGIA.about.history[0]}
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#353C45]/75">
              {ODONTOLOGIA.about.proposal}
            </p>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {ODONTOLOGIA.differentials.map((d) => (
                <li
                  key={d.title}
                  className="rounded-xl border border-[#174B57]/10 bg-[#F3F7F7] p-4 hover:border-[#8FC9C1] transition-colors"
                >
                  <h3 className="text-sm font-bold text-[#174B57]">
                    {d.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#19353D]/70">
                    {d.description}
                  </p>
                </li>
              ))}
            </ul>

            <Link
              href="/exemplos/institucionais/odontologia/sobre"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#174B57] hover:text-[#8FC9C1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#174B57] transition-colors"
            >
              Conheça a Lumina
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image
                  src={ODONTOLOGIA.images.sobre}
                  alt={ODONTOLOGIA.images.sobreAlt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl mt-8">
                <Image
                  src={ODONTOLOGIA.images.destaque}
                  alt={ODONTOLOGIA.images.destaqueAlt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover"
                />
              </div>
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[#174B57]/50 text-center lg:text-right">
              Imagens ilustrativas de demonstração
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
