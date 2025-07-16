import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ColorPicker from "react-pick-color";
import { useState } from "react";

interface CustomColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  label?: string;
  className?: string;
}

export default function CustomColorPicker({
  value,
  onChange,
  label = "Escolha uma cor",
  className,
}: CustomColorPickerProps) {
  const [open, setOpen] = useState(false);

  const handleColorChange = (color: { hex: string }) => {
    onChange?.(color.hex);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className={`w-full border p-2 flex items-center justify-center ${className}`}
          style={{ backgroundColor: value || "#ccc", color: "#fff" }}
          aria-label={label}
        >
          {value || label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max p-0 border-none shadow-lg">
        <ColorPicker color={value} onChange={handleColorChange} />
      </PopoverContent>
    </Popover>
  );
}
