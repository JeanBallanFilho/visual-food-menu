# Supabase Heartbeat

Este projeto possui uma rotina tecnica isolada para gerar atividade minima diaria no Supabase.

## O que a rotina faz

A rotina executa um `upsert` diario apenas na tabela tecnica `public.system_heartbeat`.

Ela grava somente:

- `service_name = 'visual-food-menu'`
- `last_ping_at`
- `updated_at`

Ela nao altera produtos, categorias, precos, imagens, disponibilidade, usuarios, permissoes ou qualquer outro dado operacional do cardapio.

## Arquivos criados ou alterados

- `supabase/migrations/20260604_create_system_heartbeat.sql`
  - Cria a tabela isolada `public.system_heartbeat`.
  - Ativa RLS na tabela.
  - Nao cria politicas publicas.

- `scripts/supabase-heartbeat.mjs`
  - Executa o upsert idempotente usando `service_name = 'visual-food-menu'`.
  - Valida a resposta do Supabase.
  - Falha claramente no log se a conexao ou o upsert nao funcionar.

- `.github/workflows/supabase-heartbeat.yml`
  - Executa automaticamente uma vez por dia via cron UTC.
  - Permite execucao manual via `workflow_dispatch`.

- `package.json`
  - Adiciona o script `npm run heartbeat`.

## Secrets necessarios no GitHub

Configure estes secrets no repositorio do GitHub:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Nunca coloque essas chaves no codigo, em arquivos `.env` versionados ou no workflow diretamente.

## Como configurar os secrets

1. Abra o repositorio no GitHub.
2. Entre em `Settings`.
3. No menu lateral, abra `Secrets and variables`.
4. Clique em `Actions`.
5. Clique em `New repository secret`.
6. Crie o secret `SUPABASE_URL` com a URL do projeto Supabase.
7. Crie o secret `SUPABASE_SERVICE_ROLE_KEY` com a service role key do projeto Supabase.

## Como aplicar a migration

Execute o SQL de `supabase/migrations/20260604_create_system_heartbeat.sql` no SQL Editor do Supabase, ou aplique pelo fluxo de migrations usado no projeto.

A tabela criada e isolada:

```sql
public.system_heartbeat
```

## Como testar manualmente

No GitHub:

1. Abra a aba `Actions`.
2. Selecione o workflow `Supabase Heartbeat`.
3. Clique em `Run workflow`.
4. Aguarde a execucao.
5. O log deve terminar com uma mensagem parecida com:

```text
Supabase heartbeat OK for visual-food-menu at 2026-06-04T07:17:00.000Z.
```

Localmente, se as variaveis de ambiente estiverem configuradas:

```bash
npm run heartbeat
```

## Como desativar

Para desativar temporariamente:

1. Abra `.github/workflows/supabase-heartbeat.yml`.
2. Comente ou remova o bloco `schedule`.
3. Mantenha `workflow_dispatch` se quiser permitir execucao manual.

Para desativar completamente:

1. Remova `.github/workflows/supabase-heartbeat.yml`.
2. Opcionalmente remova `scripts/supabase-heartbeat.mjs`.
3. Opcionalmente remova a tabela `public.system_heartbeat`.

## Garantia de isolamento

Esta rotina foi desenhada para apenas dar sinal de vida ao Supabase.

Ela nao encosta em nenhuma tabela funcional do cardapio e nao deve ser reaproveitada para nenhuma logica de produto.
