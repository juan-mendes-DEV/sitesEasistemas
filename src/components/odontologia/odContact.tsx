import { Mail, CalendarCheck, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagramIcon";
import { ODONTOLOGIA } from "./data";

export function OdContact() {
  const hasWhatsApp = ODONTOLOGIA.whatsappLink !== null;

  return (
    <section
      id="contato"
      className="bg-[#F3F7F7] py-20 sm:py-28"
      aria-labelledby="od-contact-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#8FC9C1]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#174B57]/60">
                Agendamento
              </span>
            </div>
            <h2
              id="od-contact-title"
              className="mt-5 text-2xl sm:text-4xl font-bold text-[#174B57] tracking-tight leading-tight"
            >
              Agende sua avaliação com um clique.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#353C45]/75 max-w-lg">
              O agendamento acontece por um canal externo configurável — o link
              de atendimento é definido na entrega do site. Nenhum dado de saúde
              é coletado nesta página.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {hasWhatsApp ? (
                <a
                  href={ODONTOLOGIA.whatsappLink ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#174B57] text-white text-sm font-semibold rounded-full hover:bg-[#19353D] transition-colors"
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  Agendar pelo WhatsApp
                </a>
              ) : (
                <span className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-dashed border-[#174B57]/30 text-[#174B57]/50 text-sm font-semibold rounded-full cursor-not-allowed">
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  Agendamento externo não configurado
                </span>
              )}
              <a
                href={`mailto:${ODONTOLOGIA.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#174B57]/25 text-[#174B57] text-sm font-semibold rounded-full hover:border-[#174B57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#174B57] transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Enviar e-mail
              </a>
            </div>
            {!hasWhatsApp && (
              <p className="mt-3 font-mono text-[11px] text-[#19353D]/55">
                Link de agendamento ainda não configurado — solicite a ativação
                ao responsável pelo site.
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#174B57]/10 bg-white p-5">
              <h3 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#174B57]">
                <MapPin className="h-3.5 w-3.5 text-[#8FC9C1]" aria-hidden="true" />
                Localização
              </h3>
              <p className="mt-3 text-sm text-[#353C45]">{ODONTOLOGIA.address}</p>
              <p className="text-xs text-[#353C45]/60 mt-1">
                {ODONTOLOGIA.neighborhood} — endereço real não informado em
                demonstração.
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm text-[#353C45]">
                <InstagramIcon className="h-3.5 w-3.5 text-[#8FC9C1]" />
                {ODONTOLOGIA.instagram}
              </p>
            </div>

            <div className="rounded-2xl border border-[#174B57]/10 bg-white p-5">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#174B57]">
                Horários
              </h3>
              <dl className="mt-3 space-y-1.5">
                {ODONTOLOGIA.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-3 text-xs">
                    <dt className="text-[#353C45]/65">{h.day}</dt>
                    <dd className="text-[#353C45] font-medium">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="sm:col-span-2 border-l-2 border-[#8FC9C1] bg-white text-xs leading-relaxed text-[#19353D]/70 p-4">
              {ODONTOLOGIA.demoNotice}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
