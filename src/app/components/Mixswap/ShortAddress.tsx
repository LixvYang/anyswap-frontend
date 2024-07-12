"use client";

import { Chip } from "@nextui-org/chip";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

interface ShortLinkProps {
  address: string;
}

const ShortAddress = ({ address }: ShortLinkProps) => {
  return (
    <>
      <Chip color="secondary" variant="bordered" size="sm">
        <Link href={`https://birdeye.so/token/${address}?chain=solana`}>
          <span className="inline-block text-xs">
            {address.slice(0, 4)}
            ...
            {address.slice(-4)}&nbsp;
          </span>
          <FaExternalLinkAlt className="inline-block mb-1" />
        </Link>
      </Chip>
    </>
  );
};

export default ShortAddress;
