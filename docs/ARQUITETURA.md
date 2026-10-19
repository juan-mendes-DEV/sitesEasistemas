# Arquitetura — Code Maestro Tech

## Estado atual — Portfólio demonstrativo isolado

O redesign da home é implementado exclusivamente em `src/components/portfolio/`:

- `portfolio.tsx`: header, hero, galeria/filtros, institucional, contato e rodapé.
- `portfolio.module.css`: design system com `--pf-*` no escopo `.portfolio`, derivado
  da logo prata/azul/ciano; não modifica `:root`, `body` ou estilos das demonstrações.
- `portfolioIdentity.ts`: contatos oficiais, categorias e aviso demonstrativo.
- `portfolioData.ts`: projeção dos 12 projetos com nome, categoria, descrição, rota
  e prévia; preços e condições legadas não são enviados ao componente cliente.
- `portfolio.test.tsx`: conteúdo, filtros, contatos, SEO e ausência de preços/termos.

`src/app/page.tsx` renderiza essa interface e define canonical/SEO oficial da home.
Os antigos componentes `home/` e `layout/` não são mais importados por ela e permanecem
como código legado interno. As rotas das demos continuam as mesmas.

Logo original: `src/imgs/Logo.png`, importada estaticamente e otimizada com `next/image`.
Prévias reais: `public/portfolio/previews/*.jpg` (12 capturas, carregadas sob demanda).
Sem novas dependências. Os estilos globais e as 12 demos não foram modificados.
O teste `src/test/portfolioIsolation.test.ts` verifica a integridade SHA-256 de 166
arquivos protegidos contra o baseline anterior ao redesign.

Domínio oficial da home/sitemap/robots: `https://codemaestrotech.com.br`.
Canonicals internos das demos foram preservados literalmente. Contatos oficiais
e histórico de validação estão em `docs/RELATORIO_PROJETO.md`.
Validação atual: 261 testes / 25 arquivos, tsc, lint e build 90/90 aprovados.

---

## Arquitetura histórica — Etapas 01 a 04 + Sistemas Básicos

> O registro abaixo é preservado para rastreabilidade. Preços, termos e referências
> aos antigos componentes do catálogo não descrevem a home atual.

## Visão geral

Este documento descreve a estrutura de pastas, os componentes reutilizáveis e as decisões técnicas do portfólio comercial da Code Maestro Tech, incluindo o catálogo (Etapa 01), os Sites Simples (Etapa 02), os Sites Institucionais multipágina (Etapa 03), as lojas de E-commerce (Etapa 04) e os Sistemas Básicos integrados.

## Estrutura de pastas

```
code-maestro-tech/
├── src/
│   ├── app/                    # App Router (Next.js)
│   │   ├── layout.tsx          # Layout raiz, metadata e fontes
│   │   ├── page.tsx            # Página inicial (catálogo comercial)
│   │   ├── globals.css         # Tema, paleta e animações (Tailwind v4)
│   │   ├── sitemap.ts          # Sitemap XML (catálogo + subrotas + imóveis/produtos)
│   │   ├── robots.ts           # Robots.txt gerado estaticamente
│   │   └── exemplos/
│   │       ├── simples/
│   │       │   ├── barbearia/page.tsx
│   │       │   ├── padaria/page.tsx
│   │       │   └── salao-beleza/page.tsx
│   │       ├── institucionais/          # Etapa 03 — layouts aninhados
│   │       │   ├── engenharia/
│   │       │   │   ├── layout.tsx       # EngHeader + main + EngFooter
│   │       │   │   ├── page.tsx         # Início
│   │       │   │   ├── sobre/page.tsx
│   │       │   │   ├── servicos/page.tsx
│   │       │   │   ├── projetos/page.tsx
│   │       │   │   └── contato/page.tsx
│   │       │   ├── odontologia/
│   │       │   │   ├── layout.tsx       # OdHeader + main + OdFooter
│   │       │   │   ├── page.tsx         # Início
│   │       │   │   ├── sobre/page.tsx
│   │       │   │   ├── especialidades/page.tsx
│   │       │   │   ├── estrutura/page.tsx
│   │       │   │   └── contato/page.tsx
│   │       │   └── imobiliaria/
│   │       │       ├── layout.tsx       # ImHeader + main + ImFooter
│   │       │       ├── page.tsx         # Início
│   │       │       ├── sobre/page.tsx
│   │       │       ├── imoveis/
│   │       │       │   ├── page.tsx     # Listagem com filtros
│   │       │       │   └── [slug]/page.tsx  # Detalhe estático por slug
│   │       │       └── contato/page.tsx
│   │       ├── ecommerce/               # Etapa 04 — lojas completas
│   │       │   ├── moda/                # NOIR Studio
│   │       │   │   ├── layout.tsx       # StoreProvider + NoirHeader/NoirFooter + metadata
│   │       │   │   ├── page.tsx         # Home
│   │       │   │   ├── produtos/page.tsx
│   │       │   │   ├── produtos/[slug]/page.tsx  # 14 produtos (generateStaticParams)
│   │       │   │   ├── carrinho/page.tsx
│   │       │   │   ├── checkout/page.tsx
│   │       │   │   └── favoritos/page.tsx
│   │       │   ├── eletronicos/         # NEXUS (+ comparador/)
│   │       │   │   └── …                # Home, produtos, 13 detalhes, carrinho,
│   │       │   │                        # checkout e comparador
│   │       │   └── cosmeticos/          # Botânica (home, produtos, 13 detalhes,
│   │       │       └── …                # carrinho e checkout)
│   │       └── sistemas/                # Painéis parametrizados (SystemPanel)
│   │           ├── pedidos/page.tsx     # GRÃO (cafeteria)
│   │           ├── agendamentos/page.tsx# CORTE & CIA (barbearia)
│   │           └── estoque/page.tsx     # NUVEM (loja de roupas)
│   ├── components/
│   │   ├── ui/button.tsx
│   │   ├── layout/            # Header e Footer globais do catálogo
│   │   ├── home/              # Hero, ProjectCard, CatalogSection, termos
│   │   ├── icons/instagramIcon.tsx  # Ícone local compartilhado (lucide não exporta Instagram)
│   │   ├── barbearia/         # data.ts + componentes próprios
│   │   ├── padaria/           # data.ts + componentes próprios
│   │   ├── salaoBeleza/       # data.ts + componentes próprios
│   │   ├── engenharia/        # data.ts + header/footer/sections próprios
│   │   ├── odontologia/       # data.ts + header/footer/sections próprios
│   │   ├── imobiliaria/       # data.ts + header/footer/cards/filtros
│   │   ├── noir/              # Loja NOIR (data.ts + seções próprias)
│   │   ├── nexus/             # Loja NEXUS (data.ts + seções próprias)
│   │   ├── botanica/          # Loja Botânica (data.ts + seções próprias)
│   │   ├── ecommerce/         # StoreProvider, seções e utilidades compartilhados
│   │   └── sistemas/          # systemData.ts + systemPanel.tsx + systemPanel.module.css
│   ├── lib/catalog.ts         # Fonte central tipada (categorias + 12 projetos)
│   ├── lib/ecommerce/         # Regras puras: cart, storage, checkout (testadas)
│   ├── test/                  # setup, vitest-env.d.ts e testes de rota/navegação
│   ├── types/catalog.ts       # Category, Project, CategoryKey, ProjectStatus
│   └── imgs/                  # Imagens-fonte originais
├── public/imgs/               # Imagens locais otimizadas
│   ├── barbe01-04.jpg
│   ├── engenharia/            # 9 imagens
│   ├── odontologia/           # 8 imagens
│   └── imobiliaria/           # 14 imagens
├── vitest.config.mts
├── tsconfig.json              # TypeScript strict
├── next.config.ts             # cacheComponents, partialPrefetching, remotePatterns,
│                              # regra Turbopack de CSS (exclui *.module.css)
└── docs/
```

## Fonte central de dados (`src/lib/catalog.ts`)

- `CATEGORIES`: 4 categorias com chave, label, preço-base, descrição, escopo e rota.
- `PROJECTS`: 12 projetos com `id`, `slug`, `título`, `descrição`, `categoria`, `preço`, `funcionalidades`, `status` e `rota`.
- Funções auxiliares: `getProjectBySlug`, `getProjectsByCategory`, `getCategoryByKey`, `formatPrice`.

Preços-base: Sites Simples R$ 700 · Institucionais R$ 1.200 · E-commerce R$ 3.000 · Sistemas Básicos R$ 3.500.

Os 12 projetos estão com `DISPONIVEL_STATUS` (após validação completa de cada etapa). As 6 entradas de E-commerce e Sistemas tiveram descrições e funcionalidades reescritas para refletir exatamente o que existe nas páginas; a entrada antes chamada "financeiro" passou a ser **`pedidos` — Sistema de Pedidos** (`/exemplos/sistemas/pedidos`), seguindo o material de origem em `projetosAdd/`.

Cada demonstração concluída mantém seus dados fictícios no próprio `data.ts` de componente (`src/components/<demo>/data.ts`), isolado dos demais.

## Decisões técnicas

### Next.js App Router (v16)
- Páginas estáticas (prerenderizadas); `/sitemap.xml` e `/robots.txt` via Metadata Routes.
- **Layouts aninhados por demonstração**: cada site institucional tem `layout.tsx` próprio com header/footer próprios; cada loja tem `layout.tsx` com `StoreProvider` + header/footer da marca. As páginas de sistema são standalone (sem header global).
- `params` tratado como `Promise<{ slug }>` com `await` (convenção do Next 16) em `generateMetadata` e no componente de página.
- `generateStaticParams` retorna os slugs reais (produtos e imóveis; obrigatório com `cacheComponents`); rotas desconhecidas usam `notFound()`. `dynamicParams` não pode ser exportado nesta versão (incompatível com `cacheComponents`).
- `cacheComponents` e `partialPrefetching` habilitados no `next.config.ts`.

### Turbopack e CSS Modules (`next.config.ts`)
- Uma regra `turbopack.rules["*.css"]` com `as: "*.css"` engolia também os `*.module.css`: o CSS era emitido **sem hash**, `styles.classe` virava `undefined` e as páginas renderizavam sem estilo (`class="undefined undefined"`).
- Correção: uma única regra com `condition: { not: { path: /\.module\.css$/ } }`, deixando que o convencional de CSS Modules do Turbopack processe os arquivos de módulo (saída com prefixo hashado, ex.: `.wR04zG_pagina`).
- Regras explícitas `type: "css-module"` não são usadas: causam panic do Turbopack ("inner asset should be CSS processable").

### E-commerce (Etapa 04)
- `StoreProvider` (contexto cliente) por loja: carrinho, favoritos e comparador; a restauração do `localStorage` ocorre só em efeito (sem divergência de hidratação); falhas de leitura/gravação degradam para a sessão em memória com aviso honesto.
- Chaves isoladas por loja em `src/lib/ecommerce/storage.ts`: `cm-ecommerce:cart:<slug>`, `cm-ecommerce:favoritos:<slug>`, `cm-ecommerce:comparador:<slug>`; todo payload salvo é validado contra o catálogo da própria loja antes do uso.
- Regras puras testadas em `src/lib/ecommerce/` (`cart`, `storage`, `checkout`): cálculo de totais, validação de carrinho restaurado e mensagem final exata — **"Pedido demonstrativo criado. Nenhuma compra ou pagamento foi realizado."** (`DEMO_ORDER_NOTICE`).
- Páginas utilitárias (`carrinho`, `checkout`, `favoritos`) com `robots: noindex` e fora do sitemap; detalhe de produto com SEO próprio (canonical absoluto + Open Graph).

### Sistemas Básicos (integração)
- **Painel parametrizado único**: `src/components/sistemas/systemPanel.tsx` (cliente) renderiza os três sistemas a partir de configurações tipadas em `systemData.ts` (marca, paleta, rótulos, statuses, sementes de dados e textos dos indicadores). O estilo vem de `systemPanel.module.css`, com seletores prefixados nas raízes `.pagina`/`.shell` e paleta injetada por variáveis CSS inline.
- **Chaves de armazenamento (as da origem)**: GRÃO `portfolio-cafeteria-v1`, CORTE & CIA `portfolio-barbearia-v1`, NUVEM `portfolio-loja-roupas-v1`. Sem backend: leitura/gravação em `localStorage` com validação, degradação honesta ("Dados mantidos nesta sessão…") e persistência apenas em mutações (a restauração usa efeito).
- **Helpers puros** em `systemData.ts` (`linhasIniciais`, `validarLinha`, `carregarLinhas`, `estatisticas`, `linhasVisiveis`, `temConflito`, `proximoStatus`, `formatarMoeda`, `formatarDataHora`, `novoId`…), todos testados. Datas formatadas por regex determinística (sem depender de locale/timezone — evita divergência de hidratação); `Date.now` vive só em `novoId()`.
- **Comportamentos da origem preservados**: CRUD com exclusão em duas etapas (diálogo `role="dialog"` próprio, sem `window.confirm`), busca, filtros por situação, indicadores (totais, valor da coleção, contagem de reposição), sobreposição de horários bloqueada em agendamentos e status encadeados (`recebido → em preparo → pronto`, `confirmado → finalizado`).
- Contraste: cores `--muted` das paletas claras ajustadas (`#6b6259` cafeteria, `#625c74` loja-roupas) para passar 4,5:1 — o valor da origem (`#81796e`) falhava.

### SEO por página
- Cada página exporta `metadata` com `title`, `description`, `alternates.canonical` absoluto (`https://codemaestro.tech/...`) e `openGraph` (title, description, url, type, locale `pt_BR`).
- Detalhes de imóvel e de produto geram metadados dinâmicos por slug; páginas utilitárias de loja declaram `robots: noindex`.

### Tailwind CSS v4
- Tema global via `@theme inline` em `globals.css`; demonstrações **não alteram estilos globais** e usam cores em classes utilitárias inline (hexadecimal) — as lojas; os sistemas usam CSS Modules próprio com variáveis inline.

### Identidades visuais independentes
- Etapa 03: Engenharia (grafite/cobre), Odontologia (azul-petróleo/verde-água), Imobiliária (marinho/dourado).
- Etapa 04: NOIR (preto `#111111`/off-white `#F2EFE9`/areia `#A99A86`), NEXUS (noite `#0B1220`/ciano `#20C7D9`), Botânica (sálvia `#3F5748`/creme `#FAF8F2`/areia `#C7A88A`).
- Sistemas: GRÃO (creme `#f5edde`/terracota `#8e3e26`), CORTE & CIA (grafite `#151817`/limão `#d6fa65`), NUVEM (lilás `#f6f3fd`/violeta `#6d51c8`).

### Imagens
- 31 imagens locais otimizadas em `public/imgs/{engenharia,odontologia,imobiliaria}` (máx. 1400px, qualidade 76, sem metadados), servidas por `next/image` com `fill` + `sizes`.
- `images.remotePatterns` mantém apenas `images.unsplash.com` (herança das etapas anteriores). As lojas usam arte/gradientes próprios sem novas URLs externas.
- Alt texts descritivos marcando "imagem ilustrativa de demonstração".

### Filtros locais (sem backend)
- `imBrowser.tsx` (imobiliária) e os catálogos das lojas: `useState` + `useMemo` com predicados locais; contagem com `role="status"` + `aria-live="polite"`; botões com `aria-pressed`; estado vazio explícito.

### Animações e acessibilidade
- Animações leves (`animate-cm-*`) apenas com `prefers-reduced-motion: no-preference`; os painéis de sistema respeitam `prefers-reduced-motion` em CSS próprio.
- HTML semântico, `aria-labelledby` nas seções, `aria-expanded`/`aria-label` no menu mobile, breadcrumb com `aria-current`, foco visível (`:focus-visible`), layout responsivo de 320px (verificado por capturas 320px).

### Conteúdo responsável (regras de negócio)
- Sem telefones, endereços, CRO/CREA/CRECI/CNPJ, clientes ou certificações inventados; campos de contato são `string | null` (`phone`, `whatsappLink` são `null` até autorização) com fallback honesto na UI.
- Odontologia: sem formulário de dados de saúde; conteúdo educativo sem promessas de resultado. Cosméticos: sem alegações médicas.
- Todo conteúdo fictício carrega aviso de demonstração; os painéis dos sistemas declaram "Dados salvos neste navegador · Sem servidor".

### Navegação do catálogo
- As rotas de categoria (`CATEGORIES.route` — `/exemplos/simples`, `/exemplos/institucionais`, `/exemplos/ecommerce`, `/exemplos/sistemas`) **não têm páginas hub**: sempre retornaram 404. Enquanto não forem criadas, todo o menu (header desktop/mobile, rodapé, hero e rodapé dos sistemas) aponta para a seção real do catálogo: `/#catalogo` (11 links na home), e o bloco de contato do rodapé recebeu `id="contato"` para materializar as âncoras `#contato`.
- Os dados `route` foram preservados em `catalog.ts` para uso futuro das páginas hub.

### Testes
- Vitest + Testing Library (jsdom): **248 testes em 23 arquivos** — catálogo, `ProjectCard`, dados das demonstrações, filtros da imobiliária, regras de e-commerce (carrinho/storage/checkout), estrutura e dados dos 3 sistemas (65 testes novos), integridade de rotas/layouts via `node:fs` e navegação dos headers.
- Observação de ambiente (jsdom): submissão por clique em `type="submit"` dispara a validação nativa; os testes do painel usam `fireEvent.submit(form)` para exercitar a guarda em JS.

### SEO técnico
- Metadados nativos por página, sitemap com **73 URLs** (conteúdo público; exclui `carrinho`, `checkout` e `favoritos`, que são `noindex`), robots.txt.

## Situação atual e pendências

- **12 de 12 demonstrações disponíveis** (Etapas 01–04 + sistemas), todas validadas por `tsc`, `lint`, testes, `build` (90 rotas geradas) e verificação HTTP com servidor de produção.
- Pendências de escopo futuro: páginas hub por categoria (hoje redirecionadas a `/#catalogo`), números de WhatsApp/telefone reais quando autorizados e substituição das imagens ilustrativas por fotos dos clientes.

## Próxima etapa recomendada

Criar as páginas hub de categoria (se houver interesse) e configurar canais de contato reais conforme autorização — conforme escopo em `docs/RELATORIO_PROJETO.md`.
