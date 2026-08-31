create table if not exists public.interests (
  id uuid primary key default gen_random_uuid(),

  sender_id uuid not null references public.profiles(id) on delete cascade,

  receiver_id uuid not null references public.profiles(id) on delete cascade,

  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'rejected')),

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now(),

  unique(sender_id, receiver_id)
);

alter table public.interests enable row level security;

create policy "Users can view their interests"
on public.interests
for select
to authenticated
using (
  auth.uid() = sender_id
  or auth.uid() = receiver_id
);

create policy "Users can send interests"
on public.interests
for insert
to authenticated
with check (
  auth.uid() = sender_id
);

create policy "Receiver can update interest"
on public.interests
for update
to authenticated
using (
  auth.uid() = receiver_id
)
with check (
  auth.uid() = receiver_id
);
