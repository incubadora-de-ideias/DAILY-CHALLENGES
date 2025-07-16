import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

export default function CustomNumberedTitle({
  children,
  useNumber = true,
  number,
  className,
  checked,
  ...props
}: {
  children: React.ReactNode;
  useNumber?: boolean;
  number?: number;
  checked?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={cn(
        "text-2xl py-2 transition-all 2xl:text-4xl max-break:text-lg text-black max-break2:text-base font-bold flex items-center gap-2 border-b mb-2",
        className
      )}
    >
      {checked ? (
        <CheckCircle className="text-ipilOrange" />
      ) : (
        useNumber && (
          <div className="border text-xl select-none py-2 transition-all 2xl:text-2xl rounded-full size-6 2xl:size-8 flex items-center justify-center border-ipilOrange">
            {number}
          </div>
        )
      )}
      {children}
    </h1>
  );
}
