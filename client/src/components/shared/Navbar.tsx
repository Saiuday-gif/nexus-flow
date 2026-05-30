"use client"; 

import React from 'react';
import Link from 'next/link';
// Importing useRouter hook from Next.js for programmatic navigation
import { useRouter } from 'next/navigation'; 

const Navbar = () => {
  const router = useRouter(); // Initializing the router instance

  // Function to handle automatic page redirect on button click
  const handleGetStarted = () => {
    // Automatically navigates the user to the contact form page
    router.push('/contact'); 
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* Brand visibility for mobile screens */}
      <div className="block md:hidden">
        <span className="text-lg font-bold text-blue-500">NexusFlow</span>
      </div>
      
      {/* Desktop navigation items aligned properly to the right */}
      <div className="hidden md:flex items-center space-x-6 ml-auto">
        <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Home
        </Link>
        <Link href="/#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Features
        </Link>
        <Link href="/contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Contact
        </Link>
        
        {/* Get Started Button configured with automatic page routing handler */}
        <button 
          onClick={handleGetStarted} 
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Navbar;