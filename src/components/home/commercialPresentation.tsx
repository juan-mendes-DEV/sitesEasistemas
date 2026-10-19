"use client";

import { Check, Rocket, Settings, ArrowRight } from "lucide-react";

export function CommercialPresentation() {
  const benefits = [
    {
      title: "Código limpo e documentado",
      description: "Desenvolvimento com boas práticas, fácil de manter e escalar conforme o seu negócio cresce.",
      icon: Check,
    },
    {
      title: "Design editorial premium",
      description: "Interfaces sofisticadas, com tipografia cuidadosa, hierarquia clara e excelente legibilidade.",
      icon: Rocket,
    },
    {
      title: "Responsivo de verdade",
      description: "Layout que funciona desde 320 px até telas grandes, com navegação por teclado e contraste acessível.",
      icon: Settings,
    },
    {
      title: "Suporte direto com quem desenvolve",
      description: "Marca independente: você fala diretamente com o profissional que constrói seu projeto.",
      icon: ArrowRight,
    },
  ];

  const process = [
    "Solicite um orçamento pelo botão de contato.",
    "Definimos o escopo, o preço-base e o prazo em contrato.",
    "Desenvolvemos e homologamos o projeto com você.",
    "Entrega do código e orientação para publicação.",
  ];

  const customization = [
    "Cada demonstração é um ponto de partida, não um produto fechado.",
    "Funcionalidades, páginas, integrações e bancos de dados são definidos de acordo com o seu contrato.",
    "Pagamentos reais, painéis administrativos e relatórios dependem do escopo contratado.",
  ];

  return (
    <section
      id="apresentacao-comercial"
      className="px-4 pt-20 pb-32 sm:pt-28 sm:pb-40 lg:pt-36 lg:pb-48 bg-surface border-y border-border/60"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Cabeçalho */}
          <div className="flex flex-col gap-6 animate-cm-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/5 text-[11px] font-mono font-bold text-gold uppercase tracking-wider">
              Apresentação comercial
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
              Por que desenvolver com a Code Maestro Tech
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Transformamos sua ideia em um projeto tecnológico real, com compromisso com qualidade técnica, criatividade e profissionalismo.
            </p>
          </div>

          {/* Benefícios */}
          <div className="grid grid-cols-1 gap-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex items-start gap-3 p-4 rounded-xl border border-border bg-background/5 transition-cm hover:border-gold/40"
              >
                <b.icon className="h-5 w-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-bold text-text-primary">{b.title}</h3>
                  <p className="text-sm text-text-secondary">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-3 animate-cm-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-xl font-bold text-text-primary mb-6">Processo de contratação</h3>
            <ol className="list-decimal list-inside space-y-3 text-text-secondary text-sm">
              {process.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="animate-cm-fade-in" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-xl font-bold text-text-primary mb-6">Personalização de projetos</h3>
            <ul className="list-disc list-inside space-y-3 text-text-secondary text-sm">
              {customization.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="animate-cm-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="p-5 rounded-xl border border-gold/40 bg-gold/5">
              <h3 className="font-bold text-text-primary mb-3">Demonstração ≠ produto contratado</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                As páginas de demonstração exibidas no catálogo usam marcas e informações fictícias, estão em desenvolvimento e não processam pagamentos nem utilizam dados reais. O produto final é definido e orçado separadamente, conforme o escopo do contrato.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
