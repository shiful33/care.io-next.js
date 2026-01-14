import React from 'react';
import Image from 'next/image';
import { FaBullseye, FaHeart, FaShieldAlt } from 'react-icons/fa';

const AboutUs = () => {
    return (
        <section className="py-16 bg-base-100">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-2xl md:text-3xl font-bold font-poppins text-primary mb-4 [text-shadow:_1px_1px_2px_rgb(0_0_0_/_10%)] custom-text-shadow">
                        About Care.IO
                    </h2>
                    <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left Side: Image Content */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative p-5">
                            <div className="absolute top-0 left-0 w-full h-full bg-secondary/10 rounded-3xl -rotate-3"></div>
                            <Image 
                                src="https://i.ibb.co.com/5WnSJyRH/imgg2.jpg" 
                                width={450}
                                height={350}
                                alt="Caregiving Mission" 
                                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Side: Text Content */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <h3 className="text-2xl font-bold text-secondary font-poppins custom-text-shadow">
                            Your Trusted Partner in Family Care
                        </h3>
                        <p className="text-gray-600 font-inter leading-relaxed">
                            Care.IO is a web application designed to help users find reliable and trusted care services for children, the elderly, and those in need of special medical attention. Our mission is to make caregiving easy, secure, and accessible for everyone in the community.
                        </p>

                        {/* Feature Points */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="flex items-start gap-3">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <FaBullseye size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 custom-text-shadow">Our Mission</h4>
                                    <p className="text-sm text-gray-500">To bridge the gap between families and professional caregivers.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                                    <FaShieldAlt size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 custom-text-shadow">Secure Service</h4>
                                    <p className="text-sm text-gray-500">Every booking is monitored to ensure safety and quality care.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-3 bg-accent/10 rounded-lg text-accent">
                                    <FaHeart size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 custom-text-shadow">Compassion</h4>
                                    <p className="text-sm text-gray-500">We treat your loved ones like our own family members.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button className="  shadow-lg border px-8 py-4 border-white custom-text-shadow bg-primary/10 rounded cursor-pointer">Learn More Our Vision</button>
                        </div>
                    </div>
                </div>

                {/* Success Metrics / Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 p-10 bg-primary/5 rounded-3xl border border-primary/10">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary custom-text-shadow">500+</div>
                        <div className="text-gray-600 font-medium custom-text-shadow">Verified Caregivers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary custom-text-shadow">1.2k+</div>
                        <div className="text-gray-600 font-medium custom-text-shadow">Happy Families</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary custom-text-shadow">15+</div>
                        <div className="text-gray-600 font-medium custom-text-shadow">Cities Covered</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary custom-text-shadow">4.9/5</div>
                        <div className="text-gray-600 font-medium custom-text-shadow">User Rating</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;