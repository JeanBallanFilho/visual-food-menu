
-- ============================================================
-- 1) MARKERS
-- ============================================================
CREATE TABLE public.markers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  label_pt text NOT NULL,
  label_en text NOT NULL,
  label_es text NOT NULL,
  icon_name text NOT NULL DEFAULT 'circle',
  icon_color text NOT NULL DEFAULT '#16a34a',
  active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.markers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Markers are public" ON public.markers FOR SELECT USING (true);
CREATE TRIGGER markers_touch BEFORE UPDATE ON public.markers
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.markers (slug, label_pt, label_en, label_es, icon_name, icon_color, sort_order) VALUES
  ('gluten-free',   'Sem Glúten',     'Gluten Free',     'Sin Gluten',     'wheat-off', '#d97706', 1),
  ('lactose-free',  'Sem Lactose',    'Lactose Free',    'Sin Lactosa',    'milk-off',  '#0ea5e9', 2),
  ('sugar-free',    'Sem Açúcar',     'Sugar Free',      'Sin Azúcar',     'candy-off', '#db2777', 3),
  ('vegetarian',    'Vegetariano',    'Vegetarian',      'Vegetariano',    'leaf',      '#16a34a', 4),
  ('vegan',         'Vegano',         'Vegan',           'Vegano',         'sprout',    '#15803d', 5);

-- ============================================================
-- 2) PRODUCT_MARKERS (N-N)
-- ============================================================
CREATE TABLE public.product_markers (
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  marker_id  uuid NOT NULL REFERENCES public.markers(id)  ON DELETE CASCADE,
  PRIMARY KEY (product_id, marker_id)
);
ALTER TABLE public.product_markers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Product markers are public" ON public.product_markers FOR SELECT USING (true);
CREATE INDEX idx_product_markers_product ON public.product_markers(product_id);
CREATE INDEX idx_product_markers_marker  ON public.product_markers(marker_id);

-- Migrate existing boolean flags
INSERT INTO public.product_markers (product_id, marker_id)
SELECT p.id, m.id FROM public.products p, public.markers m
WHERE (m.slug = 'gluten-free'  AND p.gluten_free  = true)
   OR (m.slug = 'lactose-free' AND p.lactose_free = true)
   OR (m.slug = 'sugar-free'   AND p.sugar_free   = true);

ALTER TABLE public.products
  DROP COLUMN gluten_free,
  DROP COLUMN lactose_free,
  DROP COLUMN sugar_free;

-- ============================================================
-- 3) COMPANIES
-- ============================================================
CREATE TABLE public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fantasy_name text NOT NULL,
  legal_name text,
  cnpj text,
  address text,
  logo_url text,
  instagram text,
  site text,
  is_primary boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Companies are public" ON public.companies FOR SELECT USING (true);
CREATE TRIGGER companies_touch BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Ensure only one is_primary at a time
CREATE UNIQUE INDEX uniq_companies_primary ON public.companies (is_primary) WHERE is_primary = true;

-- ============================================================
-- 4) THEME SETTINGS
-- ============================================================
CREATE TABLE public.theme_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  background text NOT NULL DEFAULT 'oklch(1 0 0)',
  foreground text NOT NULL DEFAULT 'oklch(0.145 0 0)',
  primary_color text NOT NULL DEFAULT 'oklch(0.205 0 0)',
  primary_foreground text NOT NULL DEFAULT 'oklch(0.985 0 0)',
  accent text NOT NULL DEFAULT 'oklch(0.97 0 0)',
  accent_foreground text NOT NULL DEFAULT 'oklch(0.205 0 0)',
  muted text NOT NULL DEFAULT 'oklch(0.97 0 0)',
  border text NOT NULL DEFAULT 'oklch(0.922 0 0)',
  singleton boolean NOT NULL DEFAULT true UNIQUE,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.theme_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Theme is public" ON public.theme_settings FOR SELECT USING (true);
CREATE TRIGGER theme_settings_touch BEFORE UPDATE ON public.theme_settings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.theme_settings DEFAULT VALUES;
