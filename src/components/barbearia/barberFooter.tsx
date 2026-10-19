"use client";

"use client";

import Link from "next/link";
import { BARBERIA } from "./data";

interface BarberFooterProps {
  className?: string;
}

export function BarberFooter({ className }: BarberFooterProps) {
  return (
    <footer className={`${className} border-t border-white/10 bg-[#1A1A1A] mt-auto`}>
      <div className="border-y border-white/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-copper flex items-center justify-center text-[#1A1A1A] font-bold text-[10px]">
              FN
            </div>
            <span className="font-bold text-white text-sm tracking-tight">Ferro &amp; Navalha</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 text-xs font-mono text-copper-soft">
            <span>{BARBERIA.address} — {BARBERIA.neighborhood}</span>
            <span>{BARBERIA.email}</span>
            <span>{BARBERIA.instagram}</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono text-copper-soft border-l border-white/10 pl-4">
            <span>Demonstração comercial</span>
            <span>·</span>
            <span>Criado por <Link href="/" className="text-copper hover:underline">Code Maestro Tech</Link></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
