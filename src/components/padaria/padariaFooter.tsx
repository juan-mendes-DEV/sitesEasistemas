"use client";

import Link from "next/link";
import { PADARIA } from "./data";

export function PadariaFooter() {
  return (
    <footer className="border-t border-[#35251C]/10 bg-[#35251C] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#B86B45] flex items-center justify-center text-[#F7F0E3] font-bold text-[10px]">
              PA
            </div>
            <span className="font-bold text-[#F7F0E3] text-sm tracking-tight">Padaria Aurora</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 text-xs font-mono text-[#F7F0E3]/50">
            <span>{PADARIA.address} — {PADARIA.neighborhood}</span>
            <span>{PADARIA.email}</span>
            <span>{PADARIA.instagram}</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono text-[#F7F0E3]/30 border-l border-[#F7F0E3]/10 pl-4">
            <span>Demonstração comercial</span>
            <span>·</span>
            <span>Criado por <Link href="/" className="text-[#D8A85F] hover:underline">Code Maestro Tech</Link></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
