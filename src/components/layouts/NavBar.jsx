"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/src/providers/AuthProvider";
import Logo from "./Logo";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navLinks = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/all-services">All Services</Link>
      </li>
      {user && (
        <li>
          <Link href="/my-bookings">My Bookings</Link>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100/95 backdrop-blur-md sticky top-0 z-[100] shadow-md w-full px-4 md:px-16">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-semibold"
          >
            {navLinks}
          </ul>
        </div>
        <Logo />
      </div>

      <div className="hidden navbar-center lg:flex">
        <ul className="gap-2 px-1 text-[17px] font-semibold menu menu-horizontal">
          {navLinks}
        </ul>
      </div>

      <div className="gap-4 navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="border-2 btn btn-ghost btn-circle avatar border-primary"
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    user?.photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="px-4 py-2 mb-2 font-bold truncate border-b text-secondary">
                {user?.displayName}
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logout} className="font-bold text-red-500">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-8 text-white rounded-full btn btn-primary"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
