SamajSaathi Admin Panel V1

Files:
admin.html
admin.css
admin.js
admin-schema.sql

Setup:
1. Put these files beside index.html on GitHub Pages.
2. In admin.js replace YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY with your existing project values.
3. Run admin-schema.sql in Supabase after reviewing it.
4. Create/use the admin account in Supabase Authentication.
5. Open /samajsathimatrimony/admin.html

This V1 manages Dashboard, Profiles, Homepage settings and Website Content.
Payments, reports, interests and family introductions are intentionally not connected to guessed table names.
Use Supabase Auth + RLS. Never use a service-role key in browser code.
