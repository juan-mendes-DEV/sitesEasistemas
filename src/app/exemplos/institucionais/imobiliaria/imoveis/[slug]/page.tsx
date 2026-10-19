import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IMOBILIARIA, formatPreco, TIPO_LABEL } from "@/components/imobiliaria/data";
import { ImPageHeader } from "@/components/imobiliaria/imPageHeader";
import { ImPropertyDetail } from "@/components/imobiliaria/imPropertyDetail";

interface ImovelPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return IMOBILIARIA.imoveis.map((imovel) => ({ slug: imovel.slug }));
}

export async function generateMetadata({
  params,
}: ImovelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const imovel = IMOBILIARIA.imoveis.find((item) => item.slug === slug);

  if (!imovel) {
    return { title: "Imóvel não encontrado" };
  }

  const url = `https://codemaestro.tech/exemplos/institucionais/imobiliaria/imoveis/${imovel.slug}`;
  const description = `${TIPO_LABEL[imovel.tipo]} de demonstração com ${imovel.area} m², ${imovel.quartos} dormitórios e ${imovel.banheiros} banheiros — portfólio fictício da Altavista Imóveis.`;

  return {
    title: `${imovel.titulo} — imóvel de demonstração`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${imovel.titulo} — Altavista Imóveis (demonstração)`,
      description: `${description} Valor fictício: ${formatPreco(imovel.preco)}.`,
      url,
      type: "article",
      locale: "pt_BR",
    },
  };
}

export default async function ImovelDetalhePage({ params }: ImovelPageProps) {
  const { slug } = await params;
  const imovel = IMOBILIARIA.imoveis.find((item) => item.slug === slug);

  if (!imovel) {
    notFound();
  }

  return (
    <>
      <ImPageHeader
        eyebrow={`${TIPO_LABEL[imovel.tipo]} · ${imovel.identificador}`}
        title={imovel.titulo}
        description={`${imovel.area} m² · ${imovel.quartos} dormitórios · ${imovel.banheiros} banheiros · ${imovel.vagas} vagas — ficha demonstrativa com valor fictício de ${formatPreco(imovel.preco)}.`}
        current={imovel.titulo}
      />
      <ImPropertyDetail imovel={imovel} />
    </>
  );
}
