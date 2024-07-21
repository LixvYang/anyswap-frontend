"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { chainConfig } from "./config";
import { useState } from "react";
import { coinList } from "@/stores/swap-store";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Image from "next/image";

const MixinWithdrawPage = () => {
  const [chain, setChain] = useState(chainConfig[0]);
  const [amount, setAmount] = useState("0");
  const [selectedItem, setSelectedItem] = useState(coinList[0]);
  const [address, setAddress] = useState("");

  const [label, setLabel] = useState("");
  const [message, setMessage] = useState("");
  const [memo, setMemo] = useState("");

  const { publicKey } = useWallet();

  const {
    isOpen: isTokenOpen,
    onOpen: onTokenOpen,
    onOpenChange: onTokenOpenChange,
  } = useDisclosure();

  const handleWithdrawClick = () => {
    if (selectedItem.name === "Solana") {
      if (publicKey) {
        window.location.replace(
          `${chain.key}:${publicKey}?label=${label}&message=${message}&memo=${memo}&amount=${amount}`
        );
      } else {
        window.location.replace(
          `${chain.key}:${address}?label=${label}&message=${message}&memo=${memo}&amount=${amount}`
        );
      }
    } else {
      if (publicKey) {
        window.location.replace(
          `${chain.key}:${publicKey}?label=${label}&message=${message}&memo=${memo}&amount=${amount}&spl-token=${selectedItem.solanaTokenAddress}`
        );
      } else {
        window.location.replace(
          `${chain.key}:${address}?label=${label}&message=${message}&memo=${memo}&amount=${amount}&spl-token=${selectedItem.solanaTokenAddress}`
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="min-w-md">
        <Card className="max-w-xl min-w-md">
          <CardHeader className="flex gap-3">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-col">
                <p className="text-md">Mixin</p>
                <p className="text-small text-default-500">Withdraw</p>
              </div>

              <div className="min-w-xl">
                <CardHeader className="flex items-center justify-end">
                  <Select
                    color="secondary"
                    isRequired
                    items={chainConfig}
                    label="Chain"
                    placeholder="Select an animal"
                    className="max-w-xs w-32"
                    defaultSelectedKeys={[chain.key]}
                    onChange={(e) => {
                      chainConfig.map((chain) => {
                        chain.key === e.target.value && setChain(chain);
                      });
                    }}
                  >
                    {(chain) => (
                      <SelectItem key={chain.key}>{chain.label}</SelectItem>
                    )}
                  </Select>
                </CardHeader>
              </div>
            </div>
          </CardHeader>

          <Divider />
          <CardBody>
            {!publicKey && (
              <div className="py-1">
                <Input
                  isRequired
                  type="address"
                  label="Address"
                  defaultValue=""
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  className="max-w-xs"
                />
              </div>
            )}

            <div>
              <Input
                size="lg"
                type="number"
                label={"Amount"}
                placeholder="0"
                value={amount.toString()}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                height={100}
                endContent={
                  <Button
                    onPress={() => {
                      onTokenOpen();
                    }}
                  >
                    <Image
                      src={selectedItem.iconUrl || "/logo.webp"}
                      alt="input-icon"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    {selectedItem.symbol}
                  </Button>
                }
              />
            </div>
            {chain.key === "solana" && (
              <div className="flex flex-col gap-2 mt-4">
                <span>Options:</span>
                <Input
                  type="label"
                  label="Label"
                  value={label.toString()}
                  onChange={(e) => setLabel(e.target.value)}
                />

                <Input
                  type="message"
                  label="Message"
                  value={message.toString()}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <Input
                  type="memo"
                  label="Memo"
                  value={memo.toString()}
                  onChange={(e) => setMemo(e.target.value)}
                />
              </div>
            )}
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="flex items-center justify-center w-full">
              <Button
                className="w-full"
                color="secondary"
                onClick={() => handleWithdrawClick()}
              >
                Withdraw
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <Modal
        isOpen={isTokenOpen}
        onOpenChange={onTokenOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Coins</ModalHeader>
              <ModalBody>
                <div className="flex flex-wrap gap-2">
                  {coinList
                    .filter((coin) => {
                      return coin.mixinChainId === chain.mixinChainId;
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
                          setSelectedItem({
                            ...coin,
                          });
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
    </div>
  );
};

export default MixinWithdrawPage;
