
# Media Planner Starter (Next.js + Prisma, SQLite dev)

This is a minimal, runnable starter implementing key entities and endpoints for a media planning tool.

## Dev Setup
1. `cd apps/web`
2. `cp .env.example .env.local` (adjust if needed)
3. `pnpm install` (or `npm i`)
4. `pnpm prisma:migrate` (creates SQLite file)
5. `pnpm dev` then open http://localhost:3000

## Git: create a branch and push
```bash
git checkout -b feat/media-planner-starter
# add files from this folder
git add .
git commit -m "feat: media planner starter (sqlite dev, gcp-ready)"
git push -u origin feat/media-planner-starter
```
