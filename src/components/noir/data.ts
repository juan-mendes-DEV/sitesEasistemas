/**
 * Dados da loja demonstrativa NOIR Studio — moda contemporânea e
 * streetwear premium. Todo conteúdo (nomes, preços, estoques) é fictício.
 */

import type { Product, ProductCategory, ProductVariant, Store } from "@/types/ecommerce";

export const NOIR_STORE: Store = {
  key: "moda",
  name: "NOIR Studio",
  slogan: "Vista sua identidade.",
  route: "/exemplos/ecommerce/moda",
  cartStorageKey: "cm-ecommerce:cart:moda",
};

export const NOIR_CATEGORIES: ProductCategory[] = [
  { id: "camisetas", label: "Camisetas" },
  { id: "jaquetas", label: "Jaquetas" },
  { id: "calcas", label: "Calças" },
  { id: "vestidos", label: "Vestidos" },
  { id: "acessorios", label: "Acessórios" },
];

export function slugifyOpcao(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Gera as variações tamanho × cor com estoque demonstrativo
 * determinístico (inclui linhas esgotadas para exercitar a UI).
 */
function buildVariants(
  slug: string,
  sizes: string[],
  colors: string[],
): ProductVariant[] {
  const variants: ProductVariant[] = [];
  sizes.forEach((size, si) => {
    colors.forEach((color, ci) => {
      variants.push({
        id: `${slug}--${slugifyOpcao(size)}--${slugifyOpcao(color)}`,
        label: `${size} · ${color}`,
        size,
        color,
        stock: (si * 3 + ci * 5 + slug.length) % 9,
      });
    });
  });
  return variants;
}

interface NoirBase {
  slug: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  badge?: string;
}

function buildProduct(
  base: NoirBase & { stock?: number },
  opcoes?: { sizes: string[]; colors: string[] },
): Product {
  const variants = opcoes ? buildVariants(base.slug, opcoes.sizes, opcoes.colors) : null;
  const stock = variants
    ? variants.reduce((soma, variacao) => soma + variacao.stock, 0)
    : (base.stock ?? 0);

  const product: Product = { id: `noir-${base.slug}`, ...base, stock };
  if (opcoes && variants) {
    product.sizes = opcoes.sizes;
    product.colors = opcoes.colors;
    product.variants = variants;
  }
  return product;
}

const img = (slug: string) => [
  `/imgs/noir/${slug}.jpg`,
  `/imgs/noir/${slug}-detalhe.jpg`,
];

export const NOIR_PRODUCTS: Product[] = [
  buildProduct(
    {
      slug: "camiseta-algodao-offwhite",
      name: "Camiseta Algodão Essencial",
      price: 179,
      category: "camisetas",
      description:
        "Camiseta de algodão com caimento reto e gola estruturada. Peça-base da coleção de demonstração, criada para composições minimalistas do dia a dia.",
      images: img("camiseta-algodao-offwhite"),
      badge: "Essencial",
    },
    { sizes: ["P", "M", "G", "GG"], colors: ["Off-white", "Preto"] },
  ),
  buildProduct(
    {
      slug: "camiseta-essential-preta",
      name: "Camiseta Essential Preta",
      price: 169,
      category: "camisetas",
      description:
        "Preto absoluto em algodão encorpado, com ombro levemente caído. Uma versão de demonstração do clássico que estrutura qualquer guarda-roupa.",
      images: img("camiseta-essential-preta"),
    },
    { sizes: ["P", "M", "G", "GG"], colors: ["Preto", "Off-white"] },
  ),
  buildProduct(
    {
      slug: "camiseta-graphic-original",
      name: "Camiseta Gráfica Original",
      price: 219,
      category: "camisetas",
      description:
        "Estampa autoral em técnica de alta definição sobre tecido areia. Edição ilustrativa da direção gráfica da marca fictícia.",
      images: img("camiseta-graphic-original"),
      badge: "Novo",
    },
    { sizes: ["P", "M", "G"], colors: ["Areia"] },
  ),
  buildProduct(
    {
      slug: "jaqueta-couro-urbana",
      name: "Jaqueta Couro Urbana",
      price: 699,
      category: "jaquetas",
      description:
        "Jaqueta de couro com zíper estruturado e forro interno. Fotografia de estúdio demonstrativa da linha de outono.",
      images: img("jaqueta-couro-urbana"),
    },
    { sizes: ["P", "M", "G"], colors: ["Preto"] },
  ),
  buildProduct(
    {
      slug: "jaqueta-bomber-terracota",
      name: "Jaqueta Bomber Terracota",
      price: 549,
      category: "jaquetas",
      description:
        "Bomber leve em tom terracota, com punhos ribana e bolso embutido. Peça de demonstração para composições casuais.",
      images: img("jaqueta-bomber-terracota"),
      badge: "Destaque",
    },
    { sizes: ["P", "M", "G", "GG"], colors: ["Terracota"] },
  ),
  buildProduct(
    {
      slug: "calca-jeans-reta",
      name: "Calça Jeans Reta",
      price: 379,
      category: "calcas",
      description:
        "Jeans de corte reto com lavagem média e cós clássico. Modelagem de demonstração disponível em duas cores fictícias.",
      images: img("calca-jeans-reta"),
    },
    { sizes: ["38", "40", "42", "44", "46"], colors: ["Azul Médio", "Preto"] },
  ),
  buildProduct(
    {
      slug: "calca-jeans-destroy",
      name: "Calça Jeans Destroy",
      price: 399,
      category: "calcas",
      description:
        "Jeans de lavagem escura com recortes manufaturados. Registro visual de demonstração do estilo despojado da loja.",
      images: img("calca-jeans-destroy"),
    },
    { sizes: ["38", "40", "42", "44"], colors: ["Azul Escuro"] },
  ),
  buildProduct(
    {
      slug: "calca-jogger-rose",
      name: "Calça Jogger Rosé",
      price: 329,
      category: "calcas",
      description:
        "Jogger de sarja leve na cor rosé, com cordão e barra ajustável. Conforto apresentado em fotografia de estúdio fictícia.",
      images: img("calca-jogger-rose"),
    },
    { sizes: ["P", "M", "G"], colors: ["Rosé"] },
  ),
  buildProduct(
    {
      slug: "vestido-fluxo-vermelho",
      name: "Vestido Fluxo Vermelho",
      price: 559,
      category: "vestidos",
      description:
        "Vestido longo de tecido fluido em vermelho intenso. Peça de demonstração para ocasiões especiais da coleção fictícia.",
      images: img("vestido-fluxo-vermelho"),
    },
    { sizes: ["PP", "P", "M", "G"], colors: ["Vermelho"] },
  ),
  buildProduct(
    {
      slug: "vestido-midi-floral",
      name: "Vestido Midi Floral",
      price: 489,
      category: "vestidos",
      description:
        "Vestido midi com estampa floral e cintura marcada. Registro editorial de demonstração da linha praia-verão.",
      images: img("vestido-midi-floral"),
      badge: "Novo",
    },
    { sizes: ["P", "M", "G"], colors: ["Floral"] },
  ),
  buildProduct(
    {
      slug: "vestido-cetim-ametista",
      name: "Vestido Cetim Ametista",
      price: 629,
      category: "vestidos",
      description:
        "Vestido justo de cetim no tom ametista, com decote estruturado. Fotografia de estúdio demonstrativa da linha social.",
      images: img("vestido-cetim-ametista"),
    },
    { sizes: ["PP", "P", "M", "G"], colors: ["Ametista"] },
  ),
  buildProduct({
    slug: "mochila-urbana",
    name: "Mochila Urbana",
    price: 349,
    category: "acessorios",
    description:
      "Mochila de lona com compartimento para notebook e alças acolchoadas. Acessório de demonstração da linha urbana.",
    images: img("mochila-urbana"),
    stock: 14,
  }),
  buildProduct({
    slug: "bolsa-estruturada",
    name: "Bolsa Estruturada",
    price: 449,
    category: "acessorios",
    description:
      "Bolsa de mão estruturada com alça superior e fechamento metálico. Peça ilustrativa da coleção de acessórios.",
    images: img("bolsa-estruturada"),
    stock: 8,
    badge: "Edição limitada",
  }),
  buildProduct({
    slug: "relogio-classico",
    name: "Relógio Clássico",
    price: 399,
    category: "acessorios",
    description:
      "Relógio de mostrador limpo com pulseira em couro escuro. Item de demonstração que fecha os looks da loja fictícia.",
    images: img("relogio-classico"),
    stock: 6,
  }),
];

export const NOIR_EDITORIAL = {
  heroImage: "/imgs/noir/hero.jpg",
  sections: {
    arara: "/imgs/noir/secao-arara.jpg",
    editorial: "/imgs/noir/secao-editorial.jpg",
    camisas: "/imgs/noir/secao-camisas.jpg",
  },
};
