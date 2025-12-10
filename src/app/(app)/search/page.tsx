import type { Metadata } from "next";
import { Suspense } from "react";

import { HotelResults } from "@/components/search/HotelResults";
import { ResultsSkeleton } from "@/components/search/ResultsSkeleton";
import { SearchFilters } from "@/components/search/SearchFilters";
import { searchParamsCache } from "@/lib/nuqs";

export const metadata: Metadata = {
  title: "Search hotels | Atlas",
  description: "Find luxury stays with guaranteed data integrity and instant UX.",
};

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const filters = searchParamsCache.parse(await searchParams);
  const normalized = {
    city: filters.city,
    guests: filters.guests,
    start: filters.start ? filters.start.toISOString() : null,
    end: filters.end ? filters.end.toISOString() : null,
  };

  return (
    <div className="space-y-8">
      <SearchFilters />
      <Suspense key={JSON.stringify(normalized)} fallback={<ResultsSkeleton />}>
        <HotelResults searchParams={normalized} />
      </Suspense>
    </div>
  );
}
