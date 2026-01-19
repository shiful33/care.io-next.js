"use client";
import React, { useEffect, useState, useContext } from "react";
import { FaTrash, FaCheckCircle, FaClock, FaCreditCard } from "react-icons/fa";
import Link from "next/link";
import { AuthContext } from "@/src/providers/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Image from "next/image";

const MyBookingsPage = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
  try {
    setLoading(true);
    const res = await fetch("/api/bookings");
    const data = await res.json();
    
    console.log("Full Data from DB:", data);
    console.log("Current User Email:", user?.email);

    if (Array.isArray(data)) {
      const myData = data.filter((item) => {
        const dbEmail = item.userEmail?.toString().trim().toLowerCase();
        const loginEmail = user?.email?.toString().trim().toLowerCase();
        
        return dbEmail === loginEmail;
      });

      setBookings(myData);
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user]);

  // ১. Pay Now
  const handlePay = () => {
    Swal.fire({
      title: "Payment Gateway",
      text: "Online payment system is coming soon! Please pay cash after service.",
      icon: "info",
      confirmButtonColor: "#2563eb",
    });
  };

  // Delete Booking Function
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/bookings/${id}`, {
            method: "DELETE",
          });

          const data = await res.json();

          if (res.ok) {
            toast.success("Booking cancelled!");
            setBookings((prev) => prev.filter((item) => item._id !== id));
          } else {
            toast.error(data.error || "Failed to delete");
          }
        } catch (error) {
          console.error("Delete error:", error);
          toast.error("Something went wrong!");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container min-h-screen px-4 py-12 mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-secondary">My Booking List</h1>
          <p className="text-gray-500">
            Manage your care services and track status.
          </p>
        </div>
        <div className="gap-2 p-4 font-bold badge badge-primary">
          Total Bookings: {bookings.length}
        </div>
      </div>

      {bookings.length > 0 ? (
        <div className="overflow-x-auto border border-gray-100 shadow-2xl bg-base-100 rounded-2xl">
          <table className="table w-full">
            <thead className="text-white bg-primary">
              <tr className="">
                <th className="px-6 py-4 rounded-tl-2xl">Service</th>
                <th>Total Bill</th>
                <th>Booking Date</th>
                <th>Status</th>
                <th className="text-center rounded-tr-2xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="p-2 transition-colors border-b border-red-100 hover:bg-gray-50"
                >
                  <td>
                    <div className="flex items-center gap-4 p-3">
                      <div className="">
                        <div className="w-12 h-8 rounded shadow-md">
                          <Image
                            src={booking.serviceImage}
                            alt={booking.serviceName}
                            width={550} 
                            height={350}
                            priority
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{booking.serviceName}</div>
                        <div className="text-xs opacity-50">
                          {booking.duration} session
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-bold text-primary">৳{booking.price}</td>
                  <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge font-semibold py-3 px-4 ${
                        booking.status === "pending"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {booking.status === "pending" ? (
                        <FaClock className="mr-2" />
                      ) : (
                        <FaCheckCircle className="mr-2" />
                      )}
                      {booking.status}
                    </span>
                  </td>
                  <th className="space-x-2 text-center">
                    <button
                    onClick={handlePay}
                    className="gap-2 btn btn-sm btn-outline btn-success">
                      <FaCreditCard size={14} /> Pay
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="text-red-500 btn btn-sm btn-ghost hover:bg-red-50"
                    >
                      <FaTrash size={16} />
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
            No active bookings found!
          </h2>
          <Link href="/" className="px-10 mt-6 btn btn-primary">
            Explore Services
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
