"use client";

import { BARBERIA } from "./data";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

interface BarberContactProps {
  className?: string;
}

export function BarberContact({ className }: BarberContactProps) {
  const whatsappUrl = BARBERIA.whatsappLink;
  const hasWhatsApp = Boolean(whatsappUrl);

  return (
    <section
      id="contato"
      className={`${className} py-20 sm:py-28 lg:pt-36 lg:pb-40 bg-[#1A1A1A]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Fale conosco
              </h2>
              <p className="mt-4 text-lg text-copper-soft leading-relaxed">
                Agende seu horário ou tire dúvidas pelos nossos canais de contato.
              </p>
            </div>

            <div className="space-y-4">
              <ContactRow
                icon={<Phone className="h-5 w-5" />}
                label="WhatsApp / Telefone"
                value={
                  hasWhatsApp
                    ? (BARBERIA.phone ?? "Configurar número")
                    : "Não configurado"
                }
                href={whatsappUrl ?? "#"}
                external={hasWhatsApp}
              />
              <ContactRow
                icon={<Mail className="h-5 w-5" />}
                label="E-mail"
                value={BARBERIA.email}
                href={`mailto:${BARBERIA.email}`}
                external
              />
              <ContactRow
                icon={<CameraIcon className="h-5 w-5" />}
                label="Instagram"
                value={BARBERIA.instagram}
                href={`https://www.instagram.com/${BARBERIA.instagram.replace("@", "")}`}
                external
              />
              <ContactRow
                icon={<MapPin className="h-5 w-5" />}
                label="Localização"
                value={`${BARBERIA.address} — ${BARBERIA.neighborhood}`}
                href="#"
                external={false}
              />
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-mono text-copper-soft">
                O número de contato deve ser configurado pelo responsável da barbearia antes de publicar. Enquanto não houver um número autorizado, o WhatsApp não estará disponível.
              </p>
            </div>
          </div>

          {/* CTA card */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-copper/40 bg-copper/5 p-8">
              <h3 className="font-bold text-white mb-2">Agende seu horário</h3>
              <p className="text-sm text-copper-soft mb-6">
                Chame pelo WhatsApp ou preencha o contato abaixo. Retornamos em breve.
              </p>
              {hasWhatsApp ? (
                <a
                  href={whatsappUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-copper text-[#1A1A1A] px-6 py-3 font-bold shadow-[0_0_20px_rgba(184,115,51,0.4)] hover:bg-copper-soft transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Abrir WhatsApp <ArrowRight className="h-3 w-3" />
                </a>
              ) : (
                <button
                  disabled
                  className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 text-copper-soft px-6 py-3 font-bold cursor-not-allowed opacity-60"
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

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 017.07 5.83L10 5h.5a2 2 0 012 2v2.17a2 2 0 001.164 1.543l.812 1.22A2 2 0 0115.07 15H17a2 2 0 012 2v1a2 2 0 01-2 2v1a2 2 0 01-2 2v1a2 2 0 01-2 2v-1H9v1a2 2 0 01-2 2v-1a2 2 0 01-2-2v-1a2 2 0 01-2-2H5a2 2 0 01-2-2V9z" />
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

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: ContactRowProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:border-copper/50 hover:bg-white/10 transition-colors text-left"
    >
      <div className="w-10 h-10 rounded-full border border-copper/30 bg-copper/5 flex items-center justify-center text-copper shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-mono text-copper-soft uppercase tracking-wider">
          {label}
        </span>
        <span className="text-sm font-medium text-white">{value}</span>
      </div>
      {external && <ArrowRight className="h-3 w-3 text-copper-soft ml-auto" />}
    </a>
  );
}
