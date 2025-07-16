import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import React, { ReactNode } from "react";
import CustomTooltip from "../tooltip";

const AddButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { tooltip?: ReactNode }
>(({ className, type = "button", tooltip, children, ...props }, ref) => {
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   if (type === "button") {
  //     event.preventDefault();
  //   }
  //   if (onClick) {
  //     onClick(event);
  //   }
  // };

  const cild = (
    <Button
      ref={ref}
      type={type}
      {...props}
      // onClick={handleClick}
      className={cn("flex gap-1 items-center", className)}
    >
      {children}
      <PlusCircle />
    </Button>
  );

  return tooltip ? (
    <CustomTooltip content={tooltip}>{cild}</CustomTooltip>
  ) : (
    cild
  );
});

AddButton.displayName = "AddButton";

export default AddButton;
