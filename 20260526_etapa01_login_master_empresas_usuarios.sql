-- Etapa 01 — Login Master + Gestão de Empresas e Usuários
-- Rode este SQL no Supabase antes de testar o novo login.

ALTER TABLE public.companies
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

CREATE TABLE IF NOT EXISTS public.app_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text NOT NULL UNIQUE,
  role text NOT NULL DEFAULT 'visualizador' CHECK (role IN ('master', 'admin_empresa', 'editor', 'visualizador')),
  company_id uuid REFERENCES public.companies(id) ON DELETE SET NULL,
  password_hash text NOT NULL,
  password_salt text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS app_users_email_idx ON public.app_users(email);
CREATE INDEX IF NOT EXISTS app_users_company_id_idx ON public.app_users(company_id);

ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "app_users deny anon read" ON public.app_users;
CREATE POLICY "app_users deny anon read"
ON public.app_users FOR SELECT
TO anon
USING (false);

-- A API /api/admin acessa app_users com service_role, então não precisa policy pública.

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS touch_app_users_updated_at ON public.app_users;
CREATE TRIGGER touch_app_users_updated_at
BEFORE UPDATE ON public.app_users
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS touch_companies_updated_at ON public.companies;
CREATE TRIGGER touch_companies_updated_at
BEFORE UPDATE ON public.companies
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Garante que a empresa Bravo Café já tenha campos básicos preenchidos.
UPDATE public.companies
SET
  fantasy_name = COALESCE(NULLIF(fantasy_name, ''), 'Bravo Café'),
  legal_name = COALESCE(NULLIF(legal_name, ''), 'Bravo Café'),
  email = COALESCE(email, 'jeanballan@gmail.com'),
  instagram = COALESCE(instagram, '@_bravocafe'),
  site = COALESCE(site, 'https://visual-food-menu.vercel.app'),
  active = true,
  is_primary = true
WHERE fantasy_name ILIKE '%Bravo%';
