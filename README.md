# Code Maestro Tech — Portfólio Demonstrativo

Portfólio da marca independente **Code Maestro Tech**, com 12 demonstrações fictícias em quatro categorias: sites simples, sites institucionais, lojas virtuais e sistemas demonstrativos. A home foi redesenhada a partir da logo oficial, sem preços, pacotes ou termos comerciais. As 12 demonstrações mantêm seu design e funcionamento originais.

**Site:** https://codemaestrotech.com.br · **WhatsApp:** https://wa.me/553531911991 · **E-mail:** jp436807@gmail.com

## Conceito

**"A Magia da Nova Era — A Magia da Tecnologia."**

Engenharia digital e criatividade: carvão, prata, azul elétrico e ciano derivados da logo original. Tipografia expressiva, detalhes técnicos e microinterações discretas. Design system exclusivo em CSS Modules, sem interferir nas demonstrações.

## Stack tecnológica

- [Next.js 16](https://nextjs.org/) com App Router
- [TypeScript](https://www.typescriptlang.org/) com tipagem rigorosa (`strict`)
- [Tailwind CSS v4]
- [Lucide React] para ícones
- [Vitest] + [Testing Library] para testes automatizados
- Metadados nativos do Next.js (SEO, Open Graph)
- Sitemap e robots.txt gerados estaticamente
- Persistência local (`localStorage`) nos carrinhos, favoritos, comparador e painéis dos sistemas

Não há backend, autenticação, banco de dados nem serviços pagos nesta etapa.

## Estrutura de rotas

| Rota | Descrição |
|------|-----------|
| `/` | Portfólio demonstrativo, galeria filtrável, institucional e contato oficial |
| `/exemplos/simples/barbearia` | Demonstração completa — Barbearia Ferro & Navalha |
| `/exemplos/simples/padaria` | Demonstração completa — Padaria Aurora |
| `/exemplos/simples/salao-beleza` | Demonstração completa — Maison Belle |
| `/exemplos/institucionais/engenharia` | Demonstração completa — Vértice Engenharia (5 páginas) |
| `/exemplos/institucionais/odontologia` | Demonstração completa — Lumina Odontologia (5 páginas) |
| `/exemplos/institucionais/imobiliaria` | Demonstração completa — Altavista Imóveis (4 páginas + 6 detalhes de imóvel) |
| `/exemplos/ecommerce/moda` | Demonstração completa — NOIR Studio (Loja de Roupas) |
| `/exemplos/ecommerce/eletronicos` | Demonstração completa — NEXUS (Loja de Eletrônicos) |
| `/exemplos/ecommerce/cosmeticos` | Demonstração completa — Botânica (Loja de Cosméticos) |
| `/exemplos/sistemas/pedidos` | Demonstração completa — GRÃO (Sistema de Pedidos, cafeteria) |
| `/exemplos/sistemas/agendamentos` | Demonstração completa — CORTE & CIA (Sistema de Agendamentos, barbearia) |
| `/exemplos/sistemas/estoque` | Demonstração completa — NUVEM (Controle de Estoque, loja de roupas) |

> As 12 demonstrações possuem identidades visuais independentes, SEO por página e conteúdo fictício marcado como demonstração. As lojas e os sistemas operam inteiramente no navegador (sem backend): carrinhos, favoritos, comparador e registros dos painéis são persistidos em `localStorage` com validação e degradação honesta quando o armazenamento está indisponível.

## Comandos

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (http://localhost:3000)
npm run dev

# Verificação de tipos TypeScript
npx tsc --noEmit

# Lint (ESLint)
npm run lint

# Testes automatizados (Vitest)
npm test

# Build de produção
npm run build

# Servidor de produção local
npm start
```

## Documentação

- `docs/ARQUITETURA.md` — estrutura de pastas, componentes reutilizáveis e decisões técnicas
- `docs/RELATORIO_PROJETO.md` — funcionalidades, rotas, status e próximos passos
- `docs/TERMOS_COMERCIAIS.md` — documento comercial histórico interno; não exibido na home

Validação atual: **261 testes em 25 arquivos**, TypeScript, lint e build (90/90) aprovados.
Há um teste de integridade de 166 arquivos protegidos das demos/estilos/logo.

## Publicação na Vercel

O projeto está configurado para ser implantado na Vercel:

1. Faça push do código para um repositório GitHub.
2. Conecte o repositório ao [Vercel](https://vercel.com/).
3. Importe o projeto com as configurações padrão (Next.js detectado automaticamente).
4. Não há variáveis de ambiente obrigatórias nesta etapa.
5. Eventuais planos pagos da Vercel são responsabilidade do contratante (conforme termos comerciais).

## Limitações conhecidas

- Não há backend, autenticação, banco de dados ou processamento de pagamentos reais; carrinhos, favoritos, filtros e os painéis dos sistemas são locais (`localStorage` no navegador).
- As demonstrações usam marcas e informações fictícias; seus contatos internos não foram alterados. O contato oficial do portfólio está configurado.
- Canonicals legados dentro das demos foram preservados; home, sitemap e robots já usam o domínio oficial. Uma migração completa dos metadados internos requer autorização específica.
- Imagens ilustrativas locais (derivadas da Unsplash) — substituíveis por fotos dos clientes.
- Não representa empresa formalmente constituída (não há CNPJ, endereço físico, clientes ou depoimentos reais).

## Licença

Projeto privado — Code Maestro Tech.
