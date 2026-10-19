"use client";

import { Wheat, Leaf, Sun, HeartHandshake } from "lucide-react";
import { PADARIA } from "./data";

export function PadariaDifferentials() {
  const icons = [Wheat, Leaf, Sun, HeartHandshake];

  return (
    <section className="py-20 sm:py-28 lg:pt-36 lg:pb-40 bg-[#FFFCF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#35251C] tracking-tight">
            Diferenciais
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PADARIA.differentials.map((d, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={d.title}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-xl border border-[#35251C]/10 bg-[#F7F0E3]/50"
              >
                <div className="w-12 h-12 rounded-full bg-[#D8A85F]/20 flex items-center justify-center text-[#B86B45]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-[#35251C]">{d.title}</h3>
                <p className="text-sm text-[#35251C]/70">{d.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
