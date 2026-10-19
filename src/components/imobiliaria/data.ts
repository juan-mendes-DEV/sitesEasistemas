export type ImovelTipo = "casa" | "apartamento" | "cobertura";

export interface Imovel {
  slug: string;
  titulo: string;
  tipo: ImovelTipo;
  preco: number;
  area: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  descricao: string;
  imagem: string;
  imagemAlt: string;
  galeria: { src: string; alt: string }[];
  identificador: string;
}

export const TIPO_LABEL: Record<ImovelTipo, string> = {
  casa: "Casa",
  apartamento: "Apartamento",
  cobertura: "Cobertura",
};

export function formatPreco(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export const IMOBILIARIA = {
  name: "Altavista Imóveis",
  tagline: "O próximo capítulo da sua vida começa aqui.",
  phone: null,
  whatsappLink: null,
  email: "contato@altavistaimoveis.com.br",
  instagram: "@altavistaimoveis",
  address: "São Paulo, SP",
  neighborhood: "Região demonstrativa",
  hours: [
    { day: "Segunda", time: "9h às 18h" },
    { day: "Terça", time: "9h às 18h" },
    { day: "Quarta", time: "9h às 18h" },
    { day: "Quinta", time: "9h às 18h" },
    { day: "Sexta", time: "9h às 17h" },
    { day: "Sábado", time: "9h às 13h" },
    { day: "Domingo", time: "Fechado" },
  ],
  about: {
    intro:
      "A Altavista Imóveis é uma demonstração de site institucional criada pela Code Maestro Tech. A história abaixo é fictícia e serve apenas para ilustrar o formato do projeto.",
    history: [
      "A Altavista Imóveis nasceu com uma proposta editorial: apresentar cada imóvel como ele realmente é — com espaço, luz e informações organizadas para uma decisão tranquila.",
      "A imobiliária — fictícia nesta demonstração — trabalha com curadoria de portfólio, atendimento consultivo e transparência de condições em todas as negociações.",
      "Não há CRECI, corretores ou endereços reais identificados nesta página. Todos os imóveis, preços e localizações são fictícios e existem apenas para demonstração.",
    ],
    values: [
      {
        title: "Curadoria",
        description:
          "Portfólio enxuto e revisado — cada imóvel entra pelo padrão de qualidade da marca.",
      },
      {
        title: "Transparência",
        description:
          "Preços, características e condições apresentados com clareza, sem letras miúdas.",
      },
      {
        title: "Atendimento consultivo",
        description:
          "Escuta primeiro: o imóvel certo depende do momento de vida de quem compra.",
      },
      {
        title: "Discrição",
        description:
          "Negociações conduzidas com privacidade para compradores e vendedores.",
      },
    ],
    differentials: [
      "Fichas técnicas completas com área, quartos, banheiros e identificador",
      "Galeria de ambientes em cada imóvel do portfólio",
      "Filtros por tipo e faixa de preço direto na página",
      "Atendimento por canal externo configurável",
    ],
  },
  imoveis: [
    {
      slug: "casa-jardim-das-flores",
      titulo: "Casa Jardim das Flores",
      tipo: "casa",
      preco: 850000,
      area: 220,
      quartos: 4,
      banheiros: 3,
      vagas: 3,
      descricao:
        "Casa ampla com jardim, área gourmet e quatro dormitórios em condomínio tranquilo — demonstração fictícia.",
      imagem: "/imgs/imobiliaria/im-01.jpg",
      imagemAlt:
        "Casa de dois pavimentos com piscina e jardim — imagem ilustrativa de demonstração",
      galeria: [
        {
          src: "/imgs/imobiliaria/im-amb-05.jpg",
          alt: "Sala de estar clara e mobilhada — imagem ilustrativa de demonstração",
        },
        {
          src: "/imgs/imobiliaria/im-amb-01.jpg",
          alt: "Cozinha integrada em preto e branco — imagem ilustrativa de demonstração",
        },
      ],
      identificador: "AV-001",
    },
    {
      slug: "apartamento-vista-parque",
      titulo: "Apartamento Vista Parque",
      tipo: "apartamento",
      preco: 620000,
      area: 110,
      quartos: 3,
      banheiros: 2,
      vagas: 2,
      descricao:
        "Apartamento com varanda gourmet, living integrado e vista aberta para o parque — demonstração fictícia.",
      imagem: "/imgs/imobiliaria/im-02.jpg",
      imagemAlt:
        "Sala de estar com vista ampla pela janela — imagem ilustrativa de demonstração",
      galeria: [
        {
          src: "/imgs/imobiliaria/im-amb-04.jpg",
          alt: "Sala de jantar iluminada — imagem ilustrativa de demonstração",
        },
        {
          src: "/imgs/imobiliaria/im-amb-06.jpg",
          alt: "Cozinha integrada com bancada — imagem ilustrativa de demonstração",
        },
      ],
      identificador: "AV-002",
    },
    {
      slug: "cobertura-marina",
      titulo: "Cobertura Marina",
      tipo: "cobertura",
      preco: 2400000,
      area: 320,
      quartos: 5,
      banheiros: 5,
      vagas: 4,
      descricao:
        "Cobertura duplex com terraço privativo, acabamento premium e ambientes de recepção — demonstração fictícia.",
      imagem: "/imgs/imobiliaria/im-03.jpg",
      imagemAlt:
        "Living amplo com painel de madeira e sofá claro — imagem ilustrativa de demonstração",
      galeria: [
        {
          src: "/imgs/imobiliaria/im-amb-02.jpg",
          alt: "Ambiente minimalista com poltrona — imagem ilustrativa de demonstração",
        },
        {
          src: "/imgs/imobiliaria/im-amb-03.jpg",
          alt: "Sala de estar com sofá azul e piso de tábuas — imagem ilustrativa de demonstração",
        },
      ],
      identificador: "AV-003",
    },
    {
      slug: "casa-condominio-bosque",
      titulo: "Casa Condomínio Bosque",
      tipo: "casa",
      preco: 1150000,
      area: 280,
      quartos: 4,
      banheiros: 4,
      vagas: 4,
      descricao:
        "Casa contemporânea em condomínio fechado, com dois pavimentos e área de lazer completa — demonstração fictícia.",
      imagem: "/imgs/imobiliaria/im-04.jpg",
      imagemAlt:
        "Casa contemporânea sob grande árvore ao entardecer — imagem ilustrativa de demonstração",
      galeria: [
        {
          src: "/imgs/imobiliaria/im-amb-01.jpg",
          alt: "Cozinha integrada em preto e branco — imagem ilustrativa de demonstração",
        },
        {
          src: "/imgs/imobiliaria/im-amb-05.jpg",
          alt: "Sala de estar clara e mobilhada — imagem ilustrativa de demonstração",
        },
      ],
      identificador: "AV-004",
    },
    {
      slug: "apartamento-centro",
      titulo: "Apartamento Centro",
      tipo: "apartamento",
      preco: 480000,
      area: 85,
      quartos: 2,
      banheiros: 2,
      vagas: 1,
      descricao:
        "Apartamento compacto e iluminado, ideal para morar ou investir no centro — demonstração fictícia.",
      imagem: "/imgs/imobiliaria/im-05.jpg",
      imagemAlt:
        "Sala aconchegante com plantas e luz natural — imagem ilustrativa de demonstração",
      galeria: [
        {
          src: "/imgs/imobiliaria/im-amb-06.jpg",
          alt: "Cozinha integrada com bancada — imagem ilustrativa de demonstração",
        },
        {
          src: "/imgs/imobiliaria/im-amb-04.jpg",
          alt: "Sala de jantar iluminada — imagem ilustrativa de demonstração",
        },
      ],
      identificador: "AV-005",
    },
    {
      slug: "cobertura-panoramica",
      titulo: "Cobertura Panorâmica",
      tipo: "cobertura",
      preco: 3200000,
      area: 400,
      quartos: 6,
      banheiros: 6,
      vagas: 5,
      descricao:
        "Cobertura de dois pavimentos com escada interna, suítes amplas e ambientes de recepção — demonstração fictícia.",
      imagem: "/imgs/imobiliaria/im-06.jpg",
      imagemAlt:
        "Sala em dois níveis com escada interna e sofás claros — imagem ilustrativa de demonstração",
      galeria: [
        {
          src: "/imgs/imobiliaria/im-amb-02.jpg",
          alt: "Ambiente minimalista com poltrona — imagem ilustrativa de demonstração",
        },
        {
          src: "/imgs/imobiliaria/im-amb-03.jpg",
          alt: "Sala de estar com sofá azul e piso de tábuas — imagem ilustrativa de demonstração",
        },
      ],
      identificador: "AV-006",
    },
  ] as Imovel[],
  images: {
    hero: "/imgs/imobiliaria/im-hero.jpg",
    heroAlt:
      "Residência contemporânea com piscina — imagem ilustrativa de demonstração",
    sobre: "/imgs/imobiliaria/im-sobre.jpg",
    sobreAlt:
      "Casa moderna de fachada limpa em dia claro — imagem ilustrativa de demonstração",
  },
  demoNotice:
    "Demonstração fictícia criada pela Code Maestro Tech. Imóveis, preços, endereços e identificadores são ilustrativos — não correspondem a ofertas reais nem a um imobiliária existente.",
};
