import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden animate-pulse rounded bg-[#d96f32b4] dark:bg-gray-800",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 w-full to-transparent animate-shimmer"></div>
    </div>
  );
}

export { Skeleton };
