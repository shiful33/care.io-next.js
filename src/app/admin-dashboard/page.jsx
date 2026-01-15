"use client";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/src/providers/AuthProvider";


const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const adminEmail = "admin@care.io.com";
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    if (!loading) {
      if (!user || user.email !== adminEmail) {
        router.push("/");
      }
    }
  }, [user, loading, router]);

  if (loading) return <span className="loading loading-spinner"></span>;
  if (!user || user.email !== adminEmail) return null;

  const fetchAllBookings = async () => {
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setAllBookings(data);
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        toast.success(`Status updated to ${newStatus}`);
        fetchAllBookings();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Admin Dashboard - Manage Bookings
      </h1>

      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="table w-full bg-white">
          <thead className="bg-secondary text-white">
            <tr className="">
              <th className="px-4 py-2">User</th>
              <th>Service</th>
              <th>Price</th>
              <th>Current Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {allBookings.map((booking) => (
              <tr key={booking._id}>
                <td className="p-4">
                  <p className="font-bold">{booking.userName}</p>
                  <p className="text-xs">{booking.userEmail}</p>
                </td>
                <td>{booking.serviceName}</td>
                <td>৳{booking.price}</td>
                <td className="">
                  <span
                    className={`badge p-4 text-white ${
                      booking.status === "pending"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-2">
                  <select
                    className="select select-bordered select-sm bg-gray-200 rounded p-2"
                    onChange={(e) =>
                      handleStatusUpdate(booking._id, e.target.value)
                    }
                    defaultValue={booking.status}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
