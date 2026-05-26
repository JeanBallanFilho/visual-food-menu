ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS ingredients_pt text,
  ADD COLUMN IF NOT EXISTS ingredients_en text,
  ADD COLUMN IF NOT EXISTS ingredients_es text;