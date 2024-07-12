"use server";

export async function getAnySwapCoinList() {
  const coinList = await fetch("/api/tokens", {
    cache: "default",
  });
  return coinList.json();
}

export const fetchMixswapTokenList = async () => {
  const response = await fetch("/api/mixin/tokens", {
    next: { revalidate: 3600 },
  });
  const tokenList = await response.json();
  return tokenList.data;
};
