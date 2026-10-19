/**
 * Dados da loja demonstrativa Botânica Essence — cosméticos e
 * autocuidado.
 *
 * Fórmulas, ingredientes e volumes são demonstrativos. Não há
 * alegações médicas, terapêuticas ou de eficácia, nem certificações
 * ou registros sanitários.
 */

import type { PriceRange, Product, ProductCategory, Store } from "@/types/ecommerce";

export const BOTANICA_STORE: Store = {
  key: "cosmeticos",
  name: "Botânica Essence",
  slogan: "Beleza que floresce naturalmente.",
  route: "/exemplos/ecommerce/cosmeticos",
  cartStorageKey: "cm-ecommerce:cart:cosmeticos",
};

export const BOTANICA_CATEGORIES: ProductCategory[] = [
  { id: "hidratantes", label: "Hidratantes" },
  { id: "serums", label: "Séruns" },
  { id: "sabonetes", label: "Sabonetes" },
  { id: "oleos", label: "Óleos corporais" },
  { id: "kits", label: "Kits de autocuidado" },
];

export const BOTANICA_PRICE_RANGES: PriceRange[] = [
  { id: "ate-50", label: "Até R$ 50", min: 0, max: 50 },
  { id: "50-100", label: "R$ 50 a R$ 100", min: 50, max: 100 },
  { id: "100-200", label: "R$ 100 a R$ 200", min: 100, max: 200 },
  { id: "200-em-diante", label: "R$ 200 em diante", min: 200, max: Number.POSITIVE_INFINITY },
];

const img = (slug: string) => [
  `/imgs/botanica/${slug}.jpg`,
  `/imgs/botanica/${slug}-detalhe.jpg`,
];

export const BOTANICA_PRODUCTS: Product[] = [
  {
    id: "bot-hidratante-karite",
    slug: "hidratante-manteiga-karite",
    name: "Hidratante Manteiga de Karité",
    price: 129,
    category: "hidratantes",
    description:
      "Hidratante corporal de textura rica para o ritual diário de autocuidado. Apresentação demonstrativa com ingredientes ilustrativos.",
    images: img("hidratante-manteiga-karite"),
    stock: 26,
    badge: "Mais vendido (demo)",
    volume: "250 ml",
    ingredients: ["manteiga de karité (demonstrativo)", "óleo de girassol", "glicerina vegetal", "água"],
  },
  {
    id: "bot-hidratante-facial",
    slug: "hidratante-facial-botanico",
    name: "Hidratante Facial Botânico",
    price: 149,
    category: "hidratantes",
    description:
      "Hidratante facial de toque seco para uso matinal e noturno. Linha de demonstração sem promessas de resultado.",
    images: img("hidratante-facial-botanico"),
    stock: 19,
    volume: "50 ml",
    ingredients: ["extrato de folhas (demonstrativo)", "ácido hialurônico (demonstrativo)", "óleo de jojoba", "água"],
  },
  {
    id: "bot-hidratante-aveia",
    slug: "hidratante-corporal-aveia",
    name: "Hidratante Corporal Leite de Aveia",
    price: 119,
    category: "hidratantes",
    description:
      "Hidratante corporal de fragrância suave inspirada em leite de aveia. Produto fictício para demonstração de catálogo.",
    images: img("hidratante-corporal-aveia"),
    stock: 31,
    volume: "400 ml",
    ingredients: ["leite de aveia (demonstrativo)", "óleo de canola", "glicerina vegetal"],
  },
  {
    id: "bot-serum-vitaminac",
    slug: "serum-vitaminac-natural",
    name: "Sérum Vitamina C Natural",
    price: 189,
    category: "serums",
    description:
      "Sérum de textura leve com vitamina C de origem vegetal (demonstrativo) para o ritual da manhã. Sem promessa de eficácia.",
    images: img("serum-vitaminac-natural"),
    stock: 17,
    badge: "Novo",
    volume: "30 ml",
    ingredients: ["derivado de vitamina C (demonstrativo)", "água floral de laranjeira", "glicerina vegetal"],
  },
  {
    id: "bot-serum-niacinamida",
    slug: "serum-facial-niacinamida",
    name: "Sérum Facial de Niacinamida",
    price: 179,
    category: "serums",
    description:
      "Sérum facial aquoso com niacinamida (demonstrativo) integrado à rotina noturna. Conteúdo ilustrativo da loja fictícia.",
    images: img("serum-facial-niacinamida"),
    stock: 21,
    volume: "30 ml",
    ingredients: ["niacinamida (demonstrativo)", "zinco PCA (demonstrativo)", "água"],
  },
  {
    id: "bot-serum-noturno",
    slug: "serum-noturno-flores",
    name: "Sérum Noturno de Flores",
    price: 199,
    category: "serums",
    description:
      "Sérum noturno com infusão floral e acabamento aveludado. Apresentação demonstrativa sem alegações terapêuticas.",
    images: img("serum-noturno-flores"),
    stock: 13,
    volume: "30 ml",
    ingredients: ["extrato de flor de lavanda (demonstrativo)", "óleo de camomila (demonstrativo)", "esqualano vegetal"],
  },
  {
    id: "bot-sabonete-lavanda",
    slug: "sabonete-lavanda",
    name: "Sabonete Vegetal de Lavanda",
    price: 39,
    category: "sabonetes",
    description:
      "Sabonete vegetal artesanal com fragrância de lavanda e barra de curva manual. Item fictício do catálogo de demonstração.",
    images: img("sabonete-lavanda"),
    stock: 48,
    volume: "100 g",
    ingredients: ["base vegetal de sabão (demonstrativo)", "óleo essencial de lavanda (demonstrativo)", "argila branca"],
  },
  {
    id: "bot-sabonete-argila",
    slug: "sabonete-argila-verde",
    name: "Sabonete Artesanal de Argila Verde",
    price: 42,
    category: "sabonetes",
    description:
      "Barra artesanal com argila verde e textura cremosa para o banho diário. Produto de demonstração, sem registros sanitários.",
    images: img("sabonete-argila-verde"),
    stock: 36,
    volume: "100 g",
    ingredients: ["argila verde (demonstrativo)", "óleo de oliva", "manteiga de karité (demonstrativo)"],
  },
  {
    id: "bot-oleo-amendoas",
    slug: "oleo-corporal-amendoas",
    name: "Óleo Corporal de Amêndoas",
    price: 99,
    category: "oleos",
    description:
      "Óleo corporal seco de amêndoas para massagem e hidratação ritualística. Linha ilustrativa da Botânica Essence.",
    images: img("oleo-corporal-amendoas"),
    stock: 25,
    volume: "200 ml",
    ingredients: ["óleo de amêndoas doces (demonstrativo)", "óleo de jojoba", "vitamina E (demonstrativo)"],
  },
  {
    id: "bot-oleo-seco",
    slug: "oleo-seco-relaxante",
    name: "Óleo Seco Relaxante",
    price: 109,
    category: "oleos",
    description:
      "Óleo seco de rápida evaporação com fragrância de lavanda e camomila. Descrição aromática, sem promessa de efeito clínico.",
    images: img("oleo-seco-relaxante"),
    stock: 22,
    badge: "Novo",
    volume: "150 ml",
    ingredients: ["óleo de girassol (demonstrativo)", "fragrância de lavanda e camomila (demonstrativo)", "vitamina E (demonstrativo)"],
  },
  {
    id: "bot-kit-rotina",
    slug: "kit-rotina-essencial",
    name: "Kit Rotina Essencial",
    price: 349,
    category: "kits",
    description:
      "Trio de demonstração com hidratante facial, sérum e sabonete vegetal para montar uma rotina simples de autocuidado.",
    images: img("kit-rotina-essencial"),
    stock: 9,
    volume: "3 itens",
    kitContents: [
      "Hidratante Facial Botânico 50 ml",
      "Sérum Vitamina C Natural 30 ml",
      "Sabonete Vegetal de Lavanda 100 g",
    ],
    ingredients: ["itens com fórmulas demonstrativas (ver páginas individuais)"],
  },
  {
    id: "bot-kit-autoescuidado",
    slug: "kit-autoescuidado-completo",
    name: "Kit Autoescuidado Completo",
    price: 429,
    category: "kits",
    description:
      "Conjunto ilustrativo com quatro itens do ritual completo, apresentado em embalagem de demonstração da marca fictícia.",
    images: img("kit-autoescuidado-completo"),
    stock: 7,
    volume: "4 itens",
    kitContents: [
      "Hidratante Manteiga de Karité 250 ml",
      "Sérum Facial de Niacinamida 30 ml",
      "Óleo Corporal de Amêndoas 200 ml",
      "Sabonete Artesanal de Argila Verde 100 g",
    ],
    ingredients: ["itens com fórmulas demonstrativas (ver páginas individuais)"],
  },
  {
    id: "bot-kit-descoberta",
    slug: "kit-botanico-descoberta",
    name: "Kit Botânico Descoberta",
    price: 199,
    category: "kits",
    description:
      "Kit de amostras para conhecer a linha da loja fictícia. Conteúdo demonstrativo completo para demonstração de vitrine.",
    images: img("kit-botanico-descoberta"),
    stock: 15,
    badge: "Kit demo",
    volume: "5 miniaturas",
    kitContents: [
      "Hidratante Facial Botânico 20 ml",
      "Sérum Noturno de Flores 15 ml",
      "Óleo Seco Relaxante 50 ml",
      "Sabonete Vegetal de Lavanda 50 g",
      "Hidratante Corporal Leite de Aveia 100 ml",
    ],
    ingredients: ["miniaturas com fórmulas demonstrativas (ver páginas individuais)"],
  },
];

export const BOTANICA_EDITORIAL = {
  heroImage: "/imgs/botanica/hero.jpg",
  sections: {
    spa: "/imgs/botanica/secao-spa.jpg",
    vela: "/imgs/botanica/secao-vela.jpg",
  },
};

/** Aviso de conteúdo demonstrativo exibido no rodapé da loja. */
export const BOTANICA_NOTICE =
  "Ingredientes e volumes são demonstrativos. Esta loja não faz alegações médicas, terapêuticas ou de eficácia e não possui certificações ou registros sanitários.";
