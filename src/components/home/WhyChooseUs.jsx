"use client";
import React from "react";
import { ShieldCheck, Clock, DollarSign, HeartPulse } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Verified Caregivers",
      desc: "Every caregiver undergoes a rigorous background check and verification process.",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "24/7 Support",
      desc: "Our dedicated support team is available around the clock to assist you.",
      icon: <Clock className="w-8 h-8 text-secondary" />,
      bgColor: "bg-purple-50",
    },
    {
      title: "Affordable Plans",
      desc: "Quality care services designed to fit your budget without compromising quality.",
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Expert Medical Care",
      desc: "Specialized care for sick and elderly people by trained professionals.",
      icon: <HeartPulse className="w-8 h-8 text-red-500" />,
      bgColor: "bg-red-50",
    },
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
            Why Choose Our <span className="text-primary">Care Services?</span>
          </h2>
          <p className="text-gray-500">
            We are committed to providing the highest quality care for your
            loved ones with empathy, professionalism, and reliability.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 transition-all duration-300 bg-white border border-gray-100 rounded-2xl hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 group"
            >
              <div
                className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
