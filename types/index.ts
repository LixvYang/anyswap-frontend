import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface SwapItem {
  anyswapId?: string;
  symbol: string;
  name?: string;
  iconUrl: string;
  mixinChainId?: string;
  mixinChainIconUrl: string;
  mixinId?: string;
  solanaTokenAddress?: string;
  solanaTokenDecimals?: string;
}

export interface QuoteResponse {
  inCoin: Coin;
  outCoin: Coin;
  inAmount: string;
  maxOutAmount: string;
  providers: Provider[];
}

export interface Coin {
  anyswapId: string;
  symbol: string;
  iconUrl: string;
  mixinId: string;
  mixinChainId: string;
  mixinChainIconUrl: string;
}

export interface Provider {
  name: string;
  iconUrl: string;
  resultAmount: string;
}

export interface MixswapTokenList {
  data: MixswapToken[];
}

export interface MixswapToken {
  address: string;
  decimals: number;
  name: string;
  symbol: string;
  icon: string;
  source: Source;
  chain: Chain;
}

export interface Chain {
  name: Name;
  decimals: number;
  symbol: Symbol;
  icon: string;
  logoURI: string;
}

export enum Name {
  Solana = "Solana",
}

export enum Symbol {
  Sol = "SOL",
}

export enum Source {
  Jupiter = "jupiter",
}

export interface MixswapQuoteResponse {
  data: Data;
}

export interface Data {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  slippage: number;
  source: string;
  jupiterQuoteResponse: JupiterQuoteResponse;
}

export interface JupiterQuoteResponse {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode: string;
  slippageBps: number;
  priceImpactPct: string;
  routePlan: RoutePlan[];
  platformFee: null;
  contextSlot: number;
  timeTaken: number;
}

export interface RoutePlan {
  swapInfo: SwapInfo;
  percent: number;
}

export interface SwapInfo {
  ammKey: string;
  label: string;
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  feeAmount: string;
  feeMint: string;
}

export interface MixswapSwapResponse {
  data: MixswapSwapResponseData;
}

export interface MixswapSwapResponseData {
  tx: string;
  source: string;
  quote: Quote;
}

export interface Quote {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  slippage: number;
  source: string;
  jupiterQuoteResponse: JupiterQuoteResponse;
}

export interface JupiterQuoteResponse {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode: string;
  slippageBps: number;
  priceImpactPct: string;
  routePlan: RoutePlan[];
  platformFee: null;
  contextSlot: number;
  timeTaken: number;
}

export interface RoutePlan {
  swapInfo: SwapInfo;
  percent: number;
}

export interface SwapInfo {
  ammKey: string;
  label: string;
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  feeAmount: string;
  feeMint: string;
}
