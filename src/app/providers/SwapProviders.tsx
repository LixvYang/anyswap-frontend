"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type SwapStore,
  createSwapStore,
  initSwapStore,
} from "../../stores/swap-store";

export type SwapStoreApi = ReturnType<typeof createSwapStore>;

export const SwapStoreContext = createContext<SwapStoreApi | undefined>(
  undefined
);

export interface SwapStoreProviderProps {
  children: ReactNode;
}

export const SwapStoreProvider = ({ children }: SwapStoreProviderProps) => {
  const storeRef = useRef<SwapStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSwapStore(initSwapStore());
  }

  return (
    <SwapStoreContext.Provider value={storeRef.current}>
      {children}
    </SwapStoreContext.Provider>
  );
};

export const useSwapStore = <T,>(selector: (store: SwapStore) => T): T => {
  const swapStoreContext = useContext(SwapStoreContext);

  if (!swapStoreContext) {
    throw new Error(`useSwapStore must be used within SwapStoreProvider`);
  }

  return useStore(swapStoreContext, selector);
};
