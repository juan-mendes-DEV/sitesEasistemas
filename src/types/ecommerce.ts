/**
 * Tipos compartilhados do motor de e-commerce demonstrativo.
 *
 * Camada comercial reutilizada pelas três lojas da Etapa 04:
 * NOIR Studio (moda), NEXUS Tech Store (eletrônicos) e
 * Botânica Essence (cosméticos).
 *
 * Todo dado deste arquivo é fictício: preços, estoques e pedidos são
 * demonstrativos e nenhum pagamento real é processado.
 */

/** Chave de rota/isolamento de cada loja demonstrativa. */
export type StoreKey = "moda" | "eletronicos" | "cosmeticos";

/** Identidade de uma loja (dados estáticos, sem backend). */
export interface Store {
  key: StoreKey;
  name: string;
  slogan: string;
  /** Rota base da loja, ex.: /exemplos/ecommerce/moda */
  route: string;
  /** Chave isolada usada no localStorage para o carrinho. */
  cartStorageKey: string;
}

/** Categoria de produto dentro de uma loja. */
export interface ProductCategory {
  id: string;
  label: string;
}

/**
 * Variação de um produto (tamanho/cor na NOIR).
 * Cada variação possui estoque demonstrativo próprio.
 */
export interface ProductVariant {
  id: string;
  label: string;
  /** Ex.: "P", "M", "Preto" — quando aplicável. */
  size?: string;
  color?: string;
  stock: number;
}

/**
 * Linha de especificação técnica da NEXUS.
 * `value: null` indica atributo não informado e é exibido como
 * "Não disponível" no comparador.
 */
export interface SpecLine {
  label: string;
  value: string | null;
}

/** Base de produto comum às três lojas. */
export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Preço fictício em reais (sem formatação). */
  price: number;
  /** id de ProductCategory da loja. */
  category: string;
  description: string;
  /** Caminhos locais em /public, otimizados pelo Next. */
  images: string[];
  /** Estoque demonstrativo total (produtos sem variação). */
  stock: number;
  /** Etiqueta curta opcional, ex.: "Novo". */
  badge?: string;
  /** NOIR: tamanhos e cores disponíveis. */
  sizes?: string[];
  colors?: string[];
  /** NOIR: variações (tamanho + cor) com estoque individual. */
  variants?: ProductVariant[];
  /** NEXUS: especificações técnicas estruturadas. */
  specs?: SpecLine[];
  /** Botânica: volume/quantidade do produto. */
  volume?: string;
  /** Botânica: ingredientes demonstrativos. */
  ingredients?: string[];
  /** Botânica: conteúdo de kits. */
  kitContents?: string[];
}

/** Item do carrinho. Preço/nome são sempre derivados do catálogo. */
export interface CartItem {
  productId: string;
  /** null quando o produto não possui variações. */
  variantId: string | null;
  quantity: number;
}

/** Carrinho isolado por loja. */
export interface Cart {
  store: StoreKey;
  items: CartItem[];
  updatedAt: number;
}

/** Linha resolvida de um item (catálogo + carrinho). */
export interface ResolvedCartItem {
  key: string;
  item: CartItem;
  product: Product;
  variant: ProductVariant | null;
  /** Preço unitário já resolvido (variação não altera preço na demo). */
  unitPrice: number;
  quantity: number;
  /** Subtotal da linha. */
  lineTotal: number;
  /** Nome exibido da variação, quando existir. */
  variantLabel: string | null;
  /** Máximo disponível considerando estoque da variação/produto. */
  maxStock: number;
}

/** Resumo numérico do carrinho. */
export interface CartTotals {
  itemCount: number;
  subtotal: number;
  /** Total demonstrativo (igual ao subtotal: sem frete/cupom real). */
  total: number;
}

/** Pedido demonstrativo — nunca gera cobrança ou pagamento. */
export interface DemoOrder {
  id: string;
  store: StoreKey;
  items: Array<{
    productId: string;
    name: string;
    variantLabel: string | null;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }>;
  total: number;
  itemCount: number;
  createdAt: string;
  /** Sempre true: este pedido não representa compra real. */
  demo: true;
}

/** Opções de ordenação disponíveis no catálogo. */
export type SortOption = "relevancia" | "preco-asc" | "preco-desc" | "nome-asc" | "nome-desc";

/** Faixa de preço pré-definida para filtros. */
export interface PriceRange {
  id: string;
  label: string;
  min: number;
  /** Infinity representa "sem limite superior". */
  max: number;
}

/** Critérios de busca/filtro do catálogo. */
export interface CatalogQuery {
  term: string;
  category: string | null;
  priceRange: string | null;
  sort: SortOption;
}
