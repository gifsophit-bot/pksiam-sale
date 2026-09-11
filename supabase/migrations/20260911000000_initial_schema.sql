create extension if not exists pgcrypto;

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  legal_name text,
  tax_id text,
  payment_terms text,
  notes text,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  company_id uuid references public.companies(id) on delete set null,
  full_name text,
  role text not null default 'member' check (role in ('admin', 'manager', 'member')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.companies
  add column assigned_salesperson_id uuid references public.profiles(id) on delete set null;

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  first_name text not null,
  last_name text,
  email text,
  phone text,
  preferred_language text not null default 'en' check (preferred_language in ('ja', 'en', 'th')),
  job_title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  address_type text not null default 'shipping' check (address_type in ('billing', 'shipping')),
  label text,
  recipient_name text,
  line1 text not null,
  line2 text,
  city text not null,
  state_or_province text,
  postal_code text,
  country_code text not null default 'TH' check (char_length(country_code) = 2),
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  sku text unique,
  name_ja text not null,
  name_en text not null,
  name_th text not null,
  unit text not null default 'pcs',
  description text,
  unit_price numeric(12, 2) not null default 0 check (unit_price >= 0),
  tax_rate numeric(5, 2) not null default 0 check (tax_rate >= 0 and tax_rate <= 100),
  stock numeric(12, 2) not null default 0 check (stock >= 0),
  storage_type text,
  country_of_origin text,
  currency char(3) not null default 'THB',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete restrict,
  contact_id uuid references public.contacts(id) on delete set null,
  quote_number text not null unique,
  status text not null default 'draft' check (status in ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  currency char(3) not null default 'THB',
  subtotal numeric(12, 2) not null default 0 check (subtotal >= 0),
  tax_amount numeric(12, 2) not null default 0 check (tax_amount >= 0),
  shipping_method text,
  shipping_amount numeric(12, 2) not null default 0 check (shipping_amount >= 0),
  total_amount numeric(12, 2) not null default 0 check (total_amount >= 0),
  valid_until date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  description text not null,
  quantity numeric(12, 2) not null check (quantity > 0),
  unit_price numeric(12, 2) not null check (unit_price >= 0),
  tax_rate numeric(5, 2) not null default 0 check (tax_rate >= 0 and tax_rate <= 100),
  line_total numeric(12, 2) not null default 0 check (line_total >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete restrict,
  contact_id uuid references public.contacts(id) on delete set null,
  quote_id uuid references public.quotes(id) on delete set null,
  order_number text not null unique,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'processing', 'completed', 'cancelled')),
  currency char(3) not null default 'THB',
  customer_name text not null,
  shipping_address_line1 text not null,
  shipping_address_line2 text,
  shipping_address_city text not null,
  shipping_address_state_or_province text,
  shipping_address_postal_code text,
  shipping_address_country_code text not null,
  subtotal numeric(12, 2) not null default 0 check (subtotal >= 0),
  tax_amount numeric(12, 2) not null default 0 check (tax_amount >= 0),
  shipping_method text,
  shipping_amount numeric(12, 2) not null default 0 check (shipping_amount >= 0),
  total_amount numeric(12, 2) not null default 0 check (total_amount >= 0),
  notes text,
  ordered_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity numeric(12, 2) not null check (quantity > 0),
  unit_price numeric(12, 2) not null check (unit_price >= 0),
  tax_rate numeric(5, 2) not null default 0 check (tax_rate >= 0 and tax_rate <= 100),
  line_total numeric(12, 2) not null default 0 check (line_total >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  tracking_number text,
  carrier text,
  shipping_address text not null,
  shipping_date date,
  requested_delivery_date date,
  status text not null default 'pending' check (status in ('pending', 'ready', 'shipped', 'delivered')),
  shipped_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index contacts_company_id_idx on public.contacts(company_id);
create index addresses_company_id_idx on public.addresses(company_id);
create index quotes_company_id_idx on public.quotes(company_id);
create index quote_items_quote_id_idx on public.quote_items(quote_id);
create index orders_company_id_idx on public.orders(company_id);
create index order_items_order_id_idx on public.order_items(order_id);
create index shipments_order_id_idx on public.shipments(order_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger companies_set_updated_at before update on public.companies for each row execute function public.set_updated_at();
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger contacts_set_updated_at before update on public.contacts for each row execute function public.set_updated_at();
create trigger addresses_set_updated_at before update on public.addresses for each row execute function public.set_updated_at();
create trigger products_set_updated_at before update on public.products for each row execute function public.set_updated_at();
create trigger quotes_set_updated_at before update on public.quotes for each row execute function public.set_updated_at();
create trigger quote_items_set_updated_at before update on public.quote_items for each row execute function public.set_updated_at();
create trigger orders_set_updated_at before update on public.orders for each row execute function public.set_updated_at();
create trigger order_items_set_updated_at before update on public.order_items for each row execute function public.set_updated_at();
create trigger shipments_set_updated_at before update on public.shipments for each row execute function public.set_updated_at();

create or replace function public.user_company_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select company_id
  from public.profiles
  where id = auth.uid()
    and company_id is not null;
$$;

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.contacts enable row level security;
alter table public.addresses enable row level security;
alter table public.products enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.shipments enable row level security;

create policy "Members can read companies" on public.companies for select to authenticated
  using (created_by = auth.uid() or id in (select public.user_company_ids()));
create policy "Users can create companies" on public.companies for insert to authenticated
  with check (created_by = auth.uid());
create policy "Members can update companies" on public.companies for update to authenticated
  using (created_by = auth.uid() or id in (select public.user_company_ids()))
  with check (created_by = auth.uid() or id in (select public.user_company_ids()));
create policy "Members can delete companies" on public.companies for delete to authenticated
  using (created_by = auth.uid() or id in (select public.user_company_ids()));

create policy "Users can read their profile" on public.profiles for select to authenticated
  using (id = auth.uid());
create policy "Users can create their profile" on public.profiles for insert to authenticated
  with check (id = auth.uid() and (company_id is null or exists (select 1 from public.companies where id = company_id and created_by = auth.uid())));
create policy "Users can update their profile" on public.profiles for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid() and (company_id is null or exists (select 1 from public.companies where id = company_id and created_by = auth.uid())));

create policy "Members can manage contacts" on public.contacts for all to authenticated
  using (company_id in (select public.user_company_ids()))
  with check (company_id in (select public.user_company_ids()));
create policy "Members can manage addresses" on public.addresses for all to authenticated
  using (company_id in (select public.user_company_ids()))
  with check (company_id in (select public.user_company_ids()));
create policy "Authenticated users can read products" on public.products for select to authenticated using (true);
create policy "Authenticated users can manage products" on public.products for all to authenticated using (true) with check (true);

create policy "Members can manage quotes" on public.quotes for all to authenticated
  using (company_id in (select public.user_company_ids()))
  with check (company_id in (select public.user_company_ids()));
create policy "Members can manage quote items" on public.quote_items for all to authenticated
  using (quote_id in (select id from public.quotes where company_id in (select public.user_company_ids())))
  with check (quote_id in (select id from public.quotes where company_id in (select public.user_company_ids())));

create policy "Members can manage orders" on public.orders for all to authenticated
  using (company_id in (select public.user_company_ids()))
  with check (company_id in (select public.user_company_ids()));
create policy "Members can manage order items" on public.order_items for all to authenticated
  using (order_id in (select id from public.orders where company_id in (select public.user_company_ids())))
  with check (order_id in (select id from public.orders where company_id in (select public.user_company_ids())));
create policy "Members can manage shipments" on public.shipments for all to authenticated
  using (order_id in (select id from public.orders where company_id in (select public.user_company_ids())))
  with check (order_id in (select id from public.orders where company_id in (select public.user_company_ids())));