"use client";
import React from "react";
import { Users, CheckCircle, Award, Heart } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      label: "Happy Families",
      value: "1,200+",
      icon: <Users className="w-8 h-8 text-blue-500" />,
      description: "Trusting us with their loved ones.",
    },
    {
      label: "Services Delivered",
      value: "5,500+",
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      description: "Successful care sessions completed.",
    },
    {
      label: "Expert Caregivers",
      value: "150+",
      icon: <Award className="w-8 h-8 text-orange-500" />,
      description: "Verified and trained professionals.",
    },
    {
      label: "Customer Ratings",
      value: "4.9/5",
      icon: <Heart className="w-8 h-8 text-red-500" />,
      description: "Average rating from our clients.",
    },
  ];

  return (
    <section className="py-16 bg-primary/5">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 text-center transition-shadow duration-300 bg-white border shadow-sm rounded-2xl hover:shadow-md border-primary/10"
            >
              <div className="p-3 mb-4 rounded-full bg-base-200">
                {stat.icon}
              </div>
              <h3 className="mb-1 text-3xl font-black text-gray-800">
                {stat.value}
              </h3>
              <p className="mb-2 text-lg font-bold text-primary">
                {stat.label}
              </p>
              <p className="text-sm text-gray-500">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
