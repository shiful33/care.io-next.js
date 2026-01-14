"use client";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 px-4">
      <div className="p-10 space-y-4 text-center border border-red-100 shadow-xl bg-red-50 rounded-3xl">
        <h2 className="text-3xl font-bold text-red-600">
          Something went wrong!
        </h2>
        <p className="max-w-sm text-gray-600">
          We encountered an unexpected error. Our team has been notified.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="px-8 btn btn-outline btn-error"
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-8 btn btn-primary"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
