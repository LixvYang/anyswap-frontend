import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = await fetch(
    `${process.env.MIXSWAP_API_ENDPOINT}/web3/swap`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-cache",
    }
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: 200,
  });
}
