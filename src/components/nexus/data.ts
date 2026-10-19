/**
 * Dados da loja demonstrativa NEXUS Tech Store — eletrônicos e
 * acessórios. Marcas, modelos e especificações são inventados para
 * demonstração; nenhum produto real é representado.
 */

import type { PriceRange, Product, ProductCategory, Store } from "@/types/ecommerce";

export const NEXUS_STORE: Store = {
  key: "eletronicos",
  name: "NEXUS Tech Store",
  slogan: "Tecnologia para o próximo nível.",
  route: "/exemplos/ecommerce/eletronicos",
  cartStorageKey: "cm-ecommerce:cart:eletronicos",
};

export const NEXUS_CATEGORIES: ProductCategory[] = [
  { id: "smartphones", label: "Smartphones" },
  { id: "fones", label: "Fones de ouvido" },
  { id: "teclados", label: "Teclados" },
  { id: "mouses", label: "Mouses" },
  { id: "monitores", label: "Monitores" },
  { id: "acessorios", label: "Acessórios" },
];

export const NEXUS_PRICE_RANGES: PriceRange[] = [
  { id: "ate-300", label: "Até R$ 300", min: 0, max: 300 },
  { id: "300-800", label: "R$ 300 a R$ 800", min: 300, max: 800 },
  { id: "800-1500", label: "R$ 800 a R$ 1.500", min: 800, max: 1500 },
  { id: "1500-em-diante", label: "R$ 1.500 em diante", min: 1500, max: Number.POSITIVE_INFINITY },
];

const img = (slug: string) => [
  `/imgs/nexus/${slug}.jpg`,
  `/imgs/nexus/${slug}-detalhe.jpg`,
];

export const NEXUS_PRODUCTS: Product[] = [
  {
    id: "nexus-prism-x1",
    slug: "smartphone-prism-x1",
    name: "Smartphone Prism X1",
    price: 2299,
    category: "smartphones",
    description:
      "Topo de linha fictício com tela AMOLED de 6,7 polegadas e câmera principal de 50 MP. Demonstração de ficha técnica para catálogo de eletrônicos.",
    images: img("smartphone-prism-x1"),
    stock: 12,
    badge: "Novo",
    specs: [
      { label: "Tela", value: "6,7\" AMOLED" },
      { label: "Processador", value: "Octa-core NX-900" },
      { label: "Câmera", value: "50 MP + 12 MP" },
      { label: "Bateria", value: "4.800 mAh" },
      { label: "Armazenamento", value: "256 GB" },
      { label: "Peso", value: "188 g" },
      { label: "Conectividade", value: "5G, Wi-Fi 6, Bluetooth 5.3" },
    ],
  },
  {
    id: "nexus-prism-lite",
    slug: "smartphone-prism-lite",
    name: "Smartphone Prism Lite",
    price: 1499,
    category: "smartphones",
    description:
      "Versão compacta da linha Prism, com painel de 6,1 polegadas e bateria de 4.000 mAh. Produto ilustrativo de demonstração.",
    images: img("smartphone-prism-lite"),
    stock: 20,
    specs: [
      { label: "Tela", value: "6,1\" LCD 90 Hz" },
      { label: "Processador", value: "Octa-core NX-520" },
      { label: "Câmera", value: "48 MP + 8 MP" },
      { label: "Bateria", value: "4.000 mAh" },
      { label: "Armazenamento", value: "128 GB" },
      { label: "Peso", value: "176 g" },
      { label: "Conectividade", value: "5G, Wi-Fi 5, Bluetooth 5.2" },
    ],
  },
  {
    id: "nexus-overedge-anc",
    slug: "fone-overedge-anc",
    name: "Fone OverEdge ANC",
    price: 799,
    category: "fones",
    description:
      "Fone over-ear com cancelamento ativo de ruído e 40 horas de autonomia demonstrativa. Fotografia de estúdio para catálogo fictício.",
    images: img("fone-overedge-anc"),
    stock: 15,
    badge: "Destaque",
    specs: [
      { label: "Tipo", value: "Over-ear com cancelamento ativo" },
      { label: "Conexão", value: "Bluetooth 5.3" },
      { label: "Autonomia", value: "40 h" },
      { label: "Microfone", value: "Integrado com redução de ruído" },
      { label: "Peso", value: "260 g" },
      { label: "Case de transporte", value: "Case rígido incluso" },
    ],
  },
  {
    id: "nexus-retro-arc",
    slug: "fone-retro-arc",
    name: "Fone Retro Arc",
    price: 499,
    category: "fones",
    description:
      "Fone on-ear de acabamento acetinado com assinatura sonora equilibrada (demonstração). Design retrô da coleção fictícia.",
    images: img("fone-retro-arc"),
    stock: 18,
    specs: [
      { label: "Tipo", value: "On-ear" },
      { label: "Conexão", value: "Bluetooth 5.2" },
      { label: "Autonomia", value: "30 h" },
      { label: "Microfone", value: "Integrado" },
      { label: "Peso", value: "195 g" },
      { label: "Case de transporte", value: null },
    ],
  },
  {
    id: "nexus-tws-orbit",
    slug: "fone-tws-orbit",
    name: "Fone TWS Orbit",
    price: 399,
    category: "fones",
    description:
      "Fone sem fio in-ear com estojo de recarga e microfones duplos. Item de demonstração para comparar categorias no catálogo.",
    images: img("fone-tws-orbit"),
    stock: 24,
    specs: [
      { label: "Tipo", value: "In-ear sem fio (TWS)" },
      { label: "Conexão", value: "Bluetooth 5.3" },
      { label: "Autonomia", value: "24 h com o estojo" },
      { label: "Microfone", value: "Duplo por unidade" },
      { label: "Peso", value: "48 g com estojo" },
      { label: "Case de transporte", value: "Estojo de recarga incluso" },
    ],
  },
  {
    id: "nexus-tactile-pro",
    slug: "teclado-tactile-pro",
    name: "Teclado Tactile Pro",
    price: 549,
    category: "teclados",
    description:
      "Teclado mecânico com switches táteis e iluminação branca por tecla. Modelagem ABNT2 fictícia para o workstation demonstrativo.",
    images: img("teclado-tactile-pro"),
    stock: 10,
    specs: [
      { label: "Tipo", value: "Mecânico com switches táteis" },
      { label: "Layout", value: "ABNT2 (104 teclas)" },
      { label: "Conexão", value: "USB-C com fio" },
      { label: "Iluminação", value: "Branca por tecla" },
      { label: "Peso", value: "980 g" },
    ],
  },
  {
    id: "nexus-compact-color",
    slug: "teclado-compact-color",
    name: "Teclado Compact Color",
    price: 389,
    category: "teclados",
    description:
      "Teclado mecânico compacto com keycaps coloridos de demonstração e conexão sem fio dupla.",
    images: img("teclado-compact-color"),
    stock: 16,
    specs: [
      { label: "Tipo", value: "Mecânico compacto" },
      { label: "Layout", value: "ABNT compacto (84 teclas)" },
      { label: "Conexão", value: "2,4 GHz e Bluetooth" },
      { label: "Iluminação", value: null },
      { label: "Peso", value: "620 g" },
    ],
  },
  {
    id: "nexus-mouse-semfio",
    slug: "mouse-semfio-essencial",
    name: "Mouse Sem Fio Essencial",
    price: 249,
    category: "mouses",
    description:
      "Mouse sem fio de perfil baixo com sensor óptico de 1.600 DPI. Produto de demonstração para o dia a dia do escritório.",
    images: img("mouse-semfio-essencial"),
    stock: 30,
    specs: [
      { label: "Tipo", value: "Sem fio óptico" },
      { label: "Conexão", value: "Receptor USB 2,4 GHz" },
      { label: "DPI", value: "1.600" },
      { label: "Botões", value: "3" },
      { label: "Peso", value: "90 g" },
    ],
  },
  {
    id: "nexus-mouse-honeycomb",
    slug: "mouse-leve-honeycomb",
    name: "Mouse Leve Honeycomb",
    price: 329,
    category: "mouses",
    description:
      "Mouse com fio de 58 g com estrutura furaada e sensor de 6.000 DPI. Demonstração de produto para uso intensivo.",
    images: img("mouse-leve-honeycomb"),
    stock: 22,
    specs: [
      { label: "Tipo", value: "Com fio ultraleve" },
      { label: "Conexão", value: "USB-C com fio" },
      { label: "DPI", value: "6.000" },
      { label: "Botões", value: "6" },
      { label: "Peso", value: "58 g" },
    ],
  },
  {
    id: "nexus-monitor-prime-27",
    slug: "monitor-prime-27",
    name: "Monitor Prime 27",
    price: 1899,
    category: "monitores",
    description:
      "Monitor IPS de 27 polegadas com resolução QHD e taxa de 75 Hz. Ficha técnica fictícia para o setup demonstrativo.",
    images: img("monitor-prime-27"),
    stock: 8,
    badge: "Novo",
    specs: [
      { label: "Painel", value: "IPS" },
      { label: "Resolução", value: "2560 × 1440" },
      { label: "Taxa de atualização", value: "75 Hz" },
      { label: "Tempo de resposta", value: "5 ms" },
      { label: "Entradas", value: "HDMI e DisplayPort" },
      { label: "Altura ajustável", value: "Sim" },
    ],
  },
  {
    id: "nexus-monitor-frameless-24",
    slug: "monitor-frameless-24",
    name: "Monitor Frameless 24",
    price: 1299,
    category: "monitores",
    description:
      "Monitor Full HD de bordas finas com painel VA. Demonstração de especificação com atributos parcialmente não informados.",
    images: img("monitor-frameless-24"),
    stock: 14,
    specs: [
      { label: "Painel", value: "VA" },
      { label: "Resolução", value: "1920 × 1080" },
      { label: "Taxa de atualização", value: "60 Hz" },
      { label: "Tempo de resposta", value: "8 ms" },
      { label: "Entradas", value: "HDMI ×2" },
      { label: "Altura ajustável", value: null },
    ],
  },
  {
    id: "nexus-carregador-65w",
    slug: "carregador-turbo-65w",
    name: "Carregador Turbo 65W",
    price: 179,
    category: "acessorios",
    description:
      "Carregador compacto com duas saídas USB-C e cabo incluso. Acessório fictício para completar o setup de demonstração.",
    images: img("carregador-turbo-65w"),
    stock: 40,
    specs: [
      { label: "Potência", value: "65 W" },
      { label: "Saídas", value: "USB-C ×2" },
      { label: "Compatibilidade", value: "5 V / 9 V / 12 V / 20 V" },
      { label: "Peso", value: "110 g" },
      { label: "Cabo incluso", value: "Sim (1 m)" },
    ],
  },
  {
    id: "nexus-smartwatch-fit",
    slug: "smartwatch-pulse-fit",
    name: "Smartwatch Pulse Fit",
    price: 649,
    category: "acessorios",
    description:
      "Relógio inteligente com tela AMOLED e sensores de atividade (demonstração). Acessório de prova de conceito para a loja.",
    images: img("smartwatch-pulse-fit"),
    stock: 11,
    specs: [
      { label: "Tela", value: "AMOLED 1,43\"" },
      { label: "Autonomia", value: "Até 10 dias" },
      { label: "Sensores", value: "Frequência cardíaca, passos e sono" },
      { label: "Resistência", value: "5 ATM" },
      { label: "Conexão", value: "Bluetooth 5.2" },
      { label: "Tamanho de pulseira", value: null },
    ],
  },
];

export const NEXUS_EDITORIAL = {
  heroImage: "/imgs/nexus/hero.jpg",
  sections: {
    mobile: "/imgs/nexus/secao-mobile.jpg",
    teclado: "/imgs/nexus/secao-teclado.jpg",
  },
};
