import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, ShieldCheck } from "lucide-react";
import { formatBRL } from "@/lib/ecommerce/format";
import { NOIR_CATEGORIES, NOIR_EDITORIAL, NOIR_PRODUCTS, NOIR_STORE } from "./data";
import { NoirProductCard } from "./noirProductCard";

const BASE = NOIR_STORE.route;
const destaques = NOIR_PRODUCTS.slice(0, 6);

export function NoirHome() {
  return (
    <div>
      {/* Hero editorial assimétrico */}
      <section aria-labelledby="noir-hero-titulo" className="border-b border-[#111111]/12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#666666]">
              Coleção demonstrativa · Sem login
            </p>
            <h1
              id="noir-hero-titulo"
              className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight text-[#111111] sm:text-5xl lg:text-6xl"
            >
              Vista sua
              <br />
              identidade.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#666666] lg:text-base">
              Moda contemporânea e streetwear premium em uma loja de
              demonstração: catálogo com busca, variantes, favoritos locais,
              carrinho isolado e checkout fictício.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`${BASE}/produtos`}
                className="inline-flex items-center gap-2 bg-[#111111] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F2EFE9] transition-colors hover:bg-[#666666] focus-visible:outline-[#A99A86]"
              >
                Explorar coleção
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={`${BASE}/favoritos`}
                className="inline-flex items-center gap-2 border border-[#111111]/25 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#111111] transition-colors hover:border-[#111111] focus-visible:outline-[#A99A86]"
              >
                <Heart className="h-4 w-4" aria-hidden="true" />
                Meus favoritos
              </Link>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-[#666666]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Preços, estoques e pedidos são fictícios — nada é cobrado.
            </p>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#111111]/12 lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]">
            <Image
              src={NOIR_EDITORIAL.heroImage}
              alt="Editorial de moda urbana em composição de demonstração da NOIR Studio"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 bg-[#111111]/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[#F2EFE9]">
              Campanha fictícia 2026
            </span>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section
        aria-labelledby="noir-categorias-titulo"
        className="border-b border-[#111111]/12"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="noir-categorias-titulo"
              className="text-lg font-black uppercase tracking-[0.28em] text-[#111111]"
            >
              Categorias
            </h2>
            <Link
              href={`${BASE}/produtos`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#111111] underline underline-offset-4 hover:text-[#666666] focus-visible:outline-[#A99A86]"
            >
              Ver tudo
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-7 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 lg:grid-cols-5">
            {NOIR_CATEGORIES.map((categoria, indice) => {
              const total = NOIR_PRODUCTS.filter(
                (item) => item.category === categoria.id,
              );
              const menor = Math.min(...total.map((item) => item.price));
              return (
                <li key={categoria.id}>
                  <Link
                    href={`${BASE}/produtos`}
                    className="group flex h-full min-h-32 flex-col justify-between border border-[#111111]/15 bg-white p-4 transition-colors hover:border-[#111111] focus-visible:outline-[#A99A86] sm:min-h-40"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#666666]">
                      0{indice + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-bold uppercase tracking-[0.12em] text-[#111111]">
                        {categoria.label}
                      </span>
                      <span className="mt-1 block text-xs text-[#666666]">
                        a partir de {formatBRL(menor)}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 self-end text-[#A99A86] transition-transform group-hover:translate-x-1"
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
      <section
        aria-labelledby="noir-destaques-titulo"
        className="border-b border-[#111111]/12"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2
                id="noir-destaques-titulo"
                className="text-lg font-black uppercase tracking-[0.28em] text-[#111111]"
              >
                Seleção da casa
              </h2>
              <p className="mt-2 text-sm text-[#666666]">
                Seis peças da coleção fictícia — variantes com estoque de
                demonstração.
              </p>
            </div>
            <Link
              href={`${BASE}/produtos`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#111111] underline underline-offset-4 hover:text-[#666666] focus-visible:outline-[#A99A86]"
            >
              Catálogo completo
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-7 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {destaques.map((product) => (
              <li key={product.id} className="h-full">
                <NoirProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Editorial assimétrico */}
      <section aria-labelledby="noir-manifesto-titulo" className="border-b border-[#111111]/12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#111111]/12 lg:col-span-7">
            <Image
              src={NOIR_EDITORIAL.sections.editorial}
              alt="Ensaio editorial de demonstração com compras e styling urbano"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A99A86]">
              Manifesto
            </p>
            <h2
              id="noir-manifesto-titulo"
              className="mt-4 text-2xl font-black uppercase leading-tight tracking-tight text-[#111111] sm:text-3xl"
            >
              Peças que falam por você
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[#666666]">
              A NOIR Studio é um conceito de marca criado pela Code Maestro Tech
              para demonstrar vitrine, busca, filtros, variantes e carrinho em
              um e-commerce de moda — tudo funcional, nada real.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4 border-t border-[#111111]/12 pt-6">
              <div className="relative aspect-square overflow-hidden border border-[#111111]/12">
                <Image
                  src={NOIR_EDITORIAL.sections.arara}
                  alt="Arara neutra com roupas claras em fotografia de estúdio (demonstração)"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden border border-[#111111]/12">
                <Image
                  src={NOIR_EDITORIAL.sections.camisas}
                  alt="Camisas penduradas em tons verdes na coleção fictícia"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section aria-labelledby="noir-como-titulo">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2
            id="noir-como-titulo"
            className="text-lg font-black uppercase tracking-[0.28em] text-[#111111]"
          >
            Como esta loja funciona
          </h2>
          <ul className="mt-7 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                titulo: "Catálogo com busca",
                texto: "Filtre por categoria e ordene por preço ou nome, tudo no navegador.",
              },
              {
                titulo: "Variantes reais",
                texto: "Tamanho e cor definem a linha do carrinho e o estoque exibido.",
              },
              {
                titulo: "Favoritos locais",
                texto: "Salvos neste navegador, sem cadastro, e-mail ou senha.",
              },
              {
                titulo: "Checkout fictício",
                texto: "Nenhum cartão, CPF ou endereço: só um pedido de demonstração.",
              },
            ].map((item) => (
              <li
                key={item.titulo}
                className="border border-[#111111]/15 bg-white p-5"
              >
                <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#111111]">
                  {item.titulo}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#666666]">
                  {item.texto}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
