"use client";
import CareCard from "@/src/components/cards/CareCard";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const AllServices = () => {
  // States
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    
    // Loading States
    const [showSpinner, setShowSpinner] = useState(true);
    const [showSkeleton, setShowSkeleton] = useState(false);
  
    const categories = ["All", "Baby Care", "Elderly Care", "Sick People Care"];
  
    // Data fetching
    useEffect(() => {
      fetch("https://care-io-next-js.vercel.app/api/services")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setServices(data);
            setFilteredServices(data);
          }
          
          // Loading experience
          setTimeout(() => {
            setShowSpinner(false);
            setShowSkeleton(true);
          }, 800);
  
          setTimeout(() => {
            setShowSkeleton(false);
          }, 2000);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setShowSpinner(false);
          setShowSkeleton(false);
        });
    }, []);
  
    // Filter Logic (Search + Category)
    useEffect(() => {
      let result = services;
  
      // Category base filtering
      if (activeCategory !== "All") {
        result = result.filter((s) => s.category === activeCategory);
      }
  
      // Search query base filtering
      if (searchQuery) {
        result = result.filter((s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
  
      setFilteredServices(result);
    }, [searchQuery, activeCategory, services]);
  
    // Spinner UI
    if (showSpinner) {
      return (
        <div className="flex flex-col items-center justify-center my-40 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-dashed rounded-full border-primary border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 rounded-full border-secondary border-b-transparent border-t-transparent animate-ping opacity-20"></div>
          </div>
          <h2 className="text-xl font-bold tracking-widest uppercase text-secondary animate-pulse">
            Loading Services...
          </h2>
        </div>
      );
    }
  
    // Skeleton UI
    if (showSkeleton) {
      return (
        <div className="container px-4 mx-auto my-20">
          <div className="w-64 h-10 mx-auto mb-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex flex-col w-full gap-4 animate-pulse">
                <div className="w-full bg-gray-200 h-52 rounded-xl"></div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
                <div className="w-full h-4 bg-gray-200 rounded"></div>
                <div className="w-full h-10 mt-2 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      );
    }

  return (
    <div className="container px-4 mx-auto mb-20">
      <div className="my-10 text-center">
        <h2 className="mb-2 text-3xl font-bold text-secondary">Our All Services</h2>
        <p className="text-gray-500">Find the perfect care service for your family</p>
      </div>

      {/* --- Search & Filter Bar --- */}
      <div className="flex flex-col items-center justify-between gap-6 p-6 mb-12 bg-gray-100 border border-red-200 shadow-md md:flex-row rounded-2xl">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search service..."
            className="w-full pl-12 bg-white rounded-md shadow input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn btn-sm rounded-full px-5 ${
                activeCategory === cat ? "btn-primary text-gray-600" : "btn-outline btn-ghost"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- Service Grid --- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <CareCard key={service._id} service={service} />
          ))
        ) : (
          <div className="py-20 text-center border-2 border-dashed col-span-full bg-gray-50 rounded-xl">
             <p className="text-xl font-semibold text-gray-400">
               No services found in this category or search!
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
