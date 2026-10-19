import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GitCompare, ShieldCheck } from "lucide-react";
import { formatBRL } from "@/lib/ecommerce/format";
import {
  NEXUS_CATEGORIES,
  NEXUS_EDITORIAL,
  NEXUS_PRODUCTS,
  NEXUS_STORE,
} from "./data";
import { NexusProductCard } from "./nexusProductCard";

const BASE = NEXUS_STORE.route;
const destaques = NEXUS_PRODUCTS.slice(0, 6);

export function NexusHome() {
  return (
    <div>
      {/* Hero */}
      <section aria-labelledby="nexus-hero-titulo" className="border-b border-[#E9F2F7]/12">
        <div className="mx-auto grid max-w-7xl items-stretch gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#20C7D9]">
              Loja de demonstração · Fichas fictícias
            </p>
            <h1
              id="nexus-hero-titulo"
              className="mt-5 text-4xl font-black leading-[1.02] tracking-tight text-[#E9F2F7] sm:text-5xl"
            >
              Tecnologia para o{" "}
              <span className="text-[#20C7D9]">próximo nível.</span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#E9F2F7]/70 lg:text-base">
              Smartphones, fones, teclados, mouses e monitores em um e-commerce
              de demonstração: busca, filtros, comparador de até três produtos,
              carrinho isolado e checkout simulado.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`${BASE}/produtos`}
                className="inline-flex items-center gap-2 bg-[#20C7D9] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B1220] transition-colors hover:bg-[#E9F2F7] focus-visible:outline-[#E9F2F7]"
              >
                Ver catálogo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={`${BASE}/comparador`}
                className="inline-flex items-center gap-2 border border-[#20C7D9]/60 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#20C7D9] transition-colors hover:bg-[#20C7D9] hover:text-[#0B1220] focus-visible:outline-[#20C7D9]"
              >
                <GitCompare className="h-4 w-4" aria-hidden="true" />
                Abrir comparador
              </Link>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-[#E9F2F7]/55">
              <ShieldCheck className="h-4 w-4 text-[#20C7D9]" aria-hidden="true" />
              Marcas e especificações inventadas · nenhum pagamento é processado.
            </p>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#E9F2F7]/12 lg:aspect-auto lg:min-h-[28rem]">
            <Image
              src={NEXUS_EDITORIAL.heroImage}
              alt="Kit de tecnologia em fotografia de estúdio clara (demonstração NEXUS)"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 bg-[#0B1220]/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#20C7D9]">
              Setup fictício · fotos ilustrativas
            </span>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section aria-labelledby="nexus-categorias-titulo" className="border-b border-[#E9F2F7]/12">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="nexus-categorias-titulo"
              className="text-lg font-bold uppercase tracking-[0.2em] text-[#E9F2F7]"
            >
              Categorias
            </h2>
            <Link
              href={`${BASE}/produtos`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#20C7D9] underline underline-offset-4 hover:text-[#E9F2F7] focus-visible:outline-[#20C7D9]"
            >
              Ver tudo
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-7 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 lg:grid-cols-6">
            {NEXUS_CATEGORIES.map((categoria, indice) => {
              const total = NEXUS_PRODUCTS.filter(
                (item) => item.category === categoria.id,
              );
              const menor = Math.min(...total.map((item) => item.price));
              return (
                <li key={categoria.id}>
                  <Link
                    href={`${BASE}/produtos`}
                    className="group flex h-full min-h-32 flex-col justify-between border border-[#E9F2F7]/12 bg-[#172B40] p-4 transition-colors hover:border-[#20C7D9] focus-visible:outline-[#20C7D9] sm:min-h-36"
                  >
                    <span className="font-mono text-[10px] tracking-[0.15em] text-[#20C7D9]">
                      0{indice + 1}
                    </span>
                    <span>
                      <span className="block text-xs font-bold uppercase leading-snug tracking-[0.08em] text-[#E9F2F7]">
                        {categoria.label}
                      </span>
                      <span className="mt-1 block text-[11px] text-[#E9F2F7]/55">
                        desde {formatBRL(menor)}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 self-end text-[#20C7D9] transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Destaques */}
      <section aria-labelledby="nexus-destaques-titulo" className="border-b border-[#E9F2F7]/12">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2
                id="nexus-destaques-titulo"
                className="text-lg font-bold uppercase tracking-[0.2em] text-[#E9F2F7]"
              >
                Destaques da vitrine
              </h2>
              <p className="mt-2 text-sm text-[#E9F2F7]/60">
                Seis produtos com ficha técnica fictícia — compare-os lado a
                lado.
              </p>
            </div>
            <Link
              href={`${BASE}/produtos`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#20C7D9] underline underline-offset-4 hover:text-[#E9F2F7] focus-visible:outline-[#20C7D9]"
            >
              Catálogo completo
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-7 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {destaques.map((product) => (
              <li key={product.id} className="h-full">
                <NexusProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparador */}
      <section aria-labelledby="nexus-comparador-titulo" className="border-b border-[#E9F2F7]/12">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 border border-[#20C7D9]/40 bg-[#172B40] p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#20C7D9]">
                <GitCompare className="h-4 w-4" aria-hidden="true" />
                Recurso exclusivo desta loja
              </p>
              <h2
                id="nexus-comparador-titulo"
                className="mt-3 text-xl font-black uppercase tracking-tight text-[#E9F2F7] sm:text-2xl"
              >
                Comparador de até três produtos
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#E9F2F7]/65">
                Reúna smartphones, fones, teclados e monitores em uma tabela
                única. Atributos não informados aparecem claramente como “Não
                disponível” — nada é inventado para preencher lacunas.
              </p>
            </div>
            <Link
              href={`${BASE}/comparador`}
              className="inline-flex items-center justify-center gap-2 bg-[#20C7D9] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B1220] transition-colors hover:bg-[#E9F2F7] focus-visible:outline-[#E9F2F7] lg:w-fit"
            >
              Abrir comparador
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial técnico */}
      <section aria-labelledby="nexus-setup-titulo">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#20C7D9]">
              Feito para demonstrar
            </p>
            <h2
              id="nexus-setup-titulo"
              className="mt-4 text-2xl font-black uppercase leading-tight tracking-tight text-[#E9F2F7] sm:text-3xl"
            >
              Uma loja técnica, sem exageros
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[#E9F2F7]/65">
              Interface sóbria, cards profissionais e fichas estruturadas para
              mostrar como seu catálogo de eletrônicos ficaria no ar. Tudo
              roda localmente: busca, filtros, comparador e carrinho não
              dependem de servidor.
            </p>
            <ul className="mt-7 space-y-2.5 border-t border-[#E9F2F7]/12 pt-6 text-sm text-[#E9F2F7]/75">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[#20C7D9]" aria-hidden="true" />
                Filtro por categoria e faixa de preço
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[#20C7D9]" aria-hidden="true" />
                Ordenação por preço e nome
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[#20C7D9]" aria-hidden="true" />
                Carrinho isolado e checkout fictício
              </li>
            </ul>
          </div>

          <div className="grid gap-4 lg:col-span-7">
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#E9F2F7]/12">
              <Image
                src={NEXUS_EDITORIAL.sections.mobile}
                alt="Smartphone sobre mesa com teclado ao fundo (foto de demonstração)"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#E9F2F7]/12">
              <Image
                src={NEXUS_EDITORIAL.sections.teclado}
                alt="Teclado mecânico cream em fotografia de estúdio (demonstração)"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
