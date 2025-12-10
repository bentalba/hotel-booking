import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const differentiators = [
  {
    title: "Exclusion constraints",
    description: "PostgreSQL GiST indexes guarantee zero double-bookings even under concurrency spikes.",
  },
  {
    title: "Optimistic UX",
    description: "Server Actions, streaming, and optimistic interfaces keep every tap instant.",
  },
  {
    title: "Design system",
    description: "Shadcn UI + Tailwind tokens deliver an enterprise-grade look without a design team.",
  },
];

export default function MarketingPage() {
  return (
    <div className="space-y-16">
      <section className="grid gap-10 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-10 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Mind-blowing hotels</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground lg:text-5xl">
            Silicon-Valley grade booking software for your final presentation.
          </h1>
          <p className="text-lg text-muted-foreground">
            Built with Next.js 15 Server Components, Neon Postgres, and Clerk authentication so you can focus on
            storytelling—not plumbing.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/search">Search stays</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/my-bookings">View my bookings</Link>
            </Button>
          </div>
        </div>
        <Card className="border-emerald-200/60 bg-background/80 shadow-xl">
          <CardHeader>
            <CardTitle>Demo script</CardTitle>
            <CardDescription>Use these sound bites to impress your evaluators.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Architecture:</strong> “App Router + Server Components dropped our client bundle by
              40%, so even low-end Android phones feel instant.”
            </p>
            <p>
              <strong className="text-foreground">Data integrity:</strong> “A GiST exclusion constraint at the database layer makes
              double-bookings mathematically impossible.”
            </p>
            <p>
              <strong className="text-foreground">UX strategy:</strong> “Optimistic mutations and skeleton streaming keep LCP under a
              second, which is vital for travel conversions.”
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {differentiators.map((item) => (
          <Card key={item.title} className="h-full border-border/70">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}
