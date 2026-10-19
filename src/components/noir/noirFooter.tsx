import Link from "next/link";
import { CopyrightYear } from "@/components/ecommerce/copyrightYear";
import { NOIR_STORE } from "./data";

const BASE = NOIR_STORE.route;

const LINKS = [
  { label: "Início", href: BASE },
  { label: "Catálogo", href: `${BASE}/produtos` },
  { label: "Favoritos", href: `${BASE}/favoritos` },
  { label: "Carrinho", href: `${BASE}/carrinho` },
  { label: "Checkout demonstrativo", href: `${BASE}/checkout` },
];

export function NoirFooter() {
  return (
    <footer className="border-t border-[#A99A86]/25 bg-[#111111] text-[#F2EFE9]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-black tracking-[0.3em]">NOIR STUDIO</p>
          <p className="mt-2 text-sm italic text-[#A99A86]">
            {NOIR_STORE.slogan}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#F2EFE9]/65">
            Loja de demonstração da Code Maestro Tech para apresentar o
            funcionamento de um e-commerce completo antes da contratação.
          </p>
        </div>

        <nav aria-label="Links do rodapé da NOIR Studio">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#A99A86]">
            Navegação
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-[#F2EFE9]/75">
            {LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#A99A86] focus-visible:outline-[#A99A86]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#A99A86]">
            Sobre esta demonstração
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-[#F2EFE9]/75">
            <li>Produtos, preços e estoques são fictícios.</li>
            <li>Nenhum pagamento é processado no checkout.</li>
            <li>Nenhum dado pessoal é solicitado ou armazenado.</li>
            <li>Favoritos e carrinho ficam apenas neste navegador.</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#F2EFE9]/10 py-5 text-center text-xs text-[#F2EFE9]/50">
        © <CopyrightYear /> NOIR Studio — conceito demonstrativo ·
        Code Maestro Tech
      </div>
    </footer>
  );
}
