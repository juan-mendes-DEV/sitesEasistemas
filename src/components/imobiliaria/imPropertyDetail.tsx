import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Car,
  Ruler,
  MessageCircle,
  Mail,
} from "lucide-react";
import { formatPreco, TIPO_LABEL, type Imovel } from "./data";
import { IMOBILIARIA } from "./data";

interface ImPropertyDetailProps {
  imovel: Imovel;
}

export function ImPropertyDetail({ imovel }: ImPropertyDetailProps) {
  const hasWhatsApp = IMOBILIARIA.whatsappLink !== null;
  const especificacoes = [
    { icon: Ruler, label: "Área", value: `${imovel.area} m²` },
    { icon: BedDouble, label: "Dormitórios", value: String(imovel.quartos) },
    { icon: Bath, label: "Banheiros", value: String(imovel.banheiros) },
    { icon: Car, label: "Vagas", value: String(imovel.vagas) },
  ];

  return (
    <article className="bg-[#EDE4D6] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/exemplos/institucionais/imobiliaria/imoveis"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#353C45] hover:text-[#B99A63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A63] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Voltar para o portfólio
        </Link>

        <header className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 border-b border-[#14243A]/15 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 bg-[#14243A] text-[#B99A63] font-mono text-[10px] uppercase tracking-widest">
                {TIPO_LABEL[imovel.tipo]}
              </span>
              <span className="px-2.5 py-1 border border-[#14243A]/20 text-[#353C45] font-mono text-[10px] tracking-widest">
                Identificador {imovel.identificador}
              </span>
            </div>
            <h1 className="mt-4 text-2xl sm:text-4xl font-medium text-[#14243A] tracking-tight">
              {imovel.titulo}
            </h1>
            <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-[#353C45]/80">
              {imovel.descricao}
            </p>
          </div>

          <div className="lg:text-right shrink-0">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-[#353C45]/55">
              Valor fictício
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-[#14243A]">
              {formatPreco(imovel.preco)}
            </span>
          </div>
        </header>

        <div className="mt-8 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-[#14243A]/10 bg-white">
              <Image
                src={imovel.imagem}
                alt={imovel.imagemAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-4">
              {imovel.galeria.map((foto) => (
                <li
                  key={foto.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-sm border border-[#14243A]/10 bg-white"
                >
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-[#353C45]/50">
              Galeria ilustrativa — imagens de demonstração, não do imóvel real
            </p>
          </div>

          <aside className="lg:col-span-4" aria-labelledby="im-ficha-title">
            <div className="rounded-sm border border-[#14243A]/10 bg-white p-6">
              <h2
                id="im-ficha-title"
                className="font-mono text-[10px] uppercase tracking-widest text-[#B99A63]"
              >
                Ficha técnica
              </h2>
              <dl className="mt-4 grid grid-cols-2 gap-4">
                {especificacoes.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-sm bg-[#EDE4D6]/70 p-3"
                  >
                    <dt className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-[#353C45]/65">
                      <spec.icon className="h-3.5 w-3.5 text-[#B99A63]" aria-hidden="true" />
                      {spec.label}
                    </dt>
                    <dd className="mt-1 text-base font-bold text-[#14243A]">
                      {spec.value}
                    </dd>
                  </div>
                ))}
                <div className="col-span-2 rounded-sm bg-[#EDE4D6]/70 p-3">
                  <dt className="text-[10px] uppercase tracking-wide text-[#353C45]/65">
                    Tipo
                  </dt>
                  <dd className="mt-1 text-base font-bold text-[#14243A]">
                    {TIPO_LABEL[imovel.tipo]}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-col gap-2">
                {hasWhatsApp ? (
                  <a
                    href={IMOBILIARIA.whatsappLink ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#14243A] text-white text-sm font-semibold rounded-sm hover:bg-[#B99A63] hover:text-[#14243A] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Tenho interesse
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-dashed border-[#14243A]/25 text-[#14243A]/50 text-sm font-semibold rounded-sm cursor-not-allowed">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Contato não configurado
                  </span>
                )}
                <a
                  href={`mailto:${IMOBILIARIA.email}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#14243A]/20 text-[#14243A] text-sm font-semibold rounded-sm hover:border-[#B99A63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A63] transition-colors"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Enviar e-mail
                </a>
                <Link
                  href="/exemplos/institucionais/imobiliaria/contato"
                  className="text-center text-xs font-semibold text-[#B99A63] hover:text-[#14243A] mt-1 transition-colors"
                >
                  Ver canais de atendimento
                </Link>
              </div>
            </div>

            <p className="mt-4 border-l-2 border-[#B99A63] bg-white text-xs leading-relaxed text-[#353C45]/75 p-4">
              {IMOBILIARIA.demoNotice}
            </p>
          </aside>
        </div>
      </div>
    </article>
  );
}
