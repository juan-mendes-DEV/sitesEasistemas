"use client";

import Image from "next/image";
import { ArrowRight, Phone, Clock, MapPin } from "lucide-react";

export function PadariaHero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[#F7F0E3]"
    >
      {/* Decorative warm gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(216,168,95,0.15)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(184,107,69,0.1)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 sm:pt-32 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#B86B45]/30 bg-[#B86B45]/5 text-[10px] font-mono font-bold text-[#B86B45] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B86B45]" />
              Padaria artesanal — demonstração
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#35251C] leading-tight tracking-tight text-balance">
              Tradição que se sente em cada{" "}
              <span className="text-[#B86B45]">pedaço.</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#35251C]/80 leading-relaxed max-w-lg">
              Pães artesanais, ingredientes selecionados e o frescor que só
              o cuidado à mão proporcione. Conheça a Padaria Aurora.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href="#cardapio"
                className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#B86B45] text-[#F7F0E3] px-6 font-bold shadow-sm hover:bg-[#A05A38] transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
                Conheça nossos produtos
              </a>
              <a
                href="#contato"
                className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#35251C]/20 bg-transparent text-[#35251C] px-6 font-medium hover:bg-[#35251C]/5 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Entre em contato
              </a>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start gap-6 text-xs font-mono text-[#35251C]/60">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>Ter–Sex: 7h–19h · Sáb–Dom: 8h–14h</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>

          {/* Image content */}
          <div className="relative h-[520px] sm:h-[640px] lg:h-[720px] flex items-center justify-center">
            <div className="relative w-full max-w-md mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop"
                alt="Pães artesanais sobre mesa de madeira na Padaria Aurora"
                width={800}
                height={1000}
                priority
                className="rounded-2xl border border-[#35251C]/10 shadow-2xl"
              />
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#D8A85F] rounded-full opacity-30" />
              <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-[#B86B45] rounded-full opacity-20" />
              <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-[#D8A85F] rounded-full opacity-50" />
              <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-[#B86B45] rounded-full opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
