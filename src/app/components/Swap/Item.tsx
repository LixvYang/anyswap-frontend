"use client";

import { useSwapStore } from "@/app/providers/SwapProviders";
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

const SwapSelectItem = ({
  onOpen,
  isIput,
  amount,
  setAmount,
}: SwapSelectItemProps) => {
  const swapStore = useSwapStore((state) => state);
  const selectedItem = useMemo(() => {
    if (isIput) {
      return swapStore.inputItem;
    } else {
      return swapStore.outputItem;
    }
  }, [isIput, swapStore.inputItem, swapStore.outputItem]);

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
            <div className="relative w-8 h-8 rounded-full">
              <Image
                className="w-full h-full rounded-full"
                src={selectedItem.iconUrl}
                alt="Neil image"
                width={40}
                height={40}
              />
              {selectedItem.mixinChainIconUrl &&
                selectedItem.mixinChainIconUrl !== "" && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-white">
                    <Image
                      className="w-full h-full rounded-full"
                      src={selectedItem.mixinChainIconUrl}
                      alt="Small icon"
                      width={16}
                      height={16}
                    />
                  </div>
                )}
              {selectedItem.symbol}
            </div>
            {selectedItem.symbol}
          </Button>
        }
      />
    </div>
  );
};

export default SwapSelectItem;
