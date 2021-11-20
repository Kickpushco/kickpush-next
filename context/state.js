import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { testImageSupport } from "utils/image";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [imageSupport, setImageSupport] = useState(null);
  const [projectTransitioning, setProjectTransitioning] = useState(false);

  useEffect(() => {
    async function asyncTestImageSupport() {
      const res = await testImageSupport();
      setImageSupport(res);
    }

    asyncTestImageSupport();
  }, []);

  const value = useMemo(() => {
    return {
      mobileOpen,
      setMobileOpen,
      imageSupport,
      projectTransitioning,
      setProjectTransitioning,
    };
  }, [mobileOpen, imageSupport, projectTransitioning]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
