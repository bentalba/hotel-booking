/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                         🎨 COMPOSANTS UI                                   ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Ce fichier contient tous les composants d'interface :                    ║
 * ║  • Button, Input, Label, Card, Badge, Skeleton                            ║
 * ║  • Select, Popover                                                        ║
 * ║  • Calendar, DateRangePicker                                              ║
 * ║  • Toast (notifications)                                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva } from "class-variance-authority";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/donnees.js";

// ─────────────────────────────────────────────────────────────────────────────
// 🔘 BOUTON
// ─────────────────────────────────────────────────────────────────────────────

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md hover:shadow-lg",
        outline: "border border-gray-200 bg-white hover:bg-gray-50",
        ghost: "hover:bg-gray-100",
        secondary: "bg-slate-900 text-white hover:bg-slate-800",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export const Button = React.forwardRef(({ className, variant, size, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

// ─────────────────────────────────────────────────────────────────────────────
// 📝 INPUT & LABEL
// ─────────────────────────────────────────────────────────────────────────────

export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    className={cn(
      "flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

export const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-sm font-medium block mb-1.5", className)} {...props} />
));
Label.displayName = "Label";

// ─────────────────────────────────────────────────────────────────────────────
// 📦 CARD
// ─────────────────────────────────────────────────────────────────────────────

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-2xl border border-gray-100 bg-white p-6 shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

export const CardHeader = ({ className, ...props }) => <div className={cn("mb-4", className)} {...props} />;
export const CardTitle = ({ className, ...props }) => <h3 className={cn("text-lg font-semibold", className)} {...props} />;
export const CardContent = ({ className, ...props }) => <div className={cn("", className)} {...props} />;

// ─────────────────────────────────────────────────────────────────────────────
// 🏷️ BADGE
// ─────────────────────────────────────────────────────────────────────────────

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", {
  variants: {
    variant: {
      default: "bg-emerald-100 text-emerald-800",
      secondary: "bg-gray-100 text-gray-700",
    },
  },
  defaultVariants: { variant: "default" },
});

export const Badge = ({ className, variant, ...props }) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
);

// ─────────────────────────────────────────────────────────────────────────────
// 💀 SKELETON (chargement)
// ─────────────────────────────────────────────────────────────────────────────

export const Skeleton = ({ className, ...props }) => (
  <div className={cn("animate-pulse rounded-md bg-gray-200", className)} {...props} />
);

// ─────────────────────────────────────────────────────────────────────────────
// 📋 SELECT (dropdown simple)
// ─────────────────────────────────────────────────────────────────────────────

export const Select = React.forwardRef(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500",
      className
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

// ─────────────────────────────────────────────────────────────────────────────
// 💬 POPOVER
// ─────────────────────────────────────────────────────────────────────────────

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn("z-50 rounded-xl border bg-white p-4 shadow-lg animate-in fade-in-0 zoom-in-95", className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = "PopoverContent";

// ─────────────────────────────────────────────────────────────────────────────
// 📅 CALENDRIER
// ─────────────────────────────────────────────────────────────────────────────

export function Calendar({ className, classNames, ...props }) {
  return (
    <DayPicker
      showOutsideDays
      className={cn("p-4", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-6",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center mb-4",
        caption_label: "text-sm font-semibold",
        nav: "flex items-center justify-between absolute inset-x-0",
        button_previous: "h-8 w-8 bg-white border rounded-lg flex items-center justify-center hover:bg-gray-50 absolute left-1",
        button_next: "h-8 w-8 bg-white border rounded-lg flex items-center justify-center hover:bg-gray-50 absolute right-1",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-gray-500 w-10 font-medium text-xs",
        week: "flex w-full mt-1",
        day: "h-10 w-10 text-center text-sm p-0",
        day_button: "h-10 w-10 rounded-lg hover:bg-emerald-50 hover:text-emerald-700",
        selected: "bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg",
        today: "bg-emerald-50 text-emerald-700 font-semibold rounded-lg",
        outside: "text-gray-300",
        disabled: "text-gray-300 cursor-not-allowed",
        range_middle: "bg-emerald-100 text-emerald-800 rounded-none",
        range_start: "rounded-l-lg",
        range_end: "rounded-r-lg",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 📆 SÉLECTEUR DE DATES
// ─────────────────────────────────────────────────────────────────────────────

export function DateRangePicker({ value, onChange, disabled, className }) {
  const displayValue = value?.from && value?.to
    ? `${format(value.from, "d MMM", { locale: fr })} - ${format(value.to, "d MMM", { locale: fr })}`
    : "Sélectionner dates";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-11 w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 text-left shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500",
            !value && "text-gray-400",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="h-4 w-4 text-gray-400" />
          <span className="flex-1">{displayValue}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          locale={fr}
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          disabled={{ before: new Date() }}
        />
      </PopoverContent>
    </Popover>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 🔔 TOAST (Notifications)
// ─────────────────────────────────────────────────────────────────────────────

const ToastContext = React.createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "animate-in slide-in-from-right rounded-xl border px-4 py-3 shadow-lg",
              t.type === "success" && "border-green-200 bg-green-50 text-green-800",
              t.type === "error" && "border-red-200 bg-red-50 text-red-800",
              t.type === "info" && "border-gray-200 bg-white text-gray-800"
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  return context || { addToast: (msg) => console.log(msg) };
}
