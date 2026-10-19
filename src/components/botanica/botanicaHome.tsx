import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck } from "lucide-react";
import { formatBRL } from "@/lib/ecommerce/format";
import {
  BOTANICA_CATEGORIES,
  BOTANICA_EDITORIAL,
  BOTANICA_NOTICE,
  BOTANICA_PRODUCTS,
  BOTANICA_STORE,
} from "./data";
import { BotanicaProductCard } from "./botanicaProductCard";

const BASE = BOTANICA_STORE.route;
const destaques = BOTANICA_PRODUCTS.filter(
  (item) => item.category !== "kits",
).slice(0, 6);
const kits = BOTANICA_PRODUCTS.filter((item) => item.category === "kits");

export function BotanicaHome() {
  return (
    <div>
      {/* Hero */}
      <section aria-labelledby="botanica-hero-titulo" className="border-b border-[#3F5748]/15">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C7A88A]">
              Coleção demonstrativa · Ingredientes ilustrativos
            </p>
            <h1
              id="botanica-hero-titulo"
              className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-[#3F5748] sm:text-5xl lg:text-[3.4rem]"
            >
              Beleza que floresce{" "}
              <span className="font-normal italic text-[#493F36]">
                naturalmente.
              </span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#493F36]/75 lg:text-base">
              Hidratantes, séruns, sabonetes, óleos e kits de autocuidado em
              uma loja de demonstração: busca, filtros, ingredientes
              demonstrativos, carrinho isolado e checkout fictício.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`${BASE}/produtos`}
                className="inline-flex items-center gap-2 bg-[#3F5748] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FAF8F2] transition-colors hover:bg-[#493F36] focus-visible:outline-[#C7A88A]"
              >
                Explorar catálogo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#botanica-kits"
                className="inline-flex items-center gap-2 border border-[#3F5748]/40 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3F5748] transition-colors hover:border-[#3F5748] focus-visible:outline-[#C7A88A]"
              >
                <Leaf className="h-4 w-4" aria-hidden="true" />
                Ver kits
              </a>
            </div>
            <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-[#493F36]/60">
              <ShieldCheck
                className="mt-0.5 h-4 w-4 shrink-0 text-[#3F5748]"
                aria-hidden="true"
              />
              Sem alegações médicas ou de eficácia: fórmulas e volumes são
              fictícios e nada é cobrado nesta demonstração.
            </p>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#3F5748]/15 lg:col-span-6 lg:aspect-auto lg:min-h-[30rem]">
            <Image
              src={BOTANICA_EDITORIAL.heroImage}
              alt="Frasco âmbar com conta-gotas e sombras botânicas em fotografia de demonstração"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 bg-[#3F5748]/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#FAF8F2]">
              Linha fictícia 2026
            </span>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section aria-labelledby="botanica-categorias-titulo" className="border-b border-[#3F5748]/15">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="botanica-categorias-titulo"
              className="text-lg font-semibold uppercase tracking-[0.25em] text-[#3F5748]"
            >
              Categorias
            </h2>
            <Link
              href={`${BASE}/produtos`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#3F5748] underline underline-offset-4 hover:text-[#493F36] focus-visible:outline-[#C7A88A]"
            >
              Ver tudo
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-7 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 lg:grid-cols-5">
            {BOTANICA_CATEGORIES.map((categoria, indice) => {
              const total = BOTANICA_PRODUCTS.filter(
                (item) => item.category === categoria.id,
              );
              const menor = Math.min(...total.map((item) => item.price));
              return (
                <li key={categoria.id}>
                  <Link
                    href={`${BASE}/produtos`}
                    className="group flex h-full min-h-32 flex-col justify-between border border-[#3F5748]/15 bg-[#E8E1D3]/50 p-4 transition-colors hover:border-[#3F5748] focus-visible:outline-[#C7A88A] sm:min-h-40"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#C7A88A]">
                      0{indice + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold uppercase tracking-[0.1em] text-[#3F5748]">
                        {categoria.label}
                      </span>
                      <span className="mt-1 block text-xs text-[#493F36]/70">
                        a partir de {formatBRL(menor)}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 self-end text-[#C7A88A] transition-transform group-hover:translate-x-1"
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
      <section aria-labelledby="botanica-destaques-titulo" className="border-b border-[#3F5748]/15">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2
                id="botanica-destaques-titulo"
                className="text-lg font-semibold uppercase tracking-[0.25em] text-[#3F5748]"
              >
                Ritual em destaque
              </h2>
              <p className="mt-2 text-sm text-[#493F36]/70">
                Seis itens da linha fictícia, com volumes e ingredientes
                demonstrativos.
              </p>
            </div>
            <Link
              href={`${BASE}/produtos`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#3F5748] underline underline-offset-4 hover:text-[#493F36] focus-visible:outline-[#C7A88A]"
            >
              Catálogo completo
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-7 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {destaques.map((product) => (
              <li key={product.id} className="h-full">
                <BotanicaProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kits */}
      <section id="botanica-kits" aria-labelledby="botanica-kits-titulo" className="border-b border-[#3F5748]/15">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2
            id="botanica-kits-titulo"
            className="text-lg font-semibold uppercase tracking-[0.25em] text-[#3F5748]"
          >
            Kits de autocuidado
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#493F36]/70">
            Conjuntos demonstrativos com o conteúdo listado item a item — o que
            você vê é exatamente o que a ficha declara.
          </p>
          <ul className="mt-7 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {kits.map((product) => (
              <li key={product.id} className="h-full">
                <BotanicaProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Essência */}
      <section id="essencia" aria-labelledby="botanica-essencia-titulo">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#3F5748]/15 lg:col-span-7">
            <Image
              src={BOTANICA_EDITORIAL.sections.spa}
              alt="Momento de autocuidado com toalha, óleos e velas (fotografia de demonstração)"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C7A88A]">
              Nossa essência (demonstração)
            </p>
            <h2
              id="botanica-essencia-titulo"
              className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-[#3F5748] sm:text-3xl"
            >
              Um ritual simples, sem promessas
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[#493F36]/75">
              A Botânica Essence é um conceito de marca criado pela Code
              Maestro Tech para demonstrar vitrine de cosméticos: catálogo
              com busca e filtros, fichas com ingredientes ilustrativos, kits
              com conteúdo declarado e carrinho funcional.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4 border-t border-[#3F5748]/15 pt-6">
              <div className="relative aspect-square overflow-hidden border border-[#3F5748]/15">
                <Image
                  src={BOTANICA_EDITORIAL.sections.vela}
                  alt="Vela decorativa em composição aconchegante (demonstração)"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center border border-[#3F5748]/15 bg-[#E8E1D3]/50 p-4">
                <Leaf className="h-5 w-5 text-[#3F5748]" aria-hidden="true" />
                <p className="mt-3 text-xs leading-relaxed text-[#493F36]/75">
                  {BOTANICA_NOTICE}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
