import { Suspense } from "react";
import { fetchMixswapTokenList } from "@/lib/actions";
import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import MixinswapCard from "@/app/components/MixinswapCard";

const MixinSwapPage = async () => {
  const tokenList = await fetchMixswapTokenList();
  return (
    <div className="flex flex-col items-center w-full">
      <Suspense
        fallback={
          <div>
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
          </div>
        }
      >
        <MixinswapCard tokenList={tokenList} />
      </Suspense>
    </div>
  );
};

export default MixinSwapPage;
