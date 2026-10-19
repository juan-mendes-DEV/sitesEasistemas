"use client";

/**
 * Provedor de estado de cada loja: carrinho, favoritos e comparador.
 *
 * - Um provedor por loja (montado no layout) garante isolamento total:
 *   nenhuma ação da NOIR afeta a NEXUS ou a Botânica.
 * - Estado inicial vazio idêntico no servidor e no cliente evita erros
 *   de hidratação; a restauração do localStorage ocorre só no efeito.
 * - Dados restaurados são sempre validados contra o catálogo da loja.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  Cart,
  CartTotals,
  Product,
  ResolvedCartItem,
  StoreKey,
} from "@/types/ecommerce";
import type { AddItemInput, AddItemResult } from "@/lib/ecommerce/cart";
import {
  ADD_ITEM_MESSAGES,
  addItem,
  cartTotals,
  freshCart,
  removeItem,
  resolveCart,
  setItemQuantity,
} from "@/lib/ecommerce/cart";
import {
  loadCart,
  loadSelection,
  saveCart,
  saveSelection,
} from "@/lib/ecommerce/storage";
import { MAX_COMPARE, toggleCompare } from "@/lib/ecommerce/compare";

export interface CartNotice {
  id: number;
  tone: "success" | "error";
  text: string;
}

interface CartApi {
  /** Carrinho bruto (validado) da loja. */
  cart: Cart;
  /** true após a restauração local inicial. */
  loaded: boolean;
  /** Linhas resolvidas contra o catálogo. */
  resolved: ResolvedCartItem[];
  totals: CartTotals;
  /** Soma das unidades (badge do cabeçalho). */
  count: number;
  notice: CartNotice | null;
  clearNotice: () => void;
  add: (input: AddItemInput) => AddItemResult;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: (options?: { silent?: boolean }) => void;
}

interface SelectionApi {
  ids: string[];
  has: (productId: string) => boolean;
  toggle: (productId: string) => void;
}

interface CompareApi {
  ids: string[];
  has: (productId: string) => boolean;
  /** false quando o limite de produtos foi atingido. */
  toggle: (productId: string) => boolean;
}

export interface StoreApi {
  store: StoreKey;
  products: Product[];
  cart: CartApi;
  favorites: SelectionApi;
  compare: CompareApi;
}

const StoreContext = createContext<StoreApi | null>(null);

export function StoreProvider({
  store,
  products,
  children,
}: {
  store: StoreKey;
  products: Product[];
  children: ReactNode;
}) {
  // Estado inicial idêntico no servidor e no cliente (sem leitura de
  // tempo: `Date.now()` durante o prerender é proibido com cacheComponents).
  // O valor real chega na restauração do localStorage, abaixo.
  const [cart, setCart] = useState<Cart>(() => ({ store, items: [], updatedAt: 0 }));
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [notice, setNotice] = useState<CartNotice | null>(null);
  const noticeIdRef = useRef(0);

  // Restauração local única, somente após a hidratação (estado inicial
  // idêntico no servidor evita divergência de hidratação — por isso a
  // leitura do localStorage acontece aqui e não no useState).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore pós-hidratação é requisito de hidratação isomórfica
    setCart(loadCart(store, products));
    setFavoriteIds(loadSelection("favoritos", store, products));
    setCompareIds(loadSelection("comparador", store, products, MAX_COMPARE));
    setLoaded(true);
  }, [store, products]);

  // Persistência iniciada apenas depois da restauração (não sobrescreve).
  useEffect(() => {
    if (!loaded) return;
    saveCart(cart);
  }, [cart, loaded]);

  useEffect(() => {
    if (!loaded) return;
    saveSelection("favoritos", store, favoriteIds);
  }, [favoriteIds, loaded, store]);

  useEffect(() => {
    if (!loaded) return;
    saveSelection("comparador", store, compareIds);
  }, [compareIds, loaded, store]);

  const pushNotice = useCallback((tone: CartNotice["tone"], text: string) => {
    noticeIdRef.current += 1;
    setNotice({ id: noticeIdRef.current, tone, text });
  }, []);

  const clearNotice = useCallback(() => setNotice(null), []);

  const add = useCallback(
    (input: AddItemInput): AddItemResult => {
      const result = addItem(cart, products, input);
      if (result.ok) {
        setCart(result.cart);
        const product = products.find((item) => item.id === input.productId);
        pushNotice(
          "success",
          `${product?.name ?? "Produto"} foi adicionado ao carrinho.`,
        );
      } else {
        pushNotice("error", ADD_ITEM_MESSAGES[result.reason]);
      }
      return result;
    },
    [cart, products, pushNotice],
  );

  const remove = useCallback(
    (key: string) => {
      setCart((prev) => removeItem(prev, key));
      pushNotice("success", "Item removido do carrinho.");
    },
    [pushNotice],
  );

  const setQuantity = useCallback(
    (key: string, quantity: number) => {
      setCart((prev) => setItemQuantity(prev, products, key, quantity));
      pushNotice(
        "success",
        quantity <= 0 ? "Item removido do carrinho." : "Quantidade atualizada.",
      );
    },
    [products, pushNotice],
  );

  const clear = useCallback(
    (options?: { silent?: boolean }) => {
      setCart(freshCart(store));
      if (!options?.silent) pushNotice("success", "Carrinho esvaziado.");
    },
    [store, pushNotice],
  );

  const toggleFavorite = useCallback((productId: string) => {
    setFavoriteIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  const toggleCompareItem = useCallback(
    (productId: string) => {
      const result = toggleCompare(compareIds, productId);
      if (result.changed) setCompareIds(result.ids);
      return result.changed;
    },
    [compareIds],
  );

  const resolved = useMemo(() => resolveCart(cart, products), [cart, products]);
  const totals = useMemo(() => cartTotals(resolved), [resolved]);

  const value = useMemo<StoreApi>(
    () => ({
      store,
      products,
      cart: {
        cart,
        loaded,
        resolved,
        totals,
        count: totals.itemCount,
        notice,
        clearNotice,
        add,
        remove,
        setQuantity,
        clear,
      },
      favorites: {
        ids: favoriteIds,
        has: (productId) => favoriteIds.includes(productId),
        toggle: toggleFavorite,
      },
      compare: {
        ids: compareIds,
        has: (productId) => compareIds.includes(productId),
        toggle: toggleCompareItem,
      },
    }),
    [
      store,
      products,
      cart,
      loaded,
      resolved,
      totals,
      notice,
      clearNotice,
      add,
      remove,
      setQuantity,
      clear,
      favoriteIds,
      toggleFavorite,
      compareIds,
      toggleCompareItem,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreApi {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore deve ser usado dentro de <StoreProvider> da loja.");
  }
  return context;
}

export function useCart(): CartApi {
  return useStore().cart;
}

export function useFavorites(): SelectionApi {
  return useStore().favorites;
}

export function useCompare(): CompareApi {
  return useStore().compare;
}
