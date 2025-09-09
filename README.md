# Marketing Campaign Planner

Marketing Campaign Planner is an experimental media-planning toolkit built with **Next.js** and **Prisma**. It aims to give agencies a modern web interface for planning campaigns, tracking pacing, and collaborating with clients.

The project ships with a basic vertical slice for planning and reporting and is ready to expand into a full featured platform. It currently uses an in-repo SQLite database for quick iteration but is structured to run on PostgreSQL in Google Cloud.

## Features

- **Multi-tenant auth** – email based sign-in powered by NextAuth with automatic organization creation.
- **Client & campaign management** – simple pages and APIs for creating clients and campaigns with KPI targets.
- **Spreadsheet-like plan editor** – inline validation, bulk CSV paste, quick add rows and running totals.
- **Pacing dashboard** – compares actual metrics against campaign targets; supports CSV or Supermetrics imports.
- **Supermetrics connector** – `/api/datafeeds/supermetrics` endpoint to pull spend, impressions and clicks directly.
- **Pacing API** – `GET /api/pacing` returns plan vs. actual spend snapshots for campaigns.
- **OpenAPI schema** – see `apps/web/openapi.yaml` for a full API surface outline.
- **Cost estimation** – per line item estimates based on channel, format, audience and flight length.
- **PDF exports** – plan versions can be exported to a basic PDF summary for clients.
- **Camphouse inspired UI** – persistent sidebar and top bar navigation with sample dashboard components.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS.
- **Backend:** Next.js API routes, Prisma ORM.
- **Database:** SQLite for development; ready for PostgreSQL/Cloud SQL on GCP.
- **Testing:** Node test runner and Jest-style assertions.

## Getting Started

1. `cd apps/web`
2. `cp .env.example .env.local`
3. Add your `SUPERMETRICS_API_KEY` if you intend to import data
4. `npm install`
5. `npm run prisma:migrate`
6. `npm run dev` and visit `http://localhost:3000`

Sign in at `/api/auth/signin` with any email. The first account becomes the default organization; additional accounts join it automatically.

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the production bundle |
| `npm test` | Run unit tests |
| `npm run prisma:migrate` | Apply database migrations |

## Data Import

Use the **Data Viewer** at `/reports/data` to inspect stored metrics and trigger Supermetrics imports. Alternatively, call `POST /api/datafeeds/supermetrics` with:

```json
{ "campaignId": "<id>", "dsId": "<supermetrics source id>", "startDate": "YYYY-MM-DD", "endDate": "YYYY-MM-DD" }
```

## Roadmap

Planned enhancements include:

- Plan versioning, approvals and comment threads
- Vendor and rate card management
- Advanced pacing analytics with alerts and recommendations
- Report builder with drag-and-drop dimensions and metrics

Contributions and ideas are welcome. This repository is a starting point for a full-fledged media planning platform.

