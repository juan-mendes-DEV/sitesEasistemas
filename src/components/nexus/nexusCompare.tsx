"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GitCompare, Trash } from "lucide-react";
import { useMemo } from "react";
import { buildCompareRows, resolveCompareProducts } from "@/lib/ecommerce/compare";
import { formatBRL, productImageAlt } from "@/lib/ecommerce/format";
import { useStore } from "@/components/ecommerce/storeProvider";
import { NEXUS_STORE } from "./data";

const BASE = NEXUS_STORE.route;

export function NexusCompare() {
  const { products, compare } = useStore();

  const selecionados = useMemo(
    () => resolveCompareProducts(compare.ids, products),
    [compare.ids, products],
  );
  const linhas = useMemo(() => buildCompareRows(selecionados), [selecionados]);

  if (selecionados.length === 0) {
    return (
      <div className="border border-dashed border-[#E9F2F7]/25 p-10 text-center">
        <GitCompare
          className="mx-auto h-8 w-8 text-[#20C7D9]"
          aria-hidden="true"
        />
        <p className="mt-4 text-base font-semibold text-[#E9F2F7]">
          Nenhum produto no comparador.
        </p>
        <p className="mt-2 text-sm text-[#E9F2F7]/60">
          Use o botão de comparação em até três produtos do catálogo para ver
          lado a lado as especificações fictícias.
        </p>
        <Link
          href={`${BASE}/produtos`}
          className="mt-5 inline-block bg-[#20C7D9] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1220] transition-colors hover:bg-[#E9F2F7] focus-visible:outline-[#E9F2F7]"
        >
          Escolher produtos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p role="status" aria-live="polite" className="text-sm text-[#E9F2F7]/65">
        {selecionados.length} de 3 produtos selecionados — comparação local,
        sem servidor.
      </p>

      <div className="mt-6 overflow-x-auto border border-[#E9F2F7]/12">
        <table className="w-full min-w-[40rem] border-collapse text-sm">
          <caption className="sr-only">
            Comparação de especificações técnicas fictícias entre produtos
            selecionados
          </caption>
          <thead>
            <tr className="bg-[#172B40]">
              <th
                scope="col"
                className="w-44 border-b border-[#E9F2F7]/12 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-[#20C7D9]"
              >
                Atributo
              </th>
              {selecionados.map((product) => (
                <th
                  key={product.id}
                  scope="col"
                  className="border-b border-l border-[#E9F2F7]/12 px-4 py-4 text-left align-top"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative aspect-square w-14 shrink-0 overflow-hidden border border-[#E9F2F7]/15">
                      <Image
                        src={product.images[0]}
                        alt={productImageAlt(product.name, 0)}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`${BASE}/produtos/${product.slug}`}
                        className="block text-sm font-semibold text-[#E9F2F7] hover:text-[#20C7D9] focus-visible:outline-[#20C7D9]"
                      >
                        {product.name}
                      </Link>
                      <span className="mt-0.5 block text-xs font-normal tabular-nums text-[#20C7D9]">
                        {formatBRL(product.price)}
                      </span>
                      <button
                        type="button"
                        onClick={() => compare.toggle(product.id)}
                        aria-label={`Remover ${product.name} do comparador`}
                        className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E9F2F7]/55 transition-colors hover:text-[#FF8A80] focus-visible:outline-[#20C7D9]"
                      >
                        <Trash className="h-3 w-3" aria-hidden="true" />
                        Remover
                      </button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.map((linha) => (
              <tr
                key={linha.label}
                className="border-b border-[#E9F2F7]/10 last:border-b-0"
              >
                <th
                  scope="row"
                  className="bg-[#0B1220] px-4 py-3 text-left align-top text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E9F2F7]/60"
                >
                  {linha.label}
                </th>
                {linha.values.map((valor, indice) => (
                  <td
                    key={`${linha.label}-${selecionados[indice]?.id ?? indice}`}
                    className="border-l border-[#E9F2F7]/10 px-4 py-3 align-top text-[#E9F2F7]"
                  >
                    {valor ?? (
                      <span className="italic text-[#E9F2F7]/40">
                        Não disponível
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-[#E9F2F7]/50">
          Valores “Não disponível” indicam atributo não informado no produto —
          nada foi inventado para preencher a tabela.
        </p>
        <Link
          href={`${BASE}/produtos`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#20C7D9] underline underline-offset-4 hover:text-[#E9F2F7] focus-visible:outline-[#20C7D9]"
        >
          Adicionar mais produtos
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
