"use client";

import { MixswapToken } from "../../../../types";
import MixswapIcon from "./Icon";
import ShortAddress from "./ShortAddress";

interface ListItemProps {
  address: string;
  token: MixswapToken;
}

const ListItem = ({ address, token }: ListItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <MixswapIcon icon={token.icon} chainIcon={token.chain.icon} />
        <div className="flex flex-col">
          <span className="text-small">
            &nbsp;{token.symbol}&nbsp;
            <ShortAddress address={address} />
          </span>
          <span className="text-tiny text-default-400">&nbsp;{token.name}</span>
        </div>
      </div>

      <span className="text-tiny text-default-400 ">
        {token.source.toUpperCase()}
      </span>
    </div>
  );
};

export default ListItem;
