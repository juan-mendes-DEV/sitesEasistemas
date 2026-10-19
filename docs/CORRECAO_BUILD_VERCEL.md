# Correção da instalação na Vercel — ERESOLVE

## Causa e correção

O projeto declarava `@types/node: ^20` (lock em `20.19.43`), mas o Vitest
`5.0.5` exige o peer `@types/node: ^22.0.0 || >=24.0.0`. Mesmo sendo um peer
opcional, ele deve ser compatível quando instalado. O lock anterior continha
essa combinação incompatível.

Correção mínima:

- `@types/node`: `^20` → `^24.19.2`, resolvido em `24.19.2`.
- `undici-types`, dependência dos tipos: `6.21.0` → `7.24.6`.
- Lockfile regenerado pelo npm, com integridades oficiais e atualização de
  metadados de dependências opcionais/bundled, sem edição manual das resoluções.
- Mantidos Vite `8.3.4`, Vitest `5.0.5`, plugin React `6.1.2` e todas as
  dependências de execução. Nenhuma dependência necessária foi removida.

A versão publicada do Vitest e suas exigências foram conferidas no registro npm.

## Node.js e gerenciador de pacotes

- Ambiente local: **Node 24.19.0**; runtime não alterado.
- O repositório não possui `engines`, `.nvmrc`, `.node-version` ou `vercel.json`
  fixando Node. A versão efetiva da Vercel depende das configurações do projeto
  no painel e não pôde ser confirmada pelos arquivos locais.
- Vitest requer Node `^22.12.0 || ^24.0.0 || >=26.0.0`; jsdom e dependências
  exigem `^22.22.2 || ^24.15.0 || >=26.0.0`. O Node 24.19.0 usado na validação
  satisfaz a cadeia instalada. Atualizar os tipos não atualiza o runtime.
- O npm 12.0.2 instalado no sistema recusou baixar um tarball oficial de uma
  dependência opcional do Tailwind (`EALLOWREMOTE`, política `allow-remote=none`).
  Trata-se de um problema independente do peer incompatível.
- A regeneração do lock e a instalação limpa foram realizadas com **npm 11.21.1**
  temporário, no mesmo Node 24.19.0. Nenhuma configuração global de segurança foi
  modificada e o npm temporário não foi adicionado às dependências do projeto.

## Aviso `Unknown env config "cache-dir"`

Não há `.npmrc` no projeto nem referências a `cache-dir`, `cache_dir` ou
`npm_config_cache_dir` nos arquivos rastreados. O ambiente local também não
possui essa variável e não reproduziu o aviso.

Portanto, nenhuma correção de cache foi aplicada ao repositório. Se existir
`npm_config_cache_dir`/`NPM_CONFIG_CACHE_DIR` nas variáveis ou scripts da Vercel,
remover essa chave ou substituí-la por `npm_config_cache`/`NPM_CONFIG_CACHE`,
preservando o caminho desejado. `cache` é a opção válida do npm.

## Validação após instalação limpa

Com o executável npm 11.21.1 no PATH:

```sh
npm ci
npm ls @types/node vite vitest @vitejs/plugin-react undici-types
npm test
npx tsc --noEmit
npm run lint
npm run build
```

Resultados:

- `npm ci`: aprovado, 443 pacotes adicionados, sem ERESOLVE.
- Nenhum uso de `--force` ou `--legacy-peer-deps`; ambas as opções estavam falsas.
- `npm ls`: árvore compatível, tipos 24.19.2 compartilhados por Vite e Vitest.
- Testes: **278 aprovados em 27 arquivos**, incluindo integridade das demos.
- TypeScript e lint: aprovados.
- Build Next.js: aprovado, **90/90** páginas geradas.
- Nenhuma alteração em arquivos de `src/`, visual, animação, demonstrações ou SEO.

Avisos não bloqueantes: ESLint 9 fora de suporte e cinco alertas altos de audit
na cadeia `eslint-config-next → fast-glob → micromatch → braces`, cujas versões
permaneceram iguais às anteriores. Não foi executado `npm audit fix` ou downgrade
automático; a atualização dessa cadeia deve ser tratada separadamente.

Nenhum deploy ou push executado. O sucesso de uma nova instalação na Vercel
ainda depende de executar o pipeline remoto com os arquivos corrigidos.
