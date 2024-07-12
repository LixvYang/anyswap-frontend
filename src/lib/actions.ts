"use server";

export async function getAnySwapCoinList() {
  const coinList = await fetch("http://127.0.0.1:3001/api/tokens", {
    cache: "default",
  });
  return coinList.json();
}

export const fetchMixswapTokenList = async () => {
  const response = await fetch("http://127.0.0.1:3001/api/mixin/tokens", {
    next: { revalidate: 3600 },
  });
  const tokenList = await response.json();
  return tokenList.data;
};
