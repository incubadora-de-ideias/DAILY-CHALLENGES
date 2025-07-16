import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const ChangeVisibilityInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className,...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="relative flex items-center w-full h-max">
        <Input
          ref={ref}
          className={cn("pr-[52px]", className)}
          placeholder="*****"
          {...props}
          type={showPassword ? "text" : "password"}
        />
        <button
          type="button"
          name="toogle-password-visibility"
          title={
            showPassword ? "Ocultar palavra-passe" : "Mostrar palavra-passe"
          }
          onClick={() => setShowPassword(!showPassword)}
          className="absolute hover:bg-gray-300 rounded-md transition-all text-zinc-500 hover:text-black top-1/2 p-2 -translate-y-1/2 h-max inset-y-0 right-0 flex items-center"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>
    );
  }
);

ChangeVisibilityInput.displayName = "ChangeVisibilityInput";

export default ChangeVisibilityInput;
