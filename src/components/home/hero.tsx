"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code, Wand2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative px-4 pt-20 pb-32 sm:pt-28 sm:pb-40 lg:pt-36 lg:pb-48 overflow-hidden">
      {/* Camada artística: magia + tecnologia (CSS puro, sem imagens externas) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Luz violeta ambiente */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-violet/10 rounded-full blur-[120px] animate-cm-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-0 right-1/2 -translate-x-1/2 w-[700px] h-[600px] bg-gold/10 rounded-full blur-[120px] animate-cm-float"
          style={{ animationDelay: "2s" }}
        />
        {/* Nós de energia */}
        <div className="absolute top-1/4 left-1/10 w-1 h-1 bg-violet rounded-full shadow-[0_0_12px_#8B5CF6] animate-cm-glow" />
        <div className="absolute top-3/5 right-1/8 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_14px_#D4AF70] animate-cm-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/5 right-1/5 w-0.5 h-0.5 bg-text-primary rounded-full shadow-[0_0_8px_#F5F2EB] animate-cm-glow" style={{ animationDelay: "1.5s" }} />
        {/* Traços de circuito sutis */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(139,92,246,0.03)_100%)]" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Conteúdo textual */}
          <div className="flex flex-col gap-6 animate-cm-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/50 text-[10px] font-mono font-semibold text-gold-soft uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-violet animate-cm-pulse" />
              Estúdio independente · Pronto para seu projeto
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight text-balance">
              Desenvolvimento digital com a precisão de um <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet via-gold to-text-primary">
                toque de magia
              </span>.
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-lg">
              A Code Maestro Tech cria soluções digitais sob medida — da presença online simples a sistemas de gestão — com código limpo, design editorial e compromisso com o resultado do seu negócio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/#catalogo">
                <Button variant="primary" size="lg">
                  Explorar demonstrações
                </Button>
              </Link>
              <Link href="#contato">
                <Button variant="outline" size="lg">
                  Solicitar orçamento
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs font-mono text-text-muted">
              <Code className="h-3 w-3 text-gold" />
              <span>Next.js 16 · TypeScript · Tailwind CSS · Lucide React</span>
            </div>
          </div>

          {/* Composição artística (magia + tecnologia) */}
          <div className="relative h-[420px] sm:h-[520px] lg:h-[600px] flex items-center justify-center animate-cm-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative w-full max-w-sm mx-auto">
              {/* Globo central (obsidiana) */}
              <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-b from-surface to-[#0B0A10] border border-border/80 shadow-[0_0_40px_rgba(139,92,246,0.25)] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.15)_0%,transparent_60%)]" />
                <div className="absolute inset-0 border border-dashed border-gold/30 rounded-full" />
                {/* Nós */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_#D4AF70]" />
                <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-violet shadow-[0_0_10px_#8B5CF6]" />
                <div className="absolute top-2/5 right-1/5 w-1 h-1 rounded-full bg-text-primary" />
                <div className="absolute bottom-2/5 left-2/5 w-1 h-1 rounded-full bg-violet" />
              </div>

              {/* Faixas de energia ao redor */}
              <div className="absolute inset-0 rounded-full border border-dashed border-violet/40 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-0 rounded-full border border-dashed border-gold/30 animate-[-spin_30s_linear_infinite]" style={{ animationDelay: "2s" }} />

              {/* Labels mágico/tecnológico */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full border border-border bg-surface/90 backdrop-blur text-[10px] font-mono font-semibold text-gold-soft tracking-wider">
                <Wand2 className="h-3 w-3 text-violet" />
                <span>Magia ancestral</span>
              </div>
              <div className="absolute -bottom-8 right-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full border border-border bg-surface/90 backdrop-blur text-[10px] font-mono font-semibold text-gold-soft tracking-wider">
                <Code className="h-3 w-3 text-gold" />
                <span>Engenharia futurista</span>
              </div>
            </div>

            {/* Partículas decorativas */}
            <div className="absolute top-1/3 left-1/5 w-3 h-3 bg-violet/40 rounded-full blur shadow-[0_0_12px_#8B5CF6] animate-cm-float" style={{ animationDelay: "0.5s" }} />
            <div className="absolute top-2/3 right-1/6 w-2 h-2 bg-gold/60 rounded-full blur shadow-[0_0_10px_#D4AF70] animate-cm-float" style={{ animationDelay: "1.2s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
