import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center 2xl:text-xl 2xl:h-11 select-none justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-all focus-visible:outline-ipilGray focus-visible:ring-offset-ipilOrange focus-visible:border-ipilOrange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-ipilOrange dark:focus-visible:ring-gray-300 ",
  {
    variants: {
      variant: {
        default:
          "bg-ipilOrange text-gray-50 hover:bg-ipilOrangeLight dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90",
        destructive:
          "bg-red-500 text-gray-50 hover:bg-red-600 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/90",
        outline:
          "border text-black border-gray-200 bg-white hover:bg-gray-200 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50",
        outlineDestructive:
          "border text-black border-red-200 bg-white hover:bg-red-200 hover:text-red-900 dark:border-red-800 dark:bg-red-950 dark:hover:bg-red-800 dark:hover:text-red-50",
          outlineWarning:
          "border text-black border-orange-200 bg-white hover:bg-orange-200 hover:text-orange-900 dark:border-orange-800 dark:bg-orange-950 dark:hover:bg-orange-800 dark:hover:text-orange-50",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
        active: "bg-ipilOrange text-white",
        success:
          "bg-green-500 text-gray-50 hover:bg-green-600 dark:bg-green-900 dark:text-gray-50 dark:hover:bg-green-900/90",
        ghost:
          "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
        link: "text-gray-900 underline-offset-4 hover:underline dark:text-gray-50",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 2xl:h-10 2xl:w-10 ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, type = "button", asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
