// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";
import { MixswapToken, Name, Source, Symbol } from "../../types";

export type MixswapState = {
  tokenList: MixswapToken[];
  inputToken: MixswapToken;
  outputToken: MixswapToken;
};

export type MixswapActions = {
  updateMixswapTokenList: (tokenList: MixswapToken[]) => void;
  updateMixswapInputToken: (token: MixswapToken) => void;
  updateMixswapOutputToken: (token: MixswapToken) => void;
};

export const initMixswapStore = (): MixswapState => {
  return {
    tokenList: [],
    inputToken: {
      address: "So11111111111111111111111111111111111111112",
      decimals: 9,
      name: "Wrapped SOL",
      symbol: "SOL",
      icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
      source: Source.Jupiter,
      chain: {
        name: Name.Solana,
        decimals: 9,
        symbol: Symbol.Sol,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        logoURI:
          "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
      },
    },
    outputToken: {
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      decimals: 6,
      name: "USD Coin",
      symbol: "USDC",
      icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
      source: Source.Jupiter,
      chain: {
        name: Name.Solana,
        decimals: 9,
        symbol: Symbol.Sol,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        logoURI:
          "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
      },
    },
  };
};

export const defaultInitState: MixswapState = {
  tokenList: [],
  inputToken: {
    address: "So11111111111111111111111111111111111111112",
    decimals: 9,
    name: "Wrapped SOL",
    symbol: "SOL",
    icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    source: Source.Jupiter,
    chain: {
      name: Name.Solana,
      decimals: 9,
      symbol: Symbol.Sol,
      icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
      logoURI:
        "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    },
  },
  outputToken: {
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    decimals: 6,
    name: "USD Coin",
    symbol: "USDC",
    icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    source: Source.Jupiter,
    chain: {
      name: Name.Solana,
      decimals: 9,
      symbol: Symbol.Sol,
      icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
      logoURI:
        "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    },
  },
};

export type MixswapStore = MixswapState & MixswapActions;

export const createSwapStore = (initState: MixswapState = defaultInitState) => {
  return createStore<MixswapStore>()((set) => ({
    ...initState,
    // updateMixswapTokenList: (tokenList: MixswapToken[]) =>
    //   set((state) => ({
    //     tokenList: tokenList,
    //   })),
    updateMixswapInputToken: (token: MixswapToken) =>
      set((state) => ({
        inputToken: token,
      })),
    updateMixswapOutputToken: (token: MixswapToken) =>
      set((state) => ({
        outputToken: token,
      })),
    updateMixswapTokenList: (tokenList: MixswapToken[]) =>
      set((state) => ({
        tokenList: tokenList,
      })),
  }));
};
