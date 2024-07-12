import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = `${process.env.MIXSWAP_API_ENDPOINT}/web3/tokens`;
  const response = await fetch(url, {
    cache: "force-cache",
  });
  const data = await response.json();

  return NextResponse.json(data, {
    status: 200,
  });
}
