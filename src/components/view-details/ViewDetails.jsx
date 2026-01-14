"use client";
import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaCheckCircle,
  FaQuestionCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ViewDetails = ({ service }) => {
  const router = useRouter();
  const [showSpinner, setShowSpinner] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (service) {
      const spinnerTimer = setTimeout(() => {
        setShowSpinner(false);
        setShowSkeleton(true);
      }, 800);

      const skeletonTimer = setTimeout(() => {
        setShowSkeleton(false);
      }, 2000);

      return () => {
        clearTimeout(spinnerTimer);
        clearTimeout(skeletonTimer);
      };
    }
  }, [service]);


  const handleAddToBooking = async () => {
    const bookingData = {
      serviceId: service._id,
      serviceName: service.title,
      serviceImage: service.image,
      price: discountedPrice,
      userEmail: "user@example.com",
      status: "pending",
      bookingDate: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        router.push("/my-bookings");
      } else {
        alert("Failed to add booking. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
    }
  };

  if (showSpinner) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-dashed rounded-full border-primary border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 rounded-full border-secondary border-b-transparent border-t-transparent animate-ping opacity-20"></div>
        </div>
        <h2 className="mt-4 text-xl font-bold tracking-widest uppercase text-secondary animate-pulse">
          Loading View Details...
        </h2>
      </div>
    );
  }

  if (showSkeleton) {
    return (
      <div className="p-6 mx-auto space-y-10 max-w-7xl lg:p-12 animate-pulse">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="w-full h-80 lg:h-[450px] bg-gray-200 rounded-2xl"></div>
          <div className="py-4 space-y-6">
            <div className="w-24 h-4 bg-gray-200 rounded-full"></div>
            <div className="w-3/4 h-10 bg-gray-200 rounded-lg"></div>
            <div className="w-full h-20 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!service || service.error) {
    return (
      <div className="py-20 font-bold text-center text-red-500">
        Service data not available!
      </div>
    );
  }

  const {
    title, image, category, price_per_hour, discount,
    sizes, ratings, reviews, info, qna = [], description,
  } = service;

  const hourlyPrice = Number(price_per_hour) || 0;
  const discountAmount = Number(discount) || 0;
  const discountedPrice = hourlyPrice - (hourlyPrice * discountAmount) / 100;

  return (
    <div className="container px-4 py-10 mx-auto mb-20 font-inter">
      <Link href="/" className="gap-2 mb-6 btn btn-ghost">
        <FaArrowLeft /> Back to Services
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="relative group">
            <img
              src={image || "/placeholder.jpg"}
              alt={title}
              className="w-full h-[400px] object-cover rounded shadow-lg"
            />
            {discount > 0 && (
              <div className="absolute p-4 font-bold top-5 left-5 badge badge-secondary badge-lg">
                {discount}% OFF
              </div>
            )}
          </div>

          <div className="p-8 bg-base-200 rounded-3xl">
            <h3 className="mb-4 text-2xl font-bold font-poppins text-primary">
              Service Description
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">{description}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <span className="font-semibold badge badge-outline badge-primary">{category}</span>
            <h1 className="text-2xl font-bold leading-tight md:text-3xl font-poppins">{title}</h1>
          </div>

          <div className="flex items-center gap-6 py-2 border-gray-200 border-y">
            <div className="flex items-center gap-2 text-xl font-bold text-orange-500">
              <FaStar /> <span>{ratings}</span>
            </div>
            <div className="font-medium text-gray-500">({reviews} Customer Reviews)</div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-black text-primary">৳{discountedPrice}</span>
            {discount > 0 && <span className="text-xl text-gray-400 line-through">৳{price_per_hour}</span>}
            <span className="text-lg text-gray-500">/ per {sizes?.[0] || "session"}</span>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-bold">What's Included:</h4>
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {info?.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600">
                  <FaCheckCircle className="text-green-500" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-200 collapse collapse-plus bg-base-100 rounded-xl">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="flex items-center gap-2 text-xl font-medium collapse-title">
              <FaQuestionCircle className="text-secondary" /> Common Questions
            </div>
            <div className="collapse-content">
              {qna?.map((item, idx) => (
                <div key={idx} className="mb-4">
                  <p className="font-bold text-secondary">Q: {item.question}</p>
                  <p className="italic text-gray-600">A: {item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button 
              onClick={handleAddToBooking}
              className="flex items-center gap-3 px-12 py-2 text-white transition-transform bg-green-300 border rounded-md shadow-xl cursor-pointer btn-lg md:w-auto hover:scale-105 hover:bg-green-400"
            >
              <TbBrandBooking size={20} /> Add to Booking List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;