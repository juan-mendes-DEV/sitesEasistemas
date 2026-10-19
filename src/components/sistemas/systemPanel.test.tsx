import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SystemPanel } from "@/components/sistemas/systemPanel";
import {
  SISTEMAS,
  SISTEMA_AGENDAMENTOS,
  SISTEMA_ESTOQUE,
  SISTEMA_PEDIDOS,
  estadoLinha,
  estatisticas,
  linhasIniciais,
  type SistemaConfig,
} from "@/components/sistemas/systemData";

beforeEach(() => {
  window.localStorage.clear();
});

/** O matcher normaliza NBSP do nó, mas não a string buscada — normalizamos aqui. */
function brl(valor: number | string): string {
  return String(valor).replace(/\u00a0/g, " ");
}

function linhaDe(texto: string): HTMLElement {
  const alvo = screen.getByText(texto);
  const tr = alvo.closest("tr");
  if (!tr) throw new Error(`linha da tabela não encontrada: ${texto}`);
  return tr;
}

function abrirNovo(config: SistemaConfig): void {
  fireEvent.click(
    screen.getByRole("button", { name: new RegExp(config.action) }),
  );
}

function digitar(rotulo: string, valor: string): void {
  const dialog = screen.getByRole("dialog");
  fireEvent.change(within(dialog).getByLabelText(rotulo), {
    target: { value: valor },
  });
}

function preencher(
  config: SistemaConfig,
  dados: {
    nome?: string;
    extra?: string;
    quantidade?: string;
    preco?: string;
    data?: string;
    status?: string;
  },
): void {
  if (dados.nome !== undefined) digitar(config.label, dados.nome);
  if (dados.extra !== undefined) digitar(config.extraLabel, dados.extra);
  if (dados.quantidade !== undefined)
    digitar(config.numLabel, dados.quantidade);
  if (dados.preco !== undefined) digitar(config.unitLabel, dados.preco);
  if (dados.data !== undefined && config.dateLabel)
    digitar(config.dateLabel, dados.data);
  if (dados.status !== undefined) digitar("Status", dados.status);
}

function salvar(): void {
  fireEvent.click(
    screen.getByRole("button", { name: "Salvar registro" }),
  );
}

function submeterFormulario(): void {
  // Dispara o submit diretamente: não passa pela validação nativa de
  // `required` do clique, exercitando o guarda do nosso handler.
  const dialog = screen.getByRole("dialog");
  const form = dialog.querySelector("form");
  if (!form) throw new Error("formulário do diálogo não encontrado");
  fireEvent.submit(form);
}

function lerChave(chave: string): Array<Record<string, unknown>> {
  return JSON.parse(window.localStorage.getItem(chave) ?? "[]");
}

function digitarBusca(valor: string): void {
  fireEvent.change(screen.getByLabelText("Buscar registros"), {
    target: { value: valor },
  });
}

describe("Sistemas — estrutura da página", () => {
  SISTEMAS.forEach((config) => {
    it(`${config.slug}: cabeçalho, hero, indicadores, tabela e rodapé`, () => {
      render(<SystemPanel config={config} />);

      const banner = screen.getByRole("banner");
      expect(within(banner).getByText(new RegExp(config.brand))).toBeInTheDocument();
      expect(within(banner).getByText(config.panel)).toBeInTheDocument();
      expect(within(banner).getByText("Operação local")).toBeInTheDocument();
      expect(within(banner).getByText(config.mark)).toBeInTheDocument();

      const principal = screen.getByRole("heading", { level: 1 });
      expect(principal).toHaveTextContent(config.titulo[0]);
      expect(principal).toHaveTextContent(config.titulo[1]);
      expect(screen.getByText(config.kicker)).toBeInTheDocument();
      expect(screen.getByText(config.sub)).toBeInTheDocument();

      const resumo = screen.getByRole("region", { name: "Resumo" });
      expect(resumo.children).toHaveLength(3);
      const esperados = estatisticas(config, linhasIniciais(config));
      for (const estatistica of esperados) {
        expect(
          within(resumo).getByText(estatistica.rotulo),
        ).toBeInTheDocument();
        expect(
          within(resumo).getByText(brl(estatistica.valor)),
        ).toBeInTheDocument();
      }

      const tabela = screen.getByRole("table");
      expect(within(tabela).getAllByRole("row")).toHaveLength(4); // cabeçalho + 3
      for (const linha of config.seed) {
        expect(within(tabela).getByText(linha[0])).toBeInTheDocument();
      }

      expect(
        screen.getByText(
          `${config.brand} / Sistema demonstrativo de ${config.type.toLowerCase()}`,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Dados salvos neste navegador · Sem servidor"),
      ).toBeInTheDocument();
      const link = screen.getByRole("link", {
        name: "Ver todos os exemplos",
      });
      expect(link).toHaveAttribute("href", "/#catalogo");

      expect(screen.getByText(config.serial)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(config.searchPlaceholder)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Todos" }),
      ).toHaveAttribute("aria-pressed", "true");
    });
  });

  it("somente agendamentos exibe o campo de data e horário", () => {
    render(<SystemPanel config={SISTEMA_AGENDAMENTOS} />);
    abrirNovo(SISTEMA_AGENDAMENTOS);
    expect(
      screen.getByLabelText("Data e horário"),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("dialog")).getByLabelText("Status"),
    ).toHaveValue("Confirmado");
  });

  it("estoque e pedidos não exibem campo de data", () => {
    render(<SystemPanel config={SISTEMA_PEDIDOS} />);
    abrirNovo(SISTEMA_PEDIDOS);
    expect(screen.queryByLabelText("Data e horário")).toBeNull();
    expect(
      within(screen.getByRole("dialog")).getByLabelText("Status"),
    ).toHaveValue("Recebido");
  });

  it("estoque não exibe seletor de status (estado é derivado da quantidade)", () => {
    render(<SystemPanel config={SISTEMA_ESTOQUE} />);
    abrirNovo(SISTEMA_ESTOQUE);
    expect(screen.queryByLabelText("Status")).toBeNull();
    expect(screen.queryByLabelText("Data e horário")).toBeNull();
  });
});

describe("Sistemas — busca e filtros", () => {
  it("pedidos: busca por produto ou cliente/mesa", () => {
    render(<SystemPanel config={SISTEMA_PEDIDOS} />);
    digitarBusca("Mesa 04");
    const tabela = screen.getByRole("table");
    expect(within(tabela).getAllByRole("row")).toHaveLength(2);
    expect(within(tabela).getByText("Cappuccino da casa")).toBeInTheDocument();
    expect(within(tabela).queryByText("Bolo de laranja")).toBeNull();
  });

  it("pedidos: busca sem resultado mostra estado vazio", () => {
    render(<SystemPanel config={SISTEMA_PEDIDOS} />);
    digitarBusca("não existe");
    expect(
      screen.getByText(
        "Nenhum registro encontrado. Adicione um novo ou ajuste a busca.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByRole("table")).toBeNull();
  });

  it("pedidos: abas filtram pelo status", () => {
    render(<SystemPanel config={SISTEMA_PEDIDOS} />);
    fireEvent.click(screen.getByRole("button", { name: "Pronto" }));
    expect(screen.getByRole("button", { name: "Pronto" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    const tabela = screen.getByRole("table");
    expect(within(tabela).getAllByRole("row")).toHaveLength(2);
    expect(within(tabela).getByText("Bolo de laranja")).toBeInTheDocument();
    expect(within(tabela).queryByText("Espresso duplo")).toBeNull();
  });

  it("estoque: abas filtram pelo estado derivado", () => {
    render(<SystemPanel config={SISTEMA_ESTOQUE} />);
    fireEvent.click(screen.getByRole("button", { name: "Esgotado" }));
    const tabela = screen.getByRole("table");
    expect(within(tabela).getByText("Regata essencial")).toBeInTheDocument();
    expect(within(tabela).queryByText("Camisa de linho")).toBeNull();
  });

  it("agendamentos: abas filtram pelo status e a busca combina com a aba", () => {
    render(<SystemPanel config={SISTEMA_AGENDAMENTOS} />);
    fireEvent.click(screen.getByRole("button", { name: "Finalizado" }));
    let tabela = screen.getByRole("table");
    expect(within(tabela).getByText("Barba na toalha quente")).toBeInTheDocument();
    expect(within(tabela).queryByText("Corte clássico")).toBeNull();

    digitarBusca("ninguém");
    expect(screen.queryByRole("table")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Todos" }));
    digitarBusca("rafael");
    tabela = screen.getByRole("table");
    expect(within(tabela).getByText("Corte clássico")).toBeInTheDocument();
    expect(within(tabela).getAllByRole("row")).toHaveLength(2);
  });

  it("agenda exibe data e duração em formato pt-BR determinístico", () => {
    render(<SystemPanel config={SISTEMA_AGENDAMENTOS} />);
    const linha = linhaDe("Corte clássico");
    expect(within(linha).getByText("19/10/26 09:00")).toBeInTheDocument();
    expect(within(linha).getByText("40 minutos")).toBeInTheDocument();
  });
});

describe("Sistemas — cadastro, edição e exclusão", () => {
  it("pedidos: cria registro, avisa e persiste na chave do sistema", () => {
    render(<SystemPanel config={SISTEMA_PEDIDOS} />);
    abrirNovo(SISTEMA_PEDIDOS);
    expect(
      screen.getByRole("heading", { name: "Novo pedido" }),
    ).toBeInTheDocument();

    preencher(SISTEMA_PEDIDOS, {
      nome: "Brownie quente",
      extra: "Mesa 09",
      quantidade: "3",
      preco: "12.5",
    });
    salvar();

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByText("Brownie quente")).toBeInTheDocument();
    expect(screen.getByText("Registro salvo com sucesso.")).toBeInTheDocument();

    const salvo = lerChave("portfolio-cafeteria-v1");
    expect(salvo).toHaveLength(4);
    expect(salvo[3]).toMatchObject({
      name: "Brownie quente",
      extra: "Mesa 09",
      quantity: 3,
      price: 12.5,
      status: "Recebido",
    });
    expect(Object.keys(window.localStorage)).toEqual([
      "portfolio-cafeteria-v1",
    ]);
  });

  it("pedidos: formulário vazio é validado sem criar registro", () => {
    render(<SystemPanel config={SISTEMA_PEDIDOS} />);
    abrirNovo(SISTEMA_PEDIDOS);
    submeterFormulario();

    expect(
      screen.getByText("Preencha os campos com texto válido."),
    ).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(lerChave("portfolio-cafeteria-v1")).toHaveLength(0);
    expect(
      within(screen.getByRole("table")).getAllByRole("row"),
    ).toHaveLength(4);
    expect(screen.queryByText("Brownie quente")).toBeNull();
  });

  it("pedidos: edição abre pré-preenchida e atualiza a linha", () => {
    render(<SystemPanel config={SISTEMA_PEDIDOS} />);
    fireEvent.click(
      within(linhaDe("Espresso duplo")).getByRole("button", {
        name: "Editar",
      }),
    );
    expect(
      screen.getByRole("heading", { name: "Editar registro" }),
    ).toBeInTheDocument();
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByLabelText("Produto")).toHaveValue(
      "Espresso duplo",
    );
    expect(within(dialog).getByLabelText("Cliente / mesa")).toHaveValue(
      "Balcão · Ana",
    );
    expect(within(dialog).getByLabelText("Quantidade")).toHaveValue(1);

    preencher(SISTEMA_PEDIDOS, { nome: "Espresso duplo do dia" });
    salvar();

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByText("Espresso duplo do dia")).toBeInTheDocument();
    expect(screen.queryByText("Espresso duplo")).toBeNull();
    expect(screen.getByText("Registro salvo com sucesso.")).toBeInTheDocument();
    expect(lerChave("portfolio-cafeteria-v1")).toHaveLength(3);
  });

  it("pedidos: exige confirmação para excluir e permite cancelar", () => {
    render(<SystemPanel config={SISTEMA_PEDIDOS} />);
    const linha = linhaDe("Espresso duplo");
    fireEvent.click(within(linha).getByRole("button", { name: "Excluir" }));

    // ainda não excluiu: a linha permanece e a confirmação aparece
    expect(screen.getByText("Espresso duplo")).toBeInTheDocument();
    const cancelar = within(linha).getByRole("button", { name: "Cancelar" });
    fireEvent.click(cancelar);
    expect(screen.getByText("Espresso duplo")).toBeInTheDocument();

    fireEvent.click(within(linhaDe("Espresso duplo")).getByRole("button", { name: "Excluir" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Confirmar exclusão de Espresso duplo" }),
    );
    expect(screen.queryByText("Espresso duplo")).toBeNull();
    expect(screen.getByText("Registro salvo com sucesso.")).toBeInTheDocument();
    expect(lerChave("portfolio-cafeteria-v1")).toHaveLength(2);
  });

  it("estoque: cadastra peça sem status e o estado é derivado da quantidade", () => {
    render(<SystemPanel config={SISTEMA_ESTOQUE} />);
    abrirNovo(SISTEMA_ESTOQUE);
    preencher(SISTEMA_ESTOQUE, {
      nome: "Vestido teste",
      extra: "Vestidos · G",
      quantidade: "2",
      preco: "199.9",
    });
    salvar();

    const linha = linhaDe("Vestido teste");
    expect(within(linha).getByText("Estoque baixo")).toBeInTheDocument();
    expect(Object.keys(window.localStorage)).toEqual([
      "portfolio-loja-roupas-v1",
    ]);

    // editar para 10 unidades vira "Disponível" e atualiza os indicadores
    fireEvent.click(within(linha).getByRole("button", { name: "Editar" }));
    preencher(SISTEMA_ESTOQUE, { quantidade: "10" });
    salvar();
    expect(
      within(linhaDe("Vestido teste")).getByText("Disponível"),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: "Resumo" })).getByText("31"),
    ).toBeInTheDocument();
  });

  it("estoque: linhas semente exibem estados derivados (18, 3 e 0)", () => {
    render(<SystemPanel config={SISTEMA_ESTOQUE} />);
    const tabela = screen.getByRole("table");
    expect(
      within(linhaDe("Camisa de linho")).getByText("Disponível"),
    ).toBeInTheDocument();
    expect(
      within(linhaDe("Calça wide leg")).getByText("Estoque baixo"),
    ).toBeInTheDocument();
    expect(
      within(linhaDe("Regata essencial")).getByText("Esgotado"),
    ).toBeInTheDocument();
    expect(tabela).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Avançar status" }),
    ).toBeNull();
  });
});

describe("Sistemas — avanço de status", () => {
  it("agendamentos: ciclo Confirmado → Atendendo → Finalizado → Confirmado", () => {
    render(<SystemPanel config={SISTEMA_AGENDAMENTOS} />);

    let linha = linhaDe("Corte clássico");
    expect(within(linha).getByText("Confirmado")).toBeInTheDocument();
    fireEvent.click(
      within(linha).getByRole("button", { name: "Avançar status" }),
    );
    expect(within(linha).getByText("Atendendo")).toBeInTheDocument();
    expect(screen.getByText("Registro salvo com sucesso.")).toBeInTheDocument();

    fireEvent.click(
      within(linha).getByRole("button", { name: "Avançar status" }),
    );
    expect(within(linha).getByText("Finalizado")).toBeInTheDocument();

    linha = linhaDe("Barba na toalha quente");
    fireEvent.click(
      within(linha).getByRole("button", { name: "Avançar status" }),
    );
    expect(within(linha).getByText("Confirmado")).toBeInTheDocument();
    expect(lerChave("portfolio-barbearia-v1")).toHaveLength(3);
  });

  it("pedidos: ciclo Recebido → Em preparo → Pronto", () => {
    render(<SystemPanel config={SISTEMA_PEDIDOS} />);
    const linha = linhaDe("Espresso duplo");
    expect(within(linha).getByText("Recebido")).toBeInTheDocument();
    fireEvent.click(
      within(linha).getByRole("button", { name: "Avançar status" }),
    );
    expect(within(linha).getByText("Em preparo")).toBeInTheDocument();
    fireEvent.click(
      within(linha).getByRole("button", { name: "Avançar status" }),
    );
    expect(within(linha).getByText("Pronto")).toBeInTheDocument();
  });

  it("estoque: não há botão de avanço de status", () => {
    render(<SystemPanel config={SISTEMA_ESTOQUE} />);
    expect(
      screen.queryAllByRole("button", { name: "Avançar status" }),
    ).toEqual([]);
  });
});

describe("Sistemas — bloqueio de sobreposição (agendamentos)", () => {
  it("recusa horário colidido e mantém o diálogo aberto", () => {
    render(<SystemPanel config={SISTEMA_AGENDAMENTOS} />);
    abrirNovo(SISTEMA_AGENDAMENTOS);
    preencher(SISTEMA_AGENDAMENTOS, {
      nome: "Corte teste",
      extra: "Ana Teste",
      quantidade: "30",
      preco: "50",
      data: "2026-10-19T09:30",
    });
    submeterFormulario();

    expect(
      screen.getByText("Esse horário coincide com outro atendimento."),
    ).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.queryByText("Corte teste")).toBeNull();
    // bloqueio antes de qualquer gravação: a chave nem existe
    expect(
      window.localStorage.getItem("portfolio-barbearia-v1"),
    ).toBeNull();

    // horário livre: 14:00 entra normalmente
    preencher(SISTEMA_AGENDAMENTOS, { data: "2026-10-19T14:00" });
    salvar();
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByText("Corte teste")).toBeInTheDocument();
    expect(screen.getByText("Registro salvo com sucesso.")).toBeInTheDocument();
    expect(lerChave("portfolio-barbearia-v1")).toHaveLength(4);
  });

  it("atendimento finalizado não bloqueia o horário", () => {
    render(<SystemPanel config={SISTEMA_AGENDAMENTOS} />);
    abrirNovo(SISTEMA_AGENDAMENTOS);
    preencher(SISTEMA_AGENDAMENTOS, {
      nome: "Barba teste",
      extra: "Final Teste",
      quantidade: "30",
      preco: "35",
      data: "2026-10-19T11:45", // sobrepõe o Finalizado das 11:30
    });
    submeterFormulario();

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByText("Barba teste")).toBeInTheDocument();
    expect(lerChave("portfolio-barbearia-v1")).toHaveLength(4);
  });

  it("data obrigatória em agendamentos", () => {
    render(<SystemPanel config={SISTEMA_AGENDAMENTOS} />);
    abrirNovo(SISTEMA_AGENDAMENTOS);
    preencher(SISTEMA_AGENDAMENTOS, {
      nome: "Sem data",
      extra: "Cliente",
      quantidade: "30",
      preco: "50",
    });
    submeterFormulario();
    expect(
      screen.getByText("Preencha os campos com texto válido."),
    ).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("Sistemas — persistência, isolamento e avisos", () => {
  it("dados criados reaparecem ao reabrir o sistema", () => {
    const primeira = render(<SystemPanel config={SISTEMA_PEDIDOS} />);
    abrirNovo(SISTEMA_PEDIDOS);
    preencher(SISTEMA_PEDIDOS, {
      nome: "Cookie",
      extra: "Balcão",
      quantidade: "1",
      preco: "8",
    });
    salvar();
    expect(screen.getByText("Cookie")).toBeInTheDocument();
    primeira.unmount();

    render(<SystemPanel config={SISTEMA_PEDIDOS} />);
    expect(screen.getByText("Cookie")).toBeInTheDocument();
  });

  it("sistemas não compartilham dados entre chaves", () => {
    const estoque = render(<SystemPanel config={SISTEMA_ESTOQUE} />);
    abrirNovo(SISTEMA_ESTOQUE);
    preencher(SISTEMA_ESTOQUE, {
      nome: "Peça isolada",
      extra: "Testes · P",
      quantidade: "1",
      preco: "50",
    });
    salvar();
    expect(screen.getByText("Peça isolada")).toBeInTheDocument();
    estoque.unmount();

    render(<SystemPanel config={SISTEMA_AGENDAMENTOS} />);
    expect(screen.queryByText("Peça isolada")).toBeNull();
    expect(screen.getByText("Corte clássico")).toBeInTheDocument();
    expect(Object.keys(window.localStorage)).toEqual([
      "portfolio-loja-roupas-v1",
    ]);
  });

  it("o aviso some depois de 2,6 segundos", () => {
    vi.useFakeTimers();
    try {
      render(<SystemPanel config={SISTEMA_PEDIDOS} />);
      abrirNovo(SISTEMA_PEDIDOS);
      preencher(SISTEMA_PEDIDOS, {
        nome: "Aviso",
        extra: "Mesa 1",
        quantidade: "1",
        preco: "5",
      });
      salvar();
      expect(
        screen.getByText("Registro salvo com sucesso."),
      ).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(2600);
      });
      expect(
        screen.queryByText("Registro salvo com sucesso."),
      ).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });

  it("estados derivados das sementes batem com o pílula exibido", () => {
    render(<SystemPanel config={SISTEMA_ESTOQUE} />);
    for (const linha of linhasIniciais(SISTEMA_ESTOQUE)) {
      expect(
        within(linhaDe(linha.name)).getByText(
          estadoLinha(SISTEMA_ESTOQUE, linha),
        ),
      ).toBeInTheDocument();
    }
  });
});
