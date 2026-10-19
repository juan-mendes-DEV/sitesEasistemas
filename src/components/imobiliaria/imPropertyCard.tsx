import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Car, Ruler, ArrowUpRight } from "lucide-react";
import { formatPreco, TIPO_LABEL, type Imovel } from "./data";

interface ImPropertyCardProps {
  imovel: Imovel;
}

export function ImPropertyCard({ imovel }: ImPropertyCardProps) {
  return (
    <article className="group h-full bg-white border border-[#14243A]/10 rounded-sm overflow-hidden transition-all hover:border-[#B99A63] hover:shadow-xl">
      <Link
        href={`/exemplos/institucionais/imobiliaria/imoveis/${imovel.slug}`}
        className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A63]"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={imovel.imagem}
            alt={imovel.imagemAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#14243A]/90 text-[#B99A63] font-mono text-[10px] uppercase tracking-widest">
            {TIPO_LABEL[imovel.tipo]}
          </span>
          <span className="absolute top-3 right-3 px-2 py-1 bg-white/90 text-[#14243A] font-mono text-[10px] tracking-widest">
            {imovel.identificador}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-base font-bold text-[#14243A] leading-snug group-hover:text-[#B99A63] transition-colors">
            {imovel.titulo}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-[#353C45]/75 line-clamp-2">
            {imovel.descricao}
          </p>

          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#353C45]/80">
            <li className="flex items-center gap-1.5">
              <Ruler className="h-3.5 w-3.5 text-[#B99A63]" aria-hidden="true" />
              {imovel.area} m²
            </li>
            <li className="flex items-center gap-1.5">
              <BedDouble className="h-3.5 w-3.5 text-[#B99A63]" aria-hidden="true" />
              {imovel.quartos} quartos
            </li>
            <li className="flex items-center gap-1.5">
              <Bath className="h-3.5 w-3.5 text-[#B99A63]" aria-hidden="true" />
              {imovel.banheiros} banh.
            </li>
            <li className="flex items-center gap-1.5">
              <Car className="h-3.5 w-3.5 text-[#B99A63]" aria-hidden="true" />
              {imovel.vagas} vagas
            </li>
          </ul>

          <div className="mt-auto flex items-end justify-between gap-3 pt-5 border-t border-[#14243A]/10">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[#353C45]/55">
                Valor fictício
              </span>
              <span className="text-lg font-bold text-[#14243A]">
                {formatPreco(imovel.preco)}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#B99A63]">
              Ver detalhes
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
