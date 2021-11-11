import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { testImageSupport } from "utils/image";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [imageSupport, setImageSupport] = useState(null);

  useEffect(() => {
    async function asyncTestImageSupport() {
      const res = await testImageSupport();
      setImageSupport(res);
    }

    asyncTestImageSupport();
  }, []);

  const value = useMemo(
    () => ({
      imageSupport,
    }),
    [imageSupport]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
