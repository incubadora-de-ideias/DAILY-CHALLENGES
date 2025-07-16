import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex transition-all 2xl:h-11 h-10 min-w-[150px] 2xl:text-xl rounded-md border border-gray-200 bg-white px-3 ring-offset-white file:border-0 file:transition-all w-full text-sm  file:h-full file:cursor-pointer file:px-4 file:rounded-md file:bg-blue-50 file:text-ipilOrange hover:file:bg-ipilOrange hover:file:text-white file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-0 focus-visible:ring-ipilOrange focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:file:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300",
          { "pl-0": type == "file" },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
