import { beforeEach, describe, expect, it } from "vitest";

import {
  SISTEMAS,
  SISTEMA_AGENDAMENTOS,
  SISTEMA_ESTOQUE,
  SISTEMA_PEDIDOS,
  carregarLinhas,
  estadoLinha,
  estatisticas,
  formatarDataHora,
  formatarMoeda,
  getSistema,
  linhasIniciais,
  linhasVisiveis,
  proximoStatus,
  salvarLinhas,
  temConflito,
  validarLinha,
  valorCelula,
  type LinhaSistema,
} from "@/components/sistemas/systemData";

/** O Intl usa NBSP depois de "R$"; normalizamos para comparar literais. */
function brl(valor: number | string): string {
  return String(valor).replace(/\u00a0/g, " ");
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("Sistemas — configuração e identidade", () => {
  it("os três sistemas cobrem pedidos, agendamentos e estoque", () => {
    expect(SISTEMAS.map((s) => s.slug).sort()).toEqual([
      "agendamentos",
      "estoque",
      "pedidos",
    ]);
    expect(getSistema("pedidos")).toBe(SISTEMA_PEDIDOS);
    expect(getSistema("agendamentos")).toBe(SISTEMA_AGENDAMENTOS);
    expect(getSistema("estoque")).toBe(SISTEMA_ESTOQUE);
    expect(getSistema("financeiro")).toBeUndefined();
  });

  it("usa as chaves de localStorage exatamente como no README de origem", () => {
    expect(SISTEMA_PEDIDOS.storageKey).toBe("portfolio-cafeteria-v1");
    expect(SISTEMA_AGENDAMENTOS.storageKey).toBe("portfolio-barbearia-v1");
    expect(SISTEMA_ESTOQUE.storageKey).toBe("portfolio-loja-roupas-v1");
    const chaves = SISTEMAS.map((s) => s.storageKey);
    expect(new Set(chaves).size).toBe(3);
  });

  it("preserva as paletas de origem (café e creme, grafite e lima, lavanda e branco)", () => {
    // GRÃO — tons de café e creme
    expect(SISTEMA_PEDIDOS.paleta.bg).toBe("#f5edde");
    expect(SISTEMA_PEDIDOS.paleta.ink).toBe("#42291f");
    expect(SISTEMA_PEDIDOS.paleta.accent).toBe("#8e3e26");
    // CORTE & CIA — grafite e verde lima
    expect(SISTEMA_AGENDAMENTOS.paleta.bg).toBe("#151817");
    expect(SISTEMA_AGENDAMENTOS.paleta.ink).toBe("#eff3e7");
    expect(SISTEMA_AGENDAMENTOS.paleta.accent).toBe("#d6fa65");
    expect(SISTEMA_AGENDAMENTOS.paleta.muted).toBe("#9ba49c");
    // NUVEM — lavanda e branco
    expect(SISTEMA_ESTOQUE.paleta.bg).toBe("#f6f3fd");
    expect(SISTEMA_ESTOQUE.paleta.ink).toBe("#302448");
    expect(SISTEMA_ESTOQUE.paleta.accent).toBe("#6d51c8");
  });

  it("mantém marcas, painéis, tipos e ciclos de status de origem", () => {
    expect(SISTEMA_PEDIDOS.brand).toBe("GRÃO");
    expect(SISTEMA_PEDIDOS.panel).toBe("PAINEL DE PEDIDOS");
    expect(SISTEMA_PEDIDOS.statuses).toEqual([
      "Recebido",
      "Em preparo",
      "Pronto",
    ]);
    expect(SISTEMA_AGENDAMENTOS.brand).toBe("CORTE & CIA");
    expect(SISTEMA_AGENDAMENTOS.panel).toBe("PAINEL DE AGENDAMENTOS");
    expect(SISTEMA_AGENDAMENTOS.dateLabel).toBe("Data e horário");
    expect(SISTEMA_AGENDAMENTOS.statuses).toEqual([
      "Confirmado",
      "Atendendo",
      "Finalizado",
    ]);
    expect(SISTEMA_ESTOQUE.brand).toBe("NUVEM");
    expect(SISTEMA_ESTOQUE.panel).toBe("PAINEL DE ESTOQUE");
    expect(SISTEMA_ESTOQUE.estadoDerivado).toBe(true);
    expect(SISTEMA_ESTOQUE.statuses).toEqual([
      "Disponível",
      "Estoque baixo",
      "Esgotado",
    ]);
    expect(SISTEMA_PEDIDOS.estadoDerivado).toBe(false);
    expect(SISTEMA_AGENDAMENTOS.estadoDerivado).toBe(false);
  });

  it("as abas de filtro são Todos + os status de cada sistema", () => {
    for (const config of SISTEMAS) {
      expect(config.categories).toEqual(["Todos", ...config.statuses]);
    }
  });

  it("cada sistema tem três linhas semente fictícias", () => {
    for (const config of SISTEMAS) {
      expect(config.seed).toHaveLength(3);
      for (const [, nome, quantidade, preco, status] of config.seed) {
        expect(nome.trim()).not.toBe("");
        expect(quantidade).toBeGreaterThanOrEqual(0);
        expect(preco).toBeGreaterThan(0);
        expect(config.statuses).toContain(status);
      }
    }
    expect(SISTEMA_PEDIDOS.seed[0][0]).toBe("Cappuccino da casa");
    expect(SISTEMA_AGENDAMENTOS.seed[0][0]).toBe("Corte clássico");
    expect(SISTEMA_ESTOQUE.seed[0][0]).toBe("Camisa de linho");
  });

  it("não contém dados reais de negócio, documentos ou alegações proibidas", () => {
    const texto = JSON.stringify(SISTEMAS);
    for (const proibido of ["CNPJ", "CRECI", "CREA", "CRM", "certificação"]) {
      expect(texto).not.toContain(proibido);
    }
  });
});

describe("Sistemas — linhas iniciais e validação", () => {
  it("a semente usa ids 1..3 e os horários fixos de origem", () => {
    const linhas = linhasIniciais(SISTEMA_AGENDAMENTOS);
    expect(linhas.map((l) => l.id)).toEqual([1, 2, 3]);
    expect(linhas.map((l) => l.date)).toEqual([
      "2026-10-19T09:00",
      "2026-10-19T10:00",
      "2026-10-19T11:30",
    ]);
    expect(linhas[0]).toMatchObject({
      name: "Corte clássico",
      extra: "Rafael Costa",
      quantity: 40,
      price: 55,
      status: "Confirmado",
    });
  });

  it("validarLinha recusa lixo do localStorage e aceita linha bem formada", () => {
    const valida: LinhaSistema = {
      id: 9,
      name: "Café",
      extra: "Mesa 1",
      quantity: 2,
      price: 10,
      status: "Recebido",
      date: "2026-10-19T14:00",
    };
    expect(validarLinha(valida)).toEqual(valida);
    expect(validarLinha(null)).toBeNull();
    expect(validarLinha("texto")).toBeNull();
    expect(validarLinha({ ...valida, id: "x" })).toBeNull();
    expect(validarLinha({ ...valida, name: "  " })).toBeNull();
    expect(validarLinha({ ...valida, extra: "" })).toBeNull();
    expect(validarLinha({ ...valida, quantity: "2" })).toBeNull();
    expect(validarLinha({ ...valida, price: NaN })).toBeNull();
    expect(validarLinha({ ...valida, status: 7 })).toBeNull();
  });
});

describe("Sistemas — estado derivado e status", () => {
  it("estoque deriva o estado da quantidade (0 esgotado, menos de 5 baixo)", () => {
    const base = linhasIniciais(SISTEMA_ESTOQUE);
    expect(estadoLinha(SISTEMA_ESTOQUE, base[0])).toBe("Disponível"); // 18
    expect(estadoLinha(SISTEMA_ESTOQUE, base[1])).toBe("Estoque baixo"); // 3
    expect(estadoLinha(SISTEMA_ESTOQUE, base[2])).toBe("Esgotado"); // 0
    expect(
      estadoLinha(SISTEMA_ESTOQUE, { ...base[0], quantity: 5 }),
    ).toBe("Disponível");
    expect(
      estadoLinha(SISTEMA_ESTOQUE, { ...base[0], quantity: 4 }),
    ).toBe("Estoque baixo");
    // status gravado não interfere no estoque
    expect(
      estadoLinha(SISTEMA_ESTOQUE, { ...base[2], status: "Disponível" }),
    ).toBe("Esgotado");
  });

  it("nos demais sistemas o estado é o status gravado", () => {
    const base = linhasIniciais(SISTEMA_AGENDAMENTOS);
    expect(estadoLinha(SISTEMA_AGENDAMENTOS, base[0])).toBe("Confirmado");
    const basePedidos = linhasIniciais(SISTEMA_PEDIDOS);
    expect(estadoLinha(SISTEMA_PEDIDOS, basePedidos[2])).toBe("Pronto");
  });

  it("proximoStatus percorre o ciclo e reinicia em status desconhecido", () => {
    const linha = linhasIniciais(SISTEMA_AGENDAMENTOS)[0];
    expect(proximoStatus(SISTEMA_AGENDAMENTOS, linha)).toBe("Atendendo");
    expect(
      proximoStatus(SISTEMA_AGENDAMENTOS, { ...linha, status: "Atendendo" }),
    ).toBe("Finalizado");
    expect(
      proximoStatus(SISTEMA_AGENDAMENTOS, { ...linha, status: "Finalizado" }),
    ).toBe("Confirmado");
    expect(
      proximoStatus(SISTEMA_AGENDAMENTOS, { ...linha, status: "Fora do ciclo" }),
    ).toBe("Confirmado");
    const pedido = linhasIniciais(SISTEMA_PEDIDOS)[1]; // Recebido
    expect(proximoStatus(SISTEMA_PEDIDOS, pedido)).toBe("Em preparo");
    expect(
      proximoStatus(SISTEMA_PEDIDOS, { ...pedido, status: "Pronto" }),
    ).toBe("Recebido");
  });
});

describe("Sistemas — indicadores automáticos", () => {
  it("estoque: peças, valor da coleção e reposição", () => {
    const linhas = linhasIniciais(SISTEMA_ESTOQUE);
    const [pecas, valor, reposicao] = estatisticas(SISTEMA_ESTOQUE, linhas);
    expect(pecas).toMatchObject({ rotulo: "Peças em estoque", valor: 21 });
    expect(valor.rotulo).toBe("Valor da coleção");
    expect(brl(valor.valor)).toBe("R$ 3.537,90");
    expect(reposicao).toMatchObject({
      rotulo: "Precisam de reposição",
      valor: 2,
    });
  });

  it("agendamentos: atendimentos, valor agendado e finalizados", () => {
    const linhas = linhasIniciais(SISTEMA_AGENDAMENTOS);
    const [atendimentos, valor, finalizados] = estatisticas(
      SISTEMA_AGENDAMENTOS,
      linhas,
    );
    expect(atendimentos).toMatchObject({
      rotulo: "Atendimentos",
      valor: 3,
    });
    expect(valor.rotulo).toBe("Valor agendado");
    expect(brl(valor.valor)).toBe("R$ 180,00");
    expect(finalizados).toMatchObject({ rotulo: "Finalizados", valor: 1 });
  });

  it("pedidos: registrados, valor dos pedidos e prontos", () => {
    const linhas = linhasIniciais(SISTEMA_PEDIDOS);
    const [registrados, valor, prontos] = estatisticas(
      SISTEMA_PEDIDOS,
      linhas,
    );
    expect(registrados).toMatchObject({
      rotulo: "Pedidos registrados",
      valor: 3,
    });
    expect(valor.rotulo).toBe("Valor dos pedidos");
    expect(brl(valor.valor)).toBe("R$ 69,00");
    expect(prontos).toMatchObject({ rotulo: "Prontos para servir", valor: 1 });
  });
});

describe("Sistemas — busca, filtros e ordenação", () => {
  it("filtra por aba usando o estado de cada sistema", () => {
    const pedidos = linhasIniciais(SISTEMA_PEDIDOS);
    const prontos = linhasVisiveis(SISTEMA_PEDIDOS, pedidos, "Pronto", "");
    expect(prontos.map((l) => l.name)).toEqual(["Bolo de laranja"]);

    const estoque = linhasIniciais(SISTEMA_ESTOQUE);
    const esgotados = linhasVisiveis(
      SISTEMA_ESTOQUE,
      estoque,
      "Esgotado",
      "",
    );
    expect(esgotados.map((l) => l.name)).toEqual(["Regata essencial"]);
    const baixos = linhasVisiveis(SISTEMA_ESTOQUE, estoque, "Estoque baixo", "");
    expect(baixos.map((l) => l.name)).toEqual(["Calça wide leg"]);
  });

  it("busca por nome e campo extra, sem diferenciar maiúsculas", () => {
    const pedidos = linhasIniciais(SISTEMA_PEDIDOS);
    const mesa = linhasVisiveis(SISTEMA_PEDIDOS, pedidos, "Todos", "mesa 04");
    expect(mesa.map((l) => l.name)).toEqual(["Cappuccino da casa"]);
    const nada = linhasVisiveis(SISTEMA_PEDIDOS, pedidos, "Todos", "xyz");
    expect(nada).toEqual([]);
  });

  it("combina filtro de aba com busca", () => {
    const pedidos = linhasIniciais(SISTEMA_PEDIDOS);
    expect(
      linhasVisiveis(SISTEMA_PEDIDOS, pedidos, "Recebido", "bolo"),
    ).toEqual([]);
    expect(
      linhasVisiveis(SISTEMA_PEDIDOS, pedidos, "Pronto", "bolo").map(
        (l) => l.name,
      ),
    ).toEqual(["Bolo de laranja"]);
  });

  it("agenda em ordem cronológica mesmo com a lista embaralhada", () => {
    const desordenadas = [...linhasIniciais(SISTEMA_AGENDAMENTOS)].reverse();
    const visiveis = linhasVisiveis(
      SISTEMA_AGENDAMENTOS,
      desordenadas,
      "Todos",
      "",
    );
    expect(visiveis.map((l) => l.date)).toEqual([
      "2026-10-19T09:00",
      "2026-10-19T10:00",
      "2026-10-19T11:30",
    ]);
  });
});

describe("Sistemas — sobreposição de horários (agendamentos)", () => {
  const linhas = linhasIniciais(SISTEMA_AGENDAMENTOS);

  function candidato(date: string, quantity: number): LinhaSistema {
    return {
      id: 999,
      name: "Novo corte",
      extra: "Cliente Novo",
      quantity,
      price: 50,
      status: "Confirmado",
      date,
    };
  }

  it("bloqueia horário que colide com atendimento em aberto", () => {
    // 09:30 colide com "Corte clássico" (09:00–09:40, Confirmado)
    expect(
      temConflito(SISTEMA_AGENDAMENTOS, linhas, candidato("2026-10-19T09:30", 30), null),
    ).toBe(true);
    // 10:30 colide com "Corte + barba" (10:00–11:00, Atendendo)
    expect(
      temConflito(SISTEMA_AGENDAMENTOS, linhas, candidato("2026-10-19T10:30", 30), null),
    ).toBe(true);
  });

  it("permite horário livre e ignora atendimentos finalizados", () => {
    expect(
      temConflito(SISTEMA_AGENDAMENTOS, linhas, candidato("2026-10-19T14:00", 60), null),
    ).toBe(false);
    // 11:45 sobrepõe "Barba na toalha quente" (11:30–12:00), mas está Finalizado
    expect(
      temConflito(SISTEMA_AGENDAMENTOS, linhas, candidato("2026-10-19T11:45", 30), null),
    ).toBe(false);
  });

  it("não conflita consigo mesmo ao editar um registro", () => {
    expect(
      temConflito(SISTEMA_AGENDAMENTOS, linhas, linhas[0], linhas[0].id),
    ).toBe(false);
  });
});

describe("Sistemas — persistência local e isolamento", () => {
  it("grava e relê usando a chave exclusiva do sistema", () => {
    const linhas = linhasIniciais(SISTEMA_PEDIDOS);
    expect(salvarLinhas(SISTEMA_PEDIDOS, linhas)).toBe(true);
    expect(
      window.localStorage.getItem("portfolio-cafeteria-v1"),
    ).not.toBeNull();
    expect(carregarLinhas(SISTEMA_PEDIDOS)).toEqual(linhas);
    // os demais sistemas continuam intocados
    expect(carregarLinhas(SISTEMA_AGENDAMENTOS)).toEqual(
      linhasIniciais(SISTEMA_AGENDAMENTOS),
    );
    expect(
      window.localStorage.getItem("portfolio-barbearia-v1"),
    ).toBeNull();
  });

  it("primeira abertura carrega a semente", () => {
    expect(carregarLinhas(SISTEMA_ESTOQUE)).toEqual(
      linhasIniciais(SISTEMA_ESTOQUE),
    );
  });

  it("conteúdo corrompido cai para a semente; lista vazia é preservada", () => {
    window.localStorage.setItem("portfolio-loja-roupas-v1", "não é json");
    expect(carregarLinhas(SISTEMA_ESTOQUE)).toEqual(
      linhasIniciais(SISTEMA_ESTOQUE),
    );

    window.localStorage.setItem("portfolio-loja-roupas-v1", '{"n":1}');
    expect(carregarLinhas(SISTEMA_ESTOQUE)).toEqual(
      linhasIniciais(SISTEMA_ESTOQUE),
    );

    window.localStorage.setItem("portfolio-loja-roupas-v1", "[1, null]");
    expect(carregarLinhas(SISTEMA_ESTOQUE)).toEqual([]);

    // exclusão total do usuário (lista válida vazia) permanece vazia
    window.localStorage.setItem("portfolio-loja-roupas-v1", "[]");
    expect(carregarLinhas(SISTEMA_ESTOQUE)).toEqual([]);
  });
});

describe("Sistemas — formatação determinística", () => {
  it("moeda em pt-BR com NBSP normalizado para consulta", () => {
    expect(formatarMoeda(16).replace(/\u00a0/g, " ")).toBe("R$ 16,00");
    expect(formatarMoeda(3537.9).replace(/\u00a0/g, " ")).toBe("R$ 3.537,90");
    expect(formatarMoeda(0).replace(/\u00a0/g, " ")).toBe("R$ 0,00");
  });

  it("data e hora em padrão pt-BR sem depender de fuso", () => {
    expect(formatarDataHora("2026-10-19T09:00")).toBe("19/10/26 09:00");
    expect(formatarDataHora("2026-01-05T23:45")).toBe("05/01/26 23:45");
    expect(formatarDataHora("abc")).toBe("abc");
  });

  it("valor da célula: por unidade em estoque/agenda e total em pedidos", () => {
    const [camisa] = linhasIniciais(SISTEMA_ESTOQUE);
    expect(valorCelula(SISTEMA_ESTOQUE, camisa)).toBe(159.9);
    const [corte] = linhasIniciais(SISTEMA_AGENDAMENTOS);
    expect(valorCelula(SISTEMA_AGENDAMENTOS, corte)).toBe(55);
    const [capuccino] = linhasIniciais(SISTEMA_PEDIDOS);
    expect(valorCelula(SISTEMA_PEDIDOS, capuccino)).toBe(32);
  });
});
