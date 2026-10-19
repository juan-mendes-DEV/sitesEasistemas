"use client";

export const TERMS_ITEMS = [
  {
    id: "termo-1",
    title: "Preços-base",
    content:
      "Os valores anunciados são preços-base para o desenvolvimento dentro do escopo definido. Não incluem funcionalidades ilimitadas.",
  },
  {
    id: "termo-2",
    title: "Domínio",
    content:
      "Registro, renovação e custos relacionados ao domínio são responsabilidade do contratante.",
  },
  {
    id: "termo-3",
    title: "Hospedagem",
    content:
      "Hospedagem e respectivos pagamentos são responsabilidade do contratante. Eventuais planos pagos da Vercel deverão ser contratados conforme as necessidades e regras comerciais da plataforma.",
  },
  {
    id: "termo-4",
    title: "Serviços adicionais",
    content:
      "Serviços adicionais, manutenção e alterações fora do escopo serão orçados separadamente.",
  },
  {
    id: "termo-5",
    title: "Prazos e pagamentos",
    content:
      "Prazos de desenvolvimento, entregas, homologação e pagamentos serão definidos em contrato.",
  },
  {
    id: "termo-6",
    title: "Integrações externas",
    content:
      "Integrações com serviços externos poderão gerar custos adicionais.",
  },
  {
    id: "termo-7",
    title: "Demonstrações fictícias",
    content:
      "As demonstrações usam marcas e informações fictícias e não representam negócios reais.",
  },
  {
    id: "termo-8",
    title: "Sem pagamentos reais",
    content:
      "Lojas demonstrativas não processam pagamentos reais.",
  },
  {
    id: "termo-9",
    title: "Sem dados reais",
    content:
      "Sistemas demonstrativos não devem utilizar dados pessoais reais.",
  },
  {
    id: "termo-10",
    title: "Direitos contratuais",
    content:
      "Direitos de uso, entrega de código, propriedade intelectual, suporte e garantias dependerão das condições contratuais.",
  },
  {
    id: "termo-11",
    title: "Plataforma Vercel",
    content:
      "Eventuais planos pagos da Vercel deverão ser contratados conforme as necessidades e regras comerciais da plataforma.",
  },
  {
    id: "termo-12",
    title: "Confirmação do escopo",
    content:
      "O escopo final e o orçamento deverão ser confirmados antes da contratação.",
  },
];

export function CommercialTerms() {
  return (
    <section
      id="condicoes-comerciais"
      className="px-4 pt-20 pb-32 sm:pt-28 sm:pb-40 lg:pt-36 lg:pb-48"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-cm-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet/40 bg-violet/5 text-[11px] font-mono font-bold text-violet uppercase tracking-wider">
            Condições comerciais
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-4 tracking-tight">
            Termos do portfólio comercial
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Todas as condições estão visíveis aqui, sem depender de documento externo. Leia antes de solicitar um orçamento.
          </p>
        </div>

        <div className="space-y-4">
          {TERMS_ITEMS.map((item) => (
            <article
              key={item.id}
              className="group relative flex flex-col rounded-xl border border-border bg-surface/60 backdrop-blur p-5 sm:p-6 transition-cm hover:border-gold/40 hover:shadow-[0_0_24px_rgba(212,175,112,0.10)]"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1 h-1 rounded-full bg-gold group-hover:bg-violet transition-colors" />
                <h3 className="font-bold text-text-primary group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.content}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border/60 text-center animate-cm-slide-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-xs font-mono text-text-muted">
            Não inventamos multas, prazos obrigatórios, garantias legais ou cláusulas jurídicas complexas. Tudo será definido em contrato.
          </p>
        </div>
      </div>
    </section>
  );
}
