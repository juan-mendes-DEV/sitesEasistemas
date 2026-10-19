"use client";

import Image from "next/image";
import { Sparkles, Heart, Users } from "lucide-react";
import { SALAO } from "./data";

export function SalaoAbout() {
  return (
    <section id="sobre" className="py-20 sm:py-28 lg:pt-36 lg:pb-40 bg-[#F7EAF1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111118] tracking-tight">
              Sobre o Maison Belle
            </h2>
            <p className="text-[#111118]/70 leading-relaxed">
              {SALAO.description}
            </p>
            <p className="text-[#111118]/70 leading-relaxed">
              A Maison Belle é um espaço de demonstração criado pela Code Maestro Tech
              para apresentar o conceito de um salão de beleza contemporâneo e acolhedor.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { icon: Sparkles, title: "Ambiente sofisticado", text: "Cada detalhe pensado para o seu conforto e relaxamento." },
              { icon: Heart, title: "Atendimento acolhedor", text: "Acolhemos cada cliente com atenção, respeito e cuidado." },
              { icon: Users, title: "Equipe dedicada", text: "Profissionais comprometidas com a qualidade e a sua satisfação." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 p-5 rounded-xl border border-[#E83E8C]/10 bg-white/60"
              >
                <div className="w-8 h-8 rounded-full bg-[#E83E8C]/10 flex items-center justify-center text-[#E83E8C] shrink-0 mt-0.5">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[#111118] text-sm">{item.title}</h3>
                  <p className="text-sm text-[#111118]/60">{item.text}</p>
                </div>
              </div>
            ))}
            <div className="rounded-xl overflow-hidden border border-[#E83E8C]/10">
              <Image
                src="https://images.unsplash.com/photo-1522337660860-93b9b3f6d861?q=80&w=800&auto=format&fit=crop"
                alt="Detalhes elegantes do salão Maison Belle"
                width={800}
                height={500}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
