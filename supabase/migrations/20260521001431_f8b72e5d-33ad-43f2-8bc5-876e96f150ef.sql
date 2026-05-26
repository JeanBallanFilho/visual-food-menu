ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS available_days integer[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS time_start_1 time,
  ADD COLUMN IF NOT EXISTS time_end_1 time,
  ADD COLUMN IF NOT EXISTS time_start_2 time,
  ADD COLUMN IF NOT EXISTS time_end_2 time;