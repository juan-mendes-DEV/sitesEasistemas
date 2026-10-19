"use client";

import Image from "next/image";
import { Scissors } from "lucide-react";

interface BarberHeroProps {
  className?: string;
}

export function BarberHero({ className }: BarberHeroProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-transparent to-[#1A1A1A/90] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(184,115,51,0.15)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 sm:pt-32 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text content */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-copper/40 bg-copper/5 text-[10px] font-mono font-bold text-copper uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-copper" />
              Aberta para agendamentos
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight text-balance">
              Corte e barba com a precisão de uma <br />
              <span className="text-copper">navalha afiada.</span>
            </h1>
            <p className="text-lg sm:text-xl text-copper-soft leading-relaxed max-w-lg">
              Técnica de precisão, atendimento acolhedor e o cuidado clássico que o visual masculino merece.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a href="#contato" className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-copper text-[#1A1A1A] px-6 font-bold shadow-[0_0_20px_rgba(184,115,51,0.4)] hover:bg-copper-soft transition-colors">
                <PhoneIcon className="h-4 w-4" />
                Agendar pelo WhatsApp
              </a>
              <a href="#servicos" className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent text-white px-6 font-medium hover:bg-white/5 transition-colors">
                <Scissors className="h-4 w-4" />
                Ver serviços
              </a>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start gap-6 text-xs font-mono text-copper-soft">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-3 w-3" />
                <span>Ter–Sex: 10h–20h · Sáb: 9h–18h</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-3 w-3" />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>

          {/* Image content */}
          <div className="relative h-[520px] sm:h-[640px] lg:h-[720px] flex items-center justify-center">
            <div className="relative w-full max-w-md mx-auto">
              <div
                className="absolute inset-0 bg-[url('/imgs/barbe01.jpg')] bg-cover bg-center rounded-2xl border border-white/10 shadow-2xl"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 to-transparent rounded-2xl border border-white/10" />
              <div className="absolute inset-0 rounded-2xl border border-dashed border-copper/30" />
              <Image
                src="/imgs/barbe01.jpg"
                alt="Interior da barbearia Ferro & Navalha com espelho e cadeira de barbeiro"
                width={800}
                height={1000}
                priority
                className="rounded-2xl border border-white/10 opacity-0 transition-opacity duration-500"
                loading="eager"
              />
              {/* Decorative elements around the image */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-copper rounded-full shadow-[0_0_20px_rgba(184,115,51,0.5)]" />
              <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-white/10 rounded-full backdrop-blur" />
              <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-copper rounded-full opacity-50" />
              <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-copper rounded-full opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 011 1.453l.98 2.86a1 1 0 001.12 1.12l2.86.98a1 1 0 011.453 1A2 2 0 0115.714 16H17a2 2 0 012 2v1.5a2 2 0 01-2 2h-2.5a2 2 0 01-2-2v-1.414l-.293-.293a1 1 0 00-1.414 0l-1.414 1.414A2 2 0 018.086 15H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19l-6 6-1-1 6-6 6 6-1 1z" />
    </svg>
  );
}
