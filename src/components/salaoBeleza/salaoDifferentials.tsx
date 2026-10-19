"use client";

import { UserCheck, Armchair, Heart, Gem } from "lucide-react";
import { SALAO } from "./data";

export function SalaoDifferentials() {
  const icons = [UserCheck, Armchair, Heart, Gem];

  return (
    <section className="py-20 sm:py-28 lg:pt-36 lg:pb-40 bg-[#3A2634]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Diferenciais
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SALAO.differentials.map((d, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={d.title}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-xl border border-white/10 bg-white/5"
              >
                <div className="w-12 h-12 rounded-full bg-[#E83E8C]/15 flex items-center justify-center text-[#E83E8C]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-white">{d.title}</h3>
                <p className="text-sm text-white/60">{d.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
