import { MetadataRoute } from "next";
import { PROJECTS, getProjectBySlug } from "@/lib/catalog";
import { IMOBILIARIA } from "@/components/imobiliaria/data";
import { NOIR_PRODUCTS } from "@/components/noir/data";
import { NEXUS_PRODUCTS } from "@/components/nexus/data";
import { BOTANICA_PRODUCTS } from "@/components/botanica/data";

const SUBROTAS: Record<string, string[]> = {
  engenharia: ["sobre", "servicos", "projetos", "contato"],
  odontologia: ["sobre", "especialidades", "estrutura", "contato"],
  imobiliaria: ["sobre", "imoveis", "contato"],
  moda: ["produtos"],
  eletronicos: ["produtos"],
  cosmeticos: ["produtos"],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://codemaestrotech.com.br";

  const rota = (url: string, priority: number) => ({
    url: `${base}${url}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority,
  });

  const routes: MetadataRoute.Sitemap = [rota("/", 1)];

  for (const project of PROJECTS) {
    routes.push(rota(project.route, 0.8));

    const subrotas = SUBROTAS[project.slug];
    if (subrotas && getProjectBySlug(project.slug)) {
      for (const sub of subrotas) {
        routes.push(rota(`${project.route}/${sub}`, 0.6));
      }
    }
  }

  // Detalhes de imóveis (páginas estáticas por slug)
  const imobiliaria = getProjectBySlug("imobiliaria");
  if (imobiliaria) {
    for (const imovel of IMOBILIARIA.imoveis) {
      routes.push(rota(`${imobiliaria.route}/imoveis/${imovel.slug}`, 0.5));
    }
  }

  // Detalhes de produtos das lojas demonstrativas (carrinho, checkout,
  // favoritos e estados vazios do comparador ficam fora do sitemap)
  const lojas = [
    { slug: "moda", produtos: NOIR_PRODUCTS },
    { slug: "eletronicos", produtos: NEXUS_PRODUCTS },
    { slug: "cosmeticos", produtos: BOTANICA_PRODUCTS },
  ];
  for (const loja of lojas) {
    const projeto = getProjectBySlug(loja.slug);
    if (!projeto) continue;
    for (const product of loja.produtos) {
      routes.push(rota(`${projeto.route}/produtos/${product.slug}`, 0.5));
    }
  }

  return routes;
}
