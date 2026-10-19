import Link from "next/link";

interface OdPageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  current: string;
}

export function OdPageHeader({
  eyebrow,
  title,
  description,
  current,
}: OdPageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[#174B57] text-white">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(143,201,193,0.35), transparent 55%), radial-gradient(circle at 10% 90%, rgba(143,201,193,0.15), transparent 50%)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-16 sm:pb-20">
        <nav aria-label="Trilha de navegação" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/50">
            <li>
              <Link
                href="/exemplos/institucionais/odontologia"
                className="hover:text-[#8FC9C1] transition-colors"
              >
                Início
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#8FC9C1]">
              /
            </li>
            <li className="text-white/80" aria-current="page">
              {current}
            </li>
          </ol>
        </nav>

        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[#8FC9C1]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8FC9C1]">
            {eyebrow}
          </span>
        </div>
        <h1 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08]">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-white/75">
          {description}
        </p>
      </div>
    </section>
  );
}
