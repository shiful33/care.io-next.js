import Link from "next/link";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-base-100">
      <div className="space-y-6 text-center">
        {/* Animated Icon */}
        <div className="relative flex justify-center">
          <FaExclamationTriangle className="text-9xl text-warning animate-bounce opacity-20" />
          <h1 className="absolute inset-0 flex items-center justify-center font-black text-9xl text-secondary">
            404
          </h1>
        </div>

        <h2 className="text-3xl font-bold md:text-4xl text-primary">
          Oops! Page Not Found
        </h2>

        <p className="max-w-md mx-auto text-lg text-gray-500">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="pt-6">
          <Link
            href="/"
            className="gap-2 transition-transform shadow-lg btn btn-primary btn-lg hover:scale-105"
          >
            <FaHome size={20} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
