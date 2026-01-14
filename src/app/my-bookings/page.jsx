"use client";
import React, { useEffect, useState } from "react";
import { FaTrash, FaCheckCircle, FaClock } from "react-icons/fa";
import Link from "next/link";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Booking fetch from database
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        if (Array.isArray(data)) {
          setBookings(data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container min-h-screen px-4 py-12 mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-secondary">My Booking List</h1>
        <p className="text-gray-500">
          Manage your selected services and track their status.
        </p>
      </div>

      {bookings.length > 0 ? (
        <div className="overflow-x-auto border border-gray-100 shadow-2xl bg-base-100 rounded-2xl">
          <table className="table w-full">
            {/* Table Head */}
            <thead className="text-white bg-primary">
              <tr className="">
                <th className="px-4 py-2 rounded-tl-2xl">Service</th>
                <th>Price</th>
                <th>Booking Date</th>
                <th>Status</th>
                <th className="text-center rounded-tr-2xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td>
                    <div className="flex items-center gap-4 px-4 py-2">
                      <div className="avatar">
                        <div className="bg-gray-100 mask mask-squircle w-14 h-14">
                          <img
                            src={booking.serviceImage}
                            alt={booking.serviceName}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">
                          {booking.serviceName}
                        </div>
                        <div className="text-sm opacity-60">
                          ID: {booking.serviceId.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-lg font-bold text-primary">
                    ৳{booking.price}
                  </td>
                  <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td>
                    <div
                      className={`badge badge-ghost gap-2 py-3 px-4 ${
                        booking.status === "pending"
                          ? "text-orange-500"
                          : "text-green-500"
                      }`}
                    >
                      {booking.status === "pending" ? (
                        <FaClock />
                      ) : (
                        <FaCheckCircle />
                      )}
                      {booking.status}
                    </div>
                  </td>
                  <th className="text-center">
                    <button className="text-red-500 btn btn-ghost btn-md hover:bg-red-50">
                      <FaTrash size={20} />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-20 text-center border-2 border-dashed bg-gray-50 rounded-3xl">
          <h2 className="text-2xl font-semibold text-gray-400">
            Your booking list is empty!
          </h2>
          <Link href="/" className="px-10 mt-6 btn btn-primary">
            Explore Services
          </Link>
        </div>
      )}

      {/* Summary Section */}
      {bookings.length > 0 && (
        <div className="flex justify-end mt-10">
          <div className="border shadow-xl stats">
            <div className="px-10 stat">
              <div className="text-lg font-bold stat-title text-secondary">
                Total Amount
              </div>
              <div className="stat-value text-primary">
                ৳{bookings.reduce((sum, item) => sum + item.price, 0)}
              </div>
              <div className="stat-actions">
                <button className="mt-4 btn btn-primary btn-block">
                  Checkout All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
