import { RouterProvider } from "react-router";
import { router } from "@/app/router";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { AnimatedBackground } from "@/shared/ui/animated-background";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AnimatedBackground />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
