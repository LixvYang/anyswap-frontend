"use client";

import {
  MixswapQuoteResponse,
  MixswapSwapResponse,
  MixswapToken,
} from "../../../types";
import * as SPLToken from "@solana/spl-token";
import { NATIVE_MINT } from "@solana/spl-token";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import React, { useEffect, useMemo, useRef } from "react";
import { Button } from "@nextui-org/button";
import { MdSwapVert } from "react-icons/md";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Select, SelectItem } from "@nextui-org/select";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import MixswapSelectItem from "./Mixswap/SelectItem";
import { useMixswapStore } from "../providers/MixswapProviders";
import WalletConnection from "./WalletConnection";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  VersionedTransaction,
} from "@solana/web3.js";
import ListItem from "./Mixswap/ListItem";
import QuoteRes from "./Mixswap/QuoteRes";
import { IoIosRefresh } from "react-icons/io";
import { CiWallet } from "react-icons/ci";
import { toast } from "react-toastify";

interface MixswapCardProps {
  tokenList: MixswapToken[];
}

const slippageSettings = [
  { key: "30", label: "30" },
  { key: "50", label: "50" },
  { key: "100", label: "100" },
];

function formatPercentage(number: number) {
  // 将输入的数字转换为百分比
  const percentage = number / 100;

  // 格式化百分比字符串
  return `${percentage.toFixed(1)}%`;
}

async function swapToken(
  publicKey: string,
  slippage: number,
  request: MixswapQuoteResponse
) {
  const swapReq = {
    payer: publicKey,
    inputMint: request.data.inputMint,
    outputMint: request.data.outputMint,
    inAmount: Number(request.data.inAmount),
    slippage: slippage,
    source: request.data.source,
    referral: process.env.MIXSWAP_REFERRAL,
  };

  const response = await fetch(`/api/mixin/swap`, {
    cache: "no-cache",
    method: "POST",
    body: JSON.stringify(swapReq),
  });

  return response.json();
}

async function quoteToken(
  amount: number,
  inputMint: string,
  outputMint: string,
  slippage: string
) {
  const searchParams = new URLSearchParams();
  searchParams.append("amount", amount.toString());
  searchParams.append("inputMint", inputMint);
  searchParams.append("outputMint", outputMint);
  searchParams.append("slippage", slippage);

  const response = await fetch(`/api/mixin/quote?${searchParams.toString()}`, {
    next: { revalidate: 3 },
  });

  return response.json();
}

function formatDecimal(input: string, decimalPlaces: number): number {
  const inputStr = input.toString();

  const decimalLength = decimalPlaces;

  if (decimalLength > inputStr.length) {
    const resultStr = `0.${inputStr.padStart(decimalLength, "0")}`;
    return parseFloat(resultStr);
  }
  const decimalPart = inputStr.slice(-decimalLength);
  const intPart = inputStr.slice(0, inputStr.length - decimalLength);
  const resultStr = `${intPart}.${decimalPart}`;
  return parseFloat(resultStr);
}

const MixswapCard = ({ tokenList }: MixswapCardProps) => {
  const isFirstRender = useRef(true);
  const [quoteResult, setQuoteResult] = React.useState<MixswapQuoteResponse>();
  const [isSwapLoading, setIsSwapLoading] = React.useState(false);
  const [inputAmount, setInputAmount] = React.useState(1);
  const [outputAmount, setOutputAmount] = React.useState(0);
  const [slippage, setSlippage] = React.useState(30);
  const [isInput, setIsInputValue] = React.useState(true);
  const [inputBalance, setInputBalance] = React.useState(0);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const mixswapStore = useMixswapStore((state) => state);

  async function handlePayClick(txStr: string) {
    if (!publicKey) return;
    const txSafe = txStr
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const txBuffer = Buffer.from(txSafe, "base64");
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        try {
          // const tx = Transaction.from(txBuffer);
          // const signature = await sendAndConfirmTransaction(connection, tx, [], {});

          const tx = VersionedTransaction.deserialize(txBuffer);
          const signature = await sendTransaction(tx, connection);
          // const latestBlockHash = await connection.getLatestBlockhash();
          const signatureRes = await connection.confirmTransaction(
            // {
            //   blockhash: latestBlockHash.blockhash,
            //   lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            //   signature: signature,
            // },
            signature,
            "confirmed"
          );

          // await connection.confirmTransaction(signature, "confirmed");
          resolve(signature as any);

          toast(
            <a
              href={`https://solscan.io/tx/${signature}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span color="secondary">View tx on Solscan</span>
            </a>,
            {
              position: "bottom-right",
            }
          );
        } catch (error) {
          alert(error);
          reject(error);
        }
      }),
      {
        pending: "Approve transaction...",
        success: "Transaction successful 🎉",
        error: "Encountered error 🤯",
      },
      {
        position: "bottom-right",
      }
    );

    // const rawTxBase64 = tx
    //   .replace(/\+/g, "-")
    //   .replace(/\//g, "_")
    //   .replace(/=+$/, "");
    // const link = `mixin://mixin.one/tip/sign?chain=solana&action=signRawTransaction&raw=${rawTxBase64}`;
    // window.location.href = link;
  }

  async function getAmount() {
    if (!publicKey) return;
    if (mixswapStore.inputToken.address === NATIVE_MINT.toString()) {
      connection.getAccountInfo(publicKey).then((info) => {
        if (info) {
          setInputBalance(info?.lamports / LAMPORTS_PER_SOL);
        }
      });
      return;
    }

    let response = await connection.getTokenAccountsByOwner(
      publicKey,
      {
        mint: new PublicKey(mixswapStore.inputToken.address),
      },
      "confirmed"
    );

    if (response.value.length === 0) {
      setInputBalance(0);
      return;
    }

    response.value.forEach((e) => {
      const accountInfo = SPLToken.AccountLayout.decode(e.account.data);
      setInputBalance(
        Number(accountInfo.amount) / 10 ** mixswapStore.inputToken.decimals
      );
    });
  }

  useMemo(() => {
    mixswapStore.updateMixswapTokenList(tokenList);
    getAmount();
  }, []);

  const {
    isOpen: isTokenOpen,
    onOpen: onTokenOpen,
    onOpenChange: onTokenOpenChange,
  } = useDisclosure();

  const handleSwapTwoTokensClick = () => {
    const inputToken = mixswapStore.inputToken;
    mixswapStore.updateMixswapInputToken(mixswapStore.outputToken);
    mixswapStore.updateMixswapOutputToken(inputToken);
  };

  const handleInputCoinChange = (item: MixswapToken) => {
    if (isInput) {
      mixswapStore.updateMixswapInputToken(item);
    } else {
      mixswapStore.updateMixswapOutputToken(item);
    }
  };

  // 处理Swap点击 先quote查询价格，接着用结果去swap,得到tx 拼接得到 mixpay://pay 的形式, 跳转到支付页面
  const handleSwapClick = async () => {
    if (!publicKey) {
      alert("Connect wallet first");
      return;
    }
    setIsSwapLoading(true);

    try {
      const quoteReq: MixswapQuoteResponse = await quoteToken(
        inputAmount * 10 ** mixswapStore.inputToken.decimals,
        mixswapStore.inputToken.address,
        mixswapStore.outputToken.address,
        slippage.toString()
      );
      setQuoteResult(quoteReq);
      const swapResult: MixswapSwapResponse = await swapToken(
        publicKey.toString(),
        slippage,
        quoteReq
      );

      setIsSwapLoading(false);
      handlePayClick(swapResult.data.tx);
    } catch (error) {
      setIsSwapLoading(false);
      console.error(error);
    }
  };

  const handleQuoteTokenClick = () => {
    quoteToken(
      inputAmount * 10 ** mixswapStore.inputToken.decimals,
      mixswapStore.inputToken.address,
      mixswapStore.outputToken.address,
      slippage.toString()
    ).then((response) => {
      if (!response.data) {
        return;
      }

      setOutputAmount(
        formatDecimal(
          response.data.outAmount ?? "0",
          mixswapStore.outputToken.decimals
        )
      );
    });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (inputAmount <= 0) {
      return;
    }

    const debounceTimer = setTimeout(() => {
      handleQuoteTokenClick();
      getAmount();
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [mixswapStore.inputToken, inputAmount, mixswapStore.outputToken]);

  return (
    <>
      <Card className="max-w-lg w-full h-full max-h-lg">
        <CardHeader className="flex items-center justify-between px-4">
          <div className="flex justify-between items-center">
            <>MixSwap</>
          </div>
          <Select
            isRequired
            items={slippageSettings}
            label="Slippage"
            placeholder="Select an animal"
            className="max-w-xs w-24 h-10"
            defaultSelectedKeys={["30"]}
            onChange={(e) => setSlippage(Number(e.target.value))}
          >
            {(slippage) => (
              <SelectItem key={slippage.key}>
                {formatPercentage(Number(slippage.label))}
              </SelectItem>
            )}
          </Select>
        </CardHeader>
        <CardBody>
          <div className="pb-2 flex flex-wrap justify-between px-2">
            <Button
              isIconOnly
              color="secondary"
              aria-label="Like"
              className="rounded-full"
              size="sm"
              onPress={() => {
                handleQuoteTokenClick();
              }}
            >
              <IoIosRefresh size={16} />
            </Button>

            <div className="flex gap-2 mt-2 ">
              <div>
                <CiWallet className="inline-block" />
                <span>
                  {inputBalance} {mixswapStore.inputToken.symbol}
                </span>
              </div>
              <Button
                className="rounded-full"
                size="sm"
                color="secondary"
                variant="ghost"
                onPress={() => {
                  setInputAmount(Number(inputBalance) || 0);
                }}
              >
                MAX
              </Button>
            </div>
          </div>
          <MixswapSelectItem
            amount={inputAmount}
            setAmount={setInputAmount}
            onOpen={() => {
              setIsInputValue(true);
              onTokenOpen();
            }}
            isIput={true}
          />
          <div className="flex items-center justify-center w-full h-16">
            <Button
              isIconOnly
              color="secondary"
              aria-label="Like"
              onClick={() => handleSwapTwoTokensClick()}
            >
              <MdSwapVert size={24} />
            </Button>
          </div>
          <MixswapSelectItem
            amount={outputAmount}
            setAmount={setOutputAmount}
            onOpen={() => {
              setIsInputValue(false);
              onTokenOpen();
            }}
            isIput={false}
          />

          <div className="w-full flex items-center justify-center pt-4">
            {publicKey ? (
              <>
                {inputAmount <= inputBalance ? (
                  <>
                    <Button
                      variant="ghost"
                      color="secondary"
                      className="w-full h-12"
                      isLoading={isSwapLoading}
                      onClick={() => {
                        handleSwapClick();
                        // onSwapOpen();
                      }}
                    >
                      Swap
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      disabled
                      variant="flat"
                      color="secondary"
                      className="w-full h-12"
                    >
                      Insufficient {mixswapStore.inputToken.symbol} balance
                    </Button>
                  </>
                )}
              </>
            ) : (
              <WalletConnection connectText="Connect" />
            )}
          </div>

          <div className="w-full flex items-center justify-center">
            <QuoteRes quoteResult={quoteResult} />
          </div>
        </CardBody>
      </Card>

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
                <Listbox
                  classNames={{
                    base: "max-w-md",
                    list: "overflow-scroll max-h-60",
                  }}
                  items={mixswapStore.tokenList.filter((item) => {
                    return (
                      item.symbol !== mixswapStore.inputToken.symbol &&
                      item.symbol !== mixswapStore.outputToken.symbol
                    );
                  })}
                  label="Assigned to"
                  selectionMode="multiple"
                  variant="flat"
                >
                  {(item) => (
                    <ListboxItem
                      key={item.address}
                      textValue={item.name}
                      onClick={() => {
                        handleInputCoinChange(item);
                        onClose();
                      }}
                    >
                      <ListItem token={item} address={item.address} />
                    </ListboxItem>
                  )}
                </Listbox>
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

export default MixswapCard;
