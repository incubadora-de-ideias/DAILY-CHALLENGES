import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("flex justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationButtonProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<typeof Button>;

const PaginationButton = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationButtonProps) => (
  <Button
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "active" : "outline",
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationButton.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton & { disabled: boolean }>) => (
  <PaginationButton
    aria-label="Go to previous page"
    size="default"
    className={cn(
      "gap-1 px-2 hover:bg-ipilOrangeLight hover:text-white",
      className
    )}
    {...props}
  >
    <ChevronLeftIcon className="h-4 w-4" />
    <span className="sr-only">Back Page</span>
  </PaginationButton>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton & { disabled: boolean }>) => (
  <PaginationButton
    aria-label="Go to next page"
    size="default"
    className={cn(
      "gap-1 px-2 hover:bg-ipilOrangeLight hover:text-white ",
      className
    )}
    {...props}
  >
    <span className="sr-only">Next Page</span>
    <ChevronRightIcon className="h-4 w-4" />
  </PaginationButton>
);
PaginationNext.displayName = "PaginationNext";

// const PaginationEllipsis = ({
//   className,
//   ...props
// }: React.ComponentProps<"span">) => (
//   <span
//     aria-hidden
//     className={cn("flex h-9 w-9 items-center justify-center", className)}
//     {...props}
//   >
//     <DotsHorizontalIcon className="h-4 w-4" />
//     <span className="sr-only">More pages</span>
//   </span>
// );
// PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationButton as PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  // PaginationEllipsis,
};
