import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import * as React from "react";

interface SearchInputProps extends InputProps {
  onTextChange?: (text: string) => void;
}

const SearchInput = React.forwardRef<
  HTMLInputElement,
  SearchInputProps & { containerClassName?: string }
>(({ onTextChange, containerClassName, className, onFocus, ...rest }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div
      className={cn(
        "flex items-center min-w-[130px] max-w-[250px] border pl-3 rounded-md bg-white drop-shadow-none",
        {
          "drop-shadow-sm ring-ipilOrange ring-2 ring-offset-1/2 ": isFocused,
        },
        containerClassName
      )}
    >
      <Search
        className={`text-gray-500 size-[20px] 2xl:size-[25px] ${
          isFocused ? "text-ipilOrange" : "text-gray-500"
        }`}
      />
      <Input
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={() => setIsFocused(false)}
        ref={ref}
        onChange={(e) => onTextChange?.(e.target.value)}
        className={cn(
          "min-w-min w-full h-[38px] 2xl:h-[42px] focus-visible:ring-0 focus-visible:ring-ipilOrange focus-visible:caret-ipilOrange text-black peer border-none text-base 2xl:text-xl",
          className
        )}
        placeholder="Pesquisar..."
        {...rest}
      />
    </div>
  );
});

export default SearchInput;
