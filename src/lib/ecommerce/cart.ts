/**
 * Motor de carrinho — funções puras, sem acesso a DOM ou rede.
 *
 * Regras:
 * - Itens são identificados por produto + variação (variantes nunca se misturam).
 * - Preço e nome são sempre derivados do catálogo vigente.
 * - Estoque demonstrativo é respeitado ao adicionar e ao restaurar.
 * - Cada loja possui um Cart isolado pela chave `store`.
 */

import type {
  Cart,
  CartItem,
  CartTotals,
  Product,
  ProductVariant,
  ResolvedCartItem,
  StoreKey,
} from "@/types/ecommerce";

export interface AddItemInput {
  productId: string;
  variantId?: string | null;
  quantity?: number;
}

export type AddItemReason =
  | "produto-invalido"
  | "variacao-obrigatoria"
  | "variacao-invalida"
  | "estoque-esgotado";

export type AddItemResult =
  | { ok: true; cart: Cart }
  | { ok: false; reason: AddItemReason };

export const ADD_ITEM_MESSAGES: Record<AddItemReason, string> = {
  "produto-invalido": "Produto não encontrado nesta loja.",
  "variacao-obrigatoria": "Selecione as opções do produto antes de adicionar ao carrinho.",
  "variacao-invalida": "A opção escolhida não existe neste produto.",
  "estoque-esgotado": "Esgotado no estoque demonstrativo.",
};

/** Cria um carrinho vazio para a loja informada. */
export function freshCart(store: StoreKey): Cart {
  return { store, items: [], updatedAt: Date.now() };
}

/** Chave única de uma linha do carrinho (distingue variantes). */
export function lineKey(productId: string, variantId: string | null): string {
  return `${productId}::${variantId ?? "sem-variacao"}`;
}

/** Localiza a variação do produto; null quando o produto não tem variações. */
export function findVariant(
  product: Product,
  variantId: string | null,
): ProductVariant | null {
  if (!variantId || !product.variants?.length) return null;
  return product.variants.find((variacao) => variacao.id === variantId) ?? null;
}

function normalizeQuantity(quantity: number, maxStock: number): number {
  if (!Number.isFinite(quantity)) return 0;
  const inteira = Math.floor(quantity);
  if (inteira <= 0 || maxStock <= 0) return 0;
  return Math.min(inteira, maxStock);
}

/**
 * Resolve um item contra o catálogo.
 * Retorna null quando produto/variação/estoque não são válidos.
 */
export function resolveItem(
  product: Product,
  item: CartItem,
): ResolvedCartItem | null {
  const temVariacoes = Boolean(product.variants?.length);
  if (temVariacoes !== Boolean(item.variantId)) return null;

  const variant = findVariant(product, item.variantId);
  if (temVariacoes && !variant) return null;

  const maxStock = variant ? variant.stock : product.stock;
  const quantity = normalizeQuantity(item.quantity, maxStock);
  if (quantity <= 0) return null;

  const unitPrice = product.price;
  return {
    key: lineKey(item.productId, item.variantId),
    item: { productId: item.productId, variantId: item.variantId, quantity },
    product,
    variant,
    unitPrice,
    quantity,
    lineTotal: unitPrice * quantity,
    variantLabel: variant ? variant.label : null,
    maxStock,
  };
}

/**
 * Resolve um carrinho inteiro: descarta itens de produtos inexistentes,
 * mescla duplicatas, valida variações e limita ao estoque.
 */
export function resolveCart(cart: Cart, products: Product[]): ResolvedCartItem[] {
  const porId = new Map(products.map((produto) => [produto.id, produto]));
  const acumulados = new Map<string, CartItem>();

  for (const bruto of cart.items) {
    if (!bruto || typeof bruto !== "object") continue;
    if (typeof bruto.productId !== "string") continue;
    if (bruto.variantId !== null && typeof bruto.variantId !== "string") continue;
    if (typeof bruto.quantity !== "number" || !Number.isFinite(bruto.quantity)) continue;
    if (bruto.quantity <= 0) continue;
    if (!porId.has(bruto.productId)) continue;

    const variantId = bruto.variantId ?? null;
    const chave = lineKey(bruto.productId, variantId);
    const anterior = acumulados.get(chave);
    acumulados.set(chave, {
      productId: bruto.productId,
      variantId,
      quantity: (anterior?.quantity ?? 0) + Math.floor(bruto.quantity),
    });
  }

  const resolvidos: ResolvedCartItem[] = [];
  for (const item of acumulados.values()) {
    const product = porId.get(item.productId);
    if (!product) continue;
    const resolvido = resolveItem(product, item);
    if (resolvido) resolvidos.push(resolvido);
  }
  return resolvidos;
}

/** Valida um carrinho restaurado (ex.: vindo do localStorage). */
export function validateCart(cart: Cart, products: Product[]): Cart {
  const resolvidos = resolveCart(cart, products);
  return {
    store: cart.store,
    items: resolvidos.map((linha) => linha.item),
    updatedAt: cart.updatedAt,
  };
}

/**
 * Adiciona um item respeitando variação e estoque.
 * Retorna motivo quando a operação não pode ser concluída.
 */
export function addItem(
  cart: Cart,
  products: Product[],
  input: AddItemInput,
): AddItemResult {
  const product = products.find((item) => item.id === input.productId);
  if (!product) return { ok: false, reason: "produto-invalido" };

  const temVariacoes = Boolean(product.variants?.length);
  const variantId = input.variantId ?? null;

  if (temVariacoes && !variantId) return { ok: false, reason: "variacao-obrigatoria" };
  if (!temVariacoes && variantId) return { ok: false, reason: "variacao-invalida" };

  const variant = findVariant(product, variantId);
  if (temVariacoes && !variant) return { ok: false, reason: "variacao-invalida" };

  const maxStock = variant ? variant.stock : product.stock;
  const quantidade = normalizeQuantity(input.quantity ?? 1, maxStock);
  if (quantidade <= 0) return { ok: false, reason: "estoque-esgotado" };

  const chave = lineKey(product.id, variantId);
  const existente = cart.items.find(
    (item) => lineKey(item.productId, item.variantId) === chave,
  );
  const final = normalizeQuantity((existente?.quantity ?? 0) + quantidade, maxStock);
  if (final <= 0) return { ok: false, reason: "estoque-esgotado" };

  const items = existente
    ? cart.items.map((item) =>
        lineKey(item.productId, item.variantId) === chave
          ? { ...item, quantity: final }
          : item,
      )
    : [...cart.items, { productId: product.id, variantId, quantity: final }];

  return { ok: true, cart: { ...cart, items, updatedAt: Date.now() } };
}

/** Remove uma linha identificada por lineKey(). */
export function removeItem(cart: Cart, key: string): Cart {
  const items = cart.items.filter(
    (item) => lineKey(item.productId, item.variantId) !== key,
  );
  return { ...cart, items, updatedAt: Date.now() };
}

/**
 * Atualiza a quantidade de uma linha.
 * Quantidade menor ou igual a zero remove a linha; o máximo é o estoque.
 */
export function setItemQuantity(
  cart: Cart,
  products: Product[],
  key: string,
  quantity: number,
): Cart {
  if (quantity <= 0) return removeItem(cart, key);

  let encontrou = false;
  const items = cart.items
    .map((item) => {
      if (lineKey(item.productId, item.variantId) !== key) return item;
      encontrou = true;
      const product = products.find((p) => p.id === item.productId);
      if (!product) return item;
      const variant = findVariant(product, item.variantId);
      const maxStock = variant ? variant.stock : product.stock;
      return { ...item, quantity: normalizeQuantity(quantity, maxStock) };
    })
    .filter((item) => item.quantity > 0);

  if (!encontrou) return cart;
  return { ...cart, items, updatedAt: Date.now() };
}

/** Subtotal e total demonstrativo (sem frete, cupom ou juros). */
export function cartTotals(resolvidos: ResolvedCartItem[]): CartTotals {
  const subtotal = resolvidos.reduce((soma, linha) => soma + linha.lineTotal, 0);
  const itemCount = resolvidos.reduce((soma, linha) => soma + linha.quantity, 0);
  return { itemCount, subtotal, total: subtotal };
}
