import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const hash = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");

function filesIn(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

describe("Isolamento do redesign — baseline anterior às alterações", () => {
  it("preserva byte a byte os 166 arquivos das demos, dados, estilos globais e logo", () => {
    const folders = [
      "src/app/exemplos", "src/lib/ecommerce", "src/types",
      ...["barbearia", "padaria", "salaoBeleza", "engenharia", "odontologia", "imobiliaria", "noir", "nexus", "botanica", "ecommerce", "sistemas"].map((name) => `src/components/${name}`),
    ];
    const files = [
      ...folders.flatMap((folder) => filesIn(resolve(folder))),
      ...["src/app/globals.css", "src/lib/catalog.ts", "src/imgs/Logo.png"].map((file) => resolve(file)),
    ];
    expect(files).toHaveLength(166);
    const manifest = files.map((file) => `${relative(process.cwd(), file)}:${hash(readFileSync(file))}`).sort().join("\n");
    // Gerado a partir do manifesto anterior ao redesign (não do código novo).
    expect(hash(manifest)).toBe("632036333ccfe7c515712fabe6b7eb2e90722de22f50fe2638d976a54830b45f");
  });
});
