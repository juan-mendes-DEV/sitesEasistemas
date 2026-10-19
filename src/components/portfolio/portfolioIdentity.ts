// Dados públicos da identidade, sem catálogo legado ou valores comerciais.
// Compartilhados com a projeção do servidor para evitar enviar dados de preço.
import type { CategoryKey } from "@/types/catalog";

export const OFFICIAL_CONTACT = {
  site: "https://codemaestrotech.com.br",
  domain: "codemaestrotech.com.br",
  whatsapp: "https://wa.me/553531911991",
  phone: "+55 35 3191-1991",
  email: "jp436807@gmail.com",
} as const;

export const PORTFOLIO_CATEGORIES: { key: CategoryKey; label: string; detail: string }[] = [
  { key: "simples", label: "Sites simples", detail: "Presença digital com personalidade." },
  { key: "institucionais", label: "Sites institucionais", detail: "Identidades que ganham profundidade." },
  { key: "ecommerce", label: "Lojas virtuais", detail: "Experiências de descoberta e escolha." },
  { key: "sistemas", label: "Sistemas demonstrativos", detail: "Ideias que se tornam ferramentas." },
];

export const DEMONSTRATION_NOTICE =
  "Os projetos apresentados são demonstrações fictícias desenvolvidas para apresentar possibilidades de soluções digitais.";
