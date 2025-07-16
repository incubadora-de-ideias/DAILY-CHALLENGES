import { panelPaths } from "@/lib/definitions/paths";
import { useAppStore } from "@/modules/services/stores/app";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const exceptionPaths = ["/login", ...Object.values(panelPaths)];

const PathSaver = () => {
  const setPreviusLocation = useAppStore((state) => state.setPreviusLocation);
  const { pathname } = useLocation();

  useEffect(() => {
    const saveScrollPosition = () => {
      const scrollPosition = window.scrollY;
      const currentPath = pathname;
      if (!exceptionPaths.includes(currentPath)) {
        setPreviusLocation({ position: scrollPosition, path: currentPath });
      }
    };

    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, [pathname]);

  return null;
};

export default PathSaver;
