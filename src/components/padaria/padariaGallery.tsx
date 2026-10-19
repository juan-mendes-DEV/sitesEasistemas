"use client";

import Image from "next/image";

const GALLERY_IMAGES = [
  {
    id: "pad-gal-1",
    src: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=800&auto=format&fit=crop",
    alt: "Pães artesanais em exibição na Padaria Aurora",
  },
  {
    id: "pad-gal-2",
    src: "https://images.unsplash.com/photo-1556217477-d325251ece38?q=80&w=800&auto=format&fit=crop",
    alt: "Processo artesanal de preparação de pães",
  },
  {
    id: "pad-gal-3",
    src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop",
    alt: "Frescor diário dos produtos da padaria",
  },
  {
    id: "pad-gal-4",
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    alt: "Bancada de produtos artesanais",
  },
];

export function PadariaGallery() {
  return (
    <section id="galeria" className="py-20 sm:py-28 lg:pt-36 lg:pb-40 bg-[#F7F0E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#35251C] tracking-tight">
            Galeria
          </h2>
          <p className="mt-4 text-lg text-[#35251C]/70">
            Um olhar sobre nossos produtos e nosso espaço.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((img) => (
            <figure
              key={img.id}
              className="group relative rounded-xl overflow-hidden border border-[#35251C]/10 aspect-square cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#35251C]/0 group-hover:bg-[#35251C]/30 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                <span className="text-xs font-mono text-white">Padaria Aurora</span>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
