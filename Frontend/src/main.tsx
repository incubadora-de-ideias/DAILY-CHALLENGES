import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./app/routes/index.tsx";
import dayjs from "dayjs";
import "dayjs/locale/pt";
import { Toaster } from "sonner";
import { Font } from "@react-pdf/renderer";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import QueryProvider from "./app/providers/query.tsx";
dayjs.locale("pt"); 
Font.register({
  family: "Segoe UI",
  fonts: [
    {
      src: "/fonts/Segoe-UI/Segoe UI.ttf",
    },
    {
      src: "/fonts/Segoe-UI/Segoe UI Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/fonts/Segoe-UI/Segoe UI Italic.ttf",
      fontStyle: "italic",
    },
    {
      src: "/fonts/Segoe-UI/Segoe UI Bold Italic.ttf",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});
Font.registerHyphenationCallback((word: string) => {
  return [word];
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <TooltipProvider>
        <Toaster closeButton richColors position="top-left" />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryProvider>
  </StrictMode>
);
