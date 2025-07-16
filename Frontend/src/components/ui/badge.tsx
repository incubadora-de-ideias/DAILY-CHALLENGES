import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

const badgeVariants = cva(
  "inline-flex items-center rounded-md border border-zinc-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-zinc-800 dark:focus:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-ipilGray/80 text-zinc-50 hover:bg-ipilGray/80 dark:bg-zinc-50 dark:text-ipilGray dark:hover:bg-zinc-50/80",
        active:
          "border-transparent bg-ipilOrange text-zinc-50 hover:bg-ipilOrange/80 dark:bg-ipilOrange dark:text-zinc-50 dark:hover:bg-ipilOrange/80",
        secondary:
          "border-transparent bg-zinc-100 text-ipilGray hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        destructive:
          "border-transparent bg-red-500 text-zinc-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/80",
        outline: "text-zinc-950 dark:text-zinc-50",
        success:
          "border-transparent bg-green-500 text-zinc-50 hover:bg-green-500/80 dark:bg-green-900 dark:text-zinc-50 dark:hover:bg-green-900/80",
        pending:
          "border-transparent bg-yellow-500 text-zinc-50 hover:bg-yellow-500/80 dark:bg-yellow-900 dark:text-zinc-50 dark:hover:bg-yellow-900/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants, type BadgeVariant };
