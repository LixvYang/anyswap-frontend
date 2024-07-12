import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const inputAmount = request.nextUrl.searchParams.get("inputAmount");
  const inputToken = request.nextUrl.searchParams.get("inputToken");
  const outputToken = request.nextUrl.searchParams.get("outputToken");

  if (!outputToken || !inputToken || !inputAmount) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  if (Number(inputAmount) <= 0) {
    return NextResponse.json(
      { message: "Invalid input amount" },
      { status: 400 }
    );
  }

  const searchParams = new URLSearchParams();
  searchParams.set("inputAmount", inputAmount);
  searchParams.set("inputToken", inputToken);
  searchParams.set("outputToken", outputToken);

  const url = `${
    process.env.ANYSWAP_API_ENDPOINT
  }/quote?${searchParams.toString()}`;

  const response = await fetch(url, {
    next: { revalidate: 10 },
  });
  const data = await response.json();

  return NextResponse.json(data, {
    status: 200,
  });
}
