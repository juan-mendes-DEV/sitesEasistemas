import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { StoreProvider } from "@/components/ecommerce/storeProvider";
import { addItem, freshCart } from "@/lib/ecommerce/cart";
import {
  cartStorageKey,
  loadSelection,
  selectionStorageKey,
} from "@/lib/ecommerce/storage";
import {
  CHECKOUT_DISCLAIMER,
  DEMO_ORDER_NOTICE,
} from "@/lib/ecommerce/checkout";
import { MAX_COMPARE } from "@/lib/ecommerce/compare";
import { formatBRL } from "@/lib/ecommerce/format";

import { NOIR_PRODUCTS, NOIR_STORE } from "@/components/noir/data";
import { NEXUS_PRODUCTS, NEXUS_STORE } from "@/components/nexus/data";
import { BOTANICA_PRODUCTS, BOTANICA_STORE } from "@/components/botanica/data";

import { NoirProductDetail } from "@/components/noir/noirProductDetail";
import { NoirCartView } from "@/components/noir/noirCartView";
import { NoirHeader } from "@/components/noir/noirHeader";
import { NoirFooter } from "@/components/noir/noirFooter";
import { NexusCartView } from "@/components/nexus/nexusCartView";
import { NexusHeader } from "@/components/nexus/nexusHeader";
import { NexusFooter } from "@/components/nexus/nexusFooter";
import { NexusProductCard } from "@/components/nexus/nexusProductCard";
import { NexusCompare } from "@/components/nexus/nexusCompare";
import { BotanicaCartView } from "@/components/botanica/botanicaCartView";
import { BotanicaCheckoutView } from "@/components/botanica/botanicaCheckoutView";
import { BotanicaHeader } from "@/components/botanica/botanicaHeader";
import { BotanicaFooter } from "@/components/botanica/botanicaFooter";

const raiz = process.cwd();

const produtoNoir = NOIR_PRODUCTS.find((p) =>
  p.variants?.some((v) => v.stock >= 2),
)!;
const variacaoNoir = produtoNoir.variants!.find((v) => v.stock >= 2)!;

/**
 * O matcher do Testing Library normaliza o texto do nó (NBSP vira espaço
 * comum), mas não normaliza a string esperada — por isso formatamos e
 * substituímos o NBSP do Intl antes de buscar na tela.
 */
function brl(valor: number): string {
  return formatBRL(valor).replace(/\u00a0/g, " ");
}

function escapeRegex(texto: string): string {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function salvarCart(chave: string, cart: unknown): void {
  window.localStorage.setItem(chave, JSON.stringify(cart));
}

function lerCart(chave: string): {
  store?: string;
  items: Array<Record<string, unknown>>;
} {
  return JSON.parse(window.localStorage.getItem(chave) ?? "{}");
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("NOIR Studio — fluxo completo de compra", () => {
  it("selecionar tamanho e cor libera, adiciona, persiste, atualiza quantidade e remove", () => {
    const { unmount } = render(
      <StoreProvider store={NOIR_STORE.key} products={NOIR_PRODUCTS}>
        <NoirProductDetail product={produtoNoir} />
      </StoreProvider>,
    );

    // Sem seleção não há compra possível.
    const botaoInicial = screen.getByRole("button", {
      name: /Selecione as opções/,
    });
    expect(botaoInicial).toBeDisabled();
    expect(
      screen.getByText("Selecione tamanho e cor para habilitar a compra."),
    ).toBeTruthy();

    // Seleção de variante obrigatória.
    fireEvent.click(screen.getByRole("radio", { name: variacaoNoir.size }));
    fireEvent.click(screen.getByRole("radio", { name: variacaoNoir.color }));

    const botaoAdd = screen.getByRole("button", {
      name: /Adicionar ao carrinho/,
    });
    expect(botaoAdd).toBeEnabled();
    fireEvent.click(botaoAdd);

    expect(
      screen.getByText(`${produtoNoir.name} foi adicionado ao carrinho.`),
    ).toBeTruthy();
    unmount();

    // Persistência local no disco (navegador) desta loja.
    const salvo = lerCart(cartStorageKey(NOIR_STORE.key));
    expect(salvo.store).toBe(NOIR_STORE.key);
    expect(salvo.items).toEqual([
      { productId: produtoNoir.id, variantId: variacaoNoir.id, quantity: 1 },
    ]);

    // Nova montagem restaura o carrinho salvo.
    render(
      <StoreProvider store={NOIR_STORE.key} products={NOIR_PRODUCTS}>
        <NoirCartView />
      </StoreProvider>,
    );

    expect(screen.getByText(produtoNoir.name)).toBeTruthy();
    expect(
      screen.getByText(new RegExp(escapeRegex(variacaoNoir.label))),
    ).toBeTruthy();

    const resumo = screen.getByRole("complementary", {
      name: "Resumo do carrinho",
    });
    expect(within(resumo).getByText("1")).toBeTruthy();
    expect(
      within(resumo).getAllByText(brl(produtoNoir.price)),
    ).toHaveLength(2); // subtotal e total com uma unidade

    // Atualização de quantidade recalcula os totais.
    fireEvent.click(
      screen.getByRole("button", {
        name: `Aumentar quantidade de ${produtoNoir.name}`,
      }),
    );
    expect(
      within(resumo).getAllByText(brl(produtoNoir.price * 2)),
    ).toHaveLength(2);
    expect(within(resumo).getByText("2")).toBeTruthy();
    expect(lerCart(cartStorageKey(NOIR_STORE.key)).items[0].quantity).toBe(2);

    // Remover leva ao estado vazio e limpa o armazenamento.
    fireEvent.click(
      screen.getByRole("button", {
        name: `Remover ${produtoNoir.name} do carrinho`,
      }),
    );
    expect(screen.getByText("Seu carrinho está vazio.")).toBeTruthy();
    expect(lerCart(cartStorageKey(NOIR_STORE.key)).items).toEqual([]);
  });

  it("carrinhos das três lojas ficam isolados entre si", () => {
    const adicionado = addItem(freshCart(NOIR_STORE.key), NOIR_PRODUCTS, {
      productId: produtoNoir.id,
      variantId: variacaoNoir.id,
    });
    if (!adicionado.ok) throw new Error("adição de teste deveria funcionar");
    salvarCart(cartStorageKey(NOIR_STORE.key), adicionado.cart);

    const noir = render(
      <StoreProvider store={NOIR_STORE.key} products={NOIR_PRODUCTS}>
        <NoirCartView />
      </StoreProvider>,
    );
    expect(screen.getByText(produtoNoir.name)).toBeTruthy();
    noir.unmount();

    const nexus = render(
      <StoreProvider store={NEXUS_STORE.key} products={NEXUS_PRODUCTS}>
        <NexusCartView />
      </StoreProvider>,
    );
    expect(screen.getByText("Seu carrinho está vazio.")).toBeTruthy();
    nexus.unmount();

    render(
      <StoreProvider store={BOTANICA_STORE.key} products={BOTANICA_PRODUCTS}>
        <BotanicaCartView />
      </StoreProvider>,
    );
    expect(screen.getByText("Seu carrinho está vazio.")).toBeTruthy();

    // A chave da NOIR permanece intacta; as demais não ganharam itens.
    expect(lerCart(cartStorageKey(NOIR_STORE.key)).items).toHaveLength(1);
    expect(lerCart(cartStorageKey(NEXUS_STORE.key)).items).toEqual([]);
    expect(lerCart(cartStorageKey(BOTANICA_STORE.key)).items).toEqual([]);
    expect(
      loadSelection("favoritos", NEXUS_STORE.key, NEXUS_PRODUCTS),
    ).toEqual([]);
    expect(
      cartStorageKey(NOIR_STORE.key),
    ).not.toBe(cartStorageKey(NEXUS_STORE.key));
  });
});

describe("NEXUS Tech Store — comparador", () => {
  it("aceita no máximo três produtos e avisa sobre o quarto", () => {
    const quatro = NEXUS_PRODUCTS.slice(0, 4);
    render(
      <StoreProvider store={NEXUS_STORE.key} products={NEXUS_PRODUCTS}>
        <div>
          {quatro.map((product) => (
            <NexusProductCard key={product.id} product={product} />
          ))}
        </div>
      </StoreProvider>,
    );

    for (const product of quatro.slice(0, 3)) {
      fireEvent.click(
        screen.getByRole("button", {
          name: `Adicionar ${product.name} ao comparador`,
        }),
      );
      expect(
        screen.getByRole("button", {
          name: `Remover ${product.name} do comparador`,
        }),
      ).toBeTruthy();
    }

    // O quarto produto não entra e recebe aviso honesto.
    fireEvent.click(
      screen.getByRole("button", {
        name: `Adicionar ${quatro[3].name} ao comparador`,
      }),
    );
    expect(
      screen.getByRole("button", {
        name: `Adicionar ${quatro[3].name} ao comparador`,
      }),
    ).toBeTruthy();
    const cartoes = document.querySelectorAll("article");
    expect(
      within(cartoes[3] as HTMLElement).getByRole("status").textContent,
    ).toContain("Comparador cheio");

    const salvos = JSON.parse(
      window.localStorage.getItem(
        selectionStorageKey("comparador", NEXUS_STORE.key),
      ) ?? "[]",
    );
    expect(salvos).toHaveLength(MAX_COMPARE);
    // A seleção não vaza para as outras lojas.
    expect(
      window.localStorage.getItem(
        selectionStorageKey("comparador", NOIR_STORE.key),
      ),
    ).toBeNull();
  });

  it("tabela marca atributos ausentes como “Não disponível”", () => {
    const comNulo = NEXUS_PRODUCTS.find((produto) =>
      produto.specs!.some((spec) => spec.value === null),
    )!;
    const rotulo = comNulo.specs!.find((spec) => spec.value === null)!;
    const outro = NEXUS_PRODUCTS.find((produto) => produto.id !== comNulo.id)!;

    window.localStorage.setItem(
      selectionStorageKey("comparador", NEXUS_STORE.key),
      JSON.stringify([comNulo.id, outro.id]),
    );

    render(
      <StoreProvider store={NEXUS_STORE.key} products={NEXUS_PRODUCTS}>
        <NexusCompare />
      </StoreProvider>,
    );

    expect(screen.getByText(/2 de 3 produtos selecionados/)).toBeTruthy();
    expect(screen.getByRole("rowheader", { name: rotulo.label })).toBeTruthy();
    expect(screen.getAllByText("Não disponível").length).toBeGreaterThan(0);
    expect(
      screen.getByText(/indicam atributo não informado no produto/),
    ).toBeTruthy();
  });

  it("sem seleção mostra o estado vazio do comparador", () => {
    render(
      <StoreProvider store={NEXUS_STORE.key} products={NEXUS_PRODUCTS}>
        <NexusCompare />
      </StoreProvider>,
    );
    expect(screen.getByText("Nenhum produto no comparador.")).toBeTruthy();
  });
});

describe("Botânica Essence — checkout fictício", () => {
  it("gera pedido com a mensagem exata, sem nenhum campo de dado pessoal", () => {
    const produto = BOTANICA_PRODUCTS.find((p) => p.stock > 0)!;
    const adicionado = addItem(freshCart(BOTANICA_STORE.key), BOTANICA_PRODUCTS, {
      productId: produto.id,
      quantity: 1,
    });
    if (!adicionado.ok) throw new Error("adição de teste deveria funcionar");
    salvarCart(cartStorageKey(BOTANICA_STORE.key), adicionado.cart);

    const { container } = render(
      <StoreProvider store={BOTANICA_STORE.key} products={BOTANICA_PRODUCTS}>
        <BotanicaCheckoutView />
      </StoreProvider>,
    );

    expect(screen.getByText(CHECKOUT_DISCLAIMER)).toBeTruthy();
    expect(
      screen.getByText(new RegExp(escapeRegex(produto.name))),
    ).toBeTruthy();
    // Nenhum input/select/textarea: nada de cartão, CPF ou endereço.
    expect(
      container.querySelectorAll("input, select, textarea"),
    ).toHaveLength(0);

    fireEvent.click(
      screen.getByRole("button", { name: "Gerar pedido demonstrativo" }),
    );

    expect(screen.getByText(DEMO_ORDER_NOTICE)).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Pedido demonstrativo criado." }),
    ).toBeTruthy();
    // O pedido foi gerado e o carrinho foi esvaziado.
    expect(lerCart(cartStorageKey(BOTANICA_STORE.key)).items).toEqual([]);
  });
});

describe("Navegação das lojas — links apontam para páginas existentes", () => {
  function rotaExiste(href: string): boolean {
    if (href === "/" || href.startsWith("#")) return true;
    if (/^(mailto:|tel:|https?:)/.test(href)) return true;
    const [rota] = href.split("#");
    return fs.existsSync(path.join(raiz, "src/app", rota, "page.tsx"));
  }

  function hrefsDe(container: HTMLElement): string[] {
    return Array.from(container.querySelectorAll("a[href]")).map(
      (ancora) => ancora.getAttribute("href") ?? "",
    );
  }

  it("NOIR Studio", () => {
    const { container } = render(
      <StoreProvider store={NOIR_STORE.key} products={NOIR_PRODUCTS}>
        <NoirHeader />
        <NoirFooter />
      </StoreProvider>,
    );
    const hrefs = hrefsDe(container);
    expect(hrefs.length).toBeGreaterThan(4);
    for (const href of hrefs) {
      expect(rotaExiste(href), `link inválido: ${href}`).toBe(true);
    }
    expect(hrefs.some((href) => href.endsWith("/carrinho"))).toBe(true);
    expect(hrefs.some((href) => href.endsWith("/favoritos"))).toBe(true);
  });

  it("NEXUS Tech Store", () => {
    const { container } = render(
      <StoreProvider store={NEXUS_STORE.key} products={NEXUS_PRODUCTS}>
        <NexusHeader />
        <NexusFooter />
      </StoreProvider>,
    );
    const hrefs = hrefsDe(container);
    expect(hrefs.length).toBeGreaterThan(4);
    for (const href of hrefs) {
      expect(rotaExiste(href), `link inválido: ${href}`).toBe(true);
    }
    expect(hrefs.some((href) => href.endsWith("/comparador"))).toBe(true);
    expect(hrefs.some((href) => href.endsWith("/carrinho"))).toBe(true);
  });

  it("Botânica Essence", () => {
    const { container } = render(
      <StoreProvider store={BOTANICA_STORE.key} products={BOTANICA_PRODUCTS}>
        <BotanicaHeader />
        <BotanicaFooter />
      </StoreProvider>,
    );
    const hrefs = hrefsDe(container);
    expect(hrefs.length).toBeGreaterThan(4);
    for (const href of hrefs) {
      expect(rotaExiste(href), `link inválido: ${href}`).toBe(true);
    }
    expect(hrefs.some((href) => href.endsWith("/carrinho"))).toBe(true);
  });
});
