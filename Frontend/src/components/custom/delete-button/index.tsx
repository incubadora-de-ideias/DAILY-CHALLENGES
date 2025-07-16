import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import React from "react";

const DeleteButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", onClick, children, ...props }, ref) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (type === "button") {
        event.preventDefault();
      }
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <Button
        ref={ref}
        type={type}
        {...props}
        onClick={handleClick}
        color="danger"
        className={cn("flex gap-2 items-center", className)}
      >
        {children}
        <CircleX />
      </Button>
    );
  }
);

DeleteButton.displayName = "DeleteButton";

export default DeleteButton;
