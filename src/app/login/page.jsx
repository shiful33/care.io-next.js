"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/src/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);
      router.push("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md p-8 shadow-2xl card bg-base-100">
        <div className="card-body">
          <h2 className="mb-6 text-2xl font-bold text-center text-secondary">
            Login Now!
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="mb-2 font-semibold label">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute text-gray-400 left-3 top-4" />
                <input
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-4 py-2 pl-10 border border-gray-200 rounded"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="mb-2 font-semibold label">Password</label>
              <div className="relative">
                <FaLock className="absolute text-gray-400 left-3 top-4" />
                <input
                  name="password"
                  type="password"
                  placeholder="******"
                  className="w-full px-4 py-2 pl-10 border border-gray-200 rounded"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="mt-2 text-sm font-medium text-red-500">{error}</p>
            )}

            <div className="mt-6 form-control">
              <button type="submit" className="w-full py-1 text-[17px] font-semibold border rounded cursor-pointer text-primary hover:text-secondary border-red-300">
                Login
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center w-full py-1 text-[16px] font-medium border rounded cursor-pointer hover:text-[#70af03] gap-2 justify-center border-[#98CA43] text-[#98CA43]"
          >
            <FcGoogle className="text-red-500" /> Login with Google
          </button>

          <p className="mt-6 text-sm text-center">
            New to Care.io?{" "}
            <Link href="/register" className="font-bold link link-secondary">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
