"use client";

import { BARBERIA } from "./data";

interface BarberHoursProps {
  className?: string;
}

export function BarberHours({ className }: BarberHoursProps) {
  return (
    <section
      id="horario"
      className={`${className} py-20 sm:py-28 lg:pt-36 lg:pb-40`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Horário de funcionamento
          </h2>
          <p className="mt-4 text-lg text-copper-soft">
            Confira nossos dias e horários de atendimento.
          </p>
        </div>

        <div className="max-w-sm mx-auto grid grid-cols-1 gap-2">
          {BARBERIA.hours.map((h) => (
            <div
              key={h.day}
              className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 bg-white/5"
            >
              <span className="text-sm font-medium text-white">{h.day}</span>
              <span
                className={`text-sm font-mono ${
                  h.time === "Fechado"
                    ? "text-copper-soft"
                    : "text-copper font-semibold"
                }`}
              >
                {h.time}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-copper-soft">
            Horários fictícios para demonstração. Confirme a disponibilidade diretamente com a barbearia.
          </p>
        </div>
      </div>
    </section>
  );
}
