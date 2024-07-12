"use client";

import { Button } from "@nextui-org/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   /* eslint-disable no-console */
  //   console.error(error);
  // }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-red-400">Something went wrong!</h2>
      <Button
        onClick={
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
