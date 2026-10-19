/**
 * Dados, paleta e regras dos três sistemas básicos de demonstração.
 *
 * Port fiel de `projetosAdd/3-comercios-independentes/`:
 * - GRÃO (cafeteria)        → pedidos     · chave `portfolio-cafeteria-v1`
 * - CORTE & CIA (barbearia) → agendamentos · chave `portfolio-barbearia-v1`
 * - NUVEM (loja-roupas)     → estoque      · chave `portfolio-loja-roupas-v1`
 *
 * Todos os dados são fictícios e de demonstração. A persistência usa apenas
 * o localStorage do navegador — não há backend, autenticação ou
 * sincronização entre dispositivos.
 */

export type SistemaSlug = "estoque" | "agendamentos" | "pedidos";
export type SistemaOrigem = "loja-roupas" | "barbearia" | "cafeteria";

export interface LinhaSistema {
  id: number;
  name: string;
  extra: string;
  quantity: number;
  price: number;
  status: string;
  /** Somente agendamentos (data e horário no formato do datetime-local). */
  date?: string;
}

export interface SistemaPaleta {
  bg: string;
  ink: string;
  accent: string;
  muted: string;
  line: string;
  panel: string;
  soft: string;
  buttontext: string;
  art: string;
  artline: string;
}

export interface SistemaConfig {
  /** Slug do projeto no catálogo comercial. */
  slug: SistemaSlug;
  /** Identidade de origem (pasta em projetosAdd) — também usada nas variantes de CSS. */
  origem: SistemaOrigem;
  /** Chave exclusiva de localStorage, exatamente como no README de origem. */
  storageKey: string;
  brand: string;
  mark: string;
  /** Rótulo do cabeçalho, ex.: "PAINEL DE PEDIDOS". */
  panel: string;
  kicker: string;
  titulo: [string, string];
  sub: string;
  section: string;
  subtitle: string;
  action: string;
  label: string;
  extraLabel: string;
  numLabel: string;
  unitLabel: string;
  /** Somente agendamentos. */
  dateLabel?: string;
  searchPlaceholder: string;
  statuses: string[];
  /** Estoque deriva o status da quantidade (0 → Esgotado, < 5 → Estoque baixo). */
  estadoDerivado: boolean;
  icon: string;
  serial: string;
  type: string;
  /** Linhas fictícias carregadas na primeira abertura. */
  seed: Array<[string, string, number, number, string]>;
  categories: string[];
  story: [string, string];
  paleta: SistemaPaleta;
}

/** Horários fixos das linhas semente (mesma ordem de todas as pastas de origem). */
const TIMES_SEED = ["09:00", "10:00", "11:30"];

/** Data semente única de origem, preservada por fidelidade ao port. */
const DATA_SEED = "2026-10-19";

export const SISTEMA_PEDIDOS: SistemaConfig = {
  slug: "pedidos",
  origem: "cafeteria",
  storageKey: "portfolio-cafeteria-v1",
  brand: "GRÃO",
  mark: "G.",
  panel: "PAINEL DE PEDIDOS",
  kicker: "CAFÉ BOM. ROTINA LEVE.",
  titulo: ["O próximo café", "já está saindo."],
  sub: "Pedidos organizados, do primeiro espresso ao último pedaço de bolo.",
  section: "Balcão de pedidos",
  subtitle: "Acompanhe cada preparo, sem perder o ponto.",
  action: "Novo pedido",
  label: "Produto",
  extraLabel: "Cliente / mesa",
  numLabel: "Quantidade",
  unitLabel: "Preço unitário (R$)",
  searchPlaceholder: "Buscar pedido ou cliente…",
  statuses: ["Recebido", "Em preparo", "Pronto"],
  estadoDerivado: false,
  icon: "☕",
  serial: "EST. 2026 / 01",
  type: "Pedidos",
  seed: [
    ["Cappuccino da casa", "Mesa 04", 2, 16, "Em preparo"],
    ["Espresso duplo", "Balcão · Ana", 1, 9, "Recebido"],
    ["Bolo de laranja", "Mesa 02", 2, 14, "Pronto"],
  ],
  categories: ["Todos", "Recebido", "Em preparo", "Pronto"],
  story: ["Cada pedido tem seu tempo.", "Aqui, você cuida de todos."],
  paleta: {
    bg: "#f5edde",
    ink: "#42291f",
    accent: "#8e3e26",
    muted: "#6b6259",
    line: "#dfd9d0",
    panel: "#fffdf9",
    soft: "#ede9e2",
    buttontext: "#ffffff",
    art: "#e4ceac",
    artline: "#c4a77f",
  },
};

export const SISTEMA_AGENDAMENTOS: SistemaConfig = {
  slug: "agendamentos",
  origem: "barbearia",
  storageKey: "portfolio-barbearia-v1",
  brand: "CORTE & CIA",
  mark: "C/C",
  panel: "PAINEL DE AGENDAMENTOS",
  kicker: "ESTILO É QUESTÃO DE CUIDADO.",
  titulo: ["Sua agenda.", "No melhor corte."],
  sub: "Organize horários e clientes para um atendimento que começa bem.",
  section: "Agenda de atendimentos",
  subtitle: "Seu dia organizado, cadeira por cadeira.",
  action: "Agendar cliente",
  label: "Serviço",
  extraLabel: "Nome do cliente",
  numLabel: "Duração (min)",
  unitLabel: "Valor do serviço (R$)",
  dateLabel: "Data e horário",
  searchPlaceholder: "Buscar cliente ou serviço…",
  statuses: ["Confirmado", "Atendendo", "Finalizado"],
  estadoDerivado: false,
  icon: "✂",
  serial: "EST. 2026 / 02",
  type: "Agendamentos",
  seed: [
    ["Corte clássico", "Rafael Costa", 40, 55, "Confirmado"],
    ["Corte + barba", "Bruno Lima", 60, 85, "Atendendo"],
    ["Barba na toalha quente", "Pedro Alves", 30, 40, "Finalizado"],
  ],
  categories: ["Todos", "Confirmado", "Atendendo", "Finalizado"],
  story: ["Mais que um horário.", "Um ritual de cuidado."],
  paleta: {
    bg: "#151817",
    ink: "#eff3e7",
    accent: "#d6fa65",
    muted: "#9ba49c",
    line: "#343c34",
    panel: "#1c211e",
    soft: "#293125",
    buttontext: "#172015",
    art: "#232d22",
    artline: "#596b43",
  },
};

export const SISTEMA_ESTOQUE: SistemaConfig = {
  slug: "estoque",
  origem: "loja-roupas",
  storageKey: "portfolio-loja-roupas-v1",
  brand: "NUVEM",
  mark: "n.",
  panel: "PAINEL DE ESTOQUE",
  kicker: "ESPAÇO PARA NOVAS POSSIBILIDADES.",
  titulo: ["Uma coleção", "sob controle."],
  sub: "Peças, quantidades e preços em uma visão leve da sua loja.",
  section: "Sua coleção",
  subtitle: "Encontre cada peça. Antecipe a próxima reposição.",
  action: "Adicionar peça",
  label: "Nome da peça",
  extraLabel: "Categoria / tamanho",
  numLabel: "Quantidade em estoque",
  unitLabel: "Preço de venda (R$)",
  searchPlaceholder: "Buscar produto ou categoria…",
  statuses: ["Disponível", "Estoque baixo", "Esgotado"],
  estadoDerivado: true,
  icon: "◇",
  serial: "EST. 2026 / 03",
  type: "Estoque",
  seed: [
    ["Camisa de linho", "Camisas · M", 18, 159.9, "Disponível"],
    ["Calça wide leg", "Calças · 38", 3, 219.9, "Estoque baixo"],
    ["Regata essencial", "Básicos · P", 0, 69.9, "Esgotado"],
  ],
  categories: ["Todos", "Disponível", "Estoque baixo", "Esgotado"],
  story: ["Menos planilhas.", "Mais espaço para criar."],
  paleta: {
    bg: "#f6f3fd",
    ink: "#302448",
    accent: "#6d51c8",
    muted: "#625c74",
    line: "#dfd9d0",
    panel: "#fffdf9",
    soft: "#eee8fa",
    buttontext: "#ffffff",
    art: "#e8e0f5",
    artline: "#c4b3e0",
  },
};

export const SISTEMAS: SistemaConfig[] = [
  SISTEMA_PEDIDOS,
  SISTEMA_AGENDAMENTOS,
  SISTEMA_ESTOQUE,
];

export function getSistema(slug: string): SistemaConfig | undefined {
  return SISTEMAS.find((s) => s.slug === slug);
}

/** Id único novo — a leitura de tempo acontece só em eventos pós-hidratação (fora do render). */
export function novoId(): number {
  return Date.now();
}

/** Linhas semente da primeira abertura (ids 1..n e horários fixos de origem). */
export function linhasIniciais(config: SistemaConfig): LinhaSistema[] {
  return config.seed.map((r, i) => ({
    id: i + 1,
    name: r[0],
    extra: r[1],
    quantity: r[2],
    price: r[3],
    status: r[4],
    date: `${DATA_SEED}T${TIMES_SEED[i] ?? "09:00"}`,
  }));
}

/** Valida uma linha vinda do localStorage; nunca confia no conteúdo salvo. */
export function validarLinha(bruta: unknown): LinhaSistema | null {
  if (typeof bruta !== "object" || bruta === null) return null;
  const r = bruta as Record<string, unknown>;
  if (typeof r.id !== "number" || !Number.isFinite(r.id)) return null;
  if (typeof r.name !== "string" || r.name.trim() === "") return null;
  if (typeof r.extra !== "string" || r.extra.trim() === "") return null;
  if (typeof r.quantity !== "number" || !Number.isFinite(r.quantity)) return null;
  if (typeof r.price !== "number" || !Number.isFinite(r.price)) return null;
  if (typeof r.status !== "string") return null;
  const linha: LinhaSistema = {
    id: r.id,
    name: r.name,
    extra: r.extra,
    quantity: r.quantity,
    price: r.price,
    status: r.status,
  };
  if (typeof r.date === "string") linha.date = r.date;
  return linha;
}

/** Lê as linhas do localStorage (somente no cliente); conteúdo inválido cai na semente. */
export function carregarLinhas(config: SistemaConfig): LinhaSistema[] {
  if (typeof window === "undefined") return linhasIniciais(config);
  try {
    const bruto = window.localStorage.getItem(config.storageKey);
    if (bruto === null) return linhasIniciais(config);
    const dados: unknown = JSON.parse(bruto);
    if (!Array.isArray(dados)) return linhasIniciais(config);
    return dados
      .map(validarLinha)
      .filter((linha): linha is LinhaSistema => linha !== null);
  } catch {
    return linhasIniciais(config);
  }
}

/** Grava as linhas; retorna false quando o armazenamento está indisponível. */
export function salvarLinhas(
  config: SistemaConfig,
  linhas: LinhaSistema[],
): boolean {
  try {
    window.localStorage.setItem(config.storageKey, JSON.stringify(linhas));
    return true;
  } catch {
    return false;
  }
}

/** Status exibido: derivado da quantidade (estoque) ou o status gravado. */
export function estadoLinha(config: SistemaConfig, linha: LinhaSistema): string {
  if (config.estadoDerivado) {
    if (linha.quantity === 0) return "Esgotado";
    if (linha.quantity < 5) return "Estoque baixo";
    return "Disponível";
  }
  return linha.status;
}

export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

/**
 * Data e hora no padrão pt-BR curto ("19/10/26 09:00") sem depender de
 * fuso/localidade do servidor — a formatação é determinística e idêntica
 * no HTML estático e na hidratação.
 */
export function formatarDataHora(iso: string): string {
  const partes = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(iso);
  if (!partes) return iso;
  const [, ano, mes, dia, hora, minuto] = partes;
  return `${dia}/${mes}/${ano.slice(2)} ${hora}:${minuto}`;
}

export interface Estatistica {
  rotulo: string;
  valor: string | number;
  dica: string;
}

/** Os três indicadores automáticos de cada sistema (memória dos resultados). */
export function estatisticas(
  config: SistemaConfig,
  linhas: LinhaSistema[],
): Estatistica[] {
  if (config.estadoDerivado) {
    const total = linhas.reduce((a, r) => a + r.quantity * r.price, 0);
    return [
      {
        rotulo: "Peças em estoque",
        valor: linhas.reduce((a, r) => a + r.quantity, 0),
        dica: "Unidades disponíveis para venda",
      },
      {
        rotulo: "Valor da coleção",
        valor: formatarMoeda(total),
        dica: "Preço de venda × quantidade",
      },
      {
        rotulo: "Precisam de reposição",
        valor: linhas.filter((r) => r.quantity < 5).length,
        dica: "Produtos com menos de 5 unidades",
      },
    ];
  }

  const ehBarbearia = config.origem === "barbearia";
  const total = linhas.reduce(
    (a, r) => a + r.price * (ehBarbearia ? 1 : r.quantity),
    0,
  );
  const finalizados = linhas.filter(
    (r) => r.status === config.statuses[2],
  ).length;

  if (ehBarbearia) {
    return [
      {
        rotulo: "Atendimentos",
        valor: linhas.length,
        dica: "Todos os registros da sua operação",
      },
      {
        rotulo: "Valor agendado",
        valor: formatarMoeda(total),
        dica: "Soma dos serviços cadastrados",
      },
      {
        rotulo: "Finalizados",
        valor: finalizados,
        dica: "Atualize o status na lista abaixo",
      },
    ];
  }

  return [
    {
      rotulo: "Pedidos registrados",
      valor: linhas.length,
      dica: "Todos os registros da sua operação",
    },
    {
      rotulo: "Valor dos pedidos",
      valor: formatarMoeda(total),
      dica: "Soma dos pedidos cadastrados",
    },
    {
      rotulo: "Prontos para servir",
      valor: finalizados,
      dica: "Atualize o status na lista abaixo",
    },
  ];
}

/** Aplica aba de filtro + busca (e ordenação cronológica na barbearia). */
export function linhasVisiveis(
  config: SistemaConfig,
  linhas: LinhaSistema[],
  filtro: string,
  termo: string,
): LinhaSistema[] {
  const alvo = termo.toLowerCase();
  const visiveis = linhas.filter(
    (r) =>
      (filtro === "Todos" || estadoLinha(config, r) === filtro) &&
      `${r.name} ${r.extra}`.toLowerCase().includes(alvo),
  );
  if (config.origem === "barbearia") {
    visiveis.sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));
  }
  return visiveis;
}

/**
 * Regra de sobreposição da barbearia: um novo horário entra se não colide
 * com atendimentos que ainda não foram finalizados (duração em minutos).
 */
export function temConflito(
  config: SistemaConfig,
  linhas: LinhaSistema[],
  candidato: LinhaSistema,
  editandoId: number | null,
): boolean {
  const inicio = new Date(candidato.date ?? "").getTime();
  if (Number.isNaN(inicio)) return false;
  const fim = inicio + candidato.quantity * 60000;
  return linhas.some((x) => {
    if (x.id === editandoId) return false;
    if (x.status === config.statuses[2]) return false;
    const outroInicio = new Date(x.date ?? "").getTime();
    if (Number.isNaN(outroInicio)) return false;
    return inicio < outroInicio + x.quantity * 60000 && fim > outroInicio;
  });
}

/** Avança o status no ciclo configurado (status desconhecido reinicia no primeiro). */
export function proximoStatus(
  config: SistemaConfig,
  linha: LinhaSistema,
): string {
  const indice = config.statuses.indexOf(linha.status);
  return config.statuses[(indice + 1) % config.statuses.length];
}

/** Valor exibido na coluna VALOR: por unidade em estoque/agenda, total em pedidos. */
export function valorCelula(
  config: SistemaConfig,
  linha: LinhaSistema,
): number {
  const porUnidade =
    config.estadoDerivado || config.origem === "barbearia";
  return linha.price * (porUnidade ? 1 : linha.quantity);
}
