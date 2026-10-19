import Link from "next/link";
import { Leaf } from "lucide-react";
import { CopyrightYear } from "@/components/ecommerce/copyrightYear";
import { BOTANICA_NOTICE, BOTANICA_STORE } from "./data";

const BASE = BOTANICA_STORE.route;

const LINKS = [
  { label: "Início", href: BASE },
  { label: "Catálogo", href: `${BASE}/produtos` },
  { label: "Carrinho", href: `${BASE}/carrinho` },
  { label: "Checkout demonstrativo", href: `${BASE}/checkout` },
];

export function BotanicaFooter() {
  return (
    <footer className="border-t border-[#3F5748]/20 bg-[#3F5748] text-[#FAF8F2]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em]">
            <Leaf className="h-4 w-4 text-[#C7A88A]" aria-hidden="true" />
            Botânica Essence
          </p>
          <p className="mt-2 text-sm italic text-[#C7A88A]">
            {BOTANICA_STORE.slogan}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#FAF8F2]/70">
            Loja de demonstração da Code Maestro Tech para apresentar um
            e-commerce de cosméticos com catálogo, kits e carrinho funcionais.
          </p>
        </div>

        <nav aria-label="Links do rodapé da Botânica Essence">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C7A88A]">
            Navegação
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-[#FAF8F2]/80">
            {LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#C7A88A] focus-visible:outline-[#C7A88A]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C7A88A]">
            Sobre esta demonstração
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-[#FAF8F2]/80">
            <li>Produtos, preços e estoques são fictícios.</li>
            <li>Nenhum pagamento é processado no checkout.</li>
            <li>{BOTANICA_NOTICE}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#FAF8F2]/12 py-5 text-center text-xs text-[#FAF8F2]/55">
        © <CopyrightYear /> Botânica Essence — conceito demonstrativo ·
        Code Maestro Tech
      </div>
    </footer>
  );
}
