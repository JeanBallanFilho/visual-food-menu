ALTER TABLE public.products
ADD COLUMN lactose_free boolean NOT NULL DEFAULT false,
ADD COLUMN sugar_free boolean NOT NULL DEFAULT false;