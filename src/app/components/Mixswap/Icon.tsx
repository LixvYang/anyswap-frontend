"use client";

import Image from "next/image";

interface IconProps {
  icon: string;
  chainIcon: string;
}

const MixswapIcon = ({ icon, chainIcon }: IconProps) => {
  return (
    <div className="relative w-8 h-8 rounded-full">
      <Image
        className="w-8 h-8 rounded-full"
        src={icon || "/logo.webp"}
        alt="Neil image"
        width={40}
        height={40}
      />
      <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-white">
        <Image
          className="w-full h-full rounded-full"
          src={chainIcon}
          alt="Small icon"
          width={16}
          height={16}
        />
      </div>
    </div>
  );
};

export default MixswapIcon;
