"use client";

/**
 * Fluxo do checkout demonstrativo: valida o carrinho, gera um pedido
 * fictício em memória e esvazia o carrinho. Nunca coleta dados pessoais
 * nem aciona pagamentos.
 */

import { useCallback, useState } from "react";
import type { DemoOrder } from "@/types/ecommerce";
import {
  CHECKOUT_DISCLAIMER,
  DEMO_ORDER_NOTICE,
  createDemoOrder,
} from "@/lib/ecommerce/checkout";
import { useCart, useStore } from "./storeProvider";

export function useDemoCheckout() {
  const { products } = useStore();
  const cart = useCart();
  const [order, setOrder] = useState<DemoOrder | null>(null);
  const [error, setError] = useState<string | null>(null);

  const finalize = useCallback(() => {
    const criado = createDemoOrder(cart.cart, products);
    if (!criado) {
      setError(
        "Seu carrinho está vazio. Adicione produtos para gerar um pedido demonstrativo.",
      );
      return;
    }
    setError(null);
    setOrder(criado);
    cart.clear({ silent: true });
  }, [cart, products]);

  return {
    order,
    error,
    finalize,
    disclaimer: CHECKOUT_DISCLAIMER,
    successNotice: DEMO_ORDER_NOTICE,
  };
}
