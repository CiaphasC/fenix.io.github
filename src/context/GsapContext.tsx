import { createContext, useContext, type PropsWithChildren } from 'react';

const GsapReadyContext = createContext<boolean>(false);

interface GsapReadyProviderProps {
  ready: boolean;
}

export function GsapReadyProvider({
  ready,
  children,
}: PropsWithChildren<GsapReadyProviderProps>) {
  return <GsapReadyContext.Provider value={ready}>{children}</GsapReadyContext.Provider>;
}

export function useGsapReady(): boolean {
  return useContext(GsapReadyContext);
}
