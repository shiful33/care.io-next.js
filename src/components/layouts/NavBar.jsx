import React from "react";
import Logo from "./Logo";
import NavLink from "../buttons/NavLink";
import Link from "next/link";
import { BsCart3 } from "react-icons/bs";

const NavBar = () => {

    const nav = <>
      <li>
        <NavLink href={"/"}>Home</NavLink>
      </li>

      <li>
        <NavLink href={"/all-services"}>All Services</NavLink>
      </li>

      <li>
        <NavLink href={"/about-us"}>About Us</NavLink>
      </li>

      <li>
        <NavLink href={"/booking-service"}>Booking Service</NavLink>
      </li>
    </>

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow custom-text-shadow text-lg"
            > 
              {nav}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4 custom-text-shadow text-lg">
            {nav}
          </ul>
        </div>
        <div className="navbar-end flex gap-4 ">
          <Link href={"/cart"} className="text-2xl text-primary hover:text-secondary" >
            <BsCart3 />
          </Link>
          <Link href={"/login"}>
            <button className="px-4 py-1 border border-white bg-green-300 text-white rounded font-bold cursor-pointer transition-all duration-300 custom-text-shadow hover:bg-green-400">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
