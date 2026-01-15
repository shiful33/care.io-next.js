"use client";
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting us. We will get back to you soon.",
      timer: 2500,
      showConfirmButton: false,
    });
    form.reset();
  };

  return (
    <section className="py-20 bg-base-100" id="contact">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500">
            Have any questions about our care services or need a custom plan? 
            Our team is ready to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="p-8 border bg-primary/5 rounded-3xl border-primary/10">
              <h3 className="mb-6 text-2xl font-bold text-gray-800">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-primary">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call Us</p>
                    <p className="text-lg font-bold text-gray-700">+880 1234 567 890</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-secondary">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Us</p>
                    <p className="text-lg font-bold text-gray-700">support@caregivers.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 text-white bg-orange-500 rounded-full">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Our Office</p>
                    <p className="text-lg font-bold text-gray-700">Gulshan-2, Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Placeholder / Image */}
            <div className="h-64 overflow-hidden border border-gray-200 shadow-inner rounded-3xl">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.050631248924!2d90.41030937533682!3d23.78122287864987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70deb73%3A0x30c36453159032c8!2sGulshan%202!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd" 
                className="w-full h-full grayscale"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
               ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 bg-white border border-gray-100 shadow-2xl rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control">
                <label className="mb-2 font-semibold text-gray-700 label">Full Name</label>
                <input type="text" placeholder="Your Name" className="w-full text-[15px] font-semibold border rounded cursor-pointer text-gray-600 hover:text-secondary border-red-100 pl-2 bg-gray-100 shadow py-2" required />
              </div>

              <div className="form-control">
                <label className="mb-2 font-semibold text-gray-700 label">Email Address</label>
                <input type="email" placeholder="email@example.com" className="w-full text-[15px] font-semibold border rounded cursor-pointer text-gray-600 hover:text-secondary border-red-100 pl-2 bg-gray-100 shadow py-2" required />
              </div>

              <div className="form-control">
                <label className="font-semibold text-gray-700 label">Subject</label>
                <select className="w-full text-[15px] font-semibold border rounded cursor-pointer text-gray-600 hover:text-secondary border-red-100 pl-2 bg-gray-100 shadow py-2">
                  <option disabled selected>Why are you contacting?</option>
                  <option>Booking Inquiry</option>
                  <option>Caregiver Application</option>
                  <option>General Support</option>
                  <option>Feedback</option>
                </select>
              </div>

              <div className="form-control">
                <label className="mb-2 font-semibold text-gray-700 label">Message</label>
                <textarea className="h-32 w-full text-[15px] font-semibold border rounded cursor-pointer text-gray-600 hover:text-secondary border-red-100 pl-2 bg-gray-100 shadow py-2" placeholder="How can we help you?" required></textarea>
              </div>

              <button type="submit" className="flex items-center w-full py-1 text-[16px] font-medium border rounded cursor-pointer hover:text-[#70af03] gap-2 justify-center border-[#98CA43] text-[#98CA43]">
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;