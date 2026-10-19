"use client";

import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { PADARIA } from "./data";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4h10a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3z" />
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function PadariaContact() {
  const whatsappUrl = PADARIA.whatsappLink;
  const hasWhatsApp = Boolean(whatsappUrl);

  return (
    <section id="contato" className="py-20 sm:py-28 lg:pt-36 lg:pb-40 bg-[#F7F0E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#35251C] tracking-tight">
                Fale conosco
              </h2>
              <p className="mt-4 text-lg text-[#35251C]/70 leading-relaxed">
                Entre em contato para encomendas, dúvidas ou sugestões.
              </p>
            </div>

            <div className="space-y-4">
              <ContactRow
                icon={<Phone className="h-5 w-5" />}
                label="WhatsApp / Telefone"
                value={hasWhatsApp ? (PADARIA.phone ?? "Configurar número") : "Não configurado"}
                href={whatsappUrl ?? "#"}
                external={hasWhatsApp}
              />
              <ContactRow
                icon={<Mail className="h-5 w-5" />}
                label="E-mail"
                value={PADARIA.email}
                href={`mailto:${PADARIA.email}`}
                external
              />
              <ContactRow
                icon={<InstagramIcon className="h-5 w-5" />}
                label="Instagram"
                value={PADARIA.instagram}
                href={`https://www.instagram.com/${PADARIA.instagram.replace("@", "")}`}
                external
              />
              <ContactRow
                icon={<MapPin className="h-5 w-5" />}
                label="Localização"
                value={`${PADARIA.address} — ${PADARIA.neighborhood}`}
                href="#"
                external={false}
              />
            </div>

            <div className="pt-4 border-t border-[#35251C]/10">
              <p className="text-xs font-mono text-[#35251C]/40">
                O número de contato deve ser configurado pelo responsável da padaria antes de publicar.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-[#B86B45]/30 bg-[#B86B45]/5 p-8">
              <h3 className="font-bold text-[#35251C] mb-2">Encomendas e contato</h3>
              <p className="text-sm text-[#35251C]/70 mb-6">
                Chame pelo WhatsApp ou envie um e-mail. Retornamos em breve.
              </p>
              {hasWhatsApp ? (
                <a
                  href={whatsappUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#B86B45] text-[#F7F0E3] px-6 py-3 font-bold shadow-sm hover:bg-[#A05A38] transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Abrir WhatsApp <ArrowRight className="h-3 w-3" />
                </a>
              ) : (
                <button
                  disabled
                  className="flex items-center gap-2 rounded-full bg-[#35251C]/5 border border-[#35251C]/10 text-[#35251C]/40 px-6 py-3 font-bold cursor-not-allowed opacity-60"
                >
                  <Phone className="h-4 w-4" />
                  WhatsApp não configurado
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ContactRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external: boolean;
}

function ContactRow({ icon, label, value, href, external }: ContactRowProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 px-4 py-3 rounded-xl border border-[#35251C]/10 bg-[#FFFCF7] hover:border-[#B86B45]/30 transition-colors text-left"
    >
      <div className="w-10 h-10 rounded-full border border-[#B86B45]/20 bg-[#B86B45]/5 flex items-center justify-center text-[#B86B45] shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-mono text-[#35251C]/40 uppercase tracking-wider">{label}</span>
        <span className="text-sm font-medium text-[#35251C]">{value}</span>
      </div>
      {external && <ArrowRight className="h-3 w-3 text-[#35251C]/30 ml-auto" />}
    </a>
  );
}
