import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString,
} from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  city: parseAsString.withDefault(""),
  guests: parseAsInteger.withDefault(2),
  start: parseAsIsoDateTime,
  end: parseAsIsoDateTime,
});

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>;
