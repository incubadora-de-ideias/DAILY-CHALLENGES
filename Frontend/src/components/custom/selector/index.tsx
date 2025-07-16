"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";

export type Item = {
  value: string;
  children: React.ReactNode;
};

export type CustomSelectorProps = {
  items?: Item[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  emptyOption?: { label: string };
  nullOption?: { label: string };
  allOption?: { label: string };
  align?: "start" | "end" | "center";
  unSelectedLabel?: string;
  disabled?: boolean;
  className?: string;
  skeletonClassName?: string;
  emptyLabel?: string;
  defaultValue?: string;
  required?: boolean;
};

export default function CustomSelector({
  items,
  value,
  onChange,
  label = "Opções",
  emptyOption,
  unSelectedLabel = "Seleccione",
  nullOption,
  allOption,
  align,
  className,
  skeletonClassName,
  emptyLabel,
  defaultValue,
  required,
  ...rest
}: CustomSelectorProps) {
  const extraOptions = useMemo(() => {
    const opts: Item[] = [];
    if (nullOption) opts.push({ value: "null", children: nullOption.label });
    if (allOption) opts.push({ value: "all", children: allOption.label });
    if (emptyOption) opts.push({ value: "empty", children: emptyOption.label });
    return opts;
  }, [nullOption, allOption, emptyOption]);

  const allValues = useMemo(
    () => [...extraOptions, ...(items || [])],
    [items, extraOptions]
  );

  const validValues = allValues.map((item) => item.value);
  const hasValidValue =
    value === undefined || (value && validValues.includes(value));

  // Corrige valor inválido automaticamente
  useEffect(() => {
    if (value !== undefined && !hasValidValue && items && items.length > 0) {
      const fallback = defaultValue || items[0]?.value;
      if (fallback && fallback !== value) {
        onChange(fallback);
      }
    }
  }, [hasValidValue, items, allValues, value, onChange, defaultValue]);

  if (!items) {
    return (
      <Skeleton
        className={cn(
          "w-full px-3 py-2 h-10 2xl:h-11 rounded-md",
          skeletonClassName
        )}
      />
    );
  }

  return (
    <Select
      onValueChange={(val) => {
        if (val !== value) onChange(val);
      }}
      value={hasValidValue ? value : undefined}
      defaultValue={
        value === undefined
          ? defaultValue ?? (emptyOption ? "empty" : undefined)
          : undefined
      }
      {...rest}
    >
      <SelectTrigger
        className={cn("text-sm min-w-[120px] 2xl:text-lg 2xl:h-11", className)}
        aria-required={required}
      >
        <SelectValue className="truncate" placeholder={unSelectedLabel} />
      </SelectTrigger>
      <SelectContent align={align}>
        <SelectGroup className="2xl:text-lg">
          <SelectLabel>
            {items.length !== 0
              ? label
              : emptyLabel ?? `Sem ${label.toLowerCase()} - adicione um(a)`}
          </SelectLabel>

          {extraOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.children}
            </SelectItem>
          ))}

          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.children}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
