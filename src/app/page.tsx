import React, { Suspense } from "react";
import { SwapStoreProvider } from "./providers/SwapProviders";
import SwapCard from "@/app/components/SwapCard";
import { SwapItem } from "../../types";
import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { getAnySwapCoinList } from "@/lib/actions";

export default async function App() {
  const coinList: SwapItem[] = await getAnySwapCoinList();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-red-400">
          Swap
        </span>
        <span className="col-span-2 text-gray-800 dark:text-gray-200 ">
          &nbsp;More&nbsp;Coin.
        </span>
      </h1>

      <Suspense
        fallback={
          <>
            <Card className="w-[1/2] space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
          </>
        }
      >
        <SwapStoreProvider>
          <SwapCard coinList={coinList} />
        </SwapStoreProvider>
      </Suspense>
    </div>
  );
}
