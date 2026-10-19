"use client";

import { BARBERIA } from "./data";

interface BarberServicesProps {
  className?: string;
}

export function BarberServices({ className }: BarberServicesProps) {
  return (
    <section
      id="servicos"
      className={`${className} py-20 sm:py-28 lg:pt-36 lg:pb-40`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Serviços
          </h2>
          <p className="mt-4 text-lg text-copper-soft">
            Preços demonstrativos — confirmação de valores e agendamento direto com a barbearia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BARBERIA.services.map((service) => (
            <article
              key={service.name}
              className="group relative flex flex-col rounded-xl border border-white/10 bg-white/5 p-6 hover:border-copper/50 hover:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg border border-copper/30 bg-copper/5 flex items-center justify-center text-copper mb-4 group-hover:bg-copper group-hover:text-[#1A1A1A] transition-colors">
                <ScissorsIcon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{service.name}</h3>
              <p className="text-sm text-copper-soft leading-relaxed mb-4 flex-1">
                {service.description}
              </p>
              <div className="mt-auto pt-4 flex items-end justify-between gap-4">
                <div>
                  <span className="block text-[10px] font-mono text-copper-soft uppercase tracking-wider">
                    Preço demonstrativo
                  </span>
                  <span className="text-xl font-bold text-white">{service.price}</span>
                </div>
                <span className="text-xs font-mono text-copper-soft">
                  {service.duration}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-copper/40 bg-copper/5 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-white">Preços são demonstrativos</h3>
              <p className="text-sm text-copper-soft">
                Os valores exibidos são preços fictícios para demonstração do portfólio Code Maestro Tech. O valor final é cobrado pela barbearia no momento do atendimento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScissorsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
