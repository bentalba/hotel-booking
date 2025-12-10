"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const calendarComponents = {
  IconLeft: () => <ChevronLeft className="h-4 w-4" />,
  IconRight: () => <ChevronRight className="h-4 w-4" />,
} as unknown as CalendarProps["components"];

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-3",
        caption: "flex justify-between items-center",
        caption_label: "text-base font-medium",
        nav: "flex items-center gap-2",
        button_previous: cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 rounded-full"),
        button_next: cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 rounded-full"),
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "w-9 font-medium text-xs text-muted-foreground",
        row: "mt-2 flex w-full",
        cell: "relative flex h-9 w-9 items-center justify-center text-sm",
        day: cn(
          "flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
          "aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-emerald-500 text-white",
        day_today: "bg-emerald-50 text-emerald-900",
        day_outside: "text-muted-foreground/50",
        day_disabled: "text-muted-foreground/50",
        day_range_middle: "bg-emerald-100 text-emerald-900",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={calendarComponents}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
