"use client";

import { Skeleton } from "@nextui-org/skeleton";
import { MixswapQuoteResponse } from "../../../../types";
import Image from "next/image";
import { useMixswapStore } from "@/app/providers/MixswapProviders";
import { stat } from "fs";
import { Chip } from "@nextui-org/chip";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import ShortAddress from "./ShortAddress";
import ListItem from "./ListItem";

interface QuoteResultProps {
  quoteResult?: MixswapQuoteResponse;
}

const QuoteRes = ({}: QuoteResultProps) => {
  const mixswapStore = useMixswapStore((state) => state);

  return (
    <>
      <div className="flex flex-col w-full gap-2 pt-4">
        <ListItem
          address={mixswapStore.inputToken.address}
          token={mixswapStore.inputToken}
        />
        <ListItem
          address={mixswapStore.outputToken.address}
          token={mixswapStore.outputToken}
        />
      </div>
    </>
  );
};

export default QuoteRes;
