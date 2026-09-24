create table if not exists public.site_settings (
 id text primary key, hero_eyebrow text, hero_heading text, hero_description text,
 primary_button text, secondary_button text, featured_profile_id uuid, logo_url text,
 announcement text, about_title text, about_text text, contact_email text,
 contact_whatsapp text, privacy_text text, terms_text text,
 updated_at timestamptz default now()
);
alter table public.site_settings enable row level security;
-- Add your admin-only RLS policies after confirming your existing auth/role setup.
-- Do not put a service-role key in admin.js.
