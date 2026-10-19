import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ODONTOLOGIA } from "./data";

interface OdSpecialtiesProps {
  detailed?: boolean;
  id?: string;
}

export function OdSpecialties({ detailed = false, id }: OdSpecialtiesProps) {
  return (
    <section
      id={id}
      className={`py-20 sm:py-28 ${detailed ? "bg-white" : "bg-[#F3F7F7]"}`}
      aria-labelledby="od-specialties-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#8FC9C1]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#174B57]/60">
              Especialidades
            </span>
          </div>
          <h2
            id="od-specialties-title"
            className="mt-4 text-2xl sm:text-4xl font-bold text-[#174B57] tracking-tight"
          >
            Cuidados para cada fase da vida
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#353C45]/75">
            Informação educativa sobre cada área de atendimento. Nenhum
            resultado é prometido — o plano de tratamento é definido após a
            avaliação individual.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {ODONTOLOGIA.specialties.map((s, index) => (
            <li
              key={s.name}
              className="group rounded-2xl border border-[#174B57]/10 bg-white p-6 hover:border-[#8FC9C1] hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs font-bold text-[#8FC9C1]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="h-2 w-2 rounded-full bg-[#8FC9C1] group-hover:scale-125 transition-transform"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-3 text-base font-bold text-[#174B57]">
                {s.name}
              </h3>
              <p className="mt-1 text-[13px] font-medium text-[#8FC9C1]">
                {s.short}
              </p>
              {detailed && (
                <>
                  <p className="mt-3 text-[13px] leading-relaxed text-[#353C45]/75">
                    {s.description}
                  </p>
                  <p className="mt-3 border-t border-[#174B57]/10 pt-3 text-xs leading-relaxed text-[#19353D]/60">
                    {s.care}
                  </p>
                </>
              )}
            </li>
          ))}
        </ul>

        {!detailed && (
          <div className="mt-10">
            <Link
              href="/exemplos/institucionais/odontologia/especialidades"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#174B57] hover:text-[#8FC9C1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#174B57] transition-colors"
            >
              Ver todas as especialidades
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
