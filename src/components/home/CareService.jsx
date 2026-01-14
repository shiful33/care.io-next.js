"use client";
import React, { useEffect, useState } from "react";
import CareCard from "../cards/CareCard";

const CareService = () => {
  const [services, setServices] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setServices(data);
        }


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


  if (showSkeleton) {
    return (
      <div className="container px-4 mx-auto my-20">
        <div className="w-64 h-10 mx-auto mb-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col w-full gap-4 animate-pulse"
            >
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
    <div className="container px-4 mx-auto">
      <div className="my-20 text-center">
        <h2 className="text-2xl font-bold md:text-3xl text-secondary">
          Our Service Categories
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {services.length > 0 ? (
          services
            .slice(0, 8)
            .map((service) => <CareCard key={service._id} service={service} />)
        ) : (
          <p className="font-bold text-center text-red-400 col-span-full">
            No data found in Database!
          </p>
        )}
      </div>
    </div>
  );
};

export default CareService;
