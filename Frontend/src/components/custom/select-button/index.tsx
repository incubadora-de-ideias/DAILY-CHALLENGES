import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "active"
  | "success"
  | "ghost"
  | "link"
  | null
  | undefined;

type SelectButtonOption = {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: ButtonVariant;
};

type SelectButtonProps = {
  options: SelectButtonOption[];
} & ButtonProps;

const SelectButton = React.forwardRef<HTMLDivElement, SelectButtonProps>(
  ({ className, type = "button", options, ...props }, ref) => {
    const [activeOption, setActiveOption] = React.useState<SelectButtonOption>(
      options[0]
    );

    return (
      <div ref={ref} className={cn("flex items-center", className)}>
        {/* Botão principal */}
        <Button
          variant={activeOption.variant}
          type={type}
          {...props}
          onClick={activeOption.onClick}
          disabled={activeOption.disabled}
          className="flex gap-2 items-center rounded-r-none"        >
          {activeOption.label}
          {activeOption.icon && activeOption.icon}
        </Button>

        {/* Dropdown separado */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-l-none p-2 border-l">
              <ChevronDown className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {options.map((option, index) => (
              <DropdownMenuItem
              disabled={option.disabled}
                key={index}
                onClick={() => {
                  setActiveOption(option);
                  option.onClick();
                }}
                className={cn("flex items-center gap-2 p-2", option.className)}
              >
                {option.icon && (
                  <DropdownMenuShortcut className="ml-0">
                    {option.icon}
                  </DropdownMenuShortcut>
                )}
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);

SelectButton.displayName = "ComboButton";

export default SelectButton;
