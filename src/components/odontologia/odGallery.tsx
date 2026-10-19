import Image from "next/image";
import { ODONTOLOGIA } from "./data";

interface OdGalleryProps {
  id?: string;
}

export function OdGallery({ id }: OdGalleryProps) {
  return (
    <section
      id={id}
      className="bg-white py-20 sm:py-28"
      aria-labelledby="od-gallery-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#8FC9C1]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#174B57]/60">
              Estrutura
            </span>
          </div>
          <h2
            id="od-gallery-title"
            className="mt-4 text-2xl sm:text-4xl font-bold text-[#174B57] tracking-tight"
          >
            Ambientes pensados para a calma
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#353C45]/75">
            Galeria demonstrativa dos espaços da clínica — imagens ilustrativas
            que representam o formato da página de estrutura.
          </p>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {ODONTOLOGIA.structure.map((item, index) => (
            <li
              key={item.src}
              className={`${index === 0 ? "col-span-2 lg:col-span-2" : ""}`}
            >
              <figure className="group relative overflow-hidden rounded-2xl border border-[#174B57]/10">
                <div
                  className={`relative w-full ${
                    index === 0 ? "aspect-[16/10]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 640px) 50vw, 33vw"
                    }
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#174B57]/85 to-transparent px-4 pb-3 pt-8 text-xs font-medium text-white">
                  {item.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <p className="mt-8 border-l-2 border-[#8FC9C1] bg-[#F3F7F7] p-4 text-xs leading-relaxed text-[#19353D]/70">
          {ODONTOLOGIA.demoNotice}
        </p>
      </div>
    </section>
  );
}
