# Visual Food Menu BravoCafe

Projeto limpo do cardápio visual do Bravo Café, preparado para rodar fora do Lovable.

## Stack

- React + Vite
- Vercel
- Supabase
- Hostinger apenas para DNS/domínio

## O que foi removido

- Dependências diretas do Lovable
- TanStack Start SSR
- Cloudflare/Wrangler
- Configurações que estavam gerando conflito de deploy

## Deploy no Vercel

Configurações recomendadas:

- Framework Preset: Vite
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: `dist`

## Variáveis de ambiente necessárias no Vercel

Use os mesmos dados do Supabase do projeto original.

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua-chave-anon-publica
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role-apenas-no-vercel
ADMIN_PASSWORD=sua-senha-do-painel
```

## Rotas

- `/` — cardápio público
- `/admin` — login do painel
- `/admin/painel` — painel administrativo

## Observação importante

A chave `SUPABASE_SERVICE_ROLE_KEY` nunca deve ir para o navegador. Ela deve ser cadastrada somente nas variáveis de ambiente do Vercel.
