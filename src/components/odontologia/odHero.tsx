import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { ODONTOLOGIA } from "./data";

export function OdHero() {
  return (
    <section
      className="relative overflow-hidden bg-[#174B57] text-white"
      aria-labelledby="od-hero-title"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(143,201,193,0.35), transparent 55%), radial-gradient(circle at 15% 85%, rgba(143,201,193,0.18), transparent 50%)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 sm:pt-20 sm:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 animate-cm-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#8FC9C1]/40 bg-white/5 text-[11px] font-medium uppercase tracking-widest text-[#8FC9C1]">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Demonstração de clínica
            </div>

            <h1
              id="od-hero-title"
              className="mt-6 text-3xl sm:text-5xl font-bold leading-[1.08] tracking-tight"
            >
              Seu sorriso merece cuidado
              <span className="block text-[#8FC9C1]">em cada detalhe.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-white/75">
              Odontologia com atendimento calmo, ambientes claros e planejamento
              explicado — do primeiro contato à rotina de manutenção.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/exemplos/institucionais/odontologia/contato"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#8FC9C1] text-[#174B57] text-sm font-semibold rounded-full hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Agendar avaliação
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/exemplos/institucionais/odontologia/especialidades"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/30 text-white text-sm font-semibold rounded-full hover:border-[#8FC9C1] hover:text-[#8FC9C1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FC9C1] transition-colors"
              >
                Ver especialidades
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 animate-cm-fade-in">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] border border-[#8FC9C1]/25" aria-hidden="true" />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] shadow-2xl">
                <Image
                  src={ODONTOLOGIA.images.hero}
                  alt={ODONTOLOGIA.images.heroAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#174B57]/55 via-transparent to-transparent" />
              </div>
              <div className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-white/50">
                Ambiente ilustrativo — clínica fictícia
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
