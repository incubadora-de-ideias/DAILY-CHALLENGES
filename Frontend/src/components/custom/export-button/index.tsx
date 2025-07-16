import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import React from "react";

const ExportButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        className={cn("flex gap-2 items-center", className)}
      >
        {children}
        <Upload />
      </Button>
    );
  }
);

export default ExportButton;
