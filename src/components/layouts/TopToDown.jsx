"use client";
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const TopToDown = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed z-50 bottom-8 right-8">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-4 text-white transition-all duration-300 rounded-full shadow-2xl cursor-pointer bg-primary hover:bg-secondary animate-bounce group"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-xl transition-transform group-hover:-translate-y-1" />
        </button>
      )}
    </div>
  );
};

export default TopToDown;
