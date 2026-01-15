"use client";
import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I book a caregiver?",
      answer:
        "You can easily book a caregiver by selecting a service from our home page, viewing the details, and clicking the 'Book Now' button. You'll need to provide your address and duration.",
    },
    {
      question: "Are your caregivers verified?",
      answer:
        "Yes, 100%. Every caregiver on our platform undergoes a rigorous background check, including NID verification and professional training assessment.",
    },
    {
      question: "Can I cancel or reschedule a booking?",
      answer:
        "Yes, you can manage your bookings from the 'My Bookings' page. Cancellations are allowed up to 12 hours before the service starts.",
    },
    {
      question: "How is the total cost calculated?",
      answer:
        "The total cost is calculated based on the service's hourly rate and the duration you select. Any active discounts are automatically applied during checkout.",
    },
    {
      question: "What areas do you cover?",
      answer:
        "Currently, we are providing full services in all major areas of Dhaka, Chattogram, and Sylhet. We are expanding to other districts soon!",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <span className="flex items-center gap-2 px-4 py-1 text-sm font-bold rounded-full bg-primary/10 text-primary">
              <FaQuestionCircle /> FAQ
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Commonly Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-gray-500">
            Have questions? We have answers. If you can't find what you're
            looking for, feel free to contact our support.
          </p>
        </div>

        {/* Accordion Logic */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 py-4 border border-gray-200 collapse collapse-plus bg-base-100 rounded-xl"
            >
              <input
                type="radio"
                name="my-accordion-faq"
                defaultChecked={index === 0}
              />
              <div className="flex items-center text-lg font-bold text-gray-700 collapse-title">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="leading-relaxed text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
