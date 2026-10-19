"use client";

import { Clock } from "lucide-react";
import { SALAO } from "./data";

export function SalaoHours() {
  return (
    <section className="py-20 sm:py-28 lg:pt-36 lg:pb-40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111118] tracking-tight">
            Horário de funcionamento
          </h2>
          <p className="mt-4 text-lg text-[#111118]/60">
            Horários demonstrativos — a Maison Belle é uma demonstração.
          </p>
        </div>

        <div className="max-w-sm mx-auto grid grid-cols-1 gap-2">
          {SALAO.hours.map((h) => (
            <div
              key={h.day}
              className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#E83E8C]/10 bg-[#F7EAF1]/50"
            >
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-[#E83E8C]" />
                <span className="text-sm font-medium text-[#111118]">{h.day}</span>
              </div>
              <span
                className={`text-sm font-mono ${
                  h.time === "Fechado"
                    ? "text-[#111118]/40"
                    : "text-[#E83E8C] font-semibold"
                }`}
              >
                {h.time}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-[#111118]/40">
            Horários fictícios para demonstração. Confirme a disponibilidade diretamente com o salão.
          </p>
        </div>
      </div>
    </section>
  );
}
