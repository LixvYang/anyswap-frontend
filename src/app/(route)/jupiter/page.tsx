"use client";

import IntegratedTerminal from "@/app/components/Jupiter/IntegratedTerminal";
import Script from "next/script";
import { SwapMode } from "../../../../types/enums";

const JupiterPage = () => {
  return (
    <>
      <IntegratedTerminal
        rpcUrl={
          process.env.NEXT_PUBLIC_SOLANA_ENDPOINT ||
          "https://api.mainnet-beta.solana.com"
        }
        formProps={{
          initialSlippageBps: 30,
          swapMode: SwapMode.ExactInOrOut,
          platformFeeAndAccounts: {
            referralAccount: process.env.NEXT_PUBLIC_REFERAL_ACCOUNT || "",
            feeBps: 20,
          },
        }}
        simulateWalletPassthrough={true}
        strictTokenList={true}
        useUserSlippage={true}
        defaultExplorer="Solana Explorer"
      />
    </>
  );
};

export default JupiterPage;
