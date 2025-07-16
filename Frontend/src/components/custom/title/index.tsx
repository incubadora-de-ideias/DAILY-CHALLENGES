import { cn } from "@/lib/utils";


export default function CustomTitle({
  children,
  useCircle = true,
  className,
  ...props
}: {
  children: React.ReactNode;
  useCircle?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      {...props} // Passa todas as outras props automaticamente
      className={cn(
        "text-2xl py-2 transition-all 2xl:text-4xl min-w-[190px] max-break:text-xl text-black max-break2:text-lg font-bold flex items-center gap-2 border-b mb-2",
        className
      )}
    >
      {useCircle && (
        <div className="size-2 2xl:size-4 bg-ipilOrange rounded-full aspect-square"></div>
      )}
      {children}
    </h1>
  );
}
