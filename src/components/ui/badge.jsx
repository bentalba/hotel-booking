import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  base: "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  variants: {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    outline: "text-foreground border border-input",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  },
};

function Badge({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(badgeVariants.base, badgeVariants.variants[variant], className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
