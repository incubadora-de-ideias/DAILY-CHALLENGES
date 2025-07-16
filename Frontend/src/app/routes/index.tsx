import { createBrowserRouter } from "react-router";
import AppLayout from "../layout";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
    },
  ],
  { basename: "/" }
);

export default router;
