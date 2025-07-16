import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

type Item = {
  label: string;
  value: string;
};
export type CustomComboBoxProps = {
  items?: Item[];
  value?: string;
  onChange: (value: string) => void;
  unSelectedLabel?: string;
  useEmptyOption?: boolean;
  emptyLabel?: string;
  disabled?: boolean;
};
export default function CustomComboBox({
  items,
  onChange,
  value = "empty",
  unSelectedLabel = "Selecione...",
  useEmptyOption = false,
  emptyLabel,
  disabled = false,
}: CustomComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const newItems: Item[] = useEmptyOption
    ? [{ label: emptyLabel ?? "Nenhum(a)", value: "empty" }, ...(items || [])]
    : items || [];

  return items ? (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="2xl:text-xl" disabled={disabled} asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground"
          )}
        >
          <span className="truncate">
            {newItems.find((item) => item.value === value)?.label ||
              unSelectedLabel}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full shrink-0 p-0">
        <Command >
          <CommandInput placeholder="Procurar..." />
          <CommandList
            tabIndex={0}
            className="max-h-60 z-[1] overflow-auto custom_scroll"
          >
            <CommandEmpty>Sem resultados</CommandEmpty>
            <CommandGroup>
              {newItems.map((item) => (
                <CommandItem
                  className="2xl:text-xl"
                  value={item.label}
                  key={item.value}
                  onSelect={() => {
                    onChange(item.value);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                  {value == item.value && <Check className="ml-auto" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  ) : (
    <Skeleton className="w-full px-3 py-2 h-10" />
  );
}
