"use client";

import { useMixswapStore } from "@/app/providers/MixswapProviders";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import { useMemo } from "react";

type SwapSelectItemProps = {
  onOpen: any;
  isIput: boolean;
  amount: number;
  setAmount: any;
};

const MixswapSelectItem = ({
  onOpen,
  isIput,
  amount,
  setAmount,
}: SwapSelectItemProps) => {
  const swapStore = useMixswapStore((state) => state);
  const selectedItem = useMemo(() => {
    if (isIput) {
      return swapStore.inputToken;
    } else {
      return swapStore.outputToken;
    }
  }, [isIput, swapStore.inputToken, swapStore.outputToken]);

  return (
    <div>
      <Input
        size="lg"
        type="number"
        label={isIput ? "Sell" : "Buy"}
        placeholder="0"
        value={amount.toString()}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
        height={100}
        endContent={
          <Button
            onPress={() => {
              onOpen();
            }}
          >
            <Image
              src={selectedItem.icon || "/logo.webp"}
              alt="input-icon"
              width={24}
              height={24}
              className="rounded-full"
            />
            {selectedItem.symbol}
          </Button>
        }
      />
    </div>
  );
};

export default MixswapSelectItem;
