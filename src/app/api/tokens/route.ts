import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const response = await fetch(process.env.ANYSWAP_API_ENDPOINT + "/tokens", {
    next: { revalidate: 3600 },
  });

  const data = await response.json();
  return NextResponse.json(data, {
    status: 200,
  });
}
