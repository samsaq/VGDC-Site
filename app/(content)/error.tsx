"use client";

import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <button
        type="button"
        onClick={() => retry()}
        className="rounded-full bg-secondary-alternative px-4 py-2 font-poppins font-semibold text-secondary-foreground"
      >
        Try again
      </button>
    </div>
  );
}
