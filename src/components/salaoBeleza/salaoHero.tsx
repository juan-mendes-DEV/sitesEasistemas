"use client";

import Image from "next/image";
import { Calendar, Phone } from "lucide-react";

export function SalaoHero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-[#111118]">
      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111118] via-[#111118]/90 to-[#3A2634]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(232,62,140,0.15)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_85%,rgba(58,38,52,0.4)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 sm:pt-36 sm:pb-40 lg:pt-44 lg:pb-48">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E83E8C]/30 bg-[#E83E8C]/5 text-[10px] font-mono font-bold text-[#E83E8C] uppercase tracking-wider w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E83E8C]" />
              Boutique de beleza
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight text-balance">
              Sua melhor versão{" "}
              <span className="text-[#E83E8C]">começa aqui.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-lg">
              Um espaço pensado para o seu conforto, com atendimento personalizado e profissionais dedicadas a realçar a sua essência.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href="#servicos"
                className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#E83E8C] text-white px-6 font-bold shadow-sm hover:bg-[#D12D7D] transition-colors"
              >
                <Calendar className="h-4 w-4" />
                Conheça nossos serviços
              </a>
              <a
                href="#agendamento"
                className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent text-white px-6 font-medium hover:bg-white/5 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Agende seu horário
              </a>
            </div>
          </div>

          {/* Image content */}
          <div className="relative h-[480px] sm:h-[600px] lg:h-[680px] flex items-center justify-center">
            <div className="relative w-full max-w-md mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1200&auto=format&fit=crop"
                alt="Interior elegante de salão de beleza boutique com iluminação sofisticada"
                width={800}
                height={1000}
                priority
                className="rounded-2xl border border-[#E83E8C]/20 shadow-2xl"
              />
              {/* Pink accent line */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-[#E83E8C] rounded-full" />
              {/* Decorative corner accents */}
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-[#E83E8C]/40" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-[#E83E8C]/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
