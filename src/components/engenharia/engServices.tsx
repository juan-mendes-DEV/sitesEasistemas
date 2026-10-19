import { ENGENHARIA } from "./data";

interface EngServicesProps {
  detailed?: boolean;
  id?: string;
}

export function EngServices({ detailed = false, id }: EngServicesProps) {
  return (
    <section
      id={id}
      className={`py-20 sm:py-28 ${detailed ? "bg-[#EDF0F2]" : "bg-white"}`}
      aria-labelledby="eng-services-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#B77A4A]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#445C6E]">
                Especialidades
              </span>
            </div>
            <h2
              id="eng-services-title"
              className="mt-4 text-2xl sm:text-4xl font-bold text-[#20252B] tracking-tight"
            >
              Serviços de engenharia
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[#445C6E] leading-relaxed">
            Quatro frentes de atendimento cobrindo projeto, planejamento,
            consultoria e gestão de obra.
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {ENGENHARIA.services.map((service, index) => (
            <li
              key={service.name}
              className="group relative bg-[#EDF0F2] border border-[#20252B]/10 rounded-sm p-6 hover:border-[#B77A4A] hover:bg-white transition-colors"
            >
              <span className="font-mono text-xs font-bold text-[#B77A4A]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-base font-bold text-[#20252B] leading-snug">
                {service.name}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#445C6E]">
                {service.description}
              </p>
              {detailed && (
                <ul className="mt-4 space-y-2 border-t border-[#20252B]/10 pt-4">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-[13px] leading-relaxed text-[#353C45]/80"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#445C6E]"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
