import type { Metadata } from "next";
import { NoirFavorites } from "@/components/noir/noirFavorites";

const url = "https://codemaestro.tech/exemplos/ecommerce/moda/favoritos";

export const metadata: Metadata = {
  title: "Favoritos NOIR Studio — lista local de demonstração",
  description:
    "Lista de favoritos guardada apenas no navegador desta demonstração, sem cadastro ou login. Loja fictícia da Code Maestro Tech.",
  alternates: { canonical: url },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Favoritos NOIR Studio (demonstração)",
    description: "Lista local de favoritos sem login em loja de demonstração.",
    url,
    type: "website",
    locale: "pt_BR",
  },
};

export default function NoirFavoritosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#666666]">
          Sem login · apenas neste navegador
        </p>
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#111111] sm:text-4xl">
          Meus favoritos
        </h1>
      </header>
      <NoirFavorites />
    </div>
  );
}
