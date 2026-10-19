"use client";

import { SALAO } from "./data";

export function SalaoServices() {
  return (
    <section id="servicos" className="py-20 sm:py-28 lg:pt-36 lg:pb-40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111118] tracking-tight">
            Serviços
          </h2>
          <p className="mt-4 text-lg text-[#111118]/60">
            Preços demonstrativos — a Maison Belle é uma demonstração fictícia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SALAO.services.map((service) => (
            <article
              key={service.name}
              className="group relative flex flex-col rounded-xl border border-[#E83E8C]/10 bg-[#F7EAF1]/30 p-6 hover:shadow-lg hover:shadow-[#E83E8C]/10 hover:border-[#E83E8C]/30 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-[#E83E8C]/10 flex items-center justify-center text-[#E83E8C] mb-4">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#111118] mb-2">{service.name}</h3>
              <p className="text-sm text-[#111118]/60 leading-relaxed mb-4 flex-1">
                {service.description}
              </p>
              <div className="mt-auto pt-4 flex items-end justify-between">
                <div>
                  <span className="block text-[10px] font-mono text-[#111118]/40 uppercase tracking-wider">
                    Preço demonstrativo
                  </span>
                  <span className="text-xl font-bold text-[#E83E8C]">{service.price}</span>
                </div>
                <span className="text-xs font-mono text-[#111118]/40">{service.duration}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
