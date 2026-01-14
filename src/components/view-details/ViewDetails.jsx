"use client";
import React, { useEffect, useState, useContext } from "react";
import {
  FaStar,
  FaCheckCircle,
  FaQuestionCircle,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import Link from "next/link";
import { AuthContext } from "@/src/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ViewDetails = ({ service }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  // States for Booking Form
  const [duration, setDuration] = useState(1);
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");

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

  // Price Calculation
  const hourlyPrice = Number(service?.price_per_hour) || 0;
  const discountedPrice = Number(service?.discount) || 0;
  const unitPrice = hourlyPrice - (hourlyPrice * discountedPrice) / 100;
  const totalPrice = unitPrice * duration;

  const handleConfirmBooking = async (e) => {
    e.preventDefault();

    const bookingData = {
      serviceId: service?._id,
      serviceName: service?.title,
      serviceImage: service?.image,
      price: discountedPrice,
      userEmail: user?.email,
      userName: user?.displayName,
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
        Swal.fire({
          icon: "success",
          title: "Booked Successfully!",
          text: "Service has been added to your booking list.",
          showConfirmButton: false,
          timer: 1500,
        });
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
    title,
    image,
    category,
    price_per_hour,
    discount,
    sizes,
    ratings,
    reviews,
    info,
    qna = [],
    description,
  } = service;

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
            <p className="text-lg leading-relaxed text-gray-700">
              {description}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <span className="font-semibold badge badge-outline badge-primary">
              {category}
            </span>
            <h1 className="text-2xl font-bold leading-tight md:text-3xl font-poppins">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-6 py-2 border-gray-200 border-y">
            <div className="flex items-center gap-2 text-xl font-bold text-orange-500">
              <FaStar /> <span>{ratings}</span>
            </div>
            <div className="font-medium text-gray-500">
              ({reviews} Customer Reviews)
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-black text-primary">
              ৳{discountedPrice}
            </span>
            {discount > 0 && (
              <span className="text-xl text-gray-400 line-through">
                ৳{price_per_hour}
              </span>
            )}
            <span className="text-lg text-gray-500">
              / per {sizes?.[0] || "session"}
            </span>
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

          {/* Main Action Button */}
          <div className="pt-6">
            <button
              onClick={() =>
                document.getElementById("booking-modal").showModal()
              }
              className="lg:flex justify-center items-center w-full py-1 text-[17px] font-semibold border rounded cursor-pointer text-primary hover:text-secondary border-red-300 gap-2"
            >
              <TbBrandBooking size={24} /> Book This Service Now
            </button>
          </div>

          {/* --- Dynamic Booking Modal --- */}
          <dialog
            id="booking-modal"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="max-w-2xl p-8 modal-box bg-base-100">
              <h3 className="pb-2 mb-4 text-2xl font-bold border-b text-primary">
                Complete Your Booking
              </h3>

              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Duration Field */}
                  <div className="form-control">
                    <label className="mb-2 font-semibold label">
                      <FaClock className="mr-2" /> Duration (Hours)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="px-4 border border-red-300 rounded-md input hover:border-none"
                      required
                    />
                  </div>

                  {/* City/Division */}
                  <div className="form-control">
                    <label className="mb-2 font-semibold label">
                      <FaMapMarkerAlt className="mr-2" /> City / Division
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dhaka"
                      onChange={(e) => setCity(e.target.value)}
                      className="pl-4 border border-red-300 rounded-md input hover:border-none"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="mb-2 font-semibold text-gray-600 label">
                    Full Address
                  </label>
                  <textarea
                    placeholder="House No, Road No, Area..."
                    className="w-full h-20 pl-4 border border-red-300 rounded-md"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* Total Cost Breakdown */}
                <div className="p-4 mt-4 border border-blue-200 rounded-lg bg-blue-50">
                  <div className="flex justify-between text-lg">
                    <span>Unit Price:</span> <span>৳{unitPrice}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Duration:</span> <span>{duration} hr(s)</span>
                  </div>
                  <hr className="my-2 border-blue-300" />
                  <div className="flex justify-between text-xl font-bold text-primary">
                    <span>Total Cost:</span> <span>৳{totalPrice}</span>
                  </div>
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() =>
                      document.getElementById("booking-modal").close()
                    }
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 text-[17px] font-semibold border rounded cursor-pointer text-primary hover:text-secondary border-red-300 gap-2"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
