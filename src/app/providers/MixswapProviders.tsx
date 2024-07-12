"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type MixswapStore,
  createSwapStore,
  initMixswapStore,
} from "../../stores/mixswap-store";

export type MixswapStoreApi = ReturnType<typeof createSwapStore>;

export const MixswapStoreContext = createContext<MixswapStoreApi | undefined>(
  undefined
);

export interface MixswapStoreProviderProps {
  children: ReactNode;
}

export const MixswapStoreProvider = ({
  children,
}: MixswapStoreProviderProps) => {
  const storeRef = useRef<MixswapStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSwapStore(initMixswapStore());
  }

  return (
    <MixswapStoreContext.Provider value={storeRef.current}>
      {children}
    </MixswapStoreContext.Provider>
  );
};

export const useMixswapStore = <T,>(
  selector: (store: MixswapStore) => T
): T => {
  const mixswapStoreContext = useContext(MixswapStoreContext);

  if (!mixswapStoreContext) {
    throw new Error(`useSwapStore must be used within SwapStoreProvider`);
  }

  return useStore(mixswapStoreContext, selector);
};
