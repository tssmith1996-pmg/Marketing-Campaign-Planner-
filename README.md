# Media Planner Starter (Next.js + Prisma, SQLite dev)

This starter now supports multi-user authentication via NextAuth and Prisma. Users can sign in with an email (no password) and are automatically placed into a default organization. The stack is provisioned to run on Google Cloud (e.g. Cloud SQL) but defaults to an in-repo SQLite database for rapid iteration.

Early domain primitives like **Clients** are available through `/api/clients` and a basic `/clients` management page.

A Camphouse-inspired UI scaffold includes global navigation with an organization switcher plus routes for Clients, Campaigns, Plans, Vendors, Reports, and Alerts. Plans feature a spreadsheet-like editor with inline validation, bulk CSV paste, real-time totals, and sticky action header. Stub pages for version diffs, pacing dashboard, and a report builder provide placeholders for future expansion.

## Dev Setup
1. `cd apps/web`
2. `cp .env.example .env.local`
3. `npm install`
4. `npm run prisma:migrate`
5. `npm run dev` then open http://localhost:3000

To sign in, visit `/api/auth/signin` and enter an email address. The first user creates a default organization; subsequent users join it. Swap `DATABASE_PROVIDER` and `DATABASE_URL` in the `.env` when migrating to Cloud SQL or another GCP database.

## Git: create a branch and push
```bash
git checkout -b feat/media-planner-starter
# add files from this folder
git add .
git commit -m "feat: media planner starter (sqlite dev, gcp-ready)"
git push -u origin feat/media-planner-starter
```
