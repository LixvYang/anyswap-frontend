"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div>Not Found</div>
      <Button type="button" variant="ghost" color="danger" className="mt-2">
        <Link href="/">Go Back</Link>
      </Button>
    </div>
  );
}
