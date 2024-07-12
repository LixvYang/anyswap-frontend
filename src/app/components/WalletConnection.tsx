"use client";

import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

//handle wallet balance fixed to 2 decimal numbers without rounding
export function toFixed(num: number, fixed: number): string {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)![0];
}

interface WalletConnectionProps {
  connectText: string;
}

const WalletConnection = ({ connectText }: WalletConnectionProps) => {
  const { connection } = useConnection();
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [open, setOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [userWalletAddress, setUserWalletAddress] = useState<string>("");

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed"
    );

    connection.getAccountInfo(publicKey).then((info) => {
      if (info) {
        setBalance(info?.lamports / LAMPORTS_PER_SOL);
      }
    });
  }, [publicKey, connection]);

  useEffect(() => {
    setUserWalletAddress(publicKey?.toBase58()!);
  }, [publicKey]);

  const handleWalletSelect = async (walletName: any) => {
    if (walletName) {
      try {
        select(walletName);
        setOpen(false);
      } catch (error) {
        console.log("wallet connection err : ", error);
      }
    }
  };

  const handleDisconnect = async () => {
    disconnect();
  };

  return (
    <div className="text-white">
      <>
        {!publicKey ? (
          <Button
            variant="ghost"
            color="secondary"
            onClick={onOpen}
            className="font-slackey z-50"
          >
            {connecting ? "connecting..." : connectText}
          </Button>
        ) : (
          <>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  color="secondary"
                  variant="ghost"
                  className="flex gap-2 = font-slackey z-50"
                >
                  <div>
                    <div className=" truncate md:w-[150px] w-[100px]  ">
                      {publicKey.toBase58()}
                    </div>
                  </div>
                  {balance ? (
                    <div>{toFixed(balance, 2)} SOL</div>
                  ) : (
                    <div>0 SOL</div>
                  )}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">
                  Balance: {balance ? toFixed(balance, 2) : "0"} SOL
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={handleDisconnect}
                >
                  Disconnect
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        )}
      </>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Wallet Connection
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full justify-center items-center ">
                  <div className="flex flex-col justify-start items-center space-y-5  w-[300px] md:w-[400px] overflow-y-auto ">
                    {wallets.map((wallet) => (
                      <Button
                        key={wallet.adapter.name}
                        onPress={onClose}
                        onClick={() => handleWalletSelect(wallet.adapter.name)}
                        variant={"ghost"}
                        className=" h-[40px] hover:bg-transparent hover:text-white text-[20px] text-white font-slackey flex w-full justify-center items-center "
                      >
                        <div className="flex">
                          <Image
                            src={wallet.adapter.icon}
                            alt={wallet.adapter.name}
                            height={30}
                            width={30}
                            className="mr-5 "
                          />
                        </div>
                        <div className="font-slackey text-white wallet-name text-[20px]">
                          {wallet.adapter.name}
                        </div>
                      </Button>
                    ))}
                  </div>
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

export default WalletConnection;
