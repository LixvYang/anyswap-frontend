"use client";

import Image from "next/image";
import { Provider } from "../../../../types";
import { Button } from "@nextui-org/button";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletConnection from "../WalletConnection";
import { useRouter } from "next/router";
import Link from "next/link";
export interface ItemProps {
  provider: Provider;
}

const ProviderItem = ({ provider }: ItemProps) => {
  const { publicKey } = useWallet();

  return (
    <div id="provider-item">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="relative w-8 h-8 rounded-full">
            <Image
              className="w-full h-full rounded-full bg-gray-50 dark:bg-gray-800"
              src={provider.iconUrl}
              alt="iconUrl"
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium dark:text-gray-100 truncate">
            {provider.name}
            <p className="text-base font-semibold">{provider.resultAmount}</p>
          </p>
        </div>
        {provider.name === "Mixswap" && (
          <Link href="/mixswap">
            <Button variant="ghost" color="secondary">
              Swap
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProviderItem;
