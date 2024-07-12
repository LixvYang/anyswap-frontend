import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const amount = request.nextUrl.searchParams.get("amount");
  const inputMint = request.nextUrl.searchParams.get("inputMint");
  const outputMint = request.nextUrl.searchParams.get("outputMint");
  let slippage = request.nextUrl.searchParams.get("slippage");

  if (!slippage || slippage == "") {
    slippage = "30";
  }
  if (!outputMint || !inputMint || !amount) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  if (Number(amount) <= 0) {
    return NextResponse.json(
      { message: "Invalid input amount" },
      { status: 400 }
    );
  }

  const searchParams = new URLSearchParams();
  searchParams.set("amount", amount);
  searchParams.set("inputMint", inputMint);
  searchParams.set("outputMint", outputMint);
  searchParams.set("slippage", slippage); // TODO: remove this hardcode

  const url = `${
    process.env.MIXSWAP_API_ENDPOINT
  }/web3/quote?${searchParams.toString()}`;

  const response = await fetch(url, {
    next: { revalidate: 10 },
  });
  const data = await response.json();

  return NextResponse.json(data, {
    status: 200,
  });
}
