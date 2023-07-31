/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.client
 */

import { CacheProvider, ThemeProvider } from "@emotion/react";
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useCallback, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import ClientStyleContext from "styles/ClientStyleContext";
import createEmotionCache from "styles/createEmotionCache";
import theme from "themes";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}
const ClientCacheProvider = ({ children }: ClientCacheProviderProps) => {
  const [cache, setCache] = useState(createEmotionCache());

  const reset = useCallback(() => {
    setCache(createEmotionCache());
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
};

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ClientCacheProvider>
        <ThemeProvider theme={theme()}>
          <RemixBrowser />
        </ThemeProvider>
      </ClientCacheProvider>
    </StrictMode>
  );
});
