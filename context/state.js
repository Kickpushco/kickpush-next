import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { testImageSupport } from "utils/image";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [noMotion, setNoMotion] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [imageSupport, setImageSupport] = useState(null);
  const [projectTransitioning, setProjectTransitioning] = useState(false);

  useEffect(() => {
    const mediaQueryList = matchMedia(`(prefers-reduced-motion: reduce)`);

    function handleMQLChange(e) {
      setNoMotion(e.matches);
    }

    handleMQLChange(mediaQueryList);

    mediaQueryList.addListener(handleMQLChange);
    return () => {
      mediaQueryList.removeListener(handleMQLChange);
    };
  }, [setMobileOpen]);

  useEffect(() => {
    async function asyncTestImageSupport() {
      const res = await testImageSupport();
      setImageSupport(res);
    }

    asyncTestImageSupport();
  }, []);

  const value = useMemo(() => {
    return {
      noMotion,
      mobileOpen,
      setMobileOpen,
      imageSupport,
      projectTransitioning,
      setProjectTransitioning,
    };
  }, [noMotion, mobileOpen, imageSupport, projectTransitioning]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
