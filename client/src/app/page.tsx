"use client";

import React from 'react';
import Link from 'next/link';
import Features from '@/components/shared/Features';
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 md:py-20">
      
      {/* Small Decorative Badge */}
      <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-400 text-xs font-medium px-4 py-1.5 rounded-full mb-6 border border-blue-500/20">
        <span>✨ MERN Stack Power Integration</span>
      </div>

      {/* Hero Main Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-right from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
        Manage Your Application <br className="hidden md:block" /> Data
      </h1>

      {/* Subtext description */}
      <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
        Please fill out the form below and submit. Fullstack-Development project engineered to handle secure dynamic data integration and database scaling.
      </p>

      {/* Call to Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <Link href="/contact" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-all shadow-lg shadow-blue-600/20 text-center">
          Go to Contact Form
        </Link>
        <Link href="#features" className="w-full sm:w-auto bg-gray-850 hover:bg-gray-800 text-gray-300 border border-gray-700 font-medium px-8 py-3 rounded-lg transition-all text-center">
          Learn More
        </Link>
      </div>

      {/* Section Divider Line */}
      <div className="w-full h-px bg-gradient-to-right from-transparent via-gray-850 to-transparent my-4"></div>

      {/* Dynamic Architecture Tech Stack Cards Section */}
      <div className="w-full text-left mt-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white text-center">Why NexusFlow Architecture?</h2>
        <Features />
      </div>

    </div>
  );
}