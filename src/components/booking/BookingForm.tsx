"use client";

import * as React from "react";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";

import { createBooking } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const initialState = {
  status: "idle" as "idle" | "pending" | "success" | "error",
  message: "",
};

interface BookingFormProps {
  roomId: string;
  nightlyRate: number;
  maxGuests: number;
  defaultRange?: DateRange;
}

export function BookingForm({ roomId, nightlyRate, maxGuests, defaultRange }: BookingFormProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    defaultRange ?? {
      from: new Date(),
      to: addDays(new Date(), 2),
    }
  );
  const [state, setState] = React.useState(initialState);
  const [optimisticState, setOptimistic] = React.useOptimistic(state, (_, next: typeof state) => next);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (state.status === "success") {
      toast({ title: "Reservation confirmed", description: state.message || "You can view it under My Bookings." });
    }
    if (state.status === "error") {
      toast({ title: "We couldn’t complete that booking", description: state.message || "Please pick new dates." });
    }
  }, [state]);

  const onSubmit = async (formData: FormData) => {
    if (!dateRange?.from || !dateRange?.to) {
      toast({ title: "Select travel dates first" });
      return;
    }

    setOptimistic({ status: "pending", message: "Locking in your stay..." });

    startTransition(async () => {
      const result = await createBooking(formData);
      setState(result);
      setOptimistic(result);
    });
  };

  const disableSubmit = isPending || !dateRange?.from || !dateRange?.to;

  return (
  <form action={onSubmit} className="space-y-4 rounded-3xl border border-border/70 bg-card/80 p-6 backdrop-blur">
      <input type="hidden" name="roomId" value={roomId} readOnly />
      <input type="hidden" name="startDate" value={dateRange?.from?.toISOString() ?? ""} readOnly />
      <input type="hidden" name="endDate" value={dateRange?.to?.toISOString() ?? ""} readOnly />
      <div className="space-y-2">
        <Label>Travel dates</Label>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="guests">Guests</Label>
        <Input id="guests" name="guests" type="number" min={1} max={maxGuests} defaultValue={Math.min(2, maxGuests)} />
      </div>

      <div>
        <Label htmlFor="notes">Notes (optional)</Label>
        <textarea
          id="notes"
          name="notes"
          className="mt-2 w-full rounded-2xl border border-input bg-transparent p-4 text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          rows={3}
          placeholder="Share arrival needs, concierge requests, etc."
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">${nightlyRate} / night · Max {maxGuests} guests</p>
        <Button type="submit" disabled={disableSubmit} className="w-full">
          {disableSubmit ? "Select valid dates" : optimisticState.status === "pending" ? "Booking..." : "Book instantly"}
        </Button>
        {optimisticState.message && <p className="text-xs text-muted-foreground">{optimisticState.message}</p>}
      </div>
    </form>
  );
}
