"use client";

import Image from "next/image";

interface BarberGalleryProps {
  className?: string;
}

const GALLERY_ITEMS = [
  {
    id: "gal-1",
    src: "/imgs/barbe02.jpg",
    alt: "Cadeira de barbeiro vintage com espelho na barbearia Ferro & Navalha",
    width: 800,
    height: 1000,
  },
  {
    id: "gal-2",
    src: "/imgs/barbe03.jpg",
    alt: "Ferramentas de barbearia navalha e pincel sobre superfície de madeira",
    width: 800,
    height: 1000,
  },
  {
    id: "gal-3",
    src: "/imgs/barbe04.jpg",
    alt: "Interior da barbearia com iluminação quente e espelhos",
    width: 800,
    height: 1000,
  },
  {
    id: "gal-4",
    src: "/imgs/barbe01.jpg",
    alt: "Barbeiro trabalhando com navalha em cliente",
    width: 800,
    height: 1000,
  },
];

export function BarberGallery({ className }: BarberGalleryProps) {
  return (
    <section
      id="galeria"
      className={`${className} py-20 sm:py-28 lg:pt-36 lg:pb-40 bg-[#1A1A1A]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Galeria
            </h2>
            <p className="mt-2 text-sm text-copper-soft">
              Ambiente, técnicas e atendimento
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_ITEMS.map((item) => (
            <figure
              key={item.id}
              className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 aspect-square cursor-pointer hover:border-copper/50 transition-colors"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs font-mono text-white opacity-80">
                  Ferro &amp; Navalha
                </span>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
