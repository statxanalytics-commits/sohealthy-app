-- ============================================
-- SOHEALTHY APP — SUPABASE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. PROFILES (one per user)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  username text unique not null,
  email text not null,
  is_premium boolean default false,
  order_code text,
  plan_start timestamptz,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Policies: users can read/update only their own profile
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- 2. ORDERS (imported from Google Sheets)
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  order_code text unique not null,
  client_name text,
  used boolean default false,
  verified_at timestamptz,
  activated_by uuid references profiles(id),
  device_token text,
  sheet_source text, -- 'ULTRA', 'QUIK', etc.
  created_at timestamptz default now()
);

-- RLS: anyone can read (to verify code), only service_role can insert
alter table orders enable row level security;

create policy "Anyone can verify order code"
  on orders for select
  using (true);

create policy "Activated user can update their order"
  on orders for update
  using (auth.uid() = activated_by or activated_by is null);

-- 3. CLIENT PRODUCTS (which products user selected after activation)
create table if not exists client_products (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  product_slug text not null,
  selected_at timestamptz default now(),
  plan_start date,
  plan_day integer default 1,
  is_active boolean default true,
  notif_time_1 text, -- e.g. '07:00'
  notif_time_2 text, -- e.g. '20:00' (optional)
  expo_push_token text
);

alter table client_products enable row level security;

create policy "Users can manage own products"
  on client_products for all
  using (auth.uid() = user_id);

-- 4. TRACKER ENTRIES (daily supplement check-ins)
create table if not exists tracker_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  product_slug text not null,
  date date not null,
  checked boolean default false,
  checked_at timestamptz,
  unique(user_id, product_slug, date)
);

alter table tracker_entries enable row level security;

create policy "Users can manage own tracker"
  on tracker_entries for all
  using (auth.uid() = user_id);

-- 5. SCAN HISTORY (food scanner results)
create table if not exists scan_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  food_name text not null,
  calories integer,
  protein_g numeric(5,1),
  carbs_g numeric(5,1),
  fat_g numeric(5,1),
  fiber_g numeric(5,1),
  sugar_g numeric(5,1),
  items jsonb, -- full list of detected foods
  rating text, -- 'E Shëndetshme', 'Mesatare', 'Duhet Përmirësuar'
  scanned_at timestamptz default now()
);

alter table scan_history enable row level security;

create policy "Users can manage own scans"
  on scan_history for all
  using (auth.uid() = user_id);

-- 6. DIET PLANS (generated plans)
create table if not exists diet_plans (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  product_slug text not null,
  plan_content jsonb not null, -- full 14-day plan
  generated_at timestamptz default now(),
  is_active boolean default true
);

alter table diet_plans enable row level security;

create policy "Users can manage own diet plans"
  on diet_plans for all
  using (auth.uid() = user_id);

-- ============================================
-- IMPORT ORDERS FROM GOOGLE SHEETS
-- Run this for each batch of codes:
-- ============================================
-- insert into orders (order_code, client_name, sheet_source)
-- values
--   ('QK235-01518', 'Kledi_xh', 'ULTRA'),
--   ('QK235-01517', 'Valbona_leka', 'ULTRA'),
--   ('HY8577424', 'Hotel_ansel', 'QUIK')
-- on conflict (order_code) do nothing;
