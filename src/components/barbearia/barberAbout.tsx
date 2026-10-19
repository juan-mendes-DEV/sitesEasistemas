"use client";

import { Scissors, Wand2, ShieldCheck } from "lucide-react";
import { BARBERIA } from "./data";

interface BarberAboutProps {
  className?: string;
}

export function BarberAbout({ className }: BarberAboutProps) {
  const highlights = [
    {
      icon: Scissors,
      title: "Técnica de precisão",
      text: "Cortes executados com máquina, tesoura e navalha, respeitando o formato de cada rosto.",
    },
    {
      icon: Wand2,
      title: "Atendimento acolhedor",
      text: "Ambiente pensado para você relaxar enquanto cuidamos do seu visual.",
    },
    {
      icon: ShieldCheck,
      title: "Higiene e cuidado",
      text: "Equipamentos esterilizados e toalhas limpas a cada atendimento.",
    },
  ];

  return (
    <section
      id="apresentacao"
      className={`${className} py-20 sm:py-28 lg:pt-36 lg:pb-40 bg-[#1A1A1A]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Sobre a Ferro &amp; Navalha
          </h2>
          <p className="mt-4 text-lg text-copper-soft">
            {BARBERIA.tagline}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <p className="text-copper-soft leading-relaxed">
              {BARBERIA.description}
            </p>
            <p className="text-copper-soft leading-relaxed">
              Trabalhamos com cortes masculinos, barba navalha, bigode e sobrancelha, sempre com foco no acabamento e no estilo de cada cliente.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="p-5 rounded-xl border border-white/10 bg-white/5 flex items-start gap-3 transition-colors hover:border-copper/50"
              >
                <div className="w-8 h-8 rounded-full bg-copper/10 flex items-center justify-center text-copper shrink-0 mt-0.5">
                  <h.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{h.title}</h3>
                  <p className="text-sm text-copper-soft">{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
