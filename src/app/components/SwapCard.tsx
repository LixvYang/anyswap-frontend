"use client";

import { Card, CardBody } from "@nextui-org/card";
import SwapSelectItem from "./Swap/Item";
import React, { useEffect, useMemo, useRef } from "react";
import { Button } from "@nextui-org/button";
import { MdSwapVert } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import Image from "next/image";
import { Provider, QuoteResponse, SwapItem } from "../../../types";
import ProviderItem from "./Provider/Item";
import { useSwapStore } from "../providers/SwapProviders";

type SwapCardProps = {
  coinList: SwapItem[];
};

async function quoteToken(
  inputAmount: string,
  inputToken: string,
  outputToken: string
) {
  const searchParams = new URLSearchParams();
  searchParams.set("inputAmount", inputAmount);
  searchParams.set("inputToken", inputToken);
  searchParams.set("outputToken", outputToken);

  const response = await fetch(`/api/quote?${searchParams.toString()}`, {
    next: { revalidate: 3 },
  });
  return response.json();
}

const SwapCard = ({ coinList }: SwapCardProps) => {
  const [inputAmount, setInputAmount] = React.useState(1);
  const [outputAmount, setOutputAmount] = React.useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isInput, setIsInputValue] = React.useState(true);
  const isFirstRender = useRef(true);
  const [providers, setProviders] = React.useState<Provider[]>([]);

  const swapStore = useSwapStore((state) => state);
  useMemo(() => {
    swapStore.updateCoinList(coinList);
    isFirstRender.current = false;
  }, []);

  const fetchData = async () => {
    try {
      const response: QuoteResponse = await quoteToken(
        inputAmount.toString(),
        swapStore.inputItem.anyswapId!,
        swapStore.outputItem.anyswapId!
      );
      setOutputAmount(Number(response.maxOutAmount) ?? 0);
      setProviders(response.providers ?? []);
    } catch (error) {
      throw Error("Quote error");
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      // 跳过首次渲染时的 useEffect 执行
      isFirstRender.current = false;
      return;
    }

    if (inputAmount <= 0) {
      return;
    }

    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [swapStore.inputItem, inputAmount, swapStore.outputItem]);

  const handleInputCoinChange = (item: SwapItem) => {
    if (isInput) {
      swapStore.updateInputItem(item);
    } else {
      swapStore.updateOutputItem(item);
    }
  };

  const handleSwapClick = () => {
    const inputSwap = swapStore.inputItem;
    swapStore.updateInputItem(swapStore.outputItem);
    swapStore.updateOutputItem(inputSwap);
  };

  return (
    <>
      <Card className="max-w-lg w-full max-h-80 min-h-60 h-full">
        <CardBody>
          <div>
            <SwapSelectItem
              amount={inputAmount}
              setAmount={setInputAmount}
              onOpen={() => {
                setIsInputValue(true);
                onOpen();
              }}
              isIput={true}
            />
            <div className="flex items-center justify-center w-full h-16">
              <Button
                isIconOnly
                color="secondary"
                aria-label="Like"
                onClick={() => handleSwapClick()}
              >
                <MdSwapVert size={24} />
              </Button>
            </div>
            <SwapSelectItem
              amount={outputAmount}
              setAmount={setOutputAmount}
              onOpen={() => {
                setIsInputValue(false);
                onOpen();
              }}
              isIput={false}
            />
          </div>
        </CardBody>
      </Card>

      <div className="pt-4 max-w-lg w-full max-h-80 min-h-80 h-full">
        <Card>
          <CardBody>
            {providers.map((provider) => (
              <div className="pt-4">
                <ProviderItem key={provider.name} provider={provider} />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Coins</ModalHeader>
              <ModalBody>
                <div className="flex flex-wrap gap-2">
                  {coinList
                    .filter((coin) => {
                      if (isInput === true) {
                        // 如果是输入币种操作,则过滤掉 inputItem 对应的币种
                        return coin.symbol !== swapStore.outputItem.symbol;
                      } else {
                        // 如果是输出币种操作,则过滤掉 outputItem 对应的币种
                        return coin.symbol !== swapStore.inputItem.symbol;
                      }
                    })
                    .map((coin) => (
                      <Button
                        key={coin.symbol}
                        color="secondary"
                        variant="ghost"
                        startContent={
                          <div className="relative w-8 h-8 rounded-full">
                            <Image
                              className="w-full h-full rounded-full"
                              src={coin.iconUrl}
                              alt="Neil image"
                              width={40}
                              height={40}
                            />
                            {coin.mixinChainIconUrl &&
                              coin.mixinChainIconUrl !== "" && (
                                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-white">
                                  <Image
                                    className="w-full h-full rounded-full"
                                    src={coin.mixinChainIconUrl}
                                    alt="Small icon"
                                    width={16}
                                    height={16}
                                  />
                                </div>
                              )}
                          </div>
                        }
                        onClick={() => {
                          handleInputCoinChange(coin);
                          onClose();
                        }}
                      >
                        {coin.symbol}
                      </Button>
                    ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SwapCard;
