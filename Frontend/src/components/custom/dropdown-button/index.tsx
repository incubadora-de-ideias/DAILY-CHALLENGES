import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ExternalLink } from "lucide-react";
import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import CustomTooltip from "../tooltip";

type DropdownButtonOption = {
  label: string;
  onClick: () => void;
  icon?: { content: ReactNode; side?: "left" | "right" };
  disabled?: boolean;
  group?: string;
};

type DropdownButtonProps = {
  options: DropdownButtonOption[];
  mainContent?: React.ReactNode;
  tooltip?: ReactNode;
  icon?: ReactNode;
} & ButtonProps;

// 🔄 Função para agrupar opções usando Map
const groupOptions = (options: DropdownButtonOption[]) => {
  const groups = new Map<string, DropdownButtonOption[]>();

  options.forEach((option) => {
    const groupName = option.group || "__ungrouped"; // Nome para opções sem grupo
    if (!groups.has(groupName)) {
      groups.set(groupName, []);
    }
    groups.get(groupName)!.push(option);
  });

  return groups;
};

const DropdownButton = React.forwardRef<HTMLButtonElement, DropdownButtonProps>(
  (
    { className, type = "button", options, tooltip, mainContent, icon, ...props },
    ref
  ) => {
    const groupedOptions = groupOptions(options);

    const buttonContent = (
      <Button
        type={type}
        ref={ref}
        {...props}
        className={cn("flex gap-2 items-center", className)}
      >
        {mainContent && (
          <>
            {icon ? (
              <span className="flex items-center justify-center">
                {icon}
              </span>
            ) : (
              <ExternalLink className="size-5" />
            )}
            {mainContent}
            <ChevronDown className="size-5" />
          </>
        )}
      </Button>
    );

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {tooltip ? (
            <CustomTooltip content={tooltip}>{buttonContent}</CustomTooltip>
          ) : (
            buttonContent
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Array.from(groupedOptions.entries()).map(
            ([group, items], idx, arr) => (
              <React.Fragment key={group}>
                {group !== "__ungrouped" && (
                  <>
                    <DropdownMenuLabel>{group}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                  </>
                )}
                {items.map((option, itemIdx) => (
                  <DropdownMenuItem
                    key={`${group}-${itemIdx}`}
                    onClick={option.onClick}
                    className="flex items-center gap-2 p-2"
                    disabled={option.disabled}
                  >
                    {option.icon && (
                      <DropdownMenuShortcut className="ml-0">
                        {option.icon.content}
                      </DropdownMenuShortcut>
                    )}
                    {option.label}
                  </DropdownMenuItem>
                ))}
                {idx < arr.length - 1 && <DropdownMenuSeparator />}{" "}
                {/* Evita separador no final */}
              </React.Fragment>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

DropdownButton.displayName = "ComboButton";

export default DropdownButton;
