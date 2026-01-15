"use client";
import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Anika Rahman",
      role: "Working Mother",
      image: "https://i.pravatar.cc/150?u=anika",
      review:
        "Ami amar bacchar jonno khub chinta korlam, kintu eikhaner baby care service ta osadharon. Caregiver khub e jotnosheel chilo.",
      rating: 5,
    },
    {
      id: 2,
      name: "Karim Ullah",
      role: "Businessman",
      image: "https://i.pravatar.cc/150?u=karim",
      review:
        "Amar baba-ma er jonno elderly care service niyechilam. Tader professional bebohar ebong kaje ami khub e shontushto.",
      rating: 5,
    },
    {
      id: 3,
      name: "Sonia Akter",
      role: "Housewife",
      image: "https://i.pravatar.cc/150?u=sonia",
      review:
        "Emergency somoy sick people service ta amar khub upokare esheche. Khub e druto tara caregiver er bebostha kore diyeche.",
      rating: 4,
    },
  ];

  return (
    <section className="py-20 bg-base-200">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            What Our <span className="text-primary">Happy Clients</span> Say
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500">
            Amader service niye grahokder motamot dekhun. Amader kache apnar
            priojoner nirapottai shobar age.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="relative p-8 transition-all duration-300 bg-white shadow-lg rounded-2xl hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="absolute text-primary/10 top-4 right-6">
                <FaQuoteLeft size={40} />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4 text-orange-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <p className="mb-6 italic leading-relaxed text-gray-600">
                "{rev.review}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={rev.image}
                  alt={rev.name}
                  className="object-cover border-2 rounded-full w-14 h-14 border-primary/20"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{rev.name}</h4>
                  <p className="text-sm text-gray-500">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
