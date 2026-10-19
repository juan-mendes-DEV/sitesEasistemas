"use client";

import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { SALAO } from "./data";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4h10a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3z" />
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
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
      className="flex items-center gap-4 px-4 py-3 rounded-xl border border-[#E83E8C]/10 bg-white hover:border-[#E83E8C]/30 transition-colors text-left"
    >
      <div className="w-10 h-10 rounded-full border border-[#E83E8C]/20 bg-[#E83E8C]/5 flex items-center justify-center text-[#E83E8C] shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-mono text-[#111118]/40 uppercase tracking-wider">{label}</span>
        <span className="text-sm font-medium text-[#111118]">{value}</span>
      </div>
      {external && <ArrowRight className="h-3 w-3 text-[#111118]/30 ml-auto" />}
    </a>
  );
}

export function SalaoContact() {
  const whatsappUrl = SALAO.whatsappLink;
  const hasWhatsApp = Boolean(whatsappUrl);

  return (
    <section id="agendamento" className="py-20 sm:py-28 lg:pt-36 lg:pb-40 bg-[#111118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Agendamento
              </h2>
              <p className="mt-4 text-lg text-white/60 leading-relaxed">
                Agende seu horário pelos nossos canais de contato.
              </p>
            </div>

            <div className="space-y-4">
              <ContactRow
                icon={<Phone className="h-5 w-5" />}
                label="WhatsApp / Telefone"
                value={hasWhatsApp ? (SALAO.phone ?? "Configurar número") : "Não configurado"}
                href={whatsappUrl ?? "#"}
                external={hasWhatsApp}
              />
              <ContactRow
                icon={<Mail className="h-5 w-5" />}
                label="E-mail"
                value={SALAO.email}
                href={`mailto:${SALAO.email}`}
                external
              />
              <ContactRow
                icon={<InstagramIcon className="h-5 w-5" />}
                label="Instagram"
                value={SALAO.instagram}
                href={`https://www.instagram.com/${SALAO.instagram.replace("@", "")}`}
                external
              />
              <ContactRow
                icon={<MapPin className="h-5 w-5" />}
                label="Localização"
                value={`${SALAO.address} — ${SALAO.neighborhood}`}
                href="#"
                external={false}
              />
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-mono text-white/40">
                O número de contato deve ser configurado pelo responsável do salão antes de publicar.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-[#E83E8C]/30 bg-[#E83E8C]/5 p-8">
              <h3 className="font-bold text-white mb-2">Reserve seu horário</h3>
              <p className="text-sm text-white/60 mb-6">
                Chame pelo WhatsApp ou envie um e-mail para agendar seu atendimento.
              </p>
              {hasWhatsApp ? (
                <a
                  href={whatsappUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#E83E8C] text-white px-6 py-3 font-bold shadow-sm hover:bg-[#D12D7D] transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Abrir WhatsApp <ArrowRight className="h-3 w-3" />
                </a>
              ) : (
                <button
                  disabled
                  className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 text-white/40 px-6 py-3 font-bold cursor-not-allowed opacity-60"
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
