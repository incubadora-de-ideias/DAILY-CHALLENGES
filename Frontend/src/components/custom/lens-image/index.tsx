import { Lens } from "@/components/ui/lens";
import React, { useState } from "react";

const LensImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>((props, ref) => {
  const [hovering, setHovering] = useState(false);

  return (
    <Lens zoomFactor={2} hovering={hovering} setHovering={setHovering}>
      <img {...props} ref={ref} />
    </Lens>
  );
});

export default LensImage;
