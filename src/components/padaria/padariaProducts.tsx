"use client";

import Image from "next/image";
import { PADARIA } from "./data";

export function PadariaProducts() {
  return (
    <section id="cardapio" className="py-20 sm:py-28 lg:pt-36 lg:pb-40 bg-[#F7F0E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#35251C] tracking-tight">
            Cardápio
          </h2>
          <p className="mt-4 text-lg text-[#35251C]/70">
            Preços demonstrativos — a padaria Aurora é uma demonstração fictícia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PADARIA.products.map((product) => (
            <article
              key={product.name}
              className="group relative flex flex-col rounded-xl border border-[#35251C]/10 bg-[#FFFCF7] overflow-hidden hover:shadow-lg hover:shadow-[#B86B45]/10 transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop"
                  alt={product.name}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-[#F7F0E3]/90 backdrop-blur text-[10px] font-bold text-[#B86B45]">
                  {product.unit}
                </div>
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="text-lg font-bold text-[#35251C]">{product.name}</h3>
                <p className="text-sm text-[#35251C]/70 leading-relaxed flex-1">
                  {product.description}
                </p>
                <div className="mt-auto pt-3 flex items-end justify-between">
                  <span className="text-xl font-bold text-[#B86B45]">{product.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
