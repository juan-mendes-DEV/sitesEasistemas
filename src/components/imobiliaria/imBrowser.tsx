"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { IMOBILIARIA, type ImovelTipo } from "./data";
import { ImPropertyCard } from "./imPropertyCard";

type TipoFilter = "todos" | ImovelTipo;
type FaixaKey = "todos" | "ate-700" | "700-1500" | "acima-1500";

const TIPO_OPTIONS: { key: TipoFilter; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "casa", label: "Casas" },
  { key: "apartamento", label: "Apartamentos" },
  { key: "cobertura", label: "Coberturas" },
];

const FAIXA_OPTIONS: { key: FaixaKey; label: string }[] = [
  { key: "todos", label: "Qualquer valor" },
  { key: "ate-700", label: "Até R$ 700 mil" },
  { key: "700-1500", label: "R$ 700 mil – R$ 1,5 mi" },
  { key: "acima-1500", label: "Acima de R$ 1,5 mi" },
];

function matchesFaixa(preco: number, faixa: FaixaKey): boolean {
  switch (faixa) {
    case "ate-700":
      return preco <= 700000;
    case "700-1500":
      return preco > 700000 && preco <= 1500000;
    case "acima-1500":
      return preco > 1500000;
    default:
      return true;
  }
}

export function ImBrowser() {
  const [tipo, setTipo] = useState<TipoFilter>("todos");
  const [faixa, setFaixa] = useState<FaixaKey>("todos");

  const filtrados = useMemo(
    () =>
      IMOBILIARIA.imoveis.filter(
        (imovel) =>
          (tipo === "todos" || imovel.tipo === tipo) &&
          matchesFaixa(imovel.preco, faixa)
      ),
    [tipo, faixa]
  );

  const limpo = tipo === "todos" && faixa === "todos";

  return (
    <section className="bg-[#EDE4D6] py-14 sm:py-20" aria-labelledby="im-browser-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="im-browser-title" className="sr-only">
          Catálogo de imóveis com filtros
        </h2>

        <div className="rounded-sm border border-[#14243A]/10 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#353C45]/60 mb-4">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#B99A63]" aria-hidden="true" />
            Filtros locais — sem servidor
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <fieldset>
              <legend className="text-xs font-semibold text-[#14243A] uppercase tracking-wide mb-2">
                Tipo de imóvel
              </legend>
              <div className="flex flex-wrap gap-2">
                {TIPO_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setTipo(opt.key)}
                    aria-pressed={tipo === opt.key}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-sm border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A63] ${
                      tipo === opt.key
                        ? "bg-[#14243A] border-[#14243A] text-white"
                        : "bg-white border-[#14243A]/15 text-[#353C45] hover:border-[#B99A63]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-xs font-semibold text-[#14243A] uppercase tracking-wide mb-2">
                Faixa de preço
              </legend>
              <div className="flex flex-wrap gap-2">
                {FAIXA_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setFaixa(opt.key)}
                    aria-pressed={faixa === opt.key}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-sm border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A63] ${
                      faixa === opt.key
                        ? "bg-[#14243A] border-[#14243A] text-white"
                        : "bg-white border-[#14243A]/15 text-[#353C45] hover:border-[#B99A63]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#14243A]/10 pt-4">
            <p className="text-xs text-[#353C45]/70" role="status" aria-live="polite">
              {filtrados.length === 0
                ? "Nenhum imóvel corresponde aos filtros."
                : `${filtrados.length} ${
                    filtrados.length === 1 ? "imóvel encontrado" : "imóveis encontrados"
                  }`}
            </p>
            {!limpo && (
              <button
                type="button"
                onClick={() => {
                  setTipo("todos");
                  setFaixa("todos");
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B99A63] hover:text-[#14243A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A63] transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtrados.map((imovel) => (
            <li key={imovel.slug} className="h-full">
              <ImPropertyCard imovel={imovel} />
            </li>
          ))}
        </ul>

        {filtrados.length === 0 && (
          <div className="mt-6 rounded-sm border border-dashed border-[#14243A]/25 bg-white/60 p-10 text-center">
            <p className="text-sm font-semibold text-[#14243A]">
              Nenhum imóvel nesta combinação de filtros.
            </p>
            <p className="mt-1 text-xs text-[#353C45]/70">
              Ajuste o tipo ou a faixa de preço para ver outros imóveis do
              portfólio demonstrativo.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
