import { createContext, useState } from "react";

interface SidebarContextType {
  openSidebar: boolean;
  setOpenSidebar: (value: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
