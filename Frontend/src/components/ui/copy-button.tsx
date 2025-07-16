import { Check, Copy } from "lucide-react";
import { Button, ButtonProps } from "./button";
import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { toastSuccessConfig } from "../config/toast";
import { capitalazeName } from "@/modules/helpers/names";

type CopyButtonProps = ButtonProps & {
  value: string;
  subject?: string;
};

const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ value, variant = "outline", subject, className, ...props }, ref) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
      navigator.clipboard.writeText(value);

      setCopied(true);
      toastSuccessConfig(
        `${capitalazeName(subject) || "Texto"} copiado com sucesso!`,
        { duration: 2000 }
      );
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <Button
        ref={ref}
        onClick={copyToClipboard}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        variant={variant}
        className={cn("relative ml-2 size-8 p-1 2xl:size-8 rounded-md", {
          className,
        })}
        {...props}
      >
        <span className="sr-only">{copied ? "Copiado" : "Copiar"}</span>
        <Copy
          className={`h-4 w-4 transition-all duration-300 ${
            copied ? "scale-0" : "scale-100"
          }`}
        />
        <Check
          className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${
            copied ? "scale-100" : "scale-0"
          }`}
        />
      </Button>
    );
  }
);

CopyButton.displayName = "CopyButton";

export default CopyButton;
