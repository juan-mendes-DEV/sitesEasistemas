import { Mail, MessageCircle, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagramIcon";
import { ENGENHARIA } from "./data";

export function EngContact() {
  const hasWhatsApp = ENGENHARIA.whatsappLink !== null;

  return (
    <section
      id="contato"
      className="bg-[#20252B] text-white py-20 sm:py-28"
      aria-labelledby="eng-contact-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#B77A4A]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#B77A4A]">
                Contato
              </span>
            </div>
            <h2
              id="eng-contact-title"
              className="mt-5 text-2xl sm:text-4xl font-bold tracking-tight leading-tight"
            >
              Vamos planejar sua próxima obra.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70 max-w-lg">
              Conte o escopo do seu projeto e retornamos com os próximos passos.
              Este é um canal externo configurável — o link de atendimento é
              definido na entrega do projeto.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {hasWhatsApp ? (
                <a
                  href={ENGENHARIA.whatsappLink ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B77A4A] text-white text-sm font-semibold rounded-sm hover:bg-[#C98D5E] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Falar no WhatsApp
                </a>
              ) : (
                <span className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-dashed border-white/25 text-white/50 text-sm font-semibold rounded-sm cursor-not-allowed">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp não configurado
                </span>
              )}
              <a
                href={`mailto:${ENGENHARIA.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/25 text-white text-sm font-semibold rounded-sm hover:border-[#B77A4A] hover:text-[#B77A4A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B77A4A] transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Enviar e-mail
              </a>
            </div>
            {!hasWhatsApp && (
              <p className="mt-3 font-mono text-[11px] text-white/40">
                Link de WhatsApp ainda não configurado — solicite a ativação ao
                contratante do site.
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-white/10 rounded-sm p-5">
              <h3 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#B77A4A]">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Localização
              </h3>
              <p className="mt-3 text-sm text-white/80">
                {ENGENHARIA.address}
              </p>
              <p className="text-xs text-white/45 mt-1">
                {ENGENHARIA.neighborhood} — endereço real não informado em
                demonstração.
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm text-white/80">
                <InstagramIcon className="h-3.5 w-3.5 text-[#B77A4A]" />
                {ENGENHARIA.instagram}
              </p>
            </div>

            <div className="border border-white/10 rounded-sm p-5">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#B77A4A]">
                Horários
              </h3>
              <dl className="mt-3 space-y-1.5">
                {ENGENHARIA.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-3 text-xs">
                    <dt className="text-white/60">{h.day}</dt>
                    <dd className="text-white/85 font-medium">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="sm:col-span-2 border-l-2 border-[#B77A4A] bg-white/5 text-xs leading-relaxed text-white/60 p-4">
              {ENGENHARIA.demoNotice}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
