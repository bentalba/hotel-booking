"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useQueryStates, parseAsInteger, parseAsString, parseAsIsoDateTime } from "nuqs";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const filterConfig = {
  city: parseAsString.withDefault(""),
  guests: parseAsInteger.withDefault(2),
  start: parseAsIsoDateTime,
  end: parseAsIsoDateTime,
};

export function SearchFilters() {
  const [filters, setFilters] = useQueryStates(filterConfig, {
    history: "replace",
    shallow: false,
  });
  const [dates, setDates] = React.useState<DateRange | undefined>(() => {
    if (filters.start && filters.end) {
      return {
        from: new Date(filters.start),
        to: new Date(filters.end),
      };
    }
    return undefined;
  });

  const [city, setCity] = React.useState(filters.city ?? "");
  const [guests, setGuests] = React.useState(filters.guests ?? 2);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dates?.from || !dates?.to) {
      toast({ title: "Choose travel dates" });
      return;
    }
    setFilters({
      city,
      guests,
      start: dates.from,
      end: dates.to,
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-4 rounded-3xl border border-border/60 bg-card/80 p-6 backdrop-blur md:grid-cols-4"
    >
      <div className="space-y-2">
        <Label htmlFor="city">Destination</Label>
        <Input id="city" name="city" value={city} onChange={(event) => setCity(event.target.value)} placeholder="e.g. Paris" />
      </div>
      <div className="space-y-2">
        <Label>Dates</Label>
  <DateRangePicker value={dates} onChange={setDates} className="w-full" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="guests">Guests</Label>
        <Input
          id="guests"
          name="guests"
          type="number"
          min={1}
          max={16}
          value={guests}
          onChange={(event) => setGuests(Number(event.target.value))}
        />
      </div>
      <div className="flex items-end">
        <Button type="submit" className="w-full gap-2">
          <Search className="h-4 w-4" />
          Search stays
        </Button>
      </div>
    </form>
  );
}
