"use client";

import Link from "next/link";
import { SALAO } from "./data";

export function SalaoFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#111118] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#E83E8C] flex items-center justify-center text-white font-bold text-[10px]">
              MB
            </div>
            <span className="font-bold text-white text-sm tracking-tight">Maison Belle</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 text-xs font-mono text-white/40">
            <span>{SALAO.address} — {SALAO.neighborhood}</span>
            <span>{SALAO.email}</span>
            <span>{SALAO.instagram}</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono text-white/30 border-l border-white/10 pl-4">
            <span>Demonstração comercial</span>
            <span>·</span>
            <span>Criado por <Link href="/" className="text-[#E83E8C] hover:underline">Code Maestro Tech</Link></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
