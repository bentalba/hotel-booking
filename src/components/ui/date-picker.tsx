"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DateRangePickerProps {
  value?: DateRange | undefined;
  onChange?: (value: DateRange | undefined) => void;
  disabled?: boolean;
  className?: string;
}

export function DateRangePicker({ value, onChange, disabled, className }: DateRangePickerProps) {
  const displayValue = value?.from && value?.to ? `${format(value.from, "LLL dd")} - ${format(value.to, "LLL dd")}` : "Select dates";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("h-11 w-full justify-start gap-3 text-left font-normal", !value && "text-muted-foreground", className)} disabled={disabled}>
          <CalendarIcon className="h-4 w-4" />
          {displayValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
