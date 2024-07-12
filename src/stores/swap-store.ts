// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";
import { MixswapToken, SwapItem } from "../../types";

export type SwapState = {
  coinList: SwapItem[];
  inputItem: SwapItem;
  outputItem: SwapItem;
};

export const coinList = [
  {
    anyswapId: "ee39184a-8177-4830-af84-2cf5dd8a2504",
    symbol: "SOL",
    name: "Solana",
    iconUrl:
      "https://mixin-images.zeromesh.net/eTzm8_cWke8NqJ3zbQcx7RkvbcTytD_NgBpdwIAgKJRpOoo0S0AQ3IQ-YeBJgUKmpsMPUHcZFzfuWowv3801cF5HXfya5MQ9fTA9HQ=s128",
    mixinChainId: "64692c23-8971-4cf4-84a7-4dd1271dd887",
    mixinChainIconUrl:
      "https://mixin-images.zeromesh.net/eTzm8_cWke8NqJ3zbQcx7RkvbcTytD_NgBpdwIAgKJRpOoo0S0AQ3IQ-YeBJgUKmpsMPUHcZFzfuWowv3801cF5HXfya5MQ9fTA9HQ=s128",
    mixinId: "64692c23-8971-4cf4-84a7-4dd1271dd887",
    solanaTokenAddress: "So11111111111111111111111111111111111111112",
    solanaTokenDecimals: "9",
  },
  {
    anyswapId: "eb18b598-a290-40a6-b4a5-8458f624d0c7",
    symbol: "USDT",
    name: "USDT",
    iconUrl:
      "https://mixin-images.zeromesh.net/ndNBEpObYs7450U08oAOMnSEPzN66SL8Mh-f2pPWBDeWaKbXTPUIdrZph7yj8Z93Rl8uZ16m7Qjz-E-9JFKSsJ-F=s128",
    mixinChainId: "64692c23-8971-4cf4-84a7-4dd1271dd887",
    mixinChainIconUrl:
      "https://mixin-images.zeromesh.net/eTzm8_cWke8NqJ3zbQcx7RkvbcTytD_NgBpdwIAgKJRpOoo0S0AQ3IQ-YeBJgUKmpsMPUHcZFzfuWowv3801cF5HXfya5MQ9fTA9HQ=s128",
    mixinId: "cb54aed4-1893-3977-b739-ec7b2e04f0c5",
    solanaTokenAddress: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    solanaTokenDecimals: "6",
  },
  {
    anyswapId: "7f905816-945d-49dd-9974-36a19fe5d8ee",
    symbol: "BTC",
    name: "Bitcoin",
    iconUrl:
      "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
    mixinChainId: "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
    mixinChainIconUrl:
      "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
    mixinId: "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
    solanaTokenAddress: "3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh",
    solanaTokenDecimals: "8",
  },
  {
    anyswapId: "829fb3f0-bc9f-4698-b060-a13212e53028",
    symbol: "ETH",
    name: "Ether",
    iconUrl:
      "https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128",
    mixinChainId: "43d61dcd-e413-450d-80b8-101d5e903357",
    mixinChainIconUrl:
      "https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128",
    mixinId: "43d61dcd-e413-450d-80b8-101d5e903357",
    solanaTokenAddress: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
    solanaTokenDecimals: "8",
  },
  {
    anyswapId: "28b15b45-59c7-4890-a192-4d4b3f236fa7",
    symbol: "USDC",
    name: "USD Coin",
    iconUrl:
      "https://mixin-images.zeromesh.net/w3Lb-pMrgcmmrzamf7FG_0c6Dkh3w_NRbysqzpuacwdVhMYSOtnX2zedWqiSG7JuZ3jd4xfhAJduQXY1rPidmywn=s128",
    mixinChainId: "64692c23-8971-4cf4-84a7-4dd1271dd887",
    mixinChainIconUrl:
      "https://mixin-images.zeromesh.net/eTzm8_cWke8NqJ3zbQcx7RkvbcTytD_NgBpdwIAgKJRpOoo0S0AQ3IQ-YeBJgUKmpsMPUHcZFzfuWowv3801cF5HXfya5MQ9fTA9HQ=s128",
    mixinId: "de6fa523-c596-398e-b12f-6d6980544b59",
    solanaTokenAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    solanaTokenDecimals: "6",
  },
];

export type SwapActions = {
  updateInputItem: (item: SwapItem) => void;
  updateOutputItem: (item: SwapItem) => void;
  updateCoinList: (coinList: SwapItem[]) => void;
};

export type SwapStore = SwapState & SwapActions;

export const initSwapStore = (): SwapState => {
  return {
    coinList: coinList,
    inputItem: coinList[0],
    outputItem: coinList[1],
  };
};

export const defaultInitState: SwapState = {
  coinList: coinList,
  inputItem: coinList[0],
  outputItem: coinList[1],
};

export const createSwapStore = (initState: SwapState = defaultInitState) => {
  return createStore<SwapStore>()((set) => ({
    ...initState,
    updateInputItem: (item: SwapItem) => set((state) => ({ inputItem: item })),
    updateOutputItem: (item: SwapItem) =>
      set((state) => ({ outputItem: item })),
    updateCoinList: (coinList: SwapItem[]) =>
      set((state) => ({
        coinList: coinList,
      })),
  }));
};
