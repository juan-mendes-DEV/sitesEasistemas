"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import styles from "./systemPanel.module.css";
import {
  carregarLinhas,
  estadoLinha,
  estatisticas,
  formatarDataHora,
  formatarMoeda,
  linhasIniciais,
  linhasVisiveis,
  novoId,
  proximoStatus,
  salvarLinhas,
  temConflito,
  valorCelula,
  type LinhaSistema,
  type SistemaConfig,
} from "./systemData";

const AVISO_SALVO = "Registro salvo com sucesso.";
const AVISO_SEM_ARMAZENAMENTO =
  "Dados mantidos nesta sessão. Armazenamento indisponível.";
const AVISO_VALIDACAO = "Preencha os campos com texto válido.";
const AVISO_CONFLITO = "Esse horário coincide com outro atendimento.";
const AVISO_VAZIO = "Nenhum registro encontrado. Adicione um novo ou ajuste a busca.";

function varsPaleta(config: SistemaConfig): CSSProperties {
  return {
    "--bg": config.paleta.bg,
    "--ink": config.paleta.ink,
    "--accent": config.paleta.accent,
    "--muted": config.paleta.muted,
    "--line": config.paleta.line,
    "--panel": config.paleta.panel,
    "--soft": config.paleta.soft,
    "--buttontext": config.paleta.buttontext,
    "--art": config.paleta.art,
    "--artline": config.paleta.artline,
  } as CSSProperties;
}

/**
 * Painel completo de um sistema básico demonstrativo (port do app.js de
 * origem): indicadores, filtros, busca, tabela com CRUD, confirmação de
 * exclusão, aviso flutuante e persistência local isolada por sistema.
 */
export function SystemPanel({ config }: { config: SistemaConfig }) {
  const [linhas, setLinhas] = useState<LinhaSistema[]>(() =>
    linhasIniciais(config),
  );
  const [filtro, setFiltro] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [formAberto, setFormAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [excluindoId, setExcluindoId] = useState<number | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const avisoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gatilho = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restauração pós-hidratação: o HTML estático usa a semente e o localStorage só existe no cliente
    setLinhas(carregarLinhas(config));
  }, [config]);

  useEffect(
    () => () => {
      if (avisoTimer.current) clearTimeout(avisoTimer.current);
    },
    [],
  );

  const mostrarAviso = (texto: string) => {
    setAviso(texto);
    if (avisoTimer.current) clearTimeout(avisoTimer.current);
    avisoTimer.current = setTimeout(() => setAviso(null), 2600);
  };

  const gravar = (novas: LinhaSistema[]) => {
    setLinhas(novas);
    mostrarAviso(
      salvarLinhas(config, novas) ? AVISO_SALVO : AVISO_SEM_ARMAZENAMENTO,
    );
  };

  const abrirForm = (id: number | null, alvo: HTMLElement | null) => {
    gatilho.current = alvo;
    setEditandoId(id);
    setExcluindoId(null);
    setFormAberto(true);
  };

  const fecharForm = () => {
    setFormAberto(false);
    setEditandoId(null);
    gatilho.current?.focus();
    gatilho.current = null;
  };

  const submeterForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dados = Object.fromEntries(new FormData(event.currentTarget));
    const nome = String(dados.name ?? "").trim();
    const extra = String(dados.extra ?? "").trim();
    const quantidade = Number(dados.quantity);
    const preco = Number(dados.price);
    const data = dados.date !== undefined ? String(dados.date) : "";
    const minimo = config.estadoDerivado ? 0 : 1;

    const invalido =
      !nome ||
      !extra ||
      !Number.isInteger(quantidade) ||
      quantidade < minimo ||
      quantidade > 999999 ||
      !Number.isFinite(preco) ||
      preco < 0.01 ||
      preco > 9999999 ||
      (config.dateLabel !== undefined && !data);

    if (invalido) {
      mostrarAviso(AVISO_VALIDACAO);
      return;
    }

    const nova: LinhaSistema = {
      id: editandoId ?? novoId(),
      name: nome,
      extra,
      quantity: quantidade,
      price: preco,
      status: String(dados.status ?? "") || "Disponível",
      ...(data ? { date: data } : {}),
    };

    if (
      config.origem === "barbearia" &&
      temConflito(config, linhas, nova, editandoId)
    ) {
      mostrarAviso(AVISO_CONFLITO);
      return;
    }

    const novas =
      editandoId !== null
        ? linhas.map((l) => (l.id === editandoId ? nova : l))
        : [...linhas, nova];
    setFormAberto(false);
    setEditandoId(null);
    gravar(novas);
    gatilho.current?.focus();
    gatilho.current = null;
  };

  const ehEstoque = config.estadoDerivado;
  const ehBarbearia = config.origem === "barbearia";
  const linhaEmEdicao =
    editandoId !== null
      ? linhas.find((l) => l.id === editandoId)
      : undefined;
  const indicadores = estatisticas(config, linhas);
  const visiveis = linhasVisiveis(config, linhas, filtro, busca);

  const coluna1 = ehEstoque
    ? "PEÇA"
    : ehBarbearia
      ? "CLIENTE / SERVIÇO"
      : "PEDIDO";
  const coluna2 = ehEstoque
    ? "QUANTIDADE"
    : ehBarbearia
      ? "DATA / HORÁRIO"
      : "CLIENTE / MESA";

  return (
    <div
      className={`${styles.pagina} ${styles[`variante-${config.origem}`]}`}
      style={varsPaleta(config)}
    >
      <div className={styles.shell}>
        <header>
          <div className={styles.brand}>
            {config.brand}
            <span style={{ color: "var(--accent)" }}>.</span>
          </div>
          <div className={styles["header-right"]}>
            <span>{config.panel}</span>
            <span className={styles.online}>Operação local</span>
            <span className={styles.avatar}>{config.mark}</span>
          </div>
        </header>

        <main>
          <section className={styles.hero}>
            <div>
              <span className={styles.eyebrow}>{config.kicker}</span>
              <h1>
                {config.titulo[0]}
                <br />
                {config.titulo[1]}
              </h1>
              <p>{config.sub}</p>
            </div>
            <div className={styles.art} aria-hidden="true">
              <span className={styles.serial}>{config.serial}</span>
              <span className={styles.symbol}>{config.icon}</span>
              <span className={styles["art-note"]}>
                {config.story[0]}
                <br />
                {config.story[1]}
              </span>
            </div>
          </section>

          <section className={styles.stats} aria-label="Resumo">
            {indicadores.map((s) => (
              <div className={styles.stat} key={s.rotulo}>
                <span>{s.rotulo}</span>
                <strong>{s.valor}</strong>
                <small>{s.dica}</small>
              </div>
            ))}
          </section>

          <section className={styles.panel}>
            <div className={styles["panel-head"]}>
              <div>
                <h2>{config.section}</h2>
                <p>{config.subtitle}</p>
              </div>
              <button
                type="button"
                className={styles.primary}
                onClick={(e) => abrirForm(null, e.currentTarget)}
              >
                <span aria-hidden="true">＋ </span>
                {config.action}
              </button>
            </div>

            <div className={styles.filterbar}>
              <div className={styles.tabs}>
                {config.categories.map((categoria) => (
                  <button
                    key={categoria}
                    type="button"
                    className={
                      categoria === filtro ? styles.active : undefined
                    }
                    aria-pressed={categoria === filtro}
                    onClick={() => setFiltro(categoria)}
                  >
                    {categoria}
                  </button>
                ))}
              </div>
              <input
                className={styles.search}
                type="search"
                placeholder={config.searchPlaceholder}
                aria-label="Buscar registros"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <div className={styles["table-wrap"]}>
              {visiveis.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>{coluna1}</th>
                      <th>{coluna2}</th>
                      <th>STATUS</th>
                      <th>VALOR</th>
                      <th>AÇÕES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visiveis.map((r) => {
                      const estado = estadoLinha(config, r);
                      const indice = config.statuses.indexOf(estado);
                      const principal = ehBarbearia ? r.extra : r.name;
                      const secundaria = ehBarbearia
                        ? r.name
                        : ehEstoque
                          ? r.extra
                          : `#${String(r.id).slice(-4)}`;
                      const classePill = styles[`state-${indice}`] ?? "";
                      return (
                        <tr key={r.id}>
                          <td>
                            {principal}
                            <small>{secundaria}</small>
                          </td>
                          <td>
                            {ehEstoque && `${r.quantity} un.`}
                            {ehBarbearia && (
                              <>
                                {formatarDataHora(r.date ?? "")}
                                <small>{r.quantity} minutos</small>
                              </>
                            )}
                            {!ehEstoque && !ehBarbearia && (
                              <>
                                {r.extra}
                                <small>{r.quantity} unidade(s)</small>
                              </>
                            )}
                          </td>
                          <td>
                            <span
                              className={`${styles.pill} ${classePill}`}
                            >
                              {estado}
                            </span>
                          </td>
                          <td>
                            {formatarMoeda(valorCelula(config, r))}
                            {ehEstoque && <small>por unidade</small>}
                          </td>
                          <td className={styles.actions}>
                            {excluindoId === r.id ? (
                              <>
                                <button
                                  type="button"
                                  aria-label={`Confirmar exclusão de ${principal}`}
                                  onClick={() => {
                                    setExcluindoId(null);
                                    gravar(
                                      linhas.filter((l) => l.id !== r.id),
                                    );
                                  }}
                                >
                                  Confirmar exclusão
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setExcluindoId(null)}
                                >
                                  Cancelar
                                </button>
                              </>
                            ) : (
                              <>
                                {!ehEstoque && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      gravar(
                                        linhas.map((l) =>
                                          l.id === r.id
                                            ? {
                                                ...l,
                                                status: proximoStatus(
                                                  config,
                                                  l,
                                                ),
                                              }
                                            : l,
                                        ),
                                      );
                                    }}
                                  >
                                    Avançar status
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    abrirForm(r.id, e.currentTarget)
                                  }
                                >
                                  Editar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setExcluindoId(r.id)}
                                >
                                  Excluir
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className={styles.empty}>{AVISO_VAZIO}</div>
              )}
            </div>
          </section>
        </main>

        <footer>
          <span>
            {config.brand} / Sistema demonstrativo de{" "}
            {config.type.toLowerCase()}
          </span>
          <span>Dados salvos neste navegador · Sem servidor</span>
          <Link href="/#catalogo">Ver todos os exemplos</Link>
        </footer>
      </div>

      {formAberto && (
        <div
          className={styles.backdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) fecharForm();
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") fecharForm();
          }}
        >
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-title"
          >
            <form className={styles.form} onSubmit={submeterForm}>
              <div className={styles["dialog-head"]}>
                <h2 id="form-title">
                  {editandoId !== null ? "Editar registro" : config.action}
                </h2>
                <button
                  type="button"
                  className={styles.close}
                  aria-label="Fechar"
                  onClick={fecharForm}
                >
                  ×
                </button>
              </div>

              <label>
                {config.label}
                <input
                  name="name"
                  type="text"
                  required
                  maxLength={80}
                  autoComplete="off"
                  defaultValue={linhaEmEdicao?.name ?? ""}
                  autoFocus
                />
              </label>
              <label>
                {config.extraLabel}
                <input
                  name="extra"
                  type="text"
                  required
                  maxLength={80}
                  autoComplete="off"
                  defaultValue={linhaEmEdicao?.extra ?? ""}
                />
              </label>
              <label>
                {config.numLabel}
                <input
                  name="quantity"
                  type="number"
                  required
                  min={config.estadoDerivado ? 0 : 1}
                  max={999999}
                  step={1}
                  defaultValue={
                    linhaEmEdicao ? String(linhaEmEdicao.quantity) : "1"
                  }
                />
              </label>
              <label>
                {config.unitLabel}
                <input
                  name="price"
                  type="number"
                  required
                  min={0.01}
                  max={9999999}
                  step={0.01}
                  defaultValue={
                    linhaEmEdicao ? String(linhaEmEdicao.price) : ""
                  }
                />
              </label>
              {config.dateLabel && (
                <label>
                  {config.dateLabel}
                  <input
                    name="date"
                    type="datetime-local"
                    required
                    defaultValue={linhaEmEdicao?.date ?? ""}
                  />
                </label>
              )}
              {!config.estadoDerivado && (
                <label>
                  Status
                  <select
                    name="status"
                    defaultValue={linhaEmEdicao?.status ?? config.statuses[0]}
                  >
                    {config.statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <button type="submit" className={styles.primary}>
                Salvar registro
              </button>
            </form>
          </div>
        </div>
      )}

      <div
        className={styles.toast}
        role="status"
        style={{ display: aviso ? "block" : "none" }}
      >
        {aviso}
      </div>
    </div>
  );
}
