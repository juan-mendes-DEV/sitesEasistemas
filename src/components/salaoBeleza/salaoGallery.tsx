"use client";

import Image from "next/image";

const GALLERY_IMAGES = [
  {
    id: "salao-gal-1",
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
    alt: "Interior elegante do salão Maison Belle",
  },
  {
    id: "salao-gal-2",
    src: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop",
    alt: "Profissional trabalhando em salão de beleza",
  },
  {
    id: "salao-gal-3",
    src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop",
    alt: "Detalhes de cabelo e maquiagem profissional",
  },
  {
    id: "salao-gal-4",
    src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop",
    alt: "Ambiente acolhedor do salão de beleza",
  },
];

export function SalaoGallery() {
  return (
    <section id="galeria" className="py-20 sm:py-28 lg:pt-36 lg:pb-40 bg-[#F7EAF1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111118] tracking-tight">
            Galeria
          </h2>
          <p className="mt-4 text-lg text-[#111118]/60">
            Um olhar sobre nosso espaço e nossos trabalhos.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((img) => (
            <figure
              key={img.id}
              className="group relative rounded-xl overflow-hidden border border-[#E83E8C]/10 aspect-square cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#111118]/0 group-hover:bg-[#111118]/40 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                <span className="text-xs font-mono text-white">Maison Belle</span>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
