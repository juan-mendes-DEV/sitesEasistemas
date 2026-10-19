import { describe, it, expect } from "vitest";
import {
  MAX_COMPARE,
  buildCompareRows,
  isCompared,
  resolveCompareProducts,
  toggleCompare,
} from "./compare";
import { NEXUS_PRODUCTS } from "@/components/nexus/data";

const [p1, p2, p3, p4] = NEXUS_PRODUCTS;

describe("compare — limite de três produtos", () => {
  it("adiciona enquanto há espaço", () => {
    let selecionados: string[] = [];
    for (const produto of [p1, p2, p3]) {
      const resultado = toggleCompare(selecionados, produto.id);
      expect(resultado.changed).toBe(true);
      selecionados = resultado.ids;
    }
    expect(selecionados).toHaveLength(MAX_COMPARE);
  });

  it("rejeita o quarto produto sem alterar a seleção", () => {
    const selecionados = [p1.id, p2.id, p3.id];
    const resultado = toggleCompare(selecionados, p4.id);
    expect(resultado.changed).toBe(false);
    expect(resultado.reason).toBe("limite-atingido");
    expect(resultado.ids).toEqual(selecionados);
  });

  it("remover um produto libera espaço para o próximo", () => {
    const selecionados = [p1.id, p2.id, p3.id];
    const semP2 = toggleCompare(selecionados, p2.id);
    expect(semP2.changed).toBe(true);
    expect(semP2.ids).not.toContain(p2.id);

    const comP4 = toggleCompare(semP2.ids, p4.id);
    expect(comP4.changed).toBe(true);
    expect(comP4.ids).toHaveLength(MAX_COMPARE);
    expect(comP4.ids).toContain(p4.id);
  });

  it("isCompared reflete a seleção atual", () => {
    expect(isCompared([p1.id], p1.id)).toBe(true);
    expect(isCompared([p1.id], p2.id)).toBe(false);
  });
});

describe("compare — linhas da tabela", () => {
  it("agrupa os rótulos de todos os produtos selecionados", () => {
    const linhas = buildCompareRows([p1, p2]);
    const labelsP1 = p1.specs!.map((s) => s.label);
    const labelsP2 = p2.specs!.map((s) => s.label);
    for (const label of [...labelsP1, ...labelsP2]) {
      expect(linhas.some((linha) => linha.label === label)).toBe(true);
    }
  });

  it("atributo ausente ou nulo vira null (exibido como “Não disponível”)", () => {
    const comNulo = NEXUS_PRODUCTS.find((produto) =>
      produto.specs!.some((spec) => spec.value === null),
    )!;
    const rotuloNulo = comNulo.specs!.find((spec) => spec.value === null)!;
    const outro = NEXUS_PRODUCTS.find(
      (produto) =>
        produto.id !== comNulo.id &&
        !produto.specs!.some((spec) => spec.label === rotuloNulo.label),
    )!;

    const linhas = buildCompareRows([comNulo, outro]);
    const linha = linhas.find((l) => l.label === rotuloNulo.label)!;
    expect(linha).toBeDefined();
    expect(linha.values[0]).toBeNull();
    expect(linha.values[1]).toBeNull();

    // Rótulo existente em um produto e ausente no outro também vira null.
    const rotuloSoNoOutro = outro.specs!.find(
      (spec) =>
        !comNulo.specs!.some((meu) => meu.label === spec.label),
    );
    if (rotuloSoNoOutro) {
      const linhaPropria = linhas.find(
        (l) => l.label === rotuloSoNoOutro.label,
      )!;
      expect(linhaPropria.values[1]).toBe(rotuloSoNoOutro.value ?? null);
      expect(linhaPropria.values[0]).toBeNull();
    }
  });

  it("valor preenchido é preservado na coluna certa", () => {
    const comValor = p1.specs!.find((spec) => typeof spec.value === "string")!;
    const linhas = buildCompareRows([p1]);
    const linha = linhas.find((l) => l.label === comValor.label)!;
    expect(linha.values[0]).toBe(comValor.value);
  });
});

describe("compare — resolução de produtos", () => {
  it("descarta ids desconhecidos e preserva a ordem", () => {
    const resolvidos = resolveCompareProducts(
      ["id-fantasma", p2.id, p1.id],
      NEXUS_PRODUCTS,
    );
    expect(resolvidos.map((p) => p.id)).toEqual([p2.id, p1.id]);
  });

  it("nunca ultrapassa o limite de três", () => {
    const ids = NEXUS_PRODUCTS.slice(0, 6).map((p) => p.id);
    expect(resolveCompareProducts(ids, NEXUS_PRODUCTS)).toHaveLength(MAX_COMPARE);
  });
});
