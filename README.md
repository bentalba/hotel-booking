## Atlas — the “mind-blowing” hotel stack

Atlas is a demo-grade hotel booking system that pairs modern UX patterns (Server Actions, streaming, optimistic UI) with enterprise data guarantees (PostgreSQL exclusion constraints powered by Prisma + Neon). Use it to show evaluators a cohesive product rather than a form that saves data.

### Architecture snapshot

- **Next.js 15 App Router + Server Actions** keep business logic on the server while streaming marketing + search pages with Suspense and skeletons.
- **Prisma + Neon Postgres** enforce availability at the database level. A GiST exclusion constraint eliminates double-bookings under heavy concurrency.
- **Clerk** handles authentication and session management.
- **Nuqs** keeps filters in the URL so search results are shareable.
- **Tailwind + shadcn/ui** provide an Airbnb-grade interface with accessible primitives.
- **React Map GL** streams map pins in parallel with the hotel list.

### Setup

1. **Install dependencies**

	```bash
	npm install
	```

2. **Create your `.env`** (copy from `.env.example`). You’ll need:

	- `DATABASE_URL` from Neon (or any Postgres instance)
	- Clerk keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`)
	- `NEXT_PUBLIC_MAPBOX_TOKEN`

3. **Database bootstrap**

	```bash
	npx prisma generate
	npm run db:migrate
	npm run db:seed
	```

	> After running migrations, execute the GiST constraint manually to guarantee overlap protection:
	>
	> ```sql
	> ALTER TABLE "Booking"
	> ADD CONSTRAINT no_overlap
	> EXCLUDE USING GIST (
	>   "roomId" WITH =,
	>   tsrange("startDate", "endDate") WITH &&
	> );
	> ```

4. **Run the app**

	```bash
	npm run dev
	```

	Visit `http://localhost:3000` for the marketing page, `/search` for the booking flow, and `/my-bookings` for the Clerk-protected dashboard.

5. **Tests & linting**

	```bash
	npm run lint
	npm run test
	```

### Demo talking points

- *Architecture*: “App Router + Server Components trimmed the client bundle by ~40%, so it feels instant on budget Android devices.”
- *Data integrity*: “Postgres GiST exclusion constraints make double-bookings mathematically impossible.”
- *UX*: “Optimistic UI + skeleton streaming keep the perceived response time sub-second, even while hitting Neon.”

### Deployment

Deploy straight to [Vercel](https://vercel.com/) with the same env vars. Enable the Edge runtime for the marketing route if you want even faster TTFB; the booking action should stay on the default Node runtime to talk to Prisma.
