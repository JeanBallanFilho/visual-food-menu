
-- 1) Hide sensitive company columns from public reads via a safe view
DROP POLICY IF EXISTS "Companies are public" ON public.companies;

CREATE POLICY "Companies no direct read"
  ON public.companies FOR SELECT
  USING (false);

CREATE OR REPLACE VIEW public.companies_public
WITH (security_invoker = on) AS
SELECT id, fantasy_name, logo_url, instagram, site,
       is_primary, active, sort_order, created_at, updated_at
FROM public.companies;

GRANT SELECT ON public.companies_public TO anon, authenticated;

-- Allow the view's underlying SELECT to succeed for anon/authenticated
-- by adding a policy that exposes ONLY the non-sensitive columns via the view.
-- Since security_invoker=on enforces RLS as the caller, we need a permissive
-- SELECT policy. We instead make a column-scoped allowance by replacing the
-- deny-all with a per-row allowance; the view only projects safe columns.
DROP POLICY IF EXISTS "Companies no direct read" ON public.companies;
CREATE POLICY "Companies safe read"
  ON public.companies FOR SELECT
  USING (true);
-- Revoke direct column access to sensitive fields from anon/authenticated.
REVOKE SELECT ON public.companies FROM anon, authenticated;
GRANT SELECT (id, fantasy_name, logo_url, instagram, site,
              is_primary, active, sort_order, created_at, updated_at)
  ON public.companies TO anon, authenticated;

-- 2) Lock down product-images storage writes (only service role may write)
CREATE POLICY "product-images deny insert"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'product-images' AND false);

CREATE POLICY "product-images deny update"
  ON storage.objects FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'product-images' AND false);

CREATE POLICY "product-images deny delete"
  ON storage.objects FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'product-images' AND false);
