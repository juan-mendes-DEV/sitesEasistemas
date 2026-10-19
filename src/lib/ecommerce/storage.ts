/**
 * Persistência local (localStorage) dos carrinhos e seleções.
 *
 * - Nunca confia no conteúdo salvo: tudo é validado contra o catálogo
 *   da loja correspondente antes de ser usado.
 * - Isolamento: cada loja usa sua própria chave; um payload de outra
 *   loja é ignorado.
 * - Ambientes sem localStorage (SSR) são tolerados.
 */

import type { Cart, CartItem, Product, StoreKey } from "@/types/ecommerce";
import { freshCart, validateCart } from "./cart";

const PREFIX = "cm-ecommerce";

export function cartStorageKey(store: StoreKey): string {
  return `${PREFIX}:cart:${store}`;
}

export function selectionStorageKey(
  kind: "favoritos" | "comparador",
  store: StoreKey,
): string {
  return `${PREFIX}:${kind}:${store}`;
}

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readRaw(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Modo privado/quota cheia: a sessão continua em memória.
  }
}

function removeRaw(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignora indisponibilidade do armazenamento.
  }
}

function parseCartPayload(raw: string, store: StoreKey): Cart | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const candidato = parsed as Partial<Cart>;
    // Isolamento entre lojas: payload de outra marca é descartado.
    if (candidato.store !== store) return null;
    if (!Array.isArray(candidato.items)) return null;

    const items: CartItem[] = [];
    for (const bruto of candidato.items) {
      if (!bruto || typeof bruto !== "object") continue;
      const item = bruto as Partial<CartItem>;
      if (typeof item.productId !== "string") continue;
      if (item.variantId !== null && typeof item.variantId !== "string") continue;
      if (typeof item.quantity !== "number" || !Number.isFinite(item.quantity)) continue;
      if (item.quantity <= 0) continue;
      items.push({
        productId: item.productId,
        variantId: item.variantId ?? null,
        quantity: Math.floor(item.quantity),
      });
    }

    return {
      store,
      items,
      updatedAt:
        typeof candidato.updatedAt === "number" ? candidato.updatedAt : Date.now(),
    };
  } catch {
    return null;
  }
}

/**
 * Restaura o carrinho da loja, validando-o contra o catálogo.
 * Retorna carrinho vazio quando não há dado válido salvo.
 */
export function loadCart(store: StoreKey, products: Product[]): Cart {
  const raw = readRaw(cartStorageKey(store));
  if (!raw) return freshCart(store);
  const payload = parseCartPayload(raw, store);
  if (!payload) return freshCart(store);
  return validateCart(payload, products);
}

export function saveCart(cart: Cart): void {
  writeRaw(cartStorageKey(cart.store), JSON.stringify(cart));
}

export function clearStoredCart(store: StoreKey): void {
  removeRaw(cartStorageKey(store));
}

/** Restaura uma lista de ids (favoritos/comparador) válida para a loja. */
export function loadSelection(
  kind: "favoritos" | "comparador",
  store: StoreKey,
  products: Product[],
  limit = Number.POSITIVE_INFINITY,
): string[] {
  const raw = readRaw(selectionStorageKey(kind, store));
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const validos = new Set(products.map((produto) => produto.id));
    const ids: string[] = [];
    for (const bruto of parsed) {
      if (typeof bruto !== "string" || !validos.has(bruto)) continue;
      if (ids.includes(bruto)) continue;
      ids.push(bruto);
      if (ids.length >= limit) break;
    }
    return ids;
  } catch {
    return [];
  }
}

export function saveSelection(
  kind: "favoritos" | "comparador",
  store: StoreKey,
  ids: string[],
): void {
  writeRaw(selectionStorageKey(kind, store), JSON.stringify(ids));
}
