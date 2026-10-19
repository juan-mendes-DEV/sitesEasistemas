import Link from "next/link";

interface EngPageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  current: string;
}

export function EngPageHeader({
  eyebrow,
  title,
  description,
  current,
}: EngPageHeaderProps) {
  return (
    <section
      className="relative overflow-hidden bg-[#20252B] text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#20252B]/70 to-[#20252B]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-16 sm:pb-20">
        <nav aria-label="Trilha de navegação" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/40">
            <li>
              <Link
                href="/exemplos/institucionais/engenharia"
                className="hover:text-[#B77A4A] transition-colors"
              >
                Início
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#B77A4A]">
              /
            </li>
            <li className="text-white/70" aria-current="page">
              {current}
            </li>
          </ol>
        </nav>

        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[#B77A4A]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#B77A4A]">
            {eyebrow}
          </span>
        </div>
        <h1 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
          {description}
        </p>
      </div>
    </section>
  );
}
