import { Mail, MessageCircle, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagramIcon";
import { IMOBILIARIA } from "./data";

export function ImContact() {
  const hasWhatsApp = IMOBILIARIA.whatsappLink !== null;

  return (
    <section
      id="contato"
      className="bg-[#14243A] text-white py-20 sm:py-28"
      aria-labelledby="im-contact-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#B99A63]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#B99A63]">
                Contato
              </span>
            </div>
            <h2
              id="im-contact-title"
              className="mt-5 text-2xl sm:text-4xl font-medium tracking-tight leading-tight"
            >
              Encontre o imóvel do seu próximo capítulo.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/75 max-w-lg">
              Fale com a equipe por um canal externo configurável — o link de
              atendimento é definido na entrega do projeto. Os imóveis desta
              página são demonstrativos.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {hasWhatsApp ? (
                <a
                  href={IMOBILIARIA.whatsappLink ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B99A63] text-[#14243A] text-sm font-semibold rounded-sm hover:bg-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Falar com um consultor
                </a>
              ) : (
                <span className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-dashed border-white/30 text-white/50 text-sm font-semibold rounded-sm cursor-not-allowed">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp não configurado
                </span>
              )}
              <a
                href={`mailto:${IMOBILIARIA.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/30 text-white text-sm font-semibold rounded-sm hover:border-[#B99A63] hover:text-[#B99A63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A63] transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Enviar e-mail
              </a>
            </div>
            {!hasWhatsApp && (
              <p className="mt-3 font-mono text-[11px] text-white/50">
                Link de WhatsApp ainda não configurado — solicite a ativação ao
                responsável pelo site.
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-white/10 rounded-sm p-5">
              <h3 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#B99A63]">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Atendimento
              </h3>
              <p className="mt-3 text-sm text-white/85">
                {IMOBILIARIA.address}
              </p>
              <p className="text-xs text-white/50 mt-1">
                {IMOBILIARIA.neighborhood} — localização real não informada em
                demonstração.
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm text-white/85">
                <InstagramIcon className="h-3.5 w-3.5 text-[#B99A63]" />
                {IMOBILIARIA.instagram}
              </p>
            </div>

            <div className="border border-white/10 rounded-sm p-5">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#B99A63]">
                Horários
              </h3>
              <dl className="mt-3 space-y-1.5">
                {IMOBILIARIA.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-3 text-xs">
                    <dt className="text-white/60">{h.day}</dt>
                    <dd className="text-white/85 font-medium">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="sm:col-span-2 border-l-2 border-[#B99A63] bg-white/5 text-xs leading-relaxed text-white/65 p-4">
              {IMOBILIARIA.demoNotice}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
