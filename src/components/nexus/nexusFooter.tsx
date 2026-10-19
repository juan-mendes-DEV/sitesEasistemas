import Link from "next/link";
import { CopyrightYear } from "@/components/ecommerce/copyrightYear";
import { NEXUS_STORE } from "./data";

const BASE = NEXUS_STORE.route;

const LINKS = [
  { label: "Início", href: BASE },
  { label: "Catálogo", href: `${BASE}/produtos` },
  { label: "Comparador", href: `${BASE}/comparador` },
  { label: "Carrinho", href: `${BASE}/carrinho` },
  { label: "Checkout demonstrativo", href: `${BASE}/checkout` },
];

export function NexusFooter() {
  return (
    <footer className="border-t border-[#20C7D9]/25 bg-[#0B1220]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#E9F2F7]">
            NEXUS <span className="text-[#20C7D9]">Tech Store</span>
          </p>
          <p className="mt-2 text-sm text-[#20C7D9]">{NEXUS_STORE.slogan}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#E9F2F7]/65">
            Loja de demonstração da Code Maestro Tech para apresentar um
            e-commerce de eletrônicos completo, com fichas técnicas fictícias e
            comparador local.
          </p>
        </div>

        <nav aria-label="Links do rodapé da NEXUS Tech Store">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#20C7D9]">
            Navegação
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-[#E9F2F7]/75">
            {LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#20C7D9] focus-visible:outline-[#20C7D9]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#20C7D9]">
            Sobre esta demonstração
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-[#E9F2F7]/75">
            <li>Marcas, modelos e especificações são inventados.</li>
            <li>Preços, estoques e pedidos são fictícios.</li>
            <li>Nenhum pagamento é processado no checkout.</li>
            <li>Comparador e carrinho ficam apenas neste navegador.</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#E9F2F7]/10 py-5 text-center text-xs text-[#E9F2F7]/50">
        © <CopyrightYear /> NEXUS Tech Store — conceito demonstrativo ·
        Code Maestro Tech
      </div>
    </footer>
  );
}
