"use client";

import Image from "next/image";
import { Wheat, Heart, ShieldCheck } from "lucide-react";
import { PADARIA } from "./data";

export function PadariaAbout() {
  const highlights = [
    {
      icon: Wheat,
      title: "Fermentação natural",
      text: "Nossos pães crescem com tempo e paciência, sem pressa.",
    },
    {
      icon: Heart,
      title: "Feito à mão",
      text: "Cada peça é modelada manualmente com cuidado.",
    },
    {
      icon: ShieldCheck,
      title: "Sem conservantes",
      text: "Ingredientes simples e honestos na receita.",
    },
  ];

  return (
    <section id="historia" className="py-20 sm:py-28 lg:pt-36 lg:pb-40 bg-[#FFFCF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#35251C] tracking-tight">
              Nossa história
            </h2>
            <p className="text-[#35251C]/80 leading-relaxed">
              {PADARIA.description}
            </p>
            <p className="text-[#35251C]/80 leading-relaxed">
              Produzimos em pequenos lotes para garantir que cada produto saia
              do forno no ponto certo. A Padaria Aurora é um espaço de
              demonstração criado pela Code Maestro Tech para apresentar o
              conceito de uma padaria artesanal contemporânea.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="p-5 rounded-xl border border-[#35251C]/10 bg-[#F7F0E3]/50 flex items-start gap-3 transition-colors hover:border-[#B86B45]/30"
              >
                <div className="w-8 h-8 rounded-full bg-[#D8A85F]/20 flex items-center justify-center text-[#B86B45] shrink-0 mt-0.5">
                  <h.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[#35251C] text-sm">{h.title}</h3>
                  <p className="text-sm text-[#35251C]/70">{h.text}</p>
                </div>
              </div>
            ))}
            <div className="sm:col-span-2 rounded-xl overflow-hidden border border-[#35251C]/10">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop"
                alt="Interior aconchegante da Padaria Aurora com pães artesanais"
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
