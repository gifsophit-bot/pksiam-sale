alter table public.products
  add column if not exists tax_category text not null default 'exempt'
    check (tax_category in ('exempt', 'food', 'service', 'alcohol'));

alter table public.products
  alter column currency set default 'JPY';

alter table public.quotes
  alter column currency set default 'JPY';

alter table public.orders
  alter column currency set default 'JPY';

update public.products
set currency = 'JPY',
    tax_category = case
      when tax_rate = 8 then 'food'
      when tax_rate = 10 then 'service'
      else 'exempt'
    end,
    tax_rate = case
      when tax_rate in (8, 10) then tax_rate
      else 0
    end;

update public.quotes set currency = 'JPY';
update public.orders set currency = 'JPY';

alter table public.products
  drop constraint if exists products_tax_rate_check;

alter table public.products
  add constraint products_tax_rate_check check (tax_rate in (0, 8, 10));

alter table public.quote_items
  drop constraint if exists quote_items_tax_rate_check;

alter table public.quote_items
  add constraint quote_items_tax_rate_check check (tax_rate in (0, 8, 10));

alter table public.order_items
  drop constraint if exists order_items_tax_rate_check;

alter table public.order_items
  add constraint order_items_tax_rate_check check (tax_rate in (0, 8, 10));
