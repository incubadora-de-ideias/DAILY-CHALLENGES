import * as React from "react";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Button } from "./button";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & { useArrow?: boolean }
>(({ className, useArrow = true, ...props }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = React.useState(false);
  const [isAtEnd, setIsAtEnd] = React.useState(false);

  React.useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = containerRef.current;
        setShowScrollButton(scrollWidth > clientWidth);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = containerRef.current;
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  const handleScrollToggle = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: isAtEnd
          ? -containerRef.current.clientWidth
          : containerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full flex flex-col">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full overflow-x-auto shadow-inner pb-2 p-1 rounded-md text-nowrap custom_scroll"
      >
        <table
          ref={ref}
          className={cn("w-full caption-bottom text-sm", className)}
          {...props}
        />
      </div>

      {showScrollButton && useArrow && (
        <Button
          onClick={handleScrollToggle}
          className={cn(
            "absolute z-20 size-8 p-2 2xl:p-3 2xl:size-10 top-1/2 bg-ipilGray/80 text-white rounded-full transition-all hover:bg-ipilGray",
            {
              "rotate-180 left-2": isAtEnd,
            },
            {
              "left-[91%]": !isAtEnd,
            }
          )}
        >
          <ArrowRight />
        </Button>
      )}
    </div>
  );
});
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-gray-100/50 font-medium [&>tr]:last:border-b-0 dark:bg-gray-800/50",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors rounde hover:bg-gray-100/50 data-[state=selected]:bg-gray-100 dark:hover:bg-gray-800/50 dark:data-[state=selected]:bg-gray-800 ",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-mediu [&:has([role=checkbox])]:pr-0 dark:text-gray-400",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 px-4 align-middle [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-gray-500 dark:text-gray-400", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
