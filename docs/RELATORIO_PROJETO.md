# Relatório do Projeto — Code Maestro Tech

## Etapa 05.2 — Núcleo Geométrico: A Magia da Tecnologia

### Escopo e conceito

Apenas a logo gigante da área visual do hero foi substituída por uma escultura
geométrica original. Logo pequena do cabeçalho, arquivo original da marca, moldura
do hero, título, textos, botões, navegação, contato, galeria, demais seções e SEO
permanecem inalterados.

O arquivo `src/imgs/Logo.png` foi novamente analisado: aro metálico, monograma CM
angular e circuitos em prata/azul/ciano orientaram os materiais da escultura. Foram
mantidas as famílias cromáticas da identidade (`#C7D0D9`, `#168BEA`, `#32C8F4`,
carvão e sombras azuladas), sem cores aleatórias ou brilho neon excessivo.

Composição: icosaedro central (12 vértices, 30 arestas, 20 faces), gaiola matemática
externa, três anéis independentes em eixos distintos, marcadores orbitais, vértices
com pulsação discreta, iluminação direcional, sombra de apoio e profundidade.
O núcleo gira lentamente; as órbitas têm velocidades distintas, uma delas negativa;
todo o conjunto flutua levemente e acompanha o mouse com inclinação amortecida,
retornando ao centro ao sair. Touch mantém movimento automático sem capturar gestos.

### Tecnologia e decisão técnica

**SVG com geometria tridimensional projetada em perspectiva**, sem Three.js,
React Three Fiber ou Drei. A opção é permitida pelo escopo e evita acrescentar uma
pilha WebGL para uma única composição pequena. As coordenadas são realmente 3D:
rotações nos três eixos, projeção perspectiva, ordenação das faces em profundidade
e iluminação calculada pelas normais. Não é vídeo, animação pronta ou modelo externo.

O SVG inicial é renderizado no servidor em pose determinística e permanece legível
sem JavaScript. A animação começa apenas no cliente, após observação de visibilidade.
Não há canvas, criação de contexto WebGL, texturas, shaders, modelos baixados ou
dependências novas. Assim, a ausência de WebGL não afeta nem o movimento nem o fallback.

### Arquivos modificados e criados

- `src/components/portfolio/portfolio.tsx`: somente importação de `GeometricCore`
  e substituição do elemento de imagem gigante por `<GeometricCore />`.
- `src/components/portfolio/geometricCore.tsx`: SVG inicial, controlador de animação,
  mouse, pausa manual, observação de viewport e ciclo de vida.
- `src/components/portfolio/geometricCoreMath.ts`: geometria, rotação, perspectiva,
  iluminação, anéis e pose estática determinística.
- `src/components/portfolio/geometricCore.module.css`: estilos locais da escultura,
  dimensionamento equivalente ao elemento anterior e controle de pausa.
- `src/components/portfolio/geometricCore.test.tsx` e `geometricCoreMath.test.ts`:
  17 novos testes de geometria e ciclo de vida.
- Este relatório. Nenhum outro arquivo existente de `src/` foi alterado nesta etapa.
  `package.json`, lockfile, estilos globais e CSS do restante do portfólio não mudaram.

### Performance, acessibilidade e limpeza

- Limite de atualização de **30 fps** no desktop e **24 fps** no mobile/dispositivo
  limitado. Órbitas com 48 segmentos no desktop, 24 em telas até 700px, dispositivos
  com até 4 núcleos/4 GB (quando informado) ou preferência de economia de dados.
- `requestAnimationFrame` atualiza apenas atributos de nós SVG existentes; não há
  atualização de estado React por quadro. Sem framebuffer dependente de DPR.
- `IntersectionObserver` cancela o loop fora da viewport; `visibilitychange` cancela
  enquanto a aba está oculta. O relógio não avança durante pausas.
- `prefers-reduced-motion` mostra pose estática, inclusive quando a preferência muda
  durante a sessão. Botão acessível permite pausar/retomar manualmente o movimento.
- Sem suporte a `IntersectionObserver`, mantém-se a escultura estática. Sem JavaScript,
  o SVG do HTML inicial permanece visível. Sem WebGL, o SVG continua animado normalmente.
- Área reservada antes da hidratação; dimensões proporcionais no mobile. SVG não recebe
  foco ou captura ponteiro; o container usa listeners passivos, sem impedir rolagem.
- `useEffect` remove listeners, desconecta o observador e cancela quadros ao desmontar.
  Não há recursos GPU ou objetos 3D de bibliotecas a liberar.

### Testes e resultados

- `npx tsc --noEmit`: aprovado.
- `npm run lint`: aprovado, sem erros/avisos.
- `npm test`: **278 testes aprovados em 27 arquivos** (261 anteriores + 17 novos).
- `npm run build`: aprovado, **90/90** páginas geradas.
- Chromium real: desktop 1440px e mobile 390px animados, 320px com movimento reduzido,
  desktop com movimento reduzido, contexto de canvas/WebGL indisponível e JavaScript
  desativado. Sem erros de console, hidratação ou overflow; logo do cabeçalho intacta.
- Pausa/retomada e suspensão fora da viewport confirmadas no navegador; aba oculta,
  redução de segmentos, inclinação do mouse/retorno amortecido e limpeza cobertos em testes.
- Asserções geométricas: topologia regular, preservação de distâncias, perspectiva,
  ordenação em profundidade, coordenadas dentro da área e pose inicial determinística.
- Teste de integridade anterior: **166 arquivos protegidos** das demos, dados, tipos,
  estilos globais e logo permanecem byte a byte iguais. Comparação do manifesto desta
  etapa confirma que apenas `portfolio.tsx` mudou entre os arquivos existentes de `src/`;
  reconstruindo a troca do elemento/import, todo o restante desse arquivo é idêntico.
- Evidências locais: `/tmp/opencode/nucleo/` e `/tmp/opencode/nucleo-build.log`.

Preview de produção local: `http://localhost:3102`.
**Nenhum deploy, push, publicação ou commit. Aguardando aprovação.**

---

## Etapa unificada — Redesign do portfólio demonstrativo (19/10/2026)

### Diagnóstico e escopo

A home anterior era um catálogo comercial: dourado/violeta, cards com preços-base,
filtros com valores, apresentação comercial e condições de contratação. A logo
oficial não orientava a identidade da página; o contato exibia dados anteriores.
O redesign afeta somente a apresentação do portfólio principal. As 12 demonstrações,
seus dados, produtos fictícios, carrinhos, checkouts, sistemas e navegação interna
foram preservados.

### Análise da logo e direção artística

Arquivo analisado: `src/imgs/Logo.png` (original mantido, sem edição ou substituição).
O monograma CM possui cortes diagonais e volumes metálicos; o aro circular sugere
conexão e continuidade. Circuitos e símbolos de código associam engenharia e criação.
A tipografia da imagem é geométrica, angular e de aspecto tecnológico. As cores
dominantes são preto/carvão, prata escovada e azuis elétricos com reflexos ciano.
Uma amostragem RGB da imagem confirmou famílias de cinzas neutros e azuis saturados.

Direção: **engenharia digital editorial**. Fundo carvão, tipografia Geist de grande
escala, linhas técnicas, superfícies discretas, detalhes ciano e logo original em
destaque. A magia é expressa como conexão e transformação tecnológica, sem referências
medievais, partículas, robôs, bibliotecas pesadas ou animações contínuas.

Paleta funcional derivada das famílias da logo (adaptada para contraste em tela):

| Uso | HEX |
|---|---|
| Fundo carvão | `#05090D` |
| Superfície | `#0B121B` |
| Painel azul profundo | `#101C29` |
| Borda técnica | `#263545` |
| Texto claro | `#EDF3F8` |
| Texto secundário | `#A6B5C5` |
| Prata | `#C7D0D9` |
| Azul elétrico | `#168BEA` |
| Ciano de interação | `#32C8F4` |

### Interface entregue

- Header com logo original, navegação por âncoras e menu mobile acessível.
- Hero “A magia da nova era.” / “A magia da tecnologia.”, CTAs para projetos e WhatsApp.
- Galeria com prévias reais das 12 demos (capturas locais), nome, categoria, descrição
  e link “Explorar demonstração”. Filtros mantidos, com 3 projetos em cada categoria.
- Categorias públicas: Sites simples, Sites institucionais, Lojas virtuais e
  Sistemas demonstrativos.
- Seção institucional, aviso explícito de projetos fictícios, contato oficial e rodapé.
- Sem preços de desenvolvimento, pacotes, parcelas, negociação ou termos de contratação
  na home, nos dados serializados para a galeria ou nos metadados do portfólio.
- Conteúdo comercial legado e documentos históricos preservados internamente, mas os
  componentes antigos não são importados pela home nem enviados por ela ao navegador.
- Pré-carregamento da logo principal, otimização de imagens pelo `next/image`, lazy
  loading das prévias, foco visível e microinterações com `prefers-reduced-motion`.

### Contatos oficiais

- Site: `https://codemaestrotech.com.br`
- WhatsApp: `+55 35 3191-1991` → `https://wa.me/553531911991`
- E-mail: `jp436807@gmail.com` → `mailto:jp436807@gmail.com`

Foi usado o e-mail completo oficial da seção de identidade, corrigindo o destino
incompleto `mailto@gmail.com` da sugestão de contato. Não foram inventados outros
canais, endereços ou redes sociais. Não foi criado formulário ou backend.

### Isolamento e arquivos alterados

Design system novo em `src/components/portfolio/portfolio.module.css`, com variáveis
`--pf-*` restritas a `.portfolio`. `globals.css`, fontes, corpo/layout visual raiz,
componentes compartilhados legados, catálogo de dados e logo não foram modificados.
Nenhum estilo global foi adicionado.

- Novos: `src/components/portfolio/{portfolio.tsx,portfolio.module.css,portfolioData.ts,portfolioIdentity.ts,portfolio.test.tsx}`.
- Nova proteção de regressão: `src/test/portfolioIsolation.test.ts` (SHA-256 de 166
  arquivos de demos, dados, tipos, estilos globais e logo, com baseline anterior ao redesign).
- Home substituída: `src/app/page.tsx`.
- SEO: `src/app/layout.tsx` (somente descrições comerciais removidas),
  `src/app/sitemap.ts` e `src/app/robots.ts` (domínio oficial; mesmas URLs relativas).
- Testes de sitemap atualizados apenas quanto ao domínio: `src/test/ecommerceRotas.test.ts`
  e `src/test/sistemasRotas.test.ts`. Asserções de canonical das demos permanecem intactas.
- Novos assets: `public/portfolio/previews/*.jpg` (12 capturas das próprias demos).
- Documentação: este relatório, `docs/ARQUITETURA.md` e `README.md`.

### Validação

- `npx tsc --noEmit`: aprovado, sem erros.
- `npm run lint`: aprovado, sem erros ou avisos.
- `npm test`: **261 testes aprovados em 25 arquivos** (248 anteriores + 13 novos).
- `npm run build`: aprovado, geração **90/90**, sem novas rotas demonstrativas.
- HTTP de produção: **81 URLs respondem 200** (73 do sitemap + 8 utilitárias das lojas).
  Carrinhos, checkouts, favoritos e comparador mantêm `noindex`.
- Navegador Chromium: home em **320, 390, 768 e 1440px**, sem overflow, sem erros JS
  ou imagens quebradas, filtros 12 → 3 → 12 e menu mobile funcional.
- Home sem preços/termos comerciais; contatos oficiais e links verificados por testes.
- Teclado em navegador real: link de salto focado com Tab, Enter transfere foco ao
  conteúdo principal e menu mobile abre com Enter. Foco ciano confirmado; animação
  computada como `none` com redução de movimento. Contrastes: texto/fundo **17,86:1**,
  texto secundário/painel **8,23:1**, ciano/painel **8,77:1**, texto do CTA **9,70:1**.
- Antes/depois das demos: 24 conjuntos de título/texto/status idênticos (12 × desktop/mobile);
  23/24 capturas idênticas byte a byte. A captura desktop da odontologia foi conferida
  visualmente sem diferença de layout: variação máxima de 1 nível RGB em 0,03004%
  dos canais, compatível com rasterização. Teste de integridade confirma **166/166 arquivos
  protegidos inalterados**.
- Evidências locais: `/tmp/opencode/portfolio-{before,after}/`,
  `/tmp/opencode/portfolio-home/`, `/tmp/opencode/portfolio-routes.json` e
  `/tmp/opencode/portfolio-build.log` (não fazem parte do site publicado).

### Problemas encontrados e decisões

- O pedido menciona “sistema financeiro”, mas a implementação existente é **GRÃO / Pedidos**,
  conforme integração anterior. Não foi criada, renomeada ou alterada qualquer demonstração.
- As páginas hub de categoria continuam fora do escopo: filtros locais e `#catalogo`
  permanecem como navegação funcional, sem criar novas rotas.
- Canonical da home, sitemap e referência em robots usam o domínio oficial. Os canonicals
  absolutos legados **dentro das demos** (`codemaestro.tech`) foram preservados literalmente
  para respeitar a restrição de não alterá-las; uma migração coordenada desses metadados
  requer escopo específico antes de publicação.
- A primeira captura de página inteira não esperava imagens lazy fora da viewport;
  as capturas da home foram repetidas após decodificar todas as imagens. Não era defeito
  de carregamento durante a navegação normal.

**Nenhum deploy, push, publicação ou commit executado. Aguardando aprovação.**

---

## Histórico — Etapas 01 a 04 + Sistemas Básicos

> Registro anterior preservado. Menções a preços, contatos não configurados e termos
> abaixo descrevem o estado histórico, não a interface atual do portfólio.

## Resumo

### Integração dos Sistemas Básicos (concluída)

Porte dos três sistemas básicos de `projetosAdd/3-comercios-independentes/`, seguindo as informações dos respectivos READMEs de origem:

- **GRÃO — Sistema de Pedidos** (`/exemplos/sistemas/pedidos`) — cafeteria; chaves `portfolio-cafeteria-v1`.
- **CORTE & CIA — Sistema de Agendamentos** (`/exemplos/sistemas/agendamentos`) — barbearia; chaves `portfolio-barbearia-v1`.
- **NUVEM — Sistema de Estoque** (`/exemplos/sistemas/estoque`) — loja de roupas; chaves `portfolio-loja-roupas-v1`.

Um único painel cliente parametrizado (`systemPanel.tsx` + `systemData.ts` + `systemPanel.module.css`) reproduz as três identidades (creme/terracota, grafite/limão, lilás/violeta) e todos os comportamentos da origem: CRUD com exclusão em duas etapas, busca, filtros por situação, indicadores automáticos (totais, valor da coleção, contagem de reposição), bloqueio de sobreposição de horários em agendamentos, alerta de estoque abaixo de cinco unidades, status encadeados e persistência exclusivamente em `localStorage` (sem backend, dados fictícios marcados como demonstração). A entrada do catálogo antes chamada "financeiro" foi renomeada para **Sistema de Pedidos** (`pedidos`).

### Etapa 04 — E-commerce (concluída)

Três lojas completas com identidades independentes:

- **NOIR Studio** (`/exemplos/ecommerce/moda`) — 14 produtos com variantes de tamanho/cor, favoritos locais, carrinho isolado e checkout fictício.
- **NEXUS** (`/exemplos/ecommerce/eletronicos`) — 13 produtos com fichas técnicas, comparador local de até 3 produtos, carrinho isolado, checkout fictício.
- **Botânica** (`/exemplos/ecommerce/cosmeticos`) — 13 produtos com ingredientes ilustrativos e kits com conteúdo declarado (sem alegações médicas), carrinho isolado, checkout fictício.

Cada loja tem catálogo com busca/filtros/ordenação, páginas de produto com SEO próprio, páginas utilitárias (`carrinho`, `checkout`, `favoritos`) com `robots: noindex`, mensagem exata de checkout **"Pedido demonstrativo criado. Nenhuma compra ou pagamento foi realizado."**, suporte a 320px, acessibilidade e `prefers-reduced-motion`, sem dados estruturados de oferta (JSON-LD).

### Etapa 03 — Sites institucionais (concluída)

Implementação dos três sites completos da categoria **Institucionais** (preço-base de R$ 1.200), cada um com identidade visual independente, header e footer próprios, layouts aninhados e páginas multipágina:

- **Vértice Engenharia** (`/exemplos/institucionais/engenharia`) — Início, Sobre, Serviços, Projetos, Contato.
- **Lumina Odontologia** (`/exemplos/institucionais/odontologia`) — Início, Sobre, Especialidades, Estrutura, Contato.
- **Altavista Imóveis** (`/exemplos/institucionais/imobiliaria`) — Início, Sobre, Imóveis, Contato + 6 páginas estáticas de detalhe por slug (`/imoveis/[slug]` com `generateStaticParams`).

A imobiliária possui ≥6 imóveis fictícios completos (imagem, título, tipo, preço, área, quartos, banheiros, descrição, identificador) e filtros locais por tipo e faixa de preço (client-side, sem backend). Todas as páginas têm SEO próprio (título, description, canonical absoluto e Open Graph), conteúdo fictício marcado como demonstração, contato externo configurável com fallback honesto ("não configurado") e imagens locais otimizadas.

### Etapas anteriores

- **Etapa 01**: catálogo comercial completo (13 rotas), homepage, Header/Footer globais, sitemap, robots, documentação.
- **Etapa 02**: demonstrações completas dos 3 Sites Simples — Barbearia Ferro & Navalha, Padaria Aurora e Maison Belle (R$ 700), com imagens locais otimizadas na barbearia e redesign preto & rosa no Maison Belle.

A página inicial, os termos comerciais e as demonstrações das Etapas 02 e 03 foram preservados; com a conclusão das lojas e dos sistemas, **as 12 demonstrações do catálogo estão disponíveis**.

## Stack

- Next.js 16 (App Router), TypeScript strict, Tailwind CSS v4, CSS Modules (Turbopack), Lucide React, Vitest + Testing Library.
- Persistência local (`localStorage`) nos carrinhos, favoritos, comparador e painéis dos sistemas — sem backend, CMS, banco de dados, autenticação ou pagamentos.
- Playwright/Chromium disponível no ambiente para inspeção visual (screenshots desktop 1440px, mobile 390px e 320px).

## Rotas disponíveis (83 rotas públicas)

| # | Rota | Categoria | Preço-base | Status |
|---|------|-----------|------------|--------|
| 1 | `/` | Página inicial / catálogo | — | Concluído |
| 2 | `/exemplos/simples/barbearia` | Sites Simples | R$ 700 | Disponível (demonstração completa) |
| 3 | `/exemplos/simples/padaria` | Sites Simples | R$ 700 | Disponível (demonstração completa) |
| 4 | `/exemplos/simples/salao-beleza` | Sites Simples | R$ 700 | Disponível (demonstração completa) |
| 5 | `/exemplos/institucionais/engenharia` | Institucionais | R$ 1.200 | Disponível (site institucional completo) |
| 6 | `/exemplos/institucionais/odontologia` | Institucionais | R$ 1.200 | Disponível (site institucional completo) |
| 7 | `/exemplos/institucionais/imobiliaria` | Institucionais | R$ 1.200 | Disponível (site institucional completo) |
| 8 | `/exemplos/ecommerce/moda` | E-commerce | R$ 3.000 | Disponível (loja completa — NOIR Studio) |
| 9 | `/exemplos/ecommerce/eletronicos` | E-commerce | R$ 3.000 | Disponível (loja completa — NEXUS) |
| 10 | `/exemplos/ecommerce/cosmeticos` | E-commerce | R$ 3.000 | Disponível (loja completa — Botânica) |
| 11 | `/exemplos/sistemas/estoque` | Sistemas Básicos | R$ 3.500 | Disponível (painel completo — NUVEM) |
| 12 | `/exemplos/sistemas/agendamentos` | Sistemas Básicos | R$ 3.500 | Disponível (painel completo — CORTE & CIA) |
| 13 | `/exemplos/sistemas/pedidos` | Sistemas Básicos | R$ 3.500 | Disponível (painel completo — GRÃO) |

Subrotas institucionais (Etapa 03):

| Demonstração | Subrotas |
|--------------|----------|
| Vértice Engenharia | `/sobre`, `/servicos`, `/projetos`, `/contato` |
| Lumina Odontologia | `/sobre`, `/especialidades`, `/estrutura`, `/contato` |
| Altavista Imóveis | `/sobre`, `/imoveis`, `/contato`, `/imoveis/[slug]` × 6 imóveis |

Subrotas de e-commerce (Etapa 04):

| Loja | Subrotas |
|------|----------|
| NOIR Studio (`moda`) | `/produtos`, `/produtos/[slug]` × 14, `/carrinho`, `/checkout`, `/favoritos` |
| NEXUS (`eletronicos`) | `/produtos`, `/produtos/[slug]` × 13, `/carrinho`, `/checkout`, `/comparador` |
| Botânica (`cosmeticos`) | `/produtos`, `/produtos/[slug]` × 13, `/carrinho`, `/checkout` |

Rotas técnicas: `/robots.txt`, `/sitemap.xml` (73 URLs — exclui as páginas utilitárias `noindex` de carrinho, checkout e favoritos), `/_not-found`. Sistemas Básicos não têm subrotas (página única por painel).

## Componentes reutilizáveis

### Compartilhados (catálogo)
- `Button`, `Header`, `Footer`, `Hero`, `ProjectCard`, `CatalogSection`, `CommercialPresentation`, `CommercialTerms`
- `InstagramIcon` (`src/components/icons/instagramIcon.tsx`) — ícone local compartilhado (lucide-react não exporta `Instagram`)

### E-commerce compartilhado (`src/components/ecommerce/` + `src/lib/ecommerce/`)
- `StoreProvider` — contexto cliente por loja (carrinho, favoritos, comparador) com restauração em efeito e degradação honesta
- `cart.ts`, `storage.ts`, `checkout.ts` — regras puras testadas (totais, validação de carrinho restaurado, `DEMO_ORDER_NOTICE`)
- Seções compartilhadas de catálogo/loja (busca, filtros, cards) parametrizadas por identidade

### Lojas (por marca)
- `src/components/noir/` — `data.ts` (14 produtos com variantes), header/footer e seções próprias (preto & off-white)
- `src/components/nexus/` — `data.ts` (13 produtos com fichas técnicas), header/footer, comparador (noite & ciano)
- `src/components/botanica/` — `data.ts` (13 produtos com ingredientes/kits), header/footer e seções (sálvia & creme)

### Sistemas Básicos (`src/components/sistemas/`)
- `systemData.ts` — `SistemaConfig` das 3 marcas + helpers puros (carga/gravação, validação, estatísticas, conflito de horário, próximo status, moeda e data determinística, `novoId`)
- `systemPanel.tsx` — painel cliente único (CRUD, busca, filtros, indicadores, diálogo `role="dialog"`, toast, confirmação em duas etapas)
- `systemPanel.module.css` — CSS Modules com seletores prefixados, paleta por variáveis CSS inline e media queries até 320px

### Vértice Engenharia (`src/components/engenharia/`)
- `engHeader` / `engFooter` — header grafite fixo com navegação e menu mobile; rodapé com "Voltar ao catálogo"
- `engHero` — hero técnico com linhas de grade, imagem de arranha-céus, 2 CTAs e indicadores
- `engIntro` — apresentação, missão e 4 valores
- `engServices` — 4 serviços (resumido na home, detalhado com itens na página Serviços)
- `engProjects` — grid de 6 projetos fictícios (3 em destaque na home)
- `engPageHeader` — banner de subpágina com breadcrumb
- `engContact` — contato com WhatsApp honesto "não configurado", e-mail, horários e aviso
- `data.ts` — história, missão, valores, metodologia em 5 etapas, serviços, projetos e imagens

### Lumina Odontologia (`src/components/odontologia/`)
- `odHeader` / `odFooter` — header claro azul-petróleo, footer correspondente
- `odHero` — hero arejado com gradientes em verde-água
- `odIntro` — proposta de atendimento, 4 diferenciais e dupla imagem
- `odSpecialties` — 5 especialidades com texto educativo (resumido na home, detalhado na página)
- `odGallery` — galeria da estrutura com 5 ambientes e legendas
- `odPageHeader`, `odContact` — banner de subpágina e agendamento por canal externo configurável
- `data.ts` — história, proposta, estrutura, especialidades, diferenciais, imagens e aviso (nenhum dado de saúde coletado)

### Altavista Imóveis (`src/components/imobiliaria/`)
- `imHeader` / `imFooter` — header marinho com destaque dourado
- `imHero` — hero com imagem de fundo e conteúdo em fluxo normal (altura ditada pelo conteúdo — correção aplicada após inspeção mobile)
- `imIntro` — apresentação, diferenciais e valores
- `imPropertyCard` — card do imóvel (imagem, tipo, identificador, especificações, valor)
- `imFeatured` — 3 imóveis em destaque na home
- `imBrowser` — **componente cliente** com filtros locais por tipo e faixa de preço, contagem com `role="status"`, estado vazio e "limpar filtros"
- `imPropertyDetail` — galeria (3 imagens), ficha técnica e CTA de contato externo
- `imPageHeader`, `imContact` — banner de subpágina e contato
- `data.ts` — tipo `Imovel`, `ImovelTipo`, 6 imóveis completos, `formatPreco`, `TIPO_LABEL`

### Padaria Aurora (`src/components/padaria/`)
- `PadariaHeader`, `PadariaHero`, `PadariaAbout`, `PadariaProducts` (6 produtos), `PadariaDifferentials`, `PadariaGallery`, `PadariaHours`, `PadariaContact`, `PadariaFooter`, `data.ts`

### Maison Belle (`src/components/salaoBeleza/`)
- `SalaoHeader`, `SalaoHero`, `SalaoAbout`, `SalaoServices` (6 serviços), `SalaoGallery`, `SalaoDifferentials`, `SalaoHours`, `SalaoContact`, `SalaoFooter`, `data.ts` (redesign preto & rosa)

## Identidade visual

| Demonstração | Paleta principal | Conceito |
|-------------|-----------------|----------|
| Code Maestro Tech (catálogo) | Obsidiana, dourado, violeta | Magia da Nova Era |
| Barbearia Ferro & Navalha | Preto carvão, cobre, dourado envelhecido | Barbearia tradicional com precisão |
| Padaria Aurora | Creme, marrom café, terracota, dourado trigo | Padaria artesanal contemporânea |
| Maison Belle | Preto profundo, rosa vibrante, ameixa escuro | Salão boutique contemporâneo |
| Vértice Engenharia | Grafite `#20252B`, cobre `#B77A4A`, cinza claro `#EDF0F2`, azul aço `#445C6E` | Linguagem técnica: linhas de grade, tipografia mono, cantos retos |
| Lumina Odontologia | Azul-petróleo `#174B57`, verde-água `#8FC9C1`, cinza `#F3F7F7`, azul escuro `#19353D` | Clínica leve: cantos arredondados, respiro amplo, tom acolhedor |
| Altavista Imóveis | Marinho `#14243A`, dourado `#B99A63`, areia `#EDE4D6`, cinza `#353C45` | Editorial premium: itálico dourado, réguas finas, fichas técnicas |
| NOIR Studio | Preto `#111111`, off-white `#F2EFE9`, areia `#A99A86`, vinho `#8C1D18` | Moda editorial minimalista, alto contraste |
| NEXUS | Noite `#0B1220`, ciano `#20C7D9`, azul-cinza `#172B40`, claro `#E9F2F7` | Eletrônicos tech: dark mode, destaques em ciano |
| Botânica | Sálvia `#3F5748`, marrom `#493F36`, areia `#C7A88A`, creme `#FAF8F2` | Cosméticos naturais: orgânico, quente, sereno |
| GRÃO (pedidos) | Creme `#f5edde`, café `#42291f`, terracota `#8e3e26` | Cafeteria artesanal: serifa clássica, café em destaque |
| CORTE & CIA (agendamentos) | Grafite `#151817`, limão `#d6fa65`, cinza `#9ba49c` | Barbearia urbana: caixa alta, tesoura em círculo |
| NUVEM (estoque) | Lilás `#f6f3fd`, violeta `#6d51c8`, lavanda `#e8e0f5` | Loja de roupas leve: formas suaves, respiro |

Cada demonstração usa cores em classes utilitárias inline (hexadecimal) ou CSS Modules próprios, sem alterar `globals.css` nem a identidade do catálogo.

## Integração com o catálogo

- `src/lib/catalog.ts`: **os 12 projetos** estão com `DISPONIVEL_STATUS` (cada etapa só foi virada após validação completa).
- Entradas de E-commerce e Sistemas reescritas para refletir exatamente o implementado; a terceira entrada de sistemas passou de `financeiro` ("Gestão Financeira") para **`pedidos` — Sistema de Pedidos**, conforme o material de origem.
- Preços-base preservados: R$ 700 (simples), R$ 1.200 (institucionais), R$ 3.000 (e-commerce), R$ 3.500 (sistemas).
- Termos comerciais inalterados; homepage preservada.
- **Correção de navegação (achado nesta integração)**: as rotas de categoria (`/exemplos/simples`, `/exemplos/institucionais`, `/exemplos/ecommerce`, `/exemplos/sistemas`) nunca tiveram páginas hub e retornavam 404 no menu; o header (desktop/mobile), o hero, o rodapé e o rodapé dos sistemas agora apontam para `/#catalogo` (11 links), e o contato do rodapé ganhou `id="contato"` para materializar as âncoras `#contato`. Os dados `route` das categorias foram preservados para páginas hub futuras.
- **Correção de build (achado nesta integração)**: a regra `turbopack.rules["*.css"]` em `next.config.ts` engolia os `*.module.css` e emitia o CSS sem hash (páginas renderizavam sem estilo); a regra agora exclui `*.module.css` (`condition: { not: … }`), devolvendo o processamento padrão de CSS Modules ao Turbopack.

## Resultados da validação (Etapa 04 + Sistemas Básicos)

- `npx tsc --noEmit`: ✅ 0 erros de tipo (também após a correção do `next.config.ts`).
- `npm run lint` (ESLint): ✅ 0 erros e 0 avisos.
- `npm test` (Vitest): ✅ **248 testes aprovados em 23 arquivos**, incluindo 65 testes novos dos sistemas:
  - dados/configuração dos 3 sistemas (chaves `portfolio-*-v1`, statuses, validação, estatísticas, conflito de horário, formatação determinística);
  - comportamento do painel (CRUD, exclusão em duas etapas, busca/filtros, diálogo, avisos exatos, bloqueio de sobreposição);
  - integridade das 3 rotas de sistema e metadados canônicos;
  - regressão das lojas (variantes, comparador, checkout com a mensagem exata) e de todas as etapas anteriores.
- `npm run build`: ✅ build de produção concluído — **90 rotas/páginas geradas (90/90)** com os 6 novos itens `disponivel`.
- Verificação HTTP com servidor de produção (porta 3100): ✅ home e as 3 rotas de sistema respondem **200**; `/exemplos/sistemas/financeiro` responde **404** (rota renomeada); `<title>`, canonical, description e Open Graph corretos; sitemap com 73 URLs contendo apenas `sistemas/{agendamentos,estoque,pedidos}`; subrotas institucionais amostradas respondem 200.
- Inspeção visual real (Chromium/Playwright): ✅ capturas desktop (1440px) e 320px dos três painéis, diálogo de cadastro, aviso de sucesso e aviso de sobreposição em `/tmp/opencode/shots/sistemas/`; classes do CSS Modules conferidas no HTML servido (hashadas, sem `undefined`); grão de café no mobile ajustado (símbolo a 90px abaixo de 750px, devolvendo a intenção da origem).
- Etapa 04 (validação da entrega anterior): ✅ testes, build, HTTP 200 nas 3 lojas e subrotas, mensagem exata de checkout, páginas utilitárias `noindex` e ausência de JSON-LD de oferta.

## Funcionalidades implementadas

### Sistemas Básicos (integração)
1. ✅ Três painéis com identidade própria (GRÃO, CORTE & CIA, NUVEM) sobre um único componente parametrizado
2. ✅ CRUD completo: cadastrar/editar, excluir com confirmação em duas etapas (diálogo acessível `role="dialog"`, sem `window.confirm`)
3. ✅ Busca por texto e filtros por situação (tabs com `aria-pressed`)
4. ✅ Indicadores automáticos: contagens, soma de valores (R$) e alertas (reposição abaixo de 5 unidades; valor total da coleção)
5. ✅ Bloqueio de sobreposição de horários em agendamentos ("Esse horário coincide com outro atendimento.")
6. ✅ Status encadeados com um clique (`recebido → em preparo → pronto`; `confirmado → finalizado`) e status derivados de estoque (`Disponível/Estoque baixo/Esgotado`)
7. ✅ Persistência em `localStorage` com as chaves da origem, validação do payload salvo e aviso honesto quando o armazenamento está indisponível
8. ✅ Avisos exatos: "Registro salvo com sucesso.", "Dados mantidos nesta sessão. Armazenamento indisponível.", "Preencha os campos com texto válido.", "Nenhum registro encontrado. Adicione um novo ou ajuste a busca."
9. ✅ Responsivo de 320px (tabela com rolagem horizontal como na origem), foco visível, `prefers-reduced-motion`, contraste 4,5:1 verificado
10. ✅ SEO por página (canonical absoluto + Open Graph), sem dados estruturados de oferta

### E-commerce (Etapa 04)
1. ✅ Catálogo por loja com busca, filtros e ordenação; página de produto com SEO próprio
2. ✅ Variantes de tamanho/cor na NOIR (variantes geradas e testadas); fichas técnicas na NEXUS; ingredientes/kits na Botânica (sem alegações médicas)
3. ✅ Favoritos locais (NOIR) e comparador de até 3 produtos (NEXUS) persistidos por loja
4. ✅ Carrinho isolado por loja (`cm-ecommerce:cart:<slug>`) com totais validados
5. ✅ Checkout demonstrativo com a mensagem exata **"Pedido demonstrativo criado. Nenhuma compra ou pagamento foi realizado."** — sem pagamentos
6. ✅ Páginas utilitárias `carrinho`/`checkout`/`favoritos` com `robots: noindex` e fora do sitemap
7. ✅ Layouts por loja com `StoreProvider`, header/footer próprios e restauração sem divergência de hidratação
8. ✅ Responsivo de 320px, acessibilidade e `prefers-reduced-motion`; sem JSON-LD de oferta

### Vértice Engenharia
1. ✅ Header próprio fixo com navegação (Início, Sobre, Serviços, Projetos, Contato) e menu mobile acessível
2. ✅ Hero técnico arquitetônico com 2 CTAs
3. ✅ Apresentação com missão e 4 valores
4. ✅ Página Sobre: história fictícia, missão, valores e metodologia em 5 etapas
5. ✅ Página Serviços: 4 serviços detalhados com itens de escopo
6. ✅ Página Projetos: 6 projetos fictícios com imagens, tipo e descrição
7. ✅ Página Contato: WhatsApp honesto "não configurado", e-mail, horários e aviso de demonstração
8. ✅ SEO específico por página (canonical + Open Graph)

### Lumina Odontologia
1. ✅ Header próprio (Início, Sobre, Especialidades, Estrutura, Contato) com menu mobile
2. ✅ Hero arejado e apresentação com 4 diferenciais
3. ✅ Página Sobre: história fictícia, proposta de atendimento, estrutura e diferenciais
4. ✅ Página Especialidades: 5 áreas com informação educativa, sem promessas de resultado e sem nomes/CROs
5. ✅ Página Estrutura: galeria com 5 ambientes e legendas
6. ✅ Página Contato: agendamento por canal externo configurável — **nenhum formulário de dados de saúde**; endereço/telefone reais não informados
7. ✅ SEO específico por página

### Altavista Imóveis
1. ✅ Header próprio (Início, Sobre, Imóveis, Contato) com menu mobile
2. ✅ Hero editorial e apresentação da imobiliária
3. ✅ Home com 3 imóveis em destaque
4. ✅ Página Imóveis: 6 imóveis com fichas completas + **filtros locais** por tipo (Todos/Casas/Apartamentos/Coberturas) e faixa de preço (até R$ 700 mil / R$ 700 mil–R$ 1,5 mi / acima de R$ 1,5 mi), contagem anunciada, estado vazio e limpar filtros
5. ✅ Detalhe estático por slug (`generateStaticParams`, 6 páginas): galeria, ficha técnica, características e CTA de contato externo
6. ✅ Página Sobre: história, valores e diferenciais (sem CRECI, corretores ou endereços reais)
7. ✅ SEO único por página e por imóvel (canonical + Open Graph com valor fictício)
8. ✅ Rodapé com link "Voltar ao catálogo" e aviso de demonstração

## Limitações conhecidas

- Não há backend, autenticação, banco de dados, CMS nem pagamentos; carrinhos, favoritos, comparador e painéis dos sistemas vivem no `localStorage` do navegador (dados fictícios).
- Números de WhatsApp/telefone não configurados — fallback honesto "não configurado" exibido; nenhum número foi inventado.
- As páginas hub de categoria não existem: o menu do catálogo leva a `/#catalogo` (seção da home) até que sejam criadas.
- Imagens: 31 fotos locais otimizadas (`public/imgs/`, derivadas de imagens da Unsplash, licença gratuita de uso), ilustrativas e não específicas das marcas fictícias; substituíveis por fotos dos clientes na entrega.
- Endereços, e-mails e Instagram são demonstrativos; não há CNPJ, clientes, depoimentos, registros profissionais ou certificações.
- Menu mobile e diálogos verificados por testes de DOM e por capturas de navegador; não há cobertura de navegador para todos os estados clicáveis.

## Próximos passos recomendados

1. **Páginas hub por categoria** (opcional): criar `/exemplos/{simples,institucionais,ecommerce,sistemas}` e realinhar os links já preparados em `CATEGORIES.route`.
2. Configurar números de WhatsApp reais quando houver autorização dos clientes (`whatsappLink`/`phone` já tipados para `string | null`).
3. Substituir as imagens ilustrativas por fotos específicas de cada cliente quando disponíveis.
4. Publicação (push de código e deploy na Vercel) permanece **pendente de autorização**.
