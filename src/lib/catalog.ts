import type { Category, Project, CategoryKey, ProjectStatus } from "@/types/catalog";

const SIMPLES_PRICE = 700;
const INSTITUCIONAIS_PRICE = 1200;
const ECOMMERCE_PRICE = 3000;
const SISTEMAS_PRICE = 3500;

const DISPONIVEL_STATUS: ProjectStatus = "disponivel";

export const CATEGORIES: Category[] = [
  {
    key: "simples",
    label: "Sites Simples",
    price: SIMPLES_PRICE,
    description:
      "Landing page responsiva com apresentação, serviços, informações comerciais e contato externo.",
    scope: [
      "Landing page responsiva",
      "Apresentação do negócio",
      "Serviços",
      "Informações comerciais",
      "Contato externo (WhatsApp, e-mail, telefone)",
    ],
    route: "/exemplos/simples",
  },
  {
    key: "institucionais",
    label: "Sites Institucionais",
    price: INSTITUCIONAIS_PRICE,
    description:
      "Site institucional multipágina, com apresentação da empresa, serviços, conteúdo demonstrativo e contato.",
    scope: [
      "Site multipágina institucional",
      "Apresentação da empresa",
      "Serviços e especialidades",
      "Conteúdo demonstrativo",
      "Contato",
    ],
    route: "/exemplos/institucionais",
  },
  {
    key: "ecommerce",
    label: "E-commerce",
    price: ECOMMERCE_PRICE,
    description:
      "Catálogo, páginas de produtos, carrinho e fluxo de compra definido em contrato. Pagamentos reais, integrações e painel administrativo dependerão do escopo contratado.",
    scope: [
      "Catálogo de produtos",
      "Páginas de produtos",
      "Carrinho de compras",
      "Fluxo de compra (definido em contrato)",
    ],
    route: "/exemplos/ecommerce",
  },
  {
    key: "sistemas",
    label: "Sistemas Básicos",
    price: SISTEMAS_PRICE,
    description:
      "Sistema de gestão com funcionalidades específicas a definir em contrato. Banco de dados, permissões, relatórios e implantação serão especificados por projeto.",
    scope: [
      "Sistema de gestão",
      "Funcionalidades específicas (a definir em contrato)",
      "Banco de dados (escopo a definir)",
      "Relatórios (escopo a definir)",
    ],
    route: "/exemplos/sistemas",
  },
];

export const PROJECTS: Project[] = [
  // Sites simples — R$ 700
  {
    id: "proj-01",
    slug: "barbearia",
    title: "Barbearia",
    description:
      "Landing page moderna para barbearia, com apresentação, serviços de corte e barba, horários e contato direto.",
    category: "simples",
    price: SIMPLES_PRICE,
    features: [
      "Apresentação da barbearia",
      "Serviços de corte e barba",
      "Horário de funcionamento",
      "Contato direto (WhatsApp/telefone)",
      "Design responsivo",
    ],
    status: DISPONIVEL_STATUS,
    route: "/exemplos/simples/barbearia",
  },
  {
    id: "proj-02",
    slug: "padaria",
    title: "Padaria",
    description:
      "Landing page aconchegante para padaria, exibindo pães, doces, horário de funcionamento e formas de contato.",
    category: "simples",
    price: SIMPLES_PRICE,
    features: [
      "Apresentação da padaria",
      "Produtos em destaque",
      "Horário de funcionamento",
      "Contato e localização",
      "Design responsivo",
    ],
    status: DISPONIVEL_STATUS,
    route: "/exemplos/simples/padaria",
  },
  {
    id: "proj-03",
    slug: "salao-beleza",
    title: "Salão de Beleza",
    description:
      "Landing page elegante para salão de beleza, com serviços de estética, cortes, agendamento por contato externo e galeria.",
    category: "simples",
    price: SIMPLES_PRICE,
    features: [
      "Apresentação do salão",
      "Serviços de beleza e estética",
      "Galeria de trabalhos",
      "Contato externo para agendamento",
      "Design responsivo",
    ],
    status: DISPONIVEL_STATUS,
    route: "/exemplos/simples/salao-beleza",
  },
  // Sites institucionais — R$ 1.200
  {
    id: "proj-04",
    slug: "engenharia",
    title: "Engenharia",
    description:
      "Site institucional multipágina para empresa de engenharia, com apresentação, serviços, projetos e contato.",
    category: "institucionais",
    price: INSTITUCIONAIS_PRICE,
    features: [
      "Apresentação da empresa",
      "Serviços de engenharia",
      "Projetos e casos",
      "Conteúdo institucional",
      "Contato",
    ],
    status: DISPONIVEL_STATUS,
    route: "/exemplos/institucionais/engenharia",
  },
  {
    id: "proj-05",
    slug: "odontologia",
    title: "Clínica Odontológica",
    description:
      "Site institucional para clínica odontológica, com especialidades, estrutura em galeria e contato configurável.",
    category: "institucionais",
    price: INSTITUCIONAIS_PRICE,
    features: [
      "Apresentação da clínica",
      "Especialidades odontológicas",
      "Galeria da estrutura",
      "Agendamento externo configurável",
      "Contato",
    ],
    status: DISPONIVEL_STATUS,
    route: "/exemplos/institucionais/odontologia",
  },
  {
    id: "proj-06",
    slug: "imobiliaria",
    title: "Imobiliária",
    description:
      "Site institucional para imobiliária, com catálogo de imóveis fictícios, filtros locais, detalhes por slug e contato.",
    category: "institucionais",
    price: INSTITUCIONAIS_PRICE,
    features: [
      "Apresentação da imobiliária",
      "Catálogo com filtros locais",
      "Detalhes de imóvel por slug",
      "Conteúdo institucional",
      "Contato",
    ],
    status: DISPONIVEL_STATUS,
    route: "/exemplos/institucionais/imobiliaria",
  },
  // E-commerce — R$ 3.000
  {
    id: "proj-07",
    slug: "moda",
    title: "Loja de Roupas",
    description:
      "E-commerce de moda com catálogo e busca, variantes de tamanho e cor, favoritos locais, carrinho isolado e checkout demonstrativo.",
    category: "ecommerce",
    price: ECOMMERCE_PRICE,
    features: [
      "Catálogo com busca, filtros e ordenação",
      "Páginas de produto com variantes",
      "Favoritos locais (sem cadastro)",
      "Carrinho isolado por loja",
      "Checkout demonstrativo sem pagamento",
    ],
    status: DISPONIVEL_STATUS,
    route: "/exemplos/ecommerce/moda",
  },
  {
    id: "proj-08",
    slug: "eletronicos",
    title: "Loja de Eletrônicos",
    description:
      "E-commerce de eletrônicos com fichas técnicas fictícias, comparador local de até três produtos, carrinho isolado e checkout demonstrativo.",
    category: "ecommerce",
    price: ECOMMERCE_PRICE,
    features: [
      "Catálogo com busca, filtros e ordenação",
      "Fichas técnicas por produto",
      "Comparador de até 3 produtos",
      "Carrinho isolado por loja",
      "Checkout demonstrativo sem pagamento",
    ],
    status: DISPONIVEL_STATUS,
    route: "/exemplos/ecommerce/eletronicos",
  },
  {
    id: "proj-09",
    slug: "cosmeticos",
    title: "Loja de Cosméticos",
    description:
      "E-commerce de cosméticos com ingredientes demonstrativos, kits de autocuidado, carrinho isolado e checkout fictício, sem alegações médicas.",
    category: "ecommerce",
    price: ECOMMERCE_PRICE,
    features: [
      "Catálogo com busca, filtros e ordenação",
      "Fichas com ingredientes ilustrativos",
      "Kits com conteúdo declarado",
      "Carrinho isolado por loja",
      "Checkout demonstrativo sem pagamento",
    ],
    status: DISPONIVEL_STATUS,
    route: "/exemplos/ecommerce/cosmeticos",
  },
  // Sistemas básicos — R$ 3.500
  {
    id: "proj-10",
    slug: "estoque",
    title: "Controle de Estoque",
    description:
      "Sistema de controle de estoque com cadastro de peças, busca, filtros e indicadores automáticos. Demonstração com dados fictícios e armazenamento local no navegador.",
    category: "sistemas",
    price: SISTEMAS_PRICE,
    features: [
      "Cadastro de peças com quantidade e preço",
      "Busca e filtros por situação",
      "Alerta de estoque baixo (menos de 5 unidades)",
      "Valor total da coleção",
    ],
    status: DISPONIVEL_STATUS,
    route: "/exemplos/sistemas/estoque",
  },
  {
    id: "proj-11",
    slug: "agendamentos",
    title: "Sistema de Agendamentos",
    description:
      "Sistema de agendamentos para uma cadeira, com cadastro de serviços e clientes, busca, filtros e indicadores. Demonstração com dados fictícios e armazenamento local no navegador.",
    category: "sistemas",
    price: SISTEMAS_PRICE,
    features: [
      "Cadastro de serviços, clientes e horários",
      "Duração e valor por atendimento",
      "Bloqueio de sobreposição de horários",
      "Status do atendimento (confirmado a finalizado)",
    ],
    status: DISPONIVEL_STATUS,
    route: "/exemplos/sistemas/agendamentos",
  },
  {
    id: "proj-12",
    slug: "pedidos",
    title: "Sistema de Pedidos",
    description:
      "Sistema de gestão de pedidos de balcão, com cadastro, busca, filtros e indicadores automáticos. Demonstração com dados fictícios e armazenamento local no navegador.",
    category: "sistemas",
    price: SISTEMAS_PRICE,
    features: [
      "Cadastro de pedidos por cliente ou mesa",
      "Quantidade e preço unitário",
      "Status do pedido (recebido a pronto)",
      "Busca, filtros e indicadores automáticos",
    ],
    status: DISPONIVEL_STATUS,
    route: "/exemplos/sistemas/pedidos",
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);

export const getProjectsByCategory = (key: CategoryKey): Project[] =>
  PROJECTS.filter((p) => p.category === key);

export const getCategoryByKey = (key: CategoryKey): Category | undefined =>
  CATEGORIES.find((c) => c.key === key);

export const formatPrice = (value: number): string =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
