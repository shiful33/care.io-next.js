"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/src/providers/AuthProvider";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaIdCard,
  FaCamera,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const { createUser, updateUserProfile, googleLogin } =
    useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const nid = form.nid.value;
    const photo = form.photo.value;

    try {
      // User create to Firebase
      const result = await createUser(email, password);

      // Name and photo profile update
      await updateUserProfile(name, photo);

      // Data save to MongoDB
      const userData = {
        uid: result.user.uid,
        name,
        email,
        nid,
        photo,
        role: "user",
        createdAt: new Date().toISOString(),
      };

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        toast.success("Registration Successful!");
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-base-200">
      <div className="w-full max-w-lg p-8 shadow-2xl card bg-base-100">
        <div className="card-body">
          <h2 className="mb-6 text-2xl font-bold text-center text-primary">
            Register Now
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="mb-2 font-semibold label">Full Name</label>
              <div className="relative">
                <FaUser className="absolute text-gray-400 left-3 top-4" />
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 pl-10 border border-gray-200 rounded"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="mb-2 font-semibold label">Email Address</label>
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

            {/* NID Number */}
            <div className="form-control">
              <label className="mb-2 font-semibold label">NID Number</label>
              <div className="relative">
                <FaIdCard className="absolute text-gray-400 left-3 top-4" />
                <input
                  name="nid"
                  type="text"
                  placeholder="Your NID Number"
                  className="w-full px-4 py-2 pl-10 border border-gray-200 rounded"
                  required
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="mb-2 font-semibold label">Profile Photo URL</label>
              <div className="relative">
                <FaCamera className="absolute text-gray-400 left-3 top-4" />
                <input
                  name="photo"
                  type="text"
                  placeholder="https://image-link.com"
                  className="w-full px-4 py-2 pl-10 border border-gray-200 rounded"
                  required
                />
              </div>
            </div>

            {/* Password */}
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

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

            <div className="mt-6 form-control">
              <button
                type="submit"
                className="w-full py-1 text-[17px] font-semibold border rounded cursor-pointer text-primary hover:text-secondary border-red-300"
              >
                Register
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={() => googleLogin().then(() => router.push("/"))}
            className="flex items-center w-full py-1 text-[16px] font-medium border rounded cursor-pointer hover:text-[#70af03] gap-2 justify-center border-[#98CA43] text-[#98CA43]"
          >
            <FcGoogle className="" /> Register with Google
          </button>

          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="font-bold link link-primary">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
