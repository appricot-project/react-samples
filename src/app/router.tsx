import { createBrowserRouter } from "react-router";
import { GeneratePage } from "@/domains/generate/pages/GeneratePage/GeneratePage";
import { PROTECTED_PATHS } from "@/app/routes/paths";

export const router = createBrowserRouter([
  {
    path: PROTECTED_PATHS.HOME,
    element: <GeneratePage />,
  },
  {
    path: PROTECTED_PATHS.GENERATE,
    element: <GeneratePage />,
  },
]);
