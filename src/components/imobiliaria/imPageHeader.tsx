import Link from "next/link";

interface ImPageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  current: string;
}

export function ImPageHeader({
  eyebrow,
  title,
  description,
  current,
}: ImPageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[#14243A] text-white">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(185,154,99,0.07) 1px, transparent 1px)",
          backgroundSize: "100% 48px",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-16 sm:pb-20">
        <nav aria-label="Trilha de navegação" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/50">
            <li>
              <Link
                href="/exemplos/institucionais/imobiliaria"
                className="hover:text-[#B99A63] transition-colors"
              >
                Início
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#B99A63]">
              /
            </li>
            <li className="text-white/80" aria-current="page">
              {current}
            </li>
          </ol>
        </nav>

        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[#B99A63]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#B99A63]">
            {eyebrow}
          </span>
        </div>
        <h1 className="mt-5 text-3xl sm:text-5xl font-medium tracking-tight leading-[1.1]">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-white/75">
          {description}
        </p>
      </div>
    </section>
  );
}
