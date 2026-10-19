"use client";

import { PADARIA } from "./data";

export function PadariaHours() {
  return (
    <section className="py-20 sm:py-28 lg:pt-36 lg:pb-40 bg-[#FFFCF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#35251C] tracking-tight">
            Horário de funcionamento
          </h2>
          <p className="mt-4 text-lg text-[#35251C]/70">
            Horários demonstrativos — a padaria Aurora é uma demonstração.
          </p>
        </div>

        <div className="max-w-sm mx-auto grid grid-cols-1 gap-2">
          {PADARIA.hours.map((h) => (
            <div
              key={h.day}
              className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#35251C]/10 bg-[#F7F0E3]/50"
            >
              <span className="text-sm font-medium text-[#35251C]">{h.day}</span>
              <span
                className={`text-sm font-mono ${
                  h.time === "Fechado"
                    ? "text-[#35251C]/40"
                    : "text-[#B86B45] font-semibold"
                }`}
              >
                {h.time}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-[#35251C]/40">
            Horários fictícios para demonstração. Confirme a disponibilidade diretamente com a padaria.
          </p>
        </div>
      </div>
    </section>
  );
}
