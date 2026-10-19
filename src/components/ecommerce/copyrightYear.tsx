"use client";

/**
 * Ano do copyright das lojas demonstrativas.
 *
 * `new Date()` é proibido durante o prerender com `cacheComponents`
 * (Next 16) — inclusive em Client Components — então a leitura acontece
 * num efeito pós-hidratação; o HTML estático sai sem o número e o cliente
 * preenche logo em seguida.
 */
import { useEffect, useState } from "react";

export function CopyrightYear() {
  const [ano, setAno] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- ano só pode ser lido após a hidratação: new Date() durante o prerender é proibido com cacheComponents (Next 16)
    setAno(new Date().getFullYear());
  }, []);

  return <>{ano ?? ""}</>;
}
