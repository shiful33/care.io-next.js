"use client";
import React from "react";
import { FaPaperPlane, FaBell } from "react-icons/fa";
import Swal from "sweetalert2";

const NewsLetter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (email) {
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: "Thank you for subscribing to our newsletter.",
        showConfirmButton: false,
        timer: 2000,
      });
      e.target.reset();
    }
  };

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="relative overflow-hidden shadow-2xl bg-primary rounded-3xl">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 -mt-20 -mr-20 bg-white rounded-full opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 -mb-10 -ml-10 rounded-full bg-secondary opacity-20"></div>

          <div className="relative flex flex-col items-center justify-between gap-10 p-10 lg:flex-row lg:p-16">
            {/* Text Content */}
            <div className="max-w-xl text-center text-white lg:text-left">
              <div className="flex items-center justify-center gap-2 mb-4 lg:justify-start">
                <FaBell className="animate-bounce" />
                <span className="text-sm font-bold tracking-widest uppercase">
                  Stay Updated
                </span>
              </div>
              <h2 className="mb-4 text-2xl font-black md:text-4xl">
                Subscribe to our Newsletter
              </h2>
              <p className="text-md text-blue-50 opacity-90">
                Get the latest news, special discounts, and health tips for your
                loved ones directly in your inbox.
              </p>
            </div>

            {/* Input Form */}
            <div className="w-full lg:w-auto">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-lg sm:w-[500px]"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 text-gray-700 bg-transparent border-none focus:ring-0 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-white transition-all cursor-pointer rounded-xl bg-primary hover:bg-primary-focus active:scale-95"
                >
                  Subscribe <FaPaperPlane />
                </button>
              </form>
              <p className="mt-3 text-sm text-center text-blue-100 lg:text-left opacity-70">
                * We value your privacy and never spam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
